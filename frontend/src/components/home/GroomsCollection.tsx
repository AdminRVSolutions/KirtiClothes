import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { API_BASE } from '../../api';

const GroomsCollection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden py-32 md:py-48 flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img 
          src={`${API_BASE}/img/Men/Sherwani/product_1/size_L/img3.avif`}
          alt="Groom's Collection" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-kirti-dark-brown/60" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto flex flex-col items-center"
        >
          <div className="w-[1px] h-16 bg-kirti-gold mb-8" />
          <h2 className="font-display text-4xl md:text-6xl text-kirti-ivory uppercase tracking-widest mb-6">
            The Groom's Collection
          </h2>
          <p className="font-body text-sm md:text-base text-kirti-cream mb-12 leading-relaxed">
            Make your special day unforgettable with timeless sherwanis, sophisticated Indo-Western styles and carefully selected accessories.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/collections/grooms-collection" className="px-8 py-3 bg-kirti-gold text-white font-body text-xs uppercase tracking-widest hover:bg-white hover:text-kirti-dark-brown transition-colors duration-300">
              Explore Groom's Wear
            </Link>
            <Link to="/store" className="px-8 py-3 bg-transparent border border-kirti-gold text-kirti-ivory font-body text-xs uppercase tracking-widest hover:bg-kirti-gold hover:text-white transition-colors duration-300">
              Visit Our Store
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GroomsCollection;
