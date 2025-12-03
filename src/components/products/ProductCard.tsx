import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Eye, Heart, Zap } from 'lucide-react';
import { Product } from '../../../types';
import { CartContext } from '../../context/CartContext';
import { InventoryAllocator } from '../../core/catalogue/InventoryAllocator';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const { addToCart, wishlist, toggleWishlist } = useContext(CartContext);
    const navigate = useNavigate();
    const isWishlisted = wishlist.includes(product.id);
    const stock = InventoryAllocator.getInstance().getAvailableStock(product.id);

    return (
        <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 flex flex-col h-full relative overflow-hidden">
            <div className="relative aspect-square cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                <img src={product.image} alt={product.name} loading="lazy" className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
                {stock === 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                        <span className="bg-red-600 text-white font-bold px-4 py-2 rounded-full transform -rotate-12 border-2 border-white shadow-lg">OUT OF STOCK</span>
                    </div>
                )}
                <button onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }} className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-all z-10 ${isWishlisted ? 'bg-white text-red-500' : 'bg-white/80 text-stone-400 hover:text-red-500'}`}>
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <div className="text-xs text-amber-600 font-bold mb-1 uppercase tracking-wide">{product.category}</div>
                <h3 className="text-lg font-bold text-stone-800 mb-2 cursor-pointer hover:text-amber-700" onClick={() => navigate(`/product/${product.id}`)}>{product.name}</h3>
                <div className="flex items-center justify-between mt-auto pt-4">
                    <span className="text-lg font-bold text-stone-900">Rp {product.price.toLocaleString('id-ID')}</span>
                    <button onClick={(e) => { e.stopPropagation(); if (stock > 0) addToCart(product); }} disabled={stock === 0} className={`flex items-center gap-2 px-4 py-2 rounded-full transition shadow-lg ${stock > 0 ? 'bg-stone-900 text-white hover:bg-amber-600' : 'bg-stone-300 text-stone-500 cursor-not-allowed'}`}>
                        <ShoppingCart className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};
