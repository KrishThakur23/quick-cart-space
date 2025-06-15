
import React from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 animate-fade-in">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl animate-slide-in-right">
        <div className="flex items-center justify-between p-4 border-b animate-bounce-in">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-all duration-300 transform hover:scale-110 hover:rotate-90"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-8 animate-fade-in-up">
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={item.id} className="flex items-center space-x-3 border-b pb-4 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 object-cover rounded transition-transform duration-300 hover:scale-110"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 hover:text-green-600 transition-colors duration-300">{item.name}</h3>
                    <p className="text-gray-600">${item.price}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="text-gray-400 hover:text-gray-600 transition-all duration-300 transform hover:scale-125 active:scale-95"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-sm font-medium w-8 text-center animate-bounce-in">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="text-gray-400 hover:text-gray-600 transition-all duration-300 transform hover:scale-125 active:scale-95"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-400 hover:text-red-600 transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-4 space-y-4 animate-slide-in-left">
            <div className="flex justify-between text-lg font-semibold animate-glow">
              <span>Total: ${total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:animate-glow">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
