import { motion, AnimatePresence } from 'motion/react';
import { LogOut, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LogoutModal() {
  const { isLogoutModalOpen, setLogoutModalOpen, logout } = useAuth();
  const navigate = useNavigate();

  const handleConfirm = () => {
    logout();
    setLogoutModalOpen(false);
    navigate('/');
  };

  return (
    <AnimatePresence>
      {isLogoutModalOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLogoutModalOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[99] cursor-pointer"
          />
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#0a0a0a] border border-white/10 rounded-3xl w-full max-w-sm p-8 shadow-2xl relative pointer-events-auto"
            >
              <button
                onClick={() => setLogoutModalOpen(false)}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-studio-red/10 flex items-center justify-center text-studio-red mb-6">
                  <LogOut size={32} />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                  Đăng xuất tài khoản?
                </h3>
                
                <p className="text-sm text-neutral-400 mb-8">
                  Bạn có chắc chắn muốn đăng xuất không?
                </p>

                <div className="flex gap-3 w-full">
                  <button
                    onClick={() => setLogoutModalOpen(false)}
                    className="flex-1 py-3 px-4 rounded-xl border border-white/10 text-white text-sm font-bold uppercase tracking-wider hover:bg-white/5 transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="flex-1 py-3 px-4 rounded-xl bg-studio-red text-white text-sm font-bold uppercase tracking-wider hover:bg-red-600 transition-colors shadow-lg shadow-studio-red/20"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
