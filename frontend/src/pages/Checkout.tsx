import React, { useState } from 'react';
import { ChevronRight, Lock, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { useCartStore } from '../store/cartStore';

type Step = 'address' | 'payment' | 'success';

const Checkout: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('address');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const { items } = useCartStore();

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handleSubmitAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('payment');
  };

  const handlePlaceOrder = () => {
    setCurrentStep('success');
  };

  if (currentStep === 'success') {
    return (
      <div className="min-h-screen bg-kirti-cream flex flex-col items-center justify-center p-4">
        <div className="bg-white p-12 text-center max-w-lg shadow-sm border border-kirti-border/30">
          <CheckCircle2 size={64} className="text-kirti-gold mx-auto mb-6" />
          <h1 className="font-display text-3xl text-kirti-dark-brown uppercase tracking-widest mb-4">Order Confirmed</h1>
          <p className="font-body text-kirti-brown mb-2">Thank you for your purchase.</p>
          <p className="font-body text-sm text-kirti-brown mb-8">Your order number is <span className="font-medium text-kirti-dark-brown">#KIRTI-9482</span>.</p>
          <Link to="/" className="inline-block px-8 py-3 bg-kirti-dark-brown text-white font-body text-xs uppercase tracking-widest hover:bg-kirti-gold transition-colors">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-8 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
        {/* Breadcrumb Header */}
        <div className="flex items-center justify-center space-x-4 mb-12">
          <Link to="/cart" className="font-body text-xs uppercase tracking-widest text-kirti-brown hover:text-kirti-dark-brown">Bag</Link>
          <ChevronRight size={14} className="text-kirti-border" />
          <span className={clsx("font-body text-xs uppercase tracking-widest", currentStep === 'address' ? "text-kirti-dark-brown font-medium" : "text-kirti-brown")}>Address</span>
          <ChevronRight size={14} className="text-kirti-border" />
          <span className={clsx("font-body text-xs uppercase tracking-widest", currentStep === 'payment' ? "text-kirti-dark-brown font-medium" : "text-kirti-brown")}>Payment</span>
        </div>

        <div className="flex flex-col-reverse lg:flex-row gap-12">
          {/* Main Form Area */}
          <div className="lg:w-2/3">
            {currentStep === 'address' && (
              <div className="bg-white border border-kirti-border/50 p-6 md:p-8">
                <h2 className="font-display text-2xl text-kirti-dark-brown uppercase tracking-widest mb-6 border-b border-kirti-border/30 pb-4">
                  Delivery Address
                </h2>
                <form onSubmit={handleSubmitAddress} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-body text-xs uppercase tracking-widest text-kirti-brown mb-2">First Name</label>
                      <input type="text" required className="w-full border border-kirti-border p-3 font-body focus:outline-none focus:border-kirti-gold" />
                    </div>
                    <div>
                      <label className="block font-body text-xs uppercase tracking-widest text-kirti-brown mb-2">Last Name</label>
                      <input type="text" required className="w-full border border-kirti-border p-3 font-body focus:outline-none focus:border-kirti-gold" />
                    </div>
                  </div>
                  <div>
                    <label className="block font-body text-xs uppercase tracking-widest text-kirti-brown mb-2">Email Address</label>
                    <input type="email" required className="w-full border border-kirti-border p-3 font-body focus:outline-none focus:border-kirti-gold" />
                  </div>
                  <div>
                    <label className="block font-body text-xs uppercase tracking-widest text-kirti-brown mb-2">Street Address</label>
                    <input type="text" required className="w-full border border-kirti-border p-3 font-body focus:outline-none focus:border-kirti-gold mb-3" placeholder="Flat, House no., Building, Company" />
                    <input type="text" className="w-full border border-kirti-border p-3 font-body focus:outline-none focus:border-kirti-gold" placeholder="Area, Street, Sector, Village (Optional)" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <label className="block font-body text-xs uppercase tracking-widest text-kirti-brown mb-2">PIN Code</label>
                      <input type="text" required className="w-full border border-kirti-border p-3 font-body focus:outline-none focus:border-kirti-gold" />
                    </div>
                    <div className="md:col-span-1">
                      <label className="block font-body text-xs uppercase tracking-widest text-kirti-brown mb-2">City</label>
                      <input type="text" required className="w-full border border-kirti-border p-3 font-body focus:outline-none focus:border-kirti-gold" />
                    </div>
                    <div className="md:col-span-1">
                      <label className="block font-body text-xs uppercase tracking-widest text-kirti-brown mb-2">State</label>
                      <input type="text" required className="w-full border border-kirti-border p-3 font-body focus:outline-none focus:border-kirti-gold" />
                    </div>
                  </div>
                  <div>
                    <label className="block font-body text-xs uppercase tracking-widest text-kirti-brown mb-2">Phone Number</label>
                    <input type="tel" required className="w-full border border-kirti-border p-3 font-body focus:outline-none focus:border-kirti-gold" />
                  </div>
                  
                  <button type="submit" className="w-full bg-kirti-dark-brown text-white h-14 font-body text-sm uppercase tracking-widest hover:bg-kirti-gold transition-colors mt-8">
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}

            {currentStep === 'payment' && (
              <div className="bg-white border border-kirti-border/50 p-6 md:p-8">
                <div className="flex justify-between items-center mb-6 border-b border-kirti-border/30 pb-4">
                  <h2 className="font-display text-2xl text-kirti-dark-brown uppercase tracking-widest">
                    Payment
                  </h2>
                  <div className="flex items-center text-kirti-brown text-sm">
                    <Lock size={14} className="mr-1" /> Secure
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <label className={clsx("flex items-center p-4 border cursor-pointer transition-colors", paymentMethod === 'card' ? "border-kirti-gold bg-kirti-cream/50" : "border-kirti-border hover:border-kirti-gold")}>
                    <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={(e) => setPaymentMethod(e.target.value)} className="mr-4 accent-kirti-gold" />
                    <span className="font-body text-sm text-kirti-dark-brown font-medium">Credit / Debit Card</span>
                  </label>
                  <label className={clsx("flex items-center p-4 border cursor-pointer transition-colors", paymentMethod === 'upi' ? "border-kirti-gold bg-kirti-cream/50" : "border-kirti-border hover:border-kirti-gold")}>
                    <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={(e) => setPaymentMethod(e.target.value)} className="mr-4 accent-kirti-gold" />
                    <span className="font-body text-sm text-kirti-dark-brown font-medium">UPI / QR Code</span>
                  </label>
                  <label className={clsx("flex items-center p-4 border cursor-pointer transition-colors", paymentMethod === 'netbanking' ? "border-kirti-gold bg-kirti-cream/50" : "border-kirti-border hover:border-kirti-gold")}>
                    <input type="radio" name="payment" value="netbanking" checked={paymentMethod === 'netbanking'} onChange={(e) => setPaymentMethod(e.target.value)} className="mr-4 accent-kirti-gold" />
                    <span className="font-body text-sm text-kirti-dark-brown font-medium">Net Banking</span>
                  </label>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 mb-8 bg-kirti-ivory p-6 border border-kirti-border/30">
                    <div>
                      <input type="text" placeholder="Card Number" className="w-full border border-kirti-border p-3 font-body text-sm focus:outline-none focus:border-kirti-gold" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="MM/YY" className="w-full border border-kirti-border p-3 font-body text-sm focus:outline-none focus:border-kirti-gold" />
                      <input type="text" placeholder="CVV" className="w-full border border-kirti-border p-3 font-body text-sm focus:outline-none focus:border-kirti-gold" />
                    </div>
                    <div>
                      <input type="text" placeholder="Name on Card" className="w-full border border-kirti-border p-3 font-body text-sm focus:outline-none focus:border-kirti-gold" />
                    </div>
                  </div>
                )}

                <div className="flex space-x-4">
                  <button onClick={() => setCurrentStep('address')} className="flex-1 border border-kirti-dark-brown text-kirti-dark-brown h-14 font-body text-xs uppercase tracking-widest hover:bg-kirti-cream transition-colors">
                    Back
                  </button>
                  <button onClick={handlePlaceOrder} className="flex-1 bg-kirti-gold text-white h-14 font-body text-sm uppercase tracking-widest hover:bg-kirti-dark-brown transition-colors">
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-kirti-cream p-6 border border-kirti-border/30 sticky top-24">
              <h3 className="font-display text-xl text-kirti-dark-brown uppercase tracking-widest mb-6 border-b border-kirti-border/50 pb-4">
                Summary
              </h3>
              
              <div className="space-y-4 mb-6 border-b border-kirti-border/50 pb-6">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-20 object-cover border border-kirti-border/30" />
                    <div className="flex-1">
                      <p className="font-display text-sm text-kirti-dark-brown">{item.name}</p>
                      <p className="font-body text-xs text-kirti-brown">Qty: {item.quantity}</p>
                      <p className="font-body text-sm text-kirti-dark-brown font-medium mt-1">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 font-body text-sm text-kirti-brown mb-6 border-b border-kirti-border/50 pb-6">
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
                  <span className="text-kirti-dark-brown">Free</span>
                </div>
              </div>

              <div className="flex justify-between font-body text-xl text-kirti-dark-brown font-medium">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
