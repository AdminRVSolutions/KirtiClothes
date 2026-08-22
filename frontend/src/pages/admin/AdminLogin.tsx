import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/ui/Logo';
import { loginUser } from '../../api';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();

  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser({ phone, password });
      if (res.user.role === 'admin') {
        localStorage.setItem('userRole', 'admin');
        navigate('/admin/dashboard');
      } else {
        setError('Unauthorized: Admin access required.');
      }
    } catch (err) {
      setError('Invalid credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
        <Logo isDark={true} className="mx-auto" />
        <h2 className="mt-6 text-center text-xl font-body text-gray-600 uppercase tracking-widest">
          Admin Portal
        </h2>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200">
          {error && <div className="mb-4 text-sm text-red-600 font-body text-center">{error}</div>}
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 font-body">
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-kirti-gold focus:border-kirti-gold sm:text-sm font-body"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 font-body">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-kirti-gold focus:border-kirti-gold sm:text-sm font-body"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-kirti-dark-brown hover:bg-kirti-gold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-kirti-gold transition-colors font-body uppercase tracking-wider"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
