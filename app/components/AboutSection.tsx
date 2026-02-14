'use client';

import { motion, useInView } from 'framer-motion';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import { useRef, useState, useCallback } from 'react';
import Image from 'next/image';

const cards = [
  {
    title: 'Frontend Development',
    description:
      'React, Next.js, TypeScript, and modern CSS frameworks. Building responsive, accessible interfaces that scale.',
    image: '/images/optimized/dashboard.webp',
    alt: 'Dashboard interface showing data visualization and analytics',
  },
  {
    title: 'Backend & APIs',
    description:
      'Node.js, Python, PostgreSQL, and MongoDB. RESTful APIs and real-time data processing pipelines.',
    image: '/images/optimized/Supabase.webp',
    alt: 'Database schema and API architecture diagram',
  },
  {
    title: 'UI/UX Design',
    description:
      'Figma, design systems, and user-centered interfaces. From concept to polished, production-ready product.',
    image: '/images/optimized/UIUX.webp',
    alt: 'UI/UX design mockup with component library',
  },
];

const stats = [
  { number: '30+', label: 'Projects' },
  { number: '4+', label: 'Years' },
  { number: '10+', label: 'Technologies' },
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
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full text-xs font-medium text-blue-400 mb-8"
        >
          About Me
        </motion.span>

        {/* Title — centered */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
        >
          <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Full-Stack Developer</span>
          <br />
          <span className="text-gray-400">&amp; </span>
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">UI/UX Engineer</span>
        </motion.h2>

        {/* Paragraphs — centered, constrained width */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 text-base sm:text-lg leading-relaxed mb-4 max-w-2xl mx-auto"
        >
          I specialize in building production-ready applications with React, Next.js, and TypeScript. From IoT kiosks to enterprise dashboards, I transform complex requirements into intuitive, scalable solutions.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-gray-400 text-base sm:text-lg leading-relaxed mb-12 max-w-2xl mx-auto"
        >
          With expertise spanning frontend development, Python automation, and database optimization, I bridge the gap between technical complexity and user-friendly design.
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
                {stat.number}
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
