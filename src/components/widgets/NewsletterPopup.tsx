import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export const NewsletterPopup: React.FC = () => {
    const [show, setShow] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => !sessionStorage.getItem('hidePopup') && setShow(true), 5000);
        return () => clearTimeout(timer);
    }, []);
    if (!show) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="bg-white p-8 rounded-2xl max-w-sm w-full relative">
                <button onClick={() => { setShow(false); sessionStorage.setItem('hidePopup', 'true'); }} className="absolute top-4 right-4"><X className="w-5 h-5" /></button>
                <h3 className="text-xl font-bold mb-2">Get 20% Off!</h3>
                <p className="text-stone-500 mb-4">Use code LUMEN20 at checkout.</p>
                <button onClick={() => setShow(false)} className="w-full bg-amber-600 text-white py-2 rounded-lg">Got it</button>
            </div>
        </div>
    );
};
