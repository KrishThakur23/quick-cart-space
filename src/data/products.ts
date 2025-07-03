
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
  // Dental Products
  {
    id: 1,
    name: "Digital Intraoral Camera",
    price: 2799.99,
    image: "https://images.unsplash.com/photo-1581093458791-9d42e3c7ef39?w=400&h=400&fit=crop",
    category: "Digital Dentistry & Equipment",
    description: "High-resolution intraoral camera with LED illumination for detailed patient examination and documentation.",
    features: ["HD Resolution", "LED Illumination", "USB Connectivity", "Lightweight Design"]
  },
  {
    id: 2,
    name: "Orthodontic Bracket Set",
    price: 449.99,
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=400&fit=crop",
    category: "Orthodontics",
    description: "Complete metal bracket system with superior bonding strength for effective orthodontic treatment.",
    features: ["Metal Construction", "Superior Bonding", "Easy Debonding", "Complete Set"]
  }
];
