import { PropertyCard } from './PropertyCard';
import { mockProperties } from '../data/mockProperties';
import { ChevronRight } from 'lucide-react';

export const FeaturedSection = () => {
  const featured = mockProperties.filter(p => p.isFeatured || p.listingType === 'Boarding').slice(0, 6);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-3">Featured Listings</h2>
            <p className="text-gray-500 max-w-md text-sm">Hand-picked properties and verified student boarding across Zimbabwe.</p>
          </div>
          <button className="text-zim-green font-bold text-sm flex items-center gap-1 group outline-none">
            View all properties <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};
