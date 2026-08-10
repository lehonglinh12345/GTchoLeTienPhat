import { memo, useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowDown, Play, Pause, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero = memo(function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const fullscreenRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);

  const { scrollY } = useScroll();
  const { t } = useLanguage();
  
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Detect ESC fullscreen exit
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <section 
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background with image, texture and color */}
      <div className="absolute inset-0 z-0 bg-[#0A0A0A]">
        <motion.div 
          style={{ y: useTransform(scrollY, [0, 500], [0, 150]) }}
          className="absolute inset-0 z-0 will-change-transform"
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-[1.1] md:scale-105 will-change-transform"
            poster="/images/input_file_1.png"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-studio-black/20 via-studio-black/60 to-studio-black z-10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-studio-red/20 blur-[150px] rounded-full animate-pulse z-1 transform-gpu will-change-opacity pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-studio-red/10 blur-[180px] rounded-full animate-pulse delay-700 z-1 transform-gpu will-change-opacity pointer-events-none" />
      </div>

      {/* Floating abstract elements */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-1/3 left-10 w-24 h-24 border border-studio-gold/20 rotate-45 rounded-lg backdrop-blur-sm z-10 transform-gpu will-change-transform pointer-events-none"
        animate={{ rotate: 405 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-1/4 right-10 w-32 h-32 border border-studio-red/30 -rotate-12 rounded-full backdrop-blur-sm z-10 transform-gpu will-change-transform pointer-events-none"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 relative z-20">
        <div className="grid grid-cols-12 gap-12 items-center">
          {/* LEFT CONTENT */}
          <motion.div
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={{
               hidden: { opacity: 0 },
               visible: {
                 opacity: 1,
                 transition: {
                   staggerChildren: 0.1,
                   delayChildren: 0.3
                 }
               }
             }}
             className="col-span-12 xl:col-span-7 text-left will-change-opacity"
          >
            <motion.h2 
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
              }}
              className="editorial-tag mb-6"
            >
              <span /> {t.hero.tag}
            </motion.h2>
          <motion.h1 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }
            }}
            className="text-6xl md:text-8xl font-bold text-white mb-8 leading-[0.9] tracking-tighter will-change-transform"
          >
              {t.hero.title1} <br />
              <span className="inline-block px-2 py-1 text-transparent bg-clip-text bg-gradient-to-r from-studio-red to-studio-wine italic font-serif">{t.hero.title2}</span><br />
              {t.hero.title3}
            </motion.h1>
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
              }}
              className="max-w-sm text-white/50 text-sm md:text-base mb-12 font-light leading-relaxed border-l border-studio-wine pl-4"
            >
              {t.hero.desc}
            </motion.p>
            
            <motion.div 
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
              }}
              className="flex flex-wrap items-center gap-6"
            >
              <div className="group relative">
                <div className="absolute -inset-2 bg-studio-red opacity-20 blur group-hover:opacity-40 transition" />
                <motion.button 
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-10 py-4 bg-studio-red text-white font-bold uppercase tracking-widest text-xs transition-all cursor-pointer"
                >
                  {t.hero.viewProjects}
                </motion.button>
              </div>
              <motion.button 
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 border border-white/20 text-white font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-all text-center cursor-pointer"
              >
                {t.hero.sendEmail}
              </motion.button>
            </motion.div>
          </motion.div>

          {/* RIGHT VIDEO */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
            viewport={{ once: true }}
            className="col-span-12 xl:col-span-5 relative mt-8 xl:mt-0 max-w-[320px] sm:max-w-md mr-auto xl:mr-0 w-full will-change-transform"
          >
            <div className="relative group cursor-pointer">
              {/* Outer glow */}
              <div className="absolute -inset-4 bg-studio-red/10 xl:bg-studio-red/20 blur-3xl opacity-100 xl:opacity-0 xl:group-hover:opacity-100 transition-opacity duration-700" />
              
              <div 
                ref={fullscreenRef}
                className={`relative aspect-video sm:aspect-video w-full max-w-full md:max-w-xl mx-auto rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-white/20 xl:border-white/10 bg-studio-black shadow-2xl ${
                  isFullscreen ? 'fixed inset-0 z-[9999] rounded-none aspect-auto max-w-full' : ''
                }`}
              >
                {/* Facebook Embed */}
                <iframe 
                  src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1467677221505904&show_text=false&t=0&autoplay=1&muted=1" 
                  className="w-full h-full border-none overflow-hidden transition-all duration-1000 group-hover:scale-105"
                  scrolling="no" 
                  frameBorder="0" 
                  allowFullScreen={true} 
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                ></iframe>
                
                {/* Overlay để tạo cảm giác điện ảnh */}
                <div className="absolute inset-0 bg-gradient-to-t from-studio-black/80 via-studio-black/20 to-transparent pointer-events-none" />
                
                {/* SCANLINES - Hiệu ứng nhiễu sọc CRT */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-10" />

                {/* THÔNG TIN VIDEO GÓC DƯỚI */}
                <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8 pointer-events-none z-20">
                  <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                    <div className="w-1 md:w-2 h-1 md:h-2 rounded-full bg-studio-red animate-pulse" />
                    <span className="text-[7px] md:text-[10px] text-white/50 uppercase font-bold tracking-widest">
                      {t.hero.deepProject}
                    </span>
                  </div>
                  
                  <h3 className="text-sm md:text-xl font-bold text-white uppercase tracking-tighter drop-shadow-lg">
                    TRAILER NHÀ CÓ GIỖ
                  </h3>
                </div>
              </div>

              {/* Decorative Corner Elements */}
              <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-6 h-6 md:w-12 md:h-12 border-t-2 border-r-2 border-studio-red opacity-100 xl:opacity-0 xl:group-hover:opacity-100 transition-all duration-500 delay-100" />
              <div className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 w-6 h-6 md:w-12 md:h-12 border-b-2 border-l-2 border-studio-red opacity-100 xl:opacity-0 xl:group-hover:opacity-100 transition-all duration-500 delay-100" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 will-change-opacity"
      >
        <div className="h-12 w-px bg-gradient-to-b from-studio-gold to-transparent" />
      </motion.div>
    </section>
  );
});

export default Hero;