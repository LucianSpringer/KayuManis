import React, { createContext, useState, useEffect } from 'react';
import { Product, CartItem, Review } from '../../types';
import { TESTIMONIALS } from '../../constants';
import { TransactionLedger } from '../core/commerce/TransactionLedger';
import { InventoryAllocator } from '../core/catalogue/InventoryAllocator';

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, delta: number) => void;
    toggleCart: () => void;
    isCartOpen: boolean;
    total: number;
    clearCart: () => void;
    promoCode: string | null;
    discountAmount: number;
    applyPromo: (code: string) => { success: boolean; message: string };
    removePromo: () => void;
    userPoints: number;
    addPoints: (amount: number) => void;
    reviews: Review[];
    addReview: (review: Review) => void;
    wishlist: number[];
    toggleWishlist: (id: number) => void;
}

export const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [promoCode, setPromoCode] = useState<string | null>(null);
    const [discountPercentage, setDiscountPercentage] = useState<number>(0);

    // Ledger & Inventory Instances
    const ledger = TransactionLedger.getInstance();
    const inventory = InventoryAllocator.getInstance();

    const [userPoints, setUserPoints] = useState<number>(() => {
        const saved = localStorage.getItem('userPoints');
        return saved ? parseInt(saved, 10) : 0;
    });

    const [wishlist, setWishlist] = useState<number[]>(() => {
        const saved = localStorage.getItem('wishlist');
        return saved ? JSON.parse(saved) : [];
    });

    const [reviews, setReviews] = useState<Review[]>(TESTIMONIALS);

    // Sync from Ledger (Event Sourcing Pattern)
    const syncFromLedger = () => {
        const history = ledger.getLedgerHistory();
        const newCart: CartItem[] = [];
        history.forEach(entry => {
            if (entry.type === 'DEBIT') {
                const itemSnapshot = entry.metadata.itemSnapshot as CartItem;
                if (!itemSnapshot) return;
                const existing = newCart.find(i => i.id === itemSnapshot.id);
                if (existing) existing.quantity += itemSnapshot.quantity;
                else newCart.push({ ...itemSnapshot });
            }
        });
        setCart(newCart);
    };

    const addToCart = (product: Product) => {
        const allocation = inventory.allocateStock(product.id, 1);
        if (allocation.success) {
            const item: CartItem = { ...product, quantity: 1, finalPrice: product.price };
            ledger.commitTransaction(item);
            syncFromLedger(); // Re-hydrate state
            setIsCartOpen(true);
        } else {
            alert("Allocation Failed: Insufficient Inventory.");
        }
    };

    const removeFromCart = (id: number) => {
        setCart(prev => prev.filter(item => item.id !== id));
        // Note: In a full system, we would write a CREDIT transaction to Ledger here
    };

    const updateQuantity = (id: number, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) return { ...item, quantity: Math.max(1, item.quantity + delta) };
            return item;
        }));
    };

    const toggleCart = () => setIsCartOpen(!isCartOpen);
    const clearCart = () => { setCart([]); setPromoCode(null); setDiscountPercentage(0); };

    const addPoints = (amount: number) => {
        const next = userPoints + amount;
        setUserPoints(next);
        localStorage.setItem('userPoints', next.toString());
    };

    const toggleWishlist = (id: number) => {
        setWishlist(prev => {
            const next = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
            localStorage.setItem('wishlist', JSON.stringify(next));
            return next;
        });
    };

    const addReview = (review: Review) => setReviews(prev => [review, ...prev]);

    // Promo Logic
    const applyPromo = (code: string) => {
        if (code === 'LUMEN20') {
            setPromoCode(code);
            setDiscountPercentage(0.2);
            return { success: true, message: "High Yield Discount Applied!" };
        }
        return { success: false, message: "Invalid Code" };
    };
    const removePromo = () => { setPromoCode(null); setDiscountPercentage(0); };

    const audit = ledger.getAuditBalance();
    const total = audit.subtotal; // Use ledger's calculated truth

    return (
        <CartContext.Provider value={{
            cart, addToCart, removeFromCart, updateQuantity, toggleCart, isCartOpen,
            total, clearCart, promoCode, discountAmount: total * discountPercentage, applyPromo, removePromo,
            userPoints, addPoints, reviews, addReview, wishlist, toggleWishlist
        }}>
            {children}
        </CartContext.Provider>
    );
};
