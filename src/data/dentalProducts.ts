
export interface DentalProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  features: string[];
}

export const dentalProducts: DentalProduct[] = [
  // Consumables & Disposables
  {
    id: 1001,
    name: "Disposable 3-Way Syringe Tips",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=400&fit=crop",
    category: "Consumables & Disposables",
    description: "High-quality disposable syringe tips for air-water syringes. Autoclavable and latex-free for patient safety.",
    features: ["Autoclavable", "Latex-Free", "Single Use", "Pack of 100", "Universal Fit"]
  },
  {
    id: 1002,
    name: "Dental Bibs & Napkins",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=400&fit=crop",
    category: "Consumables & Disposables",
    description: "Absorbent dental bibs for patient protection during procedures. Available in multiple colors.",
    features: ["Highly Absorbent", "Waterproof Backing", "Multiple Colors", "Pack of 500", "Eco-Friendly"]
  },
  {
    id: 1003,
    name: "Disposable Impression Trays",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop",
    category: "Consumables & Disposables",
    description: "Plastic impression trays for accurate dental impressions. Available in various sizes.",
    features: ["Various Sizes", "Rigid Plastic", "Perforated Design", "Pack of 50", "Upper & Lower"]
  },

  // Digital Dentistry & Equipment
  {
    id: 2001,
    name: "Intraoral Camera System",
    price: 2899.99,
    image: "https://images.unsplash.com/photo-1581093458791-9d42e3c7ef39?w=400&h=400&fit=crop",
    category: "Digital Dentistry & Equipment",
    description: "High-definition intraoral camera with LED illumination for detailed patient consultation and documentation.",
    features: ["HD Video Recording", "LED Illumination", "USB Connectivity", "Lightweight Design", "Software Included"]
  },
  {
    id: 2002,
    name: "Digital X-Ray Sensor",
    price: 4999.99,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=400&fit=crop",
    category: "Digital Dentistry & Equipment",
    description: "CMOS digital radiography sensor for instant, high-quality dental X-rays with reduced radiation exposure.",
    features: ["CMOS Technology", "Instant Imaging", "Low Radiation", "USB Interface", "Waterproof Cable"]
  },
  {
    id: 2003,
    name: "CAD/CAM Milling Machine",
    price: 15999.99,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=400&fit=crop",
    category: "Digital Dentistry & Equipment",
    description: "Compact chairside milling unit for same-day crowns, inlays, and veneers with precision craftsmanship.",
    features: ["5-Axis Milling", "Multiple Materials", "Chairside Use", "High Precision", "User-Friendly Software"]
  },

  // Endodontics
  {
    id: 3001,
    name: "Rotary Endodontic System",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=400&fit=crop",
    category: "Endodontics",
    description: "Advanced rotary system for root canal preparation with precise torque control and multiple speed settings.",
    features: ["Torque Control", "Multiple Speeds", "LED Display", "Autoclavable Handpiece", "File Detection"]
  },
  {
    id: 3002,
    name: "NiTi Rotary Files Set",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=400&fit=crop",
    category: "Endodontics",
    description: "Premium nickel-titanium rotary files for efficient and safe root canal shaping with superior flexibility.",
    features: ["NiTi Construction", "Superior Flexibility", "Various Tapers", "Set of 6 Files", "Sterile Packaging"]
  },
  {
    id: 3003,
    name: "Apex Locator",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=400&fit=crop",
    category: "Endodontics",
    description: "Electronic apex locator for accurate root canal length determination with clear audio and visual indicators.",
    features: ["Accurate Measurement", "Audio & Visual Alerts", "Multiple File Compatibility", "Rechargeable Battery", "Compact Design"]
  },

  // Dental Instruments
  {
    id: 4001,
    name: "Dental Mirror & Explorer Set",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop",
    category: "Dental Instruments",
    description: "Professional dental examination set with mouth mirrors and explorers in various sizes and angles.",
    features: ["Stainless Steel", "Multiple Sizes", "Ergonomic Handles", "Autoclavable", "Set of 12 Pieces"]
  },
  {
    id: 4002,
    name: "Dental Extraction Forceps",
    price: 189.99,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    category: "Dental Instruments",
    description: "High-grade extraction forceps for various tooth types with precision-ground beaks and comfortable grip.",
    features: ["High-Grade Steel", "Precision Beaks", "Comfortable Grip", "Various Patterns", "Autoclavable"]
  },
  {
    id: 4003,
    name: "Periodontal Probe Set",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=400&fit=crop",
    category: "Dental Instruments",
    description: "Calibrated periodontal probes for accurate pocket depth measurement and periodontal assessment.",
    features: ["WHO Standard", "Color-Coded", "Lightweight", "Set of 6 Probes", "Autoclavable"]
  },

  // Orthodontics
  {
    id: 5001,
    name: "Orthodontic Bracket Kit",
    price: 449.99,
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=400&fit=crop",
    category: "Orthodontics",
    description: "Complete metal bracket system with superior bonding strength and easy debonding characteristics.",
    features: ["Superior Bonding", "Easy Debonding", "Complete Set", "Various Sizes", "Mesh Base Design"]
  },
  {
    id: 5002,
    name: "Orthodontic Wires Set",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1582719471769-e1e1b3a2e56b?w=400&h=400&fit=crop",
    category: "Orthodontics",
    description: "Premium orthodontic archwires in various sizes and materials for different treatment phases.",
    features: ["Multiple Sizes", "NiTi & Stainless Steel", "Various Shapes", "Pack of 10", "Memory Wire"]
  },
  {
    id: 5003,
    name: "Orthodontic Pliers Set",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop",
    category: "Orthodontics",
    description: "Professional orthodontic pliers set for wire bending, bracket placement, and adjustments.",
    features: ["Precision Tips", "Ergonomic Design", "Set of 8 Pliers", "Anti-Slip Handles", "Autoclavable"]
  },

  // Prosthodontics
  {
    id: 6001,
    name: "Dental Articulator",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop",
    category: "Prosthodontics",
    description: "Semi-adjustable dental articulator for accurate reproduction of jaw movements and occlusal relationships.",
    features: ["Semi-Adjustable", "Magnetic Mounting", "Precise Movements", "Easy Loading", "Durable Construction"]
  },
  {
    id: 6002,
    name: "Impression Materials Kit",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=400&fit=crop",
    category: "Prosthodontics",
    description: "Complete impression material kit with alginate, silicone, and accessories for accurate dental impressions.",
    features: ["Complete Kit", "Multiple Materials", "Fast Setting", "High Accuracy", "Easy Mixing"]
  },
  {
    id: 6003,
    name: "Crown & Bridge Instruments",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=400&fit=crop",
    category: "Prosthodontics",
    description: "Specialized instruments for crown and bridge procedures including margin trimmers and carvers.",
    features: ["Specialized Design", "Sharp Cutting Edges", "Ergonomic Handles", "Set of 10", "Autoclavable"]
  },

  // Periodontics
  {
    id: 7001,
    name: "Ultrasonic Scaler",
    price: 1899.99,
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=400&fit=crop",
    category: "Periodontics",
    description: "Advanced ultrasonic scaler for effective plaque and calculus removal with multiple power settings.",
    features: ["Multiple Power Settings", "Various Tips", "LED Handpiece", "Water Control", "Quiet Operation"]
  },
  {
    id: 7002,
    name: "Periodontal Curettes Set",
    price: 189.99,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    category: "Periodontics",
    description: "Premium Gracey curettes for subgingival debridement and root planing with sharp cutting edges.",
    features: ["Sharp Cutting Edges", "Various Angles", "Ergonomic Handles", "Set of 8 Curettes", "Autoclavable"]
  },
  {
    id: 7003,
    name: "Periodontal Surgery Kit",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=400&fit=crop",
    category: "Periodontics",
    description: "Complete surgical kit for periodontal procedures including scalers, elevators, and sutures.",
    features: ["Complete Kit", "Surgical Grade", "Multiple Instruments", "Sterile Packaging", "Case Included"]
  },

  // Preventive & Oral Care
  {
    id: 8001,
    name: "Fluoride Varnish Kit",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=400&fit=crop",
    category: "Preventive & Oral Care",
    description: "Professional fluoride varnish for caries prevention with easy application and pleasant taste.",
    features: ["Easy Application", "Pleasant Taste", "Caries Prevention", "Multiple Flavors", "Unit Dose Packets"]
  },
  {
    id: 8002,
    name: "Dental Sealant System",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=400&fit=crop",
    category: "Preventive & Oral Care",
    description: "Light-cured pit and fissure sealant for preventing dental caries in posterior teeth.",
    features: ["Light-Cured", "Low Viscosity", "High Retention", "Fluoride Release", "Easy Application"]
  },
  {
    id: 8003,
    name: "Prophy Paste Assortment",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=400&fit=crop",
    category: "Preventive & Oral Care",
    description: "Professional prophylaxis paste in various grits and flavors for effective plaque removal.",
    features: ["Various Grits", "Multiple Flavors", "Effective Cleaning", "Fluoride Enriched", "Unit Dose Cups"]
  },

  // Restoratives
  {
    id: 9001,
    name: "Composite Resin Kit",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=400&fit=crop",
    category: "Restoratives",
    description: "Universal composite resin system with multiple shades for anterior and posterior restorations.",
    features: ["Multiple Shades", "Universal System", "High Strength", "Easy Polishing", "Shade Guide Included"]
  },
  {
    id: 9002,
    name: "Dental Amalgam Capsules",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=400&fit=crop",
    category: "Restoratives",
    description: "Pre-measured amalgam capsules for consistent and reliable posterior restorations.",
    features: ["Pre-Measured", "Consistent Mix", "High Strength", "Easy Activation", "Pack of 50"]
  },
  {
    id: 9003,
    name: "Bonding Agent System",
    price: 229.99,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop",
    category: "Restoratives",
    description: "Universal bonding system for reliable adhesion to enamel, dentin, and various restorative materials.",
    features: ["Universal System", "Strong Adhesion", "Easy Application", "Multiple Substrates", "Light-Cured"]
  }
];
