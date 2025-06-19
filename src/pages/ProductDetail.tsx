import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { 
  ShoppingBag, 
  Star, 
  Package, 
  Shield, 
  Truck, 
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Check,
  Info,
  Award,
  Users,
  Clock,
  Phone,
  Mail,
  MessageCircle
} from 'lucide-react';
import OrderForm from '../components/OrderForm';
import ProductCard from '../components/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ProductDetailProps {
  onAddToCart: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const { products, isLoading } = useProducts();
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  // Find product by matching the hex ID
  const product = products.find(p => {
    const hexId = parseInt(p.id.slice(0, 8), 16).toString(16).padStart(8, '0');
    return hexId === id;
  });

  // Get suggested products from the same category, excluding current product
  const suggestedProducts = product ? products.filter(p => 
    p.category === product.category && p.id !== product.id
  ).slice(0, 4) : [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-200 h-96 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const cartProduct = {
    id: parseInt(product.id.slice(0, 8), 16),
    name: product.name,
    price: product.price,
    image: product.image || '',
    category: product.category
  };

  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : product.image 
    ? [product.image] 
    : [];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(cartProduct);
    }
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-green-600 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-green-600 transition-colors">Products</Link>
            <span>/</span>
            <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-green-600 transition-colors">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
              {productImages.length > 0 ? (
                <>
                  <img
                    src={productImages[selectedImageIndex]}
                    alt={product.name}
                    className="w-full h-96 lg:h-[500px] object-cover"
                  />
                  {productImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                      >
                        <ChevronLeft className="h-5 w-5 text-gray-700" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                      >
                        <ChevronRight className="h-5 w-5 text-gray-700" />
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                        {productImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-200 ${
                              index === selectedImageIndex ? 'bg-white scale-125' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-96 lg:h-[500px] bg-gray-200 flex items-center justify-center">
                  <Package className="h-16 w-16 text-gray-400" />
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {productImages.slice(0, 4).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative bg-white rounded-lg overflow-hidden shadow-md transition-all duration-200 hover:shadow-lg ${
                      index === selectedImageIndex ? 'ring-2 ring-green-500' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                  {product.category}
                </Badge>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      isWishlisted ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">{product.name}</h1>
              <div className="flex items-center space-x-4 mt-3">
                <div className="flex items-center space-x-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">(4.8)</span>
                </div>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-600">124 reviews</span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-green-600 font-medium">In Stock</span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
              <div className="flex items-baseline space-x-3">
                <span className="text-4xl font-bold text-green-700">₹{product.price}</span>
                <span className="text-lg text-gray-500 line-through">₹{(product.price * 1.3).toFixed(2)}</span>
                <Badge className="bg-red-500 hover:bg-red-500 text-white">23% OFF</Badge>
              </div>
              <p className="text-sm text-gray-600 mt-2">Inclusive of all taxes • Free shipping on orders above ₹500</p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">6 Month Warranty</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border">
                <Truck className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">Free Delivery</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border">
                <Award className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium">Certified Quality</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border">
                <Users className="h-5 w-5 text-orange-600" />
                <span className="text-sm font-medium">Expert Support</span>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  onClick={handleAddToCart}
                  className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span>Add to Cart</span>
                </Button>
                
                <Button
                  onClick={() => setShowOrderForm(true)}
                  className="bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <Package className="h-5 w-5" />
                  <span>Buy Now</span>
                </Button>
              </div>
            </div>

            {/* Contact Options */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Need Help? Contact Our Experts</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button className="flex items-center justify-center space-x-2 p-2 bg-white rounded-lg border hover:bg-gray-50 transition-colors">
                    <Phone className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Call</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 p-2 bg-white rounded-lg border hover:bg-gray-50 transition-colors">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Email</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 p-2 bg-white rounded-lg border hover:bg-gray-50 transition-colors">
                    <MessageCircle className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium">Chat</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white border rounded-lg p-1">
              <TabsTrigger value="description" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
                Description
              </TabsTrigger>
              <TabsTrigger value="features" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
                Features
              </TabsTrigger>
              <TabsTrigger value="specifications" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
                Specifications
              </TabsTrigger>
              <TabsTrigger value="reviews" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
                Reviews
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                  <div className="prose max-w-none">
                    <p className="text-gray-600 leading-relaxed">
                      {product.description || 'This premium product offers exceptional quality and performance. Designed with precision and built to last, it represents the perfect combination of innovation and reliability. Whether for professional or personal use, this product delivers outstanding results that exceed expectations.'}
                    </p>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Key Benefits</h4>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-center space-x-2">
                            <Check className="h-4 w-4 text-green-600" />
                            <span>Premium quality materials</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Check className="h-4 w-4 text-green-600" />
                            <span>Expert craftsmanship</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Check className="h-4 w-4 text-green-600" />
                            <span>Reliable performance</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">What's Included</h4>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-center space-x-2">
                            <Package className="h-4 w-4 text-blue-600" />
                            <span>Main product unit</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Package className="h-4 w-4 text-blue-600" />
                            <span>User manual</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Package className="h-4 w-4 text-blue-600" />
                            <span>Warranty certificate</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Product Features</h3>
                  {product.features && product.features.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Check className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700">High-quality construction</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Check className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700">Easy to use interface</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Check className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700">Durable materials</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Check className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700">Professional grade</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="font-medium text-gray-700">Category</span>
                        <span className="text-gray-600">{product.category}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="font-medium text-gray-700">Brand</span>
                        <span className="text-gray-600">Bonemart</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="font-medium text-gray-700">Warranty</span>
                        <span className="text-gray-600">2 Years</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="font-medium text-gray-700">Weight</span>
                        <span className="text-gray-600">1.2 kg</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="font-medium text-gray-700">Dimensions</span>
                        <span className="text-gray-600">25 x 15 x 10 cm</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="font-medium text-gray-700">Material</span>
                        <span className="text-gray-600">Premium Grade</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">Customer Reviews</h3>
                    <Button variant="outline" size="sm">Write a Review</Button>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                      <div className="text-center p-6 bg-gray-50 rounded-lg">
                        <div className="text-4xl font-bold text-gray-900 mb-2">4.8</div>
                        <div className="flex justify-center text-yellow-400 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-current" />
                          ))}
                        </div>
                        <div className="text-sm text-gray-600">Based on 124 reviews</div>
                      </div>
                    </div>
                    
                    <div className="lg:col-span-2 space-y-4">
                      {[1, 2, 3].map((review) => (
                        <div key={review} className="border-b border-gray-200 pb-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-current" />
                              ))}
                            </div>
                            <span className="font-medium text-gray-900">John Doe</span>
                            <span className="text-sm text-gray-500">• 2 days ago</span>
                          </div>
                          <p className="text-gray-600">
                            Excellent product quality and fast delivery. Highly recommended for anyone looking for reliable performance.
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {suggestedProducts.length > 0 && (
          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Related Products</h2>
              <p className="text-gray-600">You might also be interested in these products</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {suggestedProducts.map((suggestedProduct) => (
                <ProductCard
                  key={suggestedProduct.id}
                  product={{
                    id: parseInt(suggestedProduct.id.slice(0, 8), 16),
                    name: suggestedProduct.name,
                    price: suggestedProduct.price,
                    image: suggestedProduct.image || '',
                    category: suggestedProduct.category
                  }}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <OrderForm
        product={{
          id: product.id,
          name: product.name,
          price: product.price,
          user_id: product.user_id
        }}
        isOpen={showOrderForm}
        onClose={() => setShowOrderForm(false)}
      />
    </div>
  );
};

export default ProductDetail;
