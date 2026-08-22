import React, { useState } from 'react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  return (
    <section className="py-24 bg-kirti-cream">
      <div className="container mx-auto px-4 text-center max-w-2xl">
        <h2 className="font-display text-2xl md:text-4xl text-kirti-dark-brown uppercase tracking-widest mb-4">
          Stay In The Kirti World
        </h2>
        <p className="font-body text-sm md:text-base text-kirti-brown mb-8">
          Join our newsletter for updates on new collections, wedding edits, and exclusive offers.
        </p>

        {status === 'success' ? (
          <div className="bg-white border border-kirti-gold p-4 text-kirti-dark-brown font-body text-sm uppercase tracking-widest">
            Thank you for joining us.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 bg-white border border-kirti-border text-kirti-brown font-body text-sm focus:outline-none focus:border-kirti-gold mb-4 sm:mb-0"
              required
            />
            <button 
              type="submit" 
              disabled={status === 'submitting'}
              className="px-8 py-3 bg-kirti-dark-brown text-white font-body text-xs uppercase tracking-widest hover:bg-kirti-gold transition-colors disabled:opacity-50"
            >
              {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
