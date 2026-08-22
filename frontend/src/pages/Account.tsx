import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, User, MapPin, Heart, LogOut } from 'lucide-react';
import clsx from 'clsx';

const mockOrders = [
  { id: '#KIRTI-9482', date: 'Oct 24, 2023', status: 'Processing', total: 36750, items: 1 },
  { id: '#KIRTI-9104', date: 'Sep 12, 2023', status: 'Delivered', total: 8500, items: 1 },
];

const Account: React.FC = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const tabs = [
    { id: 'orders', label: 'Order History', icon: Package },
    { id: 'profile', label: 'Profile Details', icon: User },
    { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
  ];

  return (
    <div className="bg-white min-h-screen pt-12 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
        <h1 className="font-display text-3xl md:text-5xl text-kirti-dark-brown uppercase tracking-widest mb-12 border-b border-kirti-border/50 pb-6">
          My Account
        </h1>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="flex flex-col space-y-2">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={clsx(
                      "flex items-center space-x-3 px-4 py-3 text-left font-body text-sm uppercase tracking-widest transition-colors",
                      activeTab === tab.id 
                        ? "bg-kirti-cream text-kirti-dark-brown font-medium border-l-2 border-kirti-gold" 
                        : "text-kirti-brown hover:bg-kirti-cream/50 hover:text-kirti-dark-brown border-l-2 border-transparent"
                    )}
                  >
                    <Icon size={18} strokeWidth={1.5} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-4 py-3 text-left font-body text-sm uppercase tracking-widest text-kirti-brown hover:bg-kirti-cream/50 hover:text-kirti-dark-brown border-l-2 border-transparent mt-8"
              >
                <LogOut size={18} strokeWidth={1.5} />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'orders' && (
              <div>
                <h2 className="font-display text-2xl text-kirti-dark-brown uppercase tracking-widest mb-6">Order History</h2>
                
                {mockOrders.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-body text-sm">
                      <thead className="bg-kirti-cream text-kirti-dark-brown uppercase tracking-widest text-xs">
                        <tr>
                          <th className="px-6 py-4 font-medium">Order</th>
                          <th className="px-6 py-4 font-medium">Date</th>
                          <th className="px-6 py-4 font-medium">Status</th>
                          <th className="px-6 py-4 font-medium">Total</th>
                          <th className="px-6 py-4 font-medium">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-kirti-border/30">
                        {mockOrders.map(order => (
                          <tr key={order.id} className="hover:bg-kirti-ivory/50 transition-colors">
                            <td className="px-6 py-4 text-kirti-dark-brown font-medium">{order.id}</td>
                            <td className="px-6 py-4 text-kirti-brown">{order.date}</td>
                            <td className="px-6 py-4">
                              <span className={clsx(
                                "px-3 py-1 text-xs uppercase tracking-widest rounded-full",
                                order.status === 'Delivered' ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                              )}>
                                {order.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-kirti-dark-brown">₹{order.total.toLocaleString('en-IN')} <span className="text-kirti-brown text-xs">({order.items} item)</span></td>
                            <td className="px-6 py-4">
                              <Link to={`/track-order?id=${order.id.replace('#', '')}`} className="text-kirti-gold hover:text-kirti-dark-brown underline uppercase tracking-widest text-xs">View</Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="bg-kirti-ivory p-12 text-center border border-kirti-border/30">
                    <p className="font-body text-kirti-brown mb-6">You haven't placed any orders yet.</p>
                    <Link to="/shop" className="inline-block px-8 py-3 bg-kirti-dark-brown text-white font-body text-xs uppercase tracking-widest hover:bg-kirti-gold transition-colors">
                      Start Shopping
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab !== 'orders' && (
              <div className="bg-kirti-ivory p-12 text-center border border-kirti-border/30">
                <p className="font-display text-xl text-kirti-dark-brown uppercase tracking-widest mb-2">Section Under Construction</p>
                <p className="font-body text-kirti-brown">This section will be available in the next update.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
