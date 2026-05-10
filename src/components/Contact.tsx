import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, Facebook, MapPin, Send, Youtube } from 'lucide-react';

export default function Contact() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const service = formData.get('service');
    const message = formData.get('message');
    
    const mailtoUrl = `mailto:3covangocstudio@gmail.com?subject=Liên hệ từ ${name}&body=Họ tên: ${name}%0D%0AEmail: ${email}%0D%0ADịch vụ: ${service}%0D%0ALời nhắn: ${message}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="min-h-screen py-24 bg-transparent overflow-hidden flex items-center">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="editorial-tag mb-8">
              <span /> LIÊN HỆ
            </h2>
            <h3 className="text-4xl md:text-7xl font-bold mb-6 md:mb-10 leading-[1.1] md:leading-[0.9] tracking-tighter">
              HÀNH TRÌNH <br />
              <span className="inline-block px-2 py-1 text-transparent bg-clip-text bg-gradient-to-r from-studio-red to-studio-wine italic font-serif">BẮT ĐẦU</span> <br />TỪ ĐÂY
            </h3>
            <p className="text-neutral-500 text-sm mb-12 max-w-sm leading-relaxed border-l border-studio-black/20 pl-4">
              Hãy để chúng tôi giúp bạn kể câu chuyện của mình qua những góc nhìn điện ảnh nhất. Liên hệ ngay để nhận tư vấn giải pháp sáng tạo.
            </p>

            <div className="space-y-4 md:space-y-8">
              <div className="flex items-center gap-4 md:gap-6 group">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-studio-wine/30 rounded-xl md:rounded-2xl flex items-center justify-center border border-white/5 group-hover:bg-studio-red group-hover:border-studio-red/30 transition-all shrink-0">
                  <Phone size={18} className="text-studio-gold group-hover:text-white md:w-6 md:h-6" />
                </div>
                <div>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest mb-0.5">Điện thoại</p>
                  <p className="text-base md:text-xl font-bold">084 299 2493</p>
                </div>
              </div>
              <div 
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-4 md:gap-6 group cursor-pointer"
              >
                <div className="w-10 h-10 md:w-14 md:h-14 bg-studio-wine/30 rounded-xl md:rounded-2xl flex items-center justify-center border border-white/5 group-hover:bg-studio-red group-hover:border-studio-red/30 transition-all shrink-0">
                  <Mail size={18} className="text-studio-gold group-hover:text-white md:w-6 md:h-6" />
                </div>
                <div>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest mb-0.5">Email</p>
                  <p className="text-base md:text-xl font-bold group-hover:text-studio-red transition-colors">3covangocstudio@gmail.com</p>
                </div>
              </div>
              <a href="https://www.facebook.com/profile.php?id=61589512139159" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 md:gap-6 group cursor-pointer w-fit">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-studio-wine/30 rounded-xl md:rounded-2xl flex items-center justify-center border border-white/5 group-hover:bg-studio-red group-hover:border-studio-red/30 transition-all shrink-0">
                  <Facebook size={18} className="text-studio-gold group-hover:text-white md:w-6 md:h-6" />
                </div>
                <div>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest mb-0.5">Facebook</p>
                  <p className="text-base md:text-xl font-bold hover:text-studio-red transition-colors">3covangoc Studio</p>
                </div>
              </a>
              <a href="https://www.youtube.com/@3CoVaNgocStudio" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 md:gap-6 group cursor-pointer w-fit">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-studio-wine/30 rounded-xl md:rounded-2xl flex items-center justify-center border border-white/5 group-hover:bg-studio-red group-hover:border-studio-red/30 transition-all shrink-0">
                  <Youtube size={18} className="text-studio-gold group-hover:text-white md:w-6 md:h-6" />
                </div>
                <div>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest mb-0.5">YouTube</p>
                  <p className="text-base md:text-xl font-bold hover:text-studio-red transition-colors">3CoVaNgoc Studio</p>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="glass-card p-6 md:p-10 rounded-xl md:rounded-2xl border-white/5 relative"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-studio-red/10 blur-[100px] rounded-full" />
            
            <form id="contact-form" className="space-y-5 relative z-10" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-white/30 text-[10px] uppercase tracking-[0.2em] mb-2 px-1 font-bold">Họ tên</label>
                  <input 
                    name="name"
                    type="text" 
                    required
                    placeholder="Nguyễn Văn A" 
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3.5 text-sm outline-none focus:border-studio-red/50 transition-all placeholder:text-white/10"
                  />
                </div>
                <div>
                  <label className="block text-white/30 text-[10px] uppercase tracking-[0.2em] mb-2 px-1 font-bold">Email</label>
                  <input 
                    name="email"
                    type="email" 
                    required
                    placeholder="example@gmail.com" 
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3.5 text-sm outline-none focus:border-studio-red/50 transition-all placeholder:text-white/10"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white/30 text-[10px] uppercase tracking-[0.2em] mb-2 px-1 font-bold">Dịch vụ quan tâm</label>
                <div className="relative">
                  <select name="service" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3.5 text-sm outline-none focus:border-studio-red/50 transition-all appearance-none cursor-pointer text-white/60">
                    <option className="bg-studio-black">3D Animation</option>
                    <option className="bg-studio-black">Motion Graphics</option>
                    <option className="bg-studio-black">Branding Design</option>
                    <option className="bg-studio-black">Khác</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none opacity-30">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-white/30 text-[10px] uppercase tracking-[0.2em] mb-2 px-1 font-bold">Lời nhắn</label>
                <textarea 
                  name="message"
                  required
                  rows={4} 
                  placeholder="Tôi muốn thảo luận về dự án..." 
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3.5 text-sm outline-none focus:border-studio-red/50 transition-all placeholder:text-white/10 resize-none"
                />
              </div>
              <div className="group relative pt-2">
                <div className="absolute -inset-1 bg-studio-red opacity-10 blur group-hover:opacity-30 transition" />
                <motion.button 
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="relative w-full py-4 bg-studio-red text-white font-bold uppercase tracking-[0.3em] shadow-xl transition-all flex items-center justify-center gap-3 text-[10px]"
                >
                  Gửi Thông Tin <Send size={12} />
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
