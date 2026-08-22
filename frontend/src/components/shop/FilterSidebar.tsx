import React, { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import clsx from 'clsx';

const categories = ["Sherwanis", "Indo-Western", "Kurtas", "Groom's Collection", "Wedding Wear", "Accessories"];
const sizes = ["36", "38", "40", "42", "44", "46", "Custom"];
const colors = [
  { name: 'Ivory', hex: '#FFFFF0' },
  { name: 'Gold', hex: '#D4AF37' },
  { name: 'Maroon', hex: '#800000' },
  { name: 'Navy', hex: '#000080' },
  { name: 'Black', hex: '#000000' },
  { name: 'Emerald', hex: '#50C878' }
];

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ isOpen, onClose }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    size: true,
    color: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCheckboxChange = (key: string, value: string) => {
    const current = new Set(searchParams.getAll(key));
    if (current.has(value)) {
      current.delete(value);
    } else {
      current.add(value);
    }
    searchParams.delete(key);
    current.forEach(v => searchParams.append(key, v));
    setSearchParams(searchParams, { replace: true });
  };

  const clearAll = () => {
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  const selectedCategories = new Set(searchParams.getAll('category'));
  const selectedSizes = new Set(searchParams.getAll('size'));
  const selectedColors = new Set(searchParams.getAll('color'));

  const sidebarContent = (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      <div className="p-4 border-b border-kirti-border/50 flex justify-between items-center lg:hidden">
        <span className="font-display text-lg uppercase tracking-widest text-kirti-dark-brown">Filters</span>
        <button onClick={onClose}><X size={24} className="text-kirti-brown" /></button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Category Accordion */}
        <div className="border-b border-kirti-border/30 pb-4">
          <button 
            className="flex justify-between items-center w-full text-left font-display text-lg text-kirti-dark-brown uppercase tracking-wider mb-2"
            onClick={() => toggleSection('category')}
          >
            Category {openSections.category ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {openSections.category && (
            <div className="space-y-2 mt-4">
              {categories.map(cat => (
                <label key={cat} className="flex items-center space-x-3 cursor-pointer group">
                  <div className={clsx(
                    "w-4 h-4 border flex items-center justify-center transition-colors",
                    selectedCategories.has(cat) ? "border-kirti-gold bg-kirti-gold" : "border-kirti-brown/50 group-hover:border-kirti-gold"
                  )}>
                    {selectedCategories.has(cat) && <span className="text-white text-[10px]">✓</span>}
                  </div>
                  <span className="font-body text-sm text-kirti-brown group-hover:text-kirti-dark-brown">{cat}</span>
                  <input type="checkbox" className="hidden" checked={selectedCategories.has(cat)} onChange={() => handleCheckboxChange('category', cat)} />
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Size Accordion */}
        <div className="border-b border-kirti-border/30 pb-4">
          <button 
            className="flex justify-between items-center w-full text-left font-display text-lg text-kirti-dark-brown uppercase tracking-wider mb-2"
            onClick={() => toggleSection('size')}
          >
            Size {openSections.size ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {openSections.size && (
            <div className="flex flex-wrap gap-2 mt-4">
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => handleCheckboxChange('size', size)}
                  className={clsx(
                    "px-3 py-1.5 border text-xs font-body uppercase tracking-wider transition-colors",
                    selectedSizes.has(size) 
                      ? "bg-kirti-dark-brown border-kirti-dark-brown text-white" 
                      : "border-kirti-border text-kirti-brown hover:border-kirti-gold"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Color Accordion */}
        <div className="border-b border-kirti-border/30 pb-4">
          <button 
            className="flex justify-between items-center w-full text-left font-display text-lg text-kirti-dark-brown uppercase tracking-wider mb-2"
            onClick={() => toggleSection('color')}
          >
            Color {openSections.color ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {openSections.color && (
            <div className="flex flex-wrap gap-3 mt-4">
              {colors.map(color => (
                <button
                  key={color.name}
                  onClick={() => handleCheckboxChange('color', color.name)}
                  title={color.name}
                  className={clsx(
                    "w-8 h-8 rounded-full border-2 transition-transform hover:scale-110",
                    selectedColors.has(color.name) ? "border-kirti-gold scale-110 shadow-md" : "border-gray-200"
                  )}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t border-kirti-border/50 flex space-x-4">
        <button 
          onClick={clearAll}
          className="flex-1 py-3 border border-kirti-dark-brown text-kirti-dark-brown font-body text-xs uppercase tracking-widest hover:bg-kirti-dark-brown hover:text-white transition-colors"
        >
          Clear
        </button>
        <button 
          onClick={onClose}
          className="flex-1 py-3 bg-kirti-dark-brown text-white font-body text-xs uppercase tracking-widest hover:bg-kirti-gold transition-colors lg:hidden"
        >
          Apply
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          <div className="absolute inset-x-0 bottom-0 h-[80vh] bg-white transform transition-transform rounded-t-xl overflow-hidden">
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0 sticky top-[100px] h-[calc(100vh-100px)] overflow-y-auto">
        {sidebarContent}
      </div>
    </>
  );
};

export default FilterSidebar;
