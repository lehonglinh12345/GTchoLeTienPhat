import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { X, Play, Image as ImageIcon, ExternalLink, Calendar, Tag } from 'lucide-react';

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

const PROJECTS: Project[] = [
  {
    id: "project-1",
    title: "NHÀ CÓ GIỖ",
    category: "Phim Ngắn / 3D Branding",
    year: "2026",
    description: "NHÀ CÓ GIỖ – Phim hoạt hình 3D ngắn chính thức ra mắt!Sau khoảng thời gian thực hiện và hoàn thiện, chúng tôi rất vui khi được mang bộ phim đến với mọi người trên YouTube và FanPage chính thức. 💛Một câu chuyện vừa hài hước, gần gũi nhưng cũng đầy cảm xúc về gia đình, đám giỗ và những yêu thương đôi khi chưa kịp nói thành lời.",
    mainImage: "/images/input_file_1.png",
    gallery: [],
    color: "bg-studio-red",
    videoUrl: "https://www.youtube.com/embed/TM142-7LiiQ",
    tags: ["3D Animation", "Creative Direction", "CGI", "Visual Storytelling"]
  }
];

export default function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="min-h-screen py-24 bg-studio-black overflow-hidden relative flex items-center">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase">DANH MỤC <span className="text-studio-red">SÁNG TẠO</span></h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: index * 0.1, ease: [0.76, 0, 0.24, 1] }}
              viewport={{ once: true }}
              onClick={() => setSelectedProject(project)}
              className="group relative cursor-pointer"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                <img 
                  src={project.mainImage} 
                  className="w-full h-full object-cover transition-all duration-700" 
                  alt={project.title} 
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
            transition={{ duration: 1.2, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            viewport={{ once: true }}
            className="group relative cursor-pointer"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-dashed border-white/20 bg-white/[0.02] flex flex-col items-center justify-center gap-4 group-hover:border-studio-red/50 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-studio-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-studio-red/20 transition-all duration-500 relative z-10">
                <ExternalLink className="w-6 h-6 text-neutral-500 group-hover:text-studio-red transition-colors" />
              </div>
              <span className="text-[10px] font-bold tracking-[0.3em] text-neutral-500 group-hover:text-white uppercase transition-colors relative z-10">
                Xem tất cả kho dự án
              </span>
            </div>
            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-[10px] text-studio-gold font-bold tracking-widest uppercase">Khám phá thêm</span>
              <h4 className="text-xl font-bold text-white uppercase tracking-tight mt-1">Portfolio Đầy Đủ</h4>
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
              initial={{ opacity: 0, scale: 1, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 50 }}
              className="relative w-full max-w-6xl h-full md:h-auto md:max-h-[90vh] bg-neutral-900 md:rounded-3xl overflow-hidden shadow-2xl border-x md:border border-white/10 flex flex-col"
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
                           <Tag size={12} /> Câu chuyện dự án
                         </h3>
                         <p className="text-neutral-200 text-lg md:text-xl font-light leading-relaxed">
                           {selectedProject.description}
                         </p>
                       </div>

                       {selectedProject.videoUrl ? (
                         <div>
                           <h3 className="text-studio-gold text-[10px] md:text-xs font-bold tracking-widest uppercase mb-6 flex items-center gap-2 opacity-60">
                             <Play size={12} /> Video Dự Án
                           </h3>
                           <div className="rounded-2xl overflow-hidden border border-white/10 aspect-video bg-white/5 shadow-2xl">
                             <iframe 
                               src={selectedProject.videoUrl}
                               className="w-full h-full"
                               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                               allowFullScreen
                             ></iframe>
                           </div>
                         </div>
                       ) : (
                         selectedProject.gallery.length > 0 && (
                           <div>
                             <h3 className="text-studio-gold text-[10px] md:text-xs font-bold tracking-widest uppercase mb-6 flex items-center gap-2 opacity-60">
                               <ImageIcon size={12} /> Thư viện hình ảnh
                             </h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                               {selectedProject.gallery.map((img, idx) => (
                                 <motion.div 
                                   key={idx}
                                   whileHover={{ scale: 1.02 }}
                                   className="rounded-xl overflow-hidden border border-white/5 aspect-video md:aspect-square lg:aspect-video bg-white/5"
                                 >
                                   <img 
                                     src={img} 
                                     alt={`Gallery ${idx}`} 
                                     className="w-full h-full object-cover transition-all duration-700" 
                                     referrerPolicy="no-referrer"
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
                            <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-[0.2em] block mb-2">Thông tin dự án</span>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between py-2 border-b border-white/5">
                                <span className="text-xs text-neutral-400">Năm thực hiện</span>
                                <span className="text-xs font-bold text-white">{selectedProject.year}</span>
                              </div>
                              <div className="flex items-center justify-between py-2 border-b border-white/5">
                                <span className="text-xs text-neutral-400">Vị trí</span>
                                <span className="text-xs font-bold text-white">Việt Nam</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-[0.2em] block mb-4">Lĩnh vực sáng tạo</span>
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
                           Liên hệ với nhóm <ExternalLink size={14} />
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
}

