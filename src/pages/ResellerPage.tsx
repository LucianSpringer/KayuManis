import React from 'react';
import { ResellerEngine } from '../core/commerce/ResellerEngine';

export const ResellerPage: React.FC = () => (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-serif font-bold mb-6">Join the Network</h1>
        <p className="text-stone-500 mb-8 max-w-2xl mx-auto">Leverage our recursive commission structure. Our ResellerEngine tracks velocity-based tier upgrades in real-time.</p>
        <button className="bg-amber-600 text-white px-10 py-4 rounded-full font-bold shadow-xl hover:bg-amber-700 transition">Initialize Node</button>
    </div>
);
