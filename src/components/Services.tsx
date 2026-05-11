import { motion } from 'motion/react';
import { Layers, Video, Palette, Monitor, Zap, Mic2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      title: t.services.items.animation.title,
      desc: t.services.items.animation.desc,
      icon: <Monitor className="w-8 h-8 text-studio-red" />,
    },
    {
      title: t.services.items.motion.title,
      desc: t.services.items.motion.desc,
      icon: <Zap className="w-8 h-8 text-studio-gold" />,
    },
    {
      title: t.services.items.branding.title,
      desc: t.services.items.branding.desc,
      icon: <Palette className="w-8 h-8 text-studio-red" />,
    },
    {
      title: t.services.items.editing.title,
      desc: t.services.items.editing.desc,
      icon: <Video className="w-8 h-8 text-studio-gold" />,
    },
    {
      title: t.services.items.storytelling.title,
      desc: t.services.items.storytelling.desc,
      icon: <Layers className="w-8 h-8 text-studio-red" />,
    },
    {
      title: t.services.items.production.title,
      desc: t.services.items.production.desc,
      icon: <Mic2 className="w-8 h-8 text-studio-gold" />,
    },
  ];

  return (
    <section id="services" className="min-h-screen py-24 bg-transparent relative overflow-hidden flex items-center">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-20 text-center flex flex-col items-center">
          <h2 className="editorial-tag mb-8">
            <span /> {t.services.tag}
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter uppercase max-w-3xl">
            {t.services.title.includes('SÁNG TẠO') ? (
              <>
                {t.services.title.split('SÁNG TẠO')[0]} 
                <span className="inline-block px-2 py-1 text-transparent bg-clip-text bg-gradient-to-r from-studio-red to-studio-wine italic">SÁNG TẠO</span> 
                {t.services.title.split('SÁNG TẠO')[1]}
              </>
            ) : t.services.title}
          </h3>
          <p className="text-neutral-500 text-xs uppercase tracking-[0.4em]">{t.services.desc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: index * 0.1, ease: [0.76, 0, 0.24, 1] }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-neutral-950 p-10 rounded-xl border border-white/5 group hover:border-studio-red/40 transition-all duration-500 relative overflow-hidden"
            >
              <div className="w-8 h-[1px] bg-studio-red mb-6 transition-all group-hover:w-16" />
              <h3 className="text-[12px] font-bold uppercase tracking-[0.4em] mb-4 text-neutral-400 group-hover:text-white transition-colors">{service.title}</h3>
              <p className="text-neutral-500 text-[11px] leading-relaxed font-light tracking-wider">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
