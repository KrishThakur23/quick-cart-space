import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Tag, Info, Check } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';

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
  const { products } = useProducts();
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Convert the numeric ID to a hex string for the URL
  const productId = product.id.toString(16).padStart(8, '0');

  // Get all unique categories from actual products
  const allCategories = Array.from(new Set(products.map(p => p.category)));
  
  // Get products in the same category (excluding current product)
  const relatedProducts = products.filter(p => 
    p.category === product.category && 
    parseInt(p.id.slice(0, 8), 16) !== product.id
  );

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    // Add a small delay to show the loading state
    await new Promise(resolve => setTimeout(resolve, 300));
    
    onAddToCart(product);
    setIsAdding(false);
    setJustAdded(true);
    
    // Reset the "just added" state after 2 seconds
    setTimeout(() => setJustAdded(false), 2000);
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
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Product Information</h4>
              <div className="flex items-center space-x-2">
                <Tag className="h-4 w-4 text-green-600 animate-float" />
                <span className="text-sm font-medium">Category: {product.category}</span>
              </div>
              
              {allCategories.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">All available categories:</p>
                  <div className="flex flex-wrap gap-1">
                    {allCategories.map((category, index) => (
                      <span 
                        key={category} 
                        className={`text-xs px-2 py-1 rounded-full transition-all duration-300 animate-fade-in ${
                          category === product.category 
                            ? 'bg-green-100 text-green-800 font-medium' 
                            : 'bg-gray-100 text-gray-600'
                        }`}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {relatedProducts.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    Other products in {product.category} ({relatedProducts.length}):
                  </p>
                  <div className="space-y-1 max-h-20 overflow-y-auto">
                    {relatedProducts.slice(0, 3).map((related) => (
                      <div key={related.id} className="text-xs text-gray-500">
                        • {related.name}
                      </div>
                    ))}
                    {relatedProducts.length > 3 && (
                      <div className="text-xs text-gray-400">
                        +{relatedProducts.length - 3} more...
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </HoverCardContent>
        </HoverCard>
        
        <p className="text-sm text-gray-500 mt-1 group-hover:text-gray-700 transition-colors duration-300">{product.category}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">₹{product.price}</span>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 transform active:scale-95 ${
              justAdded
                ? 'bg-green-100 text-green-700 border border-green-200'
                : isAdding
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700 hover:scale-110 hover:animate-glow'
            }`}
          >
            {justAdded ? (
              <span className="flex items-center space-x-1">
                <Check className="h-4 w-4" />
                <span>Added!</span>
              </span>
            ) : isAdding ? (
              <span className="flex items-center space-x-1">
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                <span>Adding...</span>
              </span>
            ) : (
              'Add to Cart'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;