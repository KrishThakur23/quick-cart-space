
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
    
    const { data, error: fetchError } = await supabase
      .from('orders')
      .select(`
        *,
        products (
          name,
          price,
          image
        )
      `)
      .order('created_at', { ascending: false });

    if (fetchError) {
      setError('Failed to fetch orders');
      console.error('Error fetching orders:', fetchError);
    } else {
      setOrders(data || []);
    }
    
    setIsLoading(false);
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', orderId);

    if (error) {
      console.error('Error updating order status:', error);
      return { error };
    }

    await fetchOrders();
    return { error: null };
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
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select();

    if (error) {
      console.error('Error creating order:', error);
      return { error };
    }

    await fetchOrders();
    return { data, error: null };
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return { orders, isLoading, error, refetch: fetchOrders, updateOrderStatus, createOrder };
};
