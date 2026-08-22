import React, { useState } from 'react';
import { Search, Package, Truck, CheckCircle2, MapPin } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import clsx from 'clsx';

const mockOrderDetails = {
  id: '#KIRTI-9482',
  date: 'Oct 24, 2023',
  status: 'In Transit',
  items: [
    { name: "Royal Ivory Silk Sherwani", quantity: 1, price: 35000 }
  ],
  trackingNumber: 'AWB987654321',
  courier: 'Delhivery'
};

const TrackOrder: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialOrderId = searchParams.get('id') || '';
  
  const [orderId, setOrderId] = useState(initialOrderId);
  const [email, setEmail] = useState('');
  const [isSearched, setIsSearched] = useState(!!initialOrderId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId) {
      setIsSearched(true);
    }
  };

  const steps = [
    { id: 'placed', label: 'Order Placed', icon: Package, date: 'Oct 24, 2023, 10:30 AM', completed: true },
    { id: 'processed', label: 'Processing', icon: CheckCircle2, date: 'Oct 25, 2023, 02:15 PM', completed: true },
    { id: 'shipped', label: 'Shipped', icon: Truck, date: 'Oct 26, 2023, 09:00 AM', completed: true },
    { id: 'delivered', label: 'Delivered', icon: MapPin, date: 'Expected by Oct 29', completed: false },
  ];

  return (
    <div className="bg-white min-h-screen pt-12 pb-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl md:text-5xl text-kirti-dark-brown uppercase tracking-widest mb-4">
            Track Order
          </h1>
          <p className="font-body text-sm text-kirti-brown">
            Enter your Order ID and Email to check the real-time status of your package.
          </p>
        </div>

        <div className="bg-white border border-kirti-border/50 p-6 md:p-10 mb-12 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-body text-xs uppercase tracking-widest text-kirti-brown mb-2">Order ID</label>
                <input 
                  type="text" 
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="e.g. KIRTI-9482"
                  required 
                  className="w-full border border-kirti-border p-3 font-body focus:outline-none focus:border-kirti-gold" 
                />
              </div>
              <div>
                <label className="block font-body text-xs uppercase tracking-widest text-kirti-brown mb-2">Email or Phone</label>
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email or phone number"
                  className="w-full border border-kirti-border p-3 font-body focus:outline-none focus:border-kirti-gold" 
                />
              </div>
            </div>
            
            <button type="submit" className="w-full bg-kirti-dark-brown text-white h-14 font-body text-sm uppercase tracking-widest hover:bg-kirti-gold transition-colors flex items-center justify-center space-x-2">
              <Search size={18} />
              <span>Track Now</span>
            </button>
          </form>
        </div>

        {isSearched && (
          <div className="bg-kirti-ivory p-6 md:p-10 border border-kirti-border/30">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-6 border-b border-kirti-border/30 gap-4">
              <div>
                <h2 className="font-display text-2xl text-kirti-dark-brown uppercase tracking-widest mb-1">
                  Order {mockOrderDetails.id}
                </h2>
                <p className="font-body text-sm text-kirti-brown">Placed on {mockOrderDetails.date}</p>
              </div>
              <div className="text-left md:text-right">
                <p className="font-body text-xs uppercase tracking-widest text-kirti-brown mb-1">Tracking Number</p>
                <p className="font-body text-base text-kirti-dark-brown font-medium">{mockOrderDetails.trackingNumber}</p>
                <p className="font-body text-xs text-kirti-brown mt-1">via {mockOrderDetails.courier}</p>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="relative mb-12">
              <div className="absolute left-[27px] top-0 bottom-0 w-[2px] bg-kirti-border/50 md:left-0 md:right-0 md:top-[27px] md:bottom-auto md:h-[2px] md:w-full"></div>
              
              <div className="flex flex-col md:flex-row justify-between relative z-10 gap-8 md:gap-0">
                {steps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.id} className="flex md:flex-col items-center md:items-center group">
                      <div className={clsx(
                        "w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-colors",
                        step.completed ? "bg-kirti-gold text-white" : "bg-white border-2 border-kirti-border text-kirti-brown"
                      )}>
                        <Icon size={24} strokeWidth={1.5} />
                      </div>
                      <div className="ml-6 md:ml-0 md:mt-4 md:text-center">
                        <p className={clsx(
                          "font-display text-lg uppercase tracking-wider mb-1",
                          step.completed ? "text-kirti-dark-brown" : "text-kirti-brown"
                        )}>{step.label}</p>
                        <p className="font-body text-xs text-kirti-brown">{step.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="bg-white p-6 border border-kirti-border/30">
              <h3 className="font-display text-lg text-kirti-dark-brown uppercase tracking-widest mb-4">Items in this shipment</h3>
              <div className="divide-y divide-kirti-border/30">
                {mockOrderDetails.items.map((item, idx) => (
                  <div key={idx} className="py-3 flex justify-between items-center font-body text-sm">
                    <div className="flex items-center space-x-3">
                      <span className="w-6 h-6 bg-kirti-cream flex items-center justify-center text-xs text-kirti-brown rounded-full">{item.quantity}</span>
                      <span className="text-kirti-dark-brown">{item.name}</span>
                    </div>
                    <span className="font-medium text-kirti-dark-brown">₹{item.price.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
