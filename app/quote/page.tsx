'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { submitQuote } from '@/app/actions/submit-quote';

/* ─── Types ─── */
type ProjectType = 'website' | 'webapp' | 'saas' | 'ai-automation' | 'mobile' | 'other';
type Budget = '<5k' | '5k-15k' | '15k-50k' | '50k-100k' | '100k+' | 'unsure';
type Timeline = 'asap' | '1-2months' | '3-6months' | '6months+' | 'flexible';

interface FormData {
  // Step 1 — Project type
  projectType: ProjectType | '';
  projectTypeOther: string;
  // Step 2 — Scope
  description: string;
  features: string[];
  featuresOther: string;
  // Step 3 — Budget & Timeline
  budget: Budget | '';
  timeline: Timeline | '';
  // Step 4 — Contact
  name: string;
  email: string;
  company: string;
  phone: string;
  howFound: string;
}

const INITIAL: FormData = {
  projectType: '',
  projectTypeOther: '',
  description: '',
  features: [],
  featuresOther: '',
  budget: '',
  timeline: '',
  name: '',
  email: '',
  company: '',
  phone: '',
  howFound: '',
};

/* ─── Constants ─── */
const PROJECT_TYPES: { value: ProjectType; label: string; icon: React.ReactNode; desc: string }[] = [
  {
    value: 'website',
    label: 'Website',
    desc: 'Marketing site, landing page, portfolio, blog',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    value: 'webapp',
    label: 'Web Application',
    desc: 'Dashboard, portal, internal tool, CRM',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
      </svg>
    ),
  },
  {
    value: 'saas',
    label: 'SaaS Product',
    desc: 'Subscription platform, multi-tenant app',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
  },
  {
    value: 'ai-automation',
    label: 'AI & Automation',
    desc: 'Computer vision, chatbots, pipelines, edge AI',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
  },
  {
    value: 'mobile',
    label: 'Mobile App',
    desc: 'iOS, Android, or cross-platform (React Native)',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
  },
  {
    value: 'other',
    label: 'Other / Not Sure',
    desc: 'Tell me about your idea — I\'ll help scope it',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
    ),
  },
];

const FEATURE_OPTIONS: Record<ProjectType, string[]> = {
  website: [
    'Custom design / branding',
    'CMS (content management)',
    'Contact forms',
    'SEO optimization',
    'Analytics & tracking',
    'Blog / news section',
    'E-commerce / payments',
    'Animations & interactions',
    'Multi-language (i18n)',
    'Accessibility (WCAG)',
  ],
  webapp: [
    'User authentication',
    'Role-based access',
    'Dashboard & analytics',
    'Real-time updates',
    'File uploads',
    'Notifications (email/push)',
    'API integrations',
    'Data import/export',
    'Search & filtering',
    'Admin panel',
  ],
  saas: [
    'Multi-tenant architecture',
    'Subscription billing (Stripe)',
    'User onboarding flow',
    'Team / org management',
    'Usage analytics',
    'Webhooks & API',
    'White-labeling',
    'Audit logs',
    'SSO / OAuth',
    'Usage-based pricing',
  ],
  'ai-automation': [
    'Computer vision / object detection',
    'Natural language processing',
    'Chatbot / conversational AI',
    'Data pipeline / ETL',
    'Real-time analytics dashboard',
    'Edge deployment (Jetson/IoT)',
    'Model training / fine-tuning',
    'Workflow automation',
    'API integration layer',
    'Monitoring & alerting',
  ],
  mobile: [
    'iOS & Android (cross-platform)',
    'Push notifications',
    'Offline support',
    'Camera / media access',
    'Location services',
    'In-app purchases',
    'Social login',
    'Biometric auth',
    'Deep linking',
    'App Store deployment',
  ],
  other: [
    'Custom design',
    'User authentication',
    'API integrations',
    'Real-time features',
    'Analytics & reporting',
    'Automation / workflows',
    'AI / machine learning',
    'Payment processing',
    'Notifications',
    'Admin panel',
  ],
};

const BUDGETS: { value: Budget; label: string }[] = [
  { value: '<5k', label: 'Under $5,000' },
  { value: '5k-15k', label: '$5,000 – $15,000' },
  { value: '15k-50k', label: '$15,000 – $50,000' },
  { value: '50k-100k', label: '$50,000 – $100,000' },
  { value: '100k+', label: '$100,000+' },
  { value: 'unsure', label: 'Not sure yet' },
];

const TIMELINES: { value: Timeline; label: string }[] = [
  { value: 'asap', label: 'ASAP — Need it yesterday' },
  { value: '1-2months', label: '1 – 2 months' },
  { value: '3-6months', label: '3 – 6 months' },
  { value: '6months+', label: '6+ months' },
  { value: 'flexible', label: 'Flexible / ongoing' },
];

const TOTAL_STEPS = 4;

/* ─── Component ─── */
export default function QuotePage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [direction, setDirection] = useState<1 | -1>(1);
  const formRef = useRef<HTMLFormElement>(null);

  /* helpers */
  const update = useCallback(<K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const toggleFeature = useCallback((feat: string) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.includes(feat)
        ? prev.features.filter((f) => f !== feat)
        : [...prev.features, feat],
    }));
  }, []);

  const canAdvance = (): boolean => {
    switch (step) {
      case 1:
        return form.projectType !== '';
      case 2:
        return form.description.trim().length >= 10;
      case 3:
        return form.budget !== '' && form.timeline !== '';
      case 4:
        return form.name.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
      default:
        return false;
    }
  };

  const next = () => {
    if (canAdvance() && step < TOTAL_STEPS) {
      setDirection(1);
      setStep((s) => s + 1);
    }
  };

  const prev = () => {
    if (step > 1) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  };

  const handleSubmit = async () => {
    if (!canAdvance()) return;
    setSending(true);
    setError('');

    const result = await submitQuote({
      projectType: form.projectType,
      projectTypeOther: form.projectTypeOther || undefined,
      description: form.description,
      features: form.features,
      featuresOther: form.featuresOther || undefined,
      budget: form.budget,
      timeline: form.timeline,
      name: form.name,
      email: form.email,
      company: form.company || undefined,
      phone: form.phone || undefined,
      howFound: form.howFound || undefined,
    });

    setSending(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.message);
    }
  };

  /* animation variants */
  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-6"
        >
          <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
            <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white">Request Sent!</h1>
          <p className="text-gray-400 leading-relaxed">
            Thanks for reaching out. I&apos;ll review your project details and get back to you within <span className="text-white font-medium">24 hours</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Portfolio
            </Link>
            <button
              onClick={() => {
                setForm(INITIAL);
                setStep(1);
                setSubmitted(false);
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/15 border border-blue-500/20 rounded-xl transition-all duration-300"
            >
              Submit Another
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.06),transparent_50%)]" />
      </div>

      {/* Top bar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/10">
        <div className="max-w-3xl mx-auto flex items-center justify-between px-4 sm:px-6 h-16">
          <Link
            href="/"
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back
          </Link>

          {/* Progress */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/40">Step {step}/{TOTAL_STEPS}</span>
            <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                initial={false}
                animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <form ref={formRef} onSubmit={(e) => e.preventDefault()} className="min-h-[60vh] flex flex-col">
          {/* Step heading area */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1"
            >
              {/* ─── STEP 1: Project Type ─── */}
              {step === 1 && (
                <div className="space-y-8">
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">What are you building?</h1>
                    <p className="text-gray-400">Select the option that best describes your project.</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {PROJECT_TYPES.map((pt) => (
                      <button
                        key={pt.value}
                        type="button"
                        onClick={() => update('projectType', pt.value)}
                        className={`group relative text-left p-5 rounded-2xl border transition-all duration-300 ${
                          form.projectType === pt.value
                            ? 'bg-blue-500/10 border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.15)]'
                            : 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.05]'
                        }`}
                      >
                        <div className={`mb-3 ${form.projectType === pt.value ? 'text-blue-400' : 'text-white/40 group-hover:text-white/60'} transition-colors`}>
                          {pt.icon}
                        </div>
                        <div className="text-sm font-semibold text-white mb-1">{pt.label}</div>
                        <div className="text-xs text-gray-500">{pt.desc}</div>
                        {form.projectType === pt.value && (
                          <motion.div
                            layoutId="type-check"
                            className="absolute top-3 right-3 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center"
                          >
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                          </motion.div>
                        )}
                      </button>
                    ))}
                  </div>
                  {form.projectType === 'other' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                      <input
                        type="text"
                        value={form.projectTypeOther}
                        onChange={(e) => update('projectTypeOther', e.target.value)}
                        placeholder="Briefly describe your project type..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all"
                      />
                    </motion.div>
                  )}
                </div>
              )}

              {/* ─── STEP 2: Scope ─── */}
              {step === 2 && (
                <div className="space-y-8">
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Tell me about it</h1>
                    <p className="text-gray-400">Describe your project and pick the features you need.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70" htmlFor="description">
                      Project description <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="description"
                      value={form.description}
                      onChange={(e) => update('description', e.target.value)}
                      rows={5}
                      placeholder="What problem does this solve? Who are the users? What does success look like?"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all resize-none"
                    />
                    <p className="text-xs text-gray-600">{form.description.length}/1000 characters</p>
                  </div>

                  {form.projectType && (
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-white/70">Key features (select all that apply)</label>
                      <div className="flex flex-wrap gap-2">
                        {FEATURE_OPTIONS[form.projectType as ProjectType]?.map((feat) => (
                          <button
                            key={feat}
                            type="button"
                            onClick={() => toggleFeature(feat)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ${
                              form.features.includes(feat)
                                ? 'bg-purple-500/15 border-purple-500/40 text-purple-300'
                                : 'bg-white/[0.03] border-white/10 text-white/50 hover:border-white/20 hover:text-white/70'
                            }`}
                          >
                            {form.features.includes(feat) && (
                              <span className="mr-1.5">✓</span>
                            )}
                            {feat}
                          </button>
                        ))}
                      </div>
                      <input
                        type="text"
                        value={form.featuresOther}
                        onChange={(e) => update('featuresOther', e.target.value)}
                        placeholder="Other features not listed above..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* ─── STEP 3: Budget & Timeline ─── */}
              {step === 3 && (
                <div className="space-y-8">
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Budget & Timeline</h1>
                    <p className="text-gray-400">Helps me tailor the proposal to your constraints.</p>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-white/70">Estimated budget <span className="text-red-400">*</span></label>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {BUDGETS.map((b) => (
                        <button
                          key={b.value}
                          type="button"
                          onClick={() => update('budget', b.value)}
                          className={`text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                            form.budget === b.value
                              ? 'bg-blue-500/10 border-blue-500/40 text-blue-300'
                              : 'bg-white/[0.03] border-white/10 text-white/60 hover:border-white/20 hover:text-white/80'
                          }`}
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-white/70">Desired timeline <span className="text-red-400">*</span></label>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {TIMELINES.map((t) => (
                        <button
                          key={t.value}
                          type="button"
                          onClick={() => update('timeline', t.value)}
                          className={`text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                            form.timeline === t.value
                              ? 'bg-purple-500/10 border-purple-500/40 text-purple-300'
                              : 'bg-white/[0.03] border-white/10 text-white/60 hover:border-white/20 hover:text-white/80'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── STEP 4: Contact ─── */}
              {step === 4 && (
                <div className="space-y-8">
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Almost done!</h1>
                    <p className="text-gray-400">How should I reach you?</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70" htmlFor="name">
                        Full name <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={form.name}
                        onChange={(e) => update('name', e.target.value)}
                        placeholder="Jane Smith"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70" htmlFor="email">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        placeholder="jane@company.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70" htmlFor="company">
                        Company <span className="text-white/30">(optional)</span>
                      </label>
                      <input
                        id="company"
                        type="text"
                        value={form.company}
                        onChange={(e) => update('company', e.target.value)}
                        placeholder="Acme Inc."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70" htmlFor="phone">
                        Phone <span className="text-white/30">(optional)</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        placeholder="(555) 123-4567"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70" htmlFor="howFound">
                      How did you find me? <span className="text-white/30">(optional)</span>
                    </label>
                    <input
                      id="howFound"
                      type="text"
                      value={form.howFound}
                      onChange={(e) => update('howFound', e.target.value)}
                      placeholder="Google, LinkedIn, referral..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all"
                    />
                  </div>

                  {/* Summary */}
                  <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-3">
                    <h3 className="text-sm font-semibold text-white/70">Summary</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-white/40 text-xs">Project</span>
                        <p className="text-white font-medium">{PROJECT_TYPES.find((p) => p.value === form.projectType)?.label}</p>
                      </div>
                      <div>
                        <span className="text-white/40 text-xs">Budget</span>
                        <p className="text-white font-medium">{BUDGETS.find((b) => b.value === form.budget)?.label}</p>
                      </div>
                      <div>
                        <span className="text-white/40 text-xs">Timeline</span>
                        <p className="text-white font-medium">{TIMELINES.find((t) => t.value === form.timeline)?.label}</p>
                      </div>
                      <div>
                        <span className="text-white/40 text-xs">Features</span>
                        <p className="text-white font-medium">{form.features.length || 0} selected</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-10">
            <button
              type="button"
              onClick={prev}
              disabled={step === 1}
              className={`inline-flex items-center gap-2 px-5 py-3 text-sm font-medium rounded-xl border transition-all duration-300 ${
                step === 1
                  ? 'opacity-0 pointer-events-none'
                  : 'text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border-white/10'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back
            </button>

            {step < TOTAL_STEPS ? (
              <button
                type="button"
                onClick={next}
                disabled={!canAdvance()}
                className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                  canAdvance()
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02]'
                    : 'bg-white/5 text-white/30 border border-white/10 cursor-not-allowed'
                }`}
              >
                Continue
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canAdvance() || sending}
                className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                  canAdvance() && !sending
                    ? 'bg-gradient-to-r from-emerald-500 to-blue-600 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02]'
                    : 'bg-white/5 text-white/30 border border-white/10 cursor-not-allowed'
                }`}
              >
                {sending ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                    Send Request
                  </>
                )}
              </button>
            )}
            {error && (
              <p className="text-sm text-red-400 mt-2 text-center">{error}</p>
            )}
          </div>

          {/* Step indicators */}
          <div className="flex justify-center gap-2 pt-8">
            {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  if (s < step || (s === step + 1 && canAdvance())) {
                    setDirection(s > step ? 1 : -1);
                    setStep(s);
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  s === step
                    ? 'bg-blue-400 w-6'
                    : s < step
                      ? 'bg-purple-400/60 hover:bg-purple-400'
                      : 'bg-white/15'
                }`}
                aria-label={`Step ${s}`}
              />
            ))}
          </div>
        </form>
      </main>
    </div>
  );
}
