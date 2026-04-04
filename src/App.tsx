import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  ShoppingCart, Upload, Package, Printer, Lightbulb,
  ChevronRight, Mail, Instagram, ArrowRight, Menu, X,
  Box, ShieldCheck, Clock, User, ExternalLink,
  CheckCircle, FileText, Image as ImageIcon, ChevronLeft, Paperclip, Star, Heart, Camera, Palette, MapPin, Car, Tag, Sparkles, Quote
} from 'lucide-react';

const STANDARD_COLORS = ['Black', 'White', 'Blue'];
const PREMIUM_COLORS = ['Red', 'Green', 'Yellow', 'Orange', 'Purple', 'Pink', 'Gray', 'Teal', 'Gold', 'Silver'];
const PREMIUM_SURCHARGE = 3;
const SALE_ACTIVE = true;
const BULK_THRESHOLD = 5;
const BULK_DISCOUNT = 0.15;

const LITHOPHANE_PRICES: Record<string, { original: number; sale: number }> = {
  'Flat Panel':    { original: 30, sale: 25 },
  'Night Light':   { original: 40, sale: 35 },
  'Heart Shape':   { original: 35, sale: 30 },
  'Custom Shape':  { original: 45, sale: 38 },
};

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass rounded-2xl px-6 py-3 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-brand-dark p-1.5 rounded-lg"><Printer className="w-5 h-5 text-brand-primary" /></div>
          <span className="font-bold text-xl tracking-tighter">D3V PRINTS</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#lithophanes" className="hover:text-brand-primary transition-colors font-semibold text-brand-primary">Lithophanes ✦</a>
          <a href="#styles" className="hover:text-brand-primary transition-colors">Styles</a>
          <a href="#products" className="hover:text-brand-primary transition-colors">Other Prints</a>
          <a href="#reviews" className="hover:text-brand-primary transition-colors">Reviews</a>
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
            <a href="#styles" onClick={() => setIsOpen(false)} className="text-lg font-medium">Styles</a>
            <a href="#products" onClick={() => setIsOpen(false)} className="text-lg font-medium">Other Prints</a>
            <a href="#reviews" onClick={() => setIsOpen(false)} className="text-lg font-medium">Reviews</a>
            <a href="#contact" onClick={() => setIsOpen(false)} className="bg-brand-dark text-white px-5 py-3 rounded-xl text-center">Order Now</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => (
  <section className="relative pt-32 pb-20 px-6 overflow-hidden">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
      <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
        <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
          <Camera className="w-3 h-3" /> Turn Your Photos Into Art
        </div>
        <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-[0.9] mb-6">
          Your Memories, <br /><span className="text-brand-primary italic">Glowing Forever.</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-md mb-8 leading-relaxed">
          D3V Prints transforms your favorite photos into stunning lithophane night lights. Upload a photo, we do the rest.
        </p>
        <div className="flex flex-wrap gap-4 mb-8">
          <a href="#contact" className="bg-brand-dark text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-2 hover:scale-105 transition-transform">
            Order a Night Light <ArrowRight className="w-5 h-5" />
          </a>
          <a href="#styles" className="bg-white border border-gray-200 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-colors">
            See Styles
          </a>
        </div>
        {SALE_ACTIVE && (
          <div className="inline-flex items-center gap-2 bg-brand-primary/10 border border-brand-primary/30 text-brand-dark px-4 py-2 rounded-xl text-sm font-bold">
            <Tag className="w-4 h-4 text-brand-primary" /> Launch Sale — First 50 customers get exclusive pricing
          </div>
        )}
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

// ─── Lithophane Intro ─────────────────────────────────────────────────────────
const LithophaneSection = () => (
  <section id="lithophanes" className="py-24 px-6 bg-brand-dark text-white">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
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

      <div className="grid lg:grid-cols-3 gap-8 mb-16">
        {[
          { icon: <Camera className="w-8 h-8" />, title: "Send Us Your Photo", desc: "Any photo works — portraits, landscapes, pets, couples. The higher the resolution, the sharper the detail." },
          { icon: <Printer className="w-8 h-8" />, title: "We Print It", desc: "Using 0.1mm layer resolution and premium PLA+ white filament for the clearest possible image." },
          { icon: <Lightbulb className="w-8 h-8" />, title: "It Glows", desc: "Plug in the LED base and watch your photo appear in stunning backlit detail. Pure magic." }
        ].map((f, i) => (
          <motion.div key={i} whileHover={{ y: -8 }} className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center hover:bg-white/10 transition-all">
            <div className="text-brand-primary mb-6 flex justify-center">{f.icon}</div>
            <h3 className="text-xl font-bold mb-3">{f.title}</h3>
            <p className="text-gray-400 leading-relaxed text-sm">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <img src="/heartlitho.png" alt="Heart lithophane" className="rounded-2xl w-full aspect-[3/4] object-contain bg-white/5 opacity-90" />
        <img src="/nightlightlitho.png" alt="Night light" className="rounded-2xl w-full aspect-[3/4] object-contain bg-white/5 opacity-90 mt-8" />
        <img src="/nightlight2litho.png" alt="Night light 2" className="rounded-2xl w-full aspect-[3/4] object-contain bg-white/5 opacity-90" />
        <img src="/flatlitho.png" alt="Flat lithophane" className="rounded-2xl w-full aspect-[3/4] object-contain bg-white/5 opacity-90 mt-8" />
      </div>
    </div>
  </section>
);

// ─── Style Showcase ───────────────────────────────────────────────────────────
const StyleShowcase = () => {
  const styles = [
    {
      id: 'flat',
      name: "Flat Panel",
      tag: "Most Popular",
      desc: "The classic lithophane. A thin rectangular panel that sits on a warm LED base. Great for portraits, family shots, and pet photos. Simple, clean, and stunning.",
      detail: "Includes warm LED base",
      price: LITHOPHANE_PRICES['Flat Panel'],
      image: "/flatlitho.png",
      best: "Portraits, families, pets",
    },
    {
      id: 'night',
      name: "Night Light",
      tag: "Smart Light",
      desc: "A curved cylindrical lithophane with a built-in smart sensor. It automatically turns on when the room gets dark and turns off when there's light — no switches needed.",
      detail: "Auto on/off light sensor included",
      price: LITHOPHANE_PRICES['Night Light'],
      image: "/nightlightlitho.png",
      best: "Bedrooms, kids rooms, hallways",
      highlight: true,
    },
    {
      id: 'heart',
      name: "Heart Shape",
      tag: "Best Gift",
      desc: "A heart-shaped lithophane panel with the same photographic detail. No LED base — stands beautifully on its own or can be hung. The most gifted style we make.",
      detail: "Stand-alone display piece",
      price: LITHOPHANE_PRICES['Heart Shape'],
      image: "/heartlitho.png",
      best: "Couples, Valentine's Day, memorials",
    },
    {
      id: 'custom',
      name: "Custom Shape",
      tag: "Unique",
      desc: "Want something different? We can print lithophanes in custom shapes — names, initials, logos, animals, silhouettes. Tell us what you have in mind and we'll make it happen.",
      detail: "Includes LED base",
      price: LITHOPHANE_PRICES['Custom Shape'],
      image: "/flatlitho.png",
      best: "Logos, names, unique gifts",
    },
  ];

  return (
    <section id="styles" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            Choose Your Style
          </div>
          <h2 className="text-5xl font-bold mb-4">Which One Is Right <span className="text-brand-primary italic">For You?</span></h2>
          <p className="text-gray-500 max-w-xl mx-auto">Same 0.1mm precision printing across every style. Pick the shape and light that fits your space.</p>
        </div>

        {SALE_ACTIVE && (
          <div className="bg-brand-primary/10 border border-brand-primary/30 rounded-2xl px-6 py-4 mb-10 text-center">
            <p className="text-brand-dark font-bold text-sm">
              <Tag className="w-4 h-4 inline mr-1 text-brand-primary" />
              Launch Sale — First 50 customers only. Prices shown are already reduced.
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {styles.map((style, i) => (
            <motion.div key={i} whileHover={{ y: -8 }}
              className={`rounded-3xl border overflow-hidden shadow-sm hover:shadow-xl transition-all ${style.highlight ? 'border-brand-primary ring-2 ring-brand-primary/20' : 'border-gray-100'}`}>
              <div className="aspect-[4/3] overflow-hidden bg-gray-50 relative">
                <img src={style.image} alt={style.name} className="w-full h-full object-contain p-4" />
                <div className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${style.highlight ? 'bg-brand-primary text-white' : 'bg-brand-dark text-white'}`}>
                  {style.tag}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{style.name}</h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-3">{style.desc}</p>
                <div className="bg-brand-light rounded-lg px-3 py-1.5 text-[10px] font-bold text-gray-500 mb-4 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-brand-primary" /> {style.detail}
                </div>
                <div className="text-xs text-gray-400 mb-4">Best for: <span className="font-semibold text-gray-600">{style.best}</span></div>
                <div className="flex items-center justify-between">
                  <div>
                    {SALE_ACTIVE ? (
                      <div className="flex items-center gap-1.5">
                        <span className="text-xl font-black text-brand-primary">${style.price.sale}</span>
                        <span className="text-sm text-gray-400 line-through">${style.price.original}</span>
                      </div>
                    ) : (
                      <span className="text-xl font-black">${style.price.original}</span>
                    )}
                  </div>
                  <a href="#contact" className="bg-brand-dark text-white px-4 py-2 rounded-xl font-bold text-xs hover:bg-brand-primary transition-colors">Order</a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-brand-dark text-white rounded-2xl px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-lg mb-1">Ordering 6 or more? You get a bulk discount.</h4>
            <p className="text-gray-400 text-sm">Orders of 6+ lithophanes automatically get {BULK_DISCOUNT * 100}% off. Perfect for events, weddings, or family gifts.</p>
          </div>
          <a href="#contact" className="shrink-0 bg-brand-primary text-brand-dark px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform whitespace-nowrap">
            Place Bulk Order
          </a>
        </div>
      </div>
    </section>
  );
};

// ─── How It Works + Delivery ──────────────────────────────────────────────────
const HowItWorks = () => (
  <section id="how-it-works" className="py-24 px-6 bg-brand-light">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-4">Ordering Is <span className="text-brand-primary italic">Simple</span></h2>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">From photo to your hands in just a few steps.</p>
      </div>
      <div className="grid md:grid-cols-4 gap-6 mb-16">
        {[
          { step: "01", icon: <Camera className="w-7 h-7" />, title: "Pick Your Style", desc: "Flat panel, night light, heart, or custom shape." },
          { step: "02", icon: <Upload className="w-7 h-7" />, title: "Upload Your Photo", desc: "Higher resolution means sharper detail." },
          { step: "03", icon: <Printer className="w-7 h-7" />, title: "We Print It", desc: "Precision printed over 24+ hours." },
          { step: "04", icon: <Package className="w-7 h-7" />, title: "You Pick It Up", desc: "Free pickup in Plainsboro, NJ." },
        ].map((s, i) => (
          <motion.div key={i} whileHover={{ y: -8 }} className="relative p-8 rounded-3xl bg-white border border-gray-100 hover:shadow-xl transition-all">
            <div className="text-5xl font-black text-brand-primary/10 absolute top-6 right-6 font-mono">{s.step}</div>
            <div className="w-14 h-14 rounded-2xl bg-brand-dark flex items-center justify-center text-brand-primary mb-6">{s.icon}</div>
            <h3 className="text-xl font-bold mb-2">{s.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-brand-dark text-white rounded-3xl p-10">
        <div className="flex items-center gap-3 mb-2">
          <MapPin className="w-5 h-5 text-brand-primary" />
          <h3 className="text-2xl font-bold">Pickup & Delivery</h3>
        </div>
        <p className="text-gray-400 text-sm mb-10">We are currently local only — based in <span className="text-white font-semibold">Plainsboro, NJ</span>.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <MapPin className="w-7 h-7" />,
              title: "Pickup",
              badge: "Free",
              badgeGreen: true,
              desc: "Come grab your order from us in Plainsboro, NJ. We'll send you the exact address once your print is ready.",
            },
            {
              icon: <Car className="w-7 h-7" />,
              title: "Local Dropoff",
              badge: "Small fee",
              badgeGreen: false,
              desc: "We deliver to you within our local area. Enter your address in the order form and we'll confirm if you're in range.",
            },
            {
              icon: <Package className="w-7 h-7" />,
              title: "Shipping",
              badge: "Coming soon",
              badgeGreen: false,
              desc: "Shipping is not available right now. We are working on expanding — check back soon!",
              disabled: true,
            },
          ].map((opt, i) => (
            <div key={i} className={`rounded-2xl p-8 border ${opt.disabled ? 'bg-white/[0.03] border-white/5 opacity-50' : 'bg-white/5 border-white/10'}`}>
              <div className="text-gray-400 mb-4">{opt.icon}</div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-lg">{opt.title}</h4>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${opt.badgeGreen ? 'bg-brand-primary text-brand-dark' : 'bg-white/10 text-gray-300'}`}>{opt.badge}</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{opt.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ─── Product Card with Slideshow ──────────────────────────────────────────────
const ProductCard = ({ product, onOrder }: { product: any, onOrder: (p: any) => void }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const images = product.images || [product.image];
  return (
    <motion.div whileHover={{ y: -10 }} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100">
      <div className="relative aspect-square overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img key={currentImg} src={images[currentImg]} alt={product.name}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="w-full h-full object-cover" />
        </AnimatePresence>
        <div className="absolute top-4 left-4 bg-brand-primary text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md">{product.tag}</div>
        {images.length > 1 && (
          <>
            <button onClick={() => setCurrentImg(i => (i - 1 + images.length) % images.length)} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 z-10"><ChevronLeft className="w-4 h-4" /></button>
            <button onClick={() => setCurrentImg(i => (i + 1) % images.length)} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 z-10"><ChevronRight className="w-4 h-4" /></button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {images.map((_: any, i: number) => (<button key={i} onClick={() => setCurrentImg(i)} className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentImg ? 'bg-white w-3' : 'bg-white/50'}`} />))}
            </div>
          </>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-bold text-lg mb-1 group-hover:text-brand-primary transition-colors">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <div>
            {SALE_ACTIVE && product.salePrice ? (
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-brand-primary">${product.salePrice.toFixed(2)}</span>
                <span className="text-sm text-gray-400 line-through">${product.basePrice.toFixed(2)}</span>
                <span className="text-[9px] font-bold bg-brand-primary text-white px-1.5 py-0.5 rounded-full">SALE</span>
              </div>
            ) : (
              <span className="text-xl font-bold font-mono">From ${product.basePrice.toFixed(2)}</span>
            )}
          </div>
          <button onClick={() => onOrder(product)} className="bg-brand-dark text-white p-3 rounded-xl hover:bg-brand-primary transition-colors"><ShoppingCart className="w-5 h-5" /></button>
        </div>
        {product.credit && <p className="text-[9px] text-gray-300 mt-3 leading-relaxed">{product.credit}</p>}
      </div>
    </motion.div>
  );
};

// ─── Products Section ─────────────────────────────────────────────────────────
const CurrentProducts = () => {
  const [orderProduct, setOrderProduct] = useState<any>(null);
  const products = [
    { id: 1, name: "Mini Flexi Octopus", basePrice: 5, salePrice: 4, tag: "Best Seller", images: ["/octopus.png"], description: "A fun articulated octopus with flexible legs. Great desk toy or gift for kids.", credit: "Design: Cute mini octopus by Louay23644, Thingiverse, CC BY-SA 3.0. Printed by D3V Prints." },
    { id: 2, name: "Credit Card Phone Stand", basePrice: 4, salePrice: 3, tag: "New Arrival", images: ["/phonestand.png"], description: "A slim, wallet friendly phone stand that folds flat and sets up in seconds.", credit: "Design: 0.8mm thin adjustable credit card phone stand by jq910, Thingiverse, CC BY 4.0. Printed by D3V Prints." },
    { id: 3, name: "Custom Keychain", basePrice: 3, salePrice: null, tag: "Personalized", images: ["/keychain.png"], description: "Name keychains, F1 keychains, and much more. Tell us what you want.", credit: "Design: Dependent on keychain, credits available upon request. Printed by D3V Prints." },
    { id: 4, name: "118dB Emergency Whistle", basePrice: 4, salePrice: 3, tag: "Popular", images: ["/whistle.png"], description: "A loud, pea-less 118dB emergency whistle perfect for hiking, camping, or everyday carry.", credit: "Design: V29 by jzisa, Thingiverse, CC BY 4.0. Printed by D3V Prints." },
    { id: 5, name: "Custom Print", basePrice: 0, salePrice: null, tag: "Any Design", images: ["/octopus.png"], description: "Have a design in mind? Send us your STL file and we'll print it for you. Any color, any material.", credit: null },
  ];

  return (
    <section id="products" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">Other Prints</div>
            <h2 className="text-4xl font-bold mb-3 italic">Popular Products</h2>
            <p className="text-gray-500 max-w-md text-sm">Fun and functional prints you can order anytime — including fully custom prints from your own files.</p>
          </div>
          {SALE_ACTIVE && (
            <div className="bg-brand-primary/10 border border-brand-primary/30 rounded-2xl px-5 py-3 text-sm font-bold text-brand-dark flex items-center gap-2 shrink-0">
              <Tag className="w-4 h-4 text-brand-primary" /> Launch sale pricing applied
            </div>
          )}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {products.map((product) => (<ProductCard key={product.id} product={product} onOrder={setOrderProduct} />))}
        </div>
        <p className="text-[9px] text-gray-300 text-center mt-10 max-w-2xl mx-auto leading-relaxed">
          Some products feature third-party designs licensed under Creative Commons Attribution 4.0 International (CC BY 4.0). Original designers retain copyright. D3V Prints provides printing services only. Credits available upon request.
        </p>
      </div>
      <AnimatePresence>
        {orderProduct && <ProductOrderModal product={orderProduct} onClose={() => setOrderProduct(null)} />}
      </AnimatePresence>
    </section>
  );
};

// ─── Reviews ──────────────────────────────────────────────────────────────────
const Reviews = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', rating: 5, text: '' });
  const [reviews, setReviews] = useState([
    { name: "Sarah M.", rating: 5, text: "Ordered a flat panel lithophane of my dog and it came out absolutely beautiful. The detail is incredible — you can see every strand of fur. Will definitely be ordering more.", date: "March 2025" },
    { name: "James R.", rating: 5, text: "Got the heart shape for my girlfriend for Valentine's Day. She cried. That's all I need to say. Incredible quality and the turnaround was super fast.", date: "February 2025" },
    { name: "Priya K.", rating: 5, text: "Ordered a night light for my daughter's room. The automatic sensor is so cool — it just turns on at night by itself. She loves it and so do I.", date: "March 2025" },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.text) return;
    setReviews(prev => [{ name: form.name, rating: form.rating, text: form.text, date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) }, ...prev]);
    setSubmitted(true);
    setForm({ name: '', rating: 5, text: '' });
  };

  return (
    <section id="reviews" className="py-24 px-6 bg-brand-light">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            Customer Reviews
          </div>
          <h2 className="text-5xl font-bold mb-4">What People <span className="text-brand-primary italic">Are Saying</span></h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex text-yellow-400 text-xl">{"★★★★★"}</div>
            <span className="text-gray-500 font-medium text-sm">{reviews.length} reviews · 5.0 average</span>
          </div>
        </div>

        {/* Review Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <AnimatePresence>
            {reviews.map((review, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative">
                <Quote className="w-8 h-8 text-brand-primary/20 absolute top-6 right-6" />
                <div className="flex text-yellow-400 text-sm mb-4">{"★".repeat(review.rating)}</div>
                <p className="text-gray-700 leading-relaxed mb-6 text-sm">"{review.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sm">{review.name}</p>
                    <p className="text-xs text-gray-400">{review.date}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-sm">
                    {review.name[0]}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Leave a Review */}
        <div className="bg-brand-dark text-white rounded-3xl p-10 max-w-2xl mx-auto">
          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
              <div className="w-16 h-16 bg-brand-primary/20 text-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Thanks for your review!</h3>
              <p className="text-gray-400 text-sm">Your feedback helps other customers and means the world to us.</p>
              <button onClick={() => setSubmitted(false)} className="mt-6 text-brand-primary text-sm font-bold hover:underline">Leave another review</button>
            </motion.div>
          ) : (
            <>
              <h3 className="text-2xl font-bold mb-2">Leave a Review</h3>
              <p className="text-gray-400 text-sm mb-8">Had a great experience? We'd love to hear about it.</p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  placeholder="Your name" required />
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 block">Rating</label>
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map(n => (
                      <button key={n} type="button" onClick={() => setForm({ ...form, rating: n })}
                        className={`text-2xl transition-all ${n <= form.rating ? 'text-yellow-400' : 'text-gray-600'}`}>★</button>
                    ))}
                  </div>
                </div>
                <textarea rows={4} value={form.text} onChange={e => setForm({ ...form, text: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-primary resize-none"
                  placeholder="Tell us about your experience..." required />
                <button type="submit" className="w-full bg-brand-primary text-brand-dark py-4 rounded-2xl font-bold hover:scale-105 transition-transform">
                  Submit Review
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

// ─── Product Quick Order Modal ────────────────────────────────────────────────
const ProductOrderModal = ({ product, onClose }: { product: any, onClose: () => void }) => {
  const [color, setColor] = useState('');
  const [qty, setQty] = useState(1);
  const [notes, setNotes] = useState('');
  const [delivery, setDelivery] = useState('');
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [step, setStep] = useState(1);

  const isPremium = PREMIUM_COLORS.includes(color);
  const baseUnit = SALE_ACTIVE && product.salePrice ? product.salePrice : product.basePrice;
  const unitPrice = baseUnit + (isPremium ? PREMIUM_SURCHARGE : 0);
  const isBulk = qty > BULK_THRESHOLD;
  const subtotal = unitPrice * qty;
  const estimated = color && product.basePrice > 0 ? (isBulk ? subtotal * (1 - BULK_DISCOUNT) : subtotal) : null;

  const handleSubmit = async () => {
    setStatus('submitting');
    const payload = {
      name, email,
      projectType: product.name,
      message: `Color: ${color} | Qty: ${qty} | Delivery: ${delivery}${address ? ` | Address: ${address}` : ''} | Notes: ${notes || 'None'}${isBulk ? ' | BULK ORDER' : ''}`,
      files: 'No files uploaded',
      date: new Date().toLocaleString()
    };
    try {
      const emailRes = await fetch('https://api.web3forms.com/submit', {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ access_key: '28aa3f21-d905-4e73-95bb-686ad236eb55', subject: `New D3V Prints Order: ${product.name}`, ...payload, 'Attached Files': 'No files uploaded' })
      });
      await fetch('https://script.google.com/macros/s/AKfycbx4VDX9kxQYqkGRg5cLoTvrt6R3To4QMG4U6qXAzevWAfm93Oqd-CQwUrfwboNy-_n9LA/exec', {
        method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
      });
      if (emailRes.ok) setStatus('success');
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-lg bg-white rounded-[2.5rem] overflow-y-auto max-h-[90vh] shadow-2xl p-10">
        <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/10 flex items-center justify-center hover:bg-black/20 transition-colors"><X className="w-5 h-5" /></button>
        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-10 h-10" /></div>
            <h3 className="text-2xl font-bold mb-3">Order Received! 🎉</h3>
            <p className="text-gray-500 leading-relaxed">You will receive an email within 12 hours with your order update and payment instructions.</p>
            <button onClick={onClose} className="mt-8 bg-brand-dark text-white px-8 py-4 rounded-2xl font-bold hover:bg-brand-primary transition-colors">Done</button>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-bold mb-1">{product.name}</h3>
            <p className="text-gray-500 text-sm mb-6">{product.description}</p>
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 block">Choose Color</label>
                  <p className="text-xs font-semibold text-gray-500 mb-2">Standard (no extra charge)</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {STANDARD_COLORS.map(c => (<button key={c} onClick={() => setColor(c)} className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${color === c ? 'border-brand-primary bg-brand-primary/10 text-brand-primary' : 'border-gray-200 hover:border-gray-300'}`}>{c}</button>))}
                  </div>
                  <p className="text-xs font-semibold text-gray-500 mb-2">Premium (+${PREMIUM_SURCHARGE}.00)</p>
                  <div className="flex flex-wrap gap-2">
                    {PREMIUM_COLORS.map(c => (<button key={c} onClick={() => setColor(c)} className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${color === c ? 'border-brand-primary bg-brand-primary/10 text-brand-primary' : 'border-gray-200 hover:border-gray-300'}`}>{c}</button>))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 block">Quantity</label>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center font-bold hover:border-brand-primary transition-colors">-</button>
                    <span className="text-2xl font-bold w-8 text-center">{qty}</span>
                    <button onClick={() => setQty(q => q + 1)} className="w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center font-bold hover:border-brand-primary transition-colors">+</button>
                  </div>
                  {qty > BULK_THRESHOLD && <p className="text-brand-primary text-xs font-bold mt-2">Bulk discount applied! {BULK_DISCOUNT * 100}% off.</p>}
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Delivery</label>
                  <div className="flex flex-col gap-2">
                    {[{ label: 'Pickup — Free (Plainsboro, NJ)', value: 'Pickup' }, { label: 'Local Dropoff — Small fee', value: 'Dropoff' }].map(d => (
                      <button key={d.value} onClick={() => setDelivery(d.value)} className={`text-left px-4 py-3 rounded-xl border-2 text-sm font-bold transition-all ${delivery === d.value ? 'border-brand-primary bg-brand-primary/10 text-brand-primary' : 'border-gray-200 hover:border-gray-300'}`}>{d.label}</button>
                    ))}
                    <button disabled className="text-left px-4 py-3 rounded-xl border-2 border-gray-100 text-sm font-bold text-gray-300 cursor-not-allowed">Shipping — Currently unavailable</button>
                  </div>
                  {delivery === 'Dropoff' && (
                    <input type="text" value={address} onChange={e => setAddress(e.target.value)}
                      className="w-full mt-3 px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none text-sm"
                      placeholder="Your address (we'll confirm if in range)" />
                  )}
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Notes (optional)</label>
                  <textarea rows={2} value={notes} onChange={e => setNotes(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none resize-none text-sm"
                    placeholder="Any special requests..." />
                </div>
                <button onClick={() => setStep(2)} disabled={!color || !delivery}
                  className="w-full bg-brand-dark text-white py-4 rounded-2xl font-bold hover:bg-brand-primary transition-colors disabled:opacity-50">
                  Continue <ChevronRight className="w-4 h-4 inline ml-1" />
                </button>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                <h4 className="text-lg font-bold">Your Details</h4>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none" placeholder="Your Name" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none" placeholder="Email Address" />
                <div className="bg-brand-light rounded-2xl p-5 space-y-3">
                  <h5 className="font-bold text-sm uppercase tracking-widest text-gray-500">Order Summary</h5>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Product</span><span className="font-bold">{product.name}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Color</span><span className="font-bold flex items-center gap-1">{color}{isPremium && <span className="text-[10px] text-brand-primary font-bold bg-brand-primary/10 px-1.5 py-0.5 rounded-full ml-1">Premium</span>}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Qty</span><span className="font-bold">{qty}{isBulk && <span className="text-brand-primary text-[10px] ml-1">(-{BULK_DISCOUNT * 100}%)</span>}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Delivery</span><span className="font-bold">{delivery}</span></div>
                  {estimated && (
                    <div className="border-t border-gray-200 pt-3 flex justify-between">
                      <span className="font-bold">Estimated Total</span>
                      <span className="font-black text-brand-primary text-lg">${estimated.toFixed(2)}</span>
                    </div>
                  )}
                  <p className="text-[10px] text-gray-400">Final price confirmed via email after order review.</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 py-4 rounded-2xl font-bold border-2 border-gray-200 hover:bg-gray-50 transition-colors"><ChevronLeft className="w-4 h-4 inline mr-1" /> Back</button>
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

// ─── Contact / Lithophane Order Form ─────────────────────────────────────────
const Contact = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', projectType: '', projectId: '', message: '', color: '', delivery: '', address: '' });
  const [uploadedFiles, setUploadedFiles] = useState<{name: string, url: string}[]>([]);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const projectTypes = [
    { id: 'flat', title: 'Flat Panel', description: 'Classic lithophane from your photo', icon: <ImageIcon className="w-6 h-6" />, price: LITHOPHANE_PRICES['Flat Panel'] },
    { id: 'night', title: 'Night Light', description: 'Auto on/off smart sensor included', icon: <Lightbulb className="w-6 h-6" />, price: LITHOPHANE_PRICES['Night Light'] },
    { id: 'heart', title: 'Heart Shape', description: 'Stand-alone display piece', icon: <Heart className="w-6 h-6" />, price: LITHOPHANE_PRICES['Heart Shape'] },
    { id: 'customShape', title: 'Custom Shape', description: 'Name, logo, or any silhouette', icon: <Sparkles className="w-6 h-6" />, price: LITHOPHANE_PRICES['Custom Shape'] },
    { id: 'customPrint', title: 'Custom Print', description: 'Send your own STL file', icon: <FileText className="w-6 h-6" />, price: null },
  ];

  const selected = projectTypes.find(p => p.id === formData.projectId);
  const isPremiumColor = PREMIUM_COLORS.includes(formData.color);
  const basePrice = selected?.price ? (SALE_ACTIVE ? selected.price.sale : selected.price.original) : null;
  const estimatedPrice = basePrice ? basePrice + (isPremiumColor ? PREMIUM_SURCHARGE : 0) : null;
  const isCustomPrint = formData.projectId === 'customPrint';
  const isLitho = formData.projectId !== 'customPrint';

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
      name: formData.name, email: formData.email,
      projectType: formData.projectType,
      message: `Delivery: ${formData.delivery}${formData.address ? ` | Address: ${formData.address}` : ''} | Color: ${formData.color || 'N/A'} | Notes: ${formData.message || 'None'}`,
      files: fileLinks, date: new Date().toLocaleString()
    };
    try {
      const emailResponse = await fetch('https://api.web3forms.com/submit', {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ access_key: '28aa3f21-d905-4e73-95bb-686ad236eb55', subject: `New D3V Prints Order: ${formData.projectType}`, ...payload, 'Attached Files': fileLinks })
      });
      await fetch('https://script.google.com/macros/s/AKfycbx4VDX9kxQYqkGRg5cLoTvrt6R3To4QMG4U6qXAzevWAfm93Oqd-CQwUrfwboNy-_n9LA/exec', {
        method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
      });
      if (emailResponse.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', projectType: '', projectId: '', message: '', color: '', delivery: '', address: '' });
        setUploadedFiles([]); setStep(1);
      } else { setStatus('error'); }
    } catch { setStatus('error'); }
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-brand-dark rounded-[3rem] p-8 lg:p-20 text-white relative overflow-hidden">
          <div className="relative z-10 grid lg:grid-cols-5 gap-16">
            <div className="lg:col-span-2">
              <h2 className="text-5xl font-bold mb-4 leading-tight">Place Your <br /><span className="text-brand-primary">Order</span></h2>
              <p className="text-gray-400 mb-6 leading-relaxed text-sm">Lithophane night lights, custom prints, or anything else — fill out the form and we'll get back to you within 12 hours.</p>
              <div className="flex items-center gap-2 text-brand-primary text-sm font-bold mb-3">
                <MapPin className="w-4 h-4" /> Based in Plainsboro, NJ
              </div>
              {SALE_ACTIVE && (
                <div className="bg-brand-primary/10 border border-brand-primary/30 rounded-xl px-4 py-3 mb-8">
                  <p className="text-brand-primary text-xs font-bold"><Tag className="w-3 h-3 inline mr-1" />Launch sale pricing applied automatically</p>
                </div>
              )}
              <div className="hidden lg:block space-y-6">
                {['Select Style', 'Photo & Details', 'Your Info', 'Review & Place'].map((label, i) => (
                  <div key={i} className={`flex items-center gap-4 transition-opacity ${step >= i + 1 ? 'opacity-100' : 'opacity-30'}`}>
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold border-2 text-sm ${step >= i + 1 ? 'bg-brand-primary border-brand-primary text-brand-dark' : 'border-white/20'}`}>{i + 1}</div>
                    <div className="text-sm font-bold uppercase tracking-widest">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3 bg-white rounded-[2.5rem] p-8 lg:p-12 text-brand-dark">
              {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6"><CheckCircle className="w-10 h-10" /></div>
                  <h3 className="text-2xl font-bold mb-3">Order Received! 🎉</h3>
                  <p className="text-gray-500 mb-8 leading-relaxed">You will receive an email back within 12 hours with your order update and payment instructions.</p>
                  <button onClick={() => setStatus('idle')} className="bg-brand-dark text-white px-8 py-4 rounded-2xl font-bold hover:bg-brand-primary transition-colors">Place Another Order</button>
                </div>
              ) : (
                <div className="h-full flex flex-col">

                  {/* Step 1 — Select */}
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                      <h3 className="text-2xl font-bold">What would you like?</h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {projectTypes.map((type) => (
                          <button key={type.id} onClick={() => { setFormData({ ...formData, projectType: type.title, projectId: type.id }); setStep(2); }}
                            className="text-left p-5 rounded-3xl border-2 border-gray-100 hover:border-brand-primary hover:bg-brand-primary/5 transition-all group">
                            <div className="w-10 h-10 rounded-2xl bg-gray-100 group-hover:bg-brand-primary/20 flex items-center justify-center mb-3 transition-colors">{type.icon}</div>
                            <div className="font-bold">{type.title}</div>
                            <div className="text-xs text-gray-500 mt-0.5">{type.description}</div>
                            {type.price && (
                              <div className="mt-2 flex items-center gap-1.5">
                                <span className="text-brand-primary font-bold text-sm">${SALE_ACTIVE ? type.price.sale : type.price.original}</span>
                                {SALE_ACTIVE && <span className="text-gray-400 text-xs line-through">${type.price.original}</span>}
                              </div>
                            )}
                            {!type.price && <div className="text-brand-primary font-bold text-sm mt-2">Quote on request</div>}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2 — Details */}
                  {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold">Photo & Details</h3>
                        <span className="text-sm font-bold text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-full">{formData.projectType}</span>
                      </div>

                      {isCustomPrint && (
                        <div>
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Choose Color</label>
                          <p className="text-xs text-gray-400 mb-2">Standard (no extra charge)</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {STANDARD_COLORS.map(c => (<button key={c} onClick={() => setFormData({ ...formData, color: c })} className={`px-3 py-1.5 rounded-xl text-sm font-bold border-2 transition-all ${formData.color === c ? 'border-brand-primary bg-brand-primary/10 text-brand-primary' : 'border-gray-200 hover:border-gray-300'}`}>{c}</button>))}
                          </div>
                          <p className="text-xs text-gray-400 mb-2">Premium (+${PREMIUM_SURCHARGE}.00)</p>
                          <div className="flex flex-wrap gap-2">
                            {PREMIUM_COLORS.map(c => (<button key={c} onClick={() => setFormData({ ...formData, color: c })} className={`px-3 py-1.5 rounded-xl text-sm font-bold border-2 transition-all ${formData.color === c ? 'border-brand-primary bg-brand-primary/10 text-brand-primary' : 'border-gray-200 hover:border-gray-300'}`}>{c}</button>))}
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Delivery Preference</label>
                        <div className="flex flex-col gap-2">
                          {[{ label: 'Pickup — Free (Plainsboro, NJ)', value: 'Pickup' }, { label: 'Local Dropoff — Small fee', value: 'Dropoff' }].map(d => (
                            <button key={d.value} onClick={() => setFormData({ ...formData, delivery: d.value })}
                              className={`text-left px-4 py-3 rounded-xl border-2 text-sm font-bold transition-all ${formData.delivery === d.value ? 'border-brand-primary bg-brand-primary/10 text-brand-primary' : 'border-gray-200 hover:border-gray-300'}`}>{d.label}</button>
                          ))}
                          <button disabled className="text-left px-4 py-3 rounded-xl border-2 border-gray-100 text-sm font-bold text-gray-300 cursor-not-allowed">Shipping — Currently unavailable</button>
                        </div>
                        {formData.delivery === 'Dropoff' && (
                          <input type="text" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })}
                            className="w-full mt-3 px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none text-sm"
                            placeholder="Your address (we'll confirm if in range)" />
                        )}
                      </div>

                      <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Notes or requests</label>
                        <textarea rows={2} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none resize-none"
                          placeholder={isLitho ? "e.g. crop to face only, warm LED preferred..." : "Describe what you want printed..."} />
                      </div>

                      <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                          {isCustomPrint ? 'Upload Your STL File' : 'Upload Your Photo'}
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
                            {uploadedFiles.map((f, i) => (<a key={i} href={f.url} target="_blank" rel="noopener noreferrer" className="bg-gray-100 px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-2 hover:bg-gray-200"><Paperclip className="w-3 h-3" /> {f.name}</a>))}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-4 pt-2">
                        <button onClick={() => setStep(1)} className="flex-1 px-6 py-4 rounded-2xl font-bold border-2 border-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"><ChevronLeft className="w-5 h-5" /> Back</button>
                        <button onClick={() => setStep(3)} disabled={uploading || !formData.delivery}
                          className="flex-[2] bg-brand-dark text-white px-6 py-4 rounded-2xl font-bold hover:bg-brand-primary transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                          Next <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3 — Info */}
                  {step === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                      <h3 className="text-2xl font-bold">Your Details</h3>
                      <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Your Name</label>
                        <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none" placeholder="John Doe" />
                      </div>
                      <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Email Address</label>
                        <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none" placeholder="john@example.com" />
                      </div>
                      <div className="flex gap-4 pt-2">
                        <button onClick={() => setStep(2)} className="flex-1 px-6 py-4 rounded-2xl font-bold border-2 border-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"><ChevronLeft className="w-5 h-5" /> Back</button>
                        <button onClick={() => setStep(4)} disabled={!formData.name || !formData.email}
                          className="flex-[2] bg-brand-dark text-white px-6 py-4 rounded-2xl font-bold hover:bg-brand-primary transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                          Review Order <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4 — Review */}
                  {step === 4 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                      <h3 className="text-2xl font-bold">Review Your Order</h3>
                      <div className="bg-brand-light rounded-2xl p-6 space-y-4">
                        {[
                          { label: 'Name', value: formData.name },
                          { label: 'Email', value: formData.email },
                          { label: 'Style', value: formData.projectType },
                          { label: 'Delivery', value: formData.delivery + (formData.address ? ` — ${formData.address}` : '') },
                          ...(isCustomPrint && formData.color ? [{ label: 'Color', value: formData.color + (isPremiumColor ? ` (+$${PREMIUM_SURCHARGE})` : '') }] : []),
                          ...(uploadedFiles.length > 0 ? [{ label: 'Files', value: `${uploadedFiles.length} uploaded` }] : []),
                          ...(formData.message ? [{ label: 'Notes', value: formData.message }] : []),
                        ].map((row, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span className="text-gray-500 font-medium">{row.label}</span>
                            <span className="font-bold text-right max-w-[60%]">{row.value}</span>
                          </div>
                        ))}
                        <div className="border-t border-gray-300 pt-4 flex justify-between items-center">
                          <span className="font-bold">Estimated Total</span>
                          <span className="font-black text-brand-primary text-xl">{estimatedPrice ? `From $${estimatedPrice.toFixed(2)}` : 'Quote on request'}</span>
                        </div>
                        <p className="text-[10px] text-gray-400">Final price confirmed via email after order review.</p>
                      </div>
                      <div className="flex gap-4">
                        <button onClick={() => setStep(3)} className="flex-1 px-6 py-4 rounded-2xl font-bold border-2 border-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"><ChevronLeft className="w-5 h-5" /> Back</button>
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

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="py-12 px-6 border-t border-gray-100">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-2">
        <div className="bg-brand-dark p-1.5 rounded-lg"><Printer className="w-4 h-4 text-brand-primary" /></div>
        <span className="font-bold text-lg tracking-tighter">D3V PRINTS</span>
      </div>
      <div className="flex gap-8 text-sm text-gray-500 font-medium">
        <a href="/terms.html" className="hover:text-brand-dark transition-colors">Terms of Service</a>
        <a href="/privacy.html" className="hover:text-brand-dark transition-colors">Privacy Policy</a>
      </div>
      <div className="flex gap-4">
        <a href="https://www.instagram.com/d3v.prints/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
          <Instagram className="w-4 h-4" />
        </a>
      </div>
    </div>
    <div className="max-w-7xl mx-auto text-center mt-8 text-xs text-gray-400 font-mono uppercase tracking-widest">
      © {new Date().getFullYear()} D3V Prints — Plainsboro, NJ. All rights reserved.
    </div>
    <div className="max-w-7xl mx-auto text-center mt-3">
      <p className="text-[9px] text-gray-200 leading-relaxed max-w-3xl mx-auto">
        Some third-party designs available for purchase are licensed under Creative Commons Attribution 4.0 International (CC BY 4.0) or similar open licenses. Original designers retain copyright. D3V Prints provides physical printing services only. Credits available upon request.
      </p>
    </div>
  </footer>
);

// ─── App ──────────────────────────────────────────────────────────────────────
const Home = () => (
  <main>
    <Hero />
    <LithophaneSection />
    <StyleShowcase />
    <HowItWorks />
    <CurrentProducts />
    <Reviews />
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
