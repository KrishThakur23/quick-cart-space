
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { dentalProducts } from '@/data/dentalProducts';

export interface Product {
  id: string;
  name: string;
  price: number;
  actual_price?: number;
  discount_percentage?: number;
  image: string | null;
  images?: string[];
  category: string;
  description: string | null;
  features: string[] | null;
  user_id: string;
  created_at?: string;
  created_from_dashboard?: boolean;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    
    const { data, error: fetchError } = await supabase
      .from('products')
      .select('*')
      .eq('created_from_dashboard', true)
      .order('created_at', { ascending: false });

    if (fetchError) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', fetchError);
    } else {
      // Only show products created from dashboard
      setProducts(data || []);
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, isLoading, error, refetch: fetchProducts };
};
