import { motion } from 'motion/react';

export default function Footer() {
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
          <div className="md:col-span-5 flex flex-col items-start gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border-2 border-studio-red flex items-center justify-center rotate-45 shrink-0">
                <span className="-rotate-45 font-bold text-studio-red text-xl">3C</span>
              </div>
              <span className="text-xl font-bold tracking-widest uppercase text-white">
                3covangoc Studio
              </span>
            </div>
            <p className="text-neutral-500 text-sm max-w-sm leading-relaxed border-l border-studio-wine pl-4">
              Biến ý tưởng thành những câu chuyện thị giác đầy cảm hứng qua ngôn ngữ của 3D và đồ họa chuyển động chuyên nghiệp.
            </p>

          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-studio-gold mb-8">Điều hướng</h4>
            <ul className="space-y-4">
              {[
                { name: 'Dự Án', id: 'projects' },
                { name: 'Dịch Vụ', id: 'services' },
                { name: 'Giới Thiệu', id: 'about' },
                { name: 'Liên Hệ', id: 'contact' }
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
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-studio-gold mb-8">Kết nối</h4>
            <div className="grid grid-cols-1 gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-neutral-600 text-[10px] uppercase font-bold">Email</span>
                <button 
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-white hover:text-studio-red transition-all text-sm font-medium text-left"
                >
                  3covangocstudio@gmail.com
                </button>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-neutral-600 text-[10px] uppercase font-bold">Hotline</span>
                <a href="tel:0842992493" className="text-white hover:text-studio-red transition-all text-sm font-medium">084 299 2493</a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-neutral-600 text-[10px] uppercase font-bold">Mạng xã hội</span>
                <div className="flex gap-6 mt-1">
                  <a href="https://www.facebook.com/profile.php?id=61589512139159" target="_blank" rel="noopener noreferrer" className="text-xs text-white/40 hover:text-white transition-all uppercase tracking-widest font-bold">
                    Facebook
                  </a>
                  <a href="https://www.youtube.com/@3CoVaNgocStudio" target="_blank" rel="noopener noreferrer" className="text-xs text-white/40 hover:text-white transition-all uppercase tracking-widest font-bold">
                    YouTube
                  </a>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright area */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] text-neutral-600 uppercase tracking-[0.2em] font-bold">
            © 2026 3COVANGOC STUDIO. MADE BY PASSION.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-[10px] text-neutral-400 uppercase tracking-widest font-bold hover:text-studio-gold transition-all"
          >
            Cuộn lên trên
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
