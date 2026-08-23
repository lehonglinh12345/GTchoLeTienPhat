import { useState, useEffect } from 'react';
import { Trash2, User as UserIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface Comment {
  id: number;
  content: string;
  created_at: string;
  user_name: string;
  user_avatar: string;
  project_id: string;
}

export default function AdminComments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('http://localhost:5000/api/admin/comments', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (error) {
      console.error('Lỗi lấy danh sách bình luận', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa bình luận này?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`http://localhost:5000/api/admin/comments/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setComments(comments.filter(c => c.id !== id));
      } else {
        alert('Có lỗi xảy ra khi xóa bình luận.');
      }
    } catch (error) {
      console.error('Lỗi xóa bình luận', error);
    }
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Quản lý bình luận</h1>
        <p className="text-neutral-400">Kiểm duyệt và quản lý bình luận trên các dự án.</p>
      </div>

      <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="p-4 text-xs font-bold text-neutral-500 uppercase tracking-widest bg-white/[0.02]">Tác giả</th>
                <th className="p-4 text-xs font-bold text-neutral-500 uppercase tracking-widest bg-white/[0.02]">Nội dung</th>
                <th className="p-4 text-xs font-bold text-neutral-500 uppercase tracking-widest bg-white/[0.02]">Dự án</th>
                <th className="p-4 text-xs font-bold text-neutral-500 uppercase tracking-widest bg-white/[0.02]">Ngày tạo</th>
                <th className="p-4 text-xs font-bold text-neutral-500 uppercase tracking-widest bg-white/[0.02] text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => (
                <motion.tr 
                  key={comment.id} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3 w-max">
                      <div className="w-8 h-8 rounded-full bg-white/10 overflow-hidden flex items-center justify-center shrink-0">
                        {comment.user_avatar ? (
                          <img src={comment.user_avatar} alt={comment.user_name} className="w-full h-full object-cover" />
                        ) : (
                          <UserIcon size={16} className="text-white/50" />
                        )}
                      </div>
                      <span className="font-medium text-white text-sm">{comment.user_name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-neutral-300 max-w-md truncate" title={comment.content}>
                      {comment.content}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-neutral-400">{comment.project_id}</td>
                  <td className="p-4 text-sm text-neutral-400 whitespace-nowrap">
                    {new Date(comment.created_at).toLocaleDateString('vi-VN', {
                      year: 'numeric', month: 'short', day: 'numeric'
                    })}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="p-2 text-neutral-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Xóa bình luận"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {comments.length === 0 && (
            <div className="text-center text-neutral-500 py-10">Không có bình luận nào.</div>
          )}
        </div>
      </div>
    </div>
  );
}
