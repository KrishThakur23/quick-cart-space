
import React from 'react';
import { Link } from 'react-router-dom';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Tag, Info } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  // Convert the numeric ID to a hex string for the URL
  const productId = product.id.toString(16).padStart(8, '0');

  // All available categories and their subcategories
  const allCategoriesData = {
    'Electronics': ['Smartphones', 'Laptops', 'Accessories', 'Gaming', 'Audio', 'Cameras'],
    'Clothing': ['Men\'s Wear', 'Women\'s Wear', 'Accessories', 'Shoes', 'Bags', 'Jewelry'],
    'Home & Garden': ['Furniture', 'Decor', 'Tools', 'Plants', 'Kitchen', 'Bathroom'],
    'Sports': ['Equipment', 'Apparel', 'Footwear', 'Accessories', 'Fitness', 'Outdoor'],
    'Books': ['Fiction', 'Non-Fiction', 'Educational', 'Comics', 'Children', 'Reference'],
    'Health': ['Supplements', 'Personal Care', 'Fitness', 'Medical', 'Beauty', 'Wellness'],
    'Automotive': ['Parts', 'Accessories', 'Tools', 'Care', 'Electronics', 'Tires'],
    'Toys': ['Educational', 'Action Figures', 'Dolls', 'Games', 'Outdoor', 'Electronic'],
  };

  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-500 border relative overflow-hidden transform hover:scale-105 hover:-translate-y-2 animate-fade-in">
      <Link to={`/product/${productId}`}>
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg relative">
          <img
            src={product.image}
            alt={product.name}
            className="h-64 w-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </Link>
      
      <div className="p-4">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Link to={`/product/${productId}`}>
              <h3 className="text-lg font-medium text-gray-900 hover:text-green-600 transition-all duration-300 flex items-center group-hover:translate-x-1">
                {product.name}
                <Info className="h-4 w-4 ml-2 opacity-50 group-hover:opacity-100 transition-all duration-300" />
              </h3>
            </Link>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 animate-bounce-in">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Product Information</h4>
              <div className="flex items-center space-x-2">
                <Tag className="h-4 w-4 text-green-600 animate-float" />
                <span className="text-sm font-medium">Category: {product.category}</span>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Current category subcategories:</p>
                <div className="flex flex-wrap gap-1">
                  {(allCategoriesData[product.category as keyof typeof allCategoriesData] || ['General', 'Popular']).map((sub, index) => (
                    <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        
        <p className="text-sm text-gray-500 mt-1 group-hover:text-gray-700 transition-colors duration-300">{product.category}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">₹{product.price}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-all duration-300 text-sm font-medium transform hover:scale-110 hover:animate-glow active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
