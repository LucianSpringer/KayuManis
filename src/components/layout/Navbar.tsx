import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu as MenuIcon, X, User } from 'lucide-react';
import { CartContext } from '../../context/CartContext';

export const Navbar: React.FC = () => {
    const { cart, toggleCart } = useContext(CartContext);
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

                        <div className="md:hidden flex items-center">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-stone-600 hover:text-amber-600">
                                {isMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile Menu Logic Simplified for Brevity */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-stone-100 absolute w-full shadow-lg">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-stone-700 hover:text-amber-600 hover:bg-amber-50 rounded-md">Home</Link>
                        <Link to="/menu" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-stone-700 hover:text-amber-600 hover:bg-amber-50 rounded-md">Menu</Link>
                        <Link to="/blog" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-stone-700 hover:text-amber-600 hover:bg-amber-50 rounded-md">Blog</Link>
                        <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-stone-700 hover:text-amber-600 hover:bg-amber-50 rounded-md">Profile</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};
