import { useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { mockProperties } from '../data/mockProperties';
import { PropertyCard } from '../components/PropertyCard';
import { SlidersHorizontal, Search as SearchIcon, X, ArrowUpDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CompareModal } from '../components/CompareModal';

type SortOption = 'price_asc' | 'price_desc' | 'newest' | 'oldest' | 'sqm_asc' | 'sqm_desc' | 'distance_asc';

export const ListingPage = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  
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
    let result = mockProperties.filter(p => {
      if (!category) return true;
      const type = p.listingType.toLowerCase();
      if (category === 'sale' && type === 'sale') return true;
      if (category === 'rent' && type === 'rent') return true;
      if (category === 'boarding' && type === 'boarding') return true;
      if (category === 'developments' && type === 'development') return true;
      return false;
    });

    // Apply Sorting
    return [...result].sort((a, b) => {
      switch (sortBy) {
        case 'price_asc': return a.price - b.price;
        case 'price_desc': return b.price - a.price;
        case 'newest': return new Date(b.dateListed).getTime() - new Date(a.dateListed).getTime();
        case 'oldest': return new Date(a.dateListed).getTime() - new Date(b.dateListed).getTime();
        case 'sqm_asc': {
          const aP = a.size ? a.price / a.size : Infinity;
          const bP = b.size ? b.price / b.size : Infinity;
          return aP - bP;
        }
        case 'sqm_desc': {
          const aP = a.size ? a.price / a.size : -1;
          const bP = b.size ? b.price / b.size : -1;
          return bP - aP;
        }
        case 'distance_asc': {
          const aD = a.distanceKm ?? Infinity;
          const bD = b.distanceKm ?? Infinity;
          return aD - bD;
        }
        default: return 0;
      }
    });
  }, [category, sortBy]);

  const toggleCompare = (id: string) => {
    setCompareIds(prev => {
      if (prev.includes(id)) return prev.filter(i => i !== id);
      if (prev.length >= 4) return prev;
      return [...prev, id];
    });
  };

  const selectedProperties = mockProperties.filter(p => compareIds.includes(p.id));

  return (
    <div className="bg-zim-surface min-h-screen pb-24">
      {/* Comparison Drawer Trigger */}
      <AnimatePresence>
        {compareIds.length > 0 && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md px-4"
          >
            <div className="bg-zim-ink rounded-full px-6 py-4 shadow-2xl flex items-center justify-between border border-white/10 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="bg-zim-green w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs">
                  {compareIds.length}
                </div>
                <div className="text-white text-xs font-bold uppercase tracking-widest">Selected</div>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setCompareIds([])}
                  className="text-white/40 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest"
                >
                  Clear
                </button>
                <button 
                  onClick={() => setShowCompareModal(true)}
                  className="bg-zim-green text-white px-5 py-2 rounded-full font-bold text-xs shadow-lg shadow-zim-green/20 hover:scale-105 transition-transform"
                >
                  Compare
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{categoryTitle}</h1>
            <p className="text-gray-500 text-sm">Showing {filteredProperties.length} results in Zimbabwe</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative group">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-white border border-gray-100 pl-4 pr-10 py-2 rounded-xl text-sm font-semibold outline-none hover:bg-gray-50 focus:border-zim-green transition-all cursor-pointer"
              >
                <option value="newest">Newest Listed</option>
                <option value="oldest">Oldest Listed</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="sqm_asc">$/sqm: Low to High</option>
                <option value="sqm_desc">$/sqm: High to Low</option>
                {category === 'boarding' && <option value="distance_asc">Location: Nearest to Campus</option>}
              </select>
              <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

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
              <PropertyCard 
                key={property.id} 
                property={property} 
                onCompareToggle={toggleCompare}
                isComparing={compareIds.includes(property.id)}
              />
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

      {showCompareModal && (
        <CompareModal 
          properties={selectedProperties}
          onClose={() => setShowCompareModal(false)}
          onRemove={toggleCompare}
        />
      )}
    </div>
  );
};
