import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';
import { MapPin, Phone, Mail } from 'lucide-react';

const InstagramIcon = ({ className, size = 24 }: { className?: string; size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);


const Footer: React.FC = () => {
  return (
    <footer className="bg-kirti-dark-brown text-kirti-ivory pt-16 pb-8 border-t-4 border-kirti-gold">
      <div className="container mx-auto px-4 md:px-8 max-w-[1600px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Brand */}
          <div className="lg:col-span-1 flex flex-col items-start space-y-4">
            <Logo isDark={false} className="items-start" />
            <p className="font-body text-sm text-kirti-cream mt-4">
              Ethnic Wear for Men
            </p>
          </div>

          {/* Column 2: Shop */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-display text-lg uppercase tracking-wider text-kirti-gold">Shop</h4>
            <div className="flex flex-col space-y-2">
              <Link to="/collections/sherwanis" className="text-sm text-kirti-cream hover:text-white transition-colors">Sherwanis</Link>
              <Link to="/collections/indo-western" className="text-sm text-kirti-cream hover:text-white transition-colors">Indo-Western</Link>
              <Link to="/collections/kurtas" className="text-sm text-kirti-cream hover:text-white transition-colors">Kurtas</Link>
              <Link to="/collections/grooms-collection" className="text-sm text-kirti-cream hover:text-white transition-colors">Groom's Collection</Link>
              <Link to="/collections/wedding-wear" className="text-sm text-kirti-cream hover:text-white transition-colors">Wedding Wear</Link>
              <Link to="/collections/accessories" className="text-sm text-kirti-cream hover:text-white transition-colors">Accessories</Link>
            </div>
          </div>

          {/* Column 3: Information */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-display text-lg uppercase tracking-wider text-kirti-gold">Information</h4>
            <div className="flex flex-col space-y-2">
              <Link to="/about" className="text-sm text-kirti-cream hover:text-white transition-colors">About Us</Link>
              <Link to="/contact" className="text-sm text-kirti-cream hover:text-white transition-colors">Contact</Link>
              <Link to="/reviews" className="text-sm text-kirti-cream hover:text-white transition-colors">Reviews</Link>
              <Link to="/faq" className="text-sm text-kirti-cream hover:text-white transition-colors">FAQ</Link>
              <Link to="/shipping" className="text-sm text-kirti-cream hover:text-white transition-colors">Shipping</Link>
              <Link to="/returns" className="text-sm text-kirti-cream hover:text-white transition-colors">Returns</Link>
              <Link to="/privacy" className="text-sm text-kirti-cream hover:text-white transition-colors">Privacy</Link>
              <Link to="/terms" className="text-sm text-kirti-cream hover:text-white transition-colors">Terms</Link>
            </div>
          </div>

          {/* Column 4: My Account */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-display text-lg uppercase tracking-wider text-kirti-gold">My Account</h4>
            <div className="flex flex-col space-y-2">
              <Link to="/login" className="text-sm text-kirti-cream hover:text-white transition-colors">Login</Link>
              <Link to="/cart" className="text-sm text-kirti-cream hover:text-white transition-colors">Shopping Bag</Link>
              <Link to="/wishlist" className="text-sm text-kirti-cream hover:text-white transition-colors">Wishlist</Link>
              <Link to="/account/orders" className="text-sm text-kirti-cream hover:text-white transition-colors">Orders</Link>
              <Link to="/track-order" className="text-sm text-kirti-cream hover:text-white transition-colors">Track Order</Link>
            </div>
          </div>

          {/* Column 5: Visit Us */}
          <div className="flex flex-col space-y-4 lg:col-span-1">
            <h4 className="font-display text-lg uppercase tracking-wider text-kirti-gold">Visit Us</h4>
            <div className="flex flex-col space-y-4 text-sm text-kirti-cream">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="mt-1 flex-shrink-0 text-kirti-gold" />
                <span>
                  Kirti Dress Centre<br/>
                  Kasam Mitha Building, 9/10<br/>
                  Near Kailash Lassi<br/>
                  Dadar East, Mumbai – 400014
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-kirti-gold" />
                <a href="tel:09702050640" className="hover:text-white transition-colors">097020 50640</a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-kirti-gold" />
                <a href="mailto:zfashionhouse@gmail.com" className="hover:text-white transition-colors">zfashionhouse@gmail.com</a>
              </div>
              <div className="flex items-center space-x-3 pt-2">
                <a href="https://instagram.com/kirti_ethnic" target="_blank" rel="noreferrer" className="bg-kirti-ivory/10 p-2 rounded-full hover:bg-kirti-gold transition-colors text-white">
                  <InstagramIcon size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <p className="text-xs text-kirti-cream tracking-widest font-body uppercase">
            © KIRTI — SINCE 1969. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
