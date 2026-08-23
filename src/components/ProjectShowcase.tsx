import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Project } from '../data/projects';

export default function ProjectShowcase() {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch delay if wanted, but for now just load directly
    import('../data/projects').then((module) => {
      setProjects(module.PROJECTS);
      setLoading(false);
    });
  }, []);

  return (
    <section id="projects" className="min-h-screen py-16 md:py-28 bg-studio-black overflow-hidden relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="h-[1px] w-12 bg-studio-red" />
            <span className="text-studio-red text-[11px] font-bold tracking-[0.4em] uppercase">{t?.projects?.title || 'Tác phẩm'}</span>
          </motion.div>
          <h2 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] text-white">
            {t?.projects?.title || 'DANH MỤC'}<br />
            <span className="text-studio-gold">{t?.projects?.span || 'SÁNG TẠO'}</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {loading ? (
            <div className="col-span-full text-center text-white/50 py-20">Đang tải dự án...</div>
          ) : projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: index * 0.1, ease: [0.76, 0, 0.24, 1] }}
              viewport={{ once: true }}
              className="group relative cursor-pointer active:scale-[0.98] transition-transform duration-200"
            >
              <Link to={`/project/${project.id}`} className="block relative aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-white/5">
                <img
                  src={project.mainImage}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 will-change-transform"
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent 
                                opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <span className="text-studio-gold text-[10px] font-bold tracking-[0.3em] uppercase mb-2">
                    {project.category}
                  </span>
                  <h4 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter leading-tight group-hover:text-studio-red transition-colors">
                    {project.title}
                  </h4>
                  <div className="mt-6 flex items-center gap-2 overflow-hidden">
                    <span className="text-white text-[10px] font-bold tracking-[0.2em] uppercase opacity-0 -translate-x-4
                                     group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                      Xem chi tiết
                    </span>
                    <div className="h-[1px] flex-1 bg-white/20 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-100" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Contact Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            viewport={{ once: true }}
            className="group relative cursor-pointer active:scale-[0.98] transition-transform duration-200"
          >
            <div className="relative aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden border border-dashed border-white/20 bg-white/[0.02] 
                            flex flex-col items-center justify-center p-8 text-center group-hover:border-studio-red/40 transition-all duration-500">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 
                              group-hover:bg-studio-red group-hover:text-white transition-all duration-500 text-neutral-500">
                <ExternalLink size={24} />
              </div>
              <h4 className="text-xl font-bold text-white uppercase tracking-tight mb-2">Kho ý tưởng đồ sộ</h4>
              <p className="text-neutral-500 text-xs uppercase tracking-widest leading-relaxed">
                Khám phá hàng chục dự án CGI & Animation đỉnh cao khác của chúng tôi
              </p>
              <div className="mt-8 text-studio-gold text-[10px] font-bold tracking-[0.3em] uppercase border border-studio-gold/20 px-6 py-3 rounded-full hover:bg-studio-gold hover:text-black transition-all">
                Xem Portfolio
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}