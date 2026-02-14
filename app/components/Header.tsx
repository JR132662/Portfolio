'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { SITE } from '@/app/content/site';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Work', href: '#work' },
  { name: 'Projects', href: '#projects' },
  { name: 'Profile', href: '#profile' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.98]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['about', 'work', 'projects', 'profile', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <motion.header
        style={{ opacity: headerOpacity }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className={`relative backdrop-blur-xl rounded-2xl border transition-all duration-500 ${
              scrolled
                ? 'bg-white/10 border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(59,130,246,0.08),0_0_20px_rgba(139,92,246,0.06)]'
                : 'bg-white/5 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)]'
            }`}
            aria-label="Main navigation"
          >
            <div className="flex items-center justify-between h-14 px-5 lg:px-8">
              {/* Logo */}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-3 group"
                aria-label="Back to top"
              >
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl blur-lg opacity-0 group-hover:opacity-70 transition-all duration-500 scale-110 group-hover:scale-100" />
                  <div className="relative w-9 h-9 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center font-bold text-white text-sm shadow-lg ring-2 ring-white/0 group-hover:ring-white/20 ring-offset-2 ring-offset-transparent transition-all duration-300">
                    JR
                  </div>
                </div>
              </a>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-1 absolute left-1/2 transform -translate-x-1/2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    aria-current={activeSection === link.href.slice(1) ? 'page' : undefined}
                    className={`relative group px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg focus-visible:ring-2 focus-visible:ring-white/30 ${
                      activeSection === link.href.slice(1)
                        ? 'text-white'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <span className="relative z-10">{link.name}</span>
                    <div
                      className={`absolute inset-0 rounded-lg transition-opacity duration-300 ${
                        activeSection === link.href.slice(1)
                          ? 'bg-white/10 opacity-100'
                          : 'bg-white/5 opacity-0 group-hover:opacity-100'
                      }`}
                    />
                    <div
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ${
                        activeSection === link.href.slice(1)
                          ? 'w-3/4'
                          : 'w-0 group-hover:w-1/2'
                      }`}
                    />
                  </a>
                ))}
              </div>

              {/* Resume download (desktop) */}
              <a
                href={SITE.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                download="JonathanRodriguezResume.pdf"
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Resume
              </a>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden flex flex-col gap-1.5 p-2"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
              >
                <span className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="md:hidden border-t border-white/10 overflow-hidden"
                >
                  <div className="px-4 py-3 space-y-1">
                    {navLinks.map((link, index) => (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(link.href);
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-300 ${
                          activeSection === link.href.slice(1)
                            ? 'text-white bg-white/10'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {link.name}
                      </motion.a>
                    ))}
                    <a
                      href={SITE.resumePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      download="JonathanRodriguezResume.pdf"
                      className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-blue-400 hover:text-blue-300 rounded-lg transition-colors duration-300"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download Resume
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </div>
      </motion.header>

      {/* Backdrop overlay for mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
