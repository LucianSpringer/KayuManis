import React, { useState, useMemo } from 'react';
import { Activity, Package, Plus, Trash2, Edit, TrendingUp } from 'lucide-react';
import { InventoryAllocator } from '../core/catalogue/InventoryAllocator';
import { TransactionLedger } from '../core/commerce/TransactionLedger';
import { SupplyChainEngine } from '../core/supply/SupplyChainEngine';
import { TelemetryEngine } from '../core/analytics/TelemetryEngine';
import { PRODUCTS } from '../../constants';

export const AdminPage: React.FC = () => {
    const [auth, setAuth] = useState(false);
    const inventory = useMemo(() => InventoryAllocator.getInstance(), []);
    const ledger = useMemo(() => TransactionLedger.getInstance(), []);
    const supplyChain = useMemo(() => SupplyChainEngine.getInstance(), []);
    const telemetry = useMemo(() => TelemetryEngine.getInstance(), []);

    // Analytics Mock Data (Linear Regression Simulation)
    const salesData = [120, 150, 180, 220, 300, 280, 350];
    const predictedNext = 380;

    // Simulate Auto-PO Run
    const recentPOs = useMemo(() => supplyChain.runProcurementCycle([1, 3]), [supplyChain]);
    const heatmap = useMemo(() => telemetry.getHeatmapData(), [telemetry]);

    if (!auth) return (
        <div className="min-h-[70vh] flex items-center justify-center bg-stone-50">
            <button onClick={() => setAuth(true)} className="bg-stone-900 text-white px-8 py-3 rounded-lg font-bold shadow-lg">Authenticate Command Center</button>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-serif font-bold text-stone-900">Command Center</h1>
                <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full animate-pulse">SYSTEM ONLINE</span>
            </div>

            {/* Analytics Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><TrendingUp className="w-6 h-6" /></div>
                        <h3 className="font-bold text-stone-700">Sales Velocity</h3>
                    </div>
                    <div className="flex items-end gap-2 h-24">
                        {salesData.map((h, i) => (
                            <div key={i} className="bg-blue-500 w-full rounded-t-sm" style={{ height: `${(h / 400) * 100}%` }}></div>
                        ))}
                        <div className="bg-green-400 w-full rounded-t-sm opacity-50" style={{ height: `${(predictedNext / 400) * 100}%` }} title="Predicted"></div>
                    </div>
                    <p className="text-xs text-stone-400 mt-2">Prediction: +8.5% Growth</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-amber-100 p-2 rounded-lg text-amber-600"><Package className="w-6 h-6" /></div>
                        <h3 className="font-bold text-stone-700">Inventory Health</h3>
                    </div>
                    <div className="text-4xl font-bold text-stone-900 mb-2">98.2%</div>
                    <p className="text-sm text-stone-500">Optimal batch rotation.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-green-100 p-2 rounded-lg text-green-600"><Activity className="w-6 h-6" /></div>
                        <h3 className="font-bold text-stone-700">Ledger Balance</h3>
                    </div>
                    <div className="text-4xl font-bold text-green-600">Rp {ledger.getAuditBalance().total.toLocaleString()}</div>
                    <p className="text-sm text-stone-500">Real-time audit.</p>
                </div>
            </div>

            {/* Product CRUD Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
                <div className="p-6 border-b border-stone-100 flex justify-between items-center">
                    <h3 className="font-bold text-lg">Inventory Matrix</h3>
                    <button className="bg-stone-900 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-stone-800 transition">
                        <Plus className="w-4 h-4" /> Add SKU
                    </button>
                </div>
                <table className="w-full text-left text-sm">
                    <thead className="bg-stone-50 text-stone-500 uppercase font-bold">
                        <tr>
                            <th className="px-6 py-4">Product</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Stock (Real)</th>
                            <th className="px-6 py-4">Health</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                        {PRODUCTS.map(p => (
                            <tr key={p.id} className="hover:bg-stone-50">
                                <td className="px-6 py-4 font-bold text-stone-800">{p.name}</td>
                                <td className="px-6 py-4">Rp {p.price.toLocaleString()}</td>
                                <td className="px-6 py-4"><span className="bg-stone-100 px-2 py-1 rounded font-mono">{inventory.getAvailableStock(p.id)}</span></td>
                                <td className="px-6 py-4 text-green-600 font-mono">{inventory.getInventoryHealthIndex(p.id)}%</td>
                                <td className="px-6 py-4 flex gap-2">
                                    <button className="p-1 text-blue-500 hover:bg-blue-50 rounded"><Edit className="w-4 h-4" /></button>
                                    <button className="p-1 text-red-500 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Supply Chain & Telemetry */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
                    <h3 className="font-bold text-lg mb-4">Auto-Procurement Logs (SupplyChainEngine)</h3>
                    <ul className="space-y-3">
                        {recentPOs.slice(0, 5).map(po => (
                            <li key={po.poNumber} className="flex justify-between text-sm bg-stone-50 p-3 rounded-lg">
                                <span className="font-mono text-stone-600 text-xs">{po.poNumber}</span>
                                <span className="font-bold">{po.ingredient} ({po.quantityKg}kg)</span>
                                <span className="text-green-600 font-bold text-xs bg-green-100 px-2 py-1 rounded">{po.status}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
                    <h3 className="font-bold text-lg mb-4">Product Interest Heatmap (Telemetry)</h3>
                    {heatmap.length > 0 ? (
                        <div className="space-y-2">
                            {heatmap.slice(0, 5).map(item => (
                                <div key={item.productId} className="flex items-center gap-3">
                                    <span className="text-xs font-mono text-stone-400 w-8">ID:{item.productId}</span>
                                    <div className="flex-1 bg-stone-100 h-6 rounded overflow-hidden">
                                        <div className="bg-blue-500 h-full" style={{ width: `${Math.min(item.views * 10, 100)}%` }}></div>
                                    </div>
                                    <span className="text-xs font-bold text-stone-600">{item.views} views</span>
                                    <span className="text-xs text-green-600">{item.conversionRate.toFixed(1)}%</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-stone-400 text-sm">No telemetry data yet. Visit product pages to generate data.</p>
                    )}
                </div>
            </div>
        </div>
    );
};
