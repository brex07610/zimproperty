import { Property } from '../types/property';
import { 
  BedDouble, 
  Bath, 
  Maximize2, 
  GraduationCap, 
  ShieldCheck, 
  MessageCircle,
  MapPin,
  Wifi,
  Utensils
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { getWhatsAppLink, generatePropertyMessage } from '../utils/whatsapp';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  const isBoarding = property.listingType === 'Boarding';
  
  const waLink = getWhatsAppLink(
    '26377000000', 
    generatePropertyMessage(property.title, property.id, property.listingType)
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex flex-col h-full"
    >
      {/* Image Header */}
      <Link to={`/listing/${property.id}`} className="relative aspect-[4/3] overflow-hidden block">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${
            property.listingType === 'Sale' ? 'bg-blue-500 text-white' :
            property.listingType === 'Rent' ? 'bg-orange-500 text-white' :
            property.listingType === 'Boarding' ? 'bg-zim-green text-white' :
            'bg-purple-600 text-white'
          }`}>
            {property.listingType === 'Boarding' ? 'Student Boarding' : 
             property.listingType === 'Sale' ? 'For Sale' :
             property.listingType === 'Rent' ? 'To Rent' : 'New Development'}
          </span>
          {property.isVerified && (
            <span className="bg-white/90 backdrop-blur-sm text-zim-green px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
              <ShieldCheck className="w-3 h-3" /> Verified
            </span>
          )}
        </div>

        {property.isFeatured && (
          <div className="absolute top-4 right-4 bg-zim-gold text-white px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
            Featured
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-2">
          <Link to={`/listing/${property.id}`} className="text-xl font-bold text-zim-green hover:underline">
            ${property.price.toLocaleString()}
            {property.listingType !== 'Sale' && property.listingType !== 'Development' && (
              <span className="text-sm font-medium text-gray-400">/mo</span>
            )}
          </Link>
          <button className="text-gray-300 hover:text-zim-gold transition-colors">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>

        <Link to={`/listing/${property.id}`} className="font-bold text-gray-800 line-clamp-1 mb-1 hover:text-zim-green transition-colors">
          {property.title}
        </Link>
        
        <div className="flex items-center gap-1 text-gray-400 text-xs mb-4">
          <MapPin className="w-3 h-3" />
          <span>{property.suburb}, {property.city}</span>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-6 border-t border-gray-50 pt-4">
          {property.bedrooms > 0 && (
            <div className="flex items-center gap-1.5">
              <BedDouble className="w-3.5 h-3.5 text-zim-green" />
              <span>{property.bedrooms} Bed</span>
            </div>
          )}
          {property.bathrooms > 0 && (
            <div className="flex items-center gap-1.5 border-l border-gray-100 pl-4">
              <Bath className="w-3.5 h-3.5 text-zim-green" />
              <span>{property.bathrooms} Bath</span>
            </div>
          )}
          {property.size && (
            <div className="flex items-center gap-1.5 border-l border-gray-100 pl-4">
              <Maximize2 className="w-3.5 h-3.5 text-zim-green" />
              <span>{property.size}m²</span>
            </div>
          )}
        </div>

        {/* Boarding Specific Tags */}
        {isBoarding && (
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="bg-gray-50 text-[10px] font-bold text-gray-600 px-2 py-1 rounded-md flex items-center gap-1">
              <GraduationCap className="w-3 h-3" /> Near {property.universityNearby}
            </div>
            {property.wifiIncluded && (
              <div className="bg-blue-50 text-[10px] font-bold text-blue-600 px-2 py-1 rounded-md flex items-center gap-1">
                <Wifi className="w-3 h-3" /> WiFi
              </div>
            )}
            {property.mealsIncluded && (
              <div className="bg-orange-50 text-[10px] font-bold text-orange-600 px-2 py-1 rounded-md flex items-center gap-1">
                <Utensils className="w-3 h-3" /> Meals
              </div>
            )}
          </div>
        )}

        {/* Action Button */}
        <div className="mt-auto pt-2">
          <a 
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="w-full bg-zim-green/5 text-zim-green font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-zim-green hover:text-white transition-all group/btn"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};
