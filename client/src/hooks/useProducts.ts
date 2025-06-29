
import { useState, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string | null;
  images?: string[];
  category: string;
  description: string | null;
  features: string[] | null;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data || []);
    } catch (fetchError) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', fetchError);
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, isLoading, error, refetch: fetchProducts };
};
