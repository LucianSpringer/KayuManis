import React from 'react';
import { Product, CartItem, Review } from '../../types';

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
