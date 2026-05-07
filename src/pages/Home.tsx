import { 
  Building2, 
  ChevronRight, 
  GraduationCap, 
  Home, 
  Users,
  BedDouble,
  Droplets,
  Sun
} from 'lucide-react';
import { motion } from 'motion/react';
import { Hero } from '../components/Hero';
import { FeaturedSection } from '../components/FeaturedSection';

export const CategoriesGrid = () => {
  const categories = [
    { 
      title: 'Student Boarding', 
      desc: '1,200+ rooms near universities', 
      icon: GraduationCap, 
      color: 'bg-green-500',
      badge: 'Student Verified'
    },
    { 
      title: 'Houses for Sale', 
      desc: '800+ properties available', 
      icon: Home, 
      color: 'bg-blue-500'
    },
    { 
      title: 'Houses to Rent', 
      desc: '600+ rental listings', 
      icon: Users, 
      color: 'bg-orange-500' 
    },
    { 
      title: 'Developments', 
      desc: '45+ new housing projects', 
      icon: Building2, 
      color: 'bg-purple-500' 
    }
  ];

  return (
    <section className="py-20 max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-3">Explore Categories</h2>
          <p className="text-gray-500 max-w-md text-sm">Find exactly what you are looking for with our specialized property categories.</p>
        </div>
        <button className="text-zim-green font-bold text-sm flex items-center gap-1 group outline-none">
          View all categories <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -8 }}
            className="group cursor-pointer bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all"
          >
            <div className={`w-14 h-14 ${cat.color}/10 rounded-2xl flex items-center justify-center mb-6`}>
              <cat.icon className="w-7 h-7 text-zim-green" />
            </div>
            {cat.badge && (
              <span className="inline-block px-2 py-0.5 bg-zim-green/10 text-zim-green text-[10px] font-bold uppercase rounded-full mb-3">
                {cat.badge}
              </span>
            )}
            <h3 className="text-xl font-bold mb-2 group-hover:text-zim-green transition-colors">{cat.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{cat.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <CategoriesGrid />
      <FeaturedSection />
      
      {/* Quick University Section */}
      <section className="bg-zim-ink py-20 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-zim-gold text-xs font-bold uppercase tracking-[0.2em] mb-4 block">Student Specialized</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Finding Boarding <br /> Shouldn't be Hard.</h2>
              <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                We've mapped boarding houses near University of Zimbabwe, NUST, MSU, and more. 
                Focus on your studies, we'll find your stay.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Droplets, label: 'Reliable Water Access' },
                  { icon: Sun, label: 'Solar Powered Facilities' },
                  { icon: BedDouble, label: 'Single & Sharing Options' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-sm font-medium">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-zim-gold" />
                    </div>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-zim-green/20 rounded-[3rem] p-12">
                <div className="w-full h-full border border-white/10 rounded-[2rem] flex items-center justify-center relative">
                   <GraduationCap className="w-32 h-32 text-white/5 absolute transform -rotate-12" />
                   <div className="text-center">
                     <div className="text-6xl font-bold text-zim-gold mb-2">1,200+</div>
                     <div className="text-sm uppercase tracking-widest font-bold opacity-60">Verified Rooms</div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
