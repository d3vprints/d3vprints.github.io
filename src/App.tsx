import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  ShoppingCart, Upload, Settings2, Package, Printer, Lightbulb, Layers,
  ChevronRight, Mail, Instagram, Twitter, CheckCircle2, ArrowRight, Menu, X,
  Box, Zap, ShieldCheck, Database, Clock, User, ExternalLink, Circle,
  CheckCircle, PlayCircle, FileText, Image as ImageIcon, ChevronLeft, Paperclip, Star, Heart, Camera
} from 'lucide-react';
 
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
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#lithophanes" className="hover:text-brand-primary transition-colors font-semibold text-brand-primary">Lithophanes ✦</a>
          <a href="#how-it-works" className="hover:text-brand-primary transition-colors">How It Works</a>
          <a href="#products" className="hover:text-brand-primary transition-colors">Other Prints</a>
          {/* <a href="#gallery" className="hover:text-brand-primary transition-colors">Gallery</a> */}
          <a href="#contact" className="bg-brand-dark text-white px-5 py-2 rounded-xl hover:bg-brand-dark/90 transition-all">Order Now</a>
        </div>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-6 right-6 glass rounded-2xl p-6 flex flex-col gap-4 md:hidden shadow-xl">
            <a href="#lithophanes" onClick={() => setIsOpen(false)} className="text-lg font-semibold text-brand-primary">Lithophanes ✦</a>
            <a href="#how-it-works" onClick={() => setIsOpen(false)} className="text-lg font-medium">How It Works</a>
            <a href="#products" onClick={() => setIsOpen(false)} className="text-lg font-medium">Other Prints</a>
            {/* <a href="#gallery" onClick={() => setIsOpen(false)} className="text-lg font-medium">Gallery</a> */}
            <a href="#contact" onClick={() => setIsOpen(false)} className="bg-brand-dark text-white px-5 py-3 rounded-xl text-center">Order Now</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
 
const Hero = () => (
  <section className="relative pt-32 pb-20 px-6 overflow-hidden">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
      <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
        <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
          <Camera className="w-3 h-3" /> Turn Your Photos Into Art
        </div>
        <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-[0.9] mb-6">
          Your Memories, <br />
          <span className="text-brand-primary italic">Glowing Forever.</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-md mb-8 leading-relaxed">
          D3V Prints transforms your favorite photos into stunning lithophane night lights. Upload a photo we do the rest.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="#contact" className="bg-brand-dark text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-2 hover:scale-105 transition-transform">
            Order a Night Light <ArrowRight className="w-5 h-5" />
          </a>
          <a href="#lithophanes" className="bg-white border border-gray-200 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-colors">
            See Examples
          </a>
        </div>
        <div className="flex items-center gap-6 mt-10">
          <div className="flex -space-x-2">
            {[1,2,3,4].map(i => (
              <div key={i} className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-primary/40 to-brand-primary border-2 border-white" />
            ))}
          </div>
          <div>
            <div className="flex text-yellow-400 text-sm">{"★★★★★"}</div>
            <p className="text-xs text-gray-500 mt-0.5">Loved by 100+ customers</p>
          </div>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
        <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative group">
          <img src="/all litho.png" alt="Lithophane Night Light" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <div className="flex items-center gap-4 mb-2">
              <div className="h-[1px] flex-1 bg-white/30" />
              <span className="text-xs font-mono uppercase tracking-widest opacity-70">Lithophane Night Light</span>
            </div>
            <p className="text-sm font-medium opacity-90">Layer Height: 0.1mm | Material: PLA+ White</p>
          </div>
        </div>
        <div className="absolute -top-6 -right-6 glass p-6 rounded-2xl shadow-lg hidden sm:block">
          <div className="text-3xl font-bold text-brand-primary">0.1mm</div>
          <div className="text-xs font-mono uppercase tracking-tighter text-gray-500">Layer Detail</div>
        </div>
        <div className="absolute -bottom-6 -left-6 glass p-6 rounded-2xl shadow-lg hidden sm:block">
          <div className="text-3xl font-bold">Quick</div>
          <div className="text-xs font-mono uppercase tracking-tighter text-gray-500">Turnaround</div>
        </div>
      </motion.div>
    </div>
  </section>
);
 
const LithophaneSection = () => (
  <section id="lithophanes" className="py-24 px-6 bg-brand-dark text-white">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 bg-brand-primary/20 text-brand-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
          <Star className="w-3 h-3" /> Our Signature Product
        </div>
        <h2 className="text-6xl md:text-7xl font-bold leading-tight mb-6">
          Lithophane <br /><span className="text-brand-primary italic">Night Lights</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          A lithophane is a 3D-printed panel that reveals a photographic image when backlit. We turn your cherished photos into glowing works of art: perfect for gifts, memorials, and home decor.
        </p>
      </div>
 
      <div className="grid lg:grid-cols-3 gap-8 mb-20">
        {[
          { icon: <Camera className="w-8 h-8" />, title: "Send Us Your Photo", desc: "Any photo works: portraits, landscapes, pets, couples. The higher the resolution the better the detail." },
          { icon: <Printer className="w-8 h-8" />, title: "We Print It", desc: "Using 0.1mm layer resolution and premium PLA+ white filament for the sharpest possible image clarity." },
          { icon: <Lightbulb className="w-8 h-8" />, title: "It Glows", desc: "Plug in the included LED base and watch your photo appear in stunning backlit detail. Magic." }
        ].map((f, i) => (
          <motion.div key={i} whileHover={{ y: -8 }} className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center hover:bg-white/10 transition-all">
            <div className="text-brand-primary mb-6 flex justify-center">{f.icon}</div>
            <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
            <p className="text-gray-400 leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
 
      <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
        <div>
          <h3 className="text-4xl font-bold mb-8">Available Styles</h3>
          <div className="space-y-6">
            {[
              { name: "Flat Panel", desc: "Classic rectangular panel, perfect for portraits. Comes with a warm LED base.", price: "From $25" },
              { name: "Night Light", desc: "Wrap-around cylindrical design for a softer 120° glow. Great for panoramic shots.", price: "From $35" },
              { name: "Heart Shape", desc: "Romantic heart-shaped lithophane. Most popular for couples and Valentine's Day.", price: "From $30" },
              { name: "Custom Shape", desc: "Any shape you want: names, logos, silhouettes. Contact us for a quote.", price: "Custom" },
            ].map((style, i) => (
              <div key={i} className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-brand-primary/50 transition-colors">
                <div>
                  <h4 className="font-bold text-lg">{style.name}</h4>
                  <p className="text-gray-400 text-sm mt-1">{style.desc}</p>
                </div>
                <div className="text-brand-primary font-bold font-mono shrink-0 ml-4">{style.price}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <img src="/heartlitho.png" alt="Lithophane example 1" className="rounded-2xl w-full aspect-[3/4] object-contain bg-white/5 opacity-90" />
            <img src="/nightlightlitho.png" alt="Lithophane example 2" className="rounded-2xl w-full aspect-[3/4] object-contain bg-white/5 opacity-90" />
          </div>
          <div className="space-y-4 pt-12">
            <img src="/nightlight2litho.png" alt="Lithophane example 3" className="rounded-2xl w-full aspect-[3/4] object-contain bg-white/5 opacity-90" />
            <img src="/flatlitho.png" alt="Lithophane example 4" className="rounded-2xl w-full aspect-[3/4] object-contain bg-white/5 opacity-90" />
          </div>
        </div>
      </div>
 
      <div className="text-center bg-brand-primary/10 border border-brand-primary/20 rounded-3xl p-16">
        <Heart className="w-12 h-12 text-brand-primary mx-auto mb-6" />
        <h3 className="text-4xl font-bold mb-4">Ready to Create Yours?</h3>
        <p className="text-gray-400 text-xl mb-10 max-w-lg mx-auto">Upload your photo, pick a style, and we'll ship your finished night light asap.</p>
        <a href="#contact" className="inline-flex items-center gap-3 bg-brand-primary text-brand-dark px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-transform">
          Order Your Lithophane <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </div>
  </section>
);
 
const HowItWorks = () => (
  <section id="how-it-works" className="py-24 px-6 bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-4">Ordering Is <span className="text-brand-primary italic">Simple</span></h2>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">From photo to doorstep in just a few steps.</p>
      </div>
      <div className="grid md:grid-cols-4 gap-8">
        {[
          { step: "01", icon: <Camera className="w-7 h-7" />, title: "Pick Your Style", desc: "Choose flat panel, curved lamp, heart, or a custom shape from the order form." },
          { step: "02", icon: <Upload className="w-7 h-7" />, title: "Upload Your Photo", desc: "Send us your image directly through the form. Higher resolution = sharper result." },
          { step: "03", icon: <Printer className="w-7 h-7" />, title: "We Print It", desc: "We process and print your lithophane with precision over 24+ hours." },
          { step: "04", icon: <Package className="w-7 h-7" />, title: "Shipped to You", desc: "Carefully packaged with the LED base included and sent directly to your door." },
        ].map((s, i) => (
          <motion.div key={i} whileHover={{ y: -8 }} className="relative p-8 rounded-3xl bg-brand-light border border-gray-100 hover:shadow-xl transition-all">
            <div className="text-5xl font-black text-brand-primary/10 absolute top-6 right-6 font-mono">{s.step}</div>
            <div className="w-14 h-14 rounded-2xl bg-brand-dark flex items-center justify-center text-brand-primary mb-6">{s.icon}</div>
            <h3 className="text-xl font-bold mb-3">{s.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
 
const DetailModal = ({ item, onClose }: { item: any; onClose: () => void }) => {
  if (!item) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-4xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row">
        <button onClick={onClose} className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-black/10 flex items-center justify-center hover:bg-black/20 transition-colors">
          <X className="w-5 h-5" />
        </button>
        <div className="w-full md:w-1/2 aspect-square md:aspect-auto">
          <img src={item.image} alt={item.title || item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <div className="text-xs font-mono font-bold text-brand-primary uppercase tracking-widest mb-2">{item.category || item.tag}</div>
          <h3 className="text-3xl font-bold mb-4">{item.title || item.name}</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">{item.description || "High-quality 3D printed product crafted with precision and care."}</p>
          <div className="bg-brand-light p-6 rounded-2xl mb-4">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400 mb-2">{item.specs ? "Technical Specs" : "Product Details"}</div>
            <div className="text-sm font-medium text-brand-dark">{item.specs || `Price: ${item.price} | Availability: In Stock`}</div>
          </div>
          {item.credit && (
            <p className="text-[9px] text-gray-300 mb-4 leading-relaxed">{item.credit}</p>
          )}
          <a href="#contact" onClick={onClose} className="bg-brand-dark text-white text-center py-4 rounded-xl font-bold hover:bg-brand-primary transition-colors">
            {item.price ? "Order Now" : "Inquire About This"}
          </a>
        </div>
      </motion.div>
    </div>
  );
};
 
const CurrentProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const products = [
    { id: 1, name: "Mini Flexi Octopus", price: "$5.00", tag: "Best Seller", image: "/octopus.png", description: "A fun articulated octopus with flexible legs. Great desk toy or gift for kids.", credit:"Design: Cute mini octopus by Louay23644, Thingiverse, CC BY-SA 3.0. Printed by D3V Prints."  },
    { id: 2, name: "Credit Card Sized Phone Stand", price: "$18.50", tag: "New Arrival", image: "/phonestand.png", description: "A slim, wallet friendly phone stand that folds flat, thinner than a quarter, and sets up in seconds.", credit: "Design: 0.8mm thin adjustable credit card phone stand by jq910, Thingiverse, CC BY 4.0. Printed by D3V Prints."},
    { id: 3, name: "Keychain", price: "$32.00", tag: "New Arrival", image: "/keychain.png", description: "Many different types of keychains avaiable upon request like, name keychain, Formula 1 keychains and much more!", credit: "Design: Dependent on keychain, credits available upon request. Printed by D3V Prints." },
    { id: 4, name: "118 db Whistle", price: "$15.00", tag: "Artistic", image: "/whistle.png", description: "A loud, pealess 118dB emergency whistle perfect for hiking, camping, or everyday carry.", credit: "Design: V29 by jzisa, Thingiverse, CC BY 4.0. Printed by D3V Prints." }
  ];
 
  return (
    <section id="products" className="py-24 px-6 bg-brand-light">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">Other Prints</div>
            <h2 className="text-4xl font-bold mb-4 italic">Popular Products</h2>
            <p className="text-gray-500 max-w-md">Fun and functional prints available to order anytime.</p>
          </div>
          {/* <a href="#gallery" className="flex items-center gap-2 text-brand-primary font-bold hover:underline">Browse Gallery <ArrowRight className="w-4 h-4" /></a> */}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <motion.div key={product.id} whileHover={{ y: -10 }} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100">
              <div className="relative aspect-square overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                <div className="absolute top-4 left-4 bg-brand-primary text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md">{product.tag}</div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button onClick={() => setSelectedProduct(product)} className="bg-white text-brand-dark px-4 py-2 rounded-xl text-sm font-bold hover:scale-105 transition-transform">View Details</button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-1 group-hover:text-brand-primary transition-colors">{product.name}</h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xl font-bold font-mono">{product.price}</span>
                  <button onClick={() => setSelectedProduct(product)} className="bg-brand-dark text-white p-3 rounded-xl hover:bg-brand-primary transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-[9px] text-gray-300 text-center mt-12 max-w-2xl mx-auto leading-relaxed">
          Some products feature third-party designs licensed under Creative Commons Attribution 4.0 International (CC BY 4.0) or similar open licenses. Original designers retain copyright of their respective works. D3V Prints provides physical printing services only and is not affiliated with original designers. Credits available upon request.
        </p>
      </div>
      <AnimatePresence>
        {selectedProduct && <DetailModal item={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      </AnimatePresence>
    </section>
  );
};
 
const Gallery = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const galleryItems = [
    { id: 1, title: "Family Portrait Night Light", category: "Lithophanes", description: "A high-detail lithophane from a family portrait on a custom LED base.", specs: "Material: PLA+ White | Resolution: 0.1mm | Style: Flat Panel", image: "https://picsum.photos/seed/print1/800/800" },
    { id: 2, title: "Curved Landscape Lamp", category: "Lithophanes", description: "A 360° cylindrical lithophane of a mountain panorama.", specs: "Material: PLA | Diameter: 150mm | Style: Curved", image: "https://picsum.photos/seed/print6/800/800" },
    { id: 3, title: "Heart Couple Photo", category: "Lithophanes", description: "Heart-shaped lithophane from a couple's photo. Popular Valentine's gift.", specs: "Material: PLA+ White | Style: Heart Shape", image: "https://picsum.photos/seed/litho2/800/800" },
    { id: 4, title: "Pet Portrait Light", category: "Lithophanes", description: "A beloved dog immortalized in a glowing lithophane panel.", specs: "Material: PLA+ White | Resolution: 0.1mm", image: "https://picsum.photos/seed/litho3/800/800" },
    { id: 5, title: "Industrial Gear Prototype", category: "Custom", description: "A functional replacement gear for a vintage lathe in Carbon Fiber Nylon.", specs: "Material: CF-Nylon | Infill: 100% | Tolerance: ±0.1mm", image: "https://picsum.photos/seed/print2/800/800" },
    { id: 6, title: "Articulated Dragon", category: "Custom", description: "A fully articulated dragon printed in one piece with 42 moving joints.", specs: "Material: Silk PLA | Print Time: 22h | Size: 45cm", image: "https://picsum.photos/seed/print3/800/800" },
    { id: 7, title: "Architectural Scale Model", category: "Custom", description: "A 1:50 scale model of a residential complex for client presentations.", specs: "Material: Matte PLA | Parts: 12 | Scale: 1:50", image: "https://picsum.photos/seed/print4/800/800" },
    { id: 8, title: "Low-Poly Planter Set", category: "Custom", description: "A set of three geometric planters with integrated drainage.", specs: "Material: Marble PLA | Finish: Matte", image: "https://picsum.photos/seed/print7/800/800" }
  ];
  const filteredItems = activeCategory === 'All' ? galleryItems : galleryItems.filter(i => i.category === activeCategory);
 
  return (
    <section id="gallery" className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-bold mb-4">Our Work</h2>
            <p className="text-gray-500">A showcase of lithophanes and custom prints we've made.</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {['All', 'Lithophanes', 'Custom'].map((cat) => (
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
              <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }} key={item.id}
                className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm">
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
    { id: 'flat', title: 'Flat Panel Night Light', description: 'Classic lithophane from your photo', icon: <ImageIcon className="w-6 h-6" /> },
    { id: 'curved', title: 'Curved Lamp', description: '360° cylindrical lithophane', icon: <Lightbulb className="w-6 h-6" /> },
    { id: 'heart', title: 'Heart Shape', description: 'Romantic heart lithophane', icon: <Heart className="w-6 h-6" /> },
    { id: 'custom', title: 'Custom / Other Print', description: 'STL files or special requests', icon: <FileText className="w-6 h-6" /> }
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
        const res = await fetch('https://upload.uploadcare.com/base/', { method: 'POST', body: data });
        const json = await res.json();
        if (json.file) uploaded.push({ name: file.name, url: `https://rk9fjvy09i.ucarecd.net/${json.file}/` });
      } catch (err) { console.error('Upload error:', err); }
    }
    setUploadedFiles(prev => [...prev, ...uploaded]);
    setUploading(false);
  };
 
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus('submitting');
  const fileLinks = uploadedFiles.length > 0 ? uploadedFiles.map(f => `${f.name}: ${f.url}`).join('\n') : 'No files uploaded';

  const payload = {
    name: formData.name,
    email: formData.email,
    projectType: formData.projectType,
    message: formData.message,
    files: fileLinks,
    date: new Date().toLocaleString()
  };

  try {
    
    const emailResponse = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        access_key: '28aa3f21-d905-4e73-95bb-686ad236eb55',
        subject: `New D3V Prints Order: ${formData.projectType}`,
        ...payload,
        'Attached Files': fileLinks
      })
    });

    
    await fetch('https://script.google.com/macros/s/AKfycbx4VDX9kxQYqkGRg5cLoTvrt6R3To4QMG4U6qXAzevWAfm93Oqd-CQwUrfwboNy-_n9LA/exec', {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (emailResponse.ok) {
      setStatus('success');
      setFormData({ name: '', email: '', projectType: '', message: '' });
      setUploadedFiles([]);
      setStep(1);
    } else {
      setStatus('error');
    }
  } catch (error) {
    console.error('Submit error:', error);
    setStatus('error');
  }
};
 
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-brand-dark rounded-[3rem] p-8 lg:p-20 text-white relative overflow-hidden">
          <div className="relative z-10 grid lg:grid-cols-5 gap-16">
            <div className="lg:col-span-2">
              <h2 className="text-5xl font-bold mb-4 leading-tight">Order Your <br /><span className="text-brand-primary">Night Light</span></h2>
              <p className="text-gray-400 mb-4 leading-relaxed">Upload your photo and we'll have your lithophane printed and shipped asap.</p>
              <div className="flex items-center gap-2 text-brand-primary text-sm font-bold mb-12">
                <CheckCircle2 className="w-4 h-4" /> Includes LED base
              </div>
              <div className="hidden lg:block space-y-8">
                {[1, 2, 3].map((s) => (
                  <div key={s} className={`flex items-center gap-4 transition-opacity ${step >= s ? 'opacity-100' : 'opacity-30'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${step >= s ? 'bg-brand-primary border-brand-primary text-brand-dark' : 'border-white/20'}`}>{s}</div>
                    <div className="text-sm font-bold uppercase tracking-widest">{s === 1 ? 'Select Style' : s === 2 ? 'Upload Photo' : 'Your Details'}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-3 bg-white rounded-[2.5rem] p-8 lg:p-12 text-brand-dark">
              {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6"><CheckCircle className="w-10 h-10" /></div>
                  <h3 className="text-2xl font-bold mb-2">Order Received! 🎉</h3>
                  <p className="text-gray-500 mb-8">We'll confirm your order and estimated delivery within 24 hours.</p>
                  <button onClick={() => setStatus('idle')} className="bg-brand-dark text-white px-8 py-4 rounded-2xl font-bold hover:bg-brand-primary transition-colors">Place Another Order</button>
                </div>
              ) : (
                <div className="h-full flex flex-col">
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                      <h3 className="text-2xl font-bold mb-6">What style would you like?</h3>
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
                        <h3 className="text-2xl font-bold">Upload Your Photo</h3>
                        <span className="text-sm font-bold text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-full">{formData.projectType}</span>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Any notes or requests?</label>
                          <textarea rows={3} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none resize-none"
                            placeholder="e.g. crop to just the face, warm LED preferred, gift wrapping requested..." />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                            {formData.projectType === 'Custom / Other Print' ? 'Upload Files (STL, photo, etc.)' : 'Upload Your Photo'}
                          </label>
                          <div className="relative group">
                            <input type="file" multiple onChange={handleUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                            <div className="border-2 border-dashed border-gray-200 group-hover:border-brand-primary rounded-2xl p-8 text-center transition-colors">
                              <Upload className="w-8 h-8 text-gray-300 group-hover:text-brand-primary mx-auto mb-2" />
                              <div className="text-sm font-bold text-gray-500">
                                {uploading ? 'Uploading...' : uploadedFiles.length > 0 ? `${uploadedFiles.length} file(s) uploaded ✓` : 'Drag & drop or click to upload'}
                              </div>
                              <div className="text-xs text-gray-400 mt-1">JPG, PNG, STL: Max 10MB</div>
                            </div>
                          </div>
                          {uploadedFiles.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {uploadedFiles.map((f, i) => (
                                <a key={i} href={f.url} target="_blank" rel="noopener noreferrer" className="bg-gray-100 px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-2 hover:bg-gray-200">
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
                        <button onClick={() => setStep(3)} disabled={uploading}
                          className="flex-[2] bg-brand-dark text-white px-8 py-4 rounded-2xl font-bold hover:bg-brand-primary transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                          Next Step <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                  {step === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                      <h3 className="text-2xl font-bold mb-6">Your Details</h3>
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
                          {status === 'submitting' ? 'Sending...' : 'Place Order'}
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
 
const Footer = () => (
  <footer className="py-12 px-6 border-t border-gray-100">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-2">
        <div className="bg-brand-dark p-1.5 rounded-lg"><Printer className="w-4 h-4 text-brand-primary" /></div>
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
    <div className="max-w-7xl mx-auto text-center mt-8 text-xs text-gray-400 font-mono uppercase tracking-widest">
      © {new Date().getFullYear()} D3V Prints. All rights reserved.
    </div>
    <div className="max-w-7xl mx-auto text-center mt-3">
      <p className="text-[9px] text-gray-200 leading-relaxed max-w-3xl mx-auto">
        Some third-party designs available for purchase are licensed under Creative Commons Attribution 4.0 International (CC BY 4.0) or similar open licenses. Original designers retain copyright of their respective works. D3V Prints provides physical printing services only and is not affiliated with original designers. Credits available upon request.
      </p>
    </div>
  </footer>
);
 
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
    if (password === DEV_PASSWORD) { setIsAuthenticated(true); sessionStorage.setItem('dev_password', password); fetchInquiries(); }
    else { setError('Invalid password'); }
  };
 
  useEffect(() => {
    const savedPassword = sessionStorage.getItem('dev_password');
    if (savedPassword) { setPassword(savedPassword); setIsAuthenticated(true); }
  }, []);
 
  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.web3forms.com/submissions?apikey=28aa3f21-d905-4e73-95bb-686ad236eb55', { headers: { 'Accept': 'application/json' } });
      const data = await response.json();
      setInquiries(data.data || []);
    } catch (error) { console.error("Fetch error:", error); }
    finally { setLoading(false); }
  };
 
  useEffect(() => { if (isAuthenticated) fetchInquiries(); }, [isAuthenticated]);
 
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center mx-auto mb-4"><ShieldCheck className="w-8 h-8" /></div>
            <h1 className="text-2xl font-bold">Developer Access</h1>
            <p className="text-gray-500 text-sm mt-2">Enter your password to view orders.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none" placeholder="••••••••" required />
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button className="w-full bg-brand-dark text-white py-4 rounded-xl font-bold hover:bg-brand-primary transition-colors">Unlock Dashboard</button>
          </form>
          <div className="mt-6 text-center">
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
            <h1 className="text-3xl font-bold flex items-center gap-3"><Database className="text-brand-primary" /> Orders Dashboard</h1>
            <p className="text-gray-500">View all incoming orders and inquiries.</p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={fetchInquiries} className="text-sm font-bold text-brand-primary hover:underline">Refresh</button>
            <button onClick={() => { setIsAuthenticated(false); sessionStorage.removeItem('dev_password'); }} className="text-sm font-bold text-gray-400 hover:text-red-500 transition-colors">Logout</button>
            <Link to="/" className="text-sm font-bold text-brand-primary hover:underline flex items-center gap-1"><ArrowRight className="w-4 h-4 rotate-180" /> Back to Site</Link>
          </div>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div></div>
        ) : inquiries.length === 0 ? (
          <div className="bg-white rounded-3xl p-20 text-center shadow-sm border border-gray-100">
            <Mail className="text-gray-400 w-10 h-10 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">No orders yet</h2>
            <p className="text-gray-500">Orders will appear here when customers submit the form.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {inquiries.map((inquiry, idx) => (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} key={idx} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm font-medium"><User className="w-4 h-4 text-gray-400" />{inquiry.name}</div>
                      <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm font-medium"><Mail className="w-4 h-4 text-gray-400" />{inquiry.email}</div>
                      {inquiry.projectType && <div className="flex items-center gap-2 bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-sm font-bold"><Box className="w-4 h-4" />{inquiry.projectType}</div>}
                    </div>
                    {inquiry.message && <div><h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Notes</h3><p className="text-gray-700 leading-relaxed">{inquiry.message}</p></div>}
                    {inquiry['Attached Files'] && inquiry['Attached Files'] !== 'No files uploaded' && (
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Files</h3>
                        <div className="flex flex-wrap gap-2">
                          {inquiry['Attached Files'].split('\n').map((line: string, i: number) => {
                            const parts = line.split(': ');
                            const name = parts[0];
                            const url = parts.slice(1).join(': ');
                            return url ? (
                              <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-xl text-xs font-bold transition-colors">
                                <Paperclip className="w-3 h-3" />{name}
                              </a>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="text-right shrink-0 flex flex-col items-end gap-4">
                    <div className="flex items-center gap-2 text-gray-400 text-xs font-mono uppercase"><Clock className="w-3 h-3" />{new Date(inquiry.created_at).toLocaleString()}</div>
                    <a href={`mailto:${inquiry.email}`} className="inline-flex items-center gap-2 bg-brand-dark text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-brand-primary transition-colors">
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
    <LithophaneSection />
    <HowItWorks />
    <CurrentProducts />
    {/* <Gallery /> */}
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
