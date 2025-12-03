import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Truck, Clock, Store, ChevronRight, Lock, CheckCircle, Banknote, CreditCard, Calendar, Trash2 } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { DeliveryGeofencing } from '../core/logistics/DeliveryGeofencing';
import { TransactionLedger } from '../core/commerce/TransactionLedger';
import { InventoryAllocator } from '../core/catalogue/InventoryAllocator';
import { NotificationEngine } from '../core/notifications/NotificationEngine';

export const CheckoutPage: React.FC = () => {
    const { cart, total, discountAmount, clearCart, addPoints, removeFromCart, updateQuantity } = useContext(CartContext);
    const navigate = useNavigate();
    const [step, setStep] = useState<'cart' | 'success'>('cart');

    // Engine Instances
    const logistics = React.useMemo(() => DeliveryGeofencing.getInstance(), []);
    const ledger = React.useMemo(() => TransactionLedger.getInstance(), []);
    const inventory = React.useMemo(() => InventoryAllocator.getInstance(), []);
    const notifier = React.useMemo(() => NotificationEngine.getInstance(), []);

    // State
    const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('delivery');
    const [address, setAddress] = useState("");
    const [shippingQuote, setShippingQuote] = useState({ fee: 0, distance: 0, zone: 'calculating...' });
    const [isProcessing, setIsProcessing] = useState(false);

    // Dynamic Geofencing Calculation
    useEffect(() => {
        if (deliveryMethod === 'pickup') {
            setShippingQuote({ fee: 0, distance: 0, zone: 'PICKUP' });
        } else if (address.length > 5) {
            const debounce = setTimeout(() => {
                const quote = logistics.calculateShippingQuote(address);
                setShippingQuote(quote);
            }, 500);
            return () => clearTimeout(debounce);
        }
    }, [deliveryMethod, address, logistics]);

    const grandTotal = total - discountAmount + shippingQuote.fee;

    const handlePlaceOrder = async () => {
        setIsProcessing(true);

        // 1. Check Inventory Reservations
        const outOfStockItems = cart.filter(item => {
            const stock = inventory.getAvailableStock(item.id);
            return stock < item.quantity;
        });

        if (outOfStockItems.length > 0) {
            alert(`Some items are out of stock: ${outOfStockItems.map(i => i.name).join(', ')}`);
            setIsProcessing(false);
            return;
        }

        // 2. Commit to Financial Ledger
        cart.forEach(item => {
            // Allocate Inventory
            inventory.allocateStock(item.id, item.quantity);
            // Record Debit
            ledger.commitTransaction(item);
        });

        // 3. Trigger Notification
        await notifier.dispatch(
            "customer@example.com",
            "EMAIL",
            "ORDER_CONFIRMED",
            { name: "Customer", orderId: ledger.getLedgerHistory().slice(-1)[0]?.traceId || "PENDING-ID", total: grandTotal }
        );

        // 4. Simulate API Latency
        await new Promise(resolve => setTimeout(resolve, 1500));

        const earnedPoints = Math.floor(grandTotal / 10000);
        addPoints(earnedPoints);
        clearCart();
        setStep('success');
        setIsProcessing(false);
    };

    if (step === 'success') {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center animate-fade-in">
                <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
                <h2 className="text-4xl font-serif font-bold text-stone-900 mb-4">Order Confirmed!</h2>
                <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 text-left max-w-md w-full mb-8">
                    <h3 className="font-bold text-stone-800 mb-2">Ledger Trace</h3>
                    <p className="font-mono text-xs text-stone-500 break-all">{ledger.getLedgerHistory().slice(-1)[0]?.hash || 'PENDING'}</p>
                </div>
                <Link to="/" className="px-8 py-3 bg-amber-600 text-white rounded-full font-bold hover:bg-amber-700 transition">Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-serif font-bold text-stone-900 mb-8">Secure Checkout</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                    {/* Delivery Section */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                        <h3 className="font-bold text-lg text-stone-800 mb-4 flex items-center gap-2">
                            <Truck className="w-5 h-5 text-amber-600" /> Logistics
                        </h3>

                        <div className="flex bg-stone-100 p-1 rounded-lg mb-6">
                            <button
                                onClick={() => setDeliveryMethod('delivery')}
                                className={`flex-1 py-3 rounded-md font-bold text-sm transition flex items-center justify-center gap-2 ${deliveryMethod === 'delivery' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500 hover:text-stone-700'}`}
                            >
                                <Truck className="w-4 h-4" /> Delivery
                            </button>
                            <button
                                onClick={() => setDeliveryMethod('pickup')}
                                className={`flex-1 py-3 rounded-md font-bold text-sm transition flex items-center justify-center gap-2 ${deliveryMethod === 'pickup' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500 hover:text-stone-700'}`}
                            >
                                <Store className="w-4 h-4" /> Pickup
                            </button>
                        </div>

                        {deliveryMethod === 'delivery' && (
                            <div className="mt-4">
                                <label className="block text-sm font-bold text-stone-700 mb-2">Delivery Address</label>
                                <textarea
                                    className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none h-32"
                                    placeholder="Enter full address..."
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                ></textarea>
                                {address.length > 5 && (
                                    <div className="mt-3 bg-blue-50 p-3 rounded-lg border border-blue-100 flex justify-between items-center text-sm">
                                        <span className="text-blue-800">
                                            <strong>Zone:</strong> {shippingQuote.zone} ({shippingQuote.distance} km)
                                        </span>
                                        <span className="font-bold text-blue-900">
                                            Rp {shippingQuote.fee.toLocaleString()}
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Summary Section */}
                <div className="bg-stone-50 p-8 rounded-3xl h-fit border border-stone-100 shadow-sm">
                    <h3 className="font-bold text-lg text-stone-800 mb-6">Financial Summary</h3>

                    <div className="space-y-4 mb-6">
                        {cart.map(item => (
                            <div key={`${item.id}-${item.selectedVariant?.name || 'base'}`} className="flex justify-between items-start">
                                <div>
                                    <div className="font-bold text-stone-800">{item.name}</div>
                                    <div className="text-xs text-stone-500">
                                        {item.selectedVariant ? item.selectedVariant.name : 'Standard'} x {item.quantity}
                                    </div>
                                </div>
                                <div className="font-bold text-stone-900">
                                    Rp {(item.finalPrice * item.quantity).toLocaleString()}
                                </div>
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
                                <span>- Rp {discountAmount.toLocaleString()}</span>
                            </div>
                        )}
                        <div className="flex justify-between items-center text-stone-600">
                            <span>Logistics Fee</span>
                            <span>Rp {shippingQuote.fee.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-stone-200">
                            <span className="font-bold text-xl text-stone-900">Total</span>
                            <span className="font-bold text-2xl text-amber-600">Rp {grandTotal.toLocaleString()}</span>
                        </div>
                    </div>

                    <button
                        onClick={handlePlaceOrder}
                        disabled={isProcessing || (deliveryMethod === 'delivery' && address.length < 5)}
                        className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-stone-800 transition active:scale-95 flex justify-center items-center gap-2 disabled:opacity-50"
                    >
                        {isProcessing ? 'Verifying Ledger...' : 'Commit Transaction'}
                        {!isProcessing && <ChevronRight className="w-5 h-5" />}
                    </button>

                    <div className="mt-4 flex justify-center items-center gap-2 text-stone-400 text-xs">
                        <Lock className="w-3 h-3" />
                        <span>Secured by TransactionLedger™</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
