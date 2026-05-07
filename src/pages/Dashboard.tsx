import { useState } from 'react';
import { 
  Building2, 
  BarChart3, 
  Plus, 
  MessageSquare, 
  Settings, 
  LogOut,
  Eye,
  Trash2,
  Edit2,
  Clock
} from 'lucide-react';
import { motion } from 'motion/react';
import { mockProperties } from '../data/mockProperties';

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('listings');

  const stats = [
    { label: 'Active Listings', value: '4', icon: Building2, color: 'bg-green-50' },
    { label: 'Total Views', value: '1,280', icon: Eye, color: 'bg-blue-50' },
    { label: 'WhatsApp Clicks', value: '84', icon: MessageSquare, color: 'bg-zim-green/10' },
    { label: 'Pending Review', value: '1', icon: Clock, color: 'bg-amber-50' },
  ];

  return (
    <div className="min-h-screen bg-zim-surface flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-100 p-6 sticky top-16 h-[calc(100vh-64px)]">
        <div className="space-y-2 flex-grow">
          {[
            { id: 'listings', label: 'My Listings', icon: Building2 },
            { id: 'leads', label: 'Enquiries', icon: MessageSquare },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'settings', label: 'Account Settings', icon: Settings },
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === item.id ? 'bg-zim-green text-white shadow-lg shadow-zim-green/20' : 'text-gray-400 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>

        <button className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-400 hover:bg-red-50 rounded-xl transition-all">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 lg:p-12">
        <div className="max-w-5xl mx-auto">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome Back, Tariro</h1>
              <p className="text-gray-500 text-sm">Manage your properties and respond to potential tenants.</p>
            </div>
            <button className="bg-zim-green text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-opacity-95 shadow-lg shadow-zim-green/20 transition-all outline-none">
              <Plus className="w-5 h-5" /> Add New Listing
            </button>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm"
              >
                <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center mb-4`}>
                  <stat.icon className="w-6 h-6 text-zim-green" />
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider font-display">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
            {/* Listings Table */}
            <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden">
               <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="font-bold text-lg">Your Listings</h2>
                  <div className="text-xs font-bold text-zim-green hover:underline cursor-pointer">View Archive</div>
               </div>
               
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      <tr>
                        <th className="px-8 py-4">Property</th>
                        <th className="px-8 py-4">Status</th>
                        <th className="px-8 py-4">Price</th>
                        <th className="px-8 py-4">Views</th>
                        <th className="px-8 py-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {mockProperties.slice(0, 5).map((p, idx) => (
                        <tr key={p.id} className="hover:bg-zim-surface transition-colors group">
                          <td className="px-8 py-4">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                <img src={p.image} alt="" className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <div className="font-bold text-sm text-zim-ink line-clamp-1">{p.title}</div>
                                <div className="text-[10px] text-gray-400 font-medium">{p.suburb}, {p.city}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-4">
                            <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                              idx === 1 ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-zim-green'
                            }`}>
                              {idx === 1 ? 'Pending' : 'Active'}
                            </span>
                          </td>
                          <td className="px-8 py-4">
                            <div className="font-bold text-sm text-zim-ink">${p.price.toLocaleString()}</div>
                            <div className="text-[10px] text-gray-400">{p.listingType}</div>
                          </td>
                          <td className="px-8 py-4">
                            <div className="flex items-center gap-2 font-bold text-sm">
                              <Eye className="w-3 h-3 text-gray-300" />
                              {Math.floor(Math.random() * 500) + 100}
                            </div>
                          </td>
                          <td className="px-8 py-4">
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-2 hover:bg-white rounded-lg text-gray-400 hover:text-zim-green transition-all">
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button className="p-2 hover:bg-white rounded-lg text-gray-400 hover:text-red-400 transition-all">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
               </div>

               <div className="p-8 border-t border-gray-100 text-center">
                  <p className="text-xs text-gray-400">Showing 5 of 20 total properties</p>
               </div>
            </div>

            {/* Top Agents Sidebar */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl p-8 h-fit">
              <h3 className="font-bold text-lg mb-6">Top Performing Agents</h3>
              <div className="space-y-6">
                {[
                  { name: 'Blessing Maposa', deals: 12, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100' },
                  { name: 'Sarah Zhou', deals: 9, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100' },
                  { name: 'Kelvin Shumba', deals: 7, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100' },
                  { name: 'Fadzai Mutero', deals: 5, image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=100' },
                ].map((agent, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100">
                      <img src={agent.image} alt={agent.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <div className="text-sm font-bold">{agent.name}</div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{agent.deals} Deals this month</div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-zim-green/5 flex items-center justify-center text-zim-green text-xs font-bold">
                      #{i + 1}
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-3 text-sm font-bold text-zim-green bg-zim-green/5 rounded-xl hover:bg-zim-green hover:text-white transition-all">
                View All Agency Stats
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
