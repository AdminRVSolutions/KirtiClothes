
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Auth from './pages/Auth';
import Account from './pages/Account';
import TrackOrder from './pages/TrackOrder';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminSettings from './pages/admin/AdminSettings';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Placeholders for future phases */}
          <Route path="/shop" element={<Shop />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/account/*" element={<Account />} />
          <Route path="/track-order" element={<TrackOrder />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/about" element={<div className="py-32 text-center text-kirti-dark-brown font-display text-2xl">About Page Coming Soon</div>} />
          <Route path="/contact" element={<div className="py-32 text-center text-kirti-dark-brown font-display text-2xl">Contact Page Coming Soon</div>} />
          <Route path="/store" element={<div className="py-32 text-center text-kirti-dark-brown font-display text-2xl">Store Locator Coming Soon</div>} />
          <Route path="/collections/:slug" element={<div className="py-32 text-center text-kirti-dark-brown font-display text-2xl">Collection Coming Soon</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
