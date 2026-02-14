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
      className="relative min-h-screen flex items-center justify-center bg-black py-20 sm:py-24 overflow-x-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />

      <div className="relative max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start lg:items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full text-xs font-medium text-blue-400 mb-6">
              About Me
            </span>

            <h2 className="mx-auto lg:mx-0 text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white">
              Full-Stack Developer
              <br />
              <span className="text-gray-400">&amp; UI/UX Engineer</span>
            </h2>

            <p className="text-gray-400 text-base lg:text-lg leading-relaxed mb-4">
              I specialize in building production-ready applications with React, Next.js, and TypeScript. From IoT kiosks to enterprise dashboards, I transform complex requirements into intuitive, scalable solutions.
            </p>

            <p className="text-gray-400 text-base lg:text-lg leading-relaxed mb-10">
              With expertise spanning frontend development, Python automation, and database optimization, I bridge the gap between technical complexity and user-friendly design.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { number: '30+', label: 'Projects' },
                { number: '4+', label: 'Years' },
                { number: '10+', label: 'Technologies' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1">
                    {stat.number}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mobile Carousel */}
          <div
            className="lg:hidden relative w-full mt-4"
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
                  <div key={index} className="min-w-full flex justify-center px-4">
                    <BackgroundGradient className="rounded-[22px] p-5 bg-zinc-900 max-w-sm w-full">
                      <div className="relative w-full aspect-video mb-4 rounded-lg overflow-hidden bg-zinc-800">
                        <Image
                          src={card.image}
                          alt={card.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 90vw, 400px"
                        />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed">{card.description}</p>
                    </BackgroundGradient>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Carousel Dots */}
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

          {/* Desktop Cards */}
          <div className="relative h-[600px] hidden lg:block">
            {cards.map((card, index) => {
              const positions = [
                { className: 'absolute top-0 left-0 w-72', y: [0, -20, 0], rotate: [0, 2, 0], delay: 0 },
                { className: 'absolute top-32 right-0 w-72', y: [0, 20, 0], rotate: [0, -2, 0], delay: 1 },
                { className: 'absolute bottom-0 left-12 w-72', y: [0, -15, 0], rotate: [0, 1, 0], delay: 2 },
              ];
              const pos = positions[index];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={
                    isInView
                      ? { opacity: 1, y: pos.y, rotate: pos.rotate }
                      : {}
                  }
                  transition={{
                    opacity: { duration: 0.6, delay: 0.3 + index * 0.2 },
                    y: { duration: 6 + index, repeat: Infinity, ease: 'easeInOut', delay: pos.delay },
                    rotate: { duration: 6 + index, repeat: Infinity, ease: 'easeInOut', delay: pos.delay },
                  }}
                  className={pos.className}
                >
                  <BackgroundGradient className="rounded-[22px] p-6 bg-zinc-900">
                    <div className="relative w-full aspect-video mb-4 rounded-lg overflow-hidden bg-zinc-800">
                      <Image
                        src={card.image}
                        alt={card.alt}
                        fill
                        className="object-cover"
                        sizes="288px"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{card.description}</p>
                  </BackgroundGradient>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
