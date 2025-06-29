
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string | null;
  category: string;
  description: string | null;
}

interface HeroProps {
  onAddToCart?: (product: any) => void;
}

const Hero: React.FC<HeroProps> = ({ onAddToCart }) => {
  const { products, isLoading } = useProducts();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    if (products.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % products.length);
      }, 5000); // Change slide every 5 seconds
      return () => clearInterval(interval);
    }
  }, [products.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (isLoading || products.length === 0) {
    return (
      <div className="relative h-[600px] bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center">
        <div className="text-white text-xl">Loading amazing products...</div>
      </div>
    );
  }

  const currentProduct = products[currentSlide];

  return (
    <div className="relative h-[600px] overflow-hidden bg-gray-900">
      {/* Main Carousel */}
      <div className="relative h-full">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 translate-x-0'
                : index < currentSlide
                ? 'opacity-0 -translate-x-full'
                : 'opacity-0 translate-x-full'
            }`}
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <img
                src={product.image || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl">
                  <div className="animate-fade-in-up">
                    <span className="inline-block px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-full mb-4">
                      {product.category}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                      {product.name}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 mb-6 leading-relaxed">
                      {product.description || "Discover quality products at unbeatable prices"}
                    </p>
                    <div className="flex items-center mb-8">
                      <span className="text-3xl md:text-4xl font-bold text-green-400">
                        ₹{product.price}
                      </span>
                      <span className="ml-3 text-gray-300 line-through text-xl">
                        ₹{(product.price * 1.3).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={() => onAddToCart && onAddToCart({
                          id: parseInt(product.id.slice(0, 8), 16),
                          name: product.name,
                          price: product.price,
                          image: product.image || '',
                          category: product.category
                        })}
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 hover:shadow-lg"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </button>
                      <Link
                        to={`/product/${product.id}`}
                        className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold transition-all duration-300 text-center transform hover:scale-105"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Product Counter */}
      <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
        {currentSlide + 1} of {products.length}
      </div>
    </div>
  );
};

export default Hero;
