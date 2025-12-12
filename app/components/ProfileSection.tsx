'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ProfileSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="profile" className="relative bg-black py-20 lg:py-32 px-6 lg:px-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.03),transparent_60%)]"></div>
      
      <div ref={ref} className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-3 mb-4 mx-auto">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Profile
            </h2>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 rounded-2xl p-8 lg:p-10"
        >
          <div className="absolute -inset-px bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-2xl blur-xl"></div>
          
          <div className="relative">
            <p className="text-lg lg:text-xl text-gray-300 leading-relaxed mb-6">
              I'm a <span className="text-white font-semibold">software engineer</span> focused on building high-performance, real-time web applications that sit at the intersection of modern front-end systems, AI, and production-grade infrastructure. My work centers on turning complex data into clean, intuitive dashboards that drive real-world decisions.
            </p>
            
            <p className="text-lg lg:text-xl text-gray-300 leading-relaxed mb-6">
              I specialize in <span className="text-blue-400 font-semibold">React, Next.js, JavaScript/TypeScript, Node.js, and real-time data pipelines</span>, and I'm currently building AI-powered analytics platforms that process live video and operational data at the edge—then surface meaningful KPIs through responsive web interfaces. This includes full ownership of the stack: UI/UX, APIs, database design, real-time ingestion, and cloud deployment.
            </p>
            
            <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
              What sets me apart is my ability to <span className="text-purple-400 font-semibold">bridge product, engineering, and business</span>. I don't just build features—I build systems that scale, automate workflows, and generate measurable ROI. I thrive in environments where performance, reliability, and user experience actually matter.
            </p>

            <div className="mt-8 pt-6 border-t border-gray-700/50">
              <h3 className="text-xl font-bold text-white mb-3">Languages</h3>
              <div className="flex gap-4 text-gray-300">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  <span>English</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span>Spanish</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
