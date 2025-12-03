import React, { useContext, useMemo, useState } from 'react';
import { LogOut, User as UserIcon, Heart } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { ResellerEngine } from '../core/commerce/ResellerEngine';
import { ProductCard } from '../components/products/ProductCard';
import { PRODUCTS } from '../../constants';

export const ProfilePage: React.FC = () => {
    const { userPoints, wishlist } = useContext(CartContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Engine Logic Injection
    const resellerEngine = useMemo(() => ResellerEngine.getInstance(), []);
    const networkStats = resellerEngine.getNetworkStats('USER_ME');

    if (!isLoggedIn) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-4">
                <button onClick={() => setIsLoggedIn(true)} className="bg-amber-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-amber-700 transition">Login (Mock)</button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-serif font-bold text-stone-900">My Profile</h1>
                <button onClick={() => setIsLoggedIn(false)} className="text-red-500 font-bold flex items-center gap-2 hover:bg-red-50 px-4 py-2 rounded-lg transition">
                    <LogOut className="w-4 h-4" /> Logout
                </button>
            </div>

            {networkStats && (
                <div className="bg-stone-900 text-white p-8 rounded-3xl mb-8 relative overflow-hidden shadow-2xl">
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
                        <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                            <p className="text-xs text-stone-400 uppercase mb-1">Network Volume</p>
                            <p className="text-xl font-bold">Rp {networkStats.networkVolume.toLocaleString()}</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                            <p className="text-xs text-stone-400 uppercase mb-1">Personal Sales</p>
                            <p className="text-xl font-bold">Rp {networkStats.personalVolume.toLocaleString()}</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                            <p className="text-xs text-stone-400 uppercase mb-1">Downline</p>
                            <p className="text-xl font-bold">{networkStats.downlineCount} Recruits</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Wishlist Section */}
            <div className="mt-12">
                <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6 flex items-center gap-2">
                    <Heart className="w-6 h-6 text-red-500 fill-current" /> Wishlist
                </h2>
                {wishlist.length === 0 ? (
                    <p className="text-stone-500">Your wishlist is empty.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {PRODUCTS.filter(p => wishlist.includes(p.id)).map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
