
export interface MedicalProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  features: string[];
}

export const medicalProducts: MedicalProduct[] = [
  // Hospital Furniture
  {
    id: 101,
    name: "Electric Hospital Bed",
    price: 2499.99,
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=400&fit=crop",
    category: "Hospital Furniture",
    description: "Premium electric hospital bed with adjustable height, backrest, and leg rest. Features side rails for patient safety and easy mobility.",
    features: ["Electric Height Adjustment", "Trendelenburg Position", "Side Rails", "Central Locking Wheels", "Aluminum Alloy Frame"]
  },
  {
    id: 102,
    name: "Medical Examination Table",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop",
    category: "Hospital Furniture",
    description: "Adjustable examination table with comfortable padding and paper roll holder. Ideal for patient examinations and minor procedures.",
    features: ["Adjustable Height", "Comfortable Padding", "Paper Roll Holder", "Stainless Steel Frame", "Easy to Clean"]
  },
  {
    id: 103,
    name: "Medical Cart with Drawers",
    price: 649.99,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop",
    category: "Hospital Furniture",
    description: "Mobile medical cart with multiple drawers for organizing medical supplies. Features smooth-rolling wheels and secure locking system.",
    features: ["5 Spacious Drawers", "Smooth Rolling Wheels", "Central Locking", "Stainless Steel Construction", "Antimicrobial Surface"]
  },

  // Medical Devices
  {
    id: 201,
    name: "Digital Blood Pressure Monitor",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=400&fit=crop",
    category: "Medical Devices",
    description: "Automatic digital blood pressure monitor with large LCD display and memory function. Clinically validated for accuracy.",
    features: ["Large LCD Display", "Memory for 60 Readings", "Irregular Heartbeat Detection", "Auto Power Off", "WHO Classification Indicator"]
  },
  {
    id: 202,
    name: "Pulse Oximeter",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=400&fit=crop",
    category: "Medical Devices",
    description: "Fingertip pulse oximeter for measuring oxygen saturation and pulse rate. Suitable for both clinical and home use.",
    features: ["SpO2 and Pulse Rate Display", "OLED Display", "Low Battery Indicator", "Auto Power Off", "Pediatric and Adult Use"]
  },
  {
    id: 203,
    name: "Digital Thermometer",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    category: "Medical Devices",
    description: "Fast and accurate digital thermometer with flexible tip. Features fever alarm and memory recall function.",
    features: ["10 Second Reading", "Fever Alarm", "Memory Recall", "Waterproof Tip", "Auto Shut-off"]
  },

  // Surgical Instruments
  {
    id: 301,
    name: "Surgical Scissor Set",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=400&fit=crop",
    category: "Surgical Instruments",
    description: "Professional surgical scissor set made from premium stainless steel. Includes various sizes for different procedures.",
    features: ["Stainless Steel Construction", "Sharp Precision Blades", "Ergonomic Design", "Autoclave Safe", "Set of 6 Scissors"]
  },
  {
    id: 302,
    name: "Surgical Forceps Set",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=400&fit=crop",
    category: "Surgical Instruments",
    description: "Complete set of surgical forceps for various medical procedures. Made from high-grade stainless steel.",
    features: ["High-Grade Stainless Steel", "Non-Slip Grip", "Various Tip Designs", "Autoclave Compatible", "Set of 8 Forceps"]
  },
  {
    id: 303,
    name: "Disposable Scalpel Blades",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=400&fit=crop",
    category: "Surgical Instruments",
    description: "Sterile disposable scalpel blades for precise surgical incisions. Carbon steel construction for maximum sharpness.",
    features: ["Sterile Packaging", "Carbon Steel Blades", "Multiple Sizes Available", "Single Use", "Box of 100"]
  },

  // Laboratory Equipment
  {
    id: 401,
    name: "Digital Microscope",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1581093458791-9d42e3c7ef39?w=400&h=400&fit=crop",
    category: "Laboratory Equipment",
    description: "High-resolution digital microscope with LED illumination and built-in camera. Perfect for medical diagnostics and research.",
    features: ["1000x Magnification", "LED Illumination", "Built-in Camera", "USB Connectivity", "Software Included"]
  },
  {
    id: 402,
    name: "Centrifuge Machine",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=400&fit=crop",
    category: "Laboratory Equipment",
    description: "Benchtop centrifuge for blood and urine sample separation. Features digital display and multiple speed settings.",
    features: ["Digital Speed Control", "Timer Function", "Safety Lock System", "Quiet Operation", "12 Tube Capacity"]
  },
  {
    id: 403,
    name: "Lab Test Tube Set",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1582719471769-e1e1b3a2e56b?w=400&h=400&fit=crop",
    category: "Laboratory Equipment",
    description: "Borosilicate glass test tubes for laboratory use. Heat resistant and chemically inert for accurate testing.",
    features: ["Borosilicate Glass", "Heat Resistant", "Various Sizes", "Graduated Markings", "Set of 50"]
  },

  // Patient Care
  {
    id: 501,
    name: "Wheelchair - Standard",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=400&fit=crop",
    category: "Patient Care",
    description: "Standard manual wheelchair with comfortable seating and easy-to-use hand rims. Foldable for easy transport.",
    features: ["Foldable Design", "Comfortable Cushioning", "Easy Hand Rims", "Footrest Included", "Weight Capacity 120kg"]
  },
  {
    id: 502,
    name: "Patient Monitor Stand",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop",
    category: "Patient Care",
    description: "Mobile stand for patient monitors with adjustable height and secure mounting system. Includes cable management.",
    features: ["Adjustable Height", "Secure Mounting", "Cable Management", "Mobile Base", "Locking Wheels"]
  },
  {
    id: 503,
    name: "Nebulizer Machine",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop",
    category: "Patient Care",
    description: "Compact nebulizer for respiratory therapy. Quiet operation with effective medication delivery system.",
    features: ["Quiet Operation", "Compact Design", "Effective Nebulization", "Easy Cleaning", "Complete Kit Included"]
  },

  // Diagnostic Equipment
  {
    id: 601,
    name: "ECG Machine - 12 Lead",
    price: 2299.99,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=400&fit=crop",
    category: "Diagnostic Equipment",
    description: "12-lead ECG machine with thermal printer and interpretation software. Portable design for bedside use.",
    features: ["12-Lead Recording", "Thermal Printer", "Interpretation Software", "Portable Design", "Large LCD Display"]
  },
  {
    id: 602,
    name: "Ultrasound Machine",
    price: 15999.99,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=400&fit=crop",
    category: "Diagnostic Equipment",
    description: "Portable ultrasound machine with high-resolution imaging and multiple probe compatibility. Ideal for various diagnostic applications.",
    features: ["High Resolution Imaging", "Multiple Probe Support", "Color Doppler", "Portable Design", "DICOM Connectivity"]
  },
  {
    id: 603,
    name: "Otoscope Set",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=400&fit=crop",
    category: "Diagnostic Equipment",
    description: "Professional otoscope set for ear examination with LED illumination and multiple speculum sizes.",
    features: ["LED Illumination", "Multiple Speculum Sizes", "Magnifying Lens", "Rechargeable Battery", "Carrying Case Included"]
  },

  // Disposable Supplies
  {
    id: 701,
    name: "Disposable Gloves - Nitrile",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=400&fit=crop",
    category: "Disposable Supplies",
    description: "Powder-free nitrile examination gloves. Latex-free and suitable for sensitive skin. Available in multiple sizes.",
    features: ["Powder-Free", "Latex-Free", "Puncture Resistant", "Textured Fingertips", "Box of 100"]
  },
  {
    id: 702,
    name: "Surgical Masks - N95",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    category: "Disposable Supplies",
    description: "N95 respirator masks providing 95% filtration efficiency. NIOSH approved for medical use.",
    features: ["95% Filtration Efficiency", "NIOSH Approved", "Comfortable Fit", "Adjustable Nose Clip", "Box of 50"]
  },
  {
    id: 703,
    name: "Disposable Syringes",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=400&fit=crop",
    category: "Disposable Supplies",
    description: "Sterile disposable syringes with Luer slip tip. Available in various sizes for different applications.",
    features: ["Sterile Packaging", "Luer Slip Tip", "Clear Barrel", "Various Sizes", "Box of 100"]
  },

  // Emergency Equipment
  {
    id: 801,
    name: "Defibrillator - AED",
    price: 3499.99,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop",
    category: "Emergency Equipment",
    description: "Automated External Defibrillator with voice prompts and visual indicators. Easy to use in emergency situations.",
    features: ["Voice Prompts", "Visual Indicators", "Adult/Child Modes", "Self-Testing", "Carrying Case Included"]
  },
  {
    id: 802,
    name: "Emergency Crash Cart",
    price: 1899.99,
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=400&fit=crop",
    category: "Emergency Equipment",
    description: "Fully equipped emergency crash cart with multiple compartments and essential life-saving equipment.",
    features: ["Multiple Compartments", "Locking System", "Defibrillator Shelf", "IV Pole", "Emergency Supplies Included"]
  }
];
