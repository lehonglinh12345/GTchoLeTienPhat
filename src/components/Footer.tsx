import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 bg-transparent border-t border-white/5 pt-24 pb-12 overflow-hidden">
      {/* Background Decorative Text */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-[0.02] text-[20vw] font-black tracking-tighter leading-none whitespace-nowrap z-0">
        3COVANGOC
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          {/* Brand Info */}
          <div className="md:col-span-12 lg:col-span-5 flex flex-col items-start gap-6">
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
              <span className="text-xl font-bold tracking-widest uppercase text-white">
                3covangoc Studio
              </span>
            </div>
            <p className="text-neutral-500 text-sm max-w-sm leading-relaxed border-l border-studio-wine pl-4">
              {t.footer.desc}
            </p>

          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-studio-gold mb-8">{t.footer.nav}</h4>
            <ul className="space-y-4">
              {[
                { name: t.nav.projects, id: 'projects' },
                { name: t.nav.services, id: 'services' },
                { name: t.nav.about, id: 'about' },
                { name: t.nav.contact, id: 'contact' }
              ].map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} className="text-neutral-400 hover:text-white text-xs uppercase tracking-widest font-semibold transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="md:col-span-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-studio-gold mb-8">{t.footer.connect}</h4>
            <div className="grid grid-cols-1 gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-neutral-600 text-[10px] uppercase font-bold">{t.contact.email}</span>
                <a 
                  href="mailto:3covangocstudio@gmail.com"
                  className="text-white hover:text-studio-red transition-all text-sm font-medium text-left"
                >
                  3covangocstudio@gmail.com
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-neutral-600 text-[10px] uppercase font-bold">Hotline</span>
                <a href="tel:0842992493" className="text-white hover:text-studio-red transition-all text-sm font-medium">084 299 2493 (TRÍ BẢO)</a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-neutral-600 text-[10px] uppercase font-bold">{t.footer.social}</span>
                <div className="flex gap-6 mt-1">
                  <a href="https://www.facebook.com/profile.php?id=61589512139159" target="_blank" rel="noopener noreferrer" className="text-xs text-white/40 hover:text-white transition-all uppercase tracking-widest font-bold">
                    Facebook
                  </a>
                  <a href="https://www.youtube.com/@3CoVaNgocStudio" target="_blank" rel="noopener noreferrer" className="text-xs text-white/40 hover:text-white transition-all uppercase tracking-widest font-bold">
                    YouTube
                  </a>
                  <a href="https://www.tiktok.com/@3covangoc.studio" target="_blank" rel="noopener noreferrer" className="text-xs text-white/40 hover:text-white transition-all uppercase tracking-widest font-bold">
                    TikTok
                  </a>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright area */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] text-neutral-600 uppercase tracking-[0.2em] font-bold">
            {t.footer.copyright}
          </p>
          
          <div className="flex flex-col items-center gap-3 text-center md:-translate-x-8 lg:-translate-x-12">
            <div className="relative flex flex-col items-center gap-2">
              {/* Small Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-20 bg-studio-red/10 blur-3xl rounded-full pointer-events-none" />

              {/* Subtitle */}
              <span
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.5em]
                  text-neutral-500
                  font-semibold
                  relative
                "
              >
                {t.footer.dev.subtitle}
              </span>

              {/* Developer Name */}
              <div
                className="
                  relative
                  text-transparent bg-clip-text
                  bg-gradient-to-r from-red-500 via-white to-red-700
                  font-black
                  tracking-[0.55em]
                  text-sm md:text-base
                  drop-shadow-[0_0_18px_rgba(255,0,0,0.45)]
                  animate-pulse
                  transition-all duration-500
                  hover:scale-105
                "
              >
                {t.footer.dev.name}
              </div>

              {/* Decorative Line */}
              <div
                className="
                  w-24 h-[1px]
                  bg-gradient-to-r
                  from-transparent
                  via-studio-red
                  to-transparent
                  opacity-70
                "
              />
            </div>

            {/* Developer Links */}
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <a
                href="https://www.facebook.com/re.hon.rin.2025"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.3em]
                  text-white/40
                  hover:text-studio-red
                  transition-all duration-300
                  hover:-translate-y-1
                "
              >
                {t.footer.dev.facebook}
              </a>

              <a
                href="https://lehonglinh.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.3em]
                  text-white/40
                  hover:text-studio-gold
                  transition-all duration-300
                  hover:-translate-y-1
                "
              >
                {t.footer.dev.portfolio}
              </a>
            </div>
          </div>
          
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-[10px] text-neutral-400 uppercase tracking-widest font-bold hover:text-studio-gold transition-all"
          >
            {t.footer.scrollToTop}
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-studio-gold transition-all group-hover:-translate-y-1">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-180"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </button>
        </div>
      </div>
      
      {/* Decorative Accent */}
      <div className="absolute top-0 right-0 w-[300px] h-full bg-studio-red/5 blur-[100px] -skew-x-[20deg] pointer-events-none" />
    </footer>
  );
}
