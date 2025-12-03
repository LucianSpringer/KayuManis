import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar, Footer, CartSidebar, CartContext, BakerAIWidget, NewsletterPopup } from './components/Common';
import { HomePage, MenuPage, ProductDetailPage, ProfilePage, CheckoutPage, AdminPage, FAQPage, BlogPage } from './pages/MainPages';
import { Product, CartItem, Review } from './types';
import { TESTIMONIALS } from './constants';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

const App: React.FC = () => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    
    // Promo Code State
    const [promoCode, setPromoCode] = useState<string | null>(null);
    const [discountPercentage, setDiscountPercentage] = useState<number>(0);

    // User State for Loyalty Points (Persisted)
    const [userPoints, setUserPoints] = useState<number>(() => {
        const saved = localStorage.getItem('userPoints');
        return saved ? parseInt(saved, 10) : 0;
    });

    // Wishlist State (Persisted)
    const [wishlist, setWishlist] = useState<number[]>(() => {
        const saved = localStorage.getItem('wishlist');
        return saved ? JSON.parse(saved) : [];
    });

    // Reviews State (Persisted in state during session, usually backend)
    const [reviews, setReviews] = useState<Review[]>(TESTIMONIALS);

    const addReview = (review: Review) => {
        setReviews(prev => [review, ...prev]);
    };

    const addPoints = (amount: number) => {
        const newPoints = userPoints + amount;
        setUserPoints(newPoints);
        localStorage.setItem('userPoints', newPoints.toString());
    };

    const toggleWishlist = (id: number) => {
        setWishlist(prev => {
            const newWishlist = prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id];
            localStorage.setItem('wishlist', JSON.stringify(newWishlist));
            return newWishlist;
        });
    };

    // --- Cart Logic ---
    const addToCart = (product: Product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => 
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (id: number) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id: number, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const clearCart = () => {
        setCart([]);
        setPromoCode(null);
        setDiscountPercentage(0);
    };

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const discountAmount = total * discountPercentage;

    // Promo Logic
    const VALID_CODES: {[key: string]: number} = {
        'WELCOME10': 0.1,
        'SWEET20': 0.2,
        'KAYUMANIS': 0.15,
        'FREESHIP': 0.05
    };

    const applyPromo = (code: string) => {
        const normalizedCode = code.toUpperCase().trim();
        if (VALID_CODES[normalizedCode]) {
            setPromoCode(normalizedCode);
            setDiscountPercentage(VALID_CODES[normalizedCode]);
            return { success: true, message: `Code ${normalizedCode} applied! ${(VALID_CODES[normalizedCode] * 100).toFixed(0)}% Off.` };
        }
        return { success: false, message: 'Invalid or expired code.' };
    };

    const removePromo = () => {
        setPromoCode(null);
        setDiscountPercentage(0);
    };

    return (
        <CartContext.Provider value={{ 
            cart, addToCart, removeFromCart, updateQuantity, toggleCart, isCartOpen, 
            total, clearCart,
            promoCode, discountAmount, applyPromo, removePromo,
            userPoints, addPoints, reviews, addReview,
            wishlist, toggleWishlist
        }}>
            <Router>
                <ScrollToTop />
                <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <NewsletterPopup />
                    <CartSidebar />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/menu" element={<MenuPage />} />
                            <Route path="/blog" element={<BlogPage />} />
                            <Route path="/faq" element={<FAQPage />} />
                            <Route path="/product/:id" element={<ProductDetailPage />} />
                            <Route path="/profile" element={<ProfilePage />} />
                            <Route path="/checkout" element={<CheckoutPage />} />
                            <Route path="/admin" element={<AdminPage />} />
                        </Routes>
                    </main>
                    <Footer />
                    <BakerAIWidget />
                </div>
            </Router>
        </CartContext.Provider>
    );
};

export default App;