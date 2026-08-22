import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone } from 'lucide-react';

const StoreExperience: React.FC = () => {
  return (
    <section className="py-24 bg-kirti-ivory">
      <div className="container mx-auto px-4 md:px-8 max-w-[1600px]">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl text-kirti-dark-brown uppercase tracking-widest mb-4">
            Visit The Kirti Store
          </h2>
          <p className="font-body text-sm md:text-base text-kirti-brown">
            Experience our premium collection in person at Dadar East.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Gallery / Image side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <img src="http://localhost:5029/img/imge3.webp" alt="Store Interior" className="w-full h-48 md:h-64 object-cover" />
              <img src="http://localhost:5029/img/Men/type1/img1.avif" alt="Clothing Displays" className="w-full h-64 md:h-80 object-cover" />
            </div>
            <div className="space-y-4 pt-8 md:pt-12">
              <img src="http://localhost:5029/img/Men/type2/img2.avif" alt="Sherwani Collection" className="w-full h-64 md:h-80 object-cover" />
              <img src="http://localhost:5029/img/Woman/type1/img1.avif" alt="Customer Experience" className="w-full h-48 md:h-64 object-cover" />
            </div>
          </motion.div>

          {/* Details side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col space-y-8"
          >
            <div>
              <h3 className="font-display text-2xl md:text-3xl text-kirti-dark-brown uppercase tracking-widest mb-6">
                Kirti Dress Centre
              </h3>
              
              <div className="flex items-start space-x-4 mb-6">
                <MapPin className="text-kirti-gold flex-shrink-0 mt-1" />
                <p className="font-body text-sm md:text-base text-kirti-brown leading-relaxed">
                  Kasam Mitha Building, 9/10,<br />
                  Near Kailash Lassi,<br />
                  Dadar East, Dadar,<br />
                  Mumbai, Maharashtra 400014
                </p>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <Phone className="text-kirti-gold flex-shrink-0" />
                <p className="font-body text-sm md:text-base text-kirti-brown">
                  097020 50640
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <a href="https://maps.google.com/?q=Kirti+Dress+Centre" target="_blank" rel="noreferrer" className="flex-1 py-3 bg-kirti-dark-brown text-white text-center font-body text-xs uppercase tracking-widest hover:bg-kirti-gold transition-colors">
                Get Directions
              </a>
              <a href="tel:09702050640" className="flex-1 py-3 border border-kirti-dark-brown text-kirti-dark-brown text-center font-body text-xs uppercase tracking-widest hover:bg-kirti-dark-brown hover:text-white transition-colors">
                Call Now
              </a>
            </div>

            {/* Google Maps Embed */}
            <div className="w-full h-64 mt-8 bg-kirti-cream border border-kirti-border">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.691880491093!2d72.842778!3d19.015333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ced842c92e9d%3A0xc3b8a1c97a2a5105!2sKirti%20Dress%20Centre!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Kirti Store Location"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StoreExperience;
