
import { useState, useEffect } from 'react';

export interface Order {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  total_amount: number;
  status: string;
  customer_name: string;
  customer_email: string;
  customer_address: string | null;
  created_at: string;
  updated_at: string;
  products?: {
    name: string;
    price: number;
    image: string | null;
  };
}

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/orders');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data || []);
    } catch (fetchError) {
      setError('Failed to fetch orders');
      console.error('Error fetching orders:', fetchError);
    }
    
    setIsLoading(false);
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      await fetchOrders();
      return { error: null };
    } catch (error) {
      console.error('Error updating order status:', error);
      return { error };
    }
  };

  const createOrder = async (orderData: {
    product_id: string;
    quantity: number;
    total_amount: number;
    customer_name: string;
    customer_email: string;
    customer_address?: string;
    user_id: string;
  }) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...orderData,
          status: 'paid',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const data = await response.json();
      await fetchOrders();
      return { data, error: null };
    } catch (error) {
      console.error('Error creating order:', error);
      return { data: null, error };
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return { orders, isLoading, error, refetch: fetchOrders, updateOrderStatus, createOrder };
};
