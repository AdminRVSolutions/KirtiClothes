import React from 'react';
import Hero from '../components/home/Hero';
import Heritage from '../components/home/Heritage';
import CategoryCards from '../components/home/CategoryCards';
import FeaturedProducts from '../components/home/FeaturedProducts';
import GroomsCollection from '../components/home/GroomsCollection';
import WeddingMoments from '../components/home/WeddingMoments';
import WhyChooseKirti from '../components/home/WhyChooseKirti';
import CustomerReviews from '../components/home/CustomerReviews';
import StoreExperience from '../components/home/StoreExperience';
import Instagram from '../components/home/Instagram';
import Newsletter from '../components/home/Newsletter';
import WhatsAppButton from '../components/home/WhatsAppButton';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Heritage />
      <CategoryCards />
      <FeaturedProducts />
      <GroomsCollection />
      <WeddingMoments />
      <WhyChooseKirti />
      <CustomerReviews />
      <StoreExperience />
      <Instagram />
      <Newsletter />
      <WhatsAppButton />
    </div>
  );
};

export default Home;
