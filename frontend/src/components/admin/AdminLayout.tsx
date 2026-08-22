import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, LogOut, Settings } from 'lucide-react';
import clsx from 'clsx';
import Logo from '../ui/Logo';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role !== 'admin') {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Customers', path: '/admin/customers', icon: Users },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col fixed inset-y-0 left-0 z-10">
        <div className="p-6 border-b border-gray-200 flex justify-center">
          <Logo isDark={true} className="scale-75 origin-center" />
        </div>
        
        <div className="px-6 py-4">
          <p className="font-body text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-4">Administration</p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={clsx(
                    "flex items-center space-x-3 px-3 py-2 rounded-md font-body text-sm transition-colors",
                    isActive 
                      ? "bg-kirti-cream text-kirti-dark-brown font-medium" 
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 text-gray-500 hover:text-red-600 font-body text-sm transition-colors w-full px-3 py-2 rounded-md hover:bg-red-50"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="ml-64 flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="font-display text-xl text-kirti-dark-brown uppercase tracking-wider">
            {navItems.find(item => location.pathname.startsWith(item.path))?.name || 'Admin'}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-kirti-dark-brown rounded-full flex items-center justify-center text-white font-body text-xs font-medium">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
