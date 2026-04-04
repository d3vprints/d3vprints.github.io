import React, { useState, useEffect, useContext, createContext, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Routes, Route, useLocation } from 'react-router-dom';
import {
  ShoppingCart, Upload, Package, Printer, Lightbulb,
  ChevronRight, Instagram, ArrowRight, Menu, X,
  CheckCircle, FileText, Image as ImageIcon, ChevronLeft,
  Paperclip, Heart, Camera, MapPin, Car, Tag, Sparkles,
  Quote, Plus, Minus, Trash2, ShoppingBag, Star
} from 'lucide-react';

// ─── Constants ─────────────────────────────────────────────────────────────────
const STANDARD_COLORS = ['Black', 'White', 'Blue'];
const PREMIUM_COLORS = ['Red', 'Green', 'Yellow', 'Orange', 'Purple', 'Pink', 'Gray', 'Teal', 'Gold', 'Silver'];
const PREMIUM_SURCHARGE = 3;
const SALE_ACTIVE = true;
const BULK_DISCOUNT = 0.15;
const BULK_THRESHOLD = 5;

const LITHOPHANE_PRICES: Record<string, { original: number; sale: number }> = {
  'Flat Panel':   { original: 30, sale: 25 },
  'Night Light':  { original: 40, sale: 35 },
  'Heart Shape':  { original: 35, sale: 30 },
  'Custom Shape': { original: 45, sale: 38 },
};

const PRODUCTS = [
  { id: 1, name: 'Mini Flexi Octopus',      basePrice: 5,  salePrice: 4,    tag: 'Best Seller',  images: ['/octopus.png'],    description: 'A fun articulated octopus with flexible legs. Great desk toy or gift for kids.',                         credit: 'Design: Cute mini octopus by Louay23644, Thingiverse, CC BY-SA 3.0. Printed by D3V Prints.' },
  { id: 2, name: 'Credit Card Phone Stand', basePrice: 4,  salePrice: 3,    tag: 'New Arrival',  images: ['/phonestand.png'], description: 'A slim, wallet-friendly phone stand that folds flat and sets up in seconds.',                           credit: 'Design: 0.8mm thin adjustable credit card phone stand by jq910, Thingiverse, CC BY 4.0. Printed by D3V Prints.' },
  { id: 3, name: 'Custom Keychain',         basePrice: 3,  salePrice: null, tag: 'Personalized', images: ['/keychain.png'],   description: 'Name keychains, F1 keychains, and much more. Tell us what you want.',                                  credit: 'Design: Dependent on keychain, credits available upon request. Printed by D3V Prints.' },
  { id: 4, name: '118dB Emergency Whistle', basePrice: 4,  salePrice: 3,    tag: 'Popular',      images: ['/whistle.png'],    description: 'A loud, pea-less 118dB emergency whistle. Perfect for hiking, camping, or everyday carry.',           credit: 'Design: V29 by jzisa, Thingiverse, CC BY 4.0. Printed by D3V Prints.' },
  { id: 5, name: 'Custom Print',            basePrice: 0,  salePrice: null, tag: 'Any Design',   images: ['/octopus.png'],    description: 'Have a design in mind? Send us your STL file and we will print it for you. Any color, any material.', isCustom: true, credit: null },
] as const;

// ─── Types ─────────────────────────────────────────────────────────────────────
interface CartItem {
  cartId: string;
  type: 'product' | 'lithophane';
  productId?: number;
  name: string;
  color?: string;
  qty: number;
  unitPrice: number;
  image?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'cartId'>) => void;
  removeItem: (cartId: string) => void;
  updateQty: (cartId: string, qty: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

// ─── Cart Context ──────────────────────────────────────────────────────────────
const CartContext = createContext<CartContextType | null>(null);

const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem('d3vprints_cart') || '[]'); }
    catch { return []; }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('d3vprints_cart', JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((item: Omit<CartItem, 'cartId'>) => {
    const cartId = `${item.type}-${item.productId ?? item.name}-${item.color ?? ''}-${Date.now()}`;
    setItems(prev => {
      if (item.type === 'product' && item.color) {
        const existing = prev.find(i => i.type === 'product' && i.productId === item.productId && i.color === item.color);
        if (existing) return prev.map(i => i.cartId === existing.cartId ? { ...i, qty: i.qty + item.qty } : i);
      }
      return [...prev, { ...item, cartId }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((cartId: string) => setItems(prev => prev.filter(i => i.cartId !== cartId)), []);

  const updateQty = useCallback((cartId: string, qty: number) => {
    if (qty <= 0) setItems(prev => prev.filter(i => i.cartId !== cartId));
    else setItems(prev => prev.map(i => i.cartId === cartId ? { ...i, qty } : i));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const total = items.reduce((s, i) => s + i.unitPrice * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, total, count, isOpen, setIsOpen }}>
      {children}
    </CartContext.Provider>
  );
};

// ─── Cart Drawer ───────────────────────────────────────────────────────────────
const CartDrawer = () => {
  const { items, removeItem, updateQty, total, count, isOpen, setIsOpen, clearCart } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]" onClick={() => setIsOpen(false)} />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[100] shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5" />
                <h2 className="text-xl font-bold">Your Cart</h2>
                {count > 0 && <span className="bg-brand-primary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{count}</span>}
              </div>
              <button onClick={() => setIsOpen(false)} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
                <ShoppingBag className="w-14 h-14 text-gray-200 mb-4" />
                <p className="font-bold text-gray-500">Your cart is empty</p>
                <p className="text-gray-400 text-sm mt-1">Add items to save them for later</p>
                <button onClick={() => setIsOpen(false)} className="mt-6 bg-brand-dark text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-primary transition-colors text-sm">
                  Browse Products
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-3">
                  {items.map(item => (
                    <div key={item.cartId} className="flex gap-4 bg-gray-50 rounded-2xl p-4">
                      {item.image && <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover bg-white shrink-0" />}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-bold text-sm leading-tight">{item.name}</p>
                            {item.color && <p className="text-xs text-gray-500">Color: {item.color}</p>}
                            {item.type === 'lithophane' && <p className="text-[10px] text-brand-primary font-bold mt-0.5">Photo needed at checkout</p>}
                          </div>
                          <button onClick={() => removeItem(item.cartId)} className="text-gray-300 hover:text-red-400 transition-colors shrink-0">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button onClick={() => updateQty(item.cartId, item.qty - 1)} className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:border-brand-primary transition-colors">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-bold w-5 text-center">{item.qty}</span>
                            <button onClick={() => updateQty(item.cartId, item.qty + 1)} className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:border-brand-primary transition-colors">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="font-bold text-brand-primary text-sm">${(item.unitPrice * item.qty).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-6 border-t border-gray-100 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium">Estimated Total</span>
                    <span className="text-2xl font-black text-brand-primary">${total.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-400">Final price confirmed via email. Lithophanes require a photo at checkout.</p>
                  <a href="#contact" onClick={() => setIsOpen(false)} className="block text-center bg-brand-dark text-white py-4 rounded-2xl font-bold hover:bg-brand-primary transition-colors">
                    Proceed to Checkout
                  </a>
                  <button onClick={clearCart} className="w-full text-gray-400 text-sm py-1 hover:text-gray-600 transition-colors font-medium">
                    Clear cart
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ─── Quick Add Modal ───────────────────────────────────────────────────────────
const QuickAddModal = ({ product, onClose }: { product: any; onClose: () => void }) => {
  const { addItem } = useCart();
  const [color, setColor] = useState('');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const isPremium = PREMIUM_COLORS.includes(color);
  const basePrice = SALE_ACTIVE && product.salePrice ? product.salePrice : product.basePrice;
  const unitPrice = basePrice + (isPremium ? PREMIUM_SURCHARGE : 0);

  const handleAdd = () => {
    addItem({ type: 'product', productId: product.id, name: product.name, color, qty, unitPrice, image: product.images[0] });
    setAdded(true);
    setTimeout(onClose, 800);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-md bg-white rounded-[2rem] p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/10 flex items-center justify-center hover:bg-black/20"><X className="w-4 h-4" /></button>
        <h3 className="text-xl font-bold mb-1">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-6">{product.description}</p>

        <div className="mb-5">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Color</label>
          <p className="text-xs text-gray-400 mb-2">Standard (no extra charge)</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {STANDARD_COLORS.map(c => (
              <button key={c} onClick={() => setColor(c)} className={`px-3 py-1.5 rounded-xl text-sm font-bold border-2 transition-all ${color === c ? 'border-brand-primary bg-brand-primary/10 text-brand-primary' : 'border-gray-200 hover:border-gray-300'}`}>{c}</button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mb-2">Premium (+${PREMIUM_SURCHARGE})</p>
          <div className="flex flex-wrap gap-2">
            {PREMIUM_COLORS.map(c => (
              <button key={c} onClick={() => setColor(c)} className={`px-3 py-1.5 rounded-xl text-sm font-bold border-2 transition-all ${color === c ? 'border-brand-primary bg-brand-primary/10 text-brand-primary' : 'border-gray-200 hover:border-gray-300'}`}>{c}</button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 block">Quantity</label>
          <div className="flex items-center gap-4">
            <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center font-bold hover:border-brand-primary transition-colors">-</button>
            <span className="text-2xl font-bold w-8 text-center">{qty}</span>
            <button onClick={() => setQty(q => q + 1)} className="w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center font-bold hover:border-brand-primary transition-colors">+</button>
          </div>
        </div>

        {color && (
          <div className="bg-brand-light rounded-xl px-4 py-3 mb-4 flex justify-between text-sm">
            <span className="text-gray-500">Estimated</span>
            <span className="font-black text-brand-primary">${(unitPrice * qty).toFixed(2)}</span>
          </div>
        )}

        <button onClick={handleAdd} disabled={!color || added}
          className={`w-full py-4 rounded-2xl font-bold transition-all ${added ? 'bg-green-500 text-white' : 'bg-brand-dark text-white hover:bg-brand-primary disabled:opacity-50'}`}>
          {added ? 'Added to Cart!' : 'Add to Cart'}
        </button>
      </motion.div>
    </div>
  );
};

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { count, setIsOpen: setCartOpen } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass rounded-2xl px-6 py-3 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-brand-dark p-1.5 rounded-lg"><Printer className="w-5 h-5 text-brand-primary" /></div>
          <span className="font-bold text-xl tracking-tighter">D3V PRINTS</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#lithophanes" className="hover:text-brand-primary transition-colors font-semibold text-brand-primary">Lithophanes</a>
          <a href="#styles" className="hover:text-brand-primary transition-colors">Styles</a>
          <a href="#products" className="hover:text-brand-primary transition-colors">Products</a>
          <a href="#reviews" className="hover:text-brand-primary transition-colors">Reviews</a>
          <button onClick={() => setCartOpen(true)} className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {count > 0 && <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{count}</span>}
          </button>
          <a href="#contact" className="bg-brand-dark text-white px-5 py-2 rounded-xl hover:bg-brand-dark/90 transition-all">Order Now</a>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <button onClick={() => setCartOpen(true)} className="relative p-2">
            <ShoppingCart className="w-5 h-5" />
            {count > 0 && <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{count}</span>}
          </button>
          <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X /> : <Menu />}</button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-6 right-6 glass rounded-2xl p-6 flex flex-col gap-4 md:hidden shadow-xl">
            <a href="#lithophanes" onClick={() => setIsOpen(false)} className="text-lg font-semibold text-brand-primary">Lithophanes</a>
            <a href="#styles" onClick={() => setIsOpen(false)} className="text-lg font-medium">Styles</a>
            <a href="#products" onClick={() => setIsOpen(false)} className="text-lg font-medium">Products</a>
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
            <Tag className="w-4 h-4 text-brand-primary" /> Launch Sale: First 50 customers get exclusive pricing
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

// ─── Lithophane Section ───────────────────────────────────────────────────────
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
  const { addItem } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const styles = [
    { id: 'flat',   name: "Flat Panel",   tag: "Most Popular", desc: "The classic lithophane. A thin rectangular panel that sits on a warm LED base. Great for portraits, family shots, and pet photos.", detail: "Warm LED base included",          price: LITHOPHANE_PRICES['Flat Panel'],   image: "/flatlitho.png",      best: "Portraits, families, pets" },
    { id: 'night',  name: "Night Light",  tag: "Smart Light",  desc: "A curved cylindrical lithophane with a built-in smart sensor. Turns on when the room gets dark and off when there is light. No switches needed.", detail: "Auto on/off light sensor",      price: LITHOPHANE_PRICES['Night Light'],  image: "/nightlightlitho.png", best: "Bedrooms, kids rooms, hallways", highlight: true },
    { id: 'heart',  name: "Heart Shape",  tag: "Best Gift",    desc: "A heart-shaped lithophane panel with the same photographic detail. Stand-alone or can be hung. The most gifted style we make.",              detail: "Stand-alone display piece",       price: LITHOPHANE_PRICES['Heart Shape'],  image: "/heartlitho.png",     best: "Couples, Valentine's Day, memorials" },
    { id: 'custom', name: "Custom Shape", tag: "Unique",       desc: "Want something different? We can print lithophanes in custom shapes — names, initials, logos, animals, silhouettes.",                         detail: "LED base included",               price: LITHOPHANE_PRICES['Custom Shape'], image: "/flatlitho.png",      best: "Logos, names, unique gifts" },
  ];

  const handleAddToCart = (style: typeof styles[0]) => {
    const price = SALE_ACTIVE ? style.price.sale : style.price.original;
    addItem({ type: 'lithophane', name: `Lithophane: ${style.name}`, qty: 1, unitPrice: price, image: style.image });
    setAddedId(style.id);
    setTimeout(() => setAddedId(null), 2000);
  };

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
              Launch Sale: First 50 customers only. Prices shown are already reduced.
            </p>
          </div>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {styles.map((style) => (
            <motion.div key={style.id} whileHover={{ y: -8 }}
              className={`rounded-3xl border overflow-hidden shadow-sm hover:shadow-xl transition-all ${(style as any).highlight ? 'border-brand-primary ring-2 ring-brand-primary/20' : 'border-gray-100'}`}>
              <div className="aspect-[4/3] overflow-hidden bg-gray-50 relative">
                <img src={style.image} alt={style.name} className="w-full h-full object-contain p-4" />
                <div className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${(style as any).highlight ? 'bg-brand-primary text-white' : 'bg-brand-dark text-white'}`}>
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
                <div className="flex items-center justify-between gap-2">
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
                  <div className="flex gap-2">
                    <button onClick={() => handleAddToCart(style)}
                      className={`px-3 py-2 rounded-xl font-bold text-xs transition-all ${addedId === style.id ? 'bg-green-500 text-white' : 'bg-brand-light text-brand-dark hover:bg-brand-primary/20'}`}>
                      {addedId === style.id ? 'Saved!' : 'Save'}
                    </button>
                    <a href="#contact" className="bg-brand-dark text-white px-3 py-2 rounded-xl font-bold text-xs hover:bg-brand-primary transition-colors">Order</a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="bg-brand-dark text-white rounded-2xl px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-lg mb-1">Ordering 6 or more? You get a bulk discount.</h4>
            <p className="text-gray-400 text-sm">Orders of {BULK_THRESHOLD + 1}+ lithophanes automatically get {BULK_DISCOUNT * 100}% off. Perfect for events, weddings, or family gifts.</p>
          </div>
          <a href="#contact" className="shrink-0 bg-brand-primary text-brand-dark px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform whitespace-nowrap">
            Place Bulk Order
          </a>
        </div>
      </div>
    </section>
  );
};

// ─── How It Works ─────────────────────────────────────────────────────────────
const HowItWorks = () => (
  <section id="how-it-works" className="py-24 px-6 bg-brand-light">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-4">Ordering Is <span className="text-brand-primary italic">Simple</span></h2>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">From photo to your hands in just a few steps.</p>
      </div>
      <div className="grid md:grid-cols-4 gap-6 mb-16">
        {[
          { step: "01", icon: <Camera className="w-7 h-7" />,  title: "Pick Your Style",   desc: "Flat panel, night light, heart, or custom shape." },
          { step: "02", icon: <Upload className="w-7 h-7" />,  title: "Upload Your Photo", desc: "Higher resolution means sharper detail." },
          { step: "03", icon: <Printer className="w-7 h-7" />, title: "We Print It",       desc: "Precision printed over 24+ hours." },
          { step: "04", icon: <Package className="w-7 h-7" />, title: "You Pick It Up",    desc: "Free pickup in Plainsboro, NJ." },
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
          <h3 className="text-2xl font-bold">Pickup and Delivery</h3>
        </div>
        <p className="text-gray-400 text-sm mb-10">We are currently local only, based in <span className="text-white font-semibold">Plainsboro, NJ</span>.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: <MapPin className="w-7 h-7" />,  title: "Pickup",        badge: "Free",        green: true,  desc: "Come grab your order from us in Plainsboro, NJ. We will send you the exact address once your print is ready." },
            { icon: <Car className="w-7 h-7" />,     title: "Local Dropoff", badge: "Small fee",   green: false, desc: "We deliver to you within our local area. Enter your address in the order form and we will confirm if you are in range." },
            { icon: <Package className="w-7 h-7" />, title: "Shipping",      badge: "Coming soon", green: false, desc: "Shipping is not available right now. We are working on expanding, check back soon!", disabled: true },
          ].map((opt, i) => (
            <div key={i} className={`rounded-2xl p-8 border ${opt.disabled ? 'bg-white/[0.03] border-white/5 opacity-50' : 'bg-white/5 border-white/10'}`}>
              <div className="text-gray-400 mb-4">{opt.icon}</div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-lg">{opt.title}</h4>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${opt.green ? 'bg-brand-primary text-brand-dark' : 'bg-white/10 text-gray-300'}`}>{opt.badge}</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{opt.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ─── Product Card ─────────────────────────────────────────────────────────────
const ProductCard = ({ product, onOrder }: { product: any; onOrder: (p: any) => void }) => {
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
              <span className="text-xl font-bold font-mono">{product.basePrice > 0 ? `From $${product.basePrice.toFixed(2)}` : 'Get a quote'}</span>
            )}
          </div>
          <button onClick={() => product.isCustom ? (window.location.href = '#contact') : onOrder(product)}
            className="bg-brand-dark text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-brand-primary transition-colors flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" /> {product.isCustom ? 'Quote' : 'Add to Cart'}
          </button>
        </div>
        {product.credit && <p className="text-[9px] text-gray-300 mt-3 leading-relaxed">{product.credit}</p>}
      </div>
    </motion.div>
  );
};

// ─── Current Products ─────────────────────────────────────────────────────────
const CurrentProducts = () => {
  const [modalProduct, setModalProduct] = useState<any>(null);

  return (
    <section id="products" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">Other Prints</div>
            <h2 className="text-4xl font-bold mb-3 italic">Popular Products</h2>
            <p className="text-gray-500 max-w-md text-sm">Fun and functional prints you can order anytime, including fully custom prints from your own files.</p>
          </div>
          {SALE_ACTIVE && (
            <div className="bg-brand-primary/10 border border-brand-primary/30 rounded-2xl px-5 py-3 text-sm font-bold text-brand-dark flex items-center gap-2 shrink-0">
              <Tag className="w-4 h-4 text-brand-primary" /> Launch sale pricing applied
            </div>
          )}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {PRODUCTS.map(product => <ProductCard key={product.id} product={product} onOrder={setModalProduct} />)}
        </div>
        <p className="text-[9px] text-gray-300 text-center mt-10 max-w-2xl mx-auto leading-relaxed">
          Some products feature third-party designs licensed under Creative Commons Attribution 4.0 International (CC BY 4.0). Original designers retain copyright. D3V Prints provides printing services only. Credits available upon request.
        </p>
      </div>
      <AnimatePresence>
        {modalProduct && <QuickAddModal product={modalProduct} onClose={() => setModalProduct(null)} />}
      </AnimatePresence>
    </section>
  );
};

// ─── Reviews ──────────────────────────────────────────────────────────────────
const BASE_REVIEWS = [
  { name: "Sarah M.", rating: 5, text: "Ordered a flat panel lithophane of my dog and it came out absolutely beautiful. The detail is incredible, you can see every strand of fur. Will definitely be ordering more.", date: "March 2025" },
  { name: "James R.", rating: 5, text: "Got the heart shape for my girlfriend for Valentine's Day. She cried. That is all I need to say. Incredible quality and the turnaround was super fast.", date: "February 2025" },
  { name: "Priya K.", rating: 5, text: "Ordered a night light for my daughter's room. The automatic sensor is so cool, it just turns on at night by itself. She loves it and so do I.", date: "March 2025" },
];

const ReviewCard = ({ review }: { review: any }) => (
  <div className="min-w-[340px] max-w-[340px] bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative mx-3 select-none">
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
  </div>
);

const Reviews = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', rating: 5, text: '' });
  const reviews = BASE_REVIEWS;
  const doubled = [...reviews, ...reviews];
  const duration = Math.max(reviews.length * 8, 24);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.text) return;
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: '28aa3f21-d905-4e73-95bb-686ad236eb55',
          subject: `New Review from ${form.name} (${form.rating}/5 stars)`,
          message: `Name: ${form.name}\nRating: ${form.rating}/5\n\n"${form.text}"`
        })
      });
    } catch {}
    setSubmitted(true);
    setForm({ name: '', rating: 5, text: '' });
  };

  return (
    <section id="reviews" className="py-24 px-6 bg-brand-light overflow-hidden">
      <style>{`
        @keyframes d3v-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .review-marquee {
          animation: d3v-scroll ${duration}s linear infinite;
          will-change: transform;
        }
        .review-marquee:hover { animation-play-state: paused; }
      `}</style>

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

        <div className="-mx-6 mb-16 overflow-hidden">
          <div className="review-marquee flex py-4">
            {doubled.map((review, i) => <ReviewCard key={i} review={review} />)}
          </div>
        </div>

        <div className="bg-brand-dark text-white rounded-3xl p-10 max-w-2xl mx-auto">
          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
              <div className="w-16 h-16 bg-brand-primary/20 text-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Thanks for your review!</h3>
              <p className="text-gray-400 text-sm">Your feedback means a lot to us. We will review it and add it to the site soon.</p>
              <button onClick={() => setSubmitted(false)} className="mt-6 text-brand-primary text-sm font-bold hover:underline">Leave another review</button>
            </motion.div>
          ) : (
            <>
              <h3 className="text-2xl font-bold mb-2">Leave a Review</h3>
              <p className="text-gray-400 text-sm mb-8">Had a great experience? We would love to hear about it.</p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  placeholder="Your name" required />
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 block">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(n => (
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

// ─── Reusable: Color Picker ───────────────────────────────────────────────────
const ColorPicker = ({ value, onChange }: { value: string; onChange: (c: string) => void }) => (
  <div>
    <p className="text-xs font-semibold text-gray-500 mb-2">Standard (no extra charge)</p>
    <div className="flex flex-wrap gap-2 mb-3">
      {STANDARD_COLORS.map(c => (
        <button key={c} type="button" onClick={() => onChange(c)}
          className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${value === c ? 'border-brand-primary bg-brand-primary/10 text-brand-primary' : 'border-gray-200 hover:border-gray-300'}`}>{c}</button>
      ))}
    </div>
    <p className="text-xs font-semibold text-gray-500 mb-2">Premium (+${PREMIUM_SURCHARGE})</p>
    <div className="flex flex-wrap gap-2">
      {PREMIUM_COLORS.map(c => (
        <button key={c} type="button" onClick={() => onChange(c)}
          className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${value === c ? 'border-brand-primary bg-brand-primary/10 text-brand-primary' : 'border-gray-200 hover:border-gray-300'}`}>{c}</button>
      ))}
    </div>
  </div>
);

// ─── Reusable: Delivery Picker ────────────────────────────────────────────────
const DeliveryPicker = ({ value, address, onDelivery, onAddress }: { value: string; address: string; onDelivery: (v: string) => void; onAddress: (v: string) => void }) => (
  <div>
    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 block">Delivery Preference</label>
    <div className="flex flex-col gap-2 mb-3">
      {[
        { label: 'Pickup (Free, Plainsboro NJ)', value: 'Pickup' },
        { label: 'Local Dropoff (small fee)', value: 'Dropoff' },
      ].map(d => (
        <button key={d.value} type="button" onClick={() => onDelivery(d.value)}
          className={`text-left px-4 py-3 rounded-xl border-2 text-sm font-bold transition-all ${value === d.value ? 'border-brand-primary bg-brand-primary/10 text-brand-primary' : 'border-gray-200 hover:border-gray-300'}`}>{d.label}</button>
      ))}
      <button disabled className="text-left px-4 py-3 rounded-xl border-2 border-gray-100 text-sm font-bold text-gray-300 cursor-not-allowed">Shipping (not available yet)</button>
    </div>
    {value === 'Dropoff' && (
      <input type="text" value={address} onChange={e => onAddress(e.target.value)}
        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none text-sm"
        placeholder="Your address (we will confirm if in range)" />
    )}
  </div>
);

// ─── Reusable: File Upload ────────────────────────────────────────────────────
const FileUpload = ({ files, uploading, onUpload, label }: { files: {name:string,url:string}[]; uploading: boolean; onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void; label: string }) => (
  <div>
    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">{label}</label>
    <div className="relative group">
      <input type="file" multiple onChange={onUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
      <div className="border-2 border-dashed border-gray-200 group-hover:border-brand-primary rounded-2xl p-6 text-center transition-colors">
        <Upload className="w-7 h-7 text-gray-300 group-hover:text-brand-primary mx-auto mb-2" />
        <div className="text-sm font-bold text-gray-500">
          {uploading ? 'Uploading...' : files.length > 0 ? `${files.length} file(s) uploaded` : 'Drag and drop or click to upload'}
        </div>
        <div className="text-xs text-gray-400 mt-1">JPG, PNG, STL — Max 10MB</div>
      </div>
    </div>
    {files.length > 0 && (
      <div className="flex flex-wrap gap-2 mt-2">
        {files.map((f, i) => (
          <a key={i} href={f.url} target="_blank" rel="noopener noreferrer" className="bg-gray-100 px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-2 hover:bg-gray-200">
            <Paperclip className="w-3 h-3" /> {f.name}
          </a>
        ))}
      </div>
    )}
  </div>
);

// ─── Contact / Order Form ─────────────────────────────────────────────────────
type OrderCategory = 'lithophane' | 'custom' | 'products' | null;

const LITHO_STYLES = [
  { id: 'flat',   name: 'Flat Panel',   tag: 'Most Popular', desc: 'Classic lithophane on a warm LED base.',           price: LITHOPHANE_PRICES['Flat Panel'],   detail: 'Warm LED base included', icon: <ImageIcon className="w-6 h-6" /> },
  { id: 'night',  name: 'Night Light',  tag: 'Smart Light',  desc: 'Auto on/off sensor. Turns on when it gets dark.',  price: LITHOPHANE_PRICES['Night Light'],  detail: 'Auto on/off sensor',     icon: <Lightbulb className="w-6 h-6" /> },
  { id: 'heart',  name: 'Heart Shape',  tag: 'Best Gift',    desc: 'Heart-shaped panel. Stand-alone or hangable.',      price: LITHOPHANE_PRICES['Heart Shape'],  detail: 'Stand-alone piece',      icon: <Heart className="w-6 h-6" /> },
  { id: 'custom', name: 'Custom Shape', tag: 'Unique',       desc: 'Name, logo, silhouette, or any shape.',             price: LITHOPHANE_PRICES['Custom Shape'], detail: 'LED base included',      icon: <Sparkles className="w-6 h-6" /> },
];

const useUploadcare = () => {
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; url: string }[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setUploading(true);
    const uploaded: { name: string; url: string }[] = [];
    for (const file of files) {
      const data = new FormData();
      data.append('UPLOADCARE_PUB_KEY', 'bc495550492636fc4db6');
      data.append('UPLOADCARE_STORE', '1');
      data.append('file', file);
      try {
        const res = await fetch('https://upload.uploadcare.com/base/', { method: 'POST', body: data });
        const json = await res.json();
        if (json.file) uploaded.push({ name: file.name, url: `https://rk9fjvy09i.ucarecd.net/${json.file}/` });
      } catch {}
    }
    setUploadedFiles(prev => [...prev, ...uploaded]);
    setUploading(false);
  };

  return { uploadedFiles, uploading, handleUpload };
};

const submitOrder = async (subject: string, payload: object, fileLinks: string) => {
  const body = { ...payload, access_key: '28aa3f21-d905-4e73-95bb-686ad236eb55', subject, 'Attached Files': fileLinks };
  const emailRes = await fetch('https://api.web3forms.com/submit', {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(body)
  });
  await fetch('https://script.google.com/macros/s/AKfycbx4VDX9kxQYqkGRg5cLoTvrt6R3To4QMG4U6qXAzevWAfm93Oqd-CQwUrfwboNy-_n9LA/exec', {
    method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
  });
  return emailRes.ok;
};

const Contact = () => {
  const [category, setCategory] = useState<OrderCategory>(null);
  const [step, setStep] = useState(1);

  // Lithophane
  const [lithoStyleId, setLithoStyleId] = useState('');

  // Shared
  const [delivery, setDelivery] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { uploadedFiles, uploading, handleUpload } = useUploadcare();

  // Custom print
  const [customColor, setCustomColor] = useState('');

  // Products
  const [productOrders, setProductOrders] = useState<Record<number, { color: string; qty: number }>>({});
  const [customPrintRequest, setCustomPrintRequest] = useState('');

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const reset = () => {
    setCategory(null); setStep(1); setLithoStyleId('');
    setDelivery(''); setAddress(''); setNotes('');
    setName(''); setEmail('');
    setCustomColor(''); setProductOrders({}); setCustomPrintRequest('');
    setStatus('idle');
  };

  const setProductOrder = (id: number, updates: Partial<{ color: string; qty: number }>) => {
    setProductOrders(prev => {
      const current = prev[id] || { color: '', qty: 0 };
      return { ...prev, [id]: { ...current, ...updates } };
    });
  };

  const selectedStyle = LITHO_STYLES.find(s => s.id === lithoStyleId);
  const isPremiumColor = PREMIUM_COLORS.includes(customColor);
  const fileLinks = uploadedFiles.length > 0 ? uploadedFiles.map(f => `${f.name}: ${f.url}`).join('\n') : 'No files uploaded';

  const lithoPrice = selectedStyle ? (SALE_ACTIVE ? selectedStyle.price.sale : selectedStyle.price.original) : 0;

  const productTotal = PRODUCTS.reduce((sum, p) => {
    if (p.isCustom) return sum;
    const o = productOrders[p.id];
    if (!o || !o.qty) return sum;
    const base = SALE_ACTIVE && p.salePrice ? p.salePrice : p.basePrice;
    const premium = PREMIUM_COLORS.includes(o.color) ? PREMIUM_SURCHARGE : 0;
    return sum + (base + premium) * o.qty;
  }, 0);

  const hasProductItems = Object.values(productOrders).some(o => o.qty > 0 && o.color) || customPrintRequest.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    let subject = '';
    let messageBody = '';

    if (category === 'lithophane') {
      subject = `New Order: Lithophane ${selectedStyle?.name ?? ''}`;
      messageBody = `Style: ${selectedStyle?.name}\nDelivery: ${delivery}${address ? ` | Address: ${address}` : ''}\nNotes: ${notes || 'None'}`;
    } else if (category === 'custom') {
      subject = 'New Order: Custom 3D Print';
      messageBody = `Color: ${customColor}\nDelivery: ${delivery}${address ? ` | Address: ${address}` : ''}\nNotes: ${notes || 'None'}`;
    } else if (category === 'products') {
      subject = 'New Order: Popular Products';
      const lines = PRODUCTS
        .filter(p => !p.isCustom && productOrders[p.id]?.qty > 0)
        .map(p => `${p.name} x${productOrders[p.id].qty} (${productOrders[p.id].color})`);
      if (customPrintRequest) lines.push(`Custom Print Request: ${customPrintRequest}`);
      messageBody = `Items:\n${lines.join('\n')}\n\nDelivery: ${delivery}${address ? ` | Address: ${address}` : ''}\nNotes: ${notes || 'None'}`;
    }

    const payload = { name, email, projectType: subject, message: messageBody, files: fileLinks, date: new Date().toLocaleString() };

    try {
      const ok = await submitOrder(subject, payload, fileLinks);
      setStatus(ok ? 'success' : 'error');
    } catch { setStatus('error'); }
  };

  const stepLabels: Record<string, string[]> = {
    lithophane: ['Pick Style', 'Photo and Details', 'Your Info', 'Review'],
    custom:     ['Details', 'Your Info', 'Review'],
    products:   ['Choose Items', 'Delivery and Notes', 'Your Info', 'Review'],
  };
  const labels = category ? stepLabels[category] : [];

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-brand-dark rounded-[3rem] p-8 lg:p-20 text-white relative overflow-hidden">
          <div className="relative z-10 grid lg:grid-cols-5 gap-16">

            <div className="lg:col-span-2">
              <h2 className="text-5xl font-bold mb-4 leading-tight">Place Your <br /><span className="text-brand-primary">Order</span></h2>
              <p className="text-gray-400 mb-6 leading-relaxed text-sm">Lithophane night lights, custom prints, or popular products. Fill out the form and we will get back to you within 12 hours.</p>
              <div className="flex items-center gap-2 text-brand-primary text-sm font-bold mb-4">
                <MapPin className="w-4 h-4" /> Based in Plainsboro, NJ
              </div>
              {SALE_ACTIVE && (
                <div className="bg-brand-primary/10 border border-brand-primary/30 rounded-xl px-4 py-3 mb-8">
                  <p className="text-brand-primary text-xs font-bold"><Tag className="w-3 h-3 inline mr-1" />Launch sale pricing applied automatically</p>
                </div>
              )}
              {category && (
                <div className="hidden lg:block space-y-6">
                  {labels.map((label, i) => (
                    <div key={i} className={`flex items-center gap-4 transition-opacity ${step >= i + 1 ? 'opacity-100' : 'opacity-30'}`}>
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold border-2 text-sm ${step >= i + 1 ? 'bg-brand-primary border-brand-primary text-brand-dark' : 'border-white/20'}`}>{i + 1}</div>
                      <div className="text-sm font-bold uppercase tracking-widest">{label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-3 bg-white rounded-[2.5rem] p-8 lg:p-12 text-brand-dark">
              {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6"><CheckCircle className="w-10 h-10" /></div>
                  <h3 className="text-2xl font-bold mb-3">Order Received!</h3>
                  <p className="text-gray-500 mb-8 leading-relaxed">You will receive an email within 12 hours with your order update and payment instructions.</p>
                  <button onClick={reset} className="bg-brand-dark text-white px-8 py-4 rounded-2xl font-bold hover:bg-brand-primary transition-colors">Place Another Order</button>
                </div>
              ) : !category ? (

                /* Category Picker */
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                  <h3 className="text-2xl font-bold">What would you like?</h3>
                  <p className="text-gray-500 text-sm">Pick a category to get started.</p>
                  <div className="space-y-3">
                    {[
                      { id: 'lithophane' as OrderCategory, icon: <Camera className="w-7 h-7" />,      title: 'Lithophane Night Lights', desc: 'Turn your photos into glowing art. Flat panels, night lights, heart shapes, and custom shapes.', badge: 'Our Specialty' },
                      { id: 'custom'     as OrderCategory, icon: <FileText className="w-7 h-7" />,     title: 'Custom 3D Print',         desc: 'Send us your STL file and we will print it in any color. Quote on request.',                 badge: null },
                      { id: 'products'   as OrderCategory, icon: <ShoppingBag className="w-7 h-7" />,  title: 'Popular Products',        desc: 'Flexi octopuses, phone stands, whistles, keychains, and more.',                           badge: 'Sale pricing' },
                    ].map(cat => (
                      <button key={cat.id} onClick={() => { setCategory(cat.id); setStep(1); }}
                        className="w-full text-left p-5 rounded-3xl border-2 border-gray-100 hover:border-brand-primary hover:bg-brand-primary/5 transition-all group flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-gray-100 group-hover:bg-brand-primary/20 flex items-center justify-center transition-colors shrink-0 text-brand-dark">{cat.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-bold">{cat.title}</span>
                            {cat.badge && <span className="text-[10px] font-bold bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded-full">{cat.badge}</span>}
                          </div>
                          <p className="text-xs text-gray-500">{cat.desc}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-brand-primary transition-colors shrink-0" />
                      </button>
                    ))}
                  </div>
                </motion.div>

              ) : category === 'lithophane' ? (
                <div>
                  {/* Litho Step 1: Style */}
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                      <div className="flex items-center gap-3 mb-2">
                        <button onClick={() => setCategory(null)} className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50"><ChevronLeft className="w-4 h-4" /></button>
                        <h3 className="text-2xl font-bold">Pick Your Style</h3>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {LITHO_STYLES.map(style => (
                          <button key={style.id} onClick={() => { setLithoStyleId(style.id); setStep(2); }}
                            className="text-left p-5 rounded-3xl border-2 border-gray-100 hover:border-brand-primary hover:bg-brand-primary/5 transition-all group">
                            <div className="w-10 h-10 rounded-2xl bg-gray-100 group-hover:bg-brand-primary/20 flex items-center justify-center mb-3 transition-colors">{style.icon}</div>
                            <div className="font-bold mb-0.5">{style.name}</div>
                            <div className="text-xs text-gray-500 mb-2">{style.desc}</div>
                            <div className="flex items-center gap-2">
                              <span className="text-brand-primary font-bold text-sm">${SALE_ACTIVE ? style.price.sale : style.price.original}</span>
                              {SALE_ACTIVE && <span className="text-gray-400 text-xs line-through">${style.price.original}</span>}
                              <span className="text-[10px] bg-gray-100 text-gray-500 font-bold px-2 py-0.5 rounded-full ml-auto">{style.tag}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Litho Step 2: Photo and Delivery */}
                  {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold">Photo and Details</h3>
                        <span className="text-sm font-bold text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-full">{selectedStyle?.name}</span>
                      </div>
                      <FileUpload files={uploadedFiles} uploading={uploading} onUpload={handleUpload} label="Upload Your Photo" />
                      <DeliveryPicker value={delivery} address={address} onDelivery={setDelivery} onAddress={setAddress} />
                      <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Notes or requests</label>
                        <textarea rows={2} value={notes} onChange={e => setNotes(e.target.value)}
                          className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none resize-none text-sm"
                          placeholder="e.g. crop to face only, warm LED preferred..." />
                      </div>
                      <div className="flex gap-4 pt-2">
                        <button onClick={() => setStep(1)} className="flex-1 px-6 py-4 rounded-2xl font-bold border-2 border-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"><ChevronLeft className="w-5 h-5" /> Back</button>
                        <button onClick={() => setStep(3)} disabled={!delivery || uploading}
                          className="flex-[2] bg-brand-dark text-white px-6 py-4 rounded-2xl font-bold hover:bg-brand-primary transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                          Next <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Litho Step 3: Contact Info */}
                  {step === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                      <h3 className="text-2xl font-bold">Your Details</h3>
                      <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Your Name</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none" placeholder="John Doe" />
                      </div>
                      <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Email Address</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none" placeholder="john@example.com" />
                      </div>
                      <div className="flex gap-4 pt-2">
                        <button onClick={() => setStep(2)} className="flex-1 px-6 py-4 rounded-2xl font-bold border-2 border-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"><ChevronLeft className="w-5 h-5" /> Back</button>
                        <button onClick={() => setStep(4)} disabled={!name || !email}
                          className="flex-[2] bg-brand-dark text-white px-6 py-4 rounded-2xl font-bold hover:bg-brand-primary transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                          Review Order <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Litho Step 4: Review */}
                  {step === 4 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                      <h3 className="text-2xl font-bold">Review Your Order</h3>
                      <div className="bg-brand-light rounded-2xl p-6 space-y-4">
                        {[
                          { label: 'Name', value: name },
                          { label: 'Email', value: email },
                          { label: 'Style', value: selectedStyle?.name ?? '' },
                          { label: 'Delivery', value: delivery + (address ? ` (${address})` : '') },
                          ...(uploadedFiles.length > 0 ? [{ label: 'Files', value: `${uploadedFiles.length} uploaded` }] : []),
                          ...(notes ? [{ label: 'Notes', value: notes }] : []),
                        ].map((row, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span className="text-gray-500 font-medium">{row.label}</span>
                            <span className="font-bold text-right max-w-[60%]">{row.value}</span>
                          </div>
                        ))}
                        <div className="border-t border-gray-300 pt-4 flex justify-between items-center">
                          <span className="font-bold">Estimated Total</span>
                          <span className="font-black text-brand-primary text-xl">From ${lithoPrice.toFixed(2)}</span>
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

              ) : category === 'custom' ? (
                <div>
                  {/* Custom Step 1: Details */}
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                      <div className="flex items-center gap-3 mb-2">
                        <button onClick={() => setCategory(null)} className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50"><ChevronLeft className="w-4 h-4" /></button>
                        <h3 className="text-2xl font-bold">Custom Print Details</h3>
                      </div>
                      <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 block">Choose Color</label>
                        <ColorPicker value={customColor} onChange={setCustomColor} />
                      </div>
                      <FileUpload files={uploadedFiles} uploading={uploading} onUpload={handleUpload} label="Upload Your STL File" />
                      <DeliveryPicker value={delivery} address={address} onDelivery={setDelivery} onAddress={setAddress} />
                      <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Describe your print</label>
                        <textarea rows={3} value={notes} onChange={e => setNotes(e.target.value)}
                          className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none resize-none text-sm"
                          placeholder="Describe what you want printed, dimensions, material, or any other details..." />
                      </div>
                      <button onClick={() => setStep(2)} disabled={!customColor || !delivery}
                        className="w-full bg-brand-dark text-white py-4 rounded-2xl font-bold hover:bg-brand-primary transition-colors disabled:opacity-50">
                        Next <ChevronRight className="w-4 h-4 inline ml-1" />
                      </button>
                    </motion.div>
                  )}

                  {/* Custom Step 2: Info */}
                  {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                      <h3 className="text-2xl font-bold">Your Details</h3>
                      <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Your Name</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none" placeholder="John Doe" />
                      </div>
                      <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Email Address</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none" placeholder="john@example.com" />
                      </div>
                      <div className="flex gap-4 pt-2">
                        <button onClick={() => setStep(1)} className="flex-1 px-6 py-4 rounded-2xl font-bold border-2 border-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"><ChevronLeft className="w-5 h-5" /> Back</button>
                        <button onClick={() => setStep(3)} disabled={!name || !email}
                          className="flex-[2] bg-brand-dark text-white px-6 py-4 rounded-2xl font-bold hover:bg-brand-primary transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                          Review <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Custom Step 3: Review */}
                  {step === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                      <h3 className="text-2xl font-bold">Review Your Order</h3>
                      <div className="bg-brand-light rounded-2xl p-6 space-y-4">
                        {[
                          { label: 'Name', value: name },
                          { label: 'Email', value: email },
                          { label: 'Color', value: customColor + (PREMIUM_COLORS.includes(customColor) ? ` (+$${PREMIUM_SURCHARGE})` : '') },
                          { label: 'Delivery', value: delivery + (address ? ` (${address})` : '') },
                          ...(uploadedFiles.length > 0 ? [{ label: 'Files', value: `${uploadedFiles.length} uploaded` }] : []),
                          ...(notes ? [{ label: 'Description', value: notes }] : []),
                        ].map((row, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span className="text-gray-500 font-medium">{row.label}</span>
                            <span className="font-bold text-right max-w-[60%]">{row.value}</span>
                          </div>
                        ))}
                        <div className="border-t border-gray-300 pt-4 flex justify-between items-center">
                          <span className="font-bold">Price</span>
                          <span className="font-black text-brand-primary text-xl">Quote on request</span>
                        </div>
                        <p className="text-[10px] text-gray-400">We will email you a quote within 12 hours.</p>
                      </div>
                      <div className="flex gap-4">
                        <button onClick={() => setStep(2)} className="flex-1 px-6 py-4 rounded-2xl font-bold border-2 border-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"><ChevronLeft className="w-5 h-5" /> Back</button>
                        <button onClick={handleSubmit} disabled={status === 'submitting'}
                          className="flex-[2] bg-brand-dark text-white px-6 py-4 rounded-2xl font-bold hover:bg-brand-primary transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                          {status === 'submitting' ? 'Sending...' : 'Submit Request'}
                        </button>
                      </div>
                      {status === 'error' && <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>}
                    </motion.div>
                  )}
                </div>

              ) : category === 'products' ? (
                <div>
                  {/* Products Step 1: Choose Items */}
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                      <div className="flex items-center gap-3 mb-2">
                        <button onClick={() => setCategory(null)} className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50"><ChevronLeft className="w-4 h-4" /></button>
                        <h3 className="text-2xl font-bold">Choose Your Items</h3>
                      </div>
                      <p className="text-gray-500 text-sm">Add as many items as you want. Pick a color and quantity for each.</p>

                      <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
                        {PRODUCTS.filter(p => !p.isCustom).map(p => {
                          const order = productOrders[p.id] || { color: '', qty: 0 };
                          const base = SALE_ACTIVE && p.salePrice ? p.salePrice : p.basePrice;
                          const premium = PREMIUM_COLORS.includes(order.color) ? PREMIUM_SURCHARGE : 0;
                          const unitPrice = base + premium;
                          return (
                            <div key={p.id} className="border-2 border-gray-100 rounded-2xl p-5 hover:border-gray-200 transition-colors">
                              <div className="flex items-start gap-4 mb-4">
                                <img src={p.images[0]} alt={p.name} className="w-14 h-14 rounded-xl object-cover bg-gray-50 shrink-0" />
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <p className="font-bold text-sm">{p.name}</p>
                                    <div className="flex items-center gap-1">
                                      {SALE_ACTIVE && p.salePrice && (
                                        <>
                                          <span className="font-black text-brand-primary text-sm">${p.salePrice}</span>
                                          <span className="text-xs text-gray-400 line-through">${p.basePrice}</span>
                                        </>
                                      )}
                                      {(!SALE_ACTIVE || !p.salePrice) && <span className="font-black text-sm">${p.basePrice}</span>}
                                    </div>
                                  </div>
                                  <p className="text-xs text-gray-500 mt-0.5">{p.description}</p>
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-1.5 mb-3">
                                {[...STANDARD_COLORS, ...PREMIUM_COLORS].map(c => (
                                  <button key={c} onClick={() => setProductOrder(p.id, { color: c, qty: order.qty || 1 })}
                                    className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${order.color === c ? 'border-brand-primary bg-brand-primary/10 text-brand-primary' : 'border-gray-200 hover:border-gray-300'}`}>
                                    {c}{PREMIUM_COLORS.includes(c) ? '*' : ''}
                                  </button>
                                ))}
                              </div>
                              <p className="text-[10px] text-gray-400 mb-3">* Premium color +${PREMIUM_SURCHARGE}</p>

                              {order.color && (
                                <div className="flex items-center gap-3">
                                  <button onClick={() => setProductOrder(p.id, { qty: Math.max(0, order.qty - 1) })} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:border-brand-primary transition-colors">
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="font-bold text-sm w-6 text-center">{order.qty}</span>
                                  <button onClick={() => setProductOrder(p.id, { qty: order.qty + 1 })} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:border-brand-primary transition-colors">
                                    <Plus className="w-3 h-3" />
                                  </button>
                                  {order.qty > 0 && (
                                    <span className="ml-auto text-brand-primary font-bold text-sm">${(unitPrice * order.qty).toFixed(2)}</span>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}

                        {/* Custom print request */}
                        <div className="border-2 border-gray-100 rounded-2xl p-5">
                          <p className="font-bold text-sm mb-1">Custom Print (STL file)</p>
                          <p className="text-xs text-gray-500 mb-3">Describe what you want or upload your file in the next step.</p>
                          <textarea rows={2} value={customPrintRequest} onChange={e => setCustomPrintRequest(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none resize-none text-sm"
                            placeholder="e.g. print my STL file in black, 15% infill..." />
                        </div>
                      </div>

                      {productTotal > 0 && (
                        <div className="bg-brand-light rounded-xl px-4 py-3 flex justify-between text-sm">
                          <span className="text-gray-500 font-medium">Subtotal so far</span>
                          <span className="font-black text-brand-primary">${productTotal.toFixed(2)}</span>
                        </div>
                      )}

                      <button onClick={() => setStep(2)} disabled={!hasProductItems}
                        className="w-full bg-brand-dark text-white py-4 rounded-2xl font-bold hover:bg-brand-primary transition-colors disabled:opacity-50">
                        Continue <ChevronRight className="w-4 h-4 inline ml-1" />
                      </button>
                    </motion.div>
                  )}

                  {/* Products Step 2: Delivery and Notes */}
                  {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                      <h3 className="text-2xl font-bold">Delivery and Notes</h3>
                      <DeliveryPicker value={delivery} address={address} onDelivery={setDelivery} onAddress={setAddress} />
                      {customPrintRequest && (
                        <FileUpload files={uploadedFiles} uploading={uploading} onUpload={handleUpload} label="Upload STL File (optional)" />
                      )}
                      <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Additional notes</label>
                        <textarea rows={2} value={notes} onChange={e => setNotes(e.target.value)}
                          className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none resize-none text-sm"
                          placeholder="Any special requests or notes..." />
                      </div>
                      <div className="flex gap-4 pt-2">
                        <button onClick={() => setStep(1)} className="flex-1 px-6 py-4 rounded-2xl font-bold border-2 border-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"><ChevronLeft className="w-5 h-5" /> Back</button>
                        <button onClick={() => setStep(3)} disabled={!delivery}
                          className="flex-[2] bg-brand-dark text-white px-6 py-4 rounded-2xl font-bold hover:bg-brand-primary transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                          Next <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Products Step 3: Info */}
                  {step === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                      <h3 className="text-2xl font-bold">Your Details</h3>
                      <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Your Name</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none" placeholder="John Doe" />
                      </div>
                      <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Email Address</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none" placeholder="john@example.com" />
                      </div>
                      <div className="flex gap-4 pt-2">
                        <button onClick={() => setStep(2)} className="flex-1 px-6 py-4 rounded-2xl font-bold border-2 border-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"><ChevronLeft className="w-5 h-5" /> Back</button>
                        <button onClick={() => setStep(4)} disabled={!name || !email}
                          className="flex-[2] bg-brand-dark text-white px-6 py-4 rounded-2xl font-bold hover:bg-brand-primary transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                          Review <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Products Step 4: Review */}
                  {step === 4 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                      <h3 className="text-2xl font-bold">Review Your Order</h3>
                      <div className="bg-brand-light rounded-2xl p-6 space-y-4">
                        <div className="flex justify-between text-sm"><span className="text-gray-500 font-medium">Name</span><span className="font-bold">{name}</span></div>
                        <div className="flex justify-between text-sm"><span className="text-gray-500 font-medium">Email</span><span className="font-bold">{email}</span></div>
                        <div className="flex justify-between text-sm"><span className="text-gray-500 font-medium">Delivery</span><span className="font-bold">{delivery}{address ? ` (${address})` : ''}</span></div>

                        {PRODUCTS.filter(p => !p.isCustom && productOrders[p.id]?.qty > 0).map(p => {
                          const o = productOrders[p.id];
                          const base = SALE_ACTIVE && p.salePrice ? p.salePrice : p.basePrice;
                          const premium = PREMIUM_COLORS.includes(o.color) ? PREMIUM_SURCHARGE : 0;
                          return (
                            <div key={p.id} className="flex justify-between text-sm">
                              <span className="text-gray-500">{p.name} x{o.qty} ({o.color})</span>
                              <span className="font-bold">${((base + premium) * o.qty).toFixed(2)}</span>
                            </div>
                          );
                        })}

                        {customPrintRequest && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Custom Print</span>
                            <span className="font-bold">Quote on request</span>
                          </div>
                        )}

                        {productTotal > 0 && (
                          <div className="border-t border-gray-300 pt-4 flex justify-between items-center">
                            <span className="font-bold">Estimated Total</span>
                            <span className="font-black text-brand-primary text-xl">${productTotal.toFixed(2)}</span>
                          </div>
                        )}
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
              ) : null}
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
      2025 D3V Prints, Plainsboro NJ. All rights reserved.
    </div>
    <div className="max-w-7xl mx-auto text-center mt-3">
      <p className="text-[9px] text-gray-200 leading-relaxed max-w-3xl mx-auto">
        Some third-party designs available for purchase are licensed under Creative Commons Attribution 4.0 International (CC BY 4.0). Original designers retain copyright. D3V Prints provides physical printing services only. Credits available upon request.
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
    <CartProvider>
      <div className="min-h-screen selection:bg-brand-primary selection:text-white">
        <Navbar />
        <CartDrawer />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </CartProvider>
  );
}
