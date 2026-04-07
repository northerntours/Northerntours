import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  WifiIcon, 
  TvIcon, 
  HomeIcon, 
  MapPinIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
  ArrowRightIcon,
  FunnelIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import useSearchStore from '../stores/searchStore';
import { propertyAPI } from '../utils/api';
import HeicImage from '../components/HeicImage';

const allAmenities = ['Garden', 'Parking', 'Wifi', 'Barbeque', 'Kanchanjunga View', 'Meal', 'Outdoor Games', 'Kitchen', 'Bonfire', 'balcony', 'Geyser', 'Gym', 'Pet Friendly', 'Local Guide', 'TV', 'Air conditioner'];

const FilterContent = ({ 
  isMobile, 
  priceInputs, setPriceInputs, 
  selectedAmenities, setSelectedAmenities, 
  setAppliedFilters, 
  setShowMobileFilters 
}) => (
  <div className={`space-y-10 ${isMobile ? 'p-8' : ''}`}>
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-bold text-gray-950">Filters</h3>
      <button 
        onClick={() => { setPriceInputs({minPrice:'', maxPrice:''}); setSelectedAmenities([]); setAppliedFilters({minPrice:'', maxPrice:'', amenities:[]}); }}
        className="text-primary-600 text-[11px] font-bold uppercase tracking-widest hover:underline"
      >
        Reset
      </button>
    </div>

    <div className="space-y-10">
      {/* Price Range */}
      <div>
        <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-6">Price Range (INR)</h4>
        <div className="flex items-center gap-3">
           <input 
            type="text" 
            placeholder="Min"
            value={priceInputs.minPrice}
            onChange={(e) => setPriceInputs({...priceInputs, minPrice: e.target.value.replace(/\D/g,'')})}
            className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-sm font-semibold focus:ring-1 focus:ring-primary-500 transition-all outline-none"
           />
           <span className="text-gray-300">-</span>
           <input 
            type="text" 
            placeholder="Max"
            value={priceInputs.maxPrice}
            onChange={(e) => setPriceInputs({...priceInputs, maxPrice: e.target.value.replace(/\D/g,'')})}
            className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-sm font-semibold focus:ring-1 focus:ring-primary-500 transition-all outline-none"
           />
        </div>
      </div>

      {/* Amenities */}
      <div>
         <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-6">Amenities</h4>
         <div className="flex flex-wrap gap-2">
           {allAmenities.map(amenity => (
             <button
              key={amenity}
              onClick={() => setSelectedAmenities(prev => prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity])}
              className={`px-4 py-2.5 text-[11px] font-bold rounded-xl border transition-all flex items-center gap-2 ${
                selectedAmenities.includes(amenity) 
                  ? 'bg-primary-600 text-white border-primary-600 shadow-md' 
                  : 'bg-white text-gray-600 border-gray-200 hover:border-primary-400'
              }`}
             >
               {selectedAmenities.includes(amenity) && <CheckIcon className="w-3.5 h-3.5" />}
               {amenity}
             </button>
           ))}
         </div>
      </div>

      <button 
        onClick={() => {
          setAppliedFilters({ minPrice: priceInputs.minPrice, maxPrice: priceInputs.maxPrice, amenities: selectedAmenities });
          if (isMobile) setShowMobileFilters(false);
        }}
        className="w-full py-5 bg-gray-950 hover:bg-black text-white text-[11px] font-bold uppercase tracking-widest rounded-2xl transition-all shadow-xl"
      >
        {isMobile ? 'Apply Filters & View Results' : 'Apply Filters'}
      </button>
    </div>
  </div>
);

const SearchResults = () => {
  const navigate = useNavigate();
  const { location: searchLocation } = useSearchStore();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const [priceInputs, setPriceInputs] = useState({ minPrice: '', maxPrice: '' });
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState({ minPrice: '', maxPrice: '', amenities: [] });

  useEffect(() => { fetchProperties(); }, [searchLocation, appliedFilters]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const params = {};
      if (searchLocation) params.location = searchLocation;
      if (appliedFilters.minPrice) params.minPrice = appliedFilters.minPrice;
      if (appliedFilters.maxPrice) params.maxPrice = appliedFilters.maxPrice;
      if (appliedFilters.amenities.length > 0) {
        // Send as comma-separated string for backend compatibility
        params.amenities = appliedFilters.amenities.join(',');
      }
      const response = await propertyAPI.getAll(params);
      setProperties(response.data);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };


  return (
    <div className="min-h-screen bg-white pt-20 md:pt-32 font-sans selection:bg-primary-100">
      
      {/* ===== GLOBAL SEARCH HEADER ===== */}
      <section className="bg-white border-b border-gray-100 py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                 <span className="text-primary-600 font-bold uppercase tracking-[0.3em] text-[10px]">Curated Stays</span>
                 <h1 className="text-2xl md:text-5xl font-black text-gray-950 tracking-tighter uppercase leading-none italic">
                  {searchLocation ? `in ${searchLocation}` : 'Discover the North'}
                </h1>
              </div>
              <div className="flex items-center gap-4 text-gray-400 text-sm font-bold uppercase tracking-widest">
                 <span>{properties.length} Results</span>
                 <span className="hidden md:block w-12 h-[1px] bg-gray-200" />
              </div>
           </div>
        </div>
      </section>

      {/* ===== MOBILE FILTER BUTTON ===== */}
      <div className="md:hidden sticky top-20 z-[40] bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
         <button 
          onClick={() => setShowMobileFilters(true)}
          className="flex items-center justify-center gap-3 w-full py-4 bg-gray-50 rounded-2xl border border-gray-100 font-bold uppercase tracking-widest text-[11px] text-gray-950"
         >
           <FunnelIcon className="w-5 h-5 text-primary-500" />
           Adjust Filters
         </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* ===== DESKTOP FILTERS SIDEBAR ===== */}
          <aside className="hidden lg:block w-1/4">
             <div className="sticky top-36">
                <FilterContent 
                  isMobile={false} 
                  priceInputs={priceInputs} 
                  setPriceInputs={setPriceInputs} 
                  selectedAmenities={selectedAmenities} 
                  setSelectedAmenities={setSelectedAmenities} 
                  setAppliedFilters={setAppliedFilters} 
                  setShowMobileFilters={setShowMobileFilters} 
                />
             </div>
          </aside>

          {/* ===== PROPERTY GRID ===== */}
          <main className="lg:w-3/4">
             {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="animate-pulse space-y-6">
                       <div className="bg-gray-100 aspect-[4/3] rounded-[2rem]" />
                       <div className="h-4 bg-gray-100 w-3/4 rounded-full" />
                       <div className="h-3 bg-gray-50 w-1/2 rounded-full" />
                    </div>
                  ))}
                </div>
             ) : properties.length === 0 ? (
                <div className="text-center py-32 bg-gray-50 rounded-[3rem] border border-gray-100">
                  <h3 className="text-2xl font-black text-gray-950 mb-4 uppercase">No stays match your criteria</h3>
                  <p className="text-gray-500 mb-10 text-sm font-medium">Reset your filters to explore everything Northern Tours has to offer.</p>
                  <button 
                    onClick={() => { setPriceInputs({minPrice:'', maxPrice:''}); setSelectedAmenities([]); setAppliedFilters({minPrice:'', maxPrice:'', amenities:[]}); }}
                    className="px-10 py-5 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-bold uppercase tracking-widest text-[11px] transition-all shadow-xl shadow-primary-500/20"
                  >
                    Clear All Filters
                  </button>
                </div>
             ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                   {properties.map((prop, idx) => (
                      <motion.div
                        key={prop._id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="group cursor-pointer"
                        onClick={() => navigate(`/properties/${prop._id}`)}
                      >
                         <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden mb-8 border border-gray-50 bg-gray-50 shadow-md transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary-500/10 group-hover:-translate-y-2 active:scale-[0.98]">
                            <HeicImage 
                              src={prop.images?.[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'} 
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                              alt={prop.title} 
                            />
                            <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 shadow-xl">
                               <p className="text-sm font-black text-gray-950 tracking-tight">
                                  ₹{prop.price?.toLocaleString('en-IN')}<span className="text-gray-400 font-bold ml-1 text-xs">/ night</span>
                               </p>
                            </div>
                         </div>
                         
                         <div className="space-y-6">
                            <div className="flex items-center gap-3">
                               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-600 bg-primary-50 px-3 py-1 rounded-full">{prop.location}</span>
                            </div>
                            <h3 className="text-2xl font-black text-gray-950 tracking-tight uppercase group-hover:text-primary-600 transition-colors duration-300 line-clamp-1">
                               {prop.title}
                            </h3>
                            
                            <div className="flex flex-wrap gap-2">
                               {prop.amenities?.slice(0, 3).map(am => (
                                 <span key={am} className="text-[9px] font-bold text-gray-400 border border-gray-100 px-3 py-1 rounded-lg uppercase tracking-widest">{am}</span>
                               ))}
                               {prop.amenities?.length > 3 && (
                                 <span className="text-[9px] font-bold text-gray-400 border border-gray-100 bg-gray-50 px-3 py-1 rounded-lg uppercase tracking-widest">
                                   +{prop.amenities.length - 3} more
                                 </span>
                               )}
                            </div>

                            <div className="flex items-center justify-between pt-8 border-t border-gray-100">
                               <div className="flex items-center gap-3 text-emerald-600 font-bold text-[10px] uppercase tracking-widest">
                                  <HomeIcon className="w-4 h-4" />
                                  <span>Verified Stay</span>
                               </div>
                               <div className="text-gray-950 group-hover:text-primary-600 flex items-center gap-3 transition-colors">
                                  <span className="text-[11px] font-black uppercase tracking-widest">Explore</span>
                                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-3 transition-transform duration-500" />
                               </div>
                            </div>
                         </div>
                      </motion.div>
                   ))}
                </div>
             )}
          </main>
        </div>
      </div>

      {/* ===== MOBILE FILTER OVERLAY ===== */}
      <AnimatePresence>
        {showMobileFilters && (
          <div className="fixed inset-0 z-[1000] lg:hidden">
             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               className="absolute inset-0 bg-gray-950/80 backdrop-blur-md" 
               onClick={() => setShowMobileFilters(false)} 
             />
             <motion.div 
               initial={{ y: "100%" }} 
               animate={{ y: 0 }} 
               exit={{ y: "100%" }}
               transition={{ type: "spring", damping: 25, stiffness: 200 }}
               className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[3rem] max-h-[85vh] overflow-y-auto"
             >
                <div className="sticky top-0 bg-white px-8 py-6 border-b border-gray-50 flex items-center justify-between z-10">
                   <h3 className="text-xl font-black text-gray-950 uppercase tracking-tight">Adjust Stays</h3>
                   <button onClick={() => setShowMobileFilters(false)} className="p-3 bg-gray-50 rounded-full text-gray-400 active:scale-90 transition-all">
                      <XMarkIcon className="w-6 h-6" />
                   </button>
                </div>
                <FilterContent 
                  isMobile={true} 
                  priceInputs={priceInputs} 
                  setPriceInputs={setPriceInputs} 
                  selectedAmenities={selectedAmenities} 
                  setSelectedAmenities={setSelectedAmenities} 
                  setAppliedFilters={setAppliedFilters} 
                  setShowMobileFilters={setShowMobileFilters} 
                />
             </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default SearchResults;
