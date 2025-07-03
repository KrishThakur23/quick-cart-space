
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { dentalProducts } from '@/data/dentalProducts';

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
  created_at?: string;
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
      .order('created_at', { ascending: false });

    if (fetchError) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', fetchError);
    } else {
      // Convert dental products to match the Product interface
      const convertedDentalProducts = dentalProducts.map(product => ({
        id: product.id.toString().padStart(32, '0'),
        name: product.name,
        price: product.price,
        image: product.image,
        images: [product.image],
        category: product.category,
        description: product.description,
        features: product.features,
        user_id: 'system',
        created_at: new Date().toISOString(),
      }));

      // Combine Supabase products with dental products
      const allProducts = [...(data || []), ...convertedDentalProducts];
      setProducts(allProducts);
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, isLoading, error, refetch: fetchProducts };
};
