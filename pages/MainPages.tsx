import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, Star, Trash2, Menu, X, ChevronRight, ChevronDown, MapPin, Phone, Instagram, Facebook, Twitter, Search, Filter, Plus, Minus, ArrowRight, Clock, Truck, CreditCard, Lock, User, User as UserIcon, LogOut, Settings, Package, BarChart, Calendar, MessageSquare, HelpCircle, FileText, Zap, AlertCircle, CheckCircle, Edit, ArrowUpRight, Store, Heart, ChevronUp, Banknote, Eye } from 'lucide-react';
import { PRODUCTS, TESTIMONIALS, BLOG_POSTS, STAFF, KITCHEN_TASKS } from '../constants';
import { ProductCard, CartContext } from '../components/Common';
import { Product, Order, Review } from '../types';

// --- Home Page ---
export const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);

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
        },
        {
            image: "https://images.unsplash.com/photo-1555507036-ab1f40388085?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
            title: "Authentic French Pastries",
            subtitle: "Croissant renyah dengan butter premium asli."
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="animate-fade-in">
            {/* Hero Slider */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-stone-900">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <img
                            src={slide.image}
                            alt={slide.title}
                            loading={index === 0 ? "eager" : "lazy"}
                            className="w-full h-full object-cover opacity-60"
                        />
                    </div>
                ))}

                <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight drop-shadow-lg animate-fade-in-up">
                        {slides[currentSlide].title}
                    </h1>
                    <p className="text-lg md:text-xl mb-10 text-stone-100 font-light tracking-wide max-w-2xl mx-auto animate-fade-in-up delay-100">
                        {slides[currentSlide].subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-200">
                        <button
                            onClick={() => navigate('/menu')}
                            className="px-8 py-4 bg-amber-600 text-white rounded-full font-bold text-lg hover:bg-amber-700 transition shadow-xl transform hover:-translate-y-1"
                        >
                            Lihat Menu
                        </button>
                        <button
                            onClick={() => navigate('/info')}
                            className="px-8 py-4 bg-white text-stone-900 rounded-full font-bold text-lg hover:bg-stone-100 transition shadow-xl transform hover:-translate-y-1"
                        >
                            Cara Pesan
                        </button>
                    </div>
                </div>

                {/* Slider Dots */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`w-3 h-3 rounded-full transition-all ${idx === currentSlide ? 'bg-amber-500 w-8' : 'bg-white/50'}`}
                        />
                    ))}
                </div>
            </section>

            {/* Best Sellers */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-amber-600 font-bold tracking-widest uppercase text-sm">Customer Favorites</span>
                    <h2 className="text-4xl font-serif font-bold text-stone-900 mt-2">Best Sellers</h2>
                    <div className="w-24 h-1 bg-amber-500 mx-auto mt-6"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {PRODUCTS.filter(p => p.isBestSeller).map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            {/* Flash Sale Section (New) */}
            <section className="py-16 bg-red-600 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                        <div className="text-center md:text-left">
                            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                                <Zap className="w-8 h-8 text-yellow-300 fill-current animate-pulse" />
                                <span className="text-yellow-300 font-bold tracking-widest uppercase">Limited Time Offer</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold">Flash Sale!</h2>
                            <p className="text-red-100 mt-2 text-lg">Grab your favorites before they're gone.</p>
                        </div>

                        {/* Countdown Timer (Mock) */}
                        <div className="flex gap-4">
                            {['02', '14', '35'].map((time, i) => (
                                <div key={i} className="bg-white/20 backdrop-blur-sm rounded-xl p-4 min-w-[80px] text-center border border-white/30">
                                    <div className="text-3xl font-bold font-mono">{time}</div>
                                    <div className="text-xs uppercase tracking-wider opacity-80">{['Hours', 'Mins', 'Secs'][i]}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {PRODUCTS.filter(p => p.isFlashSale).map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* About Us */}
            <section className="py-20 bg-stone-100">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="relative h-96 rounded-3xl overflow-hidden shadow-xl">
                        <img
                            src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                            alt="Our Bakery"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <span className="text-amber-600 font-bold tracking-widest uppercase text-sm">Our Story</span>
                        <h2 className="text-4xl font-serif font-bold text-stone-900 mt-2 mb-6">Baked with Love, Served with Joy</h2>
                        <p className="text-stone-600 text-lg mb-6 leading-relaxed">
                            At KayuManis Bakery, we believe that every slice tells a story. Founded in 2010, we started with a simple mission: to bring the authentic taste of homemade pastries to Jakarta.
                        </p>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3 text-stone-700">
                                <CheckCircle className="w-6 h-6 text-amber-500" />
                                <span>100% Halal Certified Ingredients</span>
                            </li>
                            <li className="flex items-center gap-3 text-stone-700">
                                <CheckCircle className="w-6 h-6 text-amber-500" />
                                <span>Baked Fresh Daily (No Preservatives)</span>
                            </li>
                            <li className="flex items-center gap-3 text-stone-700">
                                <CheckCircle className="w-6 h-6 text-amber-500" />
                                <span>Traditional Recipes with a Modern Twist</span>
                            </li>
                        </ul>
                        <button onClick={() => navigate('/about')} className="text-amber-600 font-bold hover:text-amber-700 flex items-center gap-2">
                            Read More <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Video Testimonials (New) */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 text-center mb-12">
                    <span className="text-amber-600 font-bold tracking-widest uppercase text-sm">What They Say</span>
                    <h2 className="text-4xl font-serif font-bold text-stone-900 mt-2">Customer Stories</h2>
                </div>
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { name: "Sari & Family", desc: "Birthday Celebration", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
                        { name: "Budi Santoso", desc: "Regular Customer", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
                        { name: "Corporate Event", desc: "Office Gathering", img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" }
                    ].map((item, i) => (
                        <div key={i} className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-lg aspect-video">
                            <img src={item.img} alt={item.name} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition">
                                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center pl-1 shadow-xl transform group-hover:scale-110 transition">
                                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-amber-600 border-b-[10px] border-b-transparent"></div>
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                                <h4 className="font-bold text-lg">{item.name}</h4>
                                <p className="text-sm opacity-90">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Promo Banner */}
            <section className="bg-amber-900 py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                    </svg>
                </div>
                <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Special Weekend Offer!</h2>
                    <p className="text-amber-100 text-xl mb-8">Get 20% off all whole cakes when you pre-order for the weekend.</p>
                    <button onClick={() => navigate('/menu')} className="bg-white text-amber-900 px-8 py-3 rounded-full font-bold hover:bg-amber-50 transition">
                        Order Now
                    </button>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-stone-50">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-serif font-bold text-center text-stone-900 mb-16">What They Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {TESTIMONIALS.map(t => (
                            <div key={t.id} className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 relative">
                                <div className="absolute -top-4 left-8 text-6xl text-amber-200 font-serif">"</div>
                                <div className="flex gap-1 mb-4 text-amber-500">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w - 4 h - 4 ${i < t.rating ? 'fill-current' : 'text-stone-300'} `} />
                                    ))}
                                </div>
                                <p className="text-stone-600 mb-6 italic">{t.comment}</p>
                                <div className="font-bold text-stone-900">— {t.user}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Location */}
            <section className="py-20 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="bg-stone-900 p-10 rounded-3xl text-white shadow-2xl">
                    <h2 className="text-3xl font-serif font-bold mb-8">Visit Our Bakery</h2>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <MapPin className="w-6 h-6 text-amber-500 mt-1" />
                            <div>
                                <h4 className="font-bold text-lg">Location</h4>
                                <p className="text-stone-400">Jl. Bakery No. 123, Jakarta Selatan, Indonesia</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Clock className="w-6 h-6 text-amber-500 mt-1" />
                            <div>
                                <h4 className="font-bold text-lg">Opening Hours</h4>
                                <p className="text-stone-400">Mon - Fri: 07:00 - 21:00</p>
                                <p className="text-stone-400">Sat - Sun: 08:00 - 22:00</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-96 bg-stone-200 rounded-3xl overflow-hidden shadow-inner flex items-center justify-center relative">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126906.96261620067!2d106.73364305501835!3d-6.284423799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1ec2422b937%3A0x2d9f515738d52b40!2sSouth%20Jakarta%2C%20South%20Jakarta%20City%2C%20Jakarta!5e0!3m2!1sen!2sid!4v1696300000000!5m2!1sen!2sid"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0"
                    ></iframe>
                </div>
            </section>
        </div>
    );
};

// --- Info Page (New) ---
export const InfoPage: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-16 animate-fade-in">
            <h1 className="text-4xl font-serif font-bold text-center mb-12 text-stone-900">Information Center</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* How to Order */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
                    <h2 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2">
                        <ShoppingCart className="w-6 h-6 text-amber-600" /> Cara Pemesanan
                    </h2>
                    <ol className="space-y-4 relative border-l-2 border-amber-100 ml-3 pl-8">
                        {[
                            "Pilih produk favorit Anda dari menu kami.",
                            "Klik tombol 'Add to Cart' atau 'Pesan via WhatsApp'.",
                            "Jika via Website: Lanjut ke Checkout, isi data pengiriman, dan lakukan pembayaran.",
                            "Jika via WhatsApp: Kirim format pesanan yang sudah terisi otomatis.",
                            "Tunggu konfirmasi dari admin kami.",
                            "Pesanan akan diproses dan dikirim ke alamat Anda!"
                        ].map((step, i) => (
                            <li key={i} className="relative">
                                <span className="absolute -left-[41px] top-0 w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                    {i + 1}
                                </span>
                                <p className="text-stone-700">{step}</p>
                            </li>
                        ))}
                    </ol>
                </div>

                {/* Delivery Area */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
                    <h2 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2">
                        <Truck className="w-6 h-6 text-amber-600" /> Area Pengiriman
                    </h2>
                    <div className="bg-amber-50 p-6 rounded-xl mb-6">
                        <p className="font-bold text-stone-900 mb-2">Gratis Ongkir Jabodetabek!</p>
                        <p className="text-stone-600 text-sm">Untuk pembelian minimal 2 box kue kering atau total belanja Rp 300.000.</p>
                    </div>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3 text-stone-700">
                            <CheckCircle className="w-5 h-5 text-green-500" /> Jakarta Selatan (Semua Area)
                        </li>
                        <li className="flex items-center gap-3 text-stone-700">
                            <CheckCircle className="w-5 h-5 text-green-500" /> Jakarta Pusat (Menteng, Senayan, Sudirman)
                        </li>
                        <li className="flex items-center gap-3 text-stone-700">
                            <CheckCircle className="w-5 h-5 text-green-500" /> Tangerang Selatan (Bintaro, BSD)
                        </li>
                        <li className="flex items-center gap-3 text-stone-500">
                            <AlertCircle className="w-5 h-5" /> Area lain bisa dikirim via Paxel/Gojek Instant (Ongkir ditanggung pembeli)
                        </li>
                    </ul>
                </div>
            </div>

            {/* Contact Form */}
            <div className="mt-16 bg-stone-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-amber-600 rounded-full opacity-20 blur-3xl"></div>
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-3xl font-serif font-bold mb-4">Hubungi Kami</h2>
                        <p className="text-stone-300 mb-8">Punya pertanyaan khusus atau pesanan dalam jumlah besar (catering/wedding)? Isi form di bawah ini.</p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-amber-500"><Phone className="w-5 h-5" /></div>
                                <div>
                                    <p className="text-xs text-stone-400 uppercase tracking-wider">WhatsApp</p>
                                    <p className="font-bold">+62 812-3456-7890</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-amber-500"><MapPin className="w-5 h-5" /></div>
                                <div>
                                    <p className="text-xs text-stone-400 uppercase tracking-wider">Visit Us</p>
                                    <p className="font-bold">Jl. Bakery No. 123, Jakarta</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="Nama" className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 text-white placeholder-stone-400" />
                            <input type="text" placeholder="No. WhatsApp" className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 text-white placeholder-stone-400" />
                        </div>
                        <textarea rows={4} placeholder="Pesan Anda..." className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 text-white placeholder-stone-400"></textarea>
                        <button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-lg transition">Kirim Pesan</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

// --- Blog Page (New) ---
export const BlogPage: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-16 animate-fade-in">
            <div className="text-center mb-16">
                <span className="text-amber-600 font-bold tracking-widest uppercase text-sm">Our Journal</span>
                <h1 className="text-4xl font-serif font-bold text-stone-900 mt-2 mb-4">Stories from the Oven</h1>
                <p className="text-stone-500 max-w-2xl mx-auto">Tips, recipes, and behind-the-scenes stories from KayuManis Bakery.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {BLOG_POSTS.map(post => (
                    <div key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition border border-stone-100 flex flex-col">
                        <div className="h-48 overflow-hidden">
                            <img src={post.image} alt={post.title} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition duration-700" />
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <div className="flex items-center gap-2 text-xs text-stone-400 mb-3">
                                <Calendar className="w-3 h-3" />
                                <span>{post.date}</span>
                                <span>•</span>
                                <span>{post.author}</span>
                            </div>
                            <h3 className="text-xl font-bold text-stone-900 mb-3 font-serif">{post.title}</h3>
                            <p className="text-stone-600 text-sm mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
                            <button className="text-amber-600 font-bold text-sm hover:underline self-start">Read More</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Menu Page ---
export const MenuPage: React.FC = () => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState<string>("All");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [sortBy, setSortBy] = useState<string>("newest");

    const filtered = useMemo(() => {
        return PRODUCTS.filter(p => {
            // Filter by category first
            const matchCat = category === "All" || p.category === category;
            if (!matchCat) return false;

            const lowerSearch = search.toLowerCase().trim();
            if (!lowerSearch) return true;

            // Check Name OR Ingredients
            const matchName = p.name.toLowerCase().includes(lowerSearch);
            const matchIngredient = p.ingredients.some(ing => ing.toLowerCase().includes(lowerSearch));

            return matchName || matchIngredient;
        }).sort((a, b) => {
            if (sortBy === "price-low") return a.price - b.price;
            if (sortBy === "price-high") return b.price - a.price;
            if (sortBy === "best-seller") return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
            return b.id - a.id; // Newest (by ID)
        });
    }, [search, category, sortBy]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);

        if (value.length > 1) {
            const lowerSearch = value.toLowerCase();
            const matchingNames = PRODUCTS
                .filter(p => p.name.toLowerCase().includes(lowerSearch))
                .map(p => p.name);
            const matchingIngredients = Array.from(new Set(PRODUCTS.flatMap(p => p.ingredients)))
                .filter(ing => ing.toLowerCase().includes(lowerSearch));

            // Combine and limit suggestions
            const combined = Array.from(new Set([...matchingNames, ...matchingIngredients])).slice(0, 5);
            setSuggestions(combined);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        setSearch(suggestion);
        setShowSuggestions(false);
    };

    const categories = ["All", "Bread", "Cake", "Pastry", "Snack"];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12" onClick={() => setShowSuggestions(false)}>
            <h1 className="text-4xl font-serif font-bold text-center mb-12 text-stone-900">Our Menu</h1>

            {/* Filters */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                    {categories.map(c => (
                        <button
                            key={c}
                            onClick={() => setCategory(c)}
                            className={`px - 6 py - 2 rounded - full whitespace - nowrap transition - colors ${category === c ? 'bg-amber-600 text-white font-bold shadow-md' : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                                } `}
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
                            placeholder="Search by name or ingredient..."
                            value={search}
                            onChange={handleSearchChange}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                            onFocus={() => search.length > 1 && setShowSuggestions(true)}
                            className="w-full pl-10 pr-4 py-2 rounded-full border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            autoComplete="off"
                        />
                        {showSuggestions && suggestions.length > 0 && (
                            <div className="absolute top-full left-0 w-full bg-white border border-stone-200 rounded-lg shadow-xl mt-2 overflow-hidden z-50">
                                {suggestions.map((s, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSuggestionClick(s)}
                                        className="w-full text-left px-4 py-2 hover:bg-amber-50 text-sm text-stone-700 block transition-colors border-b border-stone-50 last:border-0"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sorting */}
                    <div className="relative z-10 w-full md:w-48">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full px-4 py-2 rounded-full border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none bg-white cursor-pointer"
                        >
                            <option value="newest">Newest</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="best-seller">Best Sellers</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filtered.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
            ) : (
                <div className="text-center py-20 text-stone-500">
                    No products found matching your criteria.
                </div>
            )}
        </div>
    );
};

// --- Product Detail Page ---
export const ProductDetailPage: React.FC = () => {
    const { id } = useParams();
    const { addToCart, reviews, addReview, wishlist, toggleWishlist } = React.useContext(CartContext);
    const product = PRODUCTS.find(p => p.id === Number(id));

    // Local state for review form
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewText, setReviewText] = useState("");
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);
    const [userName, setUserName] = useState("");

    // Variant State
    const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: any }>({});
    const [finalPrice, setFinalPrice] = useState(product?.price || 0);

    useEffect(() => {
        if (product) {
            // Initialize variants
            const initial: any = {};
            product.variants?.forEach(v => {
                initial[v.name] = v.options[0];
            });
            setSelectedVariants(initial);
        }
    }, [product]);

    useEffect(() => {
        if (product) {
            let price = product.isFlashSale ? (product.flashSalePrice || product.price) : product.price;
            Object.values(selectedVariants).forEach((opt: any) => {
                price += opt.priceModifier || 0;
            });
            setFinalPrice(price);
        }
    }, [selectedVariants, product]);

    if (!product) return <div className="p-20 text-center">Product not found</div>;

    const productReviews = reviews.filter(r => r.productId === product.id);
    const isWishlisted = wishlist.includes(product.id);

    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmittingReview(true);
        // Simulate API call
        setTimeout(() => {
            addReview({
                id: Date.now(),
                productId: product.id,
                user: userName || "Guest",
                comment: reviewText,
                rating: reviewRating,
                date: new Date().toISOString().split('T')[0]
            });
            setReviewText("");
            setUserName("");
            setReviewRating(5);
            setIsSubmittingReview(false);
        }, 1000);
    };

    // Dummy logic for Frequently Bought Together
    const relatedProducts = product.id === 1
        ? PRODUCTS.filter(p => [3, 4].includes(p.id))
        : PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                <div className="rounded-3xl overflow-hidden shadow-lg bg-white">
                    <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                    <span className="text-amber-600 font-bold uppercase tracking-wider mb-2">{product.category}</span>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6">{product.name}</h1>
                    <div className="flex items-center gap-4 mb-6">
                        {product.isFlashSale ? (
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold text-red-600">Rp {finalPrice.toLocaleString('id-ID')}</span>
                                <span className="text-lg text-stone-400 line-through">Rp {product.price.toLocaleString('id-ID')}</span>
                            </div>
                        ) : (
                            <span className="text-3xl font-bold text-stone-900">Rp {finalPrice.toLocaleString('id-ID')}</span>
                        )}
                        <div className="flex items-center gap-1 text-amber-500">
                            <Star className="fill-current w-5 h-5" />
                            <span className="text-stone-700 font-medium">{product.rating} ({product.reviews} reviews)</span>
                        </div>
                        <div className={`px - 3 py - 1 rounded - full text - sm font - bold ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} `}>
                            {product.stock > 0 ? `In Stock(${product.stock})` : 'Out of Stock'}
                        </div>
                    </div>
                    <p className="text-stone-600 text-lg leading-relaxed mb-8">{product.description}</p>

                    <div className="mb-8">
                        <h3 className="font-bold text-stone-900 mb-3">Ingredients</h3>
                        <div className="flex flex-wrap gap-2">
                            {product.ingredients.map((ing, i) => (
                                <span key={i} className="px-3 py-1 bg-stone-100 text-stone-600 rounded-full text-sm">{ing}</span>
                            ))}
                        </div>
                    </div>

                    {/* Variants Selection */}
                    {product.variants && product.variants.length > 0 && (
                        <div className="mb-8 space-y-4">
                            {product.variants.map((variant, i) => (
                                <div key={i}>
                                    <h3 className="font-bold text-stone-900 mb-2">{variant.name}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {variant.options.map((opt, j) => (
                                            <button
                                                key={j}
                                                onClick={() => setSelectedVariants(prev => ({ ...prev, [variant.name]: opt }))}
                                                className={`px - 4 py - 2 rounded - lg border text - sm font - medium transition ${selectedVariants[variant.name]?.label === opt.label
                                                    ? 'border-amber-600 bg-amber-50 text-amber-700'
                                                    : 'border-stone-200 text-stone-600 hover:border-amber-300'
                                                    } `}
                                            >
                                                {opt.label} {opt.priceModifier > 0 && `(+Rp ${opt.priceModifier.toLocaleString()})`}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex gap-4">
                        <button
                            onClick={() => addToCart({ ...product, price: finalPrice, selectedVariants: Object.fromEntries(Object.entries(selectedVariants).map(([k, v]: any) => [k, v.label])) })}
                            disabled={product.stock === 0 || (product.isPreOrder && !product.preOrderDate)}
                            className={`flex - 1 px - 10 py - 4 text - white font - bold rounded - full shadow - xl transition transform hover: -translate - y - 1 flex items - center justify - center gap - 3 ${product.stock > 0 ? (product.isPreOrder ? 'bg-blue-600 hover:bg-blue-700' : 'bg-amber-600 hover:bg-amber-700') : 'bg-stone-400 cursor-not-allowed'} `}
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {product.stock > 0 ? (product.isPreOrder ? `Pre - Order(Ships ${product.preOrderDate})` : 'Add to Cart') : 'Out of Stock'}
                        </button>
                        <button
                            onClick={() => window.open(`https://wa.me/6281234567890?text=Halo%20KayuManis%20Bakery,%20saya%20mau%20pesan%20${encodeURIComponent(product.name)}`, '_blank')}
                            className="px-6 py-4 bg-green-500 text-white font-bold rounded-full shadow-xl hover:bg-green-600 transition transform hover:-translate-y-1 flex items-center justify-center gap-2"
                            title="Pesan via WhatsApp"
                        >
                            <Phone className="w-5 h-5" />
                        </button >
                        <button
                            onClick={() => toggleWishlist(product.id)}
                            className={`px-4 py-4 rounded-full border-2 transition transform hover:-translate-y-1 flex items-center justify-center ${isWishlisted ? 'border-red-200 bg-red-50 text-red-500' : 'border-stone-200 text-stone-400 hover:border-red-200 hover:text-red-500'}`}
                            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                        >
                            <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
                        </button>
                    </div >
                </div >
            </div >

            {/* Reviews Section */}
            < div className="max-w-4xl mx-auto mb-20" >
                <h2 className="text-3xl font-serif font-bold text-stone-900 mb-8 pb-4 border-b border-stone-200">Customer Reviews</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Review List */}
                    <div className="space-y-6">
                        {productReviews.length > 0 ? (
                            productReviews.map(r => (
                                <div key={r.id} className="bg-white p-6 rounded-xl border border-stone-100 shadow-sm">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="font-bold text-stone-900">{r.user}</div>
                                        <div className="text-xs text-stone-400">{r.date}</div>
                                    </div>
                                    <div className="flex gap-1 mb-3 text-amber-500">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-4 h-4 ${i < r.rating ? 'fill-current' : 'text-stone-300'}`} />
                                        ))}
                                    </div>
                                    <p className="text-stone-600 italic">"{r.comment}"</p>
                                </div>
                            ))
                        ) : (
                            <div className="text-stone-500 italic">No reviews yet. Be the first to review!</div>
                        )}
                    </div>

                    {/* Review Form */}
                    <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100 h-fit">
                        <h3 className="text-xl font-bold text-stone-900 mb-4">Write a Review</h3>
                        <form onSubmit={handleSubmitReview} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-stone-700 mb-1">Your Name</label>
                                <input
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-stone-700 mb-1">Rating</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setReviewRating(star)}
                                            className="focus:outline-none"
                                        >
                                            <Star className={`w-6 h-6 ${star <= reviewRating ? 'fill-amber-500 text-amber-500' : 'text-stone-300'}`} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-stone-700 mb-1">Comment</label>
                                <textarea
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-2 rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-amber-500 outline-none"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmittingReview}
                                className="w-full bg-stone-900 text-white py-3 rounded-lg font-bold hover:bg-stone-800 transition disabled:opacity-50"
                            >
                                {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                            </button>
                        </form>
                    </div>
                </div>
            </div >

            {/* Frequently Bought Together */}
            < div className="border-t border-stone-200 pt-16" >
                <h2 className="text-3xl font-serif font-bold text-stone-900 mb-8 text-center">Frequently Bought Together</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {relatedProducts.map(p => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </div >
        </div >
    );
};

// --- Profile / Auth Page ---
export const ProfilePage: React.FC = () => {
    const { userPoints, wishlist } = React.useContext(CartContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Mock user data
    const user = {
        name: "John Doe",
        email: "john@example.com",
        history: [
            {
                id: "#ORD-992",
                date: "2023-10-15",
                total: 150000,
                status: "Delivered",
                trackingNumber: "JNE-88219321",
                estimatedDelivery: "2023-10-17",
                deliveryMethod: "Delivery"
            }
        ]
    };

    const wishlistProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

    if (!isLoggedIn) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-stone-100">
                    <h2 className="text-3xl font-serif font-bold text-center mb-6 text-stone-800">Welcome Back</h2>
                    <p className="text-center text-stone-500 mb-8">Login to manage your orders and points.</p>

                    {/* Toggle Login/Register */}
                    <div className="flex bg-stone-100 p-1 rounded-lg mb-6">
                        <button className="flex-1 py-2 rounded-md bg-white shadow-sm font-bold text-stone-800">Login</button>
                        <button className="flex-1 py-2 rounded-md text-stone-500 font-medium hover:text-stone-800">Register</button>
                    </div>

                    <div className="space-y-4">
                        <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-lg bg-stone-50 border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none" />
                        <input type="password" placeholder="Password" className="w-full px-4 py-3 rounded-lg bg-stone-50 border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none" />
                        <button onClick={() => setIsLoggedIn(true)} className="w-full bg-amber-600 text-white py-3 rounded-lg font-bold hover:bg-amber-700 transition">Login</button>
                        <button className="w-full bg-white border border-stone-300 text-stone-700 py-3 rounded-lg font-bold hover:bg-stone-50 transition flex items-center justify-center gap-2">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                            Continue with Google
                        </button>
                    </div>
                    <div className="mt-6 text-center">
                        <button className="text-stone-400 text-sm hover:text-amber-600">Forgot Password?</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-serif font-bold text-stone-900">My Profile</h1>
                <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-2 text-red-500 hover:text-red-700 font-medium">
                    <LogOut className="w-5 h-5" /> Logout
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Info Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 h-fit">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-2xl font-bold text-amber-600">
                            {user.name.charAt(0)}
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-stone-900">{user.name}</h3>
                            <p className="text-sm text-stone-500">{user.email}</p>
                        </div>
                    </div>
                    <div className="bg-amber-50 p-6 rounded-xl border border-amber-100 text-center">
                        <div className="w-12 h-12 bg-amber-200 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-2">
                            <UserIcon className="w-6 h-6" />
                        </div>
                        <div className="text-sm text-amber-800 font-medium mb-1 uppercase tracking-wide">Loyalty Points</div>
                        <div className="text-4xl font-bold text-amber-600">{userPoints}</div>
                        <p className="text-xs text-amber-600/70 mt-2">Earn 1 point for every Rp 10.000 spent</p>
                    </div>
                </div>

                {/* Order History & Wishlist */}
                <div className="md:col-span-2 space-y-8">
                    {/* Order History */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                        <h3 className="font-bold text-lg text-stone-900 mb-6">Order History</h3>
                        <div className="space-y-6">
                            {user.history.map((order: any) => (
                                <div key={order.id} className="border border-stone-100 rounded-xl p-6 hover:bg-stone-50 transition">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <span className="font-bold text-lg text-stone-800">{order.id}</span>
                                                <span className="text-sm text-stone-500">{order.date}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-stone-900 text-lg">Rp {order.total.toLocaleString()}</div>
                                            <div className="text-xs text-stone-500 uppercase tracking-wide">{order.deliveryMethod}</div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-stone-500 bg-stone-100 px-3 py-1 rounded inline-block">
                                        Status: <span className="font-bold">{order.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Wishlist Section */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                        <h3 className="font-bold text-lg text-stone-900 mb-6 flex items-center gap-2">
                            <Heart className="w-5 h-5 text-red-500 fill-current" /> My Wishlist
                        </h3>
                        {wishlistProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {wishlistProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-stone-500">
                                <Heart className="w-12 h-12 mx-auto mb-3 text-stone-300" />
                                <p>Your wishlist is empty.</p>
                                <Link to="/menu" className="text-amber-600 font-bold hover:underline mt-2 inline-block">Browse Menu</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- FAQ Page (New) ---
export const FAQPage: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const categories = [
        {
            title: "Ordering & Payment",
            items: [
                { q: "How can I place an order?", a: "You can place an order directly through our website by adding items to your cart and proceeding to checkout. Alternatively, you can visit our store in Jakarta." },
                { q: "What payment methods do you accept?", a: "We accept various payment methods including Credit Cards (Stripe), PayPal, QRIS (Transfer), and Cash on Delivery (COD)." },
                { q: "Can I cancel my order?", a: "Orders can be canceled within 15 minutes of placement. After that, we begin processing your fresh baked goods and cannot accept cancellations." }
            ]
        },
        {
            title: "Delivery",
            items: [
                { q: "Where do you deliver?", a: "We currently deliver to the greater Jakarta area. Shipping costs are calculated at checkout based on your location." },
                { q: "How long does delivery take?", a: "Standard delivery typically takes 30-45 minutes depending on traffic and your distance from our bakery." },
                { q: "Is pickup available?", a: "Yes! You can choose the 'Pickup' option at checkout to collect your order from our store for free." }
            ]
        },
        {
            title: "Ingredients & Dietary",
            items: [
                { q: "Are your products Halal?", a: "Yes, all our ingredients are 100% Halal certified. We do not use any alcohol or non-halal gelatin in our products." },
                { q: "Do you have gluten-free options?", a: "We have a limited selection of gluten-free items. Please check the 'Ingredients' section on the product page or ask our AI Assistant." },
                { q: "Do you use preservatives?", a: "No, we pride ourselves on baking fresh every morning. Our breads and cakes contain no artificial preservatives." }
            ]
        },
        {
            title: "Bakery Operations",
            items: [
                { q: "What are your opening hours?", a: "We are open Monday to Friday from 07:00 to 21:00, and Saturday to Sunday from 08:00 to 22:00." },
                { q: "Do you make custom cakes?", a: "Yes, we do! For custom birthday or wedding cakes, please contact us directly via phone or visit us in store at least 3 days in advance." }
            ]
        }
    ];

    const toggleQuestion = (catIndex: number, itemIndex: number) => {
        const uniqueId = catIndex * 100 + itemIndex;
        setOpenIndex(openIndex === uniqueId ? null : uniqueId);
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-16 animate-fade-in">
            <h1 className="text-4xl font-serif font-bold text-center text-stone-900 mb-4">Frequently Asked Questions</h1>
            <p className="text-center text-stone-500 mb-12">Find answers to common questions about our bakery, products, and services.</p>

            <div className="space-y-8">
                {categories.map((cat, catIdx) => (
                    <div key={catIdx}>
                        <h2 className="text-xl font-bold text-amber-800 mb-4 border-b border-amber-100 pb-2">{cat.title}</h2>
                        <div className="space-y-3">
                            {cat.items.map((item, itemIdx) => {
                                const uniqueId = catIdx * 100 + itemIdx;
                                const isOpen = openIndex === uniqueId;
                                return (
                                    <div key={itemIdx} className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm hover:border-amber-200 transition">
                                        <button
                                            onClick={() => toggleQuestion(catIdx, itemIdx)}
                                            className="w-full px-6 py-4 flex justify-between items-center bg-stone-50 hover:bg-white transition text-left"
                                        >
                                            <span className="font-bold text-stone-800 text-sm md:text-base pr-4">{item.q}</span>
                                            {isOpen ? <ChevronUp className="w-5 h-5 text-amber-600 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-stone-400 flex-shrink-0" />}
                                        </button>
                                        {isOpen && (
                                            <div className="px-6 py-4 text-stone-600 bg-white border-t border-stone-100 leading-relaxed text-sm">
                                                {item.a}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-16 text-center bg-amber-50 p-8 rounded-2xl border border-amber-100">
                <HelpCircle className="w-10 h-10 text-amber-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg text-stone-900 mb-2">Still have questions?</h3>
                <p className="text-stone-600 mb-6">Can't find what you're looking for? Our team is here to help.</p>
                <div className="flex justify-center gap-4">
                    <button className="bg-white text-stone-800 border border-stone-300 px-6 py-2 rounded-full font-bold hover:bg-stone-50 transition text-sm">
                        Contact Support
                    </button>
                    <button className="bg-amber-600 text-white px-6 py-2 rounded-full font-bold hover:bg-amber-700 transition text-sm">
                        Chat with Us
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Checkout Page ---
export const CheckoutPage: React.FC = () => {
    const { cart, total, discountAmount, clearCart, addPoints } = React.useContext(CartContext);
    const [step, setStep] = useState<'cart' | 'success'>('cart');

    // Delivery State
    const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('delivery');
    const [address, setAddress] = useState("");
    const [shippingCost, setShippingCost] = useState(0);
    const [deliveryDate, setDeliveryDate] = useState("");
    const [deliveryTime, setDeliveryTime] = useState("");

    // Payment State
    const [paymentMethod, setPaymentMethod] = useState<'qris' | 'cod' | 'paypal' | 'stripe'>('qris');

    // Dynamic Shipping Calculation based on address keywords
    useEffect(() => {
        if (deliveryMethod === 'pickup') {
            setShippingCost(0);
        } else {
            // Default base fee
            let fee = 15000;
            const addr = address.toLowerCase();

            if (addr.length > 5) {
                if (addr.includes('jakarta selatan')) {
                    fee = 10000; // Local rate
                } else if (addr.includes('jakarta')) {
                    fee = 20000; // General Jakarta
                } else if (['bogor', 'depok', 'tangerang', 'bekasi'].some(city => addr.includes(city))) {
                    fee = 30000; // Bodetabek
                } else {
                    fee = 25000; // Other / Long distance within range
                }
            }
            setShippingCost(fee);
        }
    }, [deliveryMethod, address]);

    if (step === 'success') {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center animate-fade-in">
                <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
                <h2 className="text-4xl font-serif font-bold text-stone-900 mb-4">Order Confirmed!</h2>
                <p className="text-lg text-stone-600 max-w-md">Thank you for ordering. Your fresh treats will be ready soon. We have sent the details to your email/WhatsApp.</p>
                <Link to="/" className="mt-8 px-8 py-3 bg-amber-600 text-white rounded-full font-bold hover:bg-amber-700 transition">Back to Home</Link>
            </div>
        );
    }

    const grandTotal = total - discountAmount + shippingCost;

    const handlePlaceOrder = () => {
        // Calculate points (e.g., 1 point per 10,000 IDR)
        const earnedPoints = Math.floor(grandTotal / 10000);
        addPoints(earnedPoints);

        clearCart();
        setStep('success');
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-serif font-bold text-stone-900 mb-8">Checkout</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                    {/* Delivery Options */}
                    <div>
                        <h3 className="font-bold text-lg text-stone-800 mb-4">Delivery Method</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setDeliveryMethod('delivery')}
                                className={`p-4 rounded-xl border-2 flex flex-col items-center text-center transition ${deliveryMethod === 'delivery' ? 'border-amber-600 bg-amber-50' : 'border-stone-100 hover:border-stone-200'
                                    }`}
                            >
                                <Truck className={`w-8 h-8 mb-2 ${deliveryMethod === 'delivery' ? 'text-amber-600' : 'text-stone-400'}`} />
                                <span className="font-bold text-stone-900">Delivery</span>
                                <span className="text-xs text-stone-500 mt-1">From Rp 10.000</span>
                                {deliveryMethod === 'delivery' && (
                                    <span className="text-xs font-bold text-amber-600 mt-2 bg-amber-50 px-2 py-1 rounded">
                                        Current: Rp {shippingCost.toLocaleString()}
                                    </span>
                                )}
                            </button>
                            <button
                                onClick={() => setDeliveryMethod('pickup')}
                                className={`p-4 rounded-xl border-2 flex flex-col items-center text-center transition ${deliveryMethod === 'pickup' ? 'border-amber-600 bg-amber-50' : 'border-stone-100 hover:border-stone-200'
                                    }`}
                            >
                                <Store className={`w-8 h-8 mb-2 ${deliveryMethod === 'pickup' ? 'text-amber-600' : 'text-stone-400'}`} />
                                <span className="font-bold text-stone-900">Pickup</span>
                                <span className="text-xs text-stone-500 mt-1">Ready in 1 Hour</span>
                                <span className="text-sm font-bold text-green-600 mt-2">Free</span>
                            </button>
                        </div>
                    </div>

                    {/* Delivery Slots (New) */}
                    {deliveryMethod === 'delivery' && (
                        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                            <h3 className="font-bold text-lg text-stone-800 mb-4 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-amber-600" /> Delivery Slot
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-stone-600 mb-1">Date</label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                                        value={deliveryDate}
                                        onChange={(e) => setDeliveryDate(e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-stone-600 mb-1">Time</label>
                                    <select
                                        className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                                        value={deliveryTime}
                                        onChange={(e) => setDeliveryTime(e.target.value)}
                                    >
                                        <option value="">Select Time</option>
                                        <option value="09:00 - 12:00">Morning (09:00 - 12:00)</option>
                                        <option value="13:00 - 16:00">Afternoon (13:00 - 16:00)</option>
                                        <option value="17:00 - 20:00">Evening (17:00 - 20:00)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Address Input */}
                    {deliveryMethod === 'delivery' && (
                        <div>
                            <h3 className="font-bold text-lg text-stone-800 mb-4">Shipping Address</h3>
                            <textarea
                                placeholder="Enter your full address (include city for accurate shipping calculation)..."
                                className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none h-32"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            ></textarea>
                            <p className="text-sm text-stone-500 mt-2">
                                *Shipping cost calculated based on location keywords (e.g., "Jakarta Selatan", "Bogor").
                            </p>
                        </div>
                    )}

                    {/* Customer Info */}
                    <div>
                        <h3 className="font-bold text-lg text-stone-800 mb-4">Contact & Address</h3>
                        <div className="space-y-4">
                            <input type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-stone-50 focus:ring-2 focus:ring-amber-500 outline-none transition" />
                            <input type="text" placeholder="Phone Number / WhatsApp" className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-stone-50 focus:ring-2 focus:ring-amber-500 outline-none transition" />
                        </div>
                    </div>
                </div>

                {/* Payment Method */}
                <div>
                    <h3 className="font-bold text-lg text-stone-800 mb-4">Payment Method</h3>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        {[
                            { id: 'qris', label: 'QRIS / Transfer', icon: <Banknote className="w-5 h-5" /> },
                            { id: 'paypal', label: 'PayPal', icon: <span className="font-bold italic text-blue-700">Pay<span className="text-blue-500">Pal</span></span> },
                            { id: 'stripe', label: 'Stripe', icon: <CreditCard className="w-5 h-5" /> },
                            { id: 'cod', label: 'COD (Cash)', icon: <Banknote className="w-5 h-5" /> },
                        ].map(method => (
                            <button
                                key={method.id}
                                onClick={() => setPaymentMethod(method.id as any)}
                                className={`px-4 py-3 rounded-lg border flex items-center justify-center gap-2 font-medium transition ${paymentMethod === method.id
                                    ? 'border-amber-600 bg-amber-50 text-amber-800 shadow-sm'
                                    : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                                    }`}
                            >
                                {method.icon}
                                {typeof method.icon !== 'string' ? <span>{method.label}</span> : null}
                            </button>
                        ))}
                    </div>

                    {/* Integration UI Forms */}
                    {paymentMethod === 'stripe' && (
                        <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 animate-fade-in">
                            <h4 className="text-sm font-bold text-stone-700 mb-3 flex items-center gap-2">
                                <CreditCard className="w-4 h-4" /> Credit/Debit Card
                            </h4>
                            <div className="space-y-3">
                                <input type="text" placeholder="Card Number" className="w-full px-3 py-2 border border-stone-200 rounded-md text-sm outline-none focus:border-amber-500" />
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-2.5 text-stone-400 w-4 h-4" />
                                        <input type="text" placeholder="MM/YY" className="w-full pl-9 pr-3 py-2 border border-stone-200 rounded-md text-sm outline-none focus:border-amber-500" />
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-2.5 text-stone-400 w-4 h-4" />
                                        <input type="text" placeholder="CVC" className="w-full pl-9 pr-3 py-2 border border-stone-200 rounded-md text-sm outline-none focus:border-amber-500" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {paymentMethod === 'paypal' && (
                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 animate-fade-in text-center">
                            <p className="text-sm text-blue-800 mb-3">You will be redirected to PayPal to complete your secure purchase.</p>
                            <button className="w-full bg-[#0070ba] text-white font-bold py-2 rounded-lg hover:bg-[#003087] transition">
                                Pay with PayPal
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Order Summary */}
            <div className="bg-stone-50 p-8 rounded-3xl h-fit border border-stone-100 shadow-sm">
                <h3 className="font-bold text-lg text-stone-800 mb-6">Order Summary</h3>
                <div className="space-y-4 mb-6">
                    {cart.map(item => (
                        <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-stone-600">{item.quantity}x {item.name}</span>
                            <span className="font-medium text-stone-900">Rp {(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                    ))}
                </div>

                <div className="border-t border-stone-200 pt-4 space-y-2 mb-8">
                    <div className="flex justify-between items-center text-stone-600">
                        <span>Subtotal</span>
                        <span>Rp {total.toLocaleString()}</span>
                    </div>
                    {discountAmount > 0 && (
                        <div className="flex justify-between items-center text-green-600">
                            <span>Discount</span>
                            <span>-Rp {discountAmount.toLocaleString()}</span>
                        </div>
                    )}
                    <div className="flex justify-between items-center text-stone-600">
                        <span>Delivery Fee</span>
                        <span>{shippingCost === 0 ? 'Free' : `Rp ${shippingCost.toLocaleString()}`}</span>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-stone-200">
                        <span className="font-bold text-xl text-stone-900">Total</span>
                        <span className="font-bold text-2xl text-amber-600">Rp {grandTotal.toLocaleString()}</span>
                    </div>
                    <div className="text-sm text-amber-600 mt-2 flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-600" />
                        You will earn {Math.floor(grandTotal / 10000)} points
                    </div>
                </div>

                <button
                    onClick={handlePlaceOrder}
                    className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-stone-800 transition active:scale-95 flex justify-center items-center gap-2 group"
                >
                    Place Order <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-center text-xs text-stone-400 mt-4 flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3" /> Secure payment encrypted via SSL.
                </p>
            </div>
        </div>
    );
};

// --- Custom Order Page (New) ---
export const CustomOrderPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in">
            <div className="text-center mb-12">
                <span className="text-amber-600 font-bold tracking-widest uppercase text-sm">Make It Special</span>
                <h1 className="text-4xl font-serif font-bold text-stone-900 mt-2 mb-4">Custom Cake Orders</h1>
                <p className="text-stone-500 max-w-2xl mx-auto">Design your dream cake for birthdays, weddings, or any special occasion. Fill out the form below and we'll get back to you with a quote.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-stone-100">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="bg-stone-900 text-white p-10 flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-serif font-bold mb-6">Why Choose Us?</h3>
                            <ul className="space-y-6">
                                <li className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center flex-shrink-0 font-bold">1</div>
                                    <div>
                                        <h4 className="font-bold text-lg">Premium Ingredients</h4>
                                        <p className="text-stone-400 text-sm">We use only the finest butter, chocolate, and fresh fruits.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center flex-shrink-0 font-bold">2</div>
                                    <div>
                                        <h4 className="font-bold text-lg">Custom Designs</h4>
                                        <p className="text-stone-400 text-sm">From elegant wedding cakes to fun character cakes for kids.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center flex-shrink-0 font-bold">3</div>
                                    <div>
                                        <h4 className="font-bold text-lg">Freshly Baked</h4>
                                        <p className="text-stone-400 text-sm">Baked on the day of delivery for maximum freshness.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="relative z-10 mt-12">
                            <p className="text-stone-400 text-sm">Need inspiration?</p>
                            <button className="text-amber-500 font-bold hover:text-amber-400 flex items-center gap-2 mt-2">
                                View Gallery <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="p-10">
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-stone-700 mb-2">Cake Size</label>
                                    <select className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none bg-white">
                                        <option>Diameter 16cm (4-6 pax)</option>
                                        <option>Diameter 20cm (8-10 pax)</option>
                                        <option>Diameter 24cm (12-15 pax)</option>
                                        <option>Square 20x20cm</option>
                                        <option>Custom Size</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-stone-700 mb-2">Base Flavor</label>
                                    <select className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none bg-white">
                                        <option>Vanilla Sponge</option>
                                        <option>Double Chocolate</option>
                                        <option>Red Velvet</option>
                                        <option>Mocha</option>
                                        <option>Cheese Cake</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-stone-700 mb-2">Theme / Design Request</label>
                                <textarea
                                    rows={3}
                                    placeholder="Describe the design, colors, or theme (e.g., 'Unicorn theme with pastel colors')..."
                                    className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none"
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-stone-700 mb-2">Date Needed</label>
                                    <input type="date" className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-stone-700 mb-2">Budget Range</label>
                                    <select className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none bg-white">
                                        <option>Rp 300k - 500k</option>
                                        <option>Rp 500k - 1jt</option>
                                        <option>Rp 1jt - 2jt</option>
                                        <option>Above Rp 2jt</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-stone-700 mb-2">Contact Info</label>
                                <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none mb-3" />
                                <input type="text" placeholder="WhatsApp Number" className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none" />
                            </div>

                            <button className="w-full bg-amber-600 text-white font-bold py-4 rounded-xl hover:bg-amber-700 transition shadow-lg transform hover:-translate-y-1">
                                Request Quote
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};



// --- Reseller Page (New) ---
export const ResellerPage: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-16 animate-fade-in">
            <div className="text-center mb-16">
                <span className="text-amber-600 font-bold tracking-widest uppercase text-sm">Business Opportunity</span>
                <h1 className="text-4xl font-serif font-bold text-stone-900 mt-2 mb-4">Join Our Reseller Program</h1>
                <p className="text-stone-500 max-w-2xl mx-auto">Start your own business with KayuManis Bakery. Get exclusive wholesale prices and marketing support.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Benefits */}
                <div className="space-y-8">
                    <div className="bg-amber-50 rounded-3xl p-8 border border-amber-100">
                        <h3 className="text-2xl font-serif font-bold text-stone-900 mb-6">Why Join Us?</h3>
                        <ul className="space-y-4">
                            {[
                                { title: "High Profit Margin", desc: "Up to 30% profit margin on every product." },
                                { title: "Marketing Support", desc: "Free high-quality photos and social media templates." },
                                { title: "Low Minimum Order", desc: "Start with just Rp 500.000 minimum purchase." },
                                { title: "Priority Production", desc: "Your orders get priority in our daily baking schedule." }
                            ].map((item, i) => (
                                <li key={i} className="flex gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 text-amber-600">
                                        <CheckCircle className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-stone-900">{item.title}</h4>
                                        <p className="text-stone-500 text-sm">{item.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-stone-900 text-white rounded-3xl p-8">
                        <h3 className="text-xl font-bold mb-4">Wholesale Pricing Example</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-stone-400 border-b border-stone-700">
                                    <tr>
                                        <th className="pb-3">Product</th>
                                        <th className="pb-3">Retail</th>
                                        <th className="pb-3">Reseller</th>
                                        <th className="pb-3">Profit</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-stone-800">
                                    <tr>
                                        <td className="py-3">Roti Sobek</td>
                                        <td className="py-3">25k</td>
                                        <td className="py-3 text-green-400 font-bold">18k</td>
                                        <td className="py-3">7k</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3">Choco Lava</td>
                                        <td className="py-3">85k</td>
                                        <td className="py-3 text-green-400 font-bold">60k</td>
                                        <td className="py-3">25k</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3">Nastar Box</td>
                                        <td className="py-3">120k</td>
                                        <td className="py-3 text-green-400 font-bold">90k</td>
                                        <td className="py-3">30k</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Registration Form */}
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-stone-100">
                    <h3 className="text-2xl font-serif font-bold text-stone-900 mb-6">Register Now</h3>
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-stone-700 mb-1">First Name</label>
                                <input type="text" className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-stone-700 mb-1">Last Name</label>
                                <input type="text" className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-stone-700 mb-1">Email Address</label>
                            <input type="email" className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-stone-700 mb-1">WhatsApp Number</label>
                            <input type="tel" className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-stone-700 mb-1">Business Name (Optional)</label>
                            <input type="text" className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-stone-700 mb-1">Business Location (City)</label>
                            <input type="text" className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-stone-700 mb-1">Tell us about your plan</label>
                            <textarea rows={3} className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none"></textarea>
                        </div>
                        <button className="w-full bg-amber-600 text-white font-bold py-4 rounded-xl hover:bg-amber-700 transition shadow-lg mt-4">
                            Submit Application
                        </button>
                        <p className="text-xs text-center text-stone-400 mt-4">
                            By submitting, you agree to our Reseller Terms & Conditions.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

// --- Admin Page (New) ---
export const AdminPage: React.FC = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [password, setPassword] = useState("");
    const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'staff' | 'kitchen'>('overview');

    // Mock Product Management
    const [adminProducts, setAdminProducts] = useState(PRODUCTS);
    const [isEditing, setIsEditing] = useState<Product | null>(null);
    const [sortKey, setSortKey] = useState<keyof Product>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    // Mock Staff & Kitchen
    const [staffList, setStaffList] = useState(STAFF);
    const [kitchenTasks, setKitchenTasks] = useState(KITCHEN_TASKS);

    const handleLogin = () => {
        if (password === "admin123") {
            setIsAdmin(true);
        } else {
            alert("Invalid password");
        }
    };

    const sortedProducts = useMemo(() => {
        let sortableProducts = [...adminProducts];
        if (sortKey) {
            sortableProducts.sort((a, b) => {
                const aValue = a[sortKey];
                const bValue = b[sortKey];

                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
                }
                if (typeof aValue === 'number' && typeof bValue === 'number') {
                    return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
                }
                return 0;
            });
        }
        return sortableProducts;
    }, [adminProducts, sortKey, sortDirection]);

    const handleSort = (key: keyof Product) => {
        if (sortKey === key) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDirection('asc');
        }
    };

    if (!isAdmin) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-4 animate-fade-in">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full border border-stone-100 text-center">
                    <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">Admin Access</h2>
                    <input
                        type="password"
                        placeholder="Enter Admin Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-stone-200 mb-4 focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                    <button onClick={handleLogin} className="w-full bg-stone-900 text-white py-2 rounded-lg font-bold hover:bg-stone-800 transition">Login</button>
                    <p className="text-xs text-stone-400 mt-4">Hint: admin123</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-serif font-bold text-stone-900">Admin Dashboard</h1>
                <div className="flex gap-4">
                    <div className="flex bg-stone-100 p-1 rounded-lg">
                        {['overview', 'products', 'orders', 'staff', 'kitchen'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`px-4 py-2 rounded-md text-sm font-bold capitalize transition ${activeTab === tab ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500 hover:text-stone-700'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <button onClick={() => setIsAdmin(false)} className="text-red-500 font-bold hover:underline">Logout</button>
                </div>
            </div>

            {activeTab === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                        <div className="text-stone-400 text-sm font-bold uppercase mb-2">Total Sales</div>
                        <div className="text-3xl font-bold text-stone-900">Rp 15.4M</div>
                        <div className="text-green-500 text-sm mt-1 flex items-center gap-1"><ArrowUpRight className="w-4 h-4" /> +12% vs last month</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                        <div className="text-stone-400 text-sm font-bold uppercase mb-2">Active Orders</div>
                        <div className="text-3xl font-bold text-stone-900">24</div>
                        <div className="text-amber-500 text-sm mt-1">8 pending delivery</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                        <div className="text-stone-400 text-sm font-bold uppercase mb-2">Low Stock Items</div>
                        <div className="text-3xl font-bold text-stone-900">{adminProducts.filter(p => p.stock < 10).length}</div>
                        <div className="text-red-500 text-sm mt-1">Needs restock</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                        <div className="text-stone-400 text-sm font-bold uppercase mb-2">Active Staff</div>
                        <div className="text-3xl font-bold text-stone-900">{staffList.filter(s => s.status === 'Active' || s.status === 'Busy').length}</div>
                        <div className="text-blue-500 text-sm mt-1">On duty</div>
                    </div>
                </div>
            )}

            {
                activeTab === 'products' && (
                    <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
                        <div className="p-6 border-b border-stone-100 flex justify-between items-center">
                            <h3 className="font-bold text-lg text-stone-900">Product Management</h3>
                            <button className="bg-stone-900 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-stone-800 transition flex items-center gap-2">
                                <Plus className="w-4 h-4" /> Add Product
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-stone-50 text-stone-500 font-bold uppercase">
                                    <tr>
                                        <th className="px-6 py-4">Product</th>
                                        <th className="px-6 py-4">Category</th>
                                        <th className="px-6 py-4">Price</th>
                                        <th className="px-6 py-4">Stock</th>
                                        <th className="px-6 py-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-stone-100">
                                    {adminProducts.map((p) => (
                                        <tr key={p.id} className="hover:bg-stone-50 transition">
                                            <td className="px-6 py-4 flex items-center gap-3">
                                                <img src={p.image} className="w-10 h-10 rounded object-cover bg-stone-200" alt={p.name} />
                                                <span className="font-bold text-stone-800">{p.name}</span>
                                            </td>
                                            <td className="px-6 py-4">{p.category}</td>
                                            <td className="px-6 py-4">Rp {p.price.toLocaleString()}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${p.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {p.stock}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 flex gap-2">
                                                <button className="text-stone-500 hover:text-amber-600"><Eye className="w-4 h-4" /></button>
                                                <button className="text-stone-500 hover:text-blue-600"><CheckCircle className="w-4 h-4" /></button>
                                                <button className="text-stone-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

// --- Subscription Page (New) ---
export const SubscriptionPage: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-16 animate-fade-in">
            <div className="text-center mb-16">
                <span className="text-amber-600 font-bold tracking-widest uppercase text-sm">Join the Club</span>
                <h1 className="text-4xl font-serif font-bold text-stone-900 mt-2 mb-4">KayuManis Monthly Box</h1>
                <p className="text-stone-500 max-w-2xl mx-auto">Get a curated selection of our best pastries delivered to your door every month. Save up to 20% and get exclusive treats.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { name: "Starter Box", price: "150.000", items: "3-4 Items", desc: "Perfect for individuals.", color: "bg-stone-100", btn: "bg-stone-900" },
                    { name: "Family Box", price: "350.000", items: "8-10 Items", desc: "Enough for the whole family.", color: "bg-amber-100", btn: "bg-amber-600", popular: true },
                    { name: "Office Party", price: "800.000", items: "20+ Items", desc: "Great for office meetings.", color: "bg-stone-900 text-white", btn: "bg-white text-stone-900" }
                ].map((plan, i) => (
                    <div key={i} className={`rounded-3xl p-8 relative ${plan.color} ${plan.popular ? 'transform scale-105 shadow-2xl' : 'border border-stone-200'}`}>
                        {plan.popular && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                                Most Popular
                            </div>
                        )}
                        <h3 className={`text-2xl font-serif font-bold mb-2 ${plan.color.includes('text-white') ? 'text-white' : 'text-stone-900'}`}>{plan.name}</h3>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-sm font-bold opacity-60">Rp</span>
                            <span className={`text-4xl font-bold ${plan.color.includes('text-white') ? 'text-white' : 'text-stone-900'}`}>{plan.price}</span>
                            <span className="text-sm font-bold opacity-60">/mo</span>
                        </div>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3">
                                <CheckCircle className={`w-5 h-5 ${plan.color.includes('text-white') ? 'text-amber-400' : 'text-amber-600'}`} />
                                <span className="font-bold">{plan.items}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle className={`w-5 h-5 ${plan.color.includes('text-white') ? 'text-amber-400' : 'text-amber-600'}`} />
                                <span>Free Delivery</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle className={`w-5 h-5 ${plan.color.includes('text-white') ? 'text-amber-400' : 'text-amber-600'}`} />
                                <span>Cancel Anytime</span>
                            </li>
                            <li className="flex items-center gap-3 opacity-80">
                                <span className="w-5 h-5 flex items-center justify-center text-xs font-bold border rounded-full border-current">i</span>
                                <span>{plan.desc}</span>
                            </li>
                        </ul>
                        <button className={`w-full py-4 rounded-xl font-bold transition transform hover:-translate-y-1 shadow-lg ${plan.btn}`}>
                            Subscribe Now
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-20 bg-stone-50 rounded-3xl p-12 text-center">
                <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div>
                        <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center mx-auto mb-6 text-amber-600">
                            <Calendar className="w-8 h-8" />
                        </div>
                        <h3 className="font-bold text-xl mb-2">1. Choose Plan</h3>
                        <p className="text-stone-500">Select the box size that fits your needs.</p>
                    </div>
                    <div>
                        <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center mx-auto mb-6 text-amber-600">
                            <Package className="w-8 h-8" />
                        </div>
                        <h3 className="font-bold text-xl mb-2">2. We Curate</h3>
                        <p className="text-stone-500">Our chefs pick the freshest seasonal treats.</p>
                    </div>
                    <div>
                        <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center mx-auto mb-6 text-amber-600">
                            <Truck className="w-8 h-8" />
                        </div>
                        <h3 className="font-bold text-xl mb-2">3. Delivered</h3>
                        <p className="text-stone-500">Enjoy fresh pastries at your doorstep.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
