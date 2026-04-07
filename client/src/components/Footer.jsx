import { Link } from 'react-router-dom';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon
} from '@heroicons/react/24/outline';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    explore: [
      { label: 'Featured Properties', to: '/properties' },
      { label: 'Mountain Cabins', to: '/properties' },
      { label: 'Riverside Retreats', to: '/properties' },
      { label: 'Luxury Stays', to: '/properties' },
    ],
    company: [
      { label: 'Home', to: '/' },
      { label: 'About Northern Tours', to: '/about' },
      { label: 'Contact Support', to: '/contact' },
      { label: 'Privacy Policy', to: '/' },
    ],
    social: [
      { 
        label: 'Instagram', 
        href: 'https://www.instagram.com/northerntoursagency', 
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
        ) 
      },
      { 
        label: 'Facebook', 
        href: 'https://www.facebook.com/share/1CTVAe9d7D', 
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        ) 
      },
      { 
        label: 'WhatsApp', 
        href: 'https://wa.me/916297311859', 
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        ) 
      }
    ]
  };

  return (
    <footer className="bg-gray-950 text-white relative overflow-hidden pt-24 pb-12 selection:bg-primary-950 selection:text-primary-100">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
          
          {/* Brand Column */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-4 group">
              <img src="/NorthernTours.png" className="h-16 w-auto brightness-200 contrast-200" alt="Northern Tours" />
              <div className="flex flex-col">
                <span className="text-2xl font-black italic tracking-tighter leading-none transition-colors group-hover:text-primary-400">NORTHERN TOURS</span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] mt-1 text-primary-400">Beyond the valleys</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-medium">
              Curating authentic homestay experiences across the northern valleys. We connect travelers with the raw soul of local heritage.
            </p>
            <div className="flex gap-4">
              {footerLinks.social.map((soc) => (
                <a 
                  key={soc.label} 
                  href={soc.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all transform hover:-translate-y-1 group"
                >
                  {soc.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Explore Column */}
          {/* <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-primary-400 italic">Stay Collections</h4>
            <ul className="space-y-4">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-gray-400 hover:text-white text-sm font-bold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Company Column */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-primary-400 italic">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-gray-400 hover:text-white text-sm font-bold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-primary-400 italic">Get in Touch</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPinIcon className="w-5 h-5 text-primary-500 mt-1" />
                <p className="text-gray-400 text-sm font-medium leading-relaxed">
                  Headquarter: Nimbong, Kalimpong, <br />734301, West Bengal
                </p>
              </div>
              <div className="flex items-center gap-4">
                <PhoneIcon className="w-5 h-5 text-primary-500" />
                <p className="text-gray-400 text-sm font-bold">+91 62973 11859</p>
              </div>
              <div className="flex items-center gap-4">
                <EnvelopeIcon className="w-5 h-5 text-primary-500" />
                <p className="text-gray-400 text-sm font-bold">northerntours02@gmail.com</p>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <span className="text-gray-500 text-[11px] font-black tracking-[0.3em] uppercase">
              © {currentYear} Northern Tours
            </span>
            <span className="hidden md:block w-1 h-1 rounded-full bg-primary-500 shadow-[0_0_8px_rgba(14,165,233,0.8)]"></span>
            <div className="flex items-center gap-3 text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em]">
               <span>Architected by</span>
               <a 
                href="https://shivsagar.tech" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="relative group flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary-500/50 rounded-full transition-all duration-500 overflow-hidden shadow-lg hover:shadow-primary-500/20"
               >
                 <span className="relative z-10 text-white font-black tracking-[0.25em] group-hover:text-primary-400 drop-shadow-md transition-colors">SHIV SAGAR</span>
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-500/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out"></div>
               </a>
            </div>
          </div>
          <div className="flex gap-8">
             {/* Verified Portal and Safe Booking - Commented as requested */}
             {/* <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest cursor-pointer hover:text-white transition-all">Verified Portal</span> */}
             {/* <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest cursor-pointer hover:text-white transition-all">Safe Booking</span> */}
             {/* <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Premium Mountain Gateway</span> */}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;