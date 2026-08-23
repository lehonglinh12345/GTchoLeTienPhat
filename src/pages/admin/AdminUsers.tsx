import { useState, useEffect } from 'react';
import { Trash2, User as UserIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  created_at: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('http://localhost:5000/api/admin/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Lỗi lấy danh sách user', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa người dùng này? Tất cả bình luận của họ cũng sẽ bị xóa.')) return;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setUsers(users.filter(u => u.id !== id));
      } else {
        alert('Có lỗi xảy ra khi xóa người dùng.');
      }
    } catch (error) {
      console.error('Lỗi xóa user', error);
    }
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Quản lý người dùng</h1>
        <p className="text-neutral-400">Xem và quản lý tất cả tài khoản thành viên.</p>
      </div>

      <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="p-4 text-xs font-bold text-neutral-500 uppercase tracking-widest bg-white/[0.02]">Người dùng</th>
                <th className="p-4 text-xs font-bold text-neutral-500 uppercase tracking-widest bg-white/[0.02]">Email</th>
                <th className="p-4 text-xs font-bold text-neutral-500 uppercase tracking-widest bg-white/[0.02]">Ngày tham gia</th>
                <th className="p-4 text-xs font-bold text-neutral-500 uppercase tracking-widest bg-white/[0.02] text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <motion.tr 
                  key={user.id} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden flex items-center justify-center shrink-0">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                          <UserIcon size={20} className="text-white/50" />
                        )}
                      </div>
                      <span className="font-medium text-white">{user.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-neutral-400">{user.email}</td>
                  <td className="p-4 text-sm text-neutral-400">
                    {new Date(user.created_at).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="p-2 text-neutral-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Xóa người dùng"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <div className="text-center text-neutral-500 py-10">Không có người dùng nào.</div>
          )}
        </div>
      </div>
    </div>
  );
}
