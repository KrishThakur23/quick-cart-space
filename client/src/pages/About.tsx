
import React from 'react';
import { Truck, Shield, Headphones, Award } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">About ShopFlow</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We're passionate about bringing you the best products at unbeatable prices. 
          Our mission is to make online shopping simple, secure, and enjoyable.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <div className="text-center">
          <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Truck className="h-8 w-8 text-blue-600" />
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
          <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Headphones className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
          <p className="text-gray-600">We're here to help anytime</p>
        </div>

        <div className="text-center">
          <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Award className="h-8 w-8 text-yellow-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Quality Guarantee</h3>
          <p className="text-gray-600">30-day money back guarantee</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
          <p className="text-gray-600 mb-6">
            Founded in 2020, ShopFlow started as a small team with a big vision: to revolutionize 
            online shopping by focusing on quality, customer service, and innovation. Today, we've 
            grown into a trusted platform serving thousands of happy customers worldwide.
          </p>
          <p className="text-gray-600">
            We carefully curate every product in our catalog, working directly with manufacturers 
            and trusted suppliers to ensure you get the best value for your money. Our commitment 
            to excellence extends beyond products to every aspect of your shopping experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
