'use client';

import { motion } from 'framer-motion';

const row1 = [
  'React',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'Python',
  'PostgreSQL',
  'MongoDB',
  'Supabase',
  'Docker',
  'Nginx',
  'Tailwind CSS',
];

const row2 = [
  'Framer Motion',
  'GSAP',
  'REST APIs',
  'Git',
  'Edge AI',
  'TensorRT',
  'DeepStream',
  'Computer Vision',
  'IIS',
  'HTML5',
  'CSS3',
  'Figma',
];

function MarqueeRow({
  items,
  reverse = false,
  dotColor,
  duration = 30,
}: {
  items: string[];
  reverse?: boolean;
  dotColor: string;
  duration?: number;
}) {
  // Duplicate the items so we have a seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="relative flex overflow-hidden">
      <motion.div
        className="flex shrink-0"
        animate={{ x: reverse ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration,
            ease: 'linear',
          },
        }}
      >
        {doubled.map((tech, i) => (
          <span
            key={i}
            className="flex items-center gap-3 px-5 sm:px-7 text-sm font-medium text-white/25 whitespace-nowrap select-none"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
            {tech}
          </span>
        ))}
      </motion.div>
      <motion.div
        className="flex shrink-0"
        animate={{ x: reverse ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration,
            ease: 'linear',
          },
        }}
      >
        {doubled.map((tech, i) => (
          <span
            key={`dup-${i}`}
            className="flex items-center gap-3 px-5 sm:px-7 text-sm font-medium text-white/25 whitespace-nowrap select-none"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
            {tech}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <section
      aria-label="Technologies"
      className="relative bg-black py-5 overflow-hidden border-y border-white/[0.04]"
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <div className="space-y-3">
        <MarqueeRow items={row1} dotColor="bg-blue-500/50" duration={30} />
        <MarqueeRow items={row2} reverse dotColor="bg-purple-500/50" duration={35} />
      </div>
    </section>
  );
}
