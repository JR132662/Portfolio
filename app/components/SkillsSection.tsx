'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const skillCategories = [
  {
    label: 'Frontend',
    color: 'blue',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    label: 'Backend & Data',
    color: 'purple',
    skills: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Supabase', 'REST APIs', 'MQTT'],
  },
  {
    label: 'AI & Edge Computing',
    color: 'pink',
    skills: ['Computer Vision (YOLO)', 'DeepStream', 'TensorRT', 'NVIDIA Jetson', 'OpenCV', 'Edge Deployment'],
  },
  {
    label: 'DevOps & Tools',
    color: 'emerald',
    skills: ['Git', 'Docker', 'Nginx', 'Linux', 'CI/CD', 'Figma', 'Vercel'],
  },
];

const colorMap: Record<string, { badge: string; glow: string }> = {
  blue: { badge: 'text-blue-400 border-blue-500/20 bg-blue-500/10', glow: 'from-blue-500' },
  purple: { badge: 'text-purple-400 border-purple-500/20 bg-purple-500/10', glow: 'from-purple-500' },
  pink: { badge: 'text-pink-400 border-pink-500/20 bg-pink-500/10', glow: 'from-pink-500' },
  emerald: { badge: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10', glow: 'from-emerald-500' },
};

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="relative bg-black py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03),transparent_60%)]" />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full text-xs font-medium text-purple-400 mb-6">
            Technical Skills
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            <span className="text-white">Skills &amp; </span>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Technologies</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {skillCategories.map((category, catIndex) => {
            const colors = colorMap[category.color];
            return (
              <motion.div
                key={catIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + catIndex * 0.1 }}
                className="group/card bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-purple-500/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border mb-4 ${colors.badge}`}>
                  {category.label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.2 + catIndex * 0.1 + index * 0.03 }}
                      className="group relative"
                    >
                      <div className={`absolute -inset-0.5 bg-gradient-to-r ${colors.glow} to-transparent rounded-lg opacity-0 group-hover:opacity-60 blur transition duration-300`} />
                      <div className="relative px-3 py-1.5 bg-gray-800/80 border border-gray-700/50 rounded-lg text-sm text-gray-300 font-medium hover:text-white hover:scale-105 transition-all duration-200">
                        {skill}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
