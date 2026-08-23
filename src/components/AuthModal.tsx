import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export default function AuthModal() {
  const { isAuthModalOpen, setAuthModalOpen, login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Mock Admin Login
      if (isLogin && email === 'admin') {
        if (password === 'admin') {
          localStorage.setItem('adminToken', 'mock-admin-token');
          setAuthModalOpen(false);
          window.location.href = '/admin';
          return;
        } else {
          throw new Error('Đăng nhập Admin thất bại');
        }
      }

      // Mock standard login/register
      const mockUser = {
        id: Date.now(),
        email: email,
        name: name || email.split('@')[0],
        avatar: null
      };

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      login('mock-jwt-token', mockUser);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const decoded: any = jwtDecode(credentialResponse.credential);
      
      // Mock Google Login using token data directly
      const mockUser = {
        id: Date.now(),
        email: decoded.email,
        name: decoded.name,
        avatar: decoded.picture
      };

      login('mock-google-token', mockUser);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={() => setAuthModalOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#111] border border-white/10 rounded-2xl p-8 z-50 shadow-2xl"
          >
            <button
              onClick={() => setAuthModalOpen(false)}
              className="absolute right-4 top-4 text-white/50 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-black text-white mb-2">
              {isLogin ? 'Đăng nhập' : 'Tạo tài khoản'}
            </h2>
            <p className="text-neutral-400 text-sm mb-6">
              {isLogin ? 'Đăng nhập để tham gia bình luận' : 'Tham gia để tương tác với cộng đồng'}
            </p>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm rounded-lg p-3 mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-1.5">Tên hiển thị</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-studio-red transition-colors"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
              )}
              <div>
                <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-1.5">Tên đăng nhập (Email)</label>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-studio-red transition-colors"
                  placeholder="hello@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-1.5">Mật khẩu</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-studio-red transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-studio-red text-white font-bold uppercase tracking-widest text-xs py-4 rounded-lg hover:bg-white hover:text-black transition-colors mt-2"
              >
                {loading ? 'Đang xử lý...' : (isLogin ? 'Đăng nhập' : 'Đăng ký')}
              </button>
            </form>

            <div className="relative flex items-center py-6">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink-0 mx-4 text-white/30 text-xs font-medium">HOẶC</span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError('Google login failed')}
                theme="filled_black"
                shape="rectangular"
                size="large"
                text={isLogin ? 'signin_with' : 'signup_with'}
              />
            </div>

            <p className="text-center text-sm text-neutral-400 mt-6">
              {isLogin ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-white hover:text-studio-red font-bold transition-colors"
              >
                {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
              </button>
            </p>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
