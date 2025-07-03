
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { medicalProducts } from '@/data/medicalProducts';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string | null;
  images?: string[]; // Added images array
  category: string;
  description: string | null;
  features: string[] | null;
  user_id: string;
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
      // Convert medical products to match the Product interface
      const convertedMedicalProducts = medicalProducts.map(product => ({
        id: product.id.toString().padStart(32, '0'), // Convert to string and pad to match UUID format
        name: product.name,
        price: product.price,
        image: product.image,
        images: [product.image], // Convert single image to array
        category: product.category,
        description: product.description,
        features: product.features,
        user_id: 'system', // System-generated products
      }));

      // Combine Supabase products with medical products
      const allProducts = [...(data || []), ...convertedMedicalProducts];
      setProducts(allProducts);
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, isLoading, error, refetch: fetchProducts };
};
