import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="about" className="min-h-screen py-24 md:py-40 relative overflow-hidden bg-transparent flex items-center">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
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
            className="relative"
          >
            <motion.h2 variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }} className="editorial-tag mb-8">
              <span /> VỀ CHÚNG TÔI
            </motion.h2>
            <motion.h3 variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className="text-4xl md:text-5xl font-bold mb-8 leading-tight tracking-tighter">
              Chúng tôi là một <span className="text-transparent bg-clip-text bg-gradient-to-r from-studio-red to-studio-wine">Studio Sáng Tạo</span> trẻ với tầm nhìn nghệ thuật độc bản.
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
  là nơi những giấc mơ hình ảnh được hiện thực hóa qua ngôn ngữ của 3D và đồ họa chuyển động.
  Chúng tôi không chỉ làm hình ảnh, chúng tôi kể những câu chuyện chạm đến cảm xúc.
</motion.p>
            
            <motion.div variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }} className="grid grid-cols-2 gap-6 mt-12">
              <div className="glass-card p-6 rounded-2xl border-white/5">
                <h3 className="text-3xl font-bold text-studio-gold mb-2">100%</h3>
                <p className="text-white/50 text-sm uppercase tracking-wider">Sáng Tạo</p>
              </div>
              <div className="glass-card p-6 rounded-2xl border-white/5">
                <h3 className="text-3xl font-bold text-studio-gold mb-2">24/7</h3>
                <p className="text-white/50 text-sm uppercase tracking-wider">Hỗ Trợ</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            viewport={{ once: true }}
            className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden group"
          >
            <img 
              src="/images/input_file_1.png" 
              alt="Creative workspace" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-studio-black via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8">
              <div className="glass-card p-3 md:p-6 rounded-lg md:rounded-2xl border-white/10">
                <h4 className="text-white font-bold text-base md:text-lg mb-1 italic">"Sáng Tạo Là Sức Mạnh"</h4>
                <p className="text-white/60 text-[10px] md:text-xs italic">— Đánh thức tiềm năng của bạn</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
