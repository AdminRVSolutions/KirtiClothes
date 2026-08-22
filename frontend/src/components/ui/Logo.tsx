import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  isDark?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = '', isDark = true }) => {
  return (
    <Link to="/" className={`flex flex-col items-center justify-center ${className}`}>
      <span 
        className={`font-display text-2xl md:text-3xl tracking-[0.2em] uppercase font-medium leading-none ${isDark ? 'text-kirti-dark-brown' : 'text-kirti-ivory'}`}
      >
        K I R T I
      </span>
      <span 
        className={`mt-1 font-body text-[8px] md:text-[10px] tracking-[0.1em] uppercase ${isDark ? 'text-kirti-brown' : 'text-kirti-cream'}`}
      >
        Since 1969
      </span>
    </Link>
  );
};

export default Logo;
