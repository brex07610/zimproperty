import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export const FloatingWhatsApp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    const tooltipTimer = setTimeout(() => setShowTooltip(true), 5000);
    return () => {
      clearTimeout(timer);
      clearTimeout(tooltipTimer);
    };
  }, []);

  const waLink = "https://wa.me/26377000000?text=Hi%20ZimProperty%2C%20I%20need%20help%20finding%20a%20property.";

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            className="relative"
          >
            {showTooltip && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute right-16 top-1/2 -translate-y-1/2 bg-white text-zim-ink px-4 py-2 rounded-xl shadow-xl border border-gray-100 text-xs font-bold whitespace-nowrap hidden md:block"
              >
                Need help? Chat with us!
                <button 
                  onClick={() => setShowTooltip(false)}
                  className="ml-2 text-gray-300 hover:text-red-400"
                >
                  <X className="w-3 h-3 inline" />
                </button>
              </motion.div>
            )}
            
            <a 
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-95 group relative"
            >
              <MessageCircle className="w-7 h-7" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full animate-pulse" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
