'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';

export default function FloatingCTA() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    return scrollY.on('change', (v) => setShow(v > 500));
  }, [scrollY]);

  if (!isDesktop) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group flex items-center gap-2.5 px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-sm font-semibold text-white shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 active:scale-95 transition-all duration-300 ring-1 ring-white/10"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
            Hire me
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
