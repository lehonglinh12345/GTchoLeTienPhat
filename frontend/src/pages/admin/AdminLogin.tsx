import { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('adminToken', data.token);
        onLoginSuccess();
      } else {
        setError(data.message || 'Đăng nhập thất bại.');
      }
    } catch (err) {
      setError('Lỗi kết nối máy chủ.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative z-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white tracking-tight mb-2">Quản Trị Hệ Thống</h1>
          <p className="text-neutral-500 text-sm">Vui lòng đăng nhập để truy cập Admin Dashboard</p>
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 bg-studio-red/10 border border-studio-red/20 rounded-xl text-studio-red text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest pl-1">Tên đăng nhập</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500">
                <User size={18} />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black border border-white/10 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-studio-red transition-colors"
                placeholder="Nhập tên đăng nhập..."
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest pl-1">Mật khẩu</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500">
                <Lock size={18} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-white/10 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-studio-red transition-colors"
                placeholder="Nhập mật khẩu..."
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 mt-4 bg-studio-red text-white text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-studio-red/20 disabled:opacity-50"
          >
            {loading ? 'Đang xác thực...' : 'Đăng nhập'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button onClick={() => navigate('/')} className="text-xs text-neutral-500 hover:text-white transition-colors">
            ← Quay về Trang Chủ
          </button>
        </div>
      </motion.div>
    </div>
  );
}
