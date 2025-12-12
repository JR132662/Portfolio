'use client';

import { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import WorkSection from './components/WorkSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ProfileSection from './components/ProfileSection';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <main className={`transition-all duration-300 ${mobileMenuOpen ? 'blur-sm' : ''}`}>
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <SkillsSection />
        <ProjectsSection />
        <ProfileSection />
      </main>
    </div>
  );
}
