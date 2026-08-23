import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { Facebook } from 'lucide-react';

export default function Team() {
  const { t } = useLanguage();

  const teamImages = [
    {
      image: '/images/lekimtho.png',
      position: 'center',
      facebook: '',
    },
    {
      image: '/images/letienphat.png',
      position: 'top',
      facebook: 'https://www.facebook.com/tien.phat.le.181361',
    },
    {
      image: '/images/trichibao.png',
      position: 'top',
      facebook: 'https://www.facebook.com/TrinhChiBao2611',
    },
  ];

  return (
    <section id="team" className="min-h-screen py-24 bg-transparent flex items-center">
      <div className="container mx-auto px-6">
        <div className="mb-20 text-center flex flex-col items-center">
          <h2 className="editorial-tag mb-8">
            <span /> {t.team.tag}
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter uppercase">
            {t.team.title.includes('NHÀ BA CÔ') ? (
              <>
                {t.team.title.split('NHÀ BA CÔ')[0]} 
                <span className="inline-block px-2 py-1 text-transparent bg-clip-text bg-gradient-to-r from-studio-red to-studio-wine italic">NHÀ BA CÔ</span> 
                {t.team.title.split('NHÀ BA CÔ')[1]}
              </>
            ) : t.team.title}
          </h3>
          <p className="text-neutral-500 text-xs uppercase tracking-[0.4em]">{t.team.desc}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {t.team.members.map((member: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: index * 0.1, ease: [0.76, 0, 0.24, 1] }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-neutral-900/40 backdrop-blur-md p-3 rounded-xl border border-white/5 hover:border-studio-red/30 transition-all group duration-500"
            >
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-6">
                <img 
                  src={teamImages[index]?.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ objectPosition: teamImages[index]?.position }}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-studio-black via-transparent to-transparent opacity-60" />
              </div>
              <div className="text-center pb-4">
                <h3 className="text-xl font-bold mb-1 group-hover:text-studio-gold transition-colors">{member.name}</h3>
                <p className="text-white/40 text-sm uppercase tracking-widest">{member.role}</p>
                {teamImages[index]?.facebook && (
                  <a 
                    href={teamImages[index].facebook} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 mt-4 text-xs font-bold text-neutral-400 hover:text-[#1877F2] transition-colors"
                  >
                    <Facebook size={16} /> Facebook
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}