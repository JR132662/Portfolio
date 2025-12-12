'use client';

import { motion } from 'framer-motion';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import { useState } from 'react';

export default function AboutSection() {
  const [currentCard, setCurrentCard] = useState(0);

  const cards = [
    {
      title: 'Frontend Development',
      description: 'React, Next.js, TypeScript, and modern CSS frameworks. Building responsive, accessible interfaces.',
      image: '/images/dashboard.png',
      alt: 'Dashboard Interface',
    },
    {
      title: 'Backend & APIs',
      description: 'Node.js, Python, PostgreSQL, and MongoDB. RESTful APIs and real-time data processing.',
      image: '/images/supabase.png',
      alt: 'Database Schema',
    },
    {
      title: 'UI/UX Design',
      description: 'Figma, design systems, and user-centered interfaces. From concept to polished product.',
      image: '/images/UIUX.png',
      alt: 'UI/UX Design',
    },
  ];

  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black py-32 px-6 lg:px-12">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative max-w-6xl mx-auto w-full px-4 lg:px-0">
        <div className="grid !p-1.5 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-block mb-6">
              <span 
                className="px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full text-sm font-medium text-blue-400"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
              >
                About Me
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold mb-12 leading-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Full-Stack Developer & UI/UX Designer
            </h2>

            <p className="text-lg text-gray-400 leading-relaxed mb-6">
              I specialize in building production-ready applications with React, Next.js, and TypeScript. From IoT kiosks to enterprise dashboards, I transform complex requirements into intuitive, scalable solutions.
            </p>

            <p className="text-lg text-gray-400 leading-relaxed mb-20">
              With expertise spanning frontend development, Python automation, and database optimization, I bridge the gap between technical complexity and user-friendly design. Currently advancing AI-powered systems and real-time data processing at scale.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 !mt-12">
              {[
                { number: '30+', label: 'Projects' },
                { number: '4+', label: 'Years' },
                { number: '10+', label: 'Technologies' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Carousel */}
          <div className="lg:hidden relative">
            <div className="relative overflow-hidden">
              <motion.div
                animate={{ x: `-${currentCard * 100}%` }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="flex"
              >
                {cards.map((card, index) => (
                  <div key={index} className="min-w-full px-4">
                    <BackgroundGradient className="rounded-[22px] p-6 bg-zinc-900">
                      <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-zinc-800">
                        <img 
                          src={card.image} 
                          alt={card.alt} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {card.description}
                      </p>
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
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentCard === index ? 'bg-blue-400 w-8' : 'bg-gray-600'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Swipe hint */}
            <div className="text-center mt-4 text-xs text-gray-500">
              Swipe or tap dots to navigate
            </div>
          </div>

          {/* Right Content - Background Gradient Cards (Desktop) */}
          <div className="relative h-[600px] hidden lg:block">
            {/* Card 1 - Frontend Development */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 2, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute top-0 left-0 w-75"
            >
              <BackgroundGradient className="rounded-[20px] p-8 bg-zinc-900">
                <div className="relative w-full h-45 mb-4 rounded-xl overflow-hidden bg-zinc-800">
                  <img 
                    src={cards[0].image} 
                    alt={cards[0].alt} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{cards[0].title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed p-2.5">
                  {cards[0].description}
                </p>
              </BackgroundGradient>
            </motion.div>

            {/* Card 2 - Backend & APIs */}
            <motion.div
              animate={{
                y: [0, 20, 0],
                rotate: [0, -2, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
              className="absolute top-32 right-0 w-72"
            >
              <BackgroundGradient className="rounded-[22px] p-6 bg-zinc-900">
                <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden bg-zinc-800">
                  <img 
                    src={cards[1].image} 
                    alt={cards[1].alt} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{cards[1].title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {cards[1].description}
                </p>
              </BackgroundGradient>
            </motion.div>

            {/* Card 3 - UI/UX Design */}
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 1, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2,
              }}
              className="absolute bottom-0 left-12 w-72"
            >
              <BackgroundGradient className="rounded-[22px] p-6 bg-zinc-900">
                <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden bg-zinc-800">
                  <img 
                    src={cards[2].image} 
                    alt={cards[2].alt} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{cards[2].title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {cards[2].description}
                </p>
              </BackgroundGradient>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-white/5 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
