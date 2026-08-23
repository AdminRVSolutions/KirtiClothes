import React, { useState } from 'react';
import { Search, Eye } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

const mockOrders = [
  { id: '#KIRTI-9482', customer: 'Arjun Singh', date: 'Oct 24, 2023', total: 35000, items: 1, status: 'Processing' },
  { id: '#KIRTI-9481', customer: 'Rahul Sharma', date: 'Oct 23, 2023', total: 12500, items: 2, status: 'Shipped' },
  { id: '#KIRTI-9480', customer: 'Vikram Patel', date: 'Oct 22, 2023', total: 42000, items: 1, status: 'Delivered' },
  { id: '#KIRTI-9479', customer: 'Amit Kumar', date: 'Oct 22, 2023', total: 8500, items: 1, status: 'Delivered' },
  { id: '#KIRTI-9478', customer: 'Suresh Raina', date: 'Oct 21, 2023', total: 28500, items: 1, status: 'Processing' },
];

const AdminOrders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-display text-xl text-kirti-dark-brown uppercase tracking-wider">Manage Orders</h3>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="relative w-64">
            <input 
              type="text" 
              placeholder="Search by Order ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md font-body text-sm focus:outline-none focus:border-kirti-gold"
            />
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          <div className="flex space-x-2">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 font-body text-sm focus:outline-none focus:border-kirti-gold"
            >
              <option value="all">All Statuses</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-body text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-widest text-xs">
              <tr>
                <th className="px-6 py-3 font-medium">Order ID</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Customer</th>
                <th className="px-6 py-3 font-medium">Total</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-kirti-dark-brown font-medium">{order.id}</td>
                  <td className="px-6 py-4 text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 text-gray-700">{order.customer}</td>
                  <td className="px-6 py-4 text-gray-700">₹{order.total.toLocaleString('en-IN')} <span className="text-gray-400 text-xs">({order.items} items)</span></td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-500 hover:text-kirti-gold transition-colors inline-flex items-center space-x-1">
                      <Eye size={16} />
                      <span className="text-xs uppercase tracking-wider">View</span>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No orders found matching your criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
