import React, { useState } from 'react';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { useCartStore } from '../store/cartStore';

const Cart: React.FC = () => {
  const { items, updateQuantity, removeItem } = useCartStore();
  const [promoCode, setPromoCode] = useState('');
  const navigate = useNavigate();

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.05; // 5% GST assumption
  const total = subtotal + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h1 className="font-display text-3xl md:text-5xl text-kirti-dark-brown uppercase tracking-widest mb-6">Shopping Bag</h1>
        <p className="font-body text-kirti-brown mb-8">Your bag is currently empty.</p>
        <Link to="/shop" className="px-8 py-3 bg-kirti-dark-brown text-white font-body text-xs uppercase tracking-widest hover:bg-kirti-gold transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-12 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
        <h1 className="font-display text-3xl md:text-5xl text-kirti-dark-brown uppercase tracking-widest mb-12 border-b border-kirti-border/50 pb-6">
          Shopping Bag ({items.length})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-8">
            {items.map(item => (
              <div key={item.id} className="flex gap-6 pb-8 border-b border-kirti-border/30">
                <Link to={`/products/${item.productId}`} className="w-24 md:w-32 flex-shrink-0 bg-kirti-ivory">
                  <img src={item.image} alt={item.name} className="w-full aspect-[3/4] object-cover" />
                </Link>
                
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <Link to={`/products/${item.productId}`} className="font-display text-lg md:text-xl text-kirti-dark-brown hover:text-kirti-gold transition-colors block mb-1">
                        {item.name}
                      </Link>
                      <p className="font-body text-xs text-kirti-brown uppercase tracking-wider mb-1">Color: {item.color}</p>
                      <p className="font-body text-xs text-kirti-brown uppercase tracking-wider">Size: {item.size}</p>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-kirti-brown hover:text-kirti-dark-brown transition-colors">
                      <Trash2 size={18} strokeWidth={1.5} />
                    </button>
                  </div>
                  
                  <div className="mt-auto flex justify-between items-end">
                    <div className="flex items-center border border-kirti-border h-10">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 text-kirti-brown hover:text-kirti-dark-brown">
                        <Minus size={14} />
                      </button>
                      <span className="font-body text-sm w-8 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 text-kirti-brown hover:text-kirti-dark-brown">
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="font-body text-lg text-kirti-dark-brown font-medium">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-kirti-cream p-6 md:p-8 border border-kirti-border/30">
              <h2 className="font-display text-2xl text-kirti-dark-brown uppercase tracking-widest mb-6 border-b border-kirti-border/50 pb-4">
                Order Summary
              </h2>
              
              <div className="space-y-4 font-body text-sm text-kirti-brown mb-6 border-b border-kirti-border/50 pb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (5%)</span>
                  <span>₹{tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="uppercase tracking-widest text-kirti-dark-brown text-xs">Free</span>
                </div>
              </div>

              <div className="flex justify-between font-body text-xl text-kirti-dark-brown font-medium mb-8">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>

              <div className="mb-8">
                <div className="flex">
                  <input 
                    type="text" 
                    placeholder="Promo Code" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 border border-r-0 border-kirti-border px-4 py-2 font-body text-sm focus:outline-none focus:border-kirti-gold"
                  />
                  <button className="bg-kirti-dark-brown text-white px-4 font-body text-xs uppercase tracking-widest hover:bg-kirti-gold transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-kirti-gold text-white h-14 flex items-center justify-center space-x-2 hover:bg-kirti-dark-brown transition-colors group"
              >
                <span className="font-body text-sm uppercase tracking-widest font-medium">Proceed to Checkout</span>
                <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
