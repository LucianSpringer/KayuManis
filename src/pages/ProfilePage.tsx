import React, { useContext, useMemo, useState } from 'react';
import { LogOut, User as UserIcon, Heart, Star, Package, ChevronRight } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { ResellerEngine } from '../core/commerce/ResellerEngine';
import { ProductCard } from '../components/products/ProductCard';
import { ProductEngine } from '../core/catalogue/ProductEngine';
import { FamilyAccountManager } from '../components/profile/FamilyAccountManager';

export const ProfilePage: React.FC = () => {
    const { userPoints, wishlist } = useContext(CartContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeTab, setActiveTab] = useState<'buyer' | 'reseller'>('buyer');

    // Engine Logic Injection
    const resellerEngine = useMemo(() => ResellerEngine.getInstance(), []);
    const productEngine = useMemo(() => ProductEngine.getInstance(), []);
    const networkStats = resellerEngine.getNetworkStats('USER_ME');

    // Resolve Wishlist items via Engine
    const wishlistProducts = useMemo(() => {
        return wishlist.map(id => productEngine.getProductById(id)).filter(Boolean) as any[];
    }, [wishlist, productEngine]);

    if (!isLoggedIn) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-4 animate-fade-in">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-stone-100 text-center">
                    <h2 className="text-3xl font-serif font-bold mb-6">Welcome Back</h2>
                    <p className="text-stone-500 mb-8">Login to manage your orders and points.</p>
                    <button onClick={() => setIsLoggedIn(true)} className="w-full bg-amber-600 text-white py-3 rounded-lg font-bold hover:bg-amber-700 transition">Login / Register</button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-serif font-bold text-stone-900">My Profile</h1>
                <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-2 text-red-500 hover:text-red-700 font-medium">
                    <LogOut className="w-5 h-5" /> Logout
                </button>
            </div>

            {/* Toggle Switch */}
            <div className="flex gap-4 mb-8 border-b border-stone-200 pb-1">
                <button
                    onClick={() => setActiveTab('buyer')}
                    className={`pb-4 px-4 font-bold text-lg transition ${activeTab === 'buyer' ? 'text-amber-600 border-b-4 border-amber-600' : 'text-stone-400 hover:text-stone-600'}`}
                >
                    Buyer Dashboard
                </button>
                <button
                    onClick={() => setActiveTab('reseller')}
                    className={`pb-4 px-4 font-bold text-lg transition ${activeTab === 'reseller' ? 'text-amber-600 border-b-4 border-amber-600' : 'text-stone-400 hover:text-stone-600'}`}
                >
                    Reseller Network
                </button>
            </div>

            {/* BUYER VIEW (Restored from Original) */}
            {activeTab === 'buyer' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* User Info & Points */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 h-fit">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-2xl font-bold text-amber-600">JD</div>
                            <div>
                                <h3 className="font-bold text-lg text-stone-900">John Doe</h3>
                                <p className="text-sm text-stone-500">john@example.com</p>
                            </div>
                        </div>
                        <div className="bg-amber-50 p-6 rounded-xl border border-amber-100 text-center">
                            <div className="w-12 h-12 bg-amber-200 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-2">
                                <Star className="w-6 h-6 fill-current" />
                            </div>
                            <div className="text-sm text-amber-800 font-medium mb-1 uppercase tracking-wide">Loyalty Points</div>
                            <div className="text-4xl font-bold text-amber-600">{userPoints}</div>
                            <p className="text-xs text-amber-600/70 mt-2">Earn 1 point for every Rp 10.000 spent</p>
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-8">
                        {/* Order History */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                            <h3 className="font-bold text-lg text-stone-900 mb-6 flex items-center gap-2">
                                <Package className="w-5 h-5 text-amber-600" /> Recent Orders
                            </h3>
                            <div className="border border-stone-100 rounded-xl p-4 hover:bg-stone-50 transition flex justify-between items-center">
                                <div>
                                    <div className="font-bold text-stone-800">#ORD-992</div>
                                    <div className="text-xs text-stone-500">2023-10-15</div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-stone-900">Rp 150.000</div>
                                    <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-bold">Delivered</span>
                                </div>
                            </div>
                        </div>

                        {/* Wishlist */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                            <h3 className="font-bold text-lg text-stone-900 mb-6 flex items-center gap-2">
                                <Heart className="w-5 h-5 text-red-500 fill-current" /> My Wishlist
                            </h3>
                            {wishlistProducts.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {wishlistProducts.map(p => <ProductCard key={p.id} product={p} />)}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-stone-400">Your wishlist is empty.</div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* RESELLER VIEW (High-Yield MLM) */}
            {activeTab === 'reseller' && networkStats && (
                <div className="bg-stone-900 text-white p-8 rounded-3xl mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
                    <div className="flex justify-between items-start relative z-10">
                        <div>
                            <h2 className="text-2xl font-serif font-bold mb-1">Reseller Dashboard</h2>
                            <div className="flex items-center gap-2">
                                <span className="bg-amber-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{networkStats.tier} MEMBER</span>
                                <span className="text-stone-400 text-sm">ID: USER_ME</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-stone-400 text-sm uppercase tracking-wide">Total Earnings</p>
                            <p className="text-3xl font-bold text-green-400">Rp {networkStats.totalEarnings.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 relative z-10">
                        <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                            <p className="text-xs text-stone-400 uppercase">Network Volume</p>
                            <p className="text-xl font-bold">Rp {networkStats.networkVolume.toLocaleString()}</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                            <p className="text-xs text-stone-400 uppercase">Personal Sales</p>
                            <p className="text-xl font-bold">Rp {networkStats.personalVolume.toLocaleString()}</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                            <p className="text-xs text-stone-400 uppercase">Downline</p>
                            <p className="text-xl font-bold">{networkStats.downlineCount} Recruits</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
