import { motion } from 'motion/react';
import { Layers, Video, Palette, Monitor, Zap, Mic2 } from 'lucide-react';

const services = [
  {
    title: 'Hoạt Hình 3D',
    desc: 'Tạo ra những thế giới sống động với công nghệ diễn hoạt 3D hiện đại nhất.',
    icon: <Monitor className="w-8 h-8 text-studio-red" />,
  },
  {
    title: 'Motion Graphics',
    desc: 'Kết hợp đồ họa và âm thanh để truyền tải thông điệp một cách ấn tượng.',
    icon: <Zap className="w-8 h-8 text-studio-gold" />,
  },
  {
    title: 'Branding Design',
    desc: 'Xây dựng bản sắc thương hiệu đậm chất cinematic và chuyên nghiệp.',
    icon: <Palette className="w-8 h-8 text-studio-red" />,
  },
  {
    title: 'Video Editing',
    desc: 'Hậu kỳ chuyên sâu, tạo nên nhịp điệu và cảm xúc hoàn hảo cho thước phim.',
    icon: <Video className="w-8 h-8 text-studio-gold" />,
  },
  {
    title: 'Storytelling',
    desc: 'Xây dựng kịch bản và câu chuyện bằng hình ảnh đầy chiều sâu nghệ thuật.',
    icon: <Layers className="w-8 h-8 text-studio-red" />,
  },
  {
    title: 'Sản Xuất Sáng Tạo',
    desc: 'Quy trình sản xuất trọn gói từ ý tưởng đến sản phẩm hoàn thiện cuối cùng.',
    icon: <Mic2 className="w-8 h-8 text-studio-gold" />,
  },
];

export default function Services() {
  return (
    <section id="services" className="min-h-screen py-24 bg-transparent relative overflow-hidden flex items-center">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-20 text-center flex flex-col items-center">
          <h2 className="editorial-tag mb-8">
            <span /> DỊCH VỤ CỦA CHÚNG TÔI
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter uppercase max-w-3xl">
            GIẢI PHÁP <span className="inline-block px-2 py-1 text-transparent bg-clip-text bg-gradient-to-r from-studio-red to-studio-wine italic">SÁNG TẠO</span> TOÀN DIỆN
          </h3>
          <p className="text-neutral-500 text-xs uppercase tracking-[0.4em]">Cho kỷ nguyên hình ảnh kỹ thuật số</p>
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
