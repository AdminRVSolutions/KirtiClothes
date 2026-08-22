import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  mrp: number;
  badge?: string;
  image: string;
}

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {products.map((product, index) => (
        <motion.div 
          key={product.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="group flex flex-col"
        >
          <div className="relative aspect-[3/4] overflow-hidden bg-kirti-ivory mb-3 border border-kirti-border/30 group-hover:border-kirti-gold transition-colors duration-300">
            {product.badge && (
              <div className="absolute top-3 left-3 z-10 bg-kirti-dark-brown text-white text-[9px] md:text-[10px] font-body uppercase tracking-wider px-2 py-1">
                {product.badge}
              </div>
            )}
            <button className="absolute top-3 right-3 z-10 text-kirti-brown hover:text-kirti-gold bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300">
              <Heart size={16} strokeWidth={1.5} />
            </button>
            <Link to={`/products/${product.id}`}>
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </Link>
            
            <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex">
              <button className="flex-1 bg-white text-kirti-dark-brown border-t border-r border-kirti-border/50 py-2.5 flex justify-center items-center hover:bg-kirti-cream transition-colors">
                <Eye size={16} strokeWidth={1.5} className="mr-1.5" />
                <span className="text-[9px] uppercase tracking-widest font-medium">Quick</span>
              </button>
              <button className="flex-1 bg-kirti-dark-brown text-white py-2.5 flex justify-center items-center hover:bg-kirti-gold transition-colors">
                <ShoppingBag size={16} strokeWidth={1.5} className="mr-1.5" />
                <span className="text-[9px] uppercase tracking-widest font-medium">Cart</span>
              </button>
            </div>
          </div>
          
          <div className="text-center px-1">
            <p className="text-[9px] md:text-[10px] text-kirti-brown uppercase tracking-widest mb-1">{product.category}</p>
            <Link to={`/products/${product.id}`} className="block font-display text-base md:text-lg text-kirti-dark-brown hover:text-kirti-gold transition-colors mb-1 truncate">
              {product.name}
            </Link>
            <div className="flex items-center justify-center space-x-2 font-body text-sm">
              <span className="text-kirti-dark-brown font-medium">₹{product.price.toLocaleString('en-IN')}</span>
              {product.mrp > product.price && (
                <span className="text-kirti-brown/50 line-through text-xs">₹{product.mrp.toLocaleString('en-IN')}</span>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductGrid;
