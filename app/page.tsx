import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import WorkSection from './components/WorkSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ProfileSection from './components/ProfileSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <SkillsSection />
        <ProjectsSection />
        <ProfileSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
