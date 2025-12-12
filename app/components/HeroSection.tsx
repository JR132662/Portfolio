'use client';

import { useEffect, useRef } from 'react';
import { IconCloud } from '@/components/ui/icon-cloud';
import { RainbowButton } from '@/components/ui/rainbow-button';
import { motion, useInView } from 'framer-motion';

export default function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const cursorGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.left = `${e.clientX}px`;
        cursorGlowRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
      {/* Animated Background Mesh Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(236,72,153,0.1),transparent_50%)]"></div>
      </div>

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay">
        <svg width="100%" height="100%">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* Cursor Glow Effect */}
      <div
        ref={cursorGlowRef}
        className="pointer-events-none fixed w-96 h-96 -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-blue-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl z-10"
        style={{ willChange: 'transform' }}
      />

      {/* Floating Particles */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full blur-sm"
      />
      <motion.div
        animate={{
          y: [0, -40, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          delay: 1,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 right-1/4 w-3 h-3 bg-purple-400 rounded-full blur-sm"
      />
      <motion.div
        animate={{
          y: [0, -25, 0],
          opacity: [0.25, 0.55, 0.25],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          delay: 2,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-pink-400 rounded-full blur-sm"
      />

      <div ref={ref} className="relative z-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div className="space-y-8 text-center lg:text-left">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm justify-center lg:justify-start w-full lg:w-auto !w-[250px] lg:!w-auto !mt-[20px] lg:!mt-0"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
            ></motion.div>
            <span className="text-blue-400 text-sm font-medium">AVAILABLE FOR PROJECTS</span>
          </motion.div>

          {/* Animated Gradient Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[52px] sm:text-5xl lg:text-7xl font-bold leading-tight mb-5"
          >
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              Building calm
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] [animation-delay:0.5s]">
              interfaces for
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] [animation-delay:1s]">
              chaotic systems.
            </span>
          </motion.h1>

          {/* Description with glow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-gray-400 text-base sm:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed !mb-[20px]"
          >
            React-focused full stack dev turning kiosks, edge AI, and dashboards into production-ready products.
          </motion.p>

          {/* Enhanced Buttons */}
          <RainbowButton 
            asChild 
            className="text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-6 h-auto rounded-xl w-full sm:w-auto max-w-[280px] mx-auto lg:mx-0 lg:!w-[250px]"
          >
            <a
              href="https://www.github.com/jr132662"
              className="flex items-center justify-center gap-3"
            >
              View my work
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </RainbowButton>
        </div>

        {/* Right Content - Enhanced Circular Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative flex items-center justify-center mt-12 lg:mt-0"
        >
          <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] lg:w-[400px] lg:h-[400px]">
            {/* Animated Glow */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
            />

            {/* Outer circles with animation */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-blue-500/30"
            ></motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-8 rounded-full border border-purple-500/20"
            ></motion.div>
            <div className="absolute inset-16 rounded-full border border-pink-500/10"></div>

            {/* Center Icon Cloud */}
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
