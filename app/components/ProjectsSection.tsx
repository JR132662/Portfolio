'use client';

import { motion, useInView } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import { PROJECTS, type Project } from '@/app/content/projects';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

function ProjectCard({ project }: { project: Project }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group relative w-full text-left bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-purple-500/50 hover:-translate-y-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
        >
          <div className="absolute -inset-px bg-gradient-to-r from-blue-500/15 via-purple-500/20 to-pink-500/15 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 pointer-events-none" />

          <div className="relative">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h3 className="text-lg lg:text-xl font-bold text-white mb-0.5">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-500">{project.subtitle}</p>
              </div>
              {project.status && (
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border shrink-0 ${
                    project.status === 'Live'
                      ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10'
                      : 'text-blue-400 border-blue-500/20 bg-blue-500/10'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      project.status === 'Live'
                        ? 'bg-emerald-400'
                        : 'bg-blue-400 animate-pulse'
                    }`}
                    aria-hidden
                  />
                  {project.status}
                </span>
              )}
            </div>

            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              {project.summary}
            </p>

            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mb-5">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2"
                  >
                    <div className="text-[11px] text-white/50">{m.label}</div>
                    <div className="text-sm font-semibold text-white">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-800">
              {project.tech.slice(0, 6).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-gray-800/80 border border-gray-700/50 rounded text-xs text-gray-400 font-medium"
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > 6 && (
                <span className="px-2 py-1 text-xs text-gray-500">
                  +{project.tech.length - 6}
                </span>
              )}
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-white/70 group-hover:text-white transition-colors">
              <span className="inline-flex items-center gap-2">
                View details
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </div>
          </div>
        </button>
      </DialogTrigger>

      <DialogContent>
        <div className="flex items-start justify-between gap-6">
          <div>
            <DialogTitle>{project.title}</DialogTitle>
            <DialogDescription className="mt-1">
              {project.subtitle} • {project.category}
            </DialogDescription>
          </div>
          <DialogClose asChild>
            <button
              type="button"
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
              aria-label="Close"
            >
              Close
            </button>
          </DialogClose>
        </div>

        <div className="mt-5 space-y-4">
          <p className="text-sm text-gray-200 leading-relaxed">
            {project.summary}
          </p>

          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Outcomes</h4>
            <ul className="space-y-2" role="list">
              {project.outcomes.map((o, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-300">
                  <span className="text-purple-400 mt-1 shrink-0">→</span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>

          {project.links && project.links.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Links</h4>
              <div className="flex flex-wrap gap-2">
                {project.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
                  >
                    {l.label}
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-white/10">
            <h4 className="text-sm font-semibold text-white mb-2">Tech</h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 text-xs text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [filter, setFilter] = useState<'All' | Project['category']>('All');

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(PROJECTS.map((p) => p.category)))],
    []
  );

  const filtered = useMemo(
    () => (filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  );

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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-white">Projects with </span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">impact</span>
          </h2>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
            Work that ships — production systems, client funnels, and real-time analytics.
          </p>
        </motion.div>

        <Tabs
          value={filter}
          onValueChange={(v) => setFilter(v as typeof filter)}
          className="w-full"
        >
          <div className="flex justify-center">
            <TabsList aria-label="Project categories">
              {categories.map((cat) => (
                <TabsTrigger key={cat} value={cat}>
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={filter}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {filtered.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.15 + index * 0.06 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
