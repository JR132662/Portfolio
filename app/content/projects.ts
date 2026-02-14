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
    title: 'Market360 Solutions',
    subtitle: 'Professional Residential Painting',
    category: 'Web',
    status: 'Live',
    summary:
      'Conversion-focused marketing site for a South Florida residential painting company — free estimates, service pages, gallery, and lead capture.',
    outcomes: [
      'Designed a high-converting layout with clear CTAs, trust signals (licensed & insured, 500+ homes), and social proof.',
      'Built service flows (interior, exterior, trim, surface prep) and a simple four-step process section.',
      'Delivered mobile-first performance with gallery, FAQs, and zero-friction quote capture.',
    ],
    tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    links: [{ label: 'Visit site', href: 'https://www.market360solutions.com/' }],
  },
  {
    title: 'Kiosk React Migration',
    subtitle: "Sonny's Enterprises",
    category: 'Enterprise',
    status: 'In Progress',
    summary:
      'Modernizing a legacy kiosk application into a modular React architecture with resilient hardware integrations.',
    outcomes: [
      'Designed a component-first UI foundation to accelerate feature delivery and reduce regression risk.',
      'Built stable integration patterns for payment terminals, scanners, kiosk devices, and POS systems.',
      'Improved maintainability with clear boundaries (UI / state / integration / services).',
    ],
    metrics: [
      { label: 'Scope', value: '80k+ LOC legacy' },
      { label: 'Footprint', value: 'Hundreds of kiosks' },
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
      'Edge-AI analytics platform (Jetson) + real-time dashboard to turn video + operational signals into actionable KPIs.',
    outcomes: [
      'Built an edge-to-cloud pipeline: DeepStream + YOLOv11 (TensorRT) → MQTT → Supabase → React dashboard.',
      'Implemented zone/ROI logic for throughput, queue timing, dwell time, abandonment, and staff response metrics.',
      'Delivered a fast UI for real-time monitoring and historical trend analysis.',
    ],
    metrics: [
      { label: 'Runtime', value: 'Edge (Jetson)' },
      { label: 'Pipeline', value: 'Realtime events' },
      { label: 'Output', value: 'Operational KPIs' },
    ],
    tech: ['React', 'Node.js', 'DeepStream', 'YOLOv11', 'TensorRT', 'MQTT', 'Supabase', 'Docker'],
  },
  {
    title: 'Security Guard Training School',
    subtitle: 'Client Project',
    category: 'Web',
    summary:
      'Conversion-focused marketing site with clear course flows, enrollment funnel, and a mobile-first experience.',
    outcomes: [
      'Structured content to reduce friction: requirements → courses → schedule → enroll.',
      'Built a consistent UI system for trust and clarity (pricing, benefits, eligibility).',
      'Optimized for performance and readability on mobile.',
    ],
    tech: ['React', 'Next.js'],
  },
  {
    title: 'Ramirez Enriquez Law Firm',
    subtitle: 'Client Project',
    category: 'Web',
    summary:
      'Professional, conversion-optimized law firm website with mobile-first performance and SEO-ready structure.',
    outcomes: [
      'Designed a high-trust layout with clear services, proof, and contact affordances.',
      'Implemented document upload workflows and mobile-first forms.',
      'Improved discoverability with SEO structure and content clarity.',
    ],
    tech: ['Next.js', 'Tailwind CSS'],
  },
  {
    title: 'HOA Management SaaS',
    subtitle: 'Full-Stack Application',
    category: 'SaaS',
    summary:
      'Role-based HOA portal with document management, announcements, service requests, and messaging.',
    outcomes: [
      'Designed admin + tenant experiences with clean, scalable UI patterns.',
      'Built workflows for documents, service requests, and community messaging.',
      'Laid groundwork for multi-tenant scalability and SaaS expansion.',
    ],
    tech: ['React', 'Node.js', 'PostgreSQL'],
  },
];
