import React from 'react';
export const SubscriptionPage: React.FC = () => (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-serif font-bold mb-6">Monthly Protocol</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[1, 2, 3].map(i => (
                <div key={i} className="border border-stone-200 p-8 rounded-3xl hover:shadow-xl transition cursor-pointer">
                    <h3 className="text-xl font-bold mb-2">Tier {i}</h3>
                    <p className="text-stone-500 mb-6">Automated delivery.</p>
                    <span className="text-3xl font-bold block mb-6">Rp {(100000 * i).toLocaleString()}</span>
                    <button className="w-full bg-stone-900 text-white py-3 rounded-lg font-bold">Subscribe</button>
                </div>
            ))}
        </div>
    </div>
);
