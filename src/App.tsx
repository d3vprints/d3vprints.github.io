import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  ShoppingCart, Upload, Settings2, Package, Printer, Lightbulb, Layers,
  ChevronRight, Mail, Instagram, Twitter, CheckCircle2, ArrowRight, Menu, X,
  Box, Zap, ShieldCheck, Database, Clock, User, ExternalLink, Circle,
  CheckCircle, PlayCircle, FileText, Image as ImageIcon, ChevronLeft, Paperclip, Star, Heart, Camera, Palette
} from 'lucide-react';

const STANDARD_COLORS = ['Black', 'White', 'Blue'];
const PREMIUM_COLORS = ['Red', 'Green', 'Yellow', 'Orange', 'Purple', 'Pink', 'Gray', 'Teal', 'Gold', 'Silver'];
const PREMIUM_SURCHARGE = 3;

const BASE_PRICES: Record<string, number> = {
  'Flat Panel Night Light': 25,
  'Curved Lamp': 35,
  'Heart Shape': 30,
  'Custom / Other Print': 0,
};

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
          A lithophane is a 3D-printed panel that reveals a photographic image when backlit. We turn your cherished photos into glowing works of art, perfect for gifts, memorials, and home decor.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-20">
        {[
          { icon: <Camera className="w-8 h-8" />, title: "Send Us Your Photo", desc: "Any photo works, portraits, landscapes, pets, couples. The higher the resolution the better the detail." },
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
              { name: "Custom Shape", desc: "Any shape you want, names, logos, silhouettes. Contact us for a quote.", price: "Custom" },
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

// --- Product Slideshow Card ---
const ProductCard = ({ product, onOrder }: { product: any, onOrder: (p: any) => void }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const images = product.images || [product.image];

  return (
    <motion.div whileHover={{ y: -10 }} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100">
      <div className="relative aspect-square overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImg}
            src={images[currentImg]}
            alt={product.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute top-4 left-4 bg-brand-primary text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md">{product.tag}</div>

        {images.length > 1 && (
          <>
            <button onClick={() => setCurrentImg(i => (i - 1 + images.length) % images.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors z-10">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => setCurrentImg(i => (i + 1) % images.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors z-10">
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {images.map((_: any, i: number) => (
                <button key={i} onClick={() => setCurrentImg(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentImg ? 'bg-white w-3' : 'bg-white/50'}`} />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-bold text-lg mb-1 group-hover:text-brand-primary transition-colors">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold font-mono">{product.price}</span>
          <button onClick={() => onOrder(product)} className="bg-brand-dark text-white p-3 rounded-xl hover:bg-brand-primary transition-colors">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
        {product.credit && <p className="text-[9px] text-gray-300 mt-3 leading-relaxed">{product.credit}</p>}
      </div>
    </motion.div>
  );
};

const CurrentProducts = () => {
  const [orderProduct, setOrderProduct] = useState<any>(null);

  const products = [
    {
      id: 1, name: "Mini Flexi Octopus", price: "From $5.00", tag: "Best Seller",
      images: ["/octopus.png"],
      description: "A fun articulated octopus with flexible legs. Great desk toy or gift for kids.",
      basePrice: 5,
      credit: "Design: Cute mini octopus by Louay23644, Thingiverse, CC BY-SA 3.0. Printed by D3V Prints."
    },
    {
      id: 2, name: "Credit Card Sized Phone Stand", price: "From $4.00", tag: "New Arrival",
      images: ["/phonestand.png"],
      description: "A slim, wallet friendly phone stand that folds flat and sets up in seconds.",
      basePrice: 4,
      credit: "Design: 0.8mm thin adjustable credit card phone stand by jq910, Thingiverse, CC BY 4.0. Printed by D3V Prints."
    },
    {
      id: 3, name: "Keychain", price: "From $3.00", tag: "New Arrival",
      images: ["/keychain.png"],
      description: "Many different types of keychains available upon request, name keychains, Formula 1 keychains and much more!",
      basePrice: 3,
      credit: "Design: Dependent on keychain, credits available upon request. Printed by D3V Prints."
    },
    {
      id: 4, name: "118dB Emergency Whistle", price: "From $4.00", tag: "Popular",
      images: ["/whistle.png"],
      description: "A loud, pea-less 118dB emergency whistle perfect for hiking, camping, or everyday carry.",
      basePrice: 4,
      credit: "Design: V29 by jzisa, Thingiverse, CC BY 4.0. Printed by D3V Prints."
    }
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
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onOrder={setOrderProduct} />
          ))}
        </div>
        <p className="text-[9px] text-gray-300 text-center mt-12 max-w-2xl mx-auto leading-relaxed">
          Some products feature third-party designs licensed under Creative Commons Attribution 4.0 International (CC BY 4.0) or similar open licenses. Original designers retain copyright of their respective works. D3V Prints provides physical printing services only and is not affiliated with original designers. Credits available upon request.
        </p>
      </div>

      {/* Quick Order Modal for products */}
      <AnimatePresence>
        {orderProduct && (
          <ProductOrderModal product={orderProduct} onClose={() => setOrderProduct(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

// --- Product Quick Order Modal ---
const ProductOrderModal = ({ product, onClose }: { product: any, onClose: () => void }) => {
  const [color, setColor] = useState('');
  const [qty, setQty] = useState(1);
  const [notes, setNotes] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [step, setStep] = useState(1);

  const isPremium = PREMIUM_COLORS.includes(color);
  const estimated = color ? (product.basePrice + (isPremium ? PREMIUM_SURCHARGE : 0)) * qty : null;

  const handleSubmit = async () => {
    setStatus('submitting');
    const payload = {
      name, email,
      projectType: product.name,
      message: `Color: ${color} | Qty: ${qty} | Notes: ${notes || 'None'}`,
      files: 'No files uploaded',
      date: new Date().toLocaleString()
    };
    try {
      const emailRes = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: '28aa3f21-d905-4e73-95bb-686ad236eb55',
          subject: `New D3V Prints Order: ${product.name}`,
          ...payload,
          'Attached Files': 'No files uploaded'
        })
      });
      await fetch('https://script.google.com/macros/s/AKfycbx4VDX9kxQYqkGRg5cLoTvrt6R3To4QMG4U6qXAzevWAfm93Oqd-CQwUrfwboNy-_n9LA/exec', {
        method: 'POST', mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (emailRes.ok) setStatus('success');
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-lg bg-white rounded-[2.5rem] overflow-hidden shadow-2xl p-10">
        <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/10 flex items-center justify-center hover:bg-black/20 transition-colors">
          <X className="w-5 h-5" />
        </button>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-10 h-10" /></div>
            <h3 className="text-2xl font-bold mb-3">Order Received! 🎉</h3>
            <p className="text-gray-500 leading-relaxed">Thanks for your order! You will receive an email back within 12 hours with your order update and payment instructions.</p>
            <button onClick={onClose} className="mt-8 bg-brand-dark text-white px-8 py-4 rounded-2xl font-bold hover:bg-brand-primary transition-colors">Done</button>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-bold mb-1">{product.name}</h3>
            <p className="text-gray-500 text-sm mb-6">{product.description}</p>

            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 block">
                    <Palette className="w-3 h-3 inline mr-1" /> Choose Color
                  </label>
                  <div className="mb-2">
                    <p className="text-xs font-semibold text-gray-500 mb-2">Standard Colors (no extra charge)</p>
                    <div className="flex flex-wrap gap-2">
                      {STANDARD_COLORS.map(c => (
                        <button key={c} onClick={() => setColor(c)}
                          className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${color === c ? 'border-brand-primary bg-brand-primary/10 text-brand-primary' : 'border-gray-200 hover:border-gray-300'}`}>
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs font-semibold text-gray-500 mb-2">Premium Colors (+${PREMIUM_SURCHARGE}.00)</p>
                    <div className="flex flex-wrap gap-2">
                      {PREMIUM_COLORS.map(c => (
                        <button key={c} onClick={() => setColor(c)}
                          className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${color === c ? 'border-brand-primary bg-brand-primary/10 text-brand-primary' : 'border-gray-200 hover:border-gray-300'}`}>
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 block">Quantity</label>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center font-bold hover:border-brand-primary transition-colors">-</button>
                    <span className="text-2xl font-bold w-8 text-center">{qty}</span>
                    <button onClick={() => setQty(q => q + 1)} className="w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center font-bold hover:border-brand-primary transition-colors">+</button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Notes (optional)</label>
                  <textarea rows={2} value={notes} onChange={e => setNotes(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none resize-none text-sm"
                    placeholder="Any special requests..." />
                </div>

                <button onClick={() => setStep(2)} disabled={!color}
                  className="w-full bg-brand-dark text-white py-4 rounded-2xl font-bold hover:bg-brand-primary transition-colors disabled:opacity-50">
                  Continue <ChevronRight className="w-4 h-4 inline ml-1" />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                <h4 className="text-lg font-bold">Your Details</h4>
                <input type="text" value={name} onChange={e => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none" placeholder="Your Name" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none" placeholder="Email Address" />

                {/* Order Summary */}
                <div className="bg-brand-light rounded-2xl p-5 space-y-3">
                  <h5 className="font-bold text-sm uppercase tracking-widest text-gray-500">Order Summary</h5>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Product</span><span className="font-bold">{product.name}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Color</span>
                    <span className="font-bold flex items-center gap-1">{color} {isPremium && <span className="text-[10px] text-brand-primary font-bold bg-brand-primary/10 px-1.5 py-0.5 rounded-full">Premium</span>}</span>
                  </div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Quantity</span><span className="font-bold">{qty}</span></div>
                  {notes && <div className="flex justify-between text-sm"><span className="text-gray-500">Notes</span><span className="font-bold text-right max-w-[60%]">{notes}</span></div>}
                  <div className="border-t border-gray-200 pt-3 flex justify-between">
                    <span className="font-bold">Estimated Total</span>
                    <span className="font-black text-brand-primary text-lg">${estimated?.toFixed(2)}</span>
                  </div>
                  <p className="text-[10px] text-gray-400">Final price confirmed via email after order review.</p>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 py-4 rounded-2xl font-bold border-2 border-gray-200 hover:bg-gray-50 transition-colors">
                    <ChevronLeft className="w-4 h-4 inline mr-1" /> Back
                  </button>
                  <button onClick={handleSubmit} disabled={!name || !email || status === 'submitting'}
                    className="flex-[2] bg-brand-dark text-white py-4 rounded-2xl font-bold hover:bg-brand-primary transition-colors disabled:opacity-50">
                    {status === 'submitting' ? 'Placing Order...' : 'Place Order'}
                  </button>
                </div>
                {status === 'error' && <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>}
              </motion.div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
};

const Contact = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', projectType: '', message: '', color: '' });
  const [uploadedFiles, setUploadedFiles] = useState<{name: string, url: string}[]>([]);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const projectTypes = [
    { id: 'flat', title: 'Flat Panel Night Light', description: 'Classic lithophane from your photo', icon: <ImageIcon className="w-6 h-6" />, price: 25 },
    { id: 'curved', title: 'Curved Lamp', description: '360° cylindrical lithophane', icon: <Lightbulb className="w-6 h-6" />, price: 35 },
    { id: 'heart', title: 'Heart Shape', description: 'Romantic heart lithophane', icon: <Heart className="w-6 h-6" />, price: 30 },
    { id: 'custom', title: 'Custom / Other Print', description: 'STL files or special requests', icon: <FileText className="w-6 h-6" />, price: 0 },
  ];

  const selectedType = projectTypes.find(p => p.title === formData.projectType);
  const isPremiumColor = PREMIUM_COLORS.includes(formData.color);
  const estimatedPrice = selectedType && selectedType.price > 0
    ? selectedType.price + (isPremiumColor ? PREMIUM_SURCHARGE : 0)
    : null;

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
      message: `Color: ${formData.color || 'Not specified'} | Notes: ${formData.message || 'None'}`,
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
        method: 'POST', mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (emailResponse.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', projectType: '', message: '', color: '' });
        setUploadedFiles([]);
        setStep(1);
      } else { setStatus('error'); }
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
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className={`flex items-center gap-4 transition-opacity ${step >= s ? 'opacity-100' : 'opacity-30'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${step >= s ? 'bg-brand-primary border-brand-primary text-brand-dark' : 'border-white/20'}`}>{s}</div>
                    <div className="text-sm font-bold uppercase tracking-widest">
                      {s === 1 ? 'Select Style' : s === 2 ? 'Upload Photo' : s === 3 ? 'Your Details' : 'Review Order'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3 bg-white rounded-[2.5rem] p-8 lg:p-12 text-brand-dark">
              {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6"><CheckCircle className="w-10 h-10" /></div>
                  <h3 className="text-2xl font-bold mb-3">Order Received! 🎉</h3>
                  <p className="text-gray-500 mb-8 leading-relaxed">Thanks for your order! You will receive an email back within 12 hours with your order update and payment instructions.</p>
                  <button onClick={() => setStatus('idle')} className="bg-brand-dark text-white px-8 py-4 rounded-2xl font-bold hover:bg-brand-primary transition-colors">Place Another Order</button>
                </div>
              ) : (
                <div className="h-full flex flex-col">

                  {/* Step 1: Select Style */}
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
                            {type.price > 0 && <div className="text-brand-primary font-bold text-sm mt-2">From ${type.price}</div>}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Upload + Color + Notes */}
                  {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-2xl font-bold">Photo & Details</h3>
                        <span className="text-sm font-bold text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-full">{formData.projectType}</span>
                      </div>

                      {/* Color picker */}
                      <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Choose Color</label>
                        <p className="text-xs text-gray-400 mb-2">Standard (no extra charge)</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {STANDARD_COLORS.map(c => (
                            <button key={c} onClick={() => setFormData({ ...formData, color: c })}
                              className={`px-3 py-1.5 rounded-xl text-sm font-bold border-2 transition-all ${formData.color === c ? 'border-brand-primary bg-brand-primary/10 text-brand-primary' : 'border-gray-200 hover:border-gray-300'}`}>
                              {c}
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-gray-400 mb-2">Premium (+${PREMIUM_SURCHARGE}.00)</p>
                        <div className="flex flex-wrap gap-2">
                          {PREMIUM_COLORS.map(c => (
                            <button key={c} onClick={() => setFormData({ ...formData, color: c })}
                              className={`px-3 py-1.5 rounded-xl text-sm font-bold border-2 transition-all ${formData.color === c ? 'border-brand-primary bg-brand-primary/10 text-brand-primary' : 'border-gray-200 hover:border-gray-300'}`}>
                              {c}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Any notes or requests?</label>
                        <textarea rows={2} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none resize-none"
                          placeholder="e.g. crop to just the face, warm LED preferred..." />
                      </div>

                      <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                          {formData.projectType === 'Custom / Other Print' ? 'Upload Files (STL, photo, etc.)' : 'Upload Your Photo'}
                        </label>
                        <div className="relative group">
                          <input type="file" multiple onChange={handleUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                          <div className="border-2 border-dashed border-gray-200 group-hover:border-brand-primary rounded-2xl p-6 text-center transition-colors">
                            <Upload className="w-7 h-7 text-gray-300 group-hover:text-brand-primary mx-auto mb-2" />
                            <div className="text-sm font-bold text-gray-500">
                              {uploading ? 'Uploading...' : uploadedFiles.length > 0 ? `${uploadedFiles.length} file(s) uploaded ✓` : 'Drag & drop or click to upload'}
                            </div>
                            <div className="text-xs text-gray-400 mt-1">JPG, PNG, STL — Max 10MB</div>
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

                      <div className="flex gap-4 pt-2">
                        <button onClick={() => setStep(1)} className="flex-1 px-6 py-4 rounded-2xl font-bold border-2 border-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                          <ChevronLeft className="w-5 h-5" /> Back
                        </button>
                        <button onClick={() => setStep(3)} disabled={uploading}
                          className="flex-[2] bg-brand-dark text-white px-6 py-4 rounded-2xl font-bold hover:bg-brand-primary transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                          Next Step <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Contact Info */}
                  {step === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                      <h3 className="text-2xl font-bold">Your Details</h3>
                      <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Your Name</label>
                        <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none" placeholder="John Doe" />
                      </div>
                      <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Email Address</label>
                        <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none" placeholder="john@example.com" />
                      </div>
                      <div className="flex gap-4 pt-2">
                        <button onClick={() => setStep(2)} className="flex-1 px-6 py-4 rounded-2xl font-bold border-2 border-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                          <ChevronLeft className="w-5 h-5" /> Back
                        </button>
                        <button onClick={() => setStep(4)} disabled={!formData.name || !formData.email}
                          className="flex-[2] bg-brand-dark text-white px-6 py-4 rounded-2xl font-bold hover:bg-brand-primary transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                          Review Order <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Order Summary */}
                  {step === 4 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                      <h3 className="text-2xl font-bold">Review Your Order</h3>
                      <div className="bg-brand-light rounded-2xl p-6 space-y-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500 font-medium">Name</span>
                          <span className="font-bold">{formData.name}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500 font-medium">Email</span>
                          <span className="font-bold">{formData.email}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500 font-medium">Style</span>
                          <span className="font-bold">{formData.projectType}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500 font-medium">Color</span>
                          <span className="font-bold flex items-center gap-2">
                            {formData.color || 'Not selected'}
                            {isPremiumColor && <span className="text-[10px] text-brand-primary font-bold bg-brand-primary/10 px-1.5 py-0.5 rounded-full">Premium +${PREMIUM_SURCHARGE}</span>}
                          </span>
                        </div>
                        {uploadedFiles.length > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500 font-medium">Files</span>
                            <span className="font-bold">{uploadedFiles.length} file(s) uploaded</span>
                          </div>
                        )}
                        {formData.message && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500 font-medium">Notes</span>
                            <span className="font-bold text-right max-w-[60%]">{formData.message}</span>
                          </div>
                        )}
                        <div className="border-t border-gray-300 pt-4 flex justify-between items-center">
                          <span className="font-bold">Estimated Total</span>
                          <span className="font-black text-brand-primary text-xl">
                            {estimatedPrice ? `From $${estimatedPrice.toFixed(2)}` : 'Quote on request'}
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-400">Final price confirmed via email after order review.</p>
                      </div>

                      <div className="flex gap-4">
                        <button onClick={() => setStep(3)} className="flex-1 px-6 py-4 rounded-2xl font-bold border-2 border-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                          <ChevronLeft className="w-5 h-5" /> Back
                        </button>
                        <button onClick={handleSubmit} disabled={status === 'submitting'}
                          className="flex-[2] bg-brand-dark text-white px-6 py-4 rounded-2xl font-bold hover:bg-brand-primary transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                          {status === 'submitting' ? 'Placing Order...' : 'Place Order'}
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

const Home = () => (
  <main>
    <Hero />
    <LithophaneSection />
    <HowItWorks />
    <CurrentProducts />
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
      </Routes>
      <Footer />
    </div>
  );
}
