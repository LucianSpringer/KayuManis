import React, { useState } from 'react';
import { InventoryAllocator } from '../core/catalogue/InventoryAllocator';
import { PRODUCTS } from '../../constants';

export const AdminPage: React.FC = () => {
    const [auth, setAuth] = useState(false);
    const inventory = InventoryAllocator.getInstance();

    if (!auth) return (
        <div className="min-h-screen flex items-center justify-center">
            <button onClick={() => setAuth(true)} className="bg-stone-900 text-white px-6 py-2 rounded">Simulate Admin Login</button>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">Inventory Matrix</h1>
            <div className="bg-white rounded-xl shadow border border-stone-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-stone-50 border-b border-stone-200">
                        <tr><th className="p-4">Product</th><th className="p-4">Real-Time Stock</th><th className="p-4">Health Index</th></tr>
                    </thead>
                    <tbody>
                        {PRODUCTS.map(p => (
                            <tr key={p.id} className="border-b border-stone-100">
                                <td className="p-4 font-medium">{p.name}</td>
                                <td className="p-4">
                                    <span className="font-mono bg-stone-100 px-2 py-1 rounded">{inventory.getAvailableStock(p.id)}</span>
                                </td>
                                <td className="p-4 text-green-600">{inventory.getInventoryHealthIndex(p.id)}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
