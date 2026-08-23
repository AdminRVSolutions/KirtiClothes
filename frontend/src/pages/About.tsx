import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pt-24 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl text-kirti-dark-brown uppercase tracking-widest mb-6"
          >
            About Kirti
          </motion.h1>
          <div className="w-24 h-[1px] bg-kirti-gold mx-auto mb-8" />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-body text-kirti-brown max-w-2xl mx-auto leading-relaxed"
          >
            A legacy of craftsmanship, elegance, and timeless Indian fashion.
          </motion.p>
        </div>

        {/* Content Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="aspect-[4/5] bg-kirti-ivory rounded-t-full overflow-hidden"
          >
            <img 
              src="/img/Wedding_Woman.jpeg" 
              alt="Our Heritage" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl text-kirti-dark-brown uppercase tracking-widest mb-6">Our Heritage</h2>
            <p className="font-body text-kirti-brown leading-relaxed mb-6">
              Founded on a deep appreciation for traditional Indian textiles and modern aesthetics, Kirti has been a destination for those seeking elegance and authenticity in every weave.
            </p>
            <p className="font-body text-kirti-brown leading-relaxed">
              We specialize in curating an exclusive collection of Men's Sherwanis, Kurtas, Indo-Western suits, and Women's bridal wear that bridges the gap between classic artistry and contemporary trends.
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <div className="bg-kirti-ivory py-16 px-8 rounded-lg border border-kirti-border/30 text-center">
          <h2 className="font-display text-2xl text-kirti-dark-brown uppercase tracking-widest mb-12">Our Commitment</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-display text-lg text-kirti-dark-brown uppercase tracking-wider mb-3">Quality Craftsmanship</h3>
              <p className="font-body text-sm text-kirti-brown">Every piece is carefully selected for its superior fabric, intricate embroidery, and flawless finish.</p>
            </div>
            <div>
              <h3 className="font-display text-lg text-kirti-dark-brown uppercase tracking-wider mb-3">Timeless Design</h3>
              <p className="font-body text-sm text-kirti-brown">Our collections are designed to outlast passing trends, offering elegance that remains relevant for generations.</p>
            </div>
            <div>
              <h3 className="font-display text-lg text-kirti-dark-brown uppercase tracking-wider mb-3">Customer Experience</h3>
              <p className="font-body text-sm text-kirti-brown">We provide a personalized shopping experience, ensuring every customer finds their perfect fit for their special occasion.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
