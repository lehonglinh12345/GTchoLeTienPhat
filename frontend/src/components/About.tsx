import { memo } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

const About = memo(function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="min-h-screen py-24 md:py-40 relative overflow-hidden bg-transparent flex items-center">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.2
                }
              }
            }}
            className="relative will-change-opacity"
          >
            <motion.h2 variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }} className="editorial-tag mb-8">
              <span /> {t.about.tag}
            </motion.h2>
            <motion.h3 variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className="text-4xl md:text-5xl font-bold mb-8 leading-tight tracking-tighter">
              {t.about.title.includes('Studio Sáng Tạo') ? (
                <>
                  {t.about.title.split('Studio Sáng Tạo')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-studio-red to-studio-wine">Studio Sáng Tạo</span> {t.about.title.split('Studio Sáng Tạo')[1]}
                </>
              ) : t.about.title.includes('Creative Studio') ? (
                <>
                  {t.about.title.split('Creative Studio')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-studio-red to-studio-wine">Creative Studio</span> {t.about.title.split('Creative Studio')[1]}
                </>
              ) : t.about.title}
            </motion.h3>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-neutral-400 text-base leading-relaxed mb-10 border-l border-studio-wine pl-4"
            >
              <span
                className="
                  text-transparent bg-clip-text
                  bg-gradient-to-r from-red-500 via-rose-300 to-red-700
                  font-semibold italic tracking-wide
                  drop-shadow-[0_0_12px_rgba(255,0,0,0.5)]
                "
              >
                3COVANGOC STUDIO
              </span>{" "}
              {t.about.desc.includes('3covangoc Studio') ? t.about.desc.replace('3covangoc Studio', '').trim() : t.about.desc}
            </motion.p>
            
            <motion.div variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }} className="grid grid-cols-2 gap-4 md:gap-6 mt-8 md:mt-12">
              <div className="glass-card p-4 md:p-6 rounded-2xl border-white/5">
                <h3 className="text-2xl md:text-3xl font-bold text-studio-gold mb-2">100%</h3>
                <p className="text-white/50 text-[10px] md:text-sm uppercase tracking-wider">{t.about.creative}</p>
              </div>
              <div className="glass-card p-4 md:p-6 rounded-2xl border-white/5">
                <h3 className="text-2xl md:text-3xl font-bold text-studio-gold mb-2">24/7</h3>
                <p className="text-white/50 text-[10px] md:text-sm uppercase tracking-wider">{t.about.support}</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden group will-change-transform"
          >
            <img 
              src="/images/input_file_2.png" 
              alt="Creative workspace" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-studio-black via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8">
              <div className="glass-card p-3 md:p-6 rounded-lg md:rounded-2xl border-white/10">
                <h4 className="text-white font-bold text-base md:text-lg mb-1 italic">"{t.about.power}"</h4>
                <p className="text-white/60 text-[10px] md:text-xs italic">— {t.about.potential}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default About;