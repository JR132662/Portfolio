'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skills = [
    "React + TypeScript",
    "Node.js",
    "HTML",
    "CSS",
    "Python",
    "Supabase & SQL",
    "JavaScript",
    "Computer Vision (YOLO models, DeepStream, TensorRT)",
    "Edge computing on Jetson hardware",
  ];

  return (
    <section id="skills" className="relative bg-black pt-20 pb-8 px-6 lg:px-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03),transparent_60%)]"></div>
      
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-3 mb-4 mx-auto">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Skills
            </h2>
          </div>
        </motion.div>

        <div className="flex flex-wrap gap-3 justify-center">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-100 blur transition duration-300"></div>
              <div className="relative px-5 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-gray-300 font-medium hover:text-white transition-colors">
                {skill}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
