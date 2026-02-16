import dynamic from 'next/dynamic';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import WorkSection from './components/WorkSection';
import SkillsSection from './components/SkillsSection';
import ValueSection from './components/ValueSection';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';

const ProfileSection = dynamic(() => import('./components/ProfileSection'), { ssr: true });
const ContactSection = dynamic(() => import('./components/ContactSection'), { ssr: true });

export default function Home() {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <ScrollProgress />
      <Header />
      <main id="main-content">
        <HeroSection />
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
