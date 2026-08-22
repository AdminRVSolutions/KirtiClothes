import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

interface ProductGalleryProps {
  images: string[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images[0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible w-full md:w-24 flex-shrink-0">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImage(img)}
            className={clsx(
              "relative aspect-[3/4] w-20 md:w-full flex-shrink-0 overflow-hidden border transition-colors duration-300",
              activeImage === img ? "border-kirti-gold" : "border-kirti-border/50 hover:border-kirti-brown"
            )}
          >
            <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div 
        className="relative flex-1 aspect-[3/4] md:aspect-auto md:min-h-[600px] bg-kirti-ivory overflow-hidden cursor-crosshair group"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            src={activeImage}
            alt="Product image"
            className={clsx(
              "w-full h-full object-cover transition-transform duration-200",
              isZoomed ? "scale-[2]" : "scale-100"
            )}
            style={
              isZoomed
                ? { transformOrigin: `${mousePosition.x}% ${mousePosition.y}%` }
                : { transformOrigin: "center center" }
            }
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductGallery;
