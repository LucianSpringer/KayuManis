import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

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
                        <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-amber-500" /> Jl. Bakery No. 123, Jakarta</li>
                        <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-amber-500" /> +62 812-3456-7890</li>
                        <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-amber-500" /> hello@kayumanis.com</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-bold text-white mb-4">Follow Us</h4>
                    <div className="flex space-x-4">
                        <a href="#" className="p-2 bg-stone-800 rounded-full hover:bg-amber-600 transition"><Instagram className="w-5 h-5" /></a>
                        <a href="#" className="p-2 bg-stone-800 rounded-full hover:bg-amber-600 transition"><Facebook className="w-5 h-5" /></a>
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
