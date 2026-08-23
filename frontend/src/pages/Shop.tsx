import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import FilterSidebar from '../components/shop/FilterSidebar';
import SortDropdown from '../components/shop/SortDropdown';
import ProductGrid from '../components/shop/ProductGrid';

import { getProducts, API_BASE } from '../api';

const Shop: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [products, setProducts] = React.useState<any[]>([]);

  React.useEffect(() => {
    getProducts().then(data => {
      let filteredData = data;
      
      if (slug) {
        if (slug.toLowerCase() === 'men') {
          filteredData = data.filter((p: any) => p.gender?.toLowerCase() === 'men' || p.category?.name?.toLowerCase() === 'men');
        } else if (slug.toLowerCase() === 'women') {
          filteredData = data.filter((p: any) => p.gender?.toLowerCase() === 'women' || p.category?.name?.toLowerCase() === 'women');
        } else {
          filteredData = data.filter((p: any) => p.category?.slug?.toLowerCase() === slug.toLowerCase() || p.category?.name?.toLowerCase() === slug.toLowerCase());
        }
      }

      // Format data for the grid (mapping imageUrl to image)
      const formatted = filteredData.map((p: any) => ({
        ...p,
        category: p.category?.name || 'Uncategorized',
        image: p.imageUrl ? `${API_BASE}${p.imageUrl}` : '/img/img2.webp',
        mrp: p.price * 1.2, // simulate MRP
      }));
      setProducts(formatted);
    });
  }, [slug]);

  let displayTitle = 'Shop All';
  if (slug) {
    if (slug.toLowerCase() === 'men') displayTitle = 'Men\'s Collection';
    else if (slug.toLowerCase() === 'women') displayTitle = 'Women\'s Collection';
    else displayTitle = slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' ');
  }

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header Section */}
      <div className="bg-kirti-cream py-12 md:py-16 mb-8 border-b border-kirti-border/30 text-center px-4">
        <h1 className="font-display text-4xl md:text-5xl text-kirti-dark-brown uppercase tracking-widest mb-4">
          {displayTitle}
        </h1>
        <p className="font-body text-sm text-kirti-brown max-w-xl mx-auto">
          Discover our complete collection of premium ethnic wear, carefully crafted for every special occasion.
        </p>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-[1600px]">
        {/* Controls Bar */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-kirti-border/50">
          <div className="flex items-center">
            <button 
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center space-x-2 text-kirti-dark-brown font-body text-sm uppercase tracking-wider"
            >
              <SlidersHorizontal size={18} />
              <span>Filters</span>
            </button>
            <span className="hidden lg:block font-body text-sm text-kirti-brown">
              Showing {products.length} Products
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <SortDropdown />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <FilterSidebar 
            isOpen={isMobileFilterOpen} 
            onClose={() => setIsMobileFilterOpen(false)} 
          />
          
          <div className="flex-1 w-full">
            <ProductGrid products={products} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
