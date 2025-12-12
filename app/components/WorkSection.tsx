'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function WorkSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experiences = [
    {
      role: "Front End Developer",
      company: "Sonny's Car Wash Factory",
      period: "04/2023 - present",
      location: "Miami, 33140",
      description: "Sonny's Car Wash Factory is an automated car wash platform serving thousands of locations daily.",
      achievements: [
        "Leading a multi-phase modernization effort to migrate a 80,000+ line legacy jQuery/IIS kiosk application into a modular React architecture.",
        "Integrated front-end systems with complex hardware APIs: payment terminals, scanners, kiosk devices, and POS systems.",
        "Developed reusable UI components, improved code structure, and implemented performance optimizations.",
        "Collaborated directly with product managers and QA to deliver new features, fix customer issues, and ensure high reliability across hundreds of deployed kiosks.",
        "Managed high-volume client requests from field operations, providing rapid debugging and production fixes.",
        "Designed a scalable structure for the React app to support future auto-update and easier maintenance.",
      ],
      note: "Important Note: React migration project currently in progress — ongoing contributions include UI rebuilding, feature parity work, and component architecture.",
      tech: "React (active migration), jQuery (legacy), JavaScript, TypeScript, APIs, IIS, Nginx, Windows Services",
    },
    {
      role: "Co-Founder - Lead Engineer",
      company: "Swift Computing",
      period: "06/2025 - Present",
      location: "Miami-Beach",
      description: "SwiftServe is an AI-powered real-time restaurant analytics platform running on NVIDIA Jetson edge hardware.",
      achievements: [
        "Built an end-to-end edge-to-cloud analytics pipeline using DeepStream, YOLOv11 TensorRT models, MQTT event streams, and Supabase.",
        "Designed zone-based and ROI-based computer vision logic to track queue wait time, throughput, dwell time, abandonment, and staff response metrics.",
        "Implemented automated bot pipelines, systemd services, real-time event handlers, and HLS video streaming using Nginx + ffmpeg.",
        "Built a cloud backend with Node.js + Supabase for storing analytics, and a full React dashboard for visualization.",
        "Architected production deployment strategy for multi-location installations.",
        "Managed product roadmap, KPIs, and business development to position SwiftServe as a scalable SaaS solution.",
      ],
      tech: "NVIDIA Jetson Orin Nano, YOLOv11, TensorRT, DeepStream, MQTT, Node.js, React, Supabase, SQLite, Docker, ffmpeg, Nginx",
    },
  ];

  return (
    <section id="work" className="relative min-h-screen bg-black py-20 px-6 lg:px-12 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(139,92,246,0.05),transparent_50%)]"></div>
      </div>

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-20 text-center"
        >
          <div className="inline-flex items-center gap-3 mb-4 mx-auto">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent  align-center">
              Work Experience
            </h2>
          </div>
        </motion.div>

        {/* Experience Timeline */}
        <div className="space-y-12 lg:space-y-16 max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
              className="relative"
            >
              {/* Timeline line */}
              {index !== experiences.length - 1 && (
                <div className="absolute left-0 top-20 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/30 to-transparent hidden"></div>
              )}

              <div className="relative">
                {/* Timeline dot */}
                <div className="absolute left-0 top-8 w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] hidden"></div>

                {/* Content Card */}
                <div className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 rounded-2xl p-6 lg:p-8 hover:border-blue-500/50 transition-all duration-300">
                  {/* Hover glow effect */}
                  <div className="absolute -inset-px bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                  
                  <div className="relative">
                    {/* Header */}
                    <div className="flex flex-col items-center gap-4 mb-6 text-center">
                      <div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                          {exp.role}
                        </h3>
                        <div className="flex flex-wrap items-center justify-center gap-3 text-blue-400">
                          <span className="font-semibold">{exp.company}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                          <span className="text-gray-400">{exp.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400 bg-gray-800/50 px-4 py-2 rounded-lg border border-gray-700/50">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {exp.period}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-6 leading-relaxed text-center">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <ul className="space-y-3 mb-6 text-left max-w-3xl mx-auto">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex gap-3 text-gray-300 leading-relaxed">
                          <span className="text-blue-400 mt-1.5 shrink-0">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Note (if exists) */}
                    {exp.note && (
                      <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <p className="text-blue-300 text-sm italic leading-relaxed text-center">
                          <span className="font-semibold">Important Note:</span> {exp.note.replace('Important Note: ', '')}
                        </p>
                      </div>
                    )}

                    {/* Tech Stack */}
                    <div className="pt-4 border-t border-gray-700/50">
                      <p className="text-sm text-gray-400 mb-3 text-center">
                        <span className="font-semibold text-gray-300">Tech:</span> {exp.tech}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
