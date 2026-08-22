import React from 'react';
import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminDashboard: React.FC = () => {
  const stats = [
    { name: 'Total Revenue', value: '₹1,24,500', icon: DollarSign, change: '+12%', changeType: 'positive' },
    { name: 'Total Orders', value: '45', icon: ShoppingBag, change: '+5%', changeType: 'positive' },
    { name: 'Active Customers', value: '120', icon: Users, change: '+18%', changeType: 'positive' },
    { name: 'Conversion Rate', value: '3.2%', icon: TrendingUp, change: '-1%', changeType: 'negative' },
  ];

  const recentOrders = [
    { id: '#KIRTI-9482', customer: 'Arjun Singh', date: 'Oct 24, 2023', total: '₹35,000', status: 'Processing' },
    { id: '#KIRTI-9481', customer: 'Rahul Sharma', date: 'Oct 23, 2023', total: '₹12,500', status: 'Shipped' },
    { id: '#KIRTI-9480', customer: 'Vikram Patel', date: 'Oct 22, 2023', total: '₹42,000', status: 'Delivered' },
    { id: '#KIRTI-9479', customer: 'Amit Kumar', date: 'Oct 22, 2023', total: '₹8,500', status: 'Delivered' },
  ];

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-body text-sm text-gray-500 mb-1">{stat.name}</p>
                  <h3 className="font-display text-2xl text-kirti-dark-brown font-medium">{stat.value}</h3>
                </div>
                <div className="p-2 bg-kirti-cream rounded-md text-kirti-dark-brown">
                  <Icon size={20} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className={stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}>
                  {stat.change}
                </span>
                <span className="text-gray-400 ml-2 font-body text-xs">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="font-display text-lg text-kirti-dark-brown uppercase tracking-wider mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body text-sm">
            <thead className="border-b border-gray-200 text-gray-500 uppercase tracking-widest text-xs">
              <tr>
                <th className="px-4 py-3 font-medium">Order ID</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Total</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-kirti-dark-brown font-medium">{order.id}</td>
                  <td className="px-4 py-3 text-gray-700">{order.customer}</td>
                  <td className="px-4 py-3 text-gray-500">{order.date}</td>
                  <td className="px-4 py-3 text-gray-700">{order.total}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
