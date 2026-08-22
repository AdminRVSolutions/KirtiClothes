import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import clsx from 'clsx';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'best-selling', label: 'Best Selling' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
];

const SortDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentSort = searchParams.get('sort') || 'featured';
  const currentLabel = sortOptions.find(opt => opt.value === currentSort)?.label || 'Featured';

  const handleSelect = (value: string) => {
    searchParams.set('sort', value);
    setSearchParams(searchParams, { replace: true });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 border border-kirti-border px-4 py-2 text-sm font-body text-kirti-dark-brown hover:border-kirti-gold transition-colors"
      >
        <span>Sort by: <span className="font-medium">{currentLabel}</span></span>
        <ChevronDown size={16} className={clsx("transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-kirti-border/50 shadow-lg z-20 py-2">
          {sortOptions.map(option => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={clsx(
                "block w-full text-left px-4 py-2 text-sm font-body transition-colors hover:bg-kirti-cream",
                currentSort === option.value ? "text-kirti-gold font-medium" : "text-kirti-brown"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
