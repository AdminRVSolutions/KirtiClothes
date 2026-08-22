import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Layers, Scissors, Tag, HeartHandshake } from 'lucide-react';

const features = [
  { icon: ShieldCheck, title: "Since 1969", desc: "A heritage built over generations." },
  { icon: Layers, title: "Wide Collection", desc: "Explore ethnic styles for weddings, celebrations and special occasions." },
  { icon: Scissors, title: "Quality & Fitting", desc: "Highlight positive customer sentiment around quality and fitting." },
  { icon: Tag, title: "Reasonable Pricing", desc: "Offer customers excellent value across the collection." },
  { icon: HeartHandshake, title: "Personal Service", desc: "Friendly and attentive assistance for customers visiting the store." }
];

const WhyChooseKirti: React.FC = () => {
  return (
    <section className="py-24 bg-kirti-ivory">
      <div className="container mx-auto px-4 md:px-8 max-w-[1600px]">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl text-kirti-dark-brown uppercase tracking-widest mb-4">
            Why Kirti
          </h2>
          <div className="w-16 h-[1px] bg-kirti-gold mx-auto" />
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center max-w-[200px]"
              >
                <div className="w-16 h-16 rounded-full bg-kirti-cream flex items-center justify-center mb-6 text-kirti-gold">
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-lg text-kirti-dark-brown uppercase tracking-wider mb-3">
                  {feature.title}
                </h3>
                <p className="font-body text-xs text-kirti-brown">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseKirti;
