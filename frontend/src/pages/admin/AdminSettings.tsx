import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminSettings: React.FC = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call to update profile
    setSuccessMsg('Profile updated successfully!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call to reset password
    setSuccessMsg('Password reset successfully!');
    setPassword('');
    setNewPassword('');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handle2FAToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIs2FAEnabled(e.target.checked);
    setSuccessMsg(e.target.checked ? '2FA Enabled successfully!' : '2FA Disabled successfully!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h3 className="font-display text-xl text-kirti-dark-brown uppercase tracking-wider">Admin Profile</h3>
      </div>

      {successMsg && (
        <div className="bg-green-50 text-green-700 p-4 rounded mb-6 font-body text-sm border border-green-200">
          {successMsg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="font-display text-lg text-kirti-dark-brown mb-4">Edit Profile</h4>
          <form onSubmit={handleProfileUpdate} className="space-y-4 font-body text-sm">
            <div>
              <label className="block text-gray-700 mb-1">Username / Email</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} required className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-kirti-gold" />
            </div>
            <button type="submit" className="bg-kirti-dark-brown text-white px-4 py-2 rounded hover:bg-kirti-gold transition-colors">Update Profile</button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="font-display text-lg text-kirti-dark-brown mb-4">Reset Password</h4>
          <form onSubmit={handlePasswordReset} className="space-y-4 font-body text-sm">
            <div>
              <label className="block text-gray-700 mb-1">Current Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-kirti-gold" />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">New Password</label>
              <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-kirti-gold" />
            </div>
            <button type="submit" className="bg-kirti-dark-brown text-white px-4 py-2 rounded hover:bg-kirti-gold transition-colors">Reset Password</button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 md:col-span-2">
          <h4 className="font-display text-lg text-kirti-dark-brown mb-4">Security Settings</h4>
          <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-md border border-gray-200">
            <input 
              type="checkbox" 
              id="twofa" 
              checked={is2FAEnabled}
              onChange={handle2FAToggle}
              className="w-5 h-5 rounded text-kirti-gold focus:ring-kirti-gold cursor-pointer"
            />
            <label htmlFor="twofa" className="font-body text-sm text-gray-700 cursor-pointer">
              Enable Two-Factor Authentication (2FA) for Admin Login
            </label>
          </div>
          <p className="text-xs text-gray-500 font-body mt-2 ml-8">When enabled, you will be required to enter an OTP sent to your registered mobile number upon every login.</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
