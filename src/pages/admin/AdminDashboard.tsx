import { useState, useEffect } from 'react';
import { Users, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, totalComments: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('http://localhost:5000/api/admin/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Lỗi lấy thống kê', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Tổng quan</h1>
        <p className="text-neutral-400">Chào mừng bạn trở lại trang quản trị.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 flex items-center gap-6"
        >
          <div className="w-16 h-16 rounded-full bg-studio-red/10 flex items-center justify-center text-studio-red shrink-0">
            <Users size={32} />
          </div>
          <div>
            <p className="text-sm text-neutral-400 uppercase tracking-widest font-bold mb-1">Tổng người dùng</p>
            <h2 className="text-4xl font-black text-white">{stats.totalUsers}</h2>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 flex items-center gap-6"
        >
          <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
            <MessageSquare size={32} />
          </div>
          <div>
            <p className="text-sm text-neutral-400 uppercase tracking-widest font-bold mb-1">Tổng bình luận</p>
            <h2 className="text-4xl font-black text-white">{stats.totalComments}</h2>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
