import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { ProductEngine } from '../core/catalogue/ProductEngine';
import { InventoryAllocator } from '../core/catalogue/InventoryAllocator';
import { TelemetryEngine } from '../core/analytics/TelemetryEngine';
import { SmartOvenEngine } from '../core/production/SmartOvenEngine';
import { CartContext } from '../context/CartContext';

export const ProductDetailPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, toggleWishlist, wishlist } = React.useContext(CartContext);

    // Engine Injection
    const productEngine = useMemo(() => ProductEngine.getInstance(), []);
    const inventory = useMemo(() => InventoryAllocator.getInstance(), []);
    const telemetry = useMemo(() => TelemetryEngine.getInstance(), []);
    const oven = useMemo(() => SmartOvenEngine.getInstance(), []);

    const product = productEngine.getProductById(Number(id));

    // Log telemetry on view
    React.useEffect(() => {
        if (product) telemetry.logView(product.id);
    }, [product, telemetry]);

    if (!product) return <div className="p-20 text-center font-bold text-red-500">Product Not Found via Engine Query.</div>;

    const stock = inventory.getAvailableStock(product.id);
    const healthIndex = inventory.getInventoryHealthIndex(product.id);
    const isWishlisted = wishlist.includes(product.id);
    const canBulkOrder = oven.checkCapacity(new Date(), 50);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in">
            <button onClick={() => navigate(-1)} className="mb-8 text-stone-500 hover:text-amber-600 font-bold">← Back to Menu</button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="rounded-3xl overflow-hidden shadow-2xl relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    {stock === 0 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white font-bold text-2xl border-4 border-white p-4 transform -rotate-12">SOLD OUT</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{product.category}</span>
                        {stock < 10 && stock > 0 && <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full animate-pulse">Low Stock: {stock}</span>}
                        {canBulkOrder && <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">High Capacity Production Available</span>}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6">{product.name}</h1>

                    <div className="flex items-center gap-6 mb-8">
                        <span className="text-3xl font-bold text-stone-900">Rp {product.price.toLocaleString('id-ID')}</span>
                        <div className="flex items-center gap-1 text-amber-500">
                            <Star className="fill-current w-5 h-5" />
                            <span className="text-stone-700 font-bold">{product.rating} ({product.reviews} verified reviews)</span>
                        </div>
                    </div>

                    <p className="text-stone-600 text-lg leading-relaxed mb-8">{product.description}</p>

                    <div className="bg-stone-50 p-6 rounded-xl border border-stone-100 mb-8">
                        <h3 className="font-bold text-stone-900 mb-3 text-sm uppercase">Freshness Telemetry</h3>
                        <div className="flex items-center gap-4">
                            <div className="flex-1 bg-stone-200 h-2 rounded-full overflow-hidden">
                                <div className="bg-green-500 h-full transition-all duration-1000" style={{ width: `${healthIndex}%` }}></div>
                            </div>
                            <span className="text-xs font-bold text-green-600">{healthIndex}% Quality Score</span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => stock > 0 && addToCart(product)}
                            disabled={stock === 0}
                            className={`flex-1 py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-3 transition transform active:scale-95 ${stock > 0 ? 'bg-amber-600 text-white hover:bg-amber-700' : 'bg-stone-300 text-stone-500 cursor-not-allowed'}`}
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {stock > 0 ? 'Add to Cart' : 'Unavailable'}
                        </button>
                        <button
                            onClick={() => toggleWishlist(product.id)}
                            className={`p-4 rounded-xl border-2 transition ${isWishlisted ? 'border-red-200 bg-red-50 text-red-500' : 'border-stone-200 text-stone-400 hover:border-amber-500'}`}
                        >
                            <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
