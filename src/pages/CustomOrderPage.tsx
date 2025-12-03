import React from 'react';
export const CustomOrderPage: React.FC = () => (
    <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Custom Order Request</h1>
        <form className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-stone-100" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-6">
                <input type="text" placeholder="Name" className="w-full p-3 border rounded-lg" />
                <input type="email" placeholder="Email" className="w-full p-3 border rounded-lg" />
            </div>
            <textarea placeholder="Describe your cake dream..." rows={4} className="w-full p-3 border rounded-lg"></textarea>
            <button className="bg-stone-900 text-white px-8 py-3 rounded-lg font-bold">Submit Request</button>
        </form>
    </div>
);
