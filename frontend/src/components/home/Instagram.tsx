import React from 'react';
const InstagramIcon = ({ className, size = 24 }: { className?: string; size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const instagramImages = [
  "http://localhost:5029/img/imge3.webp",
  "http://localhost:5029/img/Men/type1/img1.avif",
  "http://localhost:5029/img/Men/type2/img2.avif",
  "http://localhost:5029/img/Woman/type1/img1.avif",
  "http://localhost:5029/img/Woman/salwarkameej/img3.avif",
  "http://localhost:5029/img/img2.webp"
];

const Instagram: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-[1600px] text-center mb-12">
        <h2 className="font-display text-2xl md:text-4xl text-kirti-dark-brown uppercase tracking-widest mb-4">
          Follow Kirti
        </h2>
        <a href="https://instagram.com/kirti_ethnic" target="_blank" rel="noreferrer" className="inline-flex items-center text-kirti-brown hover:text-kirti-gold font-body text-sm uppercase tracking-widest transition-colors">
          <InstagramIcon size={16} className="mr-2" />
          @kirti_ethnic
        </a>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full">
        {instagramImages.map((img, idx) => (
          <a key={idx} href="https://instagram.com/kirti_ethnic" target="_blank" rel="noreferrer" className="group relative aspect-square block overflow-hidden">
            <img 
              src={img} 
              alt="Instagram Post" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-kirti-dark-brown/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <InstagramIcon className="text-white w-8 h-8" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Instagram;
