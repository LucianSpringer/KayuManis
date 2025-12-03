import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { CartContext } from '../../context/CartContext';

export const Navbar: React.FC = () => {
    const { cart, toggleCart } = useContext(CartContext);
    const [isOpen, setIsOpen] = useState(false);
    const count = cart.reduce((acc, i) => acc + i.quantity, 0);

    return (
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
            <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
                <Link to="/" className="text-2xl font-serif font-bold text-amber-800">🥨 KayuManis</Link>
                <div className="hidden md:flex gap-8 font-medium text-stone-600">
                    <Link to="/" className="hover:text-amber-600">Home</Link>
                    <Link to="/menu" className="hover:text-amber-600">Menu</Link>
                    <Link to="/profile" className="hover:text-amber-600">Profile</Link>
                    <Link to="/admin" className="hover:text-amber-600">Admin</Link>
                </div>
                <div className="flex gap-4">
                    <button onClick={toggleCart} className="relative p-2 hover:text-amber-600">
                        <ShoppingCart className="w-6 h-6" />
                        {count > 0 && <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{count}</span>}
                    </button>
                    <Link to="/profile" className="p-2 hover:text-amber-600"><User className="w-6 h-6" /></Link>
                </div>
            </div>
        </nav>
    );
};
