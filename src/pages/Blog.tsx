import { motion } from 'motion/react';
import { Calendar, User, ChevronRight, GraduationCap, Home, Landmark } from 'lucide-react';

const articles = [
  {
    title: "The Ultimate Guide to Student Boarding in Harare",
    category: "Students",
    icon: GraduationCap,
    author: "Fadzai Mutero",
    date: "May 5, 2026",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
    excerpt: "Everything you need to know about finding safe, affordable rooms near UZ and HIT this semester."
  },
  {
    title: "Top 5 Neighborhoods for First-Time Buyers in Bulawayo",
    category: "Buying",
    icon: Home,
    author: "Blessing Maposa",
    date: "May 2, 2026",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
    excerpt: "From Hillside to Ascot, discover the best value-for-money suburbs in the City of Kings."
  },
  {
    title: "Understanding Property Conveyancing in Zimbabwe",
    category: "Legal",
    icon: Landmark,
    author: "Sarah Zhou",
    date: "April 28, 2026",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800",
    excerpt: "A simple breakdown of the legal process when buying or selling property in Zimbabwe."
  }
];

export const BlogPage = () => {
  return (
    <div className="bg-zim-surface min-h-screen">
      <section className="bg-zim-ink py-20 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">ZimProperty Blog</h1>
          <p className="text-gray-400 text-lg">Your trusted source for Zimbabwean property news, guides, and investment tips.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, idx) => (
            <motion.article 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex flex-col h-full"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-zim-green/10 text-zim-green text-[10px] font-bold uppercase tracking-widest rounded-full">
                    <article.icon className="w-3 h-3" /> {article.category}
                  </span>
                </div>
                <h2 className="text-xl font-bold mb-4 group-hover:text-zim-green transition-colors">{article.title}</h2>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed line-clamp-2">{article.excerpt}</p>
                
                <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                    <User className="w-3 h-3" /> {article.author}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                    <Calendar className="w-3 h-3" /> {article.date}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-20 text-center">
          <button className="bg-zim-green text-white px-8 py-4 rounded-2xl font-bold hover:bg-opacity-95 transition-all shadow-lg shadow-zim-green/20 outline-none">
            Load More Articles
          </button>
        </div>
      </div>
    </div>
  );
};
