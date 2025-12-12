'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      title: "Kiosk React Migration (Sonny's Enterprises)",
      highlights: [
        "Large-scale migration of a legacy kiosk system from jQuery → React.",
        "Created modern component architecture, reusable elements, and API integration patterns.",
        "Improved maintainability and future scalability.",
        "Status: In progress, partial modules already ported.",
      ],
    },
    {
      title: "SwiftServe AI Analytics Platform",
      highlights: [
        "Designed a full real-time vision analytics system using edge AI + cloud dashboards.",
        "Built KPI computation engine, multi-zone detection logic, and scalable event pipelines.",
        "Delivered a high-performance React dashboard for real-time restaurant metrics.",
        "Currently in use at local restaurants with verifiable demo available to showcase",
      ],
    },
    {
      title: "Security Guard Training School Website",
      stack: "React, Next.js",
      highlights: [
        "Built conversion-focused website for Florida security guard training school.",
        "Integrated licensing requirements, course listings, enrollment workflows, and payment structure.",
        "Designed full site architecture and branding with multilingual content support.",
      ],
    },
    {
      title: "High-End Gym Mobile App + Website",
      stack: "React Native, React.js, Stripe/Payments",
      highlights: [
        "Designed and built fitness membership platform with sign-up and payment processing.",
        "Features trainer booking, session management, alerts, and premium UI.",
        "Delivered fully functional membership management ecosystem MVP.",
      ],
    },
    {
      title: "Ramirez Enriquez Law Firm Website",
      stack: "Next.js, TailwindCSS",
      highlights: [
        "Built professional, conversion-optimized site with document upload workflows.",
        "Integrated live chat, multilingual support, SEO optimization, and mobile responsiveness.",
        "Tailored for clients handling claims, property damage assessments, and settlements.",
      ],
    },
    {
      title: "Hola Quantum – Corporate Website",
      stack: "WordPress / Elementor",
      highlights: [
        "Delivered polished homepage and expanded site with FAQ, scheduler, and recruiter forms.",
        "Features modern design aesthetic, mobile responsiveness, and SEO structure.",
        "Includes appointment scheduling and client capture systems.",
      ],
    },
    {
      title: "HOA Management Dashboard & Marketing Site",
      stack: "React.js, TailwindCSS",
      highlights: [
        "Designed complete HOA management dashboard with document portals and service request modules.",
        "Built tenant and admin dashboards with role-based UI segregation.",
        "Includes private social forum and building information pages.",
      ],
    },
    {
      title: "HOA Admin + Tenant Portal (Full SaaS)",
      stack: "React.js, Messaging System, Document Handling",
      highlights: [
        "Built web application for condo associations to manage communication and documents.",
        "Features service requests, announcements, and neighbor-to-neighbor messaging.",
        "Enterprise-grade UI designed for scalability toward commercial SaaS offering.",
      ],
    },
  ];

  return (
    <section id="projects" className="relative bg-black pt-8 pb-20 px-6 lg:px-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.03),transparent_60%)]"></div>
      
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-3 mb-4 mx-auto">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-orange-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Projects
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="absolute -inset-px bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
              
              <div className="relative">
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                {project.stack && (
                  <p className="text-sm text-purple-400 mb-4 font-medium">
                    {project.stack}
                  </p>
                )}
                <ul className="space-y-2">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="flex gap-3 text-gray-300 leading-relaxed">
                      <span className="text-purple-400 mt-1.5 shrink-0">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
