import { useState } from 'react';
import { 
  Search, 
  Home, 
  Building2, 
  Users, 
  GraduationCap, 
  MapPin,
  MessageCircle,
} from 'lucide-react';
import { motion } from 'motion/react';

type Category = 'Boarding' | 'Sale' | 'Rent' | 'Developments';

export const Hero = () => {
  const [activeTab, setActiveTab] = useState<Category>('Boarding');

  return (
    <section className="relative bg-zim-ink py-16 md:py-32 overflow-hidden text-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000" 
          alt="Zimbabwe Property" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zim-ink via-zim-ink/80 to-transparent" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="max-w-2xl text-center md:text-left">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-bold leading-[1.1] mb-6 text-white"
          >
            Find Your Perfect <br />
            <span className="text-zim-gold underline decoration-zim-gold/30">Property</span> in Zimbabwe
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-300 mb-10 max-w-lg leading-relaxed mx-auto md:mx-0"
          >
            Search student boarding, homes for sale, rentals, and the latest property developments across all major cities.
          </motion.p>
        </div>

        {/* Search Matrix */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-2 md:p-4 max-w-4xl"
        >
          {/* Tabs */}
          <div className="flex border-b border-gray-50 mb-4 overflow-x-auto no-scrollbar scrollbar-hide">
            {(['Boarding', 'Sale', 'Rent', 'Developments'] as Category[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-none px-6 py-3 text-sm font-semibold transition-all relative outline-none ${
                  activeTab === tab ? 'text-zim-green' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <span className="flex items-center gap-2">
                  {tab === 'Boarding' && <GraduationCap className="w-4 h-4" />}
                  {tab === 'Sale' && <Home className="w-4 h-4" />}
                  {tab === 'Rent' && <Users className="w-4 h-4" />}
                  {tab === 'Developments' && <Building2 className="w-4 h-4" />}
                  {tab === 'Boarding' ? 'Student Boarding' : tab}
                </span>
                {activeTab === tab && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-0.5 bg-zim-green" />
                )}
              </button>
            ))}
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-2 items-end">
            <div className="flex flex-col gap-1.5 px-2">
              <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Location</label>
              <div className="flex items-center gap-2 py-1">
                <MapPin className="w-4 h-4 text-zim-green" />
                <input 
                  type="text" 
                  placeholder={activeTab === 'Boarding' ? "Near University..." : "City or Suburb"} 
                  className="w-full text-sm font-medium outline-none placeholder:text-gray-300"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-1.5 px-2 border-l border-gray-100 hidden md:flex">
              <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                {activeTab === 'Boarding' ? 'Budget' : 'Min Price'}
              </label>
              <div className="flex items-center gap-2 py-1 text-sm font-medium">
                <span className="text-gray-400">USD</span>
                <input type="number" placeholder="Any" className="w-full outline-none placeholder:text-gray-300 px-1" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 px-2 border-l border-gray-100 hidden md:flex">
              <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                {activeTab === 'Boarding' ? 'Room Type' : 'Bedrooms'}
              </label>
              <select className="bg-transparent outline-none text-sm font-medium appearance-none cursor-pointer py-1 block w-full">
                <option>Any</option>
                <option>{activeTab === 'Boarding' ? 'Single' : '1+ Bed'}</option>
                <option>{activeTab === 'Boarding' ? 'Sharing' : '2+ Bed'}</option>
                <option>{activeTab === 'Boarding' ? 'Ensuite' : '3+ Bed'}</option>
              </select>
            </div>

            <button className="bg-zim-green text-white rounded-xl md:rounded-2xl py-4 flex items-center justify-center gap-2 hover:bg-opacity-90 shadow-lg shadow-zim-green/20 transition-all font-semibold outline-none">
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
          </div>
        </motion.div>

        {/* Truststrip */}
        <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-6 text-[11px] font-bold uppercase tracking-widest text-gray-400">
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-zim-green" /> 5,000+ Listings</span>
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-zim-gold" /> All Major Cities</span>
          <span className="flex items-center gap-2 text-zim-green"><MessageCircle className="w-3.5 h-3.5" /> WhatsApp Support</span>
        </div>
      </div>
    </section>
  );
};
