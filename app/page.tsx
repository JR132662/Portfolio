import dynamic from 'next/dynamic';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import TechMarquee from './components/TechMarquee';
import AboutSection from './components/AboutSection';
import WorkSection from './components/WorkSection';
import SkillsSection from './components/SkillsSection';
import ValueSection from './components/ValueSection';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import FloatingCTA from './components/FloatingCTA';

const ProfileSection = dynamic(() => import('./components/ProfileSection'), { ssr: true });
const ContactSection = dynamic(() => import('./components/ContactSection'), { ssr: true });

export default function Home() {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <ScrollProgress />
      <Header />
      <FloatingCTA />
      <main id="main-content">
        <HeroSection />
        <TechMarquee />
        <AboutSection />
        <WorkSection />
        <SkillsSection />
        <ValueSection />
        <ProjectsSection />
        <ProfileSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
