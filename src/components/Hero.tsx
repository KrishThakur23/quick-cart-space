
import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-green-600 to-emerald-600 text-white animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-bounce-in">
            Discover Amazing Products
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            Shop the latest trends with unbeatable prices and quality
          </p>
          <div className="space-x-4 animate-slide-in-left" style={{ animationDelay: '0.6s' }}>
            <Link
              to="/products"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 inline-block transform hover:scale-110 hover:animate-glow"
            >
              Shop Now
            </Link>
            <Link
              to="/about"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-all duration-300 inline-block transform hover:scale-110"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
