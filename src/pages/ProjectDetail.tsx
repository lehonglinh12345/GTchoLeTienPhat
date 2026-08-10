import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, PlayCircle, Clock, Lock } from 'lucide-react';
import { PROJECTS, Episode } from '../data/projects';
import { useLanguage } from '../contexts/LanguageContext';
import { cn } from '../lib/utils';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const project = PROJECTS.find(p => p.id === id);
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(project?.episodes?.[0] || null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0c0c0c]">
        <div className="text-center">
          <h1 className="text-4xl text-white font-black mb-4">Project Not Found</h1>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-studio-red text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-studio-black transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0c0c0c] selection:bg-studio-red selection:text-white pb-20 pt-24 lg:pt-32">
      
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group mb-6"
        >
          <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
          <span className="text-xs font-bold uppercase tracking-widest">Quay lại Trang Chủ</span>
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* MAIN CONTENT (LEFT) */}
          <div className="w-full lg:w-[70%] shrink-0">
            {/* Video Player */}
            <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group">
              {currentEpisode?.videoUrl ? (
                <iframe
                  src={currentEpisode.videoUrl}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/5 backdrop-blur-sm">
                  <Lock size={48} className="text-white/20 mb-4" />
                  <p className="text-white/50 font-bold uppercase tracking-widest text-sm">Tập phim sắp ra mắt</p>
                </div>
              )}
            </div>

            {/* Video Info */}
            <div className="mt-6">
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl md:text-3xl font-black text-white leading-tight"
              >
                {currentEpisode?.title || project.title}
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-4 mt-3"
              >
                <span className="text-sm font-bold text-studio-red uppercase tracking-widest">{project.category}</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span className="text-sm font-medium text-neutral-400">{project.year}</span>
              </motion.div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-white/5 text-neutral-300 rounded-lg text-[11px] uppercase tracking-wider font-bold">
                  {tag}
                </span>
              ))}
            </div>

            {/* Description Box (Youtube Style) */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 bg-white/[0.03] hover:bg-white/[0.05] transition-colors border border-white/5 rounded-2xl p-6"
            >
              <p className="text-neutral-300 text-sm md:text-base font-light leading-relaxed whitespace-pre-wrap">
                {project.description}
              </p>
            </motion.div>
          </div>

          {/* SIDEBAR (RIGHT) - Episodes */}
          <div className="w-full lg:w-[30%] flex flex-col gap-4">
            <h3 className="text-lg font-bold text-white mb-2">Danh sách các tập</h3>
            
            <div className="flex flex-col gap-3">
              {project.episodes?.map((episode, index) => {
                const isActive = currentEpisode?.id === episode.id;
                
                return (
                  <div 
                    key={episode.id}
                    onClick={() => {
                      if (!episode.isPlaceholder) {
                        setCurrentEpisode(episode);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className={cn(
                      "flex gap-3 p-2 rounded-xl transition-all duration-300",
                      isActive ? "bg-white/10 border-white/10 border" : "hover:bg-white/5 border border-transparent",
                      episode.isPlaceholder ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                    )}
                  >
                    {/* Thumbnail */}
                    <div className="w-40 aspect-video bg-black rounded-lg overflow-hidden relative shrink-0">
                      {episode.thumbnail ? (
                        <img src={episode.thumbnail} alt={episode.title} className="w-full h-full object-cover will-change-transform" loading="lazy" decoding="async" />
                      ) : (
                        <div className="absolute inset-0 bg-white/5 flex items-center justify-center">
                          <PlayCircle size={24} className="text-white/20" />
                        </div>
                      )}
                      
                      {/* Duration / Status badge */}
                      <div className="absolute bottom-1 right-1 bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded text-[10px] font-bold text-white flex items-center gap-1">
                        {episode.isPlaceholder ? (
                          <span className="uppercase tracking-widest text-[8px] text-studio-gold">Soon</span>
                        ) : (
                          <>
                            {episode.duration}
                          </>
                        )}
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-col flex-1 py-1">
                      <h4 className={cn(
                        "text-sm font-bold line-clamp-2 leading-snug",
                        isActive ? "text-white" : "text-neutral-300"
                      )}>
                        {episode.title}
                      </h4>
                      <span className="text-[11px] text-neutral-500 font-medium mt-1">Tập {index + 1}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
