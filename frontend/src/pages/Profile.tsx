import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { Camera, Mail, User as UserIcon, Loader2, LogOut, Shield, ChevronRight } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, updateAvatar, logout, setLogoutModalOpen } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Vui lòng chọn một file ảnh hợp lệ (JPG, PNG).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Dung lượng ảnh không được vượt quá 5MB.');
      return;
    }

    setError('');
    setUploading(true);

    const formData = new FormData();
    formData.append('avatar', file);
    formData.append('userId', user.id.toString());

    try {
      const response = await fetch('http://localhost:5000/api/users/avatar', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Lỗi khi tải ảnh lên');
      }

      updateAvatar(data.avatar);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleLogout = () => {
    setLogoutModalOpen(true);
  };

  return (
    <div 
      className="min-h-screen bg-black text-white pb-20 px-4 md:px-8 relative z-10 flex justify-center items-start" 
      style={{ paddingTop: '180px' }}
    >
      
      {/* Settings / Dashboard Style Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-5xl bg-[#080808] border border-white/5 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
      >
        {/* Left Column - Profile Identity */}
        <div className="w-full md:w-1/3 p-8 md:p-10 border-b md:border-b-0 md:border-r border-white/5 bg-[#050505]/50 flex flex-col items-center text-center">
          <div className="relative mb-8 group">
            <div className="w-40 h-40 rounded-full overflow-hidden bg-black p-1 border border-white/10 shadow-xl group-hover:border-studio-red/50 transition-colors duration-500">
              <div className="w-full h-full rounded-full overflow-hidden bg-[#111]">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <UserIcon size={48} className="text-white/20" />
                  </div>
                )}
              </div>
            </div>
            
            {/* Camera Button directly ON the avatar */}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="absolute bottom-2 right-2 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-lg hover:bg-studio-red hover:text-white transition-all disabled:opacity-50 group"
              title="Đổi ảnh đại diện"
            >
              {uploading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Camera size={20} className="group-hover:scale-110 transition-transform" />
              )}
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs font-medium mb-4 px-4 py-2 bg-red-400/10 rounded-lg">{error}</p>
          )}

          <h2 className="text-2xl font-bold tracking-tight mb-2 text-white/90">{user.name}</h2>
          <p className="text-sm text-neutral-500 mb-8">Thành viên 3covangoc</p>

          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-white/40 hover:text-red-400 py-3 rounded-xl hover:bg-white/5 transition-all mt-auto"
          >
            <LogOut size={16} />
            Đăng xuất
          </button>
        </div>

        {/* Right Column - Details & Settings */}
        <div className="w-full md:w-2/3 p-8 md:p-12">
          <div className="mb-10">
            <h1 className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-1">Cài đặt tài khoản</h1>
            <p className="text-2xl font-light text-white/80">Thông tin cá nhân</p>
          </div>

          <div className="space-y-2">
            {/* Info Row 1 */}
            <div className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl hover:bg-white/5 transition-colors cursor-default border border-transparent hover:border-white/5">
              <div className="flex items-center gap-4 mb-2 sm:mb-0">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 group-hover:text-studio-red group-hover:bg-studio-red/10 transition-colors">
                  <UserIcon size={18} />
                </div>
                <div>
                  <p className="text-sm text-neutral-400">Họ và tên</p>
                  <p className="text-base font-medium text-white/90">{user.name}</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-white/20 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block" />
            </div>

            {/* Info Row 2 */}
            <div className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl hover:bg-white/5 transition-colors cursor-default border border-transparent hover:border-white/5">
              <div className="flex items-center gap-4 mb-2 sm:mb-0">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 group-hover:text-studio-red group-hover:bg-studio-red/10 transition-colors">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-sm text-neutral-400">Địa chỉ Email</p>
                  <p className="text-base font-medium text-white/90">{user.email}</p>
                </div>
              </div>
              <div className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-semibold rounded-full border border-green-500/20 sm:ml-auto">
                Đã xác thực
              </div>
            </div>



          </div>
          
        </div>
      </motion.div>
    </div>
  );
}
