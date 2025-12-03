import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Context
import { CartProvider } from './src/context/CartContext';

// Components
import { Navbar } from './src/components/layout/Navbar';
import { Footer } from './src/components/layout/Footer';
import { CartSidebar } from './src/components/commerce/CartSidebar';
import { BakerAIWidget } from './src/components/ai/BakerAIWidget';
import { NewsletterPopup } from './src/components/widgets/NewsletterPopup';

// Pages
import { HomePage } from './src/pages/HomePage';
import { MenuPage } from './src/pages/MenuPage';
import { ProductDetailPage } from './src/pages/ProductDetailPage';
import { ProfilePage } from './src/pages/ProfilePage';
import { CheckoutPage } from './src/pages/CheckoutPage';
import { AdminPage } from './src/pages/AdminPage';
import { BlogPage } from './src/pages/BlogPage';
import { FAQPage } from './src/pages/FAQPage';
import { InfoPage } from './src/pages/InfoPage';
import { CustomOrderPage } from './src/pages/CustomOrderPage';
import { ResellerPage } from './src/pages/ResellerPage';
import { SubscriptionPage } from './src/pages/SubscriptionPage';
import { OrderTrackingPage } from './src/pages/OrderTrackingPage';

// Backend Init
import { OrbitalDB } from './src/core/data/OrbitalDB';
import { EdgeMiddleware } from './src/core/security/EdgeMiddleware';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
    return null;
};

const App: React.FC = () => {
    useEffect(() => {
        // Initialize Shadow Backend
        OrbitalDB.getInstance();
        EdgeMiddleware.getInstance();
    }, []);

    return (
        <CartProvider>
            <Router>
                <ScrollToTop />
                <div className="flex flex-col min-h-screen bg-stone-50 font-sans text-stone-800">
                    <Navbar />
                    <NewsletterPopup />
                    <CartSidebar />

                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/menu" element={<MenuPage />} />
                            <Route path="/product/:id" element={<ProductDetailPage />} />
                            <Route path="/profile" element={<ProfilePage />} />
                            <Route path="/checkout" element={<CheckoutPage />} />
                            <Route path="/admin" element={<AdminPage />} />
                            <Route path="/blog" element={<BlogPage />} />
                            <Route path="/faq" element={<FAQPage />} />
                            <Route path="/info" element={<InfoPage />} />
                            <Route path="/custom-order" element={<CustomOrderPage />} />
                            <Route path="/reseller" element={<ResellerPage />} />
                            <Route path="/subscription" element={<SubscriptionPage />} />
                            <Route path="/track" element={<OrderTrackingPage />} />
                        </Routes>
                    </main>

                    <Footer />
                    <BakerAIWidget />
                </div>
            </Router>
        </CartProvider>
    );
};

export default App;