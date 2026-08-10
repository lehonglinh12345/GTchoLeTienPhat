import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import ProjectShowcase from '../components/ProjectShowcase';
import Team from '../components/Team';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div id="content-wrap">
      <Hero />
      <About />
      <Services />
      <ProjectShowcase />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
}
