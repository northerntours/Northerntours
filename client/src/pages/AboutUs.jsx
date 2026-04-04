import { motion } from 'framer-motion';
import { 
  SparklesIcon, 
  MapPinIcon, 
  HeartIcon, 
  GlobeAltIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen pt-24 md:pt-32">
      
      {/* ===== HERO SECTION ===== */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-gray-950">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2070&q=80" 
            className="w-full h-full object-cover opacity-60 grayscale scale-110"
            alt="Mountain Peaks"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950/40 via-gray-950/80 to-white"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-5xl px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-primary-400 font-black uppercase tracking-[0.5em] text-[10px] mb-8 block font-outfit">AN AUTHENTIC HERITAGE</span>
            <h1 className="text-3xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter italic uppercase leading-none mb-12">
              BEYOND THE<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-300">VALLEYS</span>
            </h1>
            <p className="text-gray-200 text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed italic">
              We provide more than just a place to stay. We bridge the gap between travelers and the raw soul of the northern Himalayas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== OUR STORY ===== */}
      <section className="py-24 md:py-48 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square md:aspect-video rounded-[60px] overflow-hidden shadow-2xl shadow-gray-200"
            >
               <img 
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" 
                alt="Luxury Exterior"
               />
               <div className="absolute inset-0 bg-primary-600/5 mix-blend-multiply"></div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }} 
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
               <h2 className="text-3xl md:text-7xl font-black text-gray-950 tracking-tighter uppercase italic leading-[0.9]">
                 The Art of<br />Authenticity.
               </h2>
               <p className="text-gray-500 text-lg leading-relaxed font-medium italic">
                 Northern Tours was born from a simple desire: to show the world the Himalayas we know. Not the tourist traps, but the quiet porches, the hidden valley trails, and the warmth of a local bonfire.
               </p>
               <div className="grid grid-cols-2 gap-6">
                  {[
                    { icon: SparklesIcon, text: "Curated Peak Stays" },
                    { icon: MapPinIcon, text: "Rare Valley Views" },
                    { icon: HeartIcon, text: "Local Heritage" },
                    { icon: GlobeAltIcon, text: "Concierge 24x7" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-50 group hover:bg-white shadow-sm md:shadow-md hover:shadow-2xl hover:shadow-primary-500/10 transition-all border-b-4 border-b-transparent hover:border-b-primary-500 hover:-translate-y-1">
                       <item.icon className="w-6 h-6 text-primary-500 group-hover:rotate-12 transition-transform" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-gray-950">{item.text}</span>
                    </div>
                  ))}
               </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ===== DARK MISSION BLOCK ===== */}
      <section className="py-24 md:py-48 bg-gray-950 text-white overflow-hidden relative border-y border-white/5 shadow-inner">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-5xl mx-auto px-6 text-center">
           <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-16"
           >
              <CheckBadgeIcon className="w-20 h-20 text-primary-500 mx-auto animate-pulse" />
              <h2 className="text-3xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.85]">
                Our Handpicked<br />Selection Standards.
              </h2>
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto font-medium italic">
                Every property on our platform undergoes a rigorous 4-step vetting process. We check for location rarity, host hospitality, architectural charm, and modern comfort.
              </p>
              <div className="pt-16 flex flex-col md:flex-row items-center justify-center gap-16 border-t border-white/10">
                 <div className="text-left space-y-2">
                    <p className="text-5xl font-black tracking-tighter text-white">500+</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary-500 italic">Vetted Sanctuaries</p>
                 </div>
                 <div className="text-left space-y-2">
                    <p className="text-5xl font-black tracking-tighter text-white">24/365</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary-500 italic">Peer Support</p>
                 </div>
                 <div className="text-left space-y-2">
                    <p className="text-5xl font-black tracking-tighter text-white">99%</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary-500 italic">Guest Devotion</p>
                 </div>
              </div>
           </motion.div>
        </div>
      </section>

      {/* ===== FINAL CALLOUT ===== */}
      <section className="py-24 md:py-48 bg-white overflow-hidden relative">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
           <div className="space-y-16">
              <h2 className="text-4xl md:text-9xl font-black text-gray-950 tracking-tighter italic uppercase leading-[0.9]">
                Ready to<br />Explore?
              </h2>
              <p className="text-gray-500 font-medium text-xl italic max-w-xl mx-auto">
                Your journey beyond the valleys is one concierge request away.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button 
                  onClick={() => navigate('/properties')}
                  className="px-14 py-7 bg-primary-600 hover:bg-primary-700 text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs shadow-2xl shadow-primary-500/40 transition-all hover:scale-105"
                >
                  Book Your Escape
                </button>
                <button 
                  onClick={() => navigate('/contact')}
                  className="px-14 py-7 bg-gray-50 hover:bg-gray-100 text-gray-900 rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs transition-all border border-gray-100"
                >
                  Contact Support
                </button>
              </div>
           </div>
        </div>
      </section>

    </div>
  );
};

const CheckBadgeIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
  </svg>
);

export default AboutUs;
