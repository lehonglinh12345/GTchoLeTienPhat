import { lazy, Suspense } from 'react';
import Hero from '../components/Hero';

// Lazy load below-the-fold components to improve initial render time
const About = lazy(() => import('../components/About'));
const Services = lazy(() => import('../components/Services'));
const ProjectShowcase = lazy(() => import('../components/ProjectShowcase'));
const Team = lazy(() => import('../components/Team'));
const Contact = lazy(() => import('../components/Contact'));
const Footer = lazy(() => import('../components/Footer'));

export default function Home() {
  return (
    <div id="content-wrap">
      <Hero />
      <Suspense fallback={null}>
        <About />
        <Services />
        <ProjectShowcase />
        <Team />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  );
}
