/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useSmoothScroll from './hooks/useSmoothScroll';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import { LanguageProvider } from './contexts/LanguageContext';

import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';

export default function App() {
  // Initialize smooth scrolling
  useSmoothScroll();

  return (
    <LanguageProvider>
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
        <CustomCursor />
        <ScrollToTop />
        
        {/* UI Layers */}
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>

        {/* Background Lighting Effects */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-studio-red/20 blur-[120px] rounded-full transform-gpu will-change-opacity opacity-80" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-studio-gold/10 blur-[120px] rounded-full transform-gpu will-change-opacity opacity-80" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-studio-wine/15 blur-[150px] rounded-full transform-gpu will-change-opacity opacity-80" />
        </div>
        </main>
      </BrowserRouter>
    </LanguageProvider>
  );
}