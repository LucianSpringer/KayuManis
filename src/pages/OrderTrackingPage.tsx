import React, { useState, useMemo } from 'react';
import { Search, Package, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';
import { TransactionLedger } from '../core/commerce/TransactionLedger';
import { DeliveryGeofencing } from '../core/logistics/DeliveryGeofencing';

export const OrderTrackingPage: React.FC = () => {
    const [trackId, setTrackId] = useState("");
    const [searchResult, setSearchResult] = useState<any>(null);
    const [isSearching, setIsSearching] = useState(false);

    // Engine Injection
    const ledger = useMemo(() => TransactionLedger.getInstance(), []);
    const logistics = useMemo(() => DeliveryGeofencing.getInstance(), []);

    const handleTrack = () => {
        setIsSearching(true);
        setTimeout(() => {
            // Logic: Scan Ledger for the Trace ID
            const history = ledger.getLedgerHistory();
            const transaction = history.find(t => t.traceId === trackId);

            if (transaction) {
                // Simulate status based on time elapsed since transaction
                const elapsed = Date.now() - transaction.timestamp;
                const status = calculateStatus(elapsed);

                // Use Geofencing to simulate current location
                const mockAddress = "Jakarta Selatan"; // In real app, store address in metadata
                const coords = logistics.resolveAddressToCoordinates(mockAddress);

                setSearchResult({
                    ...transaction,
                    status,
                    currentLocation: coords
                });
            } else {
                setSearchResult(null);
                alert("Order ID not found in Global Ledger.");
            }
            setIsSearching(false);
        }, 1000);
    };

    // Heuristic Status Calculation
    const calculateStatus = (ms: number) => {
        const mins = ms / 1000 / 60;
        if (mins < 10) return { step: 1, label: 'Baking', desc: 'Your order is in the oven.' };
        if (mins < 30) return { step: 2, label: 'Quality Check', desc: 'Chef is inspecting freshness.' };
        if (mins < 60) return { step: 3, label: 'Out for Delivery', desc: 'Courier is on the way.' };
        return { step: 4, label: 'Delivered', desc: 'Package arrived at destination.' };
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in">
            <h1 className="text-4xl font-serif font-bold text-center mb-8">Order Tracking</h1>

            {/* Search Box */}
            <div className="max-w-lg mx-auto bg-white p-2 rounded-full shadow-lg border border-stone-200 flex mb-12">
                <input
                    type="text"
                    placeholder="Enter Trace ID (e.g., Tx-173...)"
                    className="flex-1 px-6 py-3 rounded-full outline-none text-stone-700"
                    value={trackId}
                    onChange={(e) => setTrackId(e.target.value)}
                />
                <button
                    onClick={handleTrack}
                    disabled={isSearching}
                    className="bg-stone-900 text-white px-8 py-3 rounded-full font-bold hover:bg-stone-800 transition disabled:opacity-70"
                >
                    {isSearching ? 'Scanning...' : 'Track'}
                </button>
            </div>

            {/* Results */}
            {searchResult && (
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-stone-100">
                    <div className="bg-stone-900 text-white p-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-stone-400 text-sm uppercase tracking-wide">Order ID</p>
                                <h2 className="text-2xl font-mono font-bold">{searchResult.traceId}</h2>
                            </div>
                            <div className="text-right">
                                <p className="text-stone-400 text-sm uppercase tracking-wide">Estimated Arrival</p>
                                <p className="text-xl font-bold text-green-400">
                                    {searchResult.status.step < 4 ? "Today, 14:00" : "Delivered"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        {/* Timeline */}
                        <div className="space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                            {[
                                { step: 1, title: "Order Placed", icon: Package },
                                { step: 2, title: "Baking in Progress", icon: Clock },
                                { step: 3, title: "Out for Delivery", icon: Truck },
                                { step: 4, title: "Delivered", icon: CheckCircle }
                            ].map((s, i) => {
                                const isCompleted = searchResult.status.step >= s.step;
                                const isCurrent = searchResult.status.step === s.step;
                                return (
                                    <div key={i} className="relative pl-12">
                                        <div className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center border-2 z-10 bg-white ${isCompleted ? 'border-amber-600 text-amber-600' : 'border-stone-300 text-stone-300'}`}>
                                            <s.icon className="w-4 h-4" />
                                        </div>
                                        <h3 className={`font-bold ${isCompleted ? 'text-stone-900' : 'text-stone-400'}`}>{s.title}</h3>
                                        {isCurrent && <p className="text-amber-600 text-sm mt-1 font-medium">{searchResult.status.desc}</p>}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Telemetry Data (High Yield Visual) */}
                        <div className="mt-8 bg-stone-50 p-4 rounded-xl border border-stone-200 font-mono text-xs text-stone-500">
                            <p>LOGISTICS_HASH: {searchResult.hash || 'PENDING_SIG'}</p>
                            <p>GEO_COORDS: {searchResult.currentLocation?.lat.toFixed(6)}, {searchResult.currentLocation?.lng.toFixed(6)}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
