
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
  // Original Electronics Products
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
  
  // Medical Products
  {
    id: 100,
    name: "Digital Blood Pressure Monitor",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=400&fit=crop",
    category: "Medical Devices",
    description: "Automatic digital blood pressure monitor with large LCD display and memory function.",
    features: ["Large LCD Display", "Memory for 60 Readings", "Irregular Heartbeat Detection", "Auto Power Off"]
  },
  {
    id: 101,
    name: "Electric Hospital Bed",
    price: 2499.99,
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=400&fit=crop",
    category: "Hospital Furniture",
    description: "Premium electric hospital bed with adjustable height, backrest, and leg rest.",
    features: ["Electric Height Adjustment", "Trendelenburg Position", "Side Rails", "Central Locking Wheels"]
  },
  {
    id: 102,
    name: "Surgical Scissor Set",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=400&fit=crop",
    category: "Surgical Instruments",
    description: "Professional surgical scissor set made from premium stainless steel.",
    features: ["Stainless Steel Construction", "Sharp Precision Blades", "Ergonomic Design", "Autoclave Safe"]
  },
  {
    id: 103,
    name: "Pulse Oximeter",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=400&fit=crop",
    category: "Medical Devices",
    description: "Fingertip pulse oximeter for measuring oxygen saturation and pulse rate.",
    features: ["SpO2 and Pulse Rate Display", "OLED Display", "Low Battery Indicator", "Auto Power Off"]
  }
];
