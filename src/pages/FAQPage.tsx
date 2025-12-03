import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FAQPage: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const categories = [
        {
            title: "Ordering & Payment",
            items: [
                { q: "How can I place an order?", a: "Place an order directly via our website or use the AI Assistant." },
                { q: "What payment methods?", a: "We accept QRIS, Bank Transfer, and Credit Cards via our secure Ledger." }
            ]
        },
        {
            title: "Logistics",
            items: [
                { q: "Where do you deliver?", a: "We use geospatial fencing to determine delivery zones within Jakarta and Bodetabek." }
            ]
        }
    ];

    const toggleQuestion = (catIndex: number, itemIndex: number) => {
        const uniqueId = catIndex * 100 + itemIndex;
        setOpenIndex(openIndex === uniqueId ? null : uniqueId);
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-16 animate-fade-in">
            <h1 className="text-4xl font-serif font-bold text-center text-stone-900 mb-4">Frequently Asked Questions</h1>
            <p className="text-center text-stone-500 mb-12">Find answers to common questions about our bakery.</p>

            <div className="space-y-8">
                {categories.map((cat, catIdx) => (
                    <div key={catIdx}>
                        <h2 className="text-xl font-bold text-amber-800 mb-4 border-b border-amber-100 pb-2">{cat.title}</h2>
                        <div className="space-y-3">
                            {cat.items.map((item, itemIdx) => {
                                const uniqueId = catIdx * 100 + itemIdx;
                                const isOpen = openIndex === uniqueId;
                                return (
                                    <div key={itemIdx} className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm hover:border-amber-200 transition">
                                        <button onClick={() => toggleQuestion(catIdx, itemIdx)} className="w-full px-6 py-4 flex justify-between items-center bg-stone-50 hover:bg-white transition text-left">
                                            <span className="font-bold text-stone-800 text-sm md:text-base pr-4">{item.q}</span>
                                            {isOpen ? <ChevronUp className="w-5 h-5 text-amber-600 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-stone-400 flex-shrink-0" />}
                                        </button>
                                        {isOpen && (
                                            <div className="px-6 py-4 text-stone-600 bg-white border-t border-stone-100 leading-relaxed text-sm">
                                                {item.a}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
