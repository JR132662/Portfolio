export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectMetric = {
  label: string;
  value: string;
};

export type Project = {
  title: string;
  subtitle: string;
  category: 'Enterprise' | 'AI / Edge' | 'Web' | 'Mobile' | 'SaaS';
  status?: 'Live' | 'In Progress';
  summary: string;
  outcomes: string[];
  tech: string[];
  metrics?: ProjectMetric[];
  links?: ProjectLink[];
};

/**
 * NOTE: Keep this grounded.
 * If a metric isn't verified, phrase it as scope/scale rather than a hard KPI.
 */
export const PROJECTS: Project[] = [
  {
    title: 'Kiosk React Migration',
    subtitle: "Sonny's Enterprises",
    category: 'Enterprise',
    status: 'In Progress',
    summary:
      'Leading the modernization of an 80,000+ LOC legacy kiosk system into a modular React + TypeScript architecture with hardware integrations that serve hundreds of deployed locations.',
    outcomes: [
      'Designed a component-first UI foundation to accelerate feature delivery and reduce regression risk across hundreds of kiosks.',
      'Built resilient integration patterns for payment terminals, scanners, kiosk hardware, and POS systems — zero-downtime reliability.',
      'Established clear architecture boundaries (UI / state / integration / services) improving team velocity and maintainability.',
    ],
    metrics: [
      { label: 'Codebase', value: '80k+ LOC' },
      { label: 'Deployment', value: '100s of kiosks' },
      { label: 'Reliability', value: 'Production critical' },
    ],
    tech: ['React', 'TypeScript', 'JavaScript', 'REST APIs', 'IIS', 'Nginx'],
  },
  {
    title: 'SwiftServe AI Analytics',
    subtitle: 'Swift Computing',
    category: 'AI / Edge',
    status: 'Live',
    summary:
      'End-to-end edge-AI analytics platform running on NVIDIA Jetson hardware — processes live video streams into actionable restaurant KPIs via a real-time React dashboard.',
    outcomes: [
      'Built a full edge-to-cloud pipeline: DeepStream + YOLOv11 (TensorRT) → MQTT → Supabase → React dashboard with sub-second latency.',
      'Implemented zone/ROI-based computer vision for throughput, queue timing, dwell time, abandonment, and staff response metrics.',
      'Delivered a responsive dashboard for real-time monitoring and historical trend analysis — ready for multi-location SaaS deployment.',
    ],
    metrics: [
      { label: 'Runtime', value: 'Edge (Jetson)' },
      { label: 'Pipeline', value: 'Real-time events' },
      { label: 'Output', value: '6+ operational KPIs' },
    ],
    tech: ['React', 'Node.js', 'DeepStream', 'YOLOv11', 'TensorRT', 'MQTT', 'Supabase', 'Docker'],
  },
  {
    title: 'Market360 Solutions',
    subtitle: 'Professional Residential Painting',
    category: 'Web',
    status: 'Live',
    summary:
      'Conversion-optimized marketing site for a South Florida painting company — designed to turn visitors into leads through clear CTAs, trust signals, and frictionless quote capture.',
    outcomes: [
      'Designed a high-converting layout with trust signals (licensed & insured, 500+ homes), social proof, and zero-friction lead capture.',
      'Built service pages (interior, exterior, trim, surface prep) with a clear four-step conversion flow.',
      'Delivered mobile-first performance with gallery, FAQs, and SEO-optimized structure.',
    ],
    tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    links: [{ label: 'Visit site', href: 'https://www.market360solutions.com/' }],
  },
  {
    title: 'Security Guard Training School',
    subtitle: 'Client Project',
    category: 'Web',
    summary:
      'Conversion-focused marketing site with structured enrollment funnels — guiding visitors from eligibility to enrollment with minimal friction.',
    outcomes: [
      'Structured content to reduce friction: requirements → courses → schedule → enroll, reducing drop-off.',
      'Built a consistent UI system for trust and clarity (pricing, benefits, eligibility requirements).',
      'Optimized for mobile-first performance and accessibility compliance.',
    ],
    tech: ['React', 'Next.js'],
  },
  {
    title: 'Ramirez Enriquez Law Firm',
    subtitle: 'Client Project',
    category: 'Web',
    summary:
      'Professional law firm website with conversion-optimized structure, mobile-first design, and SEO-ready content architecture.',
    outcomes: [
      'Designed a high-trust layout with clear service descriptions, proof elements, and prominent contact affordances.',
      'Implemented document upload workflows and mobile-optimized intake forms.',
      'Improved search discoverability with structured data, semantic HTML, and optimized page speed.',
    ],
    tech: ['Next.js', 'Tailwind CSS'],
  },
  {
    title: 'HOA Management SaaS',
    subtitle: 'Full-Stack Application',
    category: 'SaaS',
    summary:
      'Role-based HOA portal with document management, announcements, service requests, and resident messaging — built for multi-tenant scalability.',
    outcomes: [
      'Designed admin + tenant experiences with role-based access control and clean, scalable UI patterns.',
      'Built complete workflows for document management, service requests, and community announcements.',
      'Architected multi-tenant data model and groundwork for SaaS expansion.',
    ],
    tech: ['React', 'Node.js', 'PostgreSQL'],
  },
];
