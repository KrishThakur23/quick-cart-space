
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-green-400">Bonemart</h3>
            <p className="text-gray-300 leading-relaxed">
              Your trusted online marketplace for quality products across all categories. 
              We're committed to providing the best shopping experience with exceptional customer service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-green-400">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/" className="text-gray-300 hover:text-green-400 transition-colors block">
                Home
              </Link>
              <Link to="/products" className="text-gray-300 hover:text-green-400 transition-colors block">
                All Products
              </Link>
              <Link to="/about" className="text-gray-300 hover:text-green-400 transition-colors block">
                About Us
              </Link>
              <Link to="/contact" className="text-gray-300 hover:text-green-400 transition-colors block">
                Contact
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-green-400">Categories</h4>
            <div className="space-y-2">
              <Link to="/products?category=Electronics" className="text-gray-300 hover:text-green-400 transition-colors block">
                Electronics
              </Link>
              <Link to="/products?category=Clothing" className="text-gray-300 hover:text-green-400 transition-colors block">
                Clothing
              </Link>
              <Link to="/products?category=Home%20%26%20Garden" className="text-gray-300 hover:text-green-400 transition-colors block">
                Home & Garden
              </Link>
              <Link to="/products?category=Sports" className="text-gray-300 hover:text-green-400 transition-colors block">
                Sports
              </Link>
              <Link to="/products?category=Books" className="text-gray-300 hover:text-green-400 transition-colors block">
                Books
              </Link>
              <Link to="/products?category=Health" className="text-gray-300 hover:text-green-400 transition-colors block">
                Health
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-green-400">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">support@bonemart.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">123 Business St, City, State 12345</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 Bonemart. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-green-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-green-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="/refund" className="text-gray-400 hover:text-green-400 transition-colors">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
