import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FAQPage: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const faqs = [
        { q: "How is the 'Inventory Allocator' calculated?", a: "We use a deterministic First-In-First-Out (FIFO) algorithm tracking batch expiry to the millisecond." },
        { q: "Is the Vector Search real?", a: "Yes. We serialize product metadata into 50-dimensional vectors and perform cosine similarity checks client-side." },
        { q: "Can I join the Reseller Network?", a: "Absolutely. Our MLM Engine calculates recursive commissions up to 3 levels deep." }
    ];

    return (
        <div className="max-w-3xl mx-auto px-4 py-16 animate-fade-in">
            <h1 className="text-4xl font-serif font-bold text-center text-stone-900 mb-12">Technical FAQ</h1>
            <div className="space-y-4">
                {faqs.map((item, i) => (
                    <div key={i} className="bg-white border border-stone-200 rounded-xl overflow-hidden">
                        <button
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="w-full px-6 py-4 flex justify-between items-center bg-stone-50 hover:bg-white transition text-left"
                        >
                            <span className="font-bold text-stone-800">{item.q}</span>
                            {openIndex === i ? <ChevronUp className="w-5 h-5 text-amber-600" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
                        </button>
                        {openIndex === i && (
                            <div className="px-6 py-4 text-stone-600 bg-white border-t border-stone-100 text-sm leading-relaxed">
                                {item.a}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
