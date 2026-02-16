'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const experiences = [
  {
    role: 'Front End Developer',
    company: "Sonny's Car Wash Factory",
    period: 'Apr 2023 – Present',
    location: 'Miami, FL',
    description:
      "Leading the modernization of an 80,000+ line legacy kiosk system deployed across hundreds of car wash locations serving thousands of daily transactions.",
    achievements: [
      'Architecting a multi-phase migration from legacy jQuery/IIS to modular React + TypeScript, reducing regression risk and accelerating feature delivery.',
      'Integrating frontend systems with payment terminals, barcode scanners, kiosk hardware, and POS APIs — ensuring zero-downtime reliability in production.',
      'Designing a reusable component library and scalable architecture supporting auto-updates across 100s of deployed kiosk units.',
      'Reduced average bug resolution time through systematic debugging workflows and production hotfix pipelines.',
      'Collaborating cross-functionally with product managers, QA, and field operations to ship features and resolve live customer issues.',
    ],
    tech: ['React', 'TypeScript', 'jQuery', 'JavaScript', 'REST APIs', 'IIS', 'Nginx'],
    status: 'Migration in progress',
    impact: '80k+ LOC · 100s of kiosks · Production critical',
  },
  {
    role: 'Co-Founder & Lead Engineer',
    company: 'Swift Computing',
    period: 'Jun 2025 – Present',
    location: 'Miami Beach, FL',
    description:
      'Building SwiftServe — an AI-powered real-time restaurant analytics platform running on NVIDIA Jetson edge hardware, from concept to production deployment.',
    achievements: [
      'Designed and built an end-to-end edge-to-cloud pipeline: DeepStream + YOLOv11 (TensorRT) → MQTT → Supabase → React dashboard, processing live video at the edge.',
      'Implemented zone-based computer vision logic tracking queue wait time, throughput, dwell time, abandonment rates, and staff response metrics.',
      'Built automated deployment pipelines with systemd services, HLS video streaming (Nginx + ffmpeg), and real-time event handlers.',
      'Developed a full-stack cloud backend (Node.js + Supabase) and React dashboard for real-time KPI visualization and historical trend analysis.',
      'Architecting multi-location SaaS deployment strategy with scalable infrastructure for commercial rollout.',
    ],
    tech: ['NVIDIA Jetson', 'YOLOv11', 'TensorRT', 'DeepStream', 'MQTT', 'React', 'Node.js', 'Supabase', 'Docker'],
    impact: 'Edge AI · Real-time analytics · SaaS',
  },
];

export default function WorkSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="work" className="relative bg-black py-20 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full text-xs font-medium text-blue-400 mb-6">
            Experience
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            <span className="text-white">Work </span>
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Experience</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/30 to-transparent" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
                className="relative pl-12 sm:pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-2.5 sm:left-4.5 top-2 w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.9)] ring-4 ring-black animate-pulse" style={{ animationDuration: '2s' }} />

                {/* Card */}
                <div className="group relative bg-gray-900/50 border border-gray-800 rounded-2xl p-6 lg:p-8 hover:border-blue-500/50 hover:-translate-y-1 transition-all duration-300">
                  {/* Hover glow */}
                  <div className="absolute -inset-px bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none" />

                  <div className="relative">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <div>
                        <h3 className="text-xl lg:text-2xl font-bold text-white mb-1">
                          {exp.role}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 text-blue-400 text-sm font-medium">
                          <span>{exp.company}</span>
                          <span className="w-1 h-1 rounded-full bg-blue-400/60" />
                          <span className="text-gray-500">{exp.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-800/60 px-3 py-1.5 rounded-lg border border-gray-700/50 shrink-0">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {exp.period}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-sm lg:text-base mb-5 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <ul className="space-y-2.5 mb-6" role="list">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex gap-3 text-gray-300 text-sm leading-relaxed">
                          <span className="text-blue-400 mt-1 shrink-0">→</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Status badge */}
                    {exp.status && (
                      <div className="mb-5 inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                        <span className="text-blue-300 text-xs font-medium">{exp.status}</span>
                      </div>
                    )}

                    {/* Impact summary */}
                    {exp.impact && (
                      <div className={`${exp.status ? 'ml-3' : 'mb-5'} inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-lg`}>
                        <svg className="w-3.5 h-3.5 text-purple-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        <span className="text-purple-300 text-xs font-medium">{exp.impact}</span>
                      </div>
                    )}

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-800">
                      {exp.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 bg-gray-800/80 border border-gray-700/50 rounded-md text-xs text-gray-400 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
