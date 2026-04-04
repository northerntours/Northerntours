import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon, 
  SparklesIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const WA_NUMBER = '916297311859';

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    setSending(true);
    const msg = `New Inquiry from Northern Tours Website\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nSubject: ${form.subject}\n\nMessage:\n${form.message}`;
    
    // Simulate slight delay for visual feedback
    setTimeout(() => {
      window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
      toast.success('Inquiry initiated on WhatsApp!');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      setSending(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white pt-24 md:pt-32">
      
      {/* ===== HERO OVERLAY ===== */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden bg-gray-950">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2070&q=80" 
            className="w-full h-full object-cover opacity-50 grayscale" 
            alt="Mountain View"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950/40 via-gray-950/80 to-white"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-primary-400 font-black uppercase tracking-[0.4em] text-[10px] mb-8 block font-outfit">Peak Concierge Service</span>
            <h1 className="text-3xl md:text-8xl font-black text-white tracking-tighter italic uppercase leading-none mb-8">
              START YOUR<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-300">JOURNEY</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 -mt-20 md:-mt-32 relative z-20 pb-32">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Info Card (Left) */}
           <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.2 }}
            className="w-full lg:w-[40%] space-y-8"
          >
            <div className="bg-gray-950 rounded-[40px] md:rounded-[60px] p-8 md:p-14 text-white shadow-2xl shadow-black/50 relative overflow-hidden border border-white/10 hover:shadow-black/70 transition-all duration-500">
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
               
               <h2 className="text-3xl font-black uppercase tracking-tight italic mb-10 text-white">Global Support</h2>
               <div className="space-y-12 relative z-10">
                 <div className="flex gap-8 group">
                   <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-primary-400 border border-white/10 group-hover:bg-primary-600 group-hover:text-white transition-all transform group-hover:scale-110">
                     <MapPinIcon className="w-7 h-7" />
                   </div>
                   <div>
                     <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-500 mb-2">Headquarter</p>
                     <p className="text-lg font-bold text-gray-200 text-wrap">Nimbong, Kalimpong, 734301, West Bengal</p>
                   </div>
                 </div>

                 <div className="flex gap-8 group">
                   <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-primary-400 border border-white/10 group-hover:bg-primary-600 group-hover:text-white transition-all transform group-hover:scale-110">
                     <EnvelopeIcon className="w-7 h-7" />
                   </div>
                   <div>
                     <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-500 mb-2">Concierge Email</p>
                     <p className="text-lg font-bold text-gray-200 break-all overflow-hidden">northerntours02@gmail.com</p>
                   </div>
                 </div>

                 <div className="flex gap-8 group">
                   <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-primary-400 border border-white/10 group-hover:bg-primary-600 group-hover:text-white transition-all transform group-hover:scale-110">
                     <PhoneIcon className="w-7 h-7" />
                   </div>
                   <div>
                     <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-500 mb-2">24/7 Connectivity</p>
                     <p className="text-lg font-bold text-gray-200">+91 62973 11859</p>
                   </div>
                 </div>
               </div>

               <div className="mt-16 pt-12 border-t border-white/5">
                  <p className="text-gray-400 italic text-sm leading-relaxed mb-10 font-medium">
                    "Every peak has a story. Let us help you find the sanctuary where your story begins."
                  </p>
                  <div className="flex gap-8">
                    <a href="https://instagram.com/northerntoursagency" className="text-primary-400 hover:text-white text-[10px] font-black uppercase tracking-[0.3em] transition-all italic underline underline-offset-8">Instagram</a>
                    <a href="https://www.facebook.com/share/1CTVAe9d7D" className="text-primary-400 hover:text-white text-[10px] font-black uppercase tracking-[0.3em] transition-all italic underline underline-offset-8">Facebook</a>
                  </div>
               </div>
            </div>
          </motion.div>

          {/* Contact Form (Right) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.3 }}
            className="w-full lg:w-[60%] bg-white rounded-[40px] md:rounded-[60px] p-8 md:p-20 border border-gray-50 shadow-2xl shadow-gray-200/50 hover:shadow-primary-500/5 transition-all duration-500"
          >
             <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-gray-950 mb-12 italic leading-none">Send a Message</h2>
             <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] italic">Full Identity</label>
                    <input 
                      name="name" value={form.name} onChange={handleChange}
                      placeholder="e.g. Shiv Sagar" 
                      className="w-full bg-gray-50 border-none px-6 py-5 rounded-2xl text-sm font-bold focus:ring-1 focus:ring-primary-500 transition-all outline-none focus:bg-white"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] italic">Direct Connectivity</label>
                    <input 
                      name="phone" value={form.phone} onChange={handleChange}
                      placeholder="+91 ...." 
                      className="w-full bg-gray-50 border-none px-6 py-5 rounded-2xl text-sm font-bold focus:ring-1 focus:ring-primary-500 transition-all outline-none focus:bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] italic">Inquiry Channel (Email)</label>
                  <input 
                    name="email" value={form.email} onChange={handleChange}
                    placeholder="hello@peak.com" 
                    className="w-full bg-gray-50 border-none px-6 py-5 rounded-2xl text-sm font-bold focus:ring-1 focus:ring-primary-500 transition-all outline-none focus:bg-white"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] italic">Your Journey Narrative</label>
                  <textarea 
                    name="message" value={form.message} onChange={handleChange} rows={5}
                    placeholder="Tell us about the peaks you wish to explore..." 
                    className="w-full bg-gray-50 border-none px-6 py-5 rounded-2xl text-sm font-bold focus:ring-1 focus:ring-primary-500 transition-all outline-none resize-none focus:bg-white"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={sending}
                  className="w-full py-6 md:py-7 bg-primary-600 hover:bg-primary-700 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] md:text-xs transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-primary-500/40 flex items-center justify-center gap-3 md:gap-6 group disabled:opacity-50 px-4"
                >
                  <WhatsAppIcon className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0 group-hover:rotate-12 transition-transform" />
                  <span className="truncate">{sending ? 'INITIATING PORTAL...' : 'CONNECT VIA WHATSAPP'}</span>
                </button>
             </form>
          </motion.div>

        </div>
      </div>

    </div>
  );
};

const WhatsAppIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export default ContactPage;
