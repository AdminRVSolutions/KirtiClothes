import React from 'react';
import { Link } from 'react-router-dom';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'Men', path: '/collections/men' },
  { name: 'Women', path: '/collections/women' },
  { name: 'Accessories', path: '/collections/accessories' },
  { name: 'About', path: '/about' },
];

export const DesktopNavigation: React.FC = () => {
  return (
    <nav className="hidden lg:flex items-center space-x-6">
      {navLinks.map((link) => (
        <Link 
          key={link.name} 
          to={link.path}
          className="text-kirti-dark-brown text-[11px] uppercase tracking-widest font-medium hover:text-kirti-gold transition-colors duration-200"
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

export const MobileNavigation: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      <div 
        className="fixed inset-y-0 left-0 w-[80%] max-w-sm bg-kirti-ivory shadow-xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-kirti-border flex justify-between items-center">
          <span className="font-display text-xl uppercase tracking-widest text-kirti-dark-brown">Menu</span>
          <button onClick={onClose} className="p-2 text-kirti-dark-brown">
            ✕
          </button>
        </div>
        <nav className="flex flex-col py-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className="px-6 py-3 text-kirti-dark-brown text-sm uppercase tracking-wider border-b border-kirti-border/30 hover:bg-kirti-cream"
              onClick={onClose}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/contact" className="px-6 py-3 text-kirti-dark-brown text-sm uppercase tracking-wider border-b border-kirti-border/30 hover:bg-kirti-cream" onClick={onClose}>
            Contact
          </Link>
          <Link to="/store" className="px-6 py-3 text-kirti-dark-brown text-sm uppercase tracking-wider border-b border-kirti-border/30 hover:bg-kirti-cream" onClick={onClose}>
            Visit Store
          </Link>
        </nav>
      </div>
    </div>
  );
};
