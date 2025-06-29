
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  features: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "Electronics",
    description: "Premium wireless headphones with noise cancellation and 30-hour battery life.",
    features: ["Noise Cancellation", "30h Battery", "Wireless", "Premium Sound"]
  },
  {
    id: 2,
    name: "Minimalist Watch",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    category: "Accessories",
    description: "Elegant minimalist watch with leather strap and Swiss movement.",
    features: ["Swiss Movement", "Leather Strap", "Water Resistant", "2 Year Warranty"]
  },
  {
    id: 3,
    name: "Smart Fitness Tracker",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop",
    category: "Electronics",
    description: "Advanced fitness tracker with heart rate monitoring and GPS.",
    features: ["Heart Rate Monitor", "GPS Tracking", "7-day Battery", "Water Proof"]
  },
  {
    id: 4,
    name: "Premium Coffee Mug",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop",
    category: "Home & Kitchen",
    description: "Handcrafted ceramic coffee mug with ergonomic design.",
    features: ["Ceramic Material", "Ergonomic Design", "Dishwasher Safe", "12oz Capacity"]
  },
  {
    id: 5,
    name: "Laptop Backpack",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    category: "Accessories",
    description: "Durable laptop backpack with multiple compartments and USB charging port.",
    features: ["USB Charging Port", "Laptop Compartment", "Water Resistant", "Multiple Pockets"]
  },
  {
    id: 6,
    name: "Wireless Phone Charger",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop",
    category: "Electronics",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
    features: ["Fast Charging", "Qi Compatible", "LED Indicator", "Non-slip Base"]
  }
];
