'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const projects = [
  {
    title: "Kiosk React Migration",
    subtitle: "Sonny's Enterprises",
    category: 'Enterprise',
    highlights: [
      'Large-scale migration of legacy kiosk system from jQuery → React serving thousands of locations.',
      'Modern component architecture with reusable elements and robust API integration patterns.',
      'Improved maintainability, scalability, and developer experience across the engineering team.',
    ],
    tech: ['React', 'TypeScript', 'REST APIs', 'IIS'],
    status: 'In Progress',
  },
  {
    title: 'SwiftServe AI Analytics',
    subtitle: 'Swift Computing',
    category: 'AI / Edge',
    highlights: [
      'Full real-time vision analytics system using edge AI + cloud dashboards for restaurant operations.',
      'KPI computation engine with multi-zone detection logic and scalable event pipelines.',
      'High-performance React dashboard delivering real-time metrics with live demo available.',
    ],
    tech: ['React', 'YOLO', 'DeepStream', 'Supabase', 'MQTT'],
    status: 'Live',
  },
  {
    title: 'Security Guard Training School',
    subtitle: 'Client Project',
    category: 'Web',
    highlights: [
      'Conversion-focused website for Florida security guard training with enrollment workflows.',
      'Integrated licensing requirements, course listings, and payment structure.',
      'Full site architecture and branding with multilingual content support.',
    ],
    tech: ['React', 'Next.js'],
  },
  {
    title: 'Gym Membership Platform',
    subtitle: 'Mobile + Web App',
    category: 'Mobile',
    highlights: [
      'Fitness membership platform with sign-up, payment processing, and trainer booking.',
      'Session management, alerts, and premium UI across mobile and web.',
      'Fully functional membership management ecosystem MVP.',
    ],
    tech: ['React Native', 'React', 'Stripe'],
  },
  {
    title: 'Ramirez Enriquez Law Firm',
    subtitle: 'Client Project',
    category: 'Web',
    highlights: [
      'Professional, conversion-optimized site with document upload workflows.',
      'Live chat, multilingual support, SEO optimization, and mobile responsiveness.',
      'Tailored for claims handling, property damage assessments, and settlements.',
    ],
    tech: ['Next.js', 'Tailwind CSS'],
  },
  {
    title: 'HOA Management SaaS',
    subtitle: 'Full-Stack Application',
    category: 'SaaS',
    highlights: [
      'Complete HOA management dashboard with document portals and service request modules.',
      'Tenant and admin dashboards with role-based UI and neighbor-to-neighbor messaging.',
      'Enterprise-grade architecture designed for scalability toward commercial SaaS.',
    ],
    tech: ['React', 'Node.js', 'PostgreSQL'],
  },
];

const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative bg-black py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.03),transparent_60%)]" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-500/10 to-orange-500/10 border border-pink-500/20 rounded-full text-xs font-medium text-pink-400 mb-6">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-base max-w-lg mx-auto">
            A selection of projects spanning enterprise systems, AI platforms, and client work.
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-300 ${
                filter === cat
                  ? 'bg-white/10 border-white/20 text-white'
                  : 'bg-transparent border-gray-800 text-gray-500 hover:text-gray-300 hover:border-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
              className="group relative bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-purple-500/40 transition-all duration-300"
            >
              {/* Hover glow */}
              <div className="absolute -inset-px bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none" />

              <div className="relative">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg lg:text-xl font-bold text-white mb-0.5">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-500">{project.subtitle}</p>
                  </div>
                  {project.status && (
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                        project.status === 'Live'
                          ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10'
                          : 'text-blue-400 border-blue-500/20 bg-blue-500/10'
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          project.status === 'Live' ? 'bg-emerald-400' : 'bg-blue-400 animate-pulse'
                        }`}
                      />
                      {project.status}
                    </span>
                  )}
                </div>

                {/* Highlights */}
                <ul className="space-y-2 mb-5" role="list">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="flex gap-3 text-gray-300 text-sm leading-relaxed">
                      <span className="text-purple-400 mt-1 shrink-0">→</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-800">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-gray-800/80 border border-gray-700/50 rounded text-xs text-gray-400 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
