import { useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { mockProperties } from '../data/mockProperties';
import { PropertyCard } from '../components/PropertyCard';
import { Filter, SlidersHorizontal, Search as SearchIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ListingPage = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  
  const categoryTitle = useMemo(() => {
    switch(category) {
      case 'sale': return 'Houses for Sale';
      case 'rent': return 'Houses to Rent';
      case 'boarding': return 'Student Boarding';
      case 'developments': return 'New Developments';
      default: return 'All Properties';
    }
  }, [category]);

  const filteredProperties = useMemo(() => {
    return mockProperties.filter(p => {
      if (!category) return true;
      const type = p.listingType.toLowerCase();
      if (category === 'sale' && type === 'sale') return true;
      if (category === 'rent' && type === 'rent') return true;
      if (category === 'boarding' && type === 'boarding') return true;
      if (category === 'developments' && type === 'development') return true;
      return false;
    });
  }, [category]);

  return (
    <div className="bg-zim-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{categoryTitle}</h1>
            <p className="text-gray-500 text-sm">Showing {filteredProperties.length} results in Zimbabwe</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative flex-grow md:w-64">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search suburb..." 
                className="w-full bg-white border border-gray-100 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:border-zim-green transition-colors"
              />
            </div>
            <button 
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 bg-white border border-gray-100 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Filters Sidebar (Mobile Drawer) */}
        <AnimatePresence>
          {showFilters && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowFilters(false)}
                className="fixed inset-0 bg-zim-ink/20 backdrop-blur-sm z-[60]" 
              />
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-[70] shadow-2xl p-8 flex flex-col"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-gray-50 rounded-full">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-grow space-y-8 overflow-y-auto pr-2 no-scrollbar">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 block">Price Range (USD)</label>
                    <div className="grid grid-cols-2 gap-4">
                      <input type="number" placeholder="Min" className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-sm outline-none" />
                      <input type="number" placeholder="Max" className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-sm outline-none" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 block">Zimbabwe Features</label>
                    <div className="grid grid-cols-1 gap-3">
                      {['Borehole', 'Solar Backup', 'Water Tank', 'Electric Fence', 'Cottage'].map(f => (
                        <label key={f} className="flex items-center gap-3 cursor-pointer group">
                          <div className="w-5 h-5 border-2 border-gray-200 rounded group-hover:border-zim-green transition-colors flex items-center justify-center">
                            {/* Checkbox placeholder */}
                          </div>
                          <span className="text-sm font-medium text-gray-600">{f}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-gray-100">
                  <button 
                    onClick={() => setShowFilters(false)}
                    className="w-full bg-zim-green text-white py-4 rounded-2xl font-bold shadow-lg shadow-zim-green/20"
                  >
                    Apply Filters
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.length > 0 ? (
            filteredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                <SearchIcon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">No properties found</h3>
              <p className="text-gray-500 max-w-xs mx-auto">Try broadening your search or clearing some filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
