import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Homestays', to: '/properties' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contact' },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-2xl shadow-[0_8px_32px_-10px_rgba(0,0,0,0.1)] py-3 md:py-4 border-b border-white' 
          : 'bg-transparent py-4 md:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">

          {/* Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 md:gap-5 group">
              <div className="relative">
                <img
                  src="/NorthernTours.png"
                  alt="Northern Tours"
                  className={`h-12 md:h-16 w-auto transition-all duration-300 group-hover:scale-110 ${!scrolled && location.pathname === '/' ? 'brightness-0 invert' : ''}`}
                />
                <div className="absolute inset-0 bg-primary-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="flex flex-col">
                <span className={`text-xl md:text-2xl font-black italic tracking-tighter leading-none transition-colors ${!scrolled && location.pathname === '/' ? 'text-white' : 'text-gray-900'}`}>
                  NORTHERN TOURS
                </span>
                <span className={`text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] mt-1 transition-colors ${!scrolled && location.pathname === '/' ? 'text-primary-300' : 'text-primary-600'}`}>
                  Beyond the valleys
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 bg-gray-100/50 backdrop-blur-sm p-1 rounded-2xl border border-white/20">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  isActive(link.to)
                    ? 'text-white'
                    : !scrolled && location.pathname === '/' ? 'text-white/80 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {isActive(link.to) && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-primary-600 rounded-xl -z-10 shadow-lg shadow-primary-500/30"
                  />
                )}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl transition-colors ${!scrolled && location.pathname === '/' ? 'text-white hover:bg-white/10' : 'text-gray-900 hover:bg-gray-100'}`}
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-7 w-7" />
              ) : (
                <Bars3Icon className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-3xl overflow-hidden border-t border-gray-100 shadow-2xl"
          >
            <div className="px-6 py-8 space-y-4">
              {navLinks.map((link, idx) => (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  key={link.to}
                >
                  <Link
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-6 py-4 rounded-2xl text-lg font-black uppercase tracking-widest transition-all ${
                      isActive(link.to)
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;