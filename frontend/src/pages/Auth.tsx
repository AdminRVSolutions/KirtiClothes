import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyMobile, registerUser, loginUser } from '../api';

const Auth: React.FC = () => {
  const [stage, setStage] = useState<'mobile' | 'login' | 'register'>('mobile');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  
  // Registration Form State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Male');
  const [terms, setTerms] = useState(true);
  const [newsletter, setNewsletter] = useState(false);

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleMobileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const { exists } = await verifyMobile(phone);
      if (exists) setStage('login');
      else setStage('register');
    } catch (err) {
      setError('Failed to verify mobile number.');
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await loginUser({ phone, password });
      localStorage.setItem('userRole', res.user.role);
      if (res.user.role === 'admin') navigate('/admin/dashboard');
      else navigate('/account/orders');
    } catch (err) {
      setError('Invalid credentials.');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!terms) {
      setError('You must accept the Terms of Service.');
      return;
    }
    setError('');
    try {
      const res = await registerUser({
        phone,
        firstName,
        lastName,
        email,
        dob: dob ? new Date(dob).toISOString() : null,
        gender,
        passwordHash: password,
        termsAccepted: terms,
        newsletterSubscribed: newsletter
      });
      localStorage.setItem('userRole', res.user.role);
      if (res.user.role === 'admin') navigate('/admin/dashboard');
      else navigate('/account/orders');
    } catch (err) {
      setError('Registration failed.');
    }
  };

  return (
    <div className="bg-white min-h-screen py-24 flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl md:text-4xl text-kirti-dark-brown uppercase tracking-widest mb-4">
            {stage === 'mobile' ? 'Enter Mobile' : stage === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="font-body text-sm text-kirti-brown">
            {stage === 'mobile' ? 'Enter your mobile number to sign in or sign up.' :
             stage === 'login' ? 'Sign in to access your Kirti account.' : 
             'Join Kirti to track orders and save your preferences.'}
          </p>
        </div>

        <div className="bg-white border border-kirti-border/50 p-8 shadow-sm">
          {error && <p className="text-red-500 text-sm font-body mb-4">{error}</p>}
          
          {stage === 'mobile' && (
            <form onSubmit={handleMobileSubmit} className="space-y-6">
              <div>
                <label className="block font-body text-xs uppercase tracking-widest text-kirti-brown mb-2">Mobile Number</label>
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} required className="w-full border border-kirti-border p-3 font-body focus:outline-none focus:border-kirti-gold" placeholder="+91" />
              </div>
              <button type="submit" className="w-full bg-kirti-dark-brown text-white h-14 font-body text-sm uppercase tracking-widest hover:bg-kirti-gold transition-colors mt-4">
                Continue
              </button>
            </form>
          )}

          {stage === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div>
                <label className="block font-body text-xs uppercase tracking-widest text-kirti-brown mb-2">Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full border border-kirti-border p-3 font-body focus:outline-none focus:border-kirti-gold" />
              </div>
              <button type="submit" className="w-full bg-kirti-dark-brown text-white h-14 font-body text-sm uppercase tracking-widest hover:bg-kirti-gold transition-colors mt-4">
                Sign In
              </button>
            </form>
          )}

          {stage === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-body text-xs uppercase tracking-widest text-kirti-brown mb-2">First Name</label>
                  <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required className="w-full border border-kirti-border p-3 font-body focus:outline-none focus:border-kirti-gold" />
                </div>
                <div>
                  <label className="block font-body text-xs uppercase tracking-widest text-kirti-brown mb-2">Last Name</label>
                  <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required className="w-full border border-kirti-border p-3 font-body focus:outline-none focus:border-kirti-gold" />
                </div>
              </div>
              <div>
                <label className="block font-body text-xs uppercase tracking-widest text-kirti-brown mb-2">Email ID</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full border border-kirti-border p-3 font-body focus:outline-none focus:border-kirti-gold" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-body text-xs uppercase tracking-widest text-kirti-brown mb-2">Date of Birth</label>
                  <input type="date" value={dob} onChange={e => setDob(e.target.value)} required className="w-full border border-kirti-border p-3 font-body focus:outline-none focus:border-kirti-gold" />
                </div>
                <div>
                  <label className="block font-body text-xs uppercase tracking-widest text-kirti-brown mb-2">Gender</label>
                  <select value={gender} onChange={e => setGender(e.target.value)} className="w-full border border-kirti-border p-3 font-body focus:outline-none focus:border-kirti-gold bg-white">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-body text-xs uppercase tracking-widest text-kirti-brown mb-2">Set Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full border border-kirti-border p-3 font-body focus:outline-none focus:border-kirti-gold" />
              </div>
              
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="terms" checked={terms} onChange={e => setTerms(e.target.checked)} className="rounded text-kirti-gold focus:ring-kirti-gold" />
                <label htmlFor="terms" className="font-body text-xs text-kirti-brown">I agree to the Terms of Service.</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="newsletter" checked={newsletter} onChange={e => setNewsletter(e.target.checked)} className="rounded text-kirti-gold focus:ring-kirti-gold" />
                <label htmlFor="newsletter" className="font-body text-xs text-kirti-brown">Subscribe to our newsletter for exclusive content and news.</label>
              </div>

              <button type="submit" className="w-full bg-kirti-dark-brown text-white h-14 font-body text-sm uppercase tracking-widest hover:bg-kirti-gold transition-colors mt-4">
                Create Account
              </button>
            </form>
          )}

          {stage !== 'mobile' && (
            <div className="mt-8 text-center border-t border-kirti-border/30 pt-6">
              <button 
                onClick={() => setStage('mobile')}
                className="text-kirti-dark-brown font-medium hover:text-kirti-gold transition-colors font-body text-sm"
              >
                Use a different mobile number
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
