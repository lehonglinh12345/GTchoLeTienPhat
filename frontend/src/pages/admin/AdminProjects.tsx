import { useState, useEffect } from 'react';
import { Trash2, Edit2, Plus, Image as ImageIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  main_image: string;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Lỗi lấy danh sách dự án', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa dự án này? Tất cả bình luận liên quan cũng sẽ bị xóa.')) return;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setProjects(projects.filter(p => p.id !== id));
      } else {
        alert('Có lỗi xảy ra khi xóa dự án.');
      }
    } catch (error) {
      console.error('Lỗi xóa dự án', error);
    }
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <div>
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Quản lý dự án</h1>
          <p className="text-neutral-400">Xem, thêm, sửa hoặc xóa các dự án trên trang chủ.</p>
        </div>
        <button
          onClick={() => navigate('/admin/projects/new')}
          className="bg-studio-red hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition-colors"
        >
          <Plus size={18} /> Thêm dự án mới
        </button>
      </div>

      <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="p-4 text-xs font-bold text-neutral-500 uppercase tracking-widest bg-white/[0.02]">Dự án</th>
                <th className="p-4 text-xs font-bold text-neutral-500 uppercase tracking-widest bg-white/[0.02]">Thể loại</th>
                <th className="p-4 text-xs font-bold text-neutral-500 uppercase tracking-widest bg-white/[0.02]">Năm</th>
                <th className="p-4 text-xs font-bold text-neutral-500 uppercase tracking-widest bg-white/[0.02] text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <motion.tr 
                  key={project.id} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-white/10 overflow-hidden flex items-center justify-center shrink-0">
                        {project.main_image ? (
                          <img src={project.main_image} alt={project.title} className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon size={24} className="text-white/50" />
                        )}
                      </div>
                      <div>
                        <span className="font-bold text-white text-base block">{project.title}</span>
                        <span className="text-xs text-neutral-500 font-mono mt-1 block">ID: {project.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-neutral-400">{project.category}</td>
                  <td className="p-4 text-sm text-neutral-400">{project.year}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => navigate(`/admin/projects/edit/${project.id}`)}
                        className="p-2 text-neutral-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        title="Sửa dự án"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-2 text-neutral-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Xóa dự án"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {projects.length === 0 && (
            <div className="text-center text-neutral-500 py-10">Không có dự án nào.</div>
          )}
        </div>
      </div>
    </div>
  );
}
