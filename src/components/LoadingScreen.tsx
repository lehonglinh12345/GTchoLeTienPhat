import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[10001] bg-studio-black flex items-center justify-center flex-col"
        >
          {/* Background Background Image */}
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.15 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <img 
              src="/images/input_file_1.png" 
              alt="Loading Background" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-48 h-48 md:w-64 md:h-64 relative z-10"
          >
            <img 
              src="/images/input_file_0.png" 
              alt="3covangoc Studio Logo" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-studio-black via-transparent to-transparent"
              initial={{ height: "100%" }}
              animate={{ height: "0%" }}
              transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 overflow-hidden"
          >
            <p className="text-studio-gold tracking-[0.5em] text-sm font-medium uppercase">
              Sáng Tạo Là Sức Mạnh
            </p>
            <motion.div 
              className="h-px bg-studio-gold mt-2 mx-auto"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.8, duration: 1 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}