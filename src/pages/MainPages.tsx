import React, { useState, useEffect, useMemo, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Star, Search, Filter, ShoppingBag, Heart, User as UserIcon, LogOut, Plus, Eye, CheckCircle, Trash2, ArrowUpRight, Calendar, Package, Truck, ChevronUp, ChevronDown } from 'lucide-react';
import { Product, Order, Review } from '../../types';
import { PRODUCTS, STAFF, KITCHEN_TASKS } from '../../constants';
import { InventoryAllocator } from '../core/catalogue/InventoryAllocator';
import { TaxonomyEngine } from '../core/catalogue/TaxonomyEngine';
import { ResellerEngine } from '../core/commerce/ResellerEngine';
import { CartContext, ProductCard } from '../../components/Common';

// --- Home Page ---
export const HomePage: React.FC = () => (
    <div className="animate-fade-in">
        <div className="bg-amber-600 text-white py-20 px-4 text-center rounded-b-3xl mb-12">
            <h1 className="text-5xl font-serif font-bold mb-6">Artisan Bakery in Jakarta</h1>
            <p className="text-xl opacity-90 mb-8">Freshly baked sourdough, croissants, and pastries delivered to your door.</p>
            <Link to="/menu" className="bg-white text-amber-600 px-8 py-3 rounded-full font-bold hover:bg-amber-50 transition">Order Now</Link>
        </div>
        <div className="max-w-7xl mx-auto px-4 pb-12">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-8 text-center">Best Sellers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {PRODUCTS.slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
            </div>
        </div>
    </div>
);

// --- Menu Page (Taxonomy Engine) ---
export const MenuPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("recommended");

    // Engine Instance
    const taxonomyEngine = useMemo(() => TaxonomyEngine.getInstance(), []);

    // Indexing on Mount
    useEffect(() => {
        PRODUCTS.forEach(p => taxonomyEngine.indexProduct(p));
    }, [taxonomyEngine]);

    const filteredProducts = useMemo(() => {
        // 1. Vector Search
        let results = taxonomyEngine.search(searchQuery);

        // 2. Weighted Category Filtering
        if (selectedCategory !== 'All') {
            results = taxonomyEngine.getCategoryWeightedProducts(selectedCategory, results);
        }

        // 3. Sorting (Legacy)
        if (sortBy === 'price-low') results.sort((a, b) => a.price - b.price);
        if (sortBy === 'price-high') results.sort((a, b) => b.price - a.price);

        return results;
    }, [searchQuery, selectedCategory, sortBy, taxonomyEngine]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in">
            <h1 className="text-4xl font-serif font-bold text-center text-stone-900 mb-8">Our Menu</h1>

            {/* Search & Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-12">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search for 'flaky croissant' or 'sweet cake'..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <select
                    className="px-6 py-3 rounded-xl border border-stone-200 bg-white focus:ring-2 focus:ring-amber-500 outline-none"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="All">All Categories</option>
                    <option value="Bread">Bread</option>
                    <option value="Pastry">Pastry</option>
                    <option value="Cake">Cake</option>
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredProducts.map(p => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </div>
    );
};

// --- Profile Page (Reseller Engine) ---
export const ProfilePage: React.FC = () => {
    const { userPoints, wishlist } = useContext(CartContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const resellerEngine = useMemo(() => ResellerEngine.getInstance(), []);
    const networkStats = resellerEngine.getNetworkStats('USER_ME');

    if (!isLoggedIn) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-4">
                <button onClick={() => setIsLoggedIn(true)} className="bg-amber-600 text-white px-8 py-3 rounded-lg font-bold">Login (Mock)</button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-serif font-bold text-stone-900">My Profile</h1>
                <button onClick={() => setIsLoggedIn(false)} className="text-red-500 font-bold">Logout</button>
            </div>

            {networkStats && (
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

// --- Admin Page (Inventory Allocator) ---
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

// --- Subscription Page ---
export const SubscriptionPage: React.FC = () => (
    <div className="max-w-7xl mx-auto px-4 py-16 animate-fade-in text-center">
        <h1 className="text-4xl font-serif font-bold text-stone-900 mb-4">KayuManis Monthly Box</h1>
        <p className="text-stone-500">Curated pastries delivered to your door.</p>
    </div>
);

// --- Placeholders ---
export const ProductDetailPage: React.FC = () => <div>Product Detail Placeholder</div>;
export const FAQPage: React.FC = () => <div>FAQ Placeholder</div>;
export const BlogPage: React.FC = () => <div>Blog Placeholder</div>;
export const InfoPage: React.FC = () => <div>Info Placeholder</div>;
export const CustomOrderPage: React.FC = () => <div>Custom Order Placeholder</div>;
export const ResellerPage: React.FC = () => <div>Reseller Placeholder</div>;
