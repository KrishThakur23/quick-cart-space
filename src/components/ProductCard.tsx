
import React from 'react';
import { Link } from 'react-router-dom';

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
  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 border">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg">
          <img
            src={product.image}
            alt={product.name}
            className="h-64 w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 mt-1">{product.category}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xl font-bold text-gray-900">${product.price}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
