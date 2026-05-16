import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { X, Play, Image as ImageIcon, ExternalLink, Tag } from 'lucide-react';

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
  const scrollRef = useRef<HTMLDivElement>(null);

  // ── Body scroll lock + ẩn navbar mobile khi modal mở ──
  useEffect(() => {
    if (!selectedProject) return;

    const originalY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${originalY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    // Thêm class để navbar tự ẩn (navbar cần có: [body.modal-open_&]:max-sm:hidden hoặc check class này)
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

  // Reset modal scroll to top when a new project is opened
  useEffect(() => {
    if (selectedProject && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [selectedProject]);

  const closeModal = () => setSelectedProject(null);

  return (
    <section id="projects" className="min-h-screen py-16 md:py-24 bg-studio-black overflow-hidden relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-10 md:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase leading-none">
            DỰ ÁN{' '}
            <span className="text-studio-red">CỦA VANGOC</span>
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: index * 0.1, ease: [0.76, 0, 0.24, 1] }}
              viewport={{ once: true }}
              onClick={() => setSelectedProject(project)}
              className="group relative cursor-pointer active:scale-[0.98] transition-transform duration-150"
            >
              <div className="relative aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                <img
                  src={project.mainImage}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={project.title}
                />
                {/* 
                  Desktop: hover overlay (opacity-0 → opacity-100 on hover)
                  Mobile:  always show a subtle bottom gradient + tap indicator 
                */}
                <div className="absolute inset-0 bg-studio-black/40 
                                opacity-100 sm:opacity-0 sm:group-hover:opacity-100 
                                transition-opacity duration-500 
                                flex items-end sm:items-center justify-center pb-4 sm:pb-0">
                  <span className="text-white text-[10px] font-bold tracking-[0.25em] uppercase 
                                   border border-white/60 px-4 py-2 rounded-full backdrop-blur-sm
                                   sm:opacity-100">
                    Xem chi tiết
                  </span>
                </div>
              </div>
              <div className="mt-3 md:mt-4">
                <span className="text-[10px] text-studio-gold font-bold tracking-widest uppercase">
                  {project.category}
                </span>
                <h4 className="text-lg md:text-xl font-bold text-white uppercase tracking-tight mt-0.5">
                  {project.title}
                </h4>
              </div>
            </motion.div>
          ))}

          {/* Placeholder card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            viewport={{ once: true }}
            className="group relative cursor-pointer active:scale-[0.98] transition-transform duration-150"
          >
            <div className="relative aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden 
                            border border-dashed border-white/20 bg-white/[0.02] 
                            flex flex-col items-center justify-center gap-3 md:gap-4 
                            group-hover:border-studio-red/50 transition-all duration-500">
              <div className="absolute inset-0 bg-studio-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 flex items-center justify-center 
                              group-hover:bg-studio-red/20 transition-all duration-500 relative z-10">
                <ExternalLink className="w-5 h-5 md:w-6 md:h-6 text-neutral-500 group-hover:text-studio-red transition-colors" />
              </div>
              <span className="text-[10px] font-bold tracking-[0.3em] text-neutral-500 group-hover:text-white 
                               uppercase transition-colors relative z-10 text-center px-4">
                Xem tất cả kho dự án
              </span>
            </div>
            {/* On mobile: always show the label below placeholder */}
            <div className="mt-3 md:mt-4 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-[10px] text-studio-gold font-bold tracking-widest uppercase">Khám phá thêm</span>
              <h4 className="text-lg md:text-xl font-bold text-white uppercase tracking-tight mt-0.5">Portfolio Đầy Đủ</h4>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─────────────────────────────────────────
          Project Details Modal
      ───────────────────────────────────────── */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center">

            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-studio-black/90 backdrop-blur-lg"
            />

            {/* ── Modal Panel ──
                Mobile  : bottom sheet, slides up, max 92dvh
                sm+     : centered floating card
            */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.38, ease: [0.76, 0, 0.24, 1] }}
              className="relative w-full bg-neutral-900 shadow-2xl flex flex-col
                         rounded-t-[24px] border-t border-x border-white/10
                         h-[100dvh]
                         sm:h-auto sm:rounded-3xl sm:border sm:max-w-2xl sm:max-h-[88vh] sm:mx-4
                         lg:max-w-5xl xl:max-w-6xl"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {/* ── Sticky top bar — mobile: drag handle + close button luôn nổi ── */}
              <div className="sm:hidden flex-shrink-0 flex items-center justify-between
                              px-4 pt-3 pb-3
                              bg-neutral-900 border-b border-white/5 z-[70]">
                {/* Drag handle căn giữa */}
                <div className="flex-1" />
                <div className="w-10 h-1 rounded-full bg-white/25" />
                <div className="flex-1 flex justify-end">
                  <button
                    onClick={closeModal}
                    className="w-9 h-9 flex items-center justify-center
                               bg-white/10 hover:bg-studio-red
                               text-white rounded-full transition-colors active:scale-95"
                    aria-label="Đóng"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* ── Close button desktop only ── */}
              <button
                onClick={closeModal}
                className="hidden sm:flex absolute top-5 right-5 z-[70]
                           w-10 h-10 items-center justify-center
                           bg-neutral-800/80 hover:bg-studio-red
                           text-white rounded-full transition-colors backdrop-blur-md
                           active:scale-95"
                aria-label="Đóng"
              >
                <X size={18} />
              </button>

              {/* ── Scrollable body ── */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto overscroll-contain custom-scrollbar"
                data-lenis-prevent
                style={{ WebkitOverflowScrolling: 'touch' }}
              >

                {/* ── Mobile: compact inline header ── */}
                <div className="sm:hidden px-4 pt-4 pb-4 border-b border-white/5">
                  <span className="text-studio-gold text-[9px] font-bold tracking-[0.3em] uppercase mb-1.5 block opacity-70">
                    {selectedProject.category} · {selectedProject.year}
                  </span>
                  <h2 className="text-2xl font-bold text-white uppercase tracking-tighter leading-tight">
                    {selectedProject.title}
                  </h2>
                </div>

                {/* ── sm+: full hero image ── */}
                <div className="hidden sm:block relative w-full sm:h-64 md:h-72 lg:h-[42vh] lg:max-h-none flex-shrink-0">
                  <img
                    src={selectedProject.mainImage}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-16 lg:bottom-10 lg:left-12">
                    <span className="text-studio-gold text-[10px] font-bold tracking-[0.3em] uppercase mb-2 block">
                      {selectedProject.category} / {selectedProject.year}
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white uppercase tracking-tighter leading-none">
                      {selectedProject.title}
                    </h2>
                  </div>
                </div>

                {/* ── Body content ── */}
                <div className="p-4 sm:p-6 md:p-10 lg:p-14">
                  <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 sm:gap-8 md:gap-12 lg:gap-16">

                    {/* Left: description + media */}
                    <div className="lg:col-span-8 space-y-6 sm:space-y-8 md:space-y-12">

                      {/* Description */}
                      <div>
                        <h3 className="text-studio-gold text-[9px] sm:text-[10px] font-bold tracking-widest uppercase mb-2 sm:mb-3 flex items-center gap-2 opacity-60">
                          <Tag size={11} /> Câu chuyện dự án
                        </h3>
                        <p className="text-neutral-300 text-sm sm:text-base lg:text-xl font-light leading-relaxed">
                          {selectedProject.description}
                        </p>
                      </div>

                      {/* Meta chips — mobile horizontal strip */}
                      <div className="flex items-center gap-3 sm:hidden flex-wrap">
                        <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-neutral-400 uppercase tracking-wide">
                          📅 {selectedProject.year}
                        </span>
                        <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-neutral-400 uppercase tracking-wide">
                          🇻🇳 Việt Nam
                        </span>
                      </div>

                      {/* Tags — mobile horizontal scroll strip */}
                      <div className="sm:hidden">
                        <span className="text-[9px] text-neutral-500 uppercase font-bold tracking-[0.2em] block mb-2">
                          Lĩnh vực sáng tạo
                        </span>
                        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 no-scrollbar">
                          {selectedProject.tags.map(tag => (
                            <span
                              key={tag}
                              className="flex-shrink-0 px-3 py-1.5 bg-white/5 border border-white/10 
                                         rounded-lg text-[9px] text-neutral-300 uppercase tracking-wider"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Video */}
                      {selectedProject.videoUrl ? (
                        <div>
                          <h3 className="text-studio-gold text-[9px] sm:text-[10px] font-bold tracking-widest uppercase mb-3 sm:mb-4 flex items-center gap-2 opacity-60">
                            <Play size={11} /> Video Dự Án
                          </h3>
                          {/* Responsive iframe via padding-bottom trick */}
                          <div className="rounded-xl md:rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl
                                          relative w-full" style={{ paddingBottom: '56.25%' }}>
                            <iframe
                              src={selectedProject.videoUrl}
                              className="absolute inset-0 w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              loading="lazy"
                            />
                          </div>
                        </div>
                      ) : (
                        selectedProject.gallery.length > 0 && (
                          <div>
                            <h3 className="text-studio-gold text-[9px] sm:text-[10px] font-bold tracking-widest uppercase mb-4 flex items-center gap-2 opacity-60">
                              <ImageIcon size={11} /> Thư viện hình ảnh
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-5">
                              {selectedProject.gallery.map((img, idx) => (
                                <div key={idx} className="rounded-xl overflow-hidden border border-white/5 aspect-video bg-white/5">
                                  <img
                                    src={img}
                                    alt={`Gallery ${idx}`}
                                    className="w-full h-full object-cover"
                                    referrerPolicy="no-referrer"
                                    loading="lazy"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      )}

                      {/* CTA — mobile: full-width at bottom of left column */}
                      <a
                        href="#contact"
                        onClick={closeModal}
                        className="sm:hidden w-full py-4 bg-studio-red text-white font-bold uppercase 
                                   tracking-widest text-[10px] hover:bg-studio-red/80 active:bg-studio-red/60 
                                   transition-all rounded-xl flex items-center justify-center gap-2 
                                   shadow-lg shadow-studio-red/20"
                      >
                        Liên hệ với nhóm <ExternalLink size={13} />
                      </a>
                    </div>

                    {/* Right: sidebar — hidden on mobile (info shown inline above) */}
                    <div className="hidden sm:block lg:col-span-4">
                      <div className="p-5 sm:p-6 rounded-xl md:rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
                        <div className="space-y-6 md:space-y-8">

                          {/* Project info */}
                          <div>
                            <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-[0.2em] block mb-3">
                              Thông tin dự án
                            </span>
                            <div className="space-y-3">
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

                          {/* Tags */}
                          <div>
                            <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-[0.2em] block mb-3">
                              Lĩnh vực sáng tạo
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {selectedProject.tags.map(tag => (
                                <span
                                  key={tag}
                                  className="px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-lg 
                                             text-[10px] text-neutral-300 uppercase tracking-wider"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* CTA — desktop sidebar */}
                        <a
                          href="#contact"
                          onClick={closeModal}
                          className="w-full mt-8 py-4 bg-studio-red text-white font-bold uppercase 
                                     tracking-widest text-[10px] hover:bg-studio-red/80 active:bg-studio-red/70 
                                     transition-all rounded-xl flex items-center justify-center gap-2 
                                     shadow-lg shadow-studio-red/20"
                        >
                          Liên hệ với nhóm <ExternalLink size={13} />
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              </div>{/* end scrollable */}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}