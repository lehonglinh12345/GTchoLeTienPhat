/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useSmoothScroll from './hooks/useSmoothScroll';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import { LanguageProvider } from './contexts/LanguageContext';

const Home = lazy(() => import('./pages/Home'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Profile = lazy(() => import('./pages/Profile'));
import { AuthProvider } from './contexts/AuthContext';
import AuthModal from './components/AuthModal';
import LogoutModal from './components/LogoutModal';
import AdminLayout from './pages/admin/AdminLayout';
import { GoogleOAuthProvider } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '19758875372-03n1ffbt5eqmi1d401rks4efdgbfsh9c.apps.googleusercontent.com';

export default function App() {
  // Initialize smooth scrolling
  useSmoothScroll();

  return (
    <LanguageProvider>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <BrowserRouter>
            <main className="relative min-h-screen bg-studio-black selection:bg-studio-red selection:text-white">
              {/* Global Background Image */}
              <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <img
                  src="/images/input_file_1.png"
                  className="w-full h-full object-cover opacity-[0.15] brightness-[0.6]"
                  alt="Main Background"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-studio-black/20 via-transparent to-studio-black/60" />
              </div>

              {/* Visual Overlays */}
              <LoadingScreen />
              <ScrollToTop />

              {/* UI Layers */}
              <Navbar />

              <Suspense fallback={<LoadingScreen />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/project/:id" element={<ProjectDetail />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/admin/*" element={<AdminLayout />} />
                </Routes>
              </Suspense>
              <AuthModal />
              <LogoutModal />

              {/* Background Lighting Effects (Optimized for Performance) */}
              <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden hidden md:block">
                <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(255,0,0,0.1)_0%,rgba(0,0,0,0)_70%)] rounded-full transform-gpu will-change-opacity opacity-80" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(255,215,0,0.05)_0%,rgba(0,0,0,0)_70%)] rounded-full transform-gpu will-change-opacity opacity-80" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse,rgba(114,47,55,0.08)_0%,rgba(0,0,0,0)_70%)] rounded-full transform-gpu will-change-opacity opacity-80" />
              </div>
            </main>
          </BrowserRouter>
        </AuthProvider>
      </GoogleOAuthProvider>
    </LanguageProvider>
  );
}