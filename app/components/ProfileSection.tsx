'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function ProfileSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="profile" className="relative bg-black py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.03),transparent_60%)]" />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-500/20 rounded-full text-xs font-medium text-green-400 mb-6">
            About
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            <span className="text-white">My </span>
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Story</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="group relative bg-gray-900/50 border border-gray-800 rounded-2xl p-6 sm:p-8 lg:p-10 hover:border-blue-500/30 transition-all duration-300"
        >
          <div className="absolute -inset-px bg-gradient-to-r from-blue-500/5 via-purple-500/10 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none" />
          <div className="relative grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 items-start">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mx-auto lg:mx-0"
            >
              <div className="relative w-40 h-40 lg:w-full lg:h-auto lg:aspect-square">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-2xl blur-lg opacity-40" />
                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-gray-700/50">
                  <Image
                    src="/images/JR.png"
                    alt="Jonathan Rodriguez — Full-Stack Developer"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 160px, 180px"
                    priority
                  />
                </div>
              </div>
            </motion.div>

            {/* Text Content */}
            <div className="space-y-5">
              <p className="text-base lg:text-lg text-gray-300 leading-relaxed">
                I&apos;m a <span className="text-white font-semibold">software engineer</span> focused on building high-performance, real-time web applications at the intersection of modern frontend systems, AI, and production-grade infrastructure. My work centers on turning complex data into clean, intuitive dashboards that drive real-world decisions.
              </p>

              <p className="text-base lg:text-lg text-gray-300 leading-relaxed">
                I specialize in{' '}
                <span className="text-blue-400 font-semibold">
                  React, Next.js, TypeScript, Node.js, and real-time data pipelines
                </span>
                , and I&apos;m currently building AI-powered analytics platforms that process live video and operational data at the edge — then surface meaningful KPIs through responsive web interfaces.
              </p>

              <p className="text-base lg:text-lg text-gray-300 leading-relaxed">
                What sets me apart is my ability to{' '}
                <span className="text-purple-400 font-semibold">
                  bridge product, engineering, and business
                </span>
                . I don&apos;t just build features — I build systems that scale, automate workflows, and generate measurable ROI.
              </p>

              <div className="flex items-center gap-6 pt-5 border-t border-gray-800">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <span>English</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
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
