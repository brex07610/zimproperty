import { useState } from 'react';
import { 
  Building2, 
  Menu,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const navLinks = [
    { label: 'Buy', path: '/sale' },
    { label: 'Rent', path: '/rent' },
    { label: 'Student Boarding', path: '/boarding', badge: 'New' },
    { label: 'Developments', path: '/developments' },
    { label: 'Blog', path: '/blog' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 outline-none">
          <div className="w-8 h-8 bg-zim-green rounded-lg flex items-center justify-center">
            <Building2 className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold font-display text-zim-green">ZimProperty</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`hover:text-zim-green transition-colors flex items-center gap-1 ${
                location.pathname === link.path ? 'text-zim-green' : 'text-gray-600'
              }`}
            >
              {link.label}
              {link.badge && (
                <span className="bg-zim-green/10 text-zim-green text-[10px] px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
          <Link to="/dashboard" className="text-gray-400 hover:text-zim-green transition-colors">Agent Portal</Link>
          <button className="bg-zim-green text-white px-5 py-2 rounded-full hover:bg-opacity-90 transition-all text-xs outline-none">
            List Property
          </button>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 outline-none">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-100 p-4 flex flex-col gap-2 text-sm font-medium shadow-xl"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                onClick={() => setIsOpen(false)}
                className={`py-3 px-2 rounded-xl transition-colors ${
                  location.pathname === link.path ? 'bg-zim-green/5 text-zim-green' : 'hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <button className="w-full bg-zim-green text-white py-4 rounded-xl font-bold">List Property</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
