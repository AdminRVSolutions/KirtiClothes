import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative h-[75vh] md:h-[85vh] w-full overflow-hidden bg-kirti-dark-brown">
      {/* Background image placeholder */}
      <div className="absolute inset-0 z-0">
        <img 
          src="http://localhost:5029/img/img2.webp" 
          alt="Indian Groom Sherwani" 
          className="w-full h-full object-cover object-top opacity-50 transition-transform duration-[20s] ease-linear hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-kirti-dark-brown via-kirti-dark-brown/40 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 h-full flex flex-col justify-end pb-24 md:pb-32 items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="font-display text-4xl md:text-7xl lg:text-8xl text-kirti-ivory tracking-widest uppercase mb-2">
            Kirti
          </h1>
          <h2 className="font-display text-2xl md:text-4xl text-kirti-gold tracking-widest uppercase mb-4">
            Timeless Ethnic Wear
          </h2>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="h-[1px] w-12 bg-kirti-gold" />
            <span className="font-body text-xs md:text-sm text-kirti-cream tracking-[0.2em] uppercase">Since 1969</span>
            <div className="h-[1px] w-12 bg-kirti-gold" />
          </div>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-body text-sm md:text-base text-kirti-cream max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Discover refined Indian ethnic wear crafted for weddings, celebrations and unforgettable occasions.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <Link to="/shop" className="px-8 py-3 bg-kirti-gold text-white font-body text-xs uppercase tracking-widest hover:bg-white hover:text-kirti-dark-brown transition-colors duration-300">
            Shop Collection
          </Link>
          <Link to="/store" className="px-8 py-3 bg-transparent border border-kirti-gold text-kirti-ivory font-body text-xs uppercase tracking-widest hover:bg-kirti-gold hover:text-white transition-colors duration-300">
            Visit Our Store
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
