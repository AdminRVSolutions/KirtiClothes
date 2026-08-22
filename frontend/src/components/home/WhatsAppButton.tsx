import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
  const whatsappNumber = "919702050640"; // Configurable later via admin
  const defaultMessage = encodeURIComponent("Hello Kirti Dress Centre, I would like to enquire about your ethnic wear collection.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_18px_rgba(41,27,18,0.2)] hover:scale-110 hover:shadow-[0_6px_24px_rgba(41,27,18,0.3)] transition-all duration-300 flex items-center justify-center group"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle size={28} />
      <span className="absolute right-full mr-4 bg-white text-kirti-dark-brown text-xs font-body font-medium py-2 px-3 rounded shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Chat with us
      </span>
    </a>
  );
};

export default WhatsAppButton;
