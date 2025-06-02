
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { ShoppingBag, Star } from 'lucide-react';

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
  
  const product = products.find(p => p.id.slice(0, 8) === id?.padStart(8, '0'));

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p>Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-w-1 aspect-h-1">
          <img
            src={product.image || ''}
            alt={product.name}
            className="w-full h-96 lg:h-full object-cover rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-lg text-gray-600 mt-2">{product.category}</p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <span className="text-gray-600">(4.8/5 - 124 reviews)</span>
          </div>

          <div className="text-3xl font-bold text-gray-900">
            ${product.price}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-600">{product.description || 'No description available.'}</p>
          </div>

          {product.features && product.features.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Features</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={() => onAddToCart({
              id: parseInt(product.id.slice(0, 8), 16),
              name: product.name,
              price: product.price,
              image: product.image || '',
              category: product.category
            })}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <ShoppingBag className="h-5 w-5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
