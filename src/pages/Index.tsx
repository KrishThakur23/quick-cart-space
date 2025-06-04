import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { Star, Truck, Shield, Headphones } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface IndexProps {
  onAddToCart: (product: Product) => void;
}

const Index: React.FC<IndexProps> = ({ onAddToCart }) => {
  const { products, isLoading } = useProducts();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate products every 2 seconds continuously
  useEffect(() => {
    if (products.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [products.length]);

  const getVisibleProducts = () => {
    if (products.length === 0) return [];
    
    const visibleProducts = [];
    for (let i = 0; i < Math.min(3, products.length); i++) {
      const index = (currentIndex + i) % products.length;
      visibleProducts.push(products[index]);
    }
    return visibleProducts;
  };

  const featuredProducts = getVisibleProducts();

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on orders over $50</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">Your payment information is secure</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">We're here to help anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products with Automatic Animation */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-600">Watch our products showcase - automatically rotating every 2 seconds</p>
          </div>
          {isLoading ? (
            <div className="text-center">
              <p>Loading featured products...</p>
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <div
                  key={`${product.id}-${currentIndex}`}
                  className="transform transition-all duration-700 ease-in-out animate-fade-in"
                  style={{
                    animationDelay: `${index * 150}ms`,
                    transform: 'translateX(0)',
                  }}
                >
                  <ProductCard
                    product={{
                      id: parseInt(product.id.slice(0, 8), 16),
                      name: product.name,
                      price: product.price,
                      image: product.image || '',
                      category: product.category
                    }}
                    onAddToCart={onAddToCart}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-500">No products available yet.</p>
            </div>
          )}
          
          {/* Product navigation indicator */}
          {products.length > 0 && (
            <div className="flex justify-center mt-8 space-x-2">
              {products.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-green-600 scale-125'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Excellent quality products and fast shipping. I've been a customer for over a year and never disappointed!"
              </p>
              <div className="font-semibold">Sarah Johnson</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Amazing customer service and great prices. The product quality exceeded my expectations."
              </p>
              <div className="font-semibold">Michael Chen</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Love the variety of products and the user-friendly website. Shopping here is always a pleasure!"
              </p>
              <div className="font-semibold">Emily Rodriguez</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
