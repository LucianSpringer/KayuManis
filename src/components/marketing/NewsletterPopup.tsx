import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

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
                    <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">Promo Spesial!</h3>
                    <p className="text-stone-600 text-sm mb-6">Beli 2 Box Kue Kering Gratis Ongkir Jabodetabek! Dapatkan juga diskon 10% untuk pesanan pertama.</p>
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
