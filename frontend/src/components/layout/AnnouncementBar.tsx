import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const announcements = [
  "CELEBRATING TIMELESS ETHNIC FASHION SINCE 1969",
  "PREMIUM MEN'S ETHNIC WEAR",
  "WEDDING & GROOM'S COLLECTION",
  "VISIT OUR DADAR STORE"
];

const AnnouncementBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-kirti-dark-brown text-kirti-ivory h-[32px] flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="text-[10px] md:text-[11px] font-body uppercase tracking-widest text-center px-4"
        >
          {announcements[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AnnouncementBar;
