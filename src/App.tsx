import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShoppingCart,
  Upload,
  Settings2,
  Package,
  Printer, 
  Lightbulb, 
  Layers, 
  ChevronRight, 
  Mail, 
  Instagram, 
  Twitter, 
  CheckCircle2, 
  ArrowRight,
  Menu,
  X,
  Box,
  Zap,
  ShieldCheck,
  Database,
  Clock,
  User,
  ExternalLink,
  Trash2,
  Circle,
  CheckCircle,
  PlayCircle,
  FileText,
  Image as ImageIcon,
  ChevronLeft,
  Paperclip
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass rounded-2xl px-6 py-3 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-brand-dark p-1.5 rounded-lg">
            <Printer className="w-5 h-5 text-brand-primary" />
          </div>
          <span className="font-bold text-xl tracking-tighter">D3V PRINTS</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#services" className="hover:text-brand-primary transition-colors">Services</a>
          <a href="#lithophanes" className="hover:text-brand-primary transition-colors">Lithophanes</a>
          <a href="#custom" className="hover:text-brand-primary transition-colors">Custom Prints</a>
          <a href="#products" className="hover:text-brand-primary transition-colors">Products</a>
          <a href="#gallery" className="hover:text-brand-primary transition-colors">Gallery</a>
          <a href="#contact" className="bg-brand-dark text-white px-5 py-2 rounded-xl hover:bg-brand-dark/90 transition-all">Get a Quote</a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-6 right-6 glass rounded-2xl p-6 flex flex-col gap-4 md:hidden shadow-xl"
          >
            <a href="#services" onClick={() => setIsOpen(false)} className="text-lg font-medium">Services</a>
            <a href="#lithophanes" onClick={() => setIsOpen(false)} className="text-lg font-medium">Lithophanes</a>
            <a href="#custom" onClick={() => setIsOpen(false)} className="text-lg font-medium">Custom Prints</a>
            <a href="#products" onClick={() => setIsOpen(false)} className="text-lg font-medium">Products</a>
            <a href="#gallery" onClick={() => setIsOpen(false)} className="text-lg font-medium">Gallery</a>
            <a href="#contact" onClick={() => setIsOpen(false)} className="bg-brand-dark text-white px-5 py-3 rounded-xl text-center">Get a Quote</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <Zap className="w-3 h-3" /> Precision Manufacturing
          </div>
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-[0.9] mb-6">
            Turning Pixels <br />
            <span className="text-brand-primary italic">Into Plastic.</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-md mb-8 leading-relaxed">
            D3V Prints brings your digital designs to life with industrial grade precision. Specializing in custom lithophanes and functional prototypes.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#contact" className="bg-brand-dark text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-2 hover:scale-105 transition-transform">
              Start Your Project <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#gallery" className="bg-white border border-gray-200 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-colors">
              View Gallery
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative group">
            <img 
              src="/front1.png" 
              alt="3D Printing in action" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <div className="flex items-center gap-4 mb-2">
                <div className="h-[1px] flex-1 bg-white/30" />
                <span className="text-xs font-mono uppercase tracking-widest opacity-70">Current Build: Lithophane Night Light</span>
              </div>
              <p className="text-sm font-medium opacity-90">Layer Height: 0.12mm | Material: PLA+ White</p>
            </div>
          </div>
          
          {/* Floating Stats */}
          <div className="absolute -top-6 -right-6 glass p-6 rounded-2xl shadow-lg hidden sm:block">
            <div className="text-3xl font-bold text-brand-primary">99.8%</div>
            <div className="text-xs font-mono uppercase tracking-tighter text-gray-500">Success Rate</div>
          </div>
          <div className="absolute -bottom-6 -left-6 glass p-6 rounded-2xl shadow-lg hidden sm:block">
            <div className="text-3xl font-bold">24/7</div>
            <div className="text-xs font-mono uppercase tracking-tighter text-gray-500">Operation</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const LithophaneSection = () => {
  return (
    <section id="lithophanes" className="py-24 px-6 bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img src="https://picsum.photos/seed/litho1/400/600" alt="Lithophane 1" className="rounded-2xl w-full aspect-[3/4] object-cover" referrerPolicy="no-referrer" />
              <img src="https://picsum.photos/seed/litho2/400/400" alt="Lithophane 2" className="rounded-2xl w-full aspect-square object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="space-y-4 pt-12">
              <img src="https://picsum.photos/seed/litho3/400/400" alt="Lithophane 3" className="rounded-2xl w-full aspect-square object-cover" referrerPolicy="no-referrer" />
              <img src="https://picsum.photos/seed/litho4/400/600" alt="Lithophane 4" className="rounded-2xl w-full aspect-[3/4] object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-5xl font-bold mb-8 leading-tight">
              Memories Captured <br />
              <span className="text-brand-primary">In Light.</span>
            </h2>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed">
              Our signature Lithophane Night Lights transform your favorite photos into stunning 3D-printed art. When the light turns on, your image appears in photographic detail.
            </p>
            
            <ul className="space-y-6 mb-12">
              {[
                "High-resolution 0.1mm layer detail",
                "Custom fitted LED night light bases",
                "Durable, heat-resistant materials",
                "Perfect for gifts and memorials"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="bg-brand-primary/20 p-1 rounded-full">
                    <CheckCircle2 className="w-5 h-5 text-brand-primary" />
                  </div>
                  <span className="text-lg font-medium">{item}</span>
                </li>
              ))}
            </ul>
            
            <a href="#contact" className="group flex items-center gap-3 text-xl font-bold hover:text-brand-primary transition-colors">
              Order Your Custom Lithophane <ChevronRight className="group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const CustomPrints = () => {
  const steps = [
    {
      icon: <Upload className="w-6 h-6" />,
      title: "Upload Design",
      desc: "Send us your STL, OBJ, or STEP files via our quote form."
    },
    {
      icon: <Settings2 className="w-6 h-6" />,
      title: "Select Specs",
      desc: "Choose material, color, and infill density for your part."
    },
    {
      icon: <Printer className="w-6 h-6" />,
      title: "Precision Print",
      desc: "We print your design using industrial-grade FDM."
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: "Fast Delivery",
      desc: "Carefully packed and shipped directly to your door."
    }
  ];

  return (
    <section id="custom" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Bespoke Manufacturing
            </div>
            <h2 className="text-5xl font-bold mb-8 leading-tight">
              Your Vision, <br />
              <span className="text-brand-primary">Perfectly Printed.</span>
            </h2>
            <p className="text-xl text-gray-500 mb-10 leading-relaxed">
              From one off prototypes to functional replacement parts, we handle custom 3D printing projects of all complexities.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-8">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-brand-light flex items-center justify-center text-brand-primary">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{step.title}</h4>
                    <p className="text-sm text-gray-500 leading-snug">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 flex gap-4">
              <a href="#contact" className="bg-brand-dark text-white px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-transform inline-block">
                Request Custom Quote
              </a>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img 
                src="https://picsum.photos/seed/customprint/800/1000" 
                alt="Custom 3D Print" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute top-8 right-8 glass px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-widest">
              Material: Carbon Fiber PLA
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const DetailModal = ({ item, onClose }: { item: any; onClose: () => void }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-4xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-black/10 flex items-center justify-center hover:bg-black/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-full md:w-1/2 aspect-square md:aspect-auto">
          <img 
            src={item.image} 
            alt={item.title || item.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <div className="text-xs font-mono font-bold text-brand-primary uppercase tracking-widest mb-2">
            {item.category || item.tag}
          </div>
          <h3 className="text-3xl font-bold mb-6">{item.title || item.name}</h3>
          <p className="text-gray-600 mb-8 leading-relaxed">
            {item.description || "High-quality 3D printed product crafted with precision and care."}
          </p>
          
          <div className="bg-brand-light p-6 rounded-2xl mb-8">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400 mb-2">
              {item.specs ? "Technical Specs" : "Product Details"}
            </div>
            <div className="text-sm font-medium text-brand-dark">
              {item.specs || `Price: ${item.price} | Availability: In Stock`}
            </div>
          </div>

          <div className="flex gap-4">
            <a 
              href="#contact" 
              onClick={onClose}
              className="flex-1 bg-brand-dark text-white text-center py-4 rounded-xl font-bold hover:bg-brand-primary transition-colors"
            >
              {item.price ? "Order Now" : "Inquire About This"}
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const CurrentProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const products = [
    {
      id: 1,
      name: "Mini Octopus",
      price: "$5.00",
      tag: "Best Seller",
      image: "https://picsum.photos/seed/dragon/600/600",
      description: "A stunning, fully articulated dragon with a shimmering crystal-like texture. Each joint moves independently, making it a perfect fidget toy or display piece."
    },
    {
      id: 2,
      name: "Geometric Self Watering Planter",
      price: "$18.50",
      tag: "Eco-Friendly",
      image: "https://picsum.photos/seed/planter/600/600",
      description: "A modern geometric planter featuring a dual-chamber design. The bottom reservoir holds water, while the top chamber wicks moisture to your plant's roots."
    },
    {
      id: 3,
      name: "Modular Desk Organizer",
      price: "$32.00",
      tag: "New Arrival",
      image: "https://picsum.photos/seed/desk/600/600",
      description: "Keep your workspace tidy with this customizable modular organizer. Includes sections for pens, phone, cables, and small stationery items."
    },
    {
      id: 4,
      name: "Low-Poly Animal Sculpture",
      price: "$15.00",
      tag: "Artistic",
      image: "https://picsum.photos/seed/sculpture/600/600",
      description: "A minimalist, low-poly interpretation of a majestic wolf. Printed with a matte finish to emphasize the sharp geometric facets."
    }
  ];

  return (
    <section id="products" className="py-24 px-6 bg-brand-light">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-bold mb-4 italic">Popular Products</h2>
            <p className="text-gray-500 max-w-md">Our most requested items, crafted with the same precision as our custom work.</p>
          </div>
          <a href="#gallery" className="flex items-center gap-2 text-brand-primary font-bold hover:underline">
            Browse Full Shop <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <motion.div 
              key={product.id}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100"
            >
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-brand-primary text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md">
                  {product.tag}
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => setSelectedProduct(product)}
                    className="bg-white text-brand-dark px-4 py-2 rounded-xl text-sm font-bold hover:scale-105 transition-transform"
                  >
                    View Details
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-1 group-hover:text-brand-primary transition-colors">{product.name}</h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xl font-bold font-mono">{product.price}</span>
                  <button 
                    onClick={() => setSelectedProduct(product)}
                    className="bg-brand-dark text-white p-3 rounded-xl hover:bg-brand-primary transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <DetailModal item={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Custom Lithophanes",
      desc: "From flat panels to curved night lights and lampshades."
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Rapid Prototyping",
      desc: "Fast turnaround for functional parts and engineering models."
    },
    {
      icon: <Box className="w-8 h-8" />,
      title: "Small Batch Production",
      desc: "Consistent quality for orders of 10 to 500 units."
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Material Consultation",
      desc: "Expert advice on PLA, PETG, ABS, and TPU selection."
    }
  ];

  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Capabilities</h2>
          <p className="text-gray-500 max-w-xl">We leverage cutting edge FDM technology to deliver parts that exceed expectations.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="text-brand-primary mb-6">{s.icon}</div>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const galleryItems = [
    { id: 1, title: "Custom Lithophane Night Light", category: "Lithophanes", description: "A high-detail lithophane created from a family portrait, mounted on a custom LED night light base.", specs: "Material: PLA+ White | Print Time: 14h | Resolution: 0.1mm", image: "https://picsum.photos/seed/print1/800/800" },
    { id: 2, title: "Industrial Gear Prototype", category: "Functional", description: "A functional replacement gear for a vintage lathe. Printed in Carbon Fiber Nylon for high strength.", specs: "Material: CF-Nylon | Infill: 100% | Tolerance: ±0.1mm", image: "https://picsum.photos/seed/print2/800/800" },
    { id: 3, title: "Articulated Dragon Sculpture", category: "Artistic", description: "A fully articulated dragon printed in one piece. Features 42 moving joints and a stunning silk-finish gradient.", specs: "Material: Silk PLA | Print Time: 22h | Size: 45cm", image: "https://picsum.photos/seed/print3/800/800" },
    { id: 4, title: "Architectural Scale Model", category: "Functional", description: "A 1:50 scale model of a modern residential complex used for client presentations.", specs: "Material: Matte PLA | Parts: 12 | Scale: 1:50", image: "https://picsum.photos/seed/print4/800/800" },
    { id: 5, title: "Custom Orthopedic Grip", category: "Functional", description: "An ergonomically designed grip for a surgical tool, customized to the surgeon's hand scan.", specs: "Material: TPU (Flexible) | Shore Hardness: 95A", image: "https://picsum.photos/seed/print5/800/800" },
    { id: 6, title: "Curved Lithophane Lamp", category: "Lithophanes", description: "A 360-degree lithophane lampshade featuring a panoramic landscape.", specs: "Material: PLA | Diameter: 150mm | Light: Warm LED", image: "https://picsum.photos/seed/print6/800/800" },
    { id: 7, title: "Low-Poly Planter Set", category: "Artistic", description: "A set of three geometric planters with integrated drainage.", specs: "Material: Marble PLA | Finish: Matte", image: "https://picsum.photos/seed/print7/800/800" },
    { id: 8, title: "Mechanical Linkage Assembly", category: "Functional", description: "A complex four-bar linkage system used for testing mechanical movements.", specs: "Material: PETG | Assembly: Snap-fit", image: "https://picsum.photos/seed/print8/800/800" }
  ];

  const filteredItems = activeCategory === 'All' ? galleryItems : galleryItems.filter(item => item.category === activeCategory);

  return (
    <section id="gallery" className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-bold mb-4">Recent Prints</h2>
            <p className="text-gray-500">A showcase of our latest work across various industries.</p>
          </div>
          <div className="flex gap-2">
            {['All', 'Lithophanes', 'Functional', 'Artistic'].map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? 'bg-brand-dark text-white shadow-md' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }} key={item.id} className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button onClick={() => setSelectedItem(item)} className="bg-white text-brand-dark px-4 py-2 rounded-xl text-sm font-bold hover:scale-105 transition-transform">View Details</button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <AnimatePresence>
        {selectedItem && <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
      </AnimatePresence>
    </section>
  );
};

const Contact = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', projectType: '', message: '' });
  const [uploadedFiles, setUploadedFiles] = useState<{name: string, url: string}[]>([]);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const projectTypes = [
    { id: 'lithophane', title: 'Night Light', description: 'Custom lithophane from your photo', icon: <ImageIcon className="w-6 h-6" /> },
    { id: 'prototype', title: 'Functional Prototype', description: 'Engineering & mechanical parts', icon: <Printer className="w-6 h-6" /> },
    { id: 'art', title: 'Artistic Print', description: 'Models, figures & decor', icon: <Box className="w-4 h-4" /> },
    { id: 'custom', title: 'Custom Project', description: 'Something unique or specific', icon: <FileText className="w-6 h-6" /> }
  ];

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setUploading(true);

    const uploaded: {name: string, url: string}[] = [];
    for (const file of files) {
      const data = new FormData();
      data.append('UPLOADCARE_PUB_KEY', 'bc495550492636fc4db6');
      data.append('UPLOADCARE_STORE', '1');
      data.append('file', file);

      try {
        const res = await fetch('https://upload.uploadcare.com/base/', {
          method: 'POST',
          body: data
        });
        const json = await res.json();
        uploaded.push({ name: file.name, url: `https://ucarecdn.com/${json.file}/` });
      } catch (err) {
        console.error('Upload error:', err);
      }
    }

    setUploadedFiles(prev => [...prev, ...uploaded]);
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const fileLinks = uploadedFiles.length > 0
      ? uploadedFiles.map(f => `${f.name}: ${f.url}`).join('\n')
      : 'No files uploaded';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: '28aa3f21-d905-4e73-95bb-686ad236eb55',
          subject: `New D3V Prints Inquiry: ${formData.projectType}`,
          name: formData.name,
          email: formData.email,
          projectType: formData.projectType,
          message: formData.message,
          files: fileLinks
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', projectType: '', message: '' });
        setUploadedFiles([]);
        setStep(1);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-brand-dark rounded-[3rem] p-8 lg:p-20 text-white relative overflow-hidden">
          <div className="relative z-10 grid lg:grid-cols-5 gap-16">
            <div className="lg:col-span-2">
              <h2 className="text-5xl font-bold mb-8 leading-tight">Start Your <br /><span className="text-brand-primary">Project</span></h2>
              <p className="text-xl text-gray-400 mb-12">Follow our interactive process to get a precise quote for your 3D printing needs.</p>
              <div className="hidden lg:block space-y-8">
                {[1, 2, 3].map((s) => (
                  <div key={s} className={`flex items-center gap-4 transition-opacity ${step >= s ? 'opacity-100' : 'opacity-30'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${step >= s ? 'bg-brand-primary border-brand-primary text-brand-dark' : 'border-white/20'}`}>{s}</div>
                    <div className="text-sm font-bold uppercase tracking-widest">{s === 1 ? 'Select Project' : s === 2 ? 'Project Details' : 'Contact Info'}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3 bg-white rounded-[2.5rem] p-8 lg:p-12 text-brand-dark">
              {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Order Received!</h3>
                  <p className="text-gray-500 mb-8">We've received your details and will get back to you with a quote within 24 hours.</p>
                  <button onClick={() => setStatus('idle')} className="bg-brand-dark text-white px-8 py-4 rounded-2xl font-bold hover:bg-brand-primary transition-colors">Start New Order</button>
                </div>
              ) : (
                <div className="h-full flex flex-col">
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                      <h3 className="text-2xl font-bold mb-6">What are we printing today?</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {projectTypes.map((type) => (
                          <button key={type.id} onClick={() => { setFormData({ ...formData, projectType: type.title }); setStep(2); }}
                            className="text-left p-6 rounded-3xl border-2 border-gray-100 hover:border-brand-primary hover:bg-brand-primary/5 transition-all group">
                            <div className="w-12 h-12 rounded-2xl bg-gray-100 group-hover:bg-brand-primary/20 flex items-center justify-center mb-4 transition-colors">{type.icon}</div>
                            <div className="font-bold text-lg">{type.title}</div>
                            <div className="text-sm text-gray-500 mt-1">{type.description}</div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold">Project Details</h3>
                        <span className="text-sm font-bold text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-full">{formData.projectType}</span>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Description / Requirements</label>
                          <textarea rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none resize-none"
                            placeholder={formData.projectType === 'Night Light' ? "Tell us about the photo or any text you want included..." : "Describe dimensions, material preferences, or intended use..."} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                            {formData.projectType === 'Night Light' ? 'Upload Photos' : 'Upload Files (STL, STEP, etc.)'}
                          </label>
                          <div className="relative group">
                            <input type="file" multiple onChange={handleUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                            <div className="border-2 border-dashed border-gray-200 group-hover:border-brand-primary rounded-2xl p-8 text-center transition-colors">
                              <Upload className="w-8 h-8 text-gray-300 group-hover:text-brand-primary mx-auto mb-2" />
                              <div className="text-sm font-bold text-gray-500">
                                {uploading ? 'Uploading...' : uploadedFiles.length > 0 ? `${uploadedFiles.length} file(s) uploaded ✓` : 'Drag & drop or click to upload'}
                              </div>
                              <div className="text-xs text-gray-400 mt-1">Max file size: 10MB</div>
                            </div>
                          </div>
                          {uploadedFiles.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {uploadedFiles.map((f, i) => (
                                <a key={i} href={f.url} target="_blank" rel="noopener noreferrer"
                                  className="bg-gray-100 px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-2 hover:bg-gray-200">
                                  <Paperclip className="w-3 h-3" /> {f.name}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-4 pt-4">
                        <button onClick={() => setStep(1)} className="flex-1 px-8 py-4 rounded-2xl font-bold border-2 border-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                          <ChevronLeft className="w-5 h-5" /> Back
                        </button>
                        <button onClick={() => setStep(3)} disabled={!formData.message || uploading}
                          className="flex-[2] bg-brand-dark text-white px-8 py-4 rounded-2xl font-bold hover:bg-brand-primary transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                          Next Step <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                      <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Your Name</label>
                          <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                          <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none" placeholder="john@example.com" />
                        </div>
                      </div>
                      <div className="flex gap-4 pt-4">
                        <button onClick={() => setStep(2)} className="flex-1 px-8 py-4 rounded-2xl font-bold border-2 border-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                          <ChevronLeft className="w-5 h-5" /> Back
                        </button>
                        <button onClick={handleSubmit} disabled={!formData.name || !formData.email || status === 'submitting'}
                          className="flex-[2] bg-brand-dark text-white px-8 py-4 rounded-2xl font-bold hover:bg-brand-primary transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                          {status === 'submitting' ? 'Sending...' : 'Submit Inquiry'}
                        </button>
                      </div>
                      {status === 'error' && <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>}
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 blur-[100px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-primary/10 blur-[100px] -ml-32 -mb-32" />
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="bg-brand-dark p-1.5 rounded-lg">
            <Printer className="w-4 h-4 text-brand-primary" />
          </div>
          <span className="font-bold text-lg tracking-tighter">D3V PRINTS</span>
        </div>
        <div className="flex gap-8 text-sm text-gray-500 font-medium">
          <a href="#" className="hover:text-brand-dark transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-brand-dark transition-colors">Terms of Service</a>
          <Link to="/developer" className="hover:text-brand-dark transition-colors">Developer Access</Link>
        </div>
        <div className="flex gap-4">
          <a href="https://www.instagram.com/d3v.prints/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
            <Instagram className="w-4 h-4" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
            <Twitter className="w-4 h-4" />
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto text-center mt-12 text-xs text-gray-400 font-mono uppercase tracking-widest">
        © {new Date().getFullYear()} D3V Prints. All rights reserved. Built with precision.
      </div>
    </footer>
  );
};

const DeveloperDashboard = () => {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const DEV_PASSWORD = 'admin';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password === DEV_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('dev_password', password);
      fetchInquiries();
    } else {
      setError('Invalid password');
    }
  };

  useEffect(() => {
    const savedPassword = sessionStorage.getItem('dev_password');
    if (savedPassword) {
      setPassword(savedPassword);
      setIsAuthenticated(true);
    }
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.web3forms.com/submissions?apikey=28aa3f21-d905-4e73-95bb-686ad236eb55', {
        headers: { 'Accept': 'application/json' }
      });
      const data = await response.json();
      setInquiries(data.data || []);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchInquiries();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold">Developer Access</h1>
            <p className="text-gray-500 text-sm mt-2">Please enter your password to access the dashboard.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none"
                placeholder="••••••••" required />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button className="w-full bg-brand-dark text-white py-4 rounded-xl font-bold hover:bg-brand-primary transition-colors">Unlock Dashboard</button>
          </form>
          <div className="mt-8 text-center">
            <Link to="/" className="text-sm font-bold text-gray-400 hover:text-brand-dark transition-colors flex items-center justify-center gap-2">
              <ArrowRight className="w-4 h-4 rotate-180" /> Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3"><Database className="text-brand-primary" /> Developer Dashboard</h1>
            <p className="text-gray-500">View all incoming project inquiries.</p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={fetchInquiries} className="text-sm font-bold text-brand-primary hover:underline">Refresh</button>
            <button onClick={() => { setIsAuthenticated(false); sessionStorage.removeItem('dev_password'); }} className="text-sm font-bold text-gray-400 hover:text-red-500 transition-colors">Logout</button>
            <Link to="/" className="text-sm font-bold text-brand-primary hover:underline flex items-center gap-1"><ArrowRight className="w-4 h-4 rotate-180" /> Back to Site</Link>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="bg-white rounded-3xl p-20 text-center shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="text-gray-400 w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold mb-2">No inquiries yet</h2>
            <p className="text-gray-500">When customers fill out the contact form, they will appear here.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {inquiries.map((inquiry, idx) => (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} key={idx}
                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
                        <User className="w-4 h-4 text-gray-400" />{inquiry.name}
                      </div>
                      <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
                        <Mail className="w-4 h-4 text-gray-400" />{inquiry.email}
                      </div>
                      {inquiry.projectType && (
                        <div className="flex items-center gap-2 bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-sm font-bold">
                          <Box className="w-4 h-4" />{inquiry.projectType}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Message</h3>
                      <p className="text-gray-700 leading-relaxed">{inquiry.message}</p>
                    </div>
                    {inquiry.files && inquiry.files !== 'No files uploaded' && (
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Attached Files</h3>
                        <div className="flex flex-wrap gap-2">
                          {inquiry.files.split('\n').map((line: string, i: number) => {
                            const [name, url] = line.split(': ');
                            return url ? (
                              <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-xl text-xs font-bold transition-colors">
                                <Paperclip className="w-3 h-3" />{name}
                              </a>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="text-right shrink-0 flex flex-col items-end gap-4">
                    <div className="flex items-center gap-2 text-gray-400 text-xs font-mono uppercase">
                      <Clock className="w-3 h-3" />{new Date(inquiry.created_at).toLocaleString()}
                    </div>
                    <a href={`mailto:${inquiry.email}`}
                      className="inline-flex items-center gap-2 bg-brand-dark text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-brand-primary transition-colors">
                      Reply <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Home = () => (
  <main>
    <Hero />
    <Services />
    <LithophaneSection />
    <CustomPrints />
    <CurrentProducts />
    <Gallery />
    <Contact />
  </main>
);

export default function App() {
  const location = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  return (
    <div className="min-h-screen selection:bg-brand-primary selection:text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/developer" element={<DeveloperDashboard />} />
      </Routes>
      <Footer />
    </div>
  );
}
