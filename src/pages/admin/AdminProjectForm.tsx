import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

interface Episode {
  id: string;
  title: string;
  duration?: string;
  videoUrl?: string;
  thumbnail?: string;
  isPlaceholder?: boolean;
}

export default function AdminProjectForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    category: '',
    year: '',
    description: '',
    main_image: '',
    color: 'bg-studio-red',
    tags: [] as string[],
    episodes: [] as Episode[],
    gallery: [] as string[]
  });

  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (isEdit) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/projects/${id}`);
      if (res.ok) {
        const data = await res.json();
        setFormData({
          id: data.id,
          title: data.title,
          category: data.category,
          year: data.year,
          description: data.description,
          main_image: data.main_image,
          color: data.color || 'bg-studio-red',
          tags: typeof data.tags === 'string' ? JSON.parse(data.tags) : (data.tags || []),
          episodes: typeof data.episodes === 'string' ? JSON.parse(data.episodes) : (data.episodes || []),
          gallery: typeof data.gallery === 'string' ? JSON.parse(data.gallery) : (data.gallery || [])
        });
      } else {
        setError('Không tìm thấy dự án');
      }
    } catch (error) {
      setError('Lỗi lấy thông tin dự án');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
  };

  const handleAddEpisode = () => {
    setFormData({
      ...formData,
      episodes: [
        ...formData.episodes,
        { id: `ep-${Date.now()}`, title: 'Tập mới', videoUrl: '', duration: '', thumbnail: '', isPlaceholder: false }
      ]
    });
  };

  const handleEpisodeChange = (index: number, field: keyof Episode, value: any) => {
    const newEpisodes = [...formData.episodes];
    newEpisodes[index] = { ...newEpisodes[index], [field]: value };
    setFormData({ ...formData, episodes: newEpisodes });
  };

  const handleRemoveEpisode = (index: number) => {
    const newEpisodes = [...formData.episodes];
    newEpisodes.splice(index, 1);
    setFormData({ ...formData, episodes: newEpisodes });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const token = localStorage.getItem('adminToken');
      const url = isEdit ? `http://localhost:5000/api/projects/${id}` : 'http://localhost:5000/api/projects';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        navigate('/admin/projects');
      } else {
        setError(data.message || 'Lỗi lưu dự án');
      }
    } catch (error) {
      setError('Lỗi kết nối máy chủ');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <div className="max-w-4xl">
      <button 
        onClick={() => navigate('/admin/projects')}
        className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-6"
      >
        <ArrowLeft size={18} /> Quay lại danh sách
      </button>

      <h1 className="text-3xl font-bold text-white mb-8">
        {isEdit ? 'Chỉnh sửa dự án' : 'Thêm dự án mới'}
      </h1>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6">
          <h2 className="text-xl font-bold text-white border-b border-white/5 pb-4">Thông tin cơ bản</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest pl-1">Mã dự án (ID) *</label>
              <input
                type="text"
                required
                disabled={isEdit}
                value={formData.id}
                onChange={e => setFormData({ ...formData, id: e.target.value })}
                className="w-full bg-black border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-studio-red disabled:opacity-50"
                placeholder="VD: project-1"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest pl-1">Tên dự án *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-black border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-studio-red"
                placeholder="Nhập tên dự án..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest pl-1">Thể loại *</label>
              <input
                type="text"
                required
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-black border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-studio-red"
                placeholder="VD: Phim Ngắn / 3D Branding"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest pl-1">Năm sản xuất</label>
              <input
                type="text"
                value={formData.year}
                onChange={e => setFormData({ ...formData, year: e.target.value })}
                className="w-full bg-black border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-studio-red"
                placeholder="VD: 2026"
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest pl-1">Hình ảnh chính (URL) *</label>
              <input
                type="text"
                required
                value={formData.main_image}
                onChange={e => setFormData({ ...formData, main_image: e.target.value })}
                className="w-full bg-black border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-studio-red"
                placeholder="https://..."
              />
              {formData.main_image && (
                <div className="mt-2 w-32 h-32 rounded-lg overflow-hidden border border-white/10">
                  <img src={formData.main_image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest pl-1">Mô tả</label>
              <textarea
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-black border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-studio-red min-h-[120px]"
                placeholder="Mô tả về dự án..."
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest pl-1">Tags</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); } }}
                  className="flex-1 bg-black border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-studio-red"
                  placeholder="Thêm tag (nhấn Enter)"
                />
                <button type="button" onClick={handleAddTag} className="px-6 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">Thêm</button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-studio-red/20 text-studio-red rounded-full text-xs font-bold flex items-center gap-2">
                    {tag}
                    <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:text-white"><Trash2 size={12} /></button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Episodes */}
        <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h2 className="text-xl font-bold text-white">Tập phim (Episodes)</h2>
            <button type="button" onClick={handleAddEpisode} className="flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors">
              <Plus size={16} /> Thêm tập
            </button>
          </div>
          
          <div className="space-y-6">
            {formData.episodes.map((ep, i) => (
              <div key={i} className="p-4 bg-black border border-white/10 rounded-2xl relative group">
                <button 
                  type="button" 
                  onClick={() => handleRemoveEpisode(i)}
                  className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={14} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-neutral-500 uppercase tracking-widest block mb-1">Mã tập (ID)</label>
                    <input type="text" value={ep.id} onChange={e => handleEpisodeChange(i, 'id', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-500 uppercase tracking-widest block mb-1">Tên tập</label>
                    <input type="text" value={ep.title} onChange={e => handleEpisodeChange(i, 'title', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-500 uppercase tracking-widest block mb-1">URL Video (Youtube Embed)</label>
                    <input type="text" value={ep.videoUrl || ''} onChange={e => handleEpisodeChange(i, 'videoUrl', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-500 uppercase tracking-widest block mb-1">URL Thumbnail</label>
                    <input type="text" value={ep.thumbnail || ''} onChange={e => handleEpisodeChange(i, 'thumbnail', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm" />
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="checkbox" checked={ep.isPlaceholder || false} onChange={e => handleEpisodeChange(i, 'isPlaceholder', e.target.checked)} className="rounded border-white/20 bg-transparent text-studio-red focus:ring-0" />
                      Sắp ra mắt (Placeholder)
                    </label>
                  </div>
                </div>
              </div>
            ))}
            {formData.episodes.length === 0 && (
              <p className="text-neutral-500 text-sm text-center">Chưa có tập phim nào.</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-4 bg-studio-red text-white text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-studio-red/20 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Save size={18} /> {submitting ? 'Đang lưu...' : 'Lưu dự án'}
        </button>
      </form>
    </div>
  );
}
