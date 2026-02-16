'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ScrollReveal from './ScrollReveal';

const differentiators = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'Ship Fast, Ship Right',
    description:
      'I bias toward action. From idea to deployed feature, I move fast without cutting corners on code quality, accessibility, or performance.',
    color: 'blue',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L12 12.75 6.429 9.75m11.142 0l4.179 2.25-4.179 2.25m0 0L12 17.25l-5.571-3m11.142 0L21.75 12l-4.179 2.25M12 22.5V17.25" />
      </svg>
    ),
    title: 'Full-Stack Ownership',
    description:
      'I work across the entire stack — frontend, backend, infrastructure, and deployment. One engineer, end-to-end delivery, no handoff friction.',
    color: 'purple',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    title: 'Production Mindset',
    description:
      'Every line of code I write is meant for real users. I think in terms of reliability, edge cases, monitoring, and what happens at 2 AM.',
    color: 'pink',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    title: 'Clear Communication',
    description:
      'I write clear PRs, document decisions, and translate technical complexity into language stakeholders understand. No black boxes.',
    color: 'emerald',
  },
];

const colorMap: Record<string, { icon: string; border: string; glow: string }> = {
  blue: {
    icon: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    border: 'hover:border-blue-500/30',
    glow: 'from-blue-500/10',
  },
  purple: {
    icon: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    border: 'hover:border-purple-500/30',
    glow: 'from-purple-500/10',
  },
  pink: {
    icon: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
    border: 'hover:border-pink-500/30',
    glow: 'from-pink-500/10',
  },
  emerald: {
    icon: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    border: 'hover:border-emerald-500/30',
    glow: 'from-emerald-500/10',
  },
};

export default function ValueSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="value" className="relative bg-black py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.04),transparent_60%)]" />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto">
        <ScrollReveal direction="up" className="mb-12 text-center">
          <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-full text-xs font-medium text-emerald-400 mb-6">
            Why Work With Me
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-white">What I bring </span>
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">to your team</span>
          </h2>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
            Beyond technical skills — the engineering habits and mindset that make a real difference.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-6">
          {differentiators.map((item, index) => {
            const colors = colorMap[item.color];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                className={`group relative bg-gray-900/50 border border-gray-800 rounded-2xl p-6 ${colors.border} hover:-translate-y-0.5 transition-all duration-300`}
              >
                <div className={`absolute -inset-px bg-gradient-to-r ${colors.glow} to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none`} />
                <div className="relative">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border ${colors.icon} mb-4`}>
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
