import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Users, MessageSquare, LayoutDashboard, LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import AdminUsers from './AdminUsers';
import AdminComments from './AdminComments';
import AdminProjects from './AdminProjects';
import AdminProjectForm from './AdminProjectForm';
import { Briefcase } from 'lucide-react';

export default function AdminLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    navigate('/admin');
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Đang tải...</div>;

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  const navItems = [
    { name: 'Tổng quan', path: '/admin', icon: LayoutDashboard },
    { name: 'Dự án', path: '/admin/projects', icon: Briefcase },
    { name: 'Người dùng', path: '/admin/users', icon: Users },
    { name: 'Bình luận', path: '/admin/comments', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-[#050505] flex text-white relative z-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a0a0a] border-r border-white/5 flex flex-col hidden md:flex shrink-0">
        <div className="p-6 border-b border-white/5">
          <Link to="/" className="text-xl font-black tracking-tighter hover:text-studio-red transition-colors">
            3COVANGOC
          </Link>
          <div className="text-[10px] uppercase tracking-widest text-studio-red mt-1 font-bold">Admin Panel</div>
        </div>

        <nav className="flex-1 py-6 flex flex-col gap-2 px-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300",
                  isActive
                    ? "bg-studio-red text-white shadow-lg shadow-studio-red/20"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-neutral-400 hover:text-red-400 hover:bg-white/5 transition-all"
          >
            <LogOut size={18} />
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/projects" element={<AdminProjects />} />
            <Route path="/projects/new" element={<AdminProjectForm />} />
            <Route path="/projects/edit/:id" element={<AdminProjectForm />} />
            <Route path="/users" element={<AdminUsers />} />
            <Route path="/comments" element={<AdminComments />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
