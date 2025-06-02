
import React from 'react';
import { ShoppingBag, Search, User, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick }) => {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">ShopFlow</h1>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Products
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-gray-900 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="text-gray-700 hover:text-gray-900 transition-colors">
              <User className="h-5 w-5" />
            </button>
            <button 
              onClick={onCartClick}
              className="relative text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button className="md:hidden text-gray-700 hover:text-gray-900">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
