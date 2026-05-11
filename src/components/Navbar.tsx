import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../lib/translations';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect current section in view
      const sections = ['home', 'about', 'services', 'projects', 'team', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, id: 'home' },
    { name: t.nav.about, id: 'about' },
    { name: t.nav.services, id: 'services' },
    { name: t.nav.projects, id: 'projects' },
    { name: t.nav.team, id: 'team' },
    { name: t.nav.contact, id: 'contact' },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'vi', label: 'VN' },
    { code: 'en', label: 'EN' },
    { code: 'ja', label: 'JP' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-500 py-6 px-6 lg:px-12 flex justify-between items-center",
          scrolled || isOpen ? "bg-studio-black/80 backdrop-blur-md py-4 border-b border-white/5" : "bg-transparent shadow-none"
        )}
      >
        <div className="flex items-center gap-4">
          <a
            href="#home"
            className="relative w-14 h-14 shrink-0 group cursor-pointer"
          >
            {/* Glow Background */}
            <div className="absolute inset-0 rounded-full bg-studio-red/20 blur-2xl group-hover:bg-studio-red/40 transition-all duration-700" />

            {/* Rotating Border */}
            <div className="absolute inset-0 rounded-full border border-white/10 border-t-studio-red animate-spin [animation-duration:8s]" />

            {/* Pulse Ring */}
            <div className="absolute inset-0 rounded-full border border-studio-red/20 animate-ping" />

            {/* Logo Container */}
            <div
              className="
                relative w-full h-full rounded-full
                bg-black/40 backdrop-blur-md
                border border-white/10
                flex items-center justify-center
                overflow-hidden
                shadow-[0_0_30px_rgba(255,0,0,0.15)]
                group-hover:scale-110
                transition-all duration-500
              "
            >
              <img
                src="/images/logo.png"
                alt="3covangoc Studio Logo"
                className="
                  w-10 h-10 object-contain
                  drop-shadow-[0_0_15px_rgba(255,0,0,0.45)]
                  group-hover:rotate-6
                  transition-transform duration-500
                "
              />

              {/* Shine Effect */}
              <div
                className="
                  absolute inset-0
                  bg-gradient-to-r
                  from-transparent via-white/10 to-transparent
                  -translate-x-full group-hover:translate-x-full
                  transition-transform duration-1000
                "
              />

              {/* Inner Glow */}
              <div className="absolute inset-0 bg-studio-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </a>
          <span className="text-xl font-bold tracking-widest uppercase text-white hidden lg:block">
            3covangoc Studio
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={cn(
                "text-[11px] font-semibold uppercase tracking-[0.3em] transition-all relative py-1",
                activeSection === link.id ? "text-studio-red" : "text-white/70 hover:text-white"
              )}
            >
              {link.name}
              {activeSection === link.id && (
                <motion.span 
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-studio-red flex items-center justify-center"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider transition-all",
                  language === lang.code 
                    ? "bg-studio-red text-white shadow-lg shadow-studio-red/20" 
                    : "text-white/40 hover:text-white/70"
                )}
              >
                {lang.label}
              </button>
            ))}
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white cursor-pointer p-2 hover:bg-white/5 rounded-full transition-colors z-[60]"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[49] bg-studio-black/85 backdrop-blur-2xl flex flex-col items-center justify-center pt-20 px-6 md:hidden"
          >
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }}></div>
            
            <div className="flex flex-col items-center gap-5 relative z-10 w-full">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * idx }}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-[11px] font-bold uppercase tracking-[0.5em] transition-colors pb-1 border-b",
                    activeSection === link.id ? "text-studio-red border-studio-red" : "text-white/60 border-transparent"
                  )}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/20 text-xs tracking-widest font-bold uppercase">
              3COVANGOC STUDIO © 2026
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}