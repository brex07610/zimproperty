import { X, Check, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Property } from '../types/property';

interface CompareModalProps {
  properties: Property[];
  onClose: () => void;
  onRemove: (id: string) => void;
}

export const CompareModal = ({ properties, onClose, onRemove }: CompareModalProps) => {
  if (properties.length === 0) return null;

  const features = Array.from(new Set(properties.flatMap(p => p.features)));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-zim-ink/90 backdrop-blur-md flex items-end sm:items-center justify-center p-4"
      >
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="bg-white w-full max-w-6xl rounded-[2.5rem] overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
            <div>
              <h2 className="text-2xl font-bold">Compare Properties</h2>
              <p className="text-gray-400 text-sm">Comparing {properties.length} selected properties</p>
            </div>
            <button 
              onClick={onClose}
              className="p-3 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Comparison Table Container */}
          <div className="overflow-auto p-8 pt-0">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-100">
                <thead>
                  <tr className="divide-x divide-gray-100">
                    <th className="sticky left-0 bg-white z-20 py-4 px-6 text-left min-w-[200px]">
                      <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Specifications</div>
                    </th>
                    {properties.map(property => (
                      <th key={property.id} className="py-4 px-6 min-w-[280px] relative group">
                        <button 
                          onClick={() => onRemove(property.id)}
                          className="absolute -top-2 -right-2 bg-red-400 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-30 shadow-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="text-left">
                          <img 
                            src={property.image} 
                            alt="" 
                            className="w-full aspect-video object-cover rounded-2xl mb-4" 
                          />
                          <div className="font-bold text-zim-ink line-clamp-1 mb-1">{property.title}</div>
                          <div className="text-zim-green font-bold text-lg">${property.price.toLocaleString()}</div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {/* Basic Specs */}
                  <tr className="divide-x divide-gray-100 hover:bg-zim-surface transition-colors">
                    <td className="sticky left-0 bg-white z-10 py-4 px-6 font-bold text-sm text-gray-500">Location</td>
                    {properties.map(p => (
                      <td key={p.id} className="py-4 px-6 text-sm text-gray-700">{p.location}, {p.city}</td>
                    ))}
                  </tr>
                  <tr className="divide-x divide-gray-100 hover:bg-zim-surface transition-colors">
                    <td className="sticky left-0 bg-white z-10 py-4 px-6 font-bold text-sm text-gray-500">Type</td>
                    {properties.map(p => (
                      <td key={p.id} className="py-4 px-6 text-sm text-gray-700 font-semibold">{p.type}</td>
                    ))}
                  </tr>
                  <tr className="divide-x divide-gray-100 hover:bg-zim-surface transition-colors">
                    <td className="sticky left-0 bg-white z-10 py-4 px-6 font-bold text-sm text-gray-500">Bedrooms</td>
                    {properties.map(p => (
                      <td key={p.id} className="py-4 px-6 text-sm text-gray-700 font-bold">{p.bedrooms || '-'}</td>
                    ))}
                  </tr>
                  <tr className="divide-x divide-gray-100 hover:bg-zim-surface transition-colors">
                    <td className="sticky left-0 bg-white z-10 py-4 px-6 font-bold text-sm text-gray-500">Bathrooms</td>
                    {properties.map(p => (
                      <td key={p.id} className="py-4 px-6 text-sm text-gray-700 font-bold">{p.bathrooms || '-'}</td>
                    ))}
                  </tr>
                  <tr className="divide-x divide-gray-100 hover:bg-zim-surface transition-colors">
                    <td className="sticky left-0 bg-white z-10 py-4 px-6 font-bold text-sm text-gray-500">Size</td>
                    {properties.map(p => (
                      <td key={p.id} className="py-4 px-6 text-sm text-gray-700">{p.size ? `${p.size} sqm` : '-'}</td>
                    ))}
                  </tr>
                  
                  {/* Features Comparison */}
                  <tr>
                    <td colSpan={properties.length + 1} className="bg-gray-50 py-3 px-6 text-[10px] uppercase font-bold text-gray-400 tracking-widest italic">
                      Amenities & Features
                    </td>
                  </tr>
                  {features.map(feature => (
                    <tr key={feature} className="divide-x divide-gray-100 hover:bg-zim-surface transition-colors">
                      <td className="sticky left-0 bg-white z-10 py-4 px-6 font-bold text-sm text-gray-500">{feature}</td>
                      {properties.map(p => (
                        <td key={p.id} className="py-4 px-6 text-center">
                          {p.features.includes(feature) ? (
                            <CheckCircle2 className="w-5 h-5 text-zim-green mx-auto" />
                          ) : (
                            <div className="w-5 h-5 border-2 border-gray-100 rounded-full mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-6 bg-zim-surface border-t border-gray-100 text-center">
            <button 
              onClick={onClose}
              className="bg-zim-ink text-white px-8 py-3 rounded-xl font-bold hover:bg-zim-green transition-colors"
            >
              Done Comparing
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
