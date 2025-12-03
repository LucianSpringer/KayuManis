import React, { useState, useEffect, useMemo } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { PRODUCTS } from '../../constants';
import { ProductCard } from '../components/products/ProductCard';
import { TaxonomyEngine } from '../core/catalogue/TaxonomyEngine';

export const MenuPage: React.FC = () => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    // Engine Logic Injection
    const taxonomyEngine = useMemo(() => TaxonomyEngine.getInstance(), []);
    useEffect(() => { PRODUCTS.forEach(p => taxonomyEngine.indexProduct(p)); }, []);

    const filtered = useMemo(() => {
        let results = taxonomyEngine.search(search, PRODUCTS);
        // results is SearchResult[], map to Product[] for category filtering
        let products = results.map(r => r.product);
        products = taxonomyEngine.getCategoryWeightedProducts(category, products);
        return products;
    }, [search, category, taxonomyEngine]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-serif font-bold text-center mb-12 text-stone-900">Our Menu</h1>

            {/* Search & Filter UI */}
            <div className="flex flex-col md:flex-row gap-4 mb-12">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search for 'flaky croissant' or 'sweet cake'..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="relative">
                    <select
                        className="appearance-none px-6 py-3 rounded-xl border border-stone-200 bg-white focus:ring-2 focus:ring-amber-500 outline-none pr-10 cursor-pointer"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="All">All Categories</option>
                        <option value="Bread">Bread</option>
                        <option value="Pastry">Pastry</option>
                        <option value="Cake">Cake</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4 pointer-events-none" />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
        </div>
    );
};
