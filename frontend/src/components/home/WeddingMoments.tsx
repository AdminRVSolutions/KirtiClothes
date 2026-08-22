import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const moments = [
  { title: "Engagement", image: "http://localhost:5029/img/Woman/salwarkameej/img3.avif", desc: "Refined subtlety for the beginning." },
  { title: "Haldi", image: "http://localhost:5029/img/img2.webp", desc: "Vibrant hues for joyous traditions." },
  { title: "Mehendi", image: "http://localhost:5029/img/imge3.webp", desc: "Comfortable elegance for the celebration." },
  { title: "Sangeet", image: "http://localhost:5029/img/Men/type1/img1.avif", desc: "Dynamic silhouettes for the dance floor." },
  { title: "Wedding", image: "http://localhost:5029/img/Men/type2/img2.avif", desc: "Majestic grandeur for the ceremony." },
  { title: "Reception", image: "http://localhost:5029/img/Woman/type1/img1.avif", desc: "Sophisticated charm for the evening." }
];

const WeddingMoments: React.FC = () => {
  return (
    <section className="py-24 bg-kirti-cream">
      <div className="container mx-auto px-4 md:px-8 max-w-[1600px]">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl text-kirti-dark-brown uppercase tracking-widest mb-4">
            For Every Wedding Moment
          </h2>
          <div className="w-16 h-[1px] bg-kirti-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {moments.map((moment, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white p-4 border border-kirti-border/30 hover:border-kirti-gold transition-colors duration-300"
            >
              <Link to={`/collections/${moment.title.toLowerCase()}`} className="block relative overflow-hidden aspect-[4/3] mb-6">
                <img 
                  src={moment.image} 
                  alt={moment.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </Link>
              <div className="text-center pb-4">
                <h3 className="font-display text-2xl text-kirti-dark-brown uppercase tracking-widest mb-2">
                  {moment.title}
                </h3>
                <p className="font-body text-xs md:text-sm text-kirti-brown mb-4">
                  {moment.desc}
                </p>
                <Link to={`/collections/${moment.title.toLowerCase()}`} className="inline-flex items-center font-body text-xs text-kirti-gold uppercase tracking-widest group/btn hover:text-kirti-dark-brown transition-colors">
                  <span>Shop Now</span>
                  <ArrowRight size={14} className="ml-2 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeddingMoments;
