import { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Language } from '../lib/translations';

const Navbar = memo(function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { language, setLanguage, t } = useLanguage();
  const { user, setAuthModalOpen, logout, setLogoutModalOpen } = useAuth();

  useEffect(() => {
    // 1. Detect scrolled state for background transition
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') return;

    // 2. Detect active section using IntersectionObserver
    const sections = ['home', 'about', 'services', 'projects', 'team', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Check periodically if elements are in DOM (because of lazy loading)
    const interval = setInterval(() => {
      let allObserved = true;
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          if (!el.hasAttribute('data-observed')) {
            observer.observe(el);
            el.setAttribute('data-observed', 'true');
          }
        } else {
          allObserved = false;
        }
      });
      if (allObserved) clearInterval(interval);
    }, 300);

    return () => {
      clearInterval(interval);
      observer.disconnect();
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.removeAttribute('data-observed');
      });
    };
  }, [location.pathname]);

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
          "fixed top-0 left-0 w-full z-50 transition-all duration-500 py-6 px-6 lg:px-12 flex justify-between items-center will-change-transform",
          scrolled || isOpen ? "bg-studio-black/90 md:bg-studio-black/80 md:backdrop-blur-md py-4 border-b border-white/5" : "bg-transparent shadow-none"
        )}
      >
        <div className="flex items-center gap-4">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="relative w-14 h-14 shrink-0 group cursor-pointer"
          >
            <div className="absolute inset-0 rounded-full bg-studio-red/20 blur-2xl group-hover:bg-studio-red/40 transition-all duration-700" />
            <div className="absolute inset-0 rounded-full border border-white/10 border-t-studio-red animate-spin [animation-duration:8s]" />
            <div className="absolute inset-0 rounded-full border border-studio-red/20 animate-ping" />
            <div className="relative w-full h-full rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(255,0,0,0.15)] group-hover:scale-110 transition-all duration-500">
              <img
                src="/images/logo.png"
                alt="3covangoc Studio Logo"
                className="w-10 h-10 object-contain drop-shadow-[0_0_15px_rgba(255,0,0,0.45)] group-hover:rotate-6 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <div className="absolute inset-0 bg-studio-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </Link>
          <span className="text-xl font-bold tracking-widest uppercase text-white hidden lg:block">
            3covangoc Studio
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {isHome && navLinks.map((link) => (
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
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={cn(
                  "px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider transition-all cursor-pointer",
                  language === lang.code
                    ? "bg-studio-red text-white shadow-lg shadow-studio-red/20"
                    : "text-white/40 hover:text-white/70"
                )}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* Auth Button */}
          {user ? (
            <div className="flex items-center gap-3 bg-white/5 rounded-full p-1 pr-4 border border-white/10 hidden md:flex">
              <Link to="/profile" className="w-8 h-8 rounded-full overflow-hidden bg-white/10 shrink-0 cursor-pointer hover:ring-2 hover:ring-studio-red transition-all">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User size={14} className="text-white/50" />
                  </div>
                )}
              </Link>
              <Link to="/profile" className="text-[10px] font-bold text-white uppercase tracking-wider hidden lg:block hover:text-studio-red transition-colors">
                {user.name.split(' ')[0]}
              </Link>
              <button
                onClick={() => setLogoutModalOpen(true)}
                className="text-white/40 hover:text-studio-red transition-colors ml-1"
                title="Đăng xuất"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="px-4 py-2 bg-studio-red text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-white hover:text-black transition-colors hidden md:block"
            >
              Đăng nhập
            </button>
          )}

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
            className="fixed inset-0 z-[49] bg-studio-black/98 flex flex-col items-center justify-center pt-20 px-6 md:hidden"
          >
            {/* Removed SVG noise filter for better mobile performance */}

            <div className="flex flex-col items-center gap-5 relative z-10 w-full">
              {isHome && navLinks.map((link, idx) => (
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

              {/* Mobile Auth */}
              {user ? (
                <div className="mt-8 flex flex-col items-center gap-4">
                  <Link to="/profile" onClick={() => setIsOpen(false)} className="w-12 h-12 rounded-full overflow-hidden bg-white/10 shrink-0 border border-white/20 hover:border-studio-red transition-colors">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User size={20} className="text-white/50" />
                      </div>
                    )}
                  </Link>
                  <Link to="/profile" onClick={() => setIsOpen(false)} className="text-xs font-bold text-white uppercase tracking-wider hover:text-studio-red transition-colors">
                    {user.name}
                  </Link>
                  <button
                    onClick={() => {
                      setLogoutModalOpen(true);
                      setIsOpen(false);
                    }}
                    className="px-6 py-2 border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-studio-red hover:border-studio-red transition-colors mt-2"
                  >
                    Đăng xuất
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setAuthModalOpen(true);
                    setIsOpen(false);
                  }}
                  className="mt-8 px-8 py-3 bg-studio-red text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-white hover:text-black transition-colors"
                >
                  Đăng nhập
                </button>
              )}
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/20 text-xs tracking-widest font-bold uppercase">
              3COVANGOC STUDIO © 2026
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default Navbar;