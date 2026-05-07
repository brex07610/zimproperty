import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import { Navbar } from './components/Navbar';
import HomePage from './pages/Home';
import { ListingPage } from './pages/ListingPage';
import { PropertyDetails } from './pages/PropertyDetails';
import { Dashboard } from './pages/Dashboard';
import { BlogPage } from './pages/Blog';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

const Footer = () => (
    <footer className="py-20 border-t border-gray-100 bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 text-left">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-zim-green rounded-lg flex items-center justify-center">
                <Building2 className="text-white w-5 h-5" />
              </div>
              <span className="text-2xl font-bold font-display text-zim-green">ZimProperty</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Zimbabwe's most comprehensive property platform. From student boarding to luxury sales.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">Properties</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="/sale" className="hover:text-zim-green">Houses for Sale</a></li>
              <li><a href="/rent" className="hover:text-zim-green">Houses to Rent</a></li>
              <li><a href="/boarding" className="hover:text-zim-green">Student Boarding</a></li>
              <li><a href="/developments" className="hover:text-zim-green">Developments</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">Cities</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-zim-green">Harare</a></li>
              <li><a href="#" className="hover:text-zim-green">Bulawayo</a></li>
              <li><a href="#" className="hover:text-zim-green">Mutare</a></li>
              <li><a href="#" className="hover:text-zim-green">Gweru</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">Support</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-zim-green">About Us</a></li>
              <li><a href="#" className="hover:text-zim-green">Contact</a></li>
              <li><a href="#" className="hover:text-zim-green">Help Center</a></li>
              <li><a href="#" className="hover:text-zim-green">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs">© 2026 ZimProperty Zimbabwe. Built for locals, by locals.</p>
          <div className="flex gap-6 text-xs font-bold uppercase tracking-widest text-gray-400">
            <a href="#" className="hover:text-zim-green">Facebook</a>
            <a href="#" className="hover:text-zim-green">WhatsApp</a>
            <a href="#" className="hover:text-zim-green">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
);

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-zim-surface flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/listing/:id" element={<PropertyDetails />} />
            <Route path="/:category" element={<ListingPage />} />
            <Route path="/blog" element={<BlogPage />} />
          </Routes>
        </div>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </Router>
  );
}
