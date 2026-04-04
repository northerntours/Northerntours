import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CalendarIcon, 
  UserIcon, 
  MapPinIcon, 
  SparklesIcon,
  MagnifyingGlassIcon,
  ArrowRightIcon,
  CheckBadgeIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useSearchStore from '../stores/searchStore';
import { propertyAPI } from '../utils/api';

const LandingPage = () => {
  const navigate = useNavigate();
  const { 
    location: searchLocation, 
    startDate, 
    endDate, 
    guests,
    setSearchParams,
    setStartDate,
    setEndDate,
  } = useSearchStore();
  
  const [localLocation, setLocalLocation] = useState(searchLocation);
  const [localGuests, setLocalGuests] = useState(guests);
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  const fetchFeaturedProperties = async () => {
    try {
      const response = await propertyAPI.getAll();
      setFeaturedProperties(response.data.slice(0, 3));
    } catch (err) {
      console.error('Error fetching featured properties:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (startDate && endDate && startDate >= endDate) {
      toast.error('Check-out date must be after check-in date');
      return;
    }
    setSearchParams({ location: localLocation, guests: localGuests });
    navigate('/properties');
  };

  const categoryData = [
    { title: 'Mountain Cabins', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80', count: '120+ Stays' },
    { title: 'Riverside Retreats', img: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80', count: '85+ Stays' },
    { title: 'Hidden Cottages', img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80', count: '45+ Stays' },
    { title: 'Luxury Villas', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80', count: '30+ Stays' }
  ];

  const whyData = [
    {
      title: "Handpicked Selection",
      desc: "Every homestay is personally vetted for authentic local charm and modern comfort.",
      icon: <SparklesIcon className="w-6 h-6" />
    },
    {
      title: "Hassle Free Booking",
      desc: "One-click inquiry and direct host connectivity. No middleman, just memories.",
      icon: <CheckBadgeIcon className="w-6 h-6" />
    },
    {
      title: "Flexible Cancellation",
      desc: "Plans change. We understand. Enjoy free cancellation on most of our premium stays.",
      icon: <CalendarIcon className="w-6 h-6" />
    },
    {
      title: "24/7 Local Concierge",
      desc: "On-ground support to help you navigate the valley or find the best local tea.",
      icon: <GlobeAltIcon className="w-6 h-6" />
    }
  ];

  return (
    <div className="bg-white selection:bg-primary-100 selection:text-primary-900">
      
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden bg-gray-950">
        {/* Background Layer */}
        <div className="absolute inset-0">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            className="w-full h-full object-cover opacity-60"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950/40 via-gray-950/80 to-white"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto text-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-8">
              <SparklesIcon className="w-4 h-4 text-primary-400" />
              <span className="text-xs md:text-sm font-bold tracking-widest uppercase">The North is Calling</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-7xl lg:text-9xl font-black text-white tracking-tighter leading-[0.8] mb-8">
              UNFORGETTABLE<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-300 uppercase italic">Home Stays</span>
            </h1>
            
            <div className="max-w-xl mx-auto">
              <p className="text-gray-300 text-lg md:text-xl font-medium leading-relaxed">
                Experience the authentic heartbeat of the mountains. Vetted properties, local hosts, and memories that last a lifetime.
              </p>
            </div>
          </motion.div>

          {/* Floating Search Hub */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-6xl mx-auto px-2"
          >
            <div className="bg-white/80 backdrop-blur-3xl rounded-[32px] md:rounded-[40px] p-2 md:p-3 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] border border-white/50">
              <form onSubmit={handleSearch} className="flex flex-col lg:flex-row items-center gap-2 lg:gap-0">
                
                {/* Location */}
                <div className="flex-1 w-full flex items-center px-6 py-3 border-b lg:border-b-0 lg:border-r border-gray-200 group transition-all">
                  <MapPinIcon className="w-6 h-6 text-primary-500 mr-4" />
                  <div className="text-left w-full">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Destination</label>
                    <input 
                      type="text" 
                      value={localLocation}
                      onChange={(e) => setLocalLocation(e.target.value)}
                      placeholder="e.g. Kalimpong, Nimbong" 
                      className="bg-transparent border-none p-0 w-full focus:ring-0 focus:outline-none text-gray-900 font-bold placeholder:text-gray-300"
                    />
                  </div>
                </div>

                {/* Date Check-In */}
                <div className="flex-1 w-full flex items-center px-6 py-3 border-b lg:border-b-0 lg:border-r border-gray-200 group transition-all">
                  <CalendarIcon className="w-6 h-6 text-primary-500 mr-4" />
                  <div className="text-left w-full">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Stay Duration</label>
                    <div className="flex items-center gap-2">
                       <input 
                        type="date" 
                        value={startDate ? startDate.toISOString().split('T')[0] : ''}
                        onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : null)}
                        min={new Date().toISOString().split('T')[0]}
                        className="bg-transparent border-none p-0 w-full focus:ring-0 focus:outline-none text-xs md:text-sm font-bold text-gray-900 cursor-pointer"
                      />
                      <span className="text-gray-300">→</span>
                      <input 
                        type="date" 
                        value={endDate ? endDate.toISOString().split('T')[0] : ''}
                        onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)}
                        min={startDate ? startDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                        className="bg-transparent border-none p-0 w-full focus:ring-0 focus:outline-none text-xs md:text-sm font-bold text-gray-900 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Guests */}
                <div className="flex-1 w-full flex items-center px-6 py-3 transition-all">
                  <UserIcon className="w-6 h-6 text-primary-500 mr-4" />
                  <div className="text-left w-full">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Guests</label>
                    <select
                      value={localGuests}
                      onChange={(e) => setLocalGuests(parseInt(e.target.value))}
                      className="bg-transparent border-none p-0 w-full focus:ring-0 focus:outline-none text-gray-900 font-bold"
                    >
                      {[1, 2, 3, 4, 5, 6, 10, 12].map(n => <option key={n} value={n}>{n} Guests</option>)}
                    </select>
                  </div>
                </div>

                {/* CTA Button */}
                <button 
                  type="submit"
                  className="w-full lg:w-auto h-16 md:h-20 px-12 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl md:rounded-[32px] flex items-center justify-center gap-3 font-black uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-[0_20px_40px_-10px_rgba(13,110,253,0.4)]"
                >
                  <MagnifyingGlassIcon className="w-6 h-6 stroke-[3]" />
                  <span className="hidden lg:inline">Search</span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURED CATEGORIES ===== */}
      <section className="py-24 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-3xl md:text-6xl font-black text-gray-950 tracking-tighter leading-none mb-6 italic uppercase">
                DISCOVER YOUR<br className="hidden md:block" />STYLE
              </h2>
              <p className="text-gray-500 text-base md:text-lg font-medium">From mountain peaks to crystal rivers, choose a theme for your next journey.</p>
            </div>
            <button onClick={() => navigate('/properties')} className="group flex items-center gap-3 text-primary-600 font-black uppercase tracking-widest text-sm self-start">
              Explore All <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryData.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative h-[400px] rounded-[40px] overflow-hidden cursor-pointer"
                onClick={() => { setLocalLocation(cat.title); navigate('/properties'); }}
              >
                <img src={cat.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={cat.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <p className="text-primary-400 text-xs font-black uppercase tracking-[0.2em] mb-2">{cat.count}</p>
                  <h3 className="text-2xl font-bold tracking-tight">{cat.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PROPERTIES ===== */}
      {!loading && featuredProperties.length > 0 && (
        <section className="py-24 md:py-32 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16 md:mb-24">
              <span className="text-primary-600 font-black uppercase tracking-widest text-[10px] mb-4 block">Hand-Picked for you</span>
              <h2 className="text-3xl md:text-7xl font-black text-gray-950 tracking-tighter uppercase italic leading-none">FEATURED STAYS</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {featuredProperties.map((prop, idx) => (
                <motion.div
                  key={prop._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/properties/${prop._id}`)}
                >
                  <div className="bg-white rounded-[40px] p-4 shadow-md md:shadow-lg shadow-gray-200/50 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 border border-gray-50 h-full flex flex-col hover:-translate-y-2">
                    <div className="relative h-64 md:h-72 overflow-hidden rounded-[32px] mb-6">
                      <img src={prop.images?.[0] || ''} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={prop.title} />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm">
                        <p className="text-xs font-black text-gray-900">₹{prop.price?.toLocaleString('en-IN')}<span className="text-gray-400 font-bold">/night</span></p>
                      </div>
                    </div>
                    <div className="px-3 pb-4">
                      <div className="flex items-center gap-2 text-primary-500 mb-3">
                        <MapPinIcon className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-widest">{prop.location}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-1 group-hover:text-primary-600 transition-colors uppercase tracking-tight">{prop.title}</h3>
                      <div className="flex items-center gap-4 border-t border-gray-100 pt-5">
                         <div className="flex -space-x-3 overflow-hidden">
                            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1581403341630-a6e0b9d2d257?w=200&h=200&fit=crop" alt="Guest" />
                            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1614289371518-722f2615943d?w=200&h=200&fit=crop" alt="Guest" />
                            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop" alt="Guest" />
                         </div>
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Joined by 10+ guests recently</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <button 
                onClick={() => navigate('/properties')}
                className="px-10 py-5 bg-gray-900 hover:bg-black text-white rounded-2xl font-black uppercase tracking-[0.2em] text-sm transition-all shadow-xl hover:shadow-black/20"
              >
                View Collection
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ===== WHY NORTHERN TOURS ===== */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gray-950 rounded-[60px] p-8 md:p-20 overflow-hidden relative">
            {/* Animated Background Decor */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">
              <div className="lg:col-span-12 text-center mb-12 md:mb-16">
                 <h2 className="text-2xl md:text-7xl font-black text-white tracking-tighter italic mb-8 uppercase leading-none">Why <span className="text-primary-500">Northern Tours</span>?</h2>
                 <p className="text-gray-400 text-sm md:text-xl font-medium max-w-2xl mx-auto px-4">Connecting premium travelers with the raw soul of the northern valleys.</p>
               </div>

              <div className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {whyData.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm rounded-[40px] p-8 md:p-10 border border-white/10 hover:bg-white/10 transition-all group overflow-hidden relative"
                  >
                     <div className="w-16 h-16 bg-primary-500/10 rounded-2xl flex items-center justify-center text-primary-500 mb-8 border border-primary-500/20 group-hover:bg-primary-500 group-hover:text-white transition-all transform duration-500 group-hover:rotate-[360deg]">
                       {item.icon}
                     </div>
                     <h3 className="text-xl md:text-2xl font-bold text-white mb-4 italic uppercase">{item.title}</h3>
                     <p className="text-gray-400 text-sm md:text-base leading-relaxed tracking-wide">{item.desc}</p>
                     
                     <div className="absolute -right-4 -bottom-4 text-9xl font-black text-white/5 select-none transition-all group-hover:scale-125 group-hover:text-white/10">
                       0{idx + 1}
                     </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Verified Stays', value: '450+' },
                { label: 'Happy Travelers', value: '12K+' },
                { label: 'Destinations', value: '24' },
                { label: 'Host Response Rate', value: '98%' }
              ].map((stat, i) => (
                <div key={i} className="text-center p-8 bg-gray-50 rounded-[32px] border border-gray-100 hover:bg-white hover:shadow-xl transition-all group">
                   <p className="text-3xl md:text-5xl font-black text-gray-950 mb-2 tracking-tighter group-hover:text-primary-600 transition-colors">{stat.value}</p>
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{stat.label}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* ===== MISSION CALLOUT ===== */}
      <section className="py-24 md:py-48 relative overflow-hidden">
         <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
               <SparklesIcon className="w-12 h-12 text-primary-500 mx-auto mb-10 animate-spin-slow" />
               <h2 className="text-4xl md:text-7xl font-black text-gray-950 tracking-tighter leading-[0.9] mb-12 italic uppercase">
                 Your mountain journey<br />
                 <span className="text-gray-300">starts with a simple click.</span>
               </h2>
               <button 
                onClick={() => navigate('/properties')}
                className="inline-flex items-center gap-4 px-12 py-6 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-black uppercase tracking-[0.2em] text-sm transition-all transform hover:scale-105 shadow-2xl shadow-primary-500/30"
               >
                 Book Your Escape <ArrowRightIcon className="w-5 h-5" />
               </button>
            </motion.div>
         </div>
      </section>

    </div>
  );
};

export default LandingPage;