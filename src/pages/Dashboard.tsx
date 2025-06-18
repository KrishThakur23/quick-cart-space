import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { useOrders } from '@/hooks/useOrders';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2, Plus, Package, ShoppingCart, Star, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ImageUpload } from '@/components/ImageUpload';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const { products, isLoading, refetch } = useProducts();
  const { orders, isLoading: ordersLoading, updateOrderStatus } = useOrders();
  const { toast } = useToast();
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    images: [] as string[],
    description: '',
    features: ''
  });

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Filter products to show only user's products
  const userProducts = products.filter(p => p.user_id === user.id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      image: formData.images[0] || null, // Keep first image as main image for compatibility
      images: formData.images, // Store all images
      description: formData.description,
      features: formData.features ? formData.features.split(',').map(f => f.trim()) : [],
      user_id: user.id
    };

    try {
      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Product updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('products')
          .insert([productData]);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Product added successfully",
        });
      }
      
      setFormData({
        name: '',
        price: '',
        category: '',
        images: [],
        description: '',
        features: ''
      });
      setEditingProduct(null);
      setShowAddForm(false);
      refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      images: product.images || (product.image ? [product.image] : []),
      description: product.description || '',
      features: product.features ? product.features.join(', ') : ''
    });
    setShowAddForm(true);
  };

  const handleDelete = async (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', productId);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Product deleted successfully",
        });
        refetch();
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    const { error } = await updateOrderStatus(orderId, newStatus);
    if (error) {
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Order status updated successfully",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      category: '',
      images: [],
      description: '',
      features: ''
    });
    setEditingProduct(null);
    setShowAddForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'processing': return 'text-blue-600 bg-blue-100';
      case 'shipped': return 'text-purple-600 bg-purple-100';
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl">
              <Package className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-gray-600">Manage your products and orders with ease</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="bg-white shadow-sm border">
            <TabsTrigger value="products" className="flex items-center space-x-2 data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
              <Package className="h-4 w-4" />
              <span>Products</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center space-x-2 data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
              <ShoppingCart className="h-4 w-4" />
              <span>Orders ({orders.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Sparkles className="h-6 w-6 text-green-600" />
                <h2 className="text-xl font-semibold text-gray-900">Your Products ({userProducts.length})</h2>
              </div>
              <Button 
                onClick={() => setShowAddForm(!showAddForm)} 
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>

            {(showAddForm || editingProduct) && (
              <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
                <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 border-b">
                  <CardTitle className="flex items-center space-x-2 text-green-800">
                    <Star className="h-5 w-5" />
                    <span>{editingProduct ? 'Edit Product' : 'Add New Product'}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <ImageUpload
                      onImagesUploaded={(urls) => setFormData({...formData, images: urls})}
                      currentImages={formData.images}
                      onImageRemoved={(index) => {
                        const newImages = formData.images.filter((_, i) => i !== index);
                        setFormData({...formData, images: newImages});
                      }}
                      maxImages={5}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-700 font-medium">Product Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          required
                          className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                          placeholder="Enter product name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="price" className="text-gray-700 font-medium">Price (₹)</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          value={formData.price}
                          onChange={(e) => setFormData({...formData, price: e.target.value})}
                          required
                          className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-gray-700 font-medium">Category</Label>
                      <Input
                        id="category"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        required
                        className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                        placeholder="e.g., Electronics, Clothing, Books"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-gray-700 font-medium">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        rows={4}
                        className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                        placeholder="Describe your product in detail..."
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="features" className="text-gray-700 font-medium">Features</Label>
                      <Input
                        id="features"
                        value={formData.features}
                        onChange={(e) => setFormData({...formData, features: e.target.value})}
                        className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                        placeholder="Feature 1, Feature 2, Feature 3"
                      />
                      <p className="text-sm text-gray-500">Separate features with commas</p>
                    </div>
                    
                    <div className="flex space-x-3 pt-4">
                      <Button 
                        type="submit" 
                        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg"
                      >
                        {editingProduct ? 'Update Product' : 'Add Product'}
                      </Button>
                      <Button type="button" variant="outline" onClick={resetForm} className="border-gray-200 hover:bg-gray-50">
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading your products...</p>
              </div>
            ) : userProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userProducts.map((product) => (
                  <Card key={product.id} className="shadow-lg hover:shadow-xl transition-all duration-200 border-0 bg-white">
                    <CardContent className="p-0">
                      {(product.images?.length > 0 || product.image) && (
                        <div className="relative">
                          <img
                            src={product.images?.[0] || product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                          {product.images?.length > 1 && (
                            <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                              +{product.images.length - 1} more
                            </div>
                          )}
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="font-semibold text-lg mb-2 text-gray-900">{product.name}</h3>
                        <p className="text-green-600 text-sm mb-2 font-medium">{product.category}</p>
                        <p className="text-2xl font-bold text-green-700 mb-4">${product.price}</p>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEdit(product)}
                            className="flex-1 border-green-200 text-green-700 hover:bg-green-50"
                          >
                            <Pencil className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleDelete(product.id)}
                            className="border-red-200 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="shadow-lg border-0 bg-gradient-to-br from-gray-50 to-white">
                <CardContent className="p-12 text-center">
                  <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Package className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-lg">You haven't added any products yet.</p>
                  <p className="text-gray-400 mt-2">Create your first product to get started!</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Order Management</h2>
              {ordersLoading ? (
                <div className="text-center py-8">
                  <p>Loading orders...</p>
                </div>
              ) : orders.length > 0 ? (
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Product</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-mono text-xs">
                              {order.id.slice(0, 8)}...
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                {order.products?.image && (
                                  <img 
                                    src={order.products.image} 
                                    alt={order.products?.name}
                                    className="w-8 h-8 object-cover rounded"
                                  />
                                )}
                                <span>{order.products?.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">{order.customer_name}</div>
                                <div className="text-sm text-gray-500">{order.customer_email}</div>
                              </div>
                            </TableCell>
                            <TableCell>{order.quantity}</TableCell>
                            <TableCell>${order.total_amount}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                {order.status}
                              </span>
                            </TableCell>
                            <TableCell>
                              {new Date(order.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <select
                                value={order.status}
                                onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                className="text-sm border rounded px-2 py-1"
                              >
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-6">
                    <p className="text-gray-500 text-center">No orders yet. Orders will appear here when customers place them.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
