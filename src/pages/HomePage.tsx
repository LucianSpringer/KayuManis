import React from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/products/ProductCard';
import { PRODUCTS } from '../../constants';

export const HomePage: React.FC = () => (
    <div className="animate-fade-in">
        <div className="bg-amber-600 text-white py-24 px-4 text-center rounded-b-[3rem]">
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Artisan Bakery</h1>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">Experience the intersection of traditional baking and high-yield algorithmic perfection.</p>
            <Link to="/menu" className="bg-white text-amber-900 px-8 py-3 rounded-full font-bold hover:bg-amber-50 transition">View Menu</Link>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-serif font-bold text-center mb-12">Customer Favorites</h2>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
                {PRODUCTS.slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
            </div>
        </div>
    </div>
);
