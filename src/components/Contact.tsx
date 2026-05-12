import React, { memo } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, Facebook, MapPin, Send, Youtube } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Contact = memo(function Contact() {
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const service = formData.get('service');
    const message = formData.get('message');
    
    const mailtoUrl = `mailto:3covangocstudio@gmail.com?subject=Liên hệ từ ${encodeURIComponent(name as string)}&body=Họ tên: ${encodeURIComponent(name as string)}%0D%0AEmail: ${encodeURIComponent(email as string)}%0D%0ADịch vụ: ${encodeURIComponent(service as string)}%0D%0ALời nhắn: ${encodeURIComponent(message as string)}`;
    
    // Create a temporary link and click it - more reliable in mobile browsers
    const link = document.createElement('a');
    link.href = mailtoUrl;
    link.click();
  };

  return (
    <section id="contact" className="min-h-screen py-24 bg-transparent overflow-hidden flex items-center">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="will-change-transform"
          >
            <h2 className="editorial-tag mb-8">
              <span /> {t.contact.tag}
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-7xl font-bold mb-6 md:mb-10 leading-[1.1] md:leading-[0.9] tracking-tighter">
              {t.contact.title.includes('BẮT ĐẦU') ? (
                <>
                  {t.contact.title.split('BẮT ĐẦU')[0]} <br />
                  <span className="inline-block px-2 py-1 text-transparent bg-clip-text bg-gradient-to-r from-studio-red to-studio-wine italic font-serif">BẮT ĐẦU</span> <br />
                  {t.contact.title.split('BẮT ĐẦU')[1]}
                </>
              ) : t.contact.title.includes('BEGINS') ? (
                <>
                  {t.contact.title.split('BEGINS')[0]} <br />
                  <span className="inline-block px-2 py-1 text-transparent bg-clip-text bg-gradient-to-r from-studio-red to-studio-wine italic font-serif">BEGINS</span> <br />
                  {t.contact.title.split('BEGINS')[1]}
                </>
              ) : t.contact.title}
            </h3>
            <p className="text-neutral-500 text-sm mb-12 max-w-sm leading-relaxed border-l border-studio-black/20 pl-4">
              {t.contact.desc}
            </p>

            <div className="space-y-4 md:space-y-8">
              <a href="tel:0842992493" className="flex items-center gap-4 md:gap-6 group cursor-pointer w-fit">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-studio-wine/30 rounded-xl md:rounded-2xl flex items-center justify-center border border-white/5 group-hover:bg-studio-red group-hover:border-studio-red/30 transition-all shrink-0">
                  <Phone size={18} className="text-studio-gold group-hover:text-white md:w-6 md:h-6" />
                </div>
                <div>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest mb-0.5">{t.contact.phone}</p>
                  <p className="text-base md:text-xl font-bold hover:text-studio-red transition-colors">084 299 2493 (TRÍ BẢO)</p>
                </div>
              </a>
              <a 
                href="mailto:3covangocstudio@gmail.com"
                className="flex items-center gap-4 md:gap-6 group cursor-pointer w-fit"
              >
                <div className="w-10 h-10 md:w-14 md:h-14 bg-studio-wine/30 rounded-xl md:rounded-2xl flex items-center justify-center border border-white/5 group-hover:bg-studio-red group-hover:border-studio-red/30 transition-all shrink-0">
                  <Mail size={18} className="text-studio-gold group-hover:text-white md:w-6 md:h-6" />
                </div>
                <div>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest mb-0.5">{t.contact.email}</p>
                  <p className="text-base md:text-xl font-bold hover:text-studio-red transition-colors">3covangocstudio@gmail.com</p>
                </div>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61589512139159" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 md:gap-6 group cursor-pointer w-fit">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-studio-wine/30 rounded-xl md:rounded-2xl flex items-center justify-center border border-white/5 group-hover:bg-studio-red group-hover:border-studio-red/30 transition-all shrink-0">
                  <Facebook size={18} className="text-studio-gold group-hover:text-white md:w-6 md:h-6" />
                </div>
                <div>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest mb-0.5">{t.contact.facebook}</p>
                  <p className="text-base md:text-xl font-bold hover:text-studio-red transition-colors">3CoVaNgoc Studio</p>
                </div>
              </a>
              <a href="https://www.youtube.com/@3CoVaNgocStudio" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 md:gap-6 group cursor-pointer w-fit">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-studio-wine/30 rounded-xl md:rounded-2xl flex items-center justify-center border border-white/5 group-hover:bg-studio-red group-hover:border-studio-red/30 transition-all shrink-0">
                  <Youtube size={18} className="text-studio-gold group-hover:text-white md:w-6 md:h-6" />
                </div>
                <div>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest mb-0.5">{t.contact.youtube}</p>
                  <p className="text-base md:text-xl font-bold hover:text-studio-red transition-colors">3CoVaNgoc Studio</p>
                </div>
              </a>
              <a
                href="https://www.tiktok.com/@3covangoc.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 md:gap-6 group cursor-pointer w-fit"
              >
                <div className="w-10 h-10 md:w-14 md:h-14 bg-studio-wine/30 rounded-xl md:rounded-2xl flex items-center justify-center border border-white/5 group-hover:bg-studio-red group-hover:border-studio-red/30 transition-all shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-[18px] h-[18px] md:w-6 md:h-6 text-studio-gold group-hover:text-white"
                  >
                    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.187h-3.161v12.138a2.593 2.593 0 1 1-2.593-2.593c.214 0 .421.028.621.08V8.917a5.84 5.84 0 1 0 5.812 5.84V8.588a8.24 8.24 0 0 0 4.8 1.527V6.954c-.61 0-1.192-.094-1.709-.268z" />
                  </svg>
                </div>

                <div>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest mb-0.5">
                    {t.contact.tiktok}
                  </p>
                  <p className="text-base md:text-xl font-bold hover:text-studio-red transition-colors">
                    @3covangoc.studio
                  </p>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="glass-card p-6 md:p-10 rounded-xl md:rounded-2xl border-white/5 relative will-change-transform"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-studio-red/10 blur-[100px] rounded-full" />
            
            <form id="contact-form" className="space-y-5 relative z-10" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-white/30 text-[10px] uppercase tracking-[0.2em] mb-2 px-1 font-bold">{t.contact.form.name}</label>
                  <input 
                    name="name"
                    type="text" 
                    required
                    placeholder={t.contact.form.placeholderName} 
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3.5 text-sm outline-none focus:border-studio-red/50 transition-all placeholder:text-white/10"
                  />
                </div>
                <div>
                  <label className="block text-white/30 text-[10px] uppercase tracking-[0.2em] mb-2 px-1 font-bold">{t.contact.form.email}</label>
                  <input 
                    name="email"
                    type="email" 
                    required
                    placeholder={t.contact.form.placeholderEmail} 
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3.5 text-sm outline-none focus:border-studio-red/50 transition-all placeholder:text-white/10"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white/30 text-[10px] uppercase tracking-[0.2em] mb-2 px-1 font-bold">{t.contact.form.service}</label>
                <div className="relative">
                  <select name="service" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3.5 text-sm outline-none focus:border-studio-red/50 transition-all appearance-none cursor-pointer text-white/60">
                    <option className="bg-studio-black" value="3D Animation">{t.contact.form.options.animation}</option>
                    <option className="bg-studio-black" value="Motion Graphics">{t.contact.form.options.motion}</option>
                    <option className="bg-studio-black" value="Branding Design">{t.contact.form.options.branding}</option>
                    <option className="bg-studio-black" value="Khác">{t.contact.form.options.other}</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none opacity-30">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-white/30 text-[10px] uppercase tracking-[0.2em] mb-2 px-1 font-bold">{t.contact.form.message}</label>
                <textarea 
                  name="message"
                  required
                  rows={4} 
                  placeholder={t.contact.form.placeholderMessage} 
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3.5 text-sm outline-none focus:border-studio-red/50 transition-all placeholder:text-white/10 resize-none"
                />
              </div>
              <div className="group relative pt-2">
                <div className="absolute -inset-1 bg-studio-red opacity-10 blur group-hover:opacity-30 transition" />
                <motion.button 
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="relative w-full py-4 bg-studio-red text-white font-bold uppercase tracking-[0.3em] shadow-xl transition-all flex items-center justify-center gap-3 text-[10px] cursor-pointer"
                >
                  {t.contact.form.submit} <Send size={12} />
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default Contact;
