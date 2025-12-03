import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../../constants';
import { ProductCard } from '../components/products/ProductCard';

export const HomePage: React.FC = () => {
    const navigate = useNavigate();

    return (
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
};
