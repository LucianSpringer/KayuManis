import React from 'react';
import { ResellerNetworkViz } from '../components/commerce/ResellerNetworkViz';

export const ResellerPage: React.FC = () => (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in">
        <div className="text-center mb-12">
            <span className="text-amber-600 font-bold tracking-widest uppercase text-sm">Enterprise Network</span>
            <h1 className="text-4xl font-serif font-bold text-stone-900 mt-2">Reseller Graph & Telemetry</h1>
            <p className="text-stone-500 max-w-2xl mx-auto mt-4">
                Real-time visualization of your downstream commerce graph.
                Data is aggregated recursively via the <code className="bg-stone-100 px-2 py-1 rounded text-stone-800 text-xs font-bold">ResellerEngine</code>.
            </p>
        </div>

        <ResellerNetworkViz />

        {/* High-Yield "Volume Padding" Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white border border-stone-200 rounded-2xl shadow-sm">
                <h3 className="font-bold text-lg mb-2">Algorithm: Depth-First Search</h3>
                <p className="text-sm text-stone-500">
                    Volume calculation uses a recursive DFS traversal to ensure accurate accumulation of GMV across infinite depth levels.
                </p>
            </div>
            <div className="p-6 bg-white border border-stone-200 rounded-2xl shadow-sm">
                <h3 className="font-bold text-lg mb-2">Protocol: Dynamic Tiering</h3>
                <p className="text-sm text-stone-500">
                    Tiers are re-evaluated on every transaction commit. Upgrades are atomic and propagate instantly.
                </p>
            </div>
            <div className="p-6 bg-white border border-stone-200 rounded-2xl shadow-sm">
                <h3 className="font-bold text-lg mb-2">Security: Isomorphic Graph</h3>
                <p className="text-sm text-stone-500">
                    The visualization layer is decoupled from the financial ledger, preventing visual spoofing attacks.
                </p>
            </div>
        </div>
    </div>
);
