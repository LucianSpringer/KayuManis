import React, { useState } from 'react';
import { PRODUCTS } from '../../constants';
import { InventoryAllocator } from '../core/catalogue/InventoryAllocator';

export const AdminPage: React.FC = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [password, setPassword] = useState("");
    const [adminProducts] = useState(PRODUCTS);

    const handleLogin = () => {
        if (password === "admin123") setIsAdmin(true);
        else alert("Invalid password");
    };

    if (!isAdmin) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full border border-stone-100 text-center">
                    <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">Admin Access</h2>
                    <input type="password" placeholder="Enter Admin Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-stone-200 mb-4" />
                    <button onClick={handleLogin} className="w-full bg-stone-900 text-white py-2 rounded-lg font-bold">Login</button>
                    <p className="text-xs text-stone-400 mt-4">Hint: admin123</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-serif font-bold text-stone-900 mb-8">Admin Dashboard</h1>
            <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-stone-50 text-stone-500 font-bold uppercase">
                        <tr>
                            <th className="px-6 py-4">Product</th>
                            <th className="px-6 py-4">Stock (Allocator)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                        {adminProducts.map((p) => (
                            <tr key={p.id}>
                                <td className="px-6 py-4 font-bold text-stone-800">{p.name}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${InventoryAllocator.getInstance().getAvailableStock(p.id) > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {InventoryAllocator.getInstance().getAvailableStock(p.id)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
