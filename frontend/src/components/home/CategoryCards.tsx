import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { API_BASE } from '../../api';

const categories = [
  {
    title: "Men's Sherwanis",
    description: "Royal silhouettes for the modern groom.",
    image: `${API_BASE}/img/Men/type1/img1.avif`,
    link: "/collections/sherwanis"
  },
  {
    title: "Men's Indo-Western",
    description: "Contemporary Indian style with a refined edge.",
    image: `${API_BASE}/img/Men/type2/img2.avif`,
    link: "/collections/indo-western"
  },
  {
    title: "Men's Kurtas",
    description: "Elegant ethnic essentials for every occasion.",
    image: `${API_BASE}/img/Men/type3/img1.avif`,
    link: "/collections/kurtas"
  },
  {
    title: "Women's Salwar Kameez",
    description: "Designed for the moments that matter most.",
    image: `${API_BASE}/img/Woman/salwarkameej/img1.avif`,
    link: "/collections/womens-salwar"
  },
  {
    title: "Women's Ethnic Collection",
    description: "Complete your traditional look.",
    image: `${API_BASE}/img/Woman/type1/img2.avif`,
    link: "/collections/womens-ethnic"
  }
];

const CategoryCards: React.FC = () => {
  return (
    <section className="py-24 bg-kirti-ivory">
      <div className="container mx-auto px-4 md:px-8 max-w-[1600px]">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl text-kirti-dark-brown uppercase tracking-widest mb-4">
            Explore The Collection
          </h2>
          <p className="font-body text-sm md:text-base text-kirti-brown">
            Timeless Indian silhouettes for every celebration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative overflow-hidden bg-kirti-ivory border border-kirti-border/50 hover:border-kirti-gold transition-colors duration-300 ${
                index === 3 ? 'md:col-span-2 lg:col-span-2' : ''
              } ${index === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              <Link to={category.link} className="block aspect-[4/5] md:aspect-auto md:h-[600px] relative overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="font-display text-2xl md:text-3xl text-white uppercase tracking-widest mb-2">
                    {category.title}
                  </h3>
                  <p className="font-body text-sm text-kirti-cream mb-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    {category.description}
                  </p>
                  <div className="flex items-center text-white font-body text-xs uppercase tracking-widest group/btn">
                    <span>Shop Now</span>
                    <ArrowRight size={16} className="ml-2 transform group-hover/btn:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;
