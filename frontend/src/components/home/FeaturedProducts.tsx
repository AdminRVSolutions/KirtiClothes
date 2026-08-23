import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { API_BASE } from '../../api';

const mockProducts = [
  {
    id: 1,
    name: "Royal Ivory Silk Sherwani",
    category: "Sherwanis",
    price: 35000,
    mrp: 42000,
    badge: "BESTSELLER",
    image: `${API_BASE}/img/Men/Sherwani/product_1/size_L/img2.avif`
  },
  {
    id: 2,
    name: "Midnight Blue Indo-Western",
    category: "Indo-Western",
    price: 28500,
    mrp: 32000,
    badge: "NEW",
    image: `${API_BASE}/img/Men/Indo-Western/product_1/size_L/img2.avif`
  },
  {
    id: 3,
    name: "Maroon Velvet Embroidered Set",
    category: "Wedding Wear",
    price: 45000,
    mrp: 55000,
    badge: "WEDDING EDIT",
    image: `${API_BASE}/img/Woman/salwarkameej/product_1/size_L/img2.avif`
  },
  {
    id: 4,
    name: "Classic Beige Kurta Pyjama",
    category: "Kurtas",
    price: 8500,
    mrp: 9500,
    badge: "",
    image: `${API_BASE}/img/Men/Kurtas/product_1/size_L/img2.avif`
  }
];

const FeaturedProducts: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-[1600px]">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl text-kirti-dark-brown uppercase tracking-widest mb-4">
            The Kirti Edit
          </h2>
          <p className="font-body text-sm md:text-base text-kirti-brown">
            Curated styles for celebrations that deserve something special.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {mockProducts.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-kirti-ivory mb-4 border border-kirti-border/30 group-hover:border-kirti-gold transition-colors duration-300">
                {product.badge && (
                  <div className="absolute top-3 left-3 z-10 bg-kirti-dark-brown text-white text-[9px] md:text-[10px] font-body uppercase tracking-wider px-2 py-1">
                    {product.badge}
                  </div>
                )}
                <button className="absolute top-3 right-3 z-10 text-kirti-brown hover:text-kirti-gold bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Heart size={18} strokeWidth={1.5} />
                </button>
                <Link to={`/products/${product.id}`}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </Link>
                
                {/* Quick Actions Hover */}
                <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex">
                  <button className="flex-1 bg-white text-kirti-dark-brown border-t border-r border-kirti-border/50 py-3 flex justify-center items-center hover:bg-kirti-cream transition-colors">
                    <Eye size={18} strokeWidth={1.5} className="mr-2" />
                    <span className="text-[10px] uppercase tracking-widest font-medium">Quick View</span>
                  </button>
                  <button className="flex-1 bg-kirti-dark-brown text-white py-3 flex justify-center items-center hover:bg-kirti-gold transition-colors">
                    <ShoppingBag size={18} strokeWidth={1.5} className="mr-2" />
                    <span className="text-[10px] uppercase tracking-widest font-medium">Add to Cart</span>
                  </button>
                </div>
              </div>
              
              <div className="text-center px-2">
                <p className="text-[10px] md:text-xs text-kirti-brown uppercase tracking-widest mb-1">{product.category}</p>
                <Link to={`/products/${product.id}`} className="block font-display text-lg md:text-xl text-kirti-dark-brown hover:text-kirti-gold transition-colors mb-2">
                  {product.name}
                </Link>
                <div className="flex items-center justify-center space-x-2 font-body text-sm md:text-base">
                  <span className="text-kirti-dark-brown font-medium">₹{product.price.toLocaleString('en-IN')}</span>
                  {product.mrp > product.price && (
                    <span className="text-kirti-brown/50 line-through text-xs md:text-sm">₹{product.mrp.toLocaleString('en-IN')}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
