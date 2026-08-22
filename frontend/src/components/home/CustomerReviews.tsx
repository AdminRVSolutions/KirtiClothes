import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const reviews = [
  {
    text: "Great location, quality, nice affordable price and fantastic service.",
    author: "Google Reviewer"
  },
  {
    text: "Friendly and professional behaviour of staff, wide variety and reasonable rate.",
    author: "Google Reviewer"
  },
  {
    text: "Superb place for shopping with good vibes.",
    author: "Google Reviewer"
  }
];

const CustomerReviews: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % reviews.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <section className="py-24 bg-white border-y border-kirti-border/30">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
        <h2 className="font-display text-3xl md:text-5xl text-kirti-dark-brown uppercase tracking-widest mb-4">
          What Our Customers Say
        </h2>
        <div className="flex items-center justify-center space-x-2 mb-12">
          <div className="flex text-kirti-gold">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} fill="currentColor" />
            ))}
          </div>
          <span className="font-display text-lg text-kirti-dark-brown font-medium">4.8</span>
          <span className="font-body text-xs text-kirti-brown tracking-widest uppercase">| 596 Google Reviews</span>
        </div>

        <div className="relative h-[150px] md:h-[120px] flex items-center justify-center px-12">
          <button onClick={prev} className="absolute left-0 text-kirti-brown hover:text-kirti-gold transition-colors">
            <ChevronLeft size={32} strokeWidth={1} />
          </button>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <p className="font-display text-xl md:text-3xl text-kirti-dark-brown leading-relaxed mb-6 italic">
                "{reviews[currentIndex].text}"
              </p>
              <p className="font-body text-xs text-kirti-brown uppercase tracking-widest">
                — {reviews[currentIndex].author}
              </p>
            </motion.div>
          </AnimatePresence>

          <button onClick={next} className="absolute right-0 text-kirti-brown hover:text-kirti-gold transition-colors">
            <ChevronRight size={32} strokeWidth={1} />
          </button>
        </div>

        <div className="mt-12">
          <a href="#" className="inline-block border-b border-kirti-gold text-kirti-gold font-body text-xs uppercase tracking-widest pb-1 hover:text-kirti-dark-brown hover:border-kirti-dark-brown transition-colors">
            Read All Reviews
          </a>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
