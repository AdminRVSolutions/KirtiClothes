import React, { useState, useEffect } from 'react';
import { Search, User, Heart, ShoppingBag, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';
import { DesktopNavigation, MobileNavigation } from './Navigation';
import AnnouncementBar from './AnnouncementBar';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AnnouncementBar />
      <header 
        className={`sticky top-0 z-40 w-full transition-all duration-300 bg-kirti-ivory ${
          isScrolled ? 'shadow-md border-b border-kirti-border py-2' : 'border-b border-kirti-border/50 py-4'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 max-w-[1600px] flex items-center justify-between">
          
          {/* Mobile Menu Button & Search (Left side on mobile) */}
          <div className="flex items-center space-x-4 lg:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-kirti-dark-brown hover:text-kirti-gold transition-colors"
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
            <button className="text-kirti-dark-brown hover:text-kirti-gold transition-colors">
              <Search size={22} strokeWidth={1.5} />
            </button>
          </div>

          {/* Desktop Left / Center Logo */}
          <div className="flex items-center space-x-12">
            <Logo />
            <DesktopNavigation />
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <button className="hidden lg:block text-kirti-dark-brown hover:text-kirti-gold transition-colors">
              <Search size={22} strokeWidth={1.5} />
            </button>
            <Link to="/account" className="text-kirti-dark-brown hover:text-kirti-gold transition-colors">
              <User size={22} strokeWidth={1.5} />
            </Link>
            <Link to="/wishlist" className="hidden sm:block text-kirti-dark-brown hover:text-kirti-gold transition-colors">
              <Heart size={22} strokeWidth={1.5} />
            </Link>
            <Link to="/cart" className="relative text-kirti-dark-brown hover:text-kirti-gold transition-colors">
              <ShoppingBag size={22} strokeWidth={1.5} />
              <span className="absolute -top-1 -right-1 bg-kirti-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-body">
                0
              </span>
            </Link>
          </div>
        </div>
      </header>
      
      <MobileNavigation isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
};

export default Header;
