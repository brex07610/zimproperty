import { useParams, Link } from 'react-router-dom';
import { mockProperties } from '../data/mockProperties';
import { 
  BedDouble, 
  Bath, 
  Maximize2, 
  MapPin, 
  ShieldCheck, 
  MessageCircle, 
  Phone, 
  ChevronLeft,
  Share2,
  Heart,
  Droplets,
  Sun,
  Shield,
  GraduationCap,
  Users
} from 'lucide-react';
import { motion } from 'motion/react';
import { getWhatsAppLink, generatePropertyMessage } from '../utils/whatsapp';
import { PropertyCard } from '../components/PropertyCard';

export const PropertyDetails = () => {
  const { id } = useParams();
  const property = mockProperties.find(p => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Property not found</h2>
        <Link to="/" className="text-zim-green font-bold flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    );
  }

  const waLink = getWhatsAppLink(
    '26377000000', // Placeholder Zimbabwe number
    generatePropertyMessage(property.title, property.id, property.listingType)
  );

  const similarProperties = mockProperties
    .filter(p => p.id !== property.id && p.listingType === property.listingType)
    .slice(0, 3);

  return (
    <div className="bg-white min-h-screen">
      {/* breadcrumbs & Actions */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
        <Link to={`/${property.listingType.toLowerCase() === 'development' ? 'developments' : property.listingType.toLowerCase()}`} className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-zim-green transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to listings
        </Link>
        <div className="flex gap-4">
          <button className="p-2 hover:bg-gray-50 rounded-full transition-colors"><Share2 className="w-5 h-5 text-gray-400" /></button>
          <button className="p-2 hover:bg-gray-50 rounded-full transition-colors"><Heart className="w-5 h-5 text-gray-400" /></button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12 pb-20">
        {/* Left Column: Gallery & Details */}
        <div className="lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[2.5rem] overflow-hidden aspect-[16/10] bg-gray-100 mb-8 border border-gray-100 shadow-sm"
          >
            <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
          </motion.div>

          <div className="mb-10">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="bg-zim-green text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                {property.listingType === 'Boarding' ? 'Student Boarding' : property.listingType}
              </span>
              {property.isVerified && (
                <span className="bg-zim-green/10 text-zim-green px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Listing
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">{property.title}</h1>
            <div className="flex items-center gap-2 text-gray-400 font-medium">
              <MapPin className="w-5 h-5 text-zim-green" />
              <span>{property.location}, {property.city}, Zimbabwe</span>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 bg-zim-surface rounded-[2rem] mb-12 border border-gray-100">
            <div className="text-center md:border-r border-gray-200">
              <div className="text-zim-green font-bold text-2xl mb-1">${property.price.toLocaleString()}</div>
              <div className="text-[10px] uppercase font-extrabold text-gray-400 tracking-widest">
                {property.listingType === 'Sale' ? 'Asking Price' : 'Per Month'}
              </div>
            </div>
            {property.bedrooms > 0 && (
              <div className="text-center md:border-r border-gray-200">
                <div className="flex justify-center items-center gap-2 text-zim-ink font-bold text-2xl mb-1">
                  <BedDouble className="w-5 h-5 text-zim-green" /> {property.bedrooms}
                </div>
                <div className="text-[10px] uppercase font-extrabold text-gray-400 tracking-widest">Bedrooms</div>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="text-center md:border-r border-gray-200">
                <div className="flex justify-center items-center gap-2 text-zim-ink font-bold text-2xl mb-1">
                  <Bath className="w-5 h-5 text-zim-green" /> {property.bathrooms}
                </div>
                <div className="text-[10px] uppercase font-extrabold text-gray-400 tracking-widest">Bathrooms</div>
              </div>
            )}
            {property.size && (
              <div className="text-center">
                <div className="flex justify-center items-center gap-2 text-zim-ink font-bold text-2xl mb-1">
                  <Maximize2 className="w-5 h-5 text-zim-green" /> {property.size}
                </div>
                <div className="text-[10px] uppercase font-extrabold text-gray-400 tracking-widest">Sqm Area</div>
              </div>
            )}
          </div>

          <div className="space-y-12">
            <section>
              <h3 className="text-2xl font-bold mb-6">Property Description</h3>
              <div className="text-gray-600 leading-relaxed text-lg space-y-4">
                <p>
                  This exceptional {property.type.toLowerCase()} located in the heart of {property.location}, {property.city} offers a unique blend of 
                  contemporary design and practical living. With {property.bedrooms > 0 ? `${property.bedrooms} spacious bedrooms` : ''} 
                  {property.bathrooms > 0 ? ` and ${property.bathrooms} modern bathrooms` : ''}, this property is designed to meet the highest standards 
                  of comfort and convenience.
                </p>
                <p>
                  The living space {property.size ? `spanning ${property.size} sqm` : ''} provides ample room for both relaxation and entertainment. 
                  The property is characteristically {property.type === 'Development' ? 'a prime investment opportunity' : 'ready for immediate occupation'}, 
                  boasting high-quality finishes and an architectural style that complements the surrounding neighborhood.
                </p>
                <p>
                  Whether you are looking for a {property.listingType.toLowerCase() === 'sale' ? 'permanent home' : 'rental space'}, 
                  this {property.location} residence ensures accessibility to key amenities while providing a private sanctuary away from the hustle and bustle.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-6">Key Features & Amenities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.features.map((feature, i) => {
                  const featLower = feature.toLowerCase();
                  let icon = <Shield className="w-5 h-5 text-zim-green" />;
                  
                  if (featLower.includes('borehole') || featLower.includes('water')) icon = <Droplets className="w-5 h-5 text-zim-green" />;
                  else if (featLower.includes('solar') || featLower.includes('power')) icon = <Sun className="w-5 h-5 text-zim-green" />;
                  else if (featLower.includes('fence') || featLower.includes('gate') || featLower.includes('guard')) icon = <ShieldCheck className="w-5 h-5 text-zim-green" />;
                  
                  return (
                    <motion.div 
                      key={i} 
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-gray-100 hover:border-zim-green/30 hover:shadow-md transition-all cursor-default"
                    >
                      <div className="w-12 h-12 rounded-xl bg-zim-green/5 flex items-center justify-center flex-shrink-0">
                        {icon}
                      </div>
                      <div>
                        <span className="font-bold text-gray-800">{feature}</span>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Property Amenity</p>
                      </div>
                    </motion.div>
                  );
                })}
                {property.listingType === 'Boarding' && (
                   <div className="flex items-center gap-4 p-5 rounded-2xl bg-zim-green text-white col-span-1 md:col-span-2">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="font-bold text-lg">Proximity to University</span>
                      <p className="text-white/80 text-sm">Near {property.universityNearby} ({property.distanceFromCampus}) - Ideal for students</p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>

        {/* Right Column: Contact Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-zim-surface rounded-2xl overflow-hidden flex items-center justify-center">
                  <Users className="w-8 h-8 text-gray-300" />
                </div>
                <div>
                  <div className="font-bold text-lg">ZimProperty Agent</div>
                  <div className="text-xs text-zim-green font-extrabold uppercase tracking-widest flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" /> Platinum Agency
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <a 
                  href={waLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full bg-zim-green text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-opacity-95 shadow-lg shadow-zim-green/20 transition-all"
                >
                  <MessageCircle className="w-6 h-6" /> Chat on WhatsApp
                </a>
                <button className="w-full bg-zim-surface text-zim-ink py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-all">
                  <Phone className="w-5 h-5" /> Call Agent
                </button>
              </div>

              <div className="pt-8 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-400 font-medium">
                  Reference: ZP-{property.id}{property.city.substring(0, 3).toUpperCase()}
                </p>
                <p className="text-[10px] text-gray-300 mt-2 uppercase tracking-tighter">
                  Never pay deposits without a viewing and signed contract.
                </p>
              </div>
            </div>

            {/* Newsletter/Alert Card */}
            <div className="bg-zim-ink rounded-[2.5rem] p-8 text-white">
              <h4 className="font-bold text-xl mb-4 leading-tight">Can't find what you are looking for?</h4>
              <p className="text-gray-400 text-sm mb-6">Our agents are searching for you. Tell us your needs on WhatsApp.</p>
              <button className="text-zim-gold font-bold text-sm flex items-center gap-2">
                Talk to Support <MessageCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Listings */}
      <section className="bg-zim-surface py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10">Similar Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {similarProperties.map(p => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
