import React, { useContext } from 'react';
import { X, Star, ShoppingCart } from 'lucide-react';
import { Product } from '../../../types';
import { CartContext } from '../../context/CartContext';
import { InventoryAllocator } from '../../core/catalogue/InventoryAllocator';

export const QuickViewModal: React.FC<{ product: Product; onClose: () => void }> = ({ product, onClose }) => {
    const { addToCart } = useContext(CartContext);
    const stock = InventoryAllocator.getInstance().getAvailableStock(product.id);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row animate-fade-in-up max-h-[90vh] md:h-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-white/80 rounded-full text-stone-500 hover:text-red-500 z-10 transition shadow-sm"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                    <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
                    <div className="mb-auto">
                        <div className="text-xs text-amber-600 font-bold mb-2 uppercase tracking-wide">{product.category}</div>
                        <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">{product.name}</h2>

                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-2xl font-bold text-stone-900">Rp {product.price.toLocaleString('id-ID')}</span>
                            <div className="flex items-center gap-1 text-amber-500 text-sm">
                                <Star className="fill-current w-4 h-4" />
                                <span className="text-stone-700 font-medium">{product.rating} ({product.reviews} reviews)</span>
                            </div>
                        </div>

                        <p className="text-stone-600 mb-6 leading-relaxed">{product.description}</p>

                        <div className="mb-8">
                            <h4 className="font-bold text-stone-900 mb-2 text-sm">Ingredients</h4>
                            <div className="flex flex-wrap gap-2">
                                {product.ingredients.map((ing, i) => (
                                    <span key={i} className="px-3 py-1 bg-stone-100 text-stone-600 rounded-full text-xs font-medium border border-stone-200">{ing}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            if (stock > 0) {
                                addToCart(product);
                                onClose();
                            }
                        }}
                        disabled={stock === 0}
                        className={`w-full text-white py-4 rounded-xl font-bold shadow-lg transition flex items-center justify-center gap-2 group ${stock > 0 ? 'bg-stone-900 hover:bg-amber-600' : 'bg-stone-400 cursor-not-allowed'}`}
                    >
                        <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Add to Cart
                    </button>
                    {stock === 0 && (
                        <p className="text-red-500 text-sm font-bold mt-2 text-center">Out of Stock</p>
                    )}
                </div>
            </div>
        </div>
    );
};
