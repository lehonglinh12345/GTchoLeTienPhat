import { 
  motion, 
  AnimatePresence, 
  useMotionValue, 
  useTransform, 
  animate 
} from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { X, Play, Image as ImageIcon, ExternalLink, Tag, ChevronDown } from 'lucide-react';

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
    description: "NHÀ CÓ GIỖ – Phim hoạt hình 3D ngắn chính thức ra mắt! Sau khoảng thời gian thực hiện và hoàn thiện, chúng tôi rất vui khi được mang bộ phim đến với mọi người trên YouTube và FanPage chính thức. 💛 Một câu chuyện vừa hài hước, gần gũi nhưng cũng đầy cảm xúc về gia đình, đám giỗ và những yêu thương đôi khi chưa kịp nói thành lời.",
    mainImage: "/images/input_file_1.png",
    gallery: [],
    color: "bg-studio-red",
    videoUrl: "https://www.youtube.com/embed/bB6ZTFAWmcQ",
    tags: ["3D Animation", "Creative Direction", "CGI", "Visual Storytelling"]
  }
];

export default function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // MOBILE DRAG DISMISS LOGIC
  const dragY = useMotionValue(0);
  const dragOpacity = useTransform(dragY, [0, 300], [1, 0.5]);
  const dragScale = useTransform(dragY, [0, 300], [1, 0.95]);
  const touchStartY = useRef(0);
  const isDragging = useRef(false);

  // Body scroll lock + bridge for Navbar visibility
  useEffect(() => {
    if (!selectedProject) return;

    const originalY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${originalY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
      window.scrollTo(0, originalY);
    };
  }, [selectedProject]);

  // Reset modal scroll and drag state
  useEffect(() => {
    if (selectedProject && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
      setScrollProgress(0);
      dragY.set(0);
    }
  }, [selectedProject, dragY]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const totalScrollable = scrollHeight - clientHeight;
    setScrollProgress(totalScrollable > 0 ? scrollTop / totalScrollable : 0);
  };

  const closeModal = () => {
    setSelectedProject(null);
    dragY.set(0);
  };

  // Mobile Drag Event Handlers
  const onTouchStart = (e: React.TouchEvent) => {
    if (scrollRef.current && scrollRef.current.scrollTop > 0) return;
    isDragging.current = true;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const delta = e.touches[0].clientY - touchStartY.current;
    if (delta > 0) {
      dragY.set(delta);
    }
  };

  const onTouchEnd = () => {
    isDragging.current = false;
    const currentDrag = dragY.get();
    if (currentDrag > 120) {
      animate(dragY, window.innerHeight, {
        duration: 0.3,
        ease: [0.76, 0, 0.24, 1],
        onComplete: closeModal
      });
    } else {
      animate(dragY, 0, {
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1]
      });
    }
  };

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
            <span className="text-studio-red text-[11px] font-bold tracking-[0.4em] uppercase">Tác phẩm</span>
          </motion.div>
          <h2 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] text-white">
            DANH MỤC<br />
            <span className="text-studio-gold">SÁNG TẠO</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: index * 0.1, ease: [0.76, 0, 0.24, 1] }}
              viewport={{ once: true }}
              onClick={() => setSelectedProject(project)}
              className="group relative cursor-pointer active:scale-[0.98] transition-transform duration-200"
            >
              <div className="relative aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-white/5">
                <img
                  src={project.mainImage}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  alt={project.title}
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
              </div>
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

      {/* Modal System */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
            />

            {/* Modal Panel */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
              style={{
                y: dragY,
                opacity: dragOpacity,
                scale: dragScale,
              }}
              className="relative w-full bg-neutral-950 shadow-[0_-20px_80px_-15px_rgba(0,0,0,0.8)]
                         flex flex-col rounded-t-[32px] sm:rounded-3xl border-t sm:border border-white/10
                         h-[94vh] sm:h-auto sm:max-w-5xl sm:max-h-[90vh] sm:mx-4 overflow-hidden"
            >
              {/* Close / Progress Header */}
              <div className="sticky top-0 z-[70] bg-neutral-950/80 backdrop-blur-md">
                <div className="relative h-1 w-full bg-white/5">
                  <motion.div 
                    className="absolute h-full bg-studio-red"
                    style={{ width: `${scrollProgress * 100}%` }}
                  />
                </div>
                
                {/* Drag Handle Area */}
                <div 
                  className="flex flex-col items-center py-4 cursor-grab active:cursor-grabbing"
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                >
                  <div className="w-12 h-1.5 rounded-full bg-white/10 mb-1" />
                  <span className="text-[8px] uppercase tracking-[0.4em] text-white/20 font-bold sm:hidden">
                    Lướt để đóng
                  </span>
                </div>

                <button
                  onClick={closeModal}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center
                             bg-white/5 hover:bg-studio-red text-white rounded-full transition-all active:scale-90"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto overscroll-contain no-scrollbar"
              >
                {/* Hero Section */}
                <div className="relative aspect-video sm:aspect-[21/9]">
                  <img
                    src={selectedProject.mainImage}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="text-studio-gold text-xs font-bold tracking-[0.3em] uppercase mb-3 block">
                        {selectedProject.category} • {selectedProject.year}
                      </span>
                      <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                        {selectedProject.title}
                      </h2>
                    </motion.div>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-6 sm:p-12 lg:p-16">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    
                    {/* Main Text Content */}
                    <div className="lg:col-span-8 space-y-12">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <h3 className="text-studio-gold text-[10px] font-bold tracking-[0.3em] uppercase mb-6 flex items-center gap-3">
                          <Tag size={12} /> Tổng quan dự án
                        </h3>
                        <p className="text-neutral-300 text-lg sm:text-xl lg:text-2xl font-light leading-relaxed">
                          {selectedProject.description}
                        </p>
                      </motion.div>

                      {/* Video Player */}
                      {selectedProject.videoUrl && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <h3 className="text-studio-gold text-[10px] font-bold tracking-[0.3em] uppercase mb-6 flex items-center gap-3">
                            <Play size={12} /> Video Breakdown
                          </h3>
                          <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl relative w-full aspect-video">
                            <iframe
                              src={selectedProject.videoUrl}
                              className="absolute inset-0 w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              loading="lazy"
                            />
                          </div>
                        </motion.div>
                      )}

                      {/* CTA Mobile */}
                      <div className="sm:hidden space-y-4">
                        <a href="#contact" onClick={closeModal} className="w-full py-5 bg-studio-red text-white flex items-center justify-center gap-3 rounded-2xl font-black uppercase tracking-widest text-[10px]">
                          BẮT ĐẦU DỰ ÁN CỦA BẠN <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>

                    {/* Sidebar Details */}
                    <div className="hidden sm:block lg:col-span-4 space-y-12">
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="sticky top-24 p-8 rounded-[32px] bg-white/[0.03] border border-white/5 backdrop-blur-3xl"
                      >
                        <div className="space-y-10">
                          <div>
                            <span className="text-[10px] text-neutral-500 uppercase font-black tracking-widest block mb-4">Specs</span>
                            <div className="space-y-4">
                              <div className="flex justify-between py-2 border-b border-white/5">
                                <span className="text-xs text-neutral-400">Timeline</span>
                                <span className="text-xs font-bold text-white">{selectedProject.year}</span>
                              </div>
                              <div className="flex justify-between py-2 border-b border-white/5">
                                <span className="text-xs text-neutral-400">Location</span>
                                <span className="text-xs font-bold text-white">Việt Nam</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <span className="text-[10px] text-neutral-500 uppercase font-black tracking-widest block mb-4">Focus</span>
                            <div className="flex flex-wrap gap-2">
                              {selectedProject.tags.map(tag => (
                                <span key={tag} className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-[9px] text-neutral-300 uppercase tracking-wider">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          <a href="#contact" onClick={closeModal} className="group relative w-full py-5 bg-studio-red overflow-hidden rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-studio-red/20 transition-transform active:scale-95">
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            <span className="relative z-10 text-white font-black uppercase tracking-widest text-[10px]">LIÊN HỆ TEAM</span>
                            <ExternalLink size={14} className="relative z-10 text-white" />
                          </a>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Footer Tip */}
                <div className="py-20 text-center flex flex-col items-center gap-4 opacity-30">
                   <ChevronDown size={24} className="animate-bounce" />
                   <span className="text-[10px] uppercase font-bold tracking-[0.5em]">End of project</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}