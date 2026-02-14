'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const IconCloud = dynamic(
  () => import('@/components/ui/icon-cloud').then((m) => m.IconCloud),
  {
    ssr: false,
    loading: () => (
      <div className="w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] lg:w-[400px] lg:h-[400px] rounded-full border border-white/10 bg-white/5" />
    ),
  }
);

import { RainbowButton } from '@/components/ui/rainbow-button';
import { motion, useInView } from 'framer-motion';

export default function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (cursorGlowRef.current) {
        const rect = section.getBoundingClientRect();
        cursorGlowRef.current.style.left = `${e.clientX - rect.left}px`;
        cursorGlowRef.current.style.top = `${e.clientY - rect.top}px`;
      }
    };

    section.addEventListener('mousemove', handleMouseMove);
    return () => section.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(236,72,153,0.08),transparent_50%)]" />
      </div>

      {/* Cursor Glow — scoped to hero section */}
      <div
        ref={cursorGlowRef}
        className="pointer-events-none absolute w-80 h-80 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(59,130,246,0.15),rgba(139,92,246,0.08),transparent_70%)] rounded-full blur-3xl z-10 opacity-0 hover:opacity-100 transition-opacity"
        style={{ willChange: 'left, top' }}
      />

      {/* Floating particles */}
      <motion.div
        animate={{ y: [0, -30, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full blur-sm"
      />
      <motion.div
        animate={{ y: [0, -40, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1, ease: "easeInOut" }}
        className="absolute top-1/3 right-1/4 w-3 h-3 bg-purple-400 rounded-full blur-sm"
      />

      <div ref={ref} className="relative z-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Content */}
        <div className="space-y-6 text-center lg:text-left">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
            />
            <span className="text-emerald-400 text-sm font-medium tracking-wide">Available for Projects</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight"
          >
            {/* Keep a clean, fully-spaced phrase for SEO/screen readers */}
            <span className="sr-only">Building calm interfaces for chaotic systems.</span>

            {/* Visual layout (aria-hidden so it doesn't read as disjointed fragments) */}
            <span aria-hidden className="block text-white">Building calm</span>
            <span aria-hidden className="block text-white">interfaces for</span>
            <span
              aria-hidden
              className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              chaotic systems.
            </span>
          </motion.h1>

          {/* Positioning */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            I build <span className="text-white font-semibold">high-performance React & Next.js</span> products —
            from enterprise kiosks to edge-AI analytics — with a focus on <span className="text-white font-semibold">clarity, speed, and conversion</span>.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.92 }}
            className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto lg:mx-0"
          >
            Based in Miami • Available for full-time, contract, or consulting
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2"
          >
            <RainbowButton
              asChild
              className="text-base px-8 py-5 h-auto rounded-xl"
            >
              <a href="#projects" className="flex items-center justify-center gap-3">
                My projects
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </RainbowButton>

            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-5 text-base font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300"
            >
              Get in touch
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Right Content — Icon Cloud */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative flex items-center justify-center mt-8 lg:mt-0"
        >
          <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] lg:w-[400px] lg:h-[400px]">
            {/* Glow */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
            />

            {/* Rotating borders */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-blue-500/20"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-8 rounded-full border border-purple-500/15"
            />

            {/* Icon Cloud */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <IconCloud
                images={[
                  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
                  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
                  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
                  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
                  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
                  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
                  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
                  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
                  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
                  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
                  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
                  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
                  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
                  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
                ]}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
