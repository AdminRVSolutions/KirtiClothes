import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: "1969", label: "Established" },
  { value: "57+", label: "Years of Heritage" },
  { value: "4.8★", label: "Google Rating" },
  { value: "596+", label: "Customer Reviews" }
];

const Heritage: React.FC = () => {
  return (
    <section className="py-24 bg-kirti-ivory">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-5xl text-kirti-dark-brown mb-8 uppercase tracking-widest">
            A Legacy of Elegance Since 1969
          </h2>
          <div className="w-16 h-[2px] bg-kirti-gold mx-auto mb-8" />
          <p className="font-body text-base md:text-lg text-kirti-brown leading-relaxed mb-16">
            Since 1969, Kirti has been associated with Indian ethnic fashion, bringing together traditional aesthetics, contemporary styling and exceptional value for special occasions.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <span className="font-display text-3xl md:text-4xl text-kirti-dark-brown mb-2">{stat.value}</span>
              <span className="font-body text-xs md:text-sm text-kirti-brown uppercase tracking-widest">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Heritage;
