import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  HeartIcon,
  ShareIcon, 
  MapPinIcon,
  UserIcon,
  WifiIcon,
  TvIcon,
  HomeIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  CalendarIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EnvelopeIcon,
  UsersIcon,
  BuildingOfficeIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { propertyAPI, bookingAPI } from '../utils/api';
import HeicImage from '../components/HeicImage';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  
  // FORM STATES (Precise from image)
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [totalGuests, setTotalGuests] = useState('1');
  const [totalRooms, setTotalRooms] = useState('1');
  
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => { fetchProperty(); }, [id]);

  const fetchProperty = async () => {
    setLoading(true);
    try {
      const response = await propertyAPI.getById(id);
      setProperty(response.data);
    } catch (err) {
      setError('Property details failed to load');
    } finally { setLoading(false); }
  };

  const handleBookNow = async () => {
    if (!guestName.trim() || !guestPhone.trim() || !guestEmail.trim()) { toast.error('Please fill all form fields'); return; }
    if (!startDate || !endDate) { toast.error('Select your stay dates'); return; }
    
    const roomsCount = parseInt(totalRooms);
    const guestsCount = parseInt(totalGuests);
    
    if (isNaN(roomsCount) || roomsCount < 1) { toast.error('Number of rooms must be at least 1'); return; }
    if (isNaN(guestsCount) || guestsCount < 1) { toast.error('Total guests must be at least 1'); return; }

    setBookingLoading(true);
    try {
      await bookingAPI.create({ 
        propertyId: id, 
        startDate, 
        endDate, 
        guestName, 
        guestEmail, 
        guestPhone, 
        totalGuests: guestsCount, 
        rooms: roomsCount 
      });
      toast.success('Inquiry sent successfully!');
      setShowBookingModal(false);
      // Reset form
      setStartDate(null);
      setEndDate(null);
      setGuestName('');
      setGuestEmail('');
      setGuestPhone('');
      setTotalGuests('1');
      setTotalRooms('1');
    } catch (err) { 
      toast.error(err.response?.data?.message || 'Booking failed'); 
    } finally { setBookingLoading(false); }
  };

  const isPastDate = (date) => { const today = new Date(); today.setHours(0,0,0,0); return date < today; };

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-24 font-sans"><div className="animate-spin h-10 w-10 border-4 border-primary-500 border-t-transparent rounded-full" /></div>;
  if (error || !property) return <div className="min-h-screen flex items-center justify-center font-sans"><h2>Property sanctuary not found.</h2></div>;

  return (
    <div className="min-h-screen bg-white pt-28 md:pt-32 font-sans selection:bg-primary-100 pb-24 md:pb-0">
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-32">
        
        {/* ===== COMPACT GALLERY WITH NAVIGATION ARROWS ===== */}
        <section className="mb-10 group/gallery">
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-3 h-[300px] sm:h-[400px] md:h-[450px]">
             <div className="md:col-span-2 md:row-span-2 relative rounded-2xl md:rounded-3xl overflow-hidden border border-gray-100 cursor-pointer shadow-sm group" onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }}>
                <HeicImage src={property.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Main Exterior" />
                
                {/* GALLERY NAVIGATION ARROWS */}
                <button 
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + property.images.length) % property.images.length); setLightboxOpen(true); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all opacity-100 md:opacity-0 md:group-hover/gallery:opacity-100"
                >
                   <ChevronLeftIcon className="w-5 h-5 text-gray-950" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % property.images.length); setLightboxOpen(true); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all opacity-100 md:opacity-0 md:group-hover/gallery:opacity-100"
                >
                   <ChevronRightIcon className="w-5 h-5 text-gray-950" />
                </button>
                
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-500" />
             </div>
             {property.images.slice(1, 5).map((img, idx) => (
                <div 
                  key={idx} 
                  className="hidden md:block relative rounded-2xl overflow-hidden border border-gray-100 cursor-pointer shadow-sm group"
                  onClick={() => { setLightboxIndex(idx + 1); setLightboxOpen(true); }}
                >
                  <HeicImage src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={`View ${idx + 1}`} />
                  {idx === 3 && property.images.length > 5 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xl font-bold">
                       +{property.images.length - 5}
                    </div>
                  )}
                </div>
             ))}
          </div>

          {/* MOBILE THUMBNAIL ROW (NEW) */}
          <div className="flex md:hidden gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide">
             {property.images.slice(1).map((img, idx) => (
                <div key={idx} className="flex-shrink-0 w-24 h-20 rounded-xl overflow-hidden border border-gray-100 shadow-sm" onClick={() => { setLightboxIndex(idx + 1); setLightboxOpen(true); }}>
                   <HeicImage src={img} className="w-full h-full object-cover hover:scale-105 transition-transform" alt={`Thumb ${idx}`} />
                </div>
             ))}
          </div>
        </section>

        {/* ===== PROPERTY HEADER ===== */}
        <section className="mb-16 md:mb-12 pt-4">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-6">
               <div className="space-y-4 md:space-y-2">
                  <div className="flex items-center text-primary-600 text-[11px] md:text-[10px] font-black uppercase tracking-[0.2em] bg-primary-50 px-4 py-2 rounded-xl max-w-fit shadow-sm">
                    <MapPinIcon className="w-4 h-4 mr-2" />
                    {property.location}
                  </div>
                  <h1 className="text-2xl md:text-4xl font-black text-gray-950 tracking-tighter leading-[1.1] uppercase italic">{property.title}</h1>
               </div>
               <div className="flex items-baseline gap-3 mt-4 md:mt-0 bg-gray-50 px-6 py-4 md:px-5 md:py-3 rounded-[2rem] border border-gray-100 shadow-sm md:shadow-none">
                  <span className="text-4xl md:text-3xl font-black text-gray-950 tracking-tighter">₹{property.price?.toLocaleString('en-IN')}</span>
                  <span className="text-gray-400 font-bold uppercase tracking-widest text-[11px] md:text-[10px]">/ night</span>
               </div>
            </div>
        </section>

        {/* ===== CONTENT SPLIT ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-8 space-y-12">
             {/* About */}
             <div className="space-y-8 md:space-y-6">
                <h2 className="text-2xl md:text-xl font-black text-gray-950 border-b-2 border-gray-50 pb-5 uppercase tracking-tighter italic">Property Overview</h2>
                <div className="text-gray-600 text-base leading-relaxed font-medium">
                  {property.description}
                </div>
             </div>

             {/* CONDENSED AMENITIES */}
             <div className="space-y-6">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Accommodations & Amenities</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                   {property.amenities?.map((am, i) => (
                     <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-50 rounded-xl hover:bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group/amenity">
                        <SparklesIcon className="w-4 h-4 text-primary-500 group-hover/amenity:rotate-12 transition-transform" />
                        <span className="text-[10px] font-bold text-gray-900 capitalize leading-none">{am}</span>
                     </div>
                   ))}
                </div>
             </div>

             {/* Host Informantion */}
             <div className="bg-white rounded-3xl p-6 flex flex-col md:flex-row items-center gap-6 border border-gray-50 shadow-xl shadow-gray-100/50 hover:shadow-2xl transition-all duration-500">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-100 flex-shrink-0">
                  <HeicImage src={property.ownerImage || `https://ui-avatars.com/api/?name=${property.ownerName}&background=4f46e5&color=fff&bold=true`} alt="Host" className="w-full h-full object-cover" />
                </div>
                <div className="text-center md:text-left flex-1">
                  <h4 className="text-lg font-bold text-gray-950 mb-0.5">{property.ownerName || 'Verified Host'}</h4>
                  <p className="text-gray-500 text-[11px] italic font-medium">"Ready to facilitate your Himalayan escape."</p>
                </div>
                <div className="flex gap-3">
                     <a href={`tel:+91${property.ownerContact}`} className="px-5 py-2.5 bg-gray-50 text-gray-950 rounded-lg font-bold uppercase text-[9px] tracking-widest border border-gray-100">Call</a>
                     <button onClick={() => window.open(`https://wa.me/+91${property.ownerWhatsApp?.replace(/\D/g,'')}`, '_blank')} className="px-5 py-2.5 bg-primary-600 text-white rounded-lg font-bold uppercase text-[9px] tracking-widest shadow-sm">WhatsApp</button>
                </div>
             </div>
          </div>

          {/* ===== SIDEBAR (Calendar Hidden on Mobile) ===== */}
          <aside className="lg:col-span-4 lg:sticky lg:top-32 hidden md:block">
             <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-2xl shadow-gray-200/50">
                <div className="space-y-10">
                   <div className="space-y-6">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-primary-600">Select Dates</h4>
                      <div className="bg-white border border-gray-50 rounded-2xl p-4 shadow-inner custom-detail-calendar overflow-hidden">
                         <DayPicker 
                           mode="range" 
                           selected={{ from: startDate, to: endDate }} 
                           onSelect={(r) => { setStartDate(r?.from); setEndDate(r?.to); }}
                           className="mx-auto"
                         />
                      </div>
                   </div>

                   <button 
                    onClick={() => setShowBookingModal(true)}
                    className="w-full py-5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold uppercase tracking-[0.15em] text-[11px] shadow-lg active:scale-95 flex items-center justify-center transition-all"
                   >
                     Book Now
                   </button>
                   
                   <div className="flex gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                      <ShieldCheckIcon className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                      <p className="text-[9px] font-bold text-emerald-800 leading-relaxed uppercase tracking-widest">Safe Booking Portal. Verified by Northern Tours.</p>
                   </div>
                </div>
             </div>
          </aside>

        </div>
      </div>

      {/* ===== MOBILE STICKY BOTTOM BAR ===== */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-[80px] bg-white border-t border-gray-100 px-6 py-4 flex items-center justify-between z-[100] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
         <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Nightly</span>
            <span className="text-xl font-extrabold text-gray-950">₹{property.price?.toLocaleString('en-IN')}</span>
         </div>
         <button 
          onClick={() => setShowBookingModal(true)}
          className="px-8 py-4 bg-primary-600 text-white rounded-xl font-bold uppercase tracking-widest text-[11px] shadow-lg active:scale-95 transition-all"
         >
           Book Now
         </button>
      </div>

      {/* ===== COMPACT BOOKING DIALOGUE (From Reference Image) ===== */}
      <AnimatePresence>
        {showBookingModal && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-gray-950/80 backdrop-blur-sm p-4" onClick={(e) => e.target === e.currentTarget && setShowBookingModal(false)}>
             <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
                 <div className="p-5 md:p-6 space-y-4">
                   <div className="flex justify-between items-start pb-2 border-b border-gray-50">
                      <div className="space-y-0.5">
                         <p className="text-primary-600 text-[9px] uppercase font-bold tracking-widest">Book Rooms at</p>
                         <h2 className="text-base font-extrabold text-gray-950 tracking-tight leading-tight uppercase">{property.title}</h2>
                      </div>
                      <button onClick={() => setShowBookingModal(false)} className="text-gray-400 hover:text-gray-950 active:scale-90 transition-all">
                        <XMarkIcon className="w-5 h-5" />
                      </button>
                   </div>
                   
                   <div className="space-y-3">
                      {/* Name */}
                      <div className="space-y-1">
                         <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Enter your Name</label>
                         <div className="relative group">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 border-r border-gray-200 pr-2">
                               <UserIcon className="w-3.5 h-3.5" />
                            </div>
                            <input value={guestName} onChange={(e) => setGuestName(e.target.value)} placeholder="Your Full Name" className="w-full bg-white border border-gray-200 pl-11 py-2.5 rounded-lg text-sm font-bold focus:ring-1 focus:ring-primary-500 transition-all outline-none" />
                         </div>
                      </div>

                      {/* WhatsApp */}
                      <div className="space-y-1">
                         <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Whatsapp Number</label>
                         <div className="relative group">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 border-r border-gray-200 pr-2">
                               <WhatsAppIcon_Simple className="w-3.5 h-3.5" />
                            </div>
                            <div className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-600 font-bold text-[10px]">India (+91)</div>
                            <input value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} placeholder="98786..." className="w-full bg-white border border-gray-200 pl-24 py-2.5 rounded-lg text-sm font-bold focus:ring-1 focus:ring-primary-500 transition-all outline-none" />
                         </div>
                      </div>

                      {/* Email */}
                      <div className="space-y-1">
                         <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Email ID</label>
                         <div className="relative group">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 border-r border-gray-200 pr-2">
                               <EnvelopeIcon className="w-3.5 h-3.5" />
                            </div>
                            <input value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} placeholder="youremail@gmail.com" className="w-full bg-white border border-gray-200 pl-11 py-2.5 rounded-lg text-sm font-bold focus:ring-1 focus:ring-primary-500 transition-all outline-none" />
                         </div>
                      </div>

                      {/* Integrated Date Selection (Streamlined) */}
                      <div className="grid grid-cols-2 gap-4 pt-2">
                         <div className="space-y-1">
                            <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Check-in Date</label>
                            <div className="relative group">
                               <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-500 border-r border-gray-200 pr-2">
                                  <CalendarIcon className="w-3.5 h-3.5" />
                               </div>
                               <input 
                                 type="date" 
                                 min={new Date().toISOString().split('T')[0]}
                                 value={startDate ? startDate.toISOString().split('T')[0] : ''} 
                                 onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : null)}
                                 className="w-full bg-gray-50 border border-gray-200 pl-11 py-2.5 rounded-lg text-xs font-black text-gray-950 focus:ring-1 focus:ring-primary-500 outline-none" 
                               />
                            </div>
                         </div>
                         <div className="space-y-1">
                            <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Check-out Date</label>
                            <div className="relative group">
                               <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-500 border-r border-gray-200 pr-2">
                                  <CalendarIcon className="w-3.5 h-3.5" />
                               </div>
                               <input 
                                 type="date" 
                                 min={startDate ? startDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                                 value={endDate ? endDate.toISOString().split('T')[0] : ''} 
                                 onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)}
                                 className="w-full bg-gray-50 border border-gray-200 pl-11 py-2.5 rounded-lg text-xs font-black text-gray-950 focus:ring-1 focus:ring-primary-500 outline-none" 
                               />
                            </div>
                         </div>
                      </div>

                      {/* Rooms & Guests */}
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1">
                            <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">No. of Rooms</label>
                            <div className="relative">
                               <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 border-r border-gray-200 pr-2">
                                  <BuildingOfficeIcon className="w-3.5 h-3.5" />
                               </div>
                               <input type="text" value={totalRooms} onChange={(e) => { const val = e.target.value; if (val === '' || /^\d+$/.test(val)) setTotalRooms(val); }} className="w-full bg-white border border-gray-200 pl-11 py-2.5 rounded-lg text-sm font-bold text-gray-950 outline-none" />
                            </div>
                         </div>
                         <div className="space-y-1">
                            <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Total Guests</label>
                            <div className="relative">
                               <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 border-r border-gray-200 pr-2">
                                  <UsersIcon className="w-3.5 h-3.5" />
                               </div>
                               <input type="text" value={totalGuests} onChange={(e) => { const val = e.target.value; if (val === '' || /^\d+$/.test(val)) setTotalGuests(val); }} className="w-full bg-white border border-gray-200 pl-11 py-2.5 rounded-lg text-sm font-bold text-gray-950 outline-none" />
                            </div>
                         </div>
                      </div>
                   </div>

                   <button 
                    onClick={handleBookNow} 
                    disabled={bookingLoading}
                    className="w-full py-3.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all shadow-md disabled:opacity-50 mt-2"
                   >
                     {bookingLoading ? 'Processing...' : 'Proceed'}
                   </button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ===== FULLSCREEN LIGHTBOX ===== */}
      {/* ===== FULLSCREEN LIGHTBOX ===== */}
      <AnimatePresence>
        {lightboxOpen && (
          <div className="fixed inset-0 z-[2500] flex items-center justify-center bg-black/90 backdrop-blur-md" onClick={() => setLightboxOpen(false)}>
             <button onClick={() => setLightboxOpen(false)} className="absolute top-8 right-8 text-white/80 hover:text-white text-4xl font-light active:rotate-90 transition-all z-[2600]">×</button>
             
             <button 
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + property.images.length) % property.images.length); }} 
              className="absolute left-4 md:left-8 w-16 h-16 flex items-center justify-center text-white/50 hover:text-white transition-all transform hover:scale-110 active:scale-95 z-[2600]"
             >
               <ChevronLeftIcon className="w-12 h-12 stroke-[2px]" />
             </button>

             <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-[90vw] max-h-[85vh] rounded-xl shadow-2xl border border-white/10 overflow-hidden"
             >
               <HeicImage src={property.images[lightboxIndex]} className="w-full h-full object-contain" />
             </motion.div>

             <button 
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % property.images.length); }} 
              className="absolute right-4 md:right-8 w-16 h-16 flex items-center justify-center text-white/50 hover:text-white transition-all transform hover:scale-110 active:scale-95 z-[2600]"
             >
               <ChevronRightIcon className="w-12 h-12 stroke-[2px]" />
             </button>
             
             <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] bg-white/5 px-6 py-2 rounded-full border border-white/5">
                Photo {lightboxIndex + 1} of {property.images.length}
             </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

const WhatsAppIcon_Simple = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export default PropertyDetail;