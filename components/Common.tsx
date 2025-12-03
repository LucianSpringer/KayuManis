import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu as MenuIcon, X, User, MessageCircle, Send, Star, MapPin, Phone, Mail, Instagram, Facebook, Tag, Check, AlertCircle, Eye, Heart, Zap } from 'lucide-react';
import { Product, CartItem, Review } from '../types';
import { getBakerResponse } from '../services/geminiService';

// --- Contexts ---
export const CartContext = React.createContext<{
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, delta: number) => void;
    toggleCart: () => void;
    isCartOpen: boolean;
    total: number; // Subtotal
    clearCart: () => void;
    // Promo Code Logic
    promoCode: string | null;
    discountAmount: number;
    applyPromo: (code: string) => { success: boolean; message: string };
    removePromo: () => void;
    // Loyalty & Reviews
    userPoints: number;
    addPoints: (amount: number) => void;
    reviews: Review[];
    addReview: (review: Review) => void;
    // Wishlist
    wishlist: number[];
    toggleWishlist: (id: number) => void;
}>({} as any);

// --- Components ---

export const Navbar: React.FC = () => {
    const { cart, toggleCart } = React.useContext(CartContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-md transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link to="/" className="text-3xl font-bold text-amber-800 font-serif tracking-tight flex items-center gap-2">
                        <span className="text-4xl">🥨</span> KayuManis
                    </Link>
                    
                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 text-stone-600 font-medium">
                        <Link to="/" className="hover:text-amber-600 transition">Home</Link>
                        <Link to="/menu" className="hover:text-amber-600 transition">Menu</Link>
                        <Link to="/blog" className="hover:text-amber-600 transition">Blog</Link>
                        <Link to="/faq" className="hover:text-amber-600 transition">FAQ</Link>
                        <Link to="/profile" className="hover:text-amber-600 transition">Profile</Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button onClick={toggleCart} className="relative p-2 text-stone-600 hover:text-amber-600 transition">
                            <ShoppingCart className="w-6 h-6" />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        <Link to="/profile" className="p-2 text-stone-600 hover:text-amber-600 hidden md:block">
                            <User className="w-6 h-6" />
                        </Link>
                        
                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-stone-600 hover:text-amber-600">
                                {isMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-stone-100 absolute w-full shadow-lg">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-stone-700 hover:text-amber-600 hover:bg-amber-50 rounded-md">Home</Link>
                        <Link to="/menu" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-stone-700 hover:text-amber-600 hover:bg-amber-50 rounded-md">Menu</Link>
                        <Link to="/blog" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-stone-700 hover:text-amber-600 hover:bg-amber-50 rounded-md">Blog</Link>
                        <Link to="/faq" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-stone-700 hover:text-amber-600 hover:bg-amber-50 rounded-md">FAQ</Link>
                        <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-stone-700 hover:text-amber-600 hover:bg-amber-50 rounded-md">Profile</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export const Footer: React.FC = () => {
    return (
        <footer className="bg-stone-900 text-stone-300 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-2xl font-serif font-bold text-amber-500 mb-4">KayuManis</h3>
                    <p className="mb-4 text-sm text-stone-400">Bringing the warmth of fresh baking to your home every day. Made with love and premium ingredients.</p>
                </div>
                <div>
                    <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/menu" className="hover:text-amber-500 transition">Our Menu</Link></li>
                        <li><Link to="/blog" className="hover:text-amber-500 transition">Blog</Link></li>
                        <li><Link to="/faq" className="hover:text-amber-500 transition">FAQ</Link></li>
                        <li><Link to="/admin" className="hover:text-amber-500 transition">Admin Login</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-bold text-white mb-4">Contact</h4>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-amber-500"/> Jl. Bakery No. 123, Jakarta</li>
                        <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-amber-500"/> +62 812-3456-7890</li>
                        <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-amber-500"/> hello@kayumanis.com</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-bold text-white mb-4">Follow Us</h4>
                    <div className="flex space-x-4">
                        <a href="#" className="p-2 bg-stone-800 rounded-full hover:bg-amber-600 transition"><Instagram className="w-5 h-5"/></a>
                        <a href="#" className="p-2 bg-stone-800 rounded-full hover:bg-amber-600 transition"><Facebook className="w-5 h-5"/></a>
                    </div>
                    <div className="mt-6">
                         <button className="w-full bg-amber-600 text-white py-2 px-4 rounded hover:bg-amber-700 transition text-sm font-bold">Subscribe Newsletter</button>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-stone-800 text-center text-xs text-stone-500">
                © {new Date().getFullYear()} KayuManis Bakery. All rights reserved.
            </div>
        </footer>
    );
};

export const NewsletterPopup: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            const hasSeen = sessionStorage.getItem('seenNewsletter');
            if (!hasSeen) {
                setIsOpen(true);
            }
        }, 5000); // Show after 5 seconds
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem('seenNewsletter', 'true');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center px-4 animate-fade-in">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose}></div>
            <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
                <button onClick={handleClose} className="absolute top-2 right-2 p-2 text-stone-400 hover:text-stone-600 z-10">
                    <X className="w-5 h-5" />
                </button>
                <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                        📧
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">Join Our Newsletter</h3>
                    <p className="text-stone-600 text-sm mb-6">Get 10% off your first order and receive sweet updates, recipes, and exclusive offers!</p>
                    <div className="flex flex-col gap-3">
                        <input type="email" placeholder="Enter your email" className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" />
                        <button onClick={handleClose} className="w-full bg-amber-600 text-white py-2 rounded-lg font-bold hover:bg-amber-700 transition">
                            Subscribe Now
                        </button>
                    </div>
                    <p className="text-xs text-stone-400 mt-4">We respect your privacy. Unsubscribe at any time.</p>
                </div>
            </div>
        </div>
    );
};

export const QuickViewModal: React.FC<{ product: Product; onClose: () => void }> = ({ product, onClose }) => {
    const { addToCart } = React.useContext(CartContext);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row animate-fade-in-up max-h-[90vh] md:h-auto">
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 p-2 bg-white/80 rounded-full text-stone-500 hover:text-red-500 z-10 transition shadow-sm"
                >
                    <X className="w-6 h-6" />
                </button>
                
                <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        loading="lazy"
                        className="w-full h-full object-cover"
                    />
                </div>
                
                <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
                    <div className="mb-auto">
                        <div className="text-xs text-amber-600 font-bold mb-2 uppercase tracking-wide">{product.category}</div>
                        <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">{product.name}</h2>
                        
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-2xl font-bold text-stone-900">Rp {product.price.toLocaleString('id-ID')}</span>
                            <div className="flex items-center gap-1 text-amber-500 text-sm">
                                <Star className="fill-current w-4 h-4" />
                                <span className="text-stone-700 font-medium">{product.rating} ({product.reviews} reviews)</span>
                            </div>
                        </div>

                        <p className="text-stone-600 mb-6 leading-relaxed">{product.description}</p>
                        
                        <div className="mb-8">
                            <h4 className="font-bold text-stone-900 mb-2 text-sm">Ingredients</h4>
                            <div className="flex flex-wrap gap-2">
                                {product.ingredients.map((ing, i) => (
                                    <span key={i} className="px-3 py-1 bg-stone-100 text-stone-600 rounded-full text-xs font-medium border border-stone-200">{ing}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={() => {
                            addToCart(product);
                            onClose();
                        }}
                        className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-amber-600 transition flex items-center justify-center gap-2 group"
                    >
                        <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const { addToCart, wishlist, toggleWishlist } = React.useContext(CartContext);
    const navigate = useNavigate();
    const [showQuickView, setShowQuickView] = useState(false);
    const isWishlisted = wishlist.includes(product.id);

    return (
        <>
            <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-stone-100 flex flex-col h-full relative">
                <div className="relative aspect-square overflow-hidden cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        loading="lazy"
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.isBestSeller && (
                        <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                            Best Seller
                        </span>
                    )}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product.id);
                        }}
                        className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-all z-10 transform active:scale-90 ${isWishlisted ? 'bg-white text-red-500' : 'bg-white/80 text-stone-400 hover:text-red-500'}`}
                        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    >
                        <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                    <div className="text-xs text-amber-600 font-bold mb-1 uppercase tracking-wide">{product.category}</div>
                    <h3 
                        className="text-lg font-bold text-stone-800 mb-2 cursor-pointer hover:text-amber-700 transition"
                        onClick={() => navigate(`/product/${product.id}`)}
                    >
                        {product.name}
                    </h3>
                    <p className="text-stone-500 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
                    <div className="flex items-center justify-between mt-auto pt-4 gap-2">
                        <span className="text-lg font-bold text-stone-900 truncate flex-1">
                            Rp {product.price.toLocaleString('id-ID')}
                        </span>
                        
                        <div className="flex items-center gap-2 shrink-0">
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowQuickView(true);
                                }}
                                className="p-2 text-stone-400 hover:text-amber-600 hover:bg-amber-50 rounded-full transition focus:outline-none"
                                title="Quick View"
                                aria-label={`Quick view ${product.name}`}
                            >
                                <Eye className="w-5 h-5" />
                            </button>

                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addToCart(product);
                                }}
                                className="p-2 text-amber-500 hover:text-white hover:bg-amber-500 rounded-full transition focus:outline-none bg-amber-50"
                                title="Quick Order"
                                aria-label={`Quick order ${product.name}`}
                            >
                                <Zap className="w-5 h-5 fill-current" />
                            </button>

                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addToCart(product);
                                }}
                                className="flex items-center gap-2 bg-stone-900 text-white px-4 py-2 rounded-full hover:bg-amber-600 transition shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-1"
                                aria-label={`Add ${product.name} to cart`}
                            >
                                <ShoppingCart className="w-4 h-4" />
                                <span className="text-sm font-bold hidden sm:inline">Add</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick View Modal */}
            {showQuickView && (
                <QuickViewModal product={product} onClose={() => setShowQuickView(false)} />
            )}
        </>
    );
};

export const CartSidebar: React.FC = () => {
    const { 
        isCartOpen, toggleCart, cart, updateQuantity, removeFromCart, 
        total, promoCode, discountAmount, applyPromo, removePromo 
    } = React.useContext(CartContext);
    const navigate = useNavigate();
    const [inputCode, setInputCode] = useState("");
    const [promoStatus, setPromoStatus] = useState<{msg: string, type: 'success' | 'error' | null}>({ msg: '', type: null });

    const handleApplyPromo = () => {
        if (!inputCode) return;
        const result = applyPromo(inputCode);
        if (result.success) {
            setPromoStatus({ msg: result.message, type: 'success' });
            setInputCode("");
        } else {
            setPromoStatus({ msg: result.message, type: 'error' });
        }
    };

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] overflow-hidden">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={toggleCart}></div>
            <div className="absolute inset-y-0 right-0 max-w-md w-full flex">
                <div className="h-full w-full bg-white shadow-2xl flex flex-col animate-slide-in-right">
                    <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center bg-amber-50">
                        <h2 className="text-xl font-bold text-stone-800 font-serif">Your Cart</h2>
                        <button onClick={toggleCart} className="text-stone-500 hover:text-red-500">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {cart.length === 0 ? (
                            <div className="text-center py-20">
                                <ShoppingCart className="w-16 h-16 text-stone-300 mx-auto mb-4" />
                                <p className="text-stone-500">Your cart is empty.</p>
                                <button onClick={toggleCart} className="mt-4 text-amber-600 font-bold hover:underline">Start Shopping</button>
                            </div>
                        ) : (
                            cart.map(item => (
                                <div key={item.id} className="flex gap-4">
                                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                                    <div className="flex-1">
                                        <h3 className="font-bold text-stone-800">{item.name}</h3>
                                        <p className="text-sm text-stone-500">Rp {item.price.toLocaleString('id-ID')}</p>
                                        <div className="flex items-center gap-3 mt-2">
                                            <button 
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="w-6 h-6 rounded-full border border-stone-300 flex items-center justify-center hover:bg-stone-100"
                                            >-</button>
                                            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                            <button 
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="w-6 h-6 rounded-full border border-stone-300 flex items-center justify-center hover:bg-stone-100"
                                            >+</button>
                                        </div>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} className="text-stone-400 hover:text-red-500 self-start">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {cart.length > 0 && (
                        <div className="p-6 border-t border-stone-100 bg-stone-50">
                            {/* Promo Code Section */}
                            <div className="mb-4">
                                {!promoCode ? (
                                    <div className="space-y-2">
                                        <div className="relative">
                                            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4"/>
                                            <input 
                                                type="text" 
                                                value={inputCode}
                                                onChange={(e) => setInputCode(e.target.value)}
                                                placeholder="Promo Code" 
                                                className="w-full pl-9 pr-20 py-2 text-sm rounded-lg border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none"
                                            />
                                            <button 
                                                onClick={handleApplyPromo}
                                                className="absolute right-1 top-1 bottom-1 px-3 bg-stone-900 text-white rounded-md text-xs font-bold hover:bg-amber-600 transition"
                                            >
                                                APPLY
                                            </button>
                                        </div>
                                        {promoStatus.msg && (
                                            <div className={`text-xs flex items-center gap-1 ${promoStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                                                {promoStatus.type === 'success' ? <Check className="w-3 h-3"/> : <AlertCircle className="w-3 h-3"/>}
                                                {promoStatus.msg}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex justify-between items-center bg-green-50 border border-green-200 p-2 rounded-lg text-sm">
                                        <div className="flex items-center gap-2 text-green-700">
                                            <Tag className="w-4 h-4"/>
                                            <span className="font-bold">{promoCode} Applied</span>
                                        </div>
                                        <button onClick={() => { removePromo(); setPromoStatus({msg:'', type:null}); }} className="text-green-700 hover:text-red-600">
                                            <X className="w-4 h-4"/>
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2 mb-4 text-sm">
                                <div className="flex justify-between items-center">
                                    <span className="text-stone-600">Subtotal</span>
                                    <span className="font-medium text-stone-900">Rp {total.toLocaleString('id-ID')}</span>
                                </div>
                                {discountAmount > 0 && (
                                    <div className="flex justify-between items-center text-green-600">
                                        <span>Discount</span>
                                        <span className="font-bold">-Rp {discountAmount.toLocaleString('id-ID')}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center pt-2 border-t border-stone-200">
                                    <span className="font-bold text-lg text-stone-900">Total</span>
                                    <span className="font-bold text-lg text-amber-600">Rp {(total - discountAmount).toLocaleString('id-ID')}</span>
                                </div>
                            </div>

                            <button 
                                onClick={() => {
                                    toggleCart();
                                    navigate('/checkout');
                                }}
                                className="w-full bg-amber-600 text-white py-3 rounded-lg font-bold shadow-lg hover:bg-amber-700 transition"
                            >
                                Checkout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export const BakerAIWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{sender: 'user'|'bot', text: string}[]>([
        {sender: 'bot', text: "Hi! I'm your Baker Assistant. 🥯 Looking for something special today?"}
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;
        const userMsg = input;
        setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
        setInput("");
        setIsLoading(true);

        const reply = await getBakerResponse(userMsg);
        
        setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
        setIsLoading(false);
    };

    return (
        <>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 bg-amber-600 hover:bg-amber-700 text-white p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 flex items-center justify-center"
            >
                {isOpen ? <X className="w-6 h-6"/> : <MessageCircle className="w-6 h-6"/>}
            </button>

            {/* WhatsApp Float */}
            <a 
                href="https://wa.me/1234567890" 
                target="_blank" 
                rel="noreferrer"
                className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-40 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl transition-all transform hover:scale-110"
            >
                <Phone className="w-6 h-6" />
            </a>

            {isOpen && (
                <div className="fixed bottom-24 right-6 md:right-8 z-40 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-stone-100 flex flex-col overflow-hidden max-h-[500px] animate-fade-in-up">
                    <div className="bg-amber-600 p-4 text-white flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-full">
                            <span className="text-xl">👩‍🍳</span>
                        </div>
                        <div>
                            <h3 className="font-bold">Baker Assistant</h3>
                            <p className="text-xs text-amber-100">Ask me for recommendations!</p>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                                    m.sender === 'user' 
                                    ? 'bg-amber-600 text-white rounded-br-none' 
                                    : 'bg-white text-stone-700 shadow-sm border border-stone-100 rounded-bl-none'
                                }`}>
                                    {m.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-stone-100">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce delay-100"></div>
                                        <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce delay-200"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="p-3 bg-white border-t border-stone-100 flex gap-2">
                        <input 
                            type="text" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type a message..."
                            className="flex-1 bg-stone-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                        <button 
                            onClick={handleSend}
                            disabled={isLoading}
                            className="bg-amber-600 text-white p-2 rounded-full hover:bg-amber-700 disabled:opacity-50"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};