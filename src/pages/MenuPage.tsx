import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, Filter } from 'lucide-react';
import { ProductCard } from '../components/products/ProductCard';
import { ProductEngine } from '../core/catalogue/ProductEngine';

export const MenuPage: React.FC = () => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'recommended'>('recommended');

    // Engine Injection: The UI is now a slave to the Engine
    const productEngine = useMemo(() => ProductEngine.getInstance(), []);

    // High-Yield Logic: We do NOT use .filter() here. We query the engine.
    const products = useMemo(() => {
        return productEngine.query({
            search,
            category,
            sortBy
        });
    }, [search, category, sortBy, productEngine]);

    const categories = ["All", "Bread", "Cake", "Pastry", "Snack"];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in">
            <h1 className="text-4xl font-serif font-bold text-center mb-12 text-stone-900">Our Menu</h1>

            {/* Advanced Filter Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                    {categories.map(c => (
                        <button
                            key={c}
                            onClick={() => setCategory(c)}
                            className={`px-6 py-2 rounded-full whitespace-nowrap transition-colors ${category === c ? 'bg-amber-600 text-white font-bold shadow-md' : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'}`}
                        >
                            {c}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-80 z-20">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search (Vector Enabled)..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-full border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                    </div>

                    <div className="relative z-10 w-full md:w-48">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                            className="w-full px-4 py-2 rounded-full border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none bg-white cursor-pointer"
                        >
                            <option value="recommended">Recommended</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.length > 0 ? (
                    products.map(p => <ProductCard key={p.id} product={p} />)
                ) : (
                    <div className="col-span-full text-center py-20 text-stone-500">
                        No products match your vector criteria.
                    </div>
                )}
            </div>
        </div>
    );
};
