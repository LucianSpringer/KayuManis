import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingCart, Tag, AlertCircle, Check } from 'lucide-react';
import { CartContext } from '../../context/CartContext';

export const CartSidebar: React.FC = () => {
    const {
        isCartOpen, toggleCart, cart, updateQuantity, removeFromCart,
        total, promoCode, discountAmount, applyPromo, removePromo
    } = useContext(CartContext);
    const navigate = useNavigate();
    const [inputCode, setInputCode] = useState("");
    const [promoStatus, setPromoStatus] = useState<{ msg: string, type: 'success' | 'error' | null }>({ msg: '', type: null });

    const handleApplyPromo = () => {
        if (!inputCode) return;
        const result = applyPromo(inputCode);
        setPromoStatus({ msg: result.message, type: result.success ? 'success' : 'error' });
        if (result.success) setInputCode("");
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
                            </div>
                        ) : (
                            cart.map(item => (
                                <div key={item.id} className="flex gap-4">
                                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                                    <div className="flex-1">
                                        <h3 className="font-bold text-stone-800">{item.name}</h3>
                                        <p className="text-sm text-stone-500">Rp {item.price.toLocaleString('id-ID')}</p>
                                        <div className="flex items-center gap-3 mt-2">
                                            <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 rounded-full border border-stone-300 flex items-center justify-center hover:bg-stone-100">-</button>
                                            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 rounded-full border border-stone-300 flex items-center justify-center hover:bg-stone-100">+</button>
                                        </div>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} className="text-stone-400 hover:text-red-500 self-start"><X className="w-5 h-5" /></button>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="p-6 border-t border-stone-100 bg-stone-50">
                        {/* Promo Logic Here */}
                        <button
                            onClick={() => { toggleCart(); navigate('/checkout'); }}
                            className="w-full bg-amber-600 text-white py-3 rounded-lg font-bold shadow-lg hover:bg-amber-700 transition"
                        >
                            Checkout (Rp {total.toLocaleString()})
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
