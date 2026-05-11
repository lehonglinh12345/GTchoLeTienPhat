/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import useSmoothScroll from './hooks/useSmoothScroll';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import ProjectShowcase from './components/ProjectShowcase';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { LanguageProvider } from './contexts/LanguageContext';

export default function App() {
  // Initialize smooth scrolling
  useSmoothScroll();

  return (
    <LanguageProvider>
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
        <div className="noise-overlay" />
        <LoadingScreen />
        <CustomCursor />
        <ScrollToTop />
        
        {/* UI Layers */}
        <Navbar />
        
        <div id="content-wrap">
          <Hero />
          <About />
          <Services />
          <ProjectShowcase />
          <Team />
          <Contact />
          <Footer />
        </div>

        {/* Scrolling Visual Indicator */}
        <div className="fixed right-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 z-40">
          <div className="w-[2px] h-4 bg-studio-red"></div>
          <div className="w-[2px] h-2 bg-white/20"></div>
          <div className="w-[2px] h-2 bg-white/20"></div>
          <div className="w-[2px] h-2 bg-white/20"></div>
        </div>

        {/* Background Lighting Effects */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-studio-red/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-studio-gold/5 blur-[100px] rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-studio-red/5 blur-[150px] rounded-full" />
        </div>
      </main>
    </LanguageProvider>
  );
}