import { memo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Image as ImageIcon, ExternalLink, Calendar, Tag } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  mainImage: string;
  gallery: string[];
  color: string;
  videoUrl?: string;
  tags: string[];
}

const ProjectShowcase = memo(function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { t, language } = useLanguage();

  const PROJECTS: Project[] = [
    {
      id: "project-1",
      title: language === 'vi' ? "NHÀ CÓ GIỖ" : (language === 'ja' ? "法事の家" : "AT HOME FOR THE ANNIVERSARY"),
      category: language === 'vi' ? "Phim Ngắn / 3D Branding" : (language === 'ja' ? "短編映画 / 3Dブランディング" : "Short Film / 3D Branding"),
      year: "2026",
      description: t.projects.project1Desc,
      mainImage: "/images/input_file_1.png",
      gallery: [],
      color: "bg-studio-red",
      videoUrl: "https://www.youtube.com/embed/TM142-7LiiQ",
      tags: ["3D Animation", "Creative Direction", "CGI", "Visual Storytelling"]
    }
  ];

  return (
    <section id="projects" className="min-h-screen py-24 bg-studio-black overflow-hidden relative flex items-center">
      <div className="container mx-auto px-6">
        <div className="mb-12 md:mb-16">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase">{t.projects.title} <span className="text-studio-red">{t.projects.span}</span></h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.05, ease: [0.76, 0, 0.24, 1] }}
              viewport={{ once: true, margin: "-50px" }}
              onClick={() => setSelectedProject(project)}
              className="group relative cursor-pointer will-change-transform"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                <img 
                  src={project.mainImage} 
                  className="w-full h-full object-cover transition-all duration-700" 
                  alt={project.title} 
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="mt-4">
                <span className="text-[10px] text-studio-gold font-bold tracking-widest uppercase">{project.category}</span>
                <h4 className="text-xl font-bold text-white uppercase tracking-tight mt-1">{project.title}</h4>
              </div>
            </motion.div>
          ))}

          {/* Placeholder for more projects */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
            viewport={{ once: true, margin: "-50px" }}
            className="group relative cursor-pointer will-change-transform"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-dashed border-white/20 bg-white/[0.02] flex flex-col items-center justify-center gap-4 group-hover:border-studio-red/50 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-studio-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-studio-red/20 transition-all duration-500 relative z-10">
                <ExternalLink className="w-6 h-6 text-neutral-500 group-hover:text-studio-red transition-colors" />
              </div>
              <span className="text-[10px] font-bold tracking-[0.3em] text-neutral-500 group-hover:text-white uppercase transition-colors relative z-10">
                {t.projects.viewAll}
              </span>
            </div>
            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-[10px] text-studio-gold font-bold tracking-widest uppercase">{t.projects.discoverMore}</span>
              <h4 className="text-xl font-bold text-white uppercase tracking-tight mt-1">{t.projects.fullPortfolio}</h4>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-0 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-studio-black/95 backdrop-blur-xl"
            />
            
            <motion.div
              layoutId={selectedProject.id}
              initial={{ opacity: 0, scale: 0.9, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-6xl h-full md:h-auto md:max-h-[90vh] bg-neutral-900 md:rounded-3xl overflow-hidden shadow-2xl border-x md:border border-white/10 flex flex-col will-change-transform"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-[60] p-3 bg-studio-black/50 hover:bg-studio-red text-white rounded-full transition-colors backdrop-blur-md"
              >
                <X size={20} className="md:w-6 md:h-6" />
              </button>

              <div 
                className="flex-1 overflow-y-auto custom-scrollbar overscroll-contain"
                data-lenis-prevent
              >
                {/* Modal Header/Hero */}
                <div className="relative h-72 md:h-[50vh] w-full">
                  <img 
                    src={selectedProject.mainImage} 
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
                  <div className="absolute bottom-6 left-6 md:bottom-10 md:left-12 pr-6">
                    <span className="text-studio-gold text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-2 md:mb-4 block">{selectedProject.category} / {selectedProject.year}</span>
                    <h2 className="text-3xl md:text-7xl font-bold text-white uppercase tracking-tighter leading-none">{selectedProject.title}</h2>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-16">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-20">
                    <div className="lg:col-span-8">
                       <div className="mb-12">
                         <h3 className="text-studio-gold text-[10px] md:text-xs font-bold tracking-widest uppercase mb-4 flex items-center gap-2 opacity-60">
                           <Tag size={12} /> {t.projects.modal.story}
                         </h3>
                         <p className="text-neutral-200 text-lg md:text-xl font-light leading-relaxed whitespace-pre-line">
                           {selectedProject.id === 'project-1' ? t.projects.project1Desc : selectedProject.description}
                         </p>
                       </div>

                       {selectedProject.videoUrl ? (
                         <div>
                           <h3 className="text-studio-gold text-[10px] md:text-xs font-bold tracking-widest uppercase mb-6 flex items-center gap-2 opacity-60">
                             <Play size={12} /> {t.projects.modal.video}
                           </h3>
                           <div className="rounded-2xl overflow-hidden border border-white/10 aspect-video bg-white/5 shadow-2xl">
                             <iframe 
                               src={selectedProject.videoUrl}
                               className="w-full h-full"
                               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                               allowFullScreen
                               loading="lazy"
                             ></iframe>
                           </div>
                         </div>
                       ) : (
                         selectedProject.gallery.length > 0 && (
                           <div>
                             <h3 className="text-studio-gold text-[10px] md:text-xs font-bold tracking-widest uppercase mb-6 flex items-center gap-2 opacity-60">
                               <ImageIcon size={12} /> {t.projects.modal.video}
                             </h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                               {selectedProject.gallery.map((img, idx) => (
                                 <motion.div 
                                   key={idx}
                                   whileHover={{ scale: 1.02 }}
                                   className="rounded-xl overflow-hidden border border-white/5 aspect-video md:aspect-square lg:aspect-video bg-white/5 will-change-transform"
                                 >
                                   <img 
                                     src={img} 
                                     alt={`Gallery ${idx}`} 
                                     className="w-full h-full object-cover transition-all duration-700" 
                                     referrerPolicy="no-referrer"
                                     loading="lazy"
                                     decoding="async"
                                   />
                                 </motion.div>
                               ))}
                             </div>
                           </div>
                         )
                       )}
                    </div>

                    <div className="lg:col-span-4 lg:sticky lg:top-0 h-fit">
                      <div className="p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
                        <div className="space-y-8">
                          <div>
                            <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-[0.2em] block mb-2">{t.projects.modal.info}</span>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between py-2 border-b border-white/5">
                                <span className="text-xs text-neutral-400">{t.projects.modal.year}</span>
                                <span className="text-xs font-bold text-white">{selectedProject.year}</span>
                              </div>
                              <div className="flex items-center justify-between py-2 border-b border-white/5">
                                <span className="text-xs text-neutral-400">{t.projects.modal.location}</span>
                                <span className="text-xs font-bold text-white">{t.projects.modal.vn}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-[0.2em] block mb-4">{t.projects.modal.tags}</span>
                            <div className="flex flex-wrap gap-2">
                              {selectedProject.tags.map(tag => (
                                <span key={tag} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] text-neutral-300 uppercase tracking-wider">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <a 
                          href="#contact"
                          onClick={() => setSelectedProject(null)}
                          className="w-full mt-10 py-5 bg-studio-red text-white font-bold uppercase tracking-widest text-[10px] hover:bg-studio-red/80 transition-all rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-studio-red/20"
                        >
                           {t.projects.modal.cta} <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
});

export default ProjectShowcase;
