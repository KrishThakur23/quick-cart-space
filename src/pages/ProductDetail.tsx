
import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { ShoppingBag, Star, Package } from 'lucide-react';
import OrderForm from '../components/OrderForm';
import ProductCard from '../components/ProductCard';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p>Loading product...</p>
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

          <div className="space-y-3">
            <button
              onClick={() => onAddToCart(cartProduct)}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Add to Cart</span>
            </button>
            
            <button
              onClick={() => setShowOrderForm(true)}
              className="w-full bg-green-800 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-900 transition-colors flex items-center justify-center space-x-2"
            >
              <Package className="h-5 w-5" />
              <span>Order Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* Suggested Products Section */}
      {suggestedProducts.length > 0 && (
        <div className="mt-16">
          <div className="border-t pt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              More from {product.category}
            </h2>
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
        </div>
      )}

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
