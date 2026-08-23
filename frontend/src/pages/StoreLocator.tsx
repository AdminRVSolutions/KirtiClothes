import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const StoreLocator: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pt-12 pb-24">
      {/* Header Section */}
      <div className="bg-kirti-cream py-12 md:py-16 mb-8 border-b border-kirti-border/30 text-center px-4">
        <h1 className="font-display text-4xl md:text-5xl text-kirti-dark-brown uppercase tracking-widest mb-4">
          Visit Our Store
        </h1>
        <p className="font-body text-sm text-kirti-brown max-w-xl mx-auto uppercase tracking-widest">
          किर्ती ड्रेस केंद्र
        </p>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Store Details */}
          <div className="flex flex-col space-y-8">
            <div>
              <h2 className="font-display text-3xl text-kirti-dark-brown mb-6 uppercase tracking-wider">Kirti Dress Centre</h2>
              <p className="font-body text-kirti-brown leading-relaxed mb-8">
                Since 1969, Kirti Dress Centre has been the premier destination for premium ethnic wear in Mumbai. 
                Experience our exclusive collections in person and receive personalized styling advice from our experts.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-kirti-cream text-kirti-dark-brown rounded-full mt-1">
                  <MapPin size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-lg text-kirti-dark-brown uppercase tracking-wider mb-2">Location</h3>
                  <p className="font-body text-kirti-brown">
                    Kirti Dress Centre<br />
                    Dadar East<br />
                    Mumbai, Maharashtra<br />
                    India
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-kirti-cream text-kirti-dark-brown rounded-full mt-1">
                  <Clock size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-lg text-kirti-dark-brown uppercase tracking-wider mb-2">Hours</h3>
                  <p className="font-body text-kirti-brown">
                    Monday - Saturday: 10:30 AM - 8:30 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-kirti-cream text-kirti-dark-brown rounded-full mt-1">
                  <Phone size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-lg text-kirti-dark-brown uppercase tracking-wider mb-2">Contact</h3>
                  <p className="font-body text-kirti-brown">
                    Phone: +91 84248 14474<br />
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Area */}
          <div className="h-[400px] lg:h-full min-h-[400px] bg-kirti-ivory border border-kirti-border/30 relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15086.131109041261!2d72.84024823868205!3d19.01824794833215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cecc5e9d5e3d%3A0xc6c3ec7eb123b3a!2sDadar%20East%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
              title="Kirti Dress Centre Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreLocator;
