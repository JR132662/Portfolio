'use client';

import { motion, useInView } from 'framer-motion';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import { useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import AnimatedCounter from './AnimatedCounter';
import ScrollReveal from './ScrollReveal';

const cards = [
  {
    title: 'Frontend Architecture',
    description:
      'React, Next.js, TypeScript — component-driven UIs with design systems, state management, and performance-first patterns that scale across teams.',
    image: '/images/optimized/dashboard.webp',
    alt: 'Dashboard interface showing data visualization and analytics',
  },
  {
    title: 'Backend & Infrastructure',
    description:
      'Node.js, Python, PostgreSQL, Supabase, Docker. RESTful APIs, real-time pipelines, and edge computing on NVIDIA Jetson hardware.',
    image: '/images/optimized/Supabase.webp',
    alt: 'Database schema and API architecture diagram',
  },
  {
    title: 'Product & Design',
    description:
      'Figma to production. Conversion-optimized layouts, accessibility-first design, and data-driven UX decisions that improve business outcomes.',
    image: '/images/optimized/UIUX.webp',
    alt: 'UI/UX design mockup with component library',
  },
];

const stats = [
  { number: '4+', label: 'Years Experience' },
  { number: '30+', label: 'Projects Shipped' },
  { number: '80k+', label: 'LOC Migrated' },
  { number: '100s', label: 'Kiosks Deployed' },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentCard, setCurrentCard] = useState(0);
  const touchStartX = useRef(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX.current - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0 && currentCard < cards.length - 1) {
          setCurrentCard(currentCard + 1);
        } else if (diff < 0 && currentCard > 0) {
          setCurrentCard(currentCard - 1);
        }
      }
    },
    [currentCard]
  );

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center bg-black py-20 sm:py-28 overflow-x-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_60%,transparent_110%)]" />

      <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Badge */}
        <ScrollReveal direction="up" delay={0}>
          <span
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full text-xs font-medium text-blue-400 mb-8"
          >
            About Me
          </span>
        </ScrollReveal>

        {/* Title — centered */}
        <ScrollReveal direction="up" delay={0.1} distance={40}>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Full-Stack Engineer</span>
            <br />
            <span className="text-gray-400">who </span>
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">ships production code</span>
          </h2>
        </ScrollReveal>

        {/* Paragraphs — centered, constrained width */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 text-base sm:text-lg leading-relaxed mb-4 max-w-2xl mx-auto"
        >
          I turn ambiguous requirements into reliable, maintainable software. From modernizing an <span className="text-white font-medium">80,000+ line legacy kiosk system</span> to building <span className="text-white font-medium">real-time AI analytics platforms</span>, I work across the entire stack with a bias toward shipping.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-gray-400 text-base sm:text-lg leading-relaxed mb-12 max-w-2xl mx-auto"
        >
          My sweet spot: <span className="text-blue-400 font-medium">React/Next.js frontends</span>, <span className="text-purple-400 font-medium">Node.js/Python backends</span>, and connecting them to complex hardware, databases, and third-party systems under real-world constraints.
        </motion.p>

        {/* Stats — centered row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-wrap justify-center gap-10 sm:gap-16 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center group/stat">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1 group-hover/stat:scale-105 transition-transform duration-300">
                <AnimatedCounter value={stat.number} duration={2 + index * 0.3} />
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Cards — mobile: carousel */}
        <div
          className="lg:hidden relative w-full max-w-sm mx-auto"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative overflow-hidden">
            <motion.div
              animate={{ x: `-${currentCard * 100}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="flex"
            >
              {cards.map((card, index) => (
                <div key={index} className="min-w-full flex justify-center px-2">
                  <BackgroundGradient className="rounded-2xl p-5 bg-zinc-900 w-full">
                    <div className="relative w-full aspect-video mb-4 rounded-lg overflow-hidden bg-zinc-800">
                      <Image
                        src={card.image}
                        alt={card.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 90vw, 400px"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 text-left">{card.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed text-left">{card.description}</p>
                  </BackgroundGradient>
                </div>
              ))}
            </motion.div>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCard(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentCard === index ? 'bg-blue-400 w-8' : 'bg-gray-600 w-2'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Cards — desktop: centered row of 3 */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="flex justify-center"
            >
              <BackgroundGradient className="rounded-2xl p-6 bg-zinc-900 w-full max-w-sm">
                <div className="relative w-full aspect-video mb-4 rounded-lg overflow-hidden bg-zinc-800">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 320px"
                  />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{card.description}</p>
              </BackgroundGradient>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
