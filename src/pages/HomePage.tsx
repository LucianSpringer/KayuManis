import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, CheckCircle, ChevronRight, Clock, MapPin, Star } from 'lucide-react';
import { ProductCard } from '../components/products/ProductCard';
import { TESTIMONIALS } from '../../constants';
import { ProductEngine } from '../core/catalogue/ProductEngine';

export const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);

    // Engine Injection: Get Best Sellers dynamically
    const productEngine = useMemo(() => ProductEngine.getInstance(), []);
    const bestSellers = useMemo(() => productEngine.query({ sortBy: 'recommended' }).slice(0, 4), [productEngine]);
    const flashSaleItems = useMemo(() => productEngine.query({ category: 'Cake' }).filter(p => p.isFlashSale), [productEngine]);

    const slides = [
        {
            image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
            title: "Freshness Baked Every Morning",
            subtitle: "Nikmati kehangatan Roti & Kue segar setiap hari."
        },
        {
            image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
            title: "Premium Celebration Cakes",
            subtitle: "Rayakan momen spesial dengan kue tart terbaik kami."
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % slides.length), 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="animate-fade-in">
            {/* 1. Hero Slider (Restored) */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-stone-900">
                {slides.map((slide, index) => (
                    <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                        <img src={slide.image} alt={slide.title} className="w-full h-full object-cover opacity-60" />
                    </div>
                ))}
                <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 drop-shadow-lg animate-fade-in-up">{slides[currentSlide].title}</h1>
                    <p className="text-xl mb-10 text-stone-100 font-light max-w-2xl mx-auto">{slides[currentSlide].subtitle}</p>
                    <button onClick={() => navigate('/menu')} className="px-8 py-4 bg-amber-600 text-white rounded-full font-bold text-lg hover:bg-amber-700 transition shadow-xl transform hover:-translate-y-1">
                        Lihat Menu
                    </button>
                </div>
            </section>

            {/* 2. Best Sellers (Engine Powered) */}
            <section className="py-20 max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-amber-600 font-bold tracking-widest uppercase text-sm">Customer Favorites</span>
                    <h2 className="text-4xl font-serif font-bold text-stone-900 mt-2">Best Sellers</h2>
                    <div className="w-24 h-1 bg-amber-500 mx-auto mt-6"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
                    {bestSellers.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
            </section>

            {/* 3. Flash Sale (Restored) */}
            <section className="py-16 bg-red-600 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-12">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Zap className="w-8 h-8 text-yellow-300 animate-pulse" />
                                <span className="text-yellow-300 font-bold uppercase tracking-widest">Limited Time</span>
                            </div>
                            <h2 className="text-5xl font-serif font-bold">Flash Sale!</h2>
                        </div>
                        <div className="flex gap-4">
                            {['02', '14', '35'].map((t, i) => (
                                <div key={i} className="bg-white/20 backdrop-blur-sm rounded-xl p-4 min-w-[80px] text-center border border-white/30">
                                    <div className="text-3xl font-bold font-mono">{t}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
                        {flashSaleItems.length > 0 ? flashSaleItems.map(p => <ProductCard key={p.id} product={p} />) : <p>All sold out!</p>}
                    </div>
                </div>
            </section>

            {/* 4. About Us (Restored) */}
            <section className="py-20 bg-stone-100">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="relative h-96 rounded-3xl overflow-hidden shadow-xl">
                        <img src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Bakery" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <span className="text-amber-600 font-bold tracking-widest uppercase text-sm">Our Story</span>
                        <h2 className="text-4xl font-serif font-bold text-stone-900 mt-2 mb-6">Baked with Love</h2>
                        <p className="text-stone-600 text-lg mb-6">At KayuManis Bakery, we believe that every slice tells a story.</p>
                        <ul className="space-y-4">
                            {["100% Halal Ingredients", "Baked Fresh Daily", "Traditional Recipes"].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-stone-700">
                                    <CheckCircle className="w-6 h-6 text-amber-500" /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* 5. Location & Hours (Restored) */}
            <section className="py-20 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="bg-stone-900 p-10 rounded-3xl text-white shadow-2xl">
                    <h2 className="text-3xl font-serif font-bold mb-8">Visit Our Bakery</h2>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <MapPin className="w-6 h-6 text-amber-500 mt-1" />
                            <div>
                                <h4 className="font-bold text-lg">Location</h4>
                                <p className="text-stone-400">Jl. Bakery No. 123, Jakarta Selatan</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Clock className="w-6 h-6 text-amber-500 mt-1" />
                            <div>
                                <h4 className="font-bold text-lg">Opening Hours</h4>
                                <p className="text-stone-400">Mon - Sun: 07:00 - 22:00</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-96 bg-stone-200 rounded-3xl overflow-hidden shadow-inner relative">
                    <div className="absolute inset-0 flex items-center justify-center text-stone-500">Google Maps Embed Placeholder</div>
                </div>
            </section>
        </div>
    );
};
