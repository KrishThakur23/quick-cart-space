
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useOrders } from '@/hooks/useOrders';
import { ShoppingBag } from 'lucide-react';

interface OrderFormProps {
  product: {
    id: string;
    name: string;
    price: number;
    user_id: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ product, isOpen, onClose }) => {
  const { createOrder } = useOrders();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    quantity: 1,
    customer_name: '',
    customer_email: '',
    customer_address: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderData = {
      product_id: product.id,
      quantity: formData.quantity,
      total_amount: product.price * formData.quantity,
      customer_name: formData.customer_name,
      customer_email: formData.customer_email,
      customer_address: formData.customer_address,
      user_id: product.user_id
    };

    const { error } = await createOrder(orderData);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Order placed successfully!",
      });
      setFormData({
        quantity: 1,
        customer_name: '',
        customer_email: '',
        customer_address: ''
      });
      onClose();
    }

    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Place Order - {product.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || 1})}
                required
              />
            </div>
            <div>
              <Label htmlFor="customer_name">Full Name</Label>
              <Input
                id="customer_name"
                value={formData.customer_name}
                onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="customer_email">Email</Label>
              <Input
                id="customer_email"
                type="email"
                value={formData.customer_email}
                onChange={(e) => setFormData({...formData, customer_email: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="customer_address">Address</Label>
              <Textarea
                id="customer_address"
                value={formData.customer_address}
                onChange={(e) => setFormData({...formData, customer_address: e.target.value})}
                rows={3}
              />
            </div>
            <div className="text-lg font-semibold text-green-600">
              Total: ${(product.price * formData.quantity).toFixed(2)}
            </div>
            <div className="flex space-x-2">
              <Button 
                type="submit" 
                className="flex-1 bg-green-600 hover:bg-green-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Placing Order...' : 'Place Order'}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderForm;
