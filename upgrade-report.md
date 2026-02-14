# Portfolio Upgrade Report — Phase 1: Deep Audit

**Audited by:** Onyx  
**Date:** 2026-02-14  
**Framework:** Next.js 16.0.10 (App Router, Turbopack)  
**Styling:** Tailwind CSS v4 + tw-animate-css  
**UI Libraries:** shadcn/ui (new-york), Magic UI, Aceternity UI, React Bits  
**Animation:** Framer Motion (`motion` v12), GSAP (imported but unused)  
**3D/WebGL:** Three.js (imported but unused), custom WebGL MetallicPaint shader  
**Language:** TypeScript + one JSX file (MetallicPaint)  

---

## Architecture Map

```
app/
├── layout.tsx          — Root layout (Geist fonts, metadata)
├── page.tsx            — Home (client component, all sections)
├── globals.css         — Tailwind + CSS variables + animations
├── favicon.ico
└── components/
    ├── Header.tsx       — Fixed nav, mobile menu
    ├── HeroSection.tsx  — Hero with icon cloud, CTA
    ├── AboutSection.tsx — About + cards (mobile carousel / desktop float)
    ├── WorkSection.tsx  — Work experience timeline
    ├── SkillsSection.tsx— Skill tags
    ├── ProjectsSection.tsx — Project cards grid
    └── ProfileSection.tsx  — Bio + profile image

components/
├── MetallicPaint.jsx   — WebGL shader component (UNUSED)
└── ui/
    ├── background-gradient.tsx  — Aceternity animated gradient wrapper
    ├── rainbow-button.tsx       — Magic UI rainbow CTA button
    └── icon-cloud.tsx           — Canvas-based 3D icon sphere

lib/
└── utils.ts            — cn() helper (clsx + tailwind-merge)

public/
├── images/             — dashboard.png, Supabase.png, JR.png, UIUX.png
├── Jonathan-Rodriguez-FlowCV-Resume-20251209.pdf
└── *.svg               — Next.js default SVGs (unused)
```

---

## Issues Found

### 🔴 HIGH PRIORITY

| # | Issue | Category | Details | Impact |
|---|-------|----------|---------|--------|
| H1 | **Entire page is a client component** | Performance | `page.tsx` uses `'use client'` with `useState`, making the entire page client-rendered. All sections are pulled into the client bundle. No server components anywhere. | Significantly increases JS bundle, hurts FCP/LCP, kills SSR benefits of Next.js |
| H2 | **Unused heavy dependencies** | Bundle Size | `three` (1MB+), `gsap`, `react-router-dom` are in dependencies but never imported in any component. Dead weight in `package.json`. | Bloated `node_modules`, potential bundle inclusion |
| H3 | **Images not using Next.js `<Image>`** | Performance | AboutSection uses raw `<img>` tags for dashboard.png (244KB), Supabase.png (55KB), UIUX.png (192KB). No lazy loading, no optimization, no responsive sizing. | Poor LCP, no automatic WebP/AVIF conversion, no responsive sizes |
| H4 | **No SEO metadata beyond basics** | SEO | Only `title` and `description` in layout.tsx. Missing: Open Graph tags, Twitter cards, canonical URL, structured data, robots meta, viewport description. | Poor social sharing previews, reduced search visibility |
| H5 | **Missing `<meta name="viewport">`** | Accessibility/Mobile | No viewport meta tag defined. Next.js 16 may auto-add it, but explicit control is better. | Potential mobile rendering issues |
| H6 | **Hero CTA links to GitHub, not portfolio work** | Conversion | "View my work" button links to `github.com/jr132662` — a GitHub profile page. For a portfolio, this should link to the Projects section or a curated showcase. | Lost conversion — visitors leave the site |
| H7 | **No contact/CTA section** | Conversion | No way to contact Jonathan. No email, no contact form, no LinkedIn, no call-to-action at the bottom. Visitors reach the end and have nowhere to go. | Zero conversion pathway |
| H8 | **MetallicPaint.jsx is dead code** | Code Quality | Complex WebGL shader component (300+ lines) that is never imported anywhere. | Dead code, maintenance burden |
| H9 | **Mobile menu state managed at page level** | Architecture | `mobileMenuOpen` state lives in `page.tsx` and is passed down, causing the entire page to blur on mobile menu open. Also prevents server component extraction. | Unnecessary re-renders, architectural coupling |

### 🟡 MEDIUM PRIORITY

| # | Issue | Category | Details | Impact |
|---|-------|----------|---------|--------|
| M1 | **No heading hierarchy** | Accessibility | Multiple `<h2>` sections with no logical `<h1>` in the hero (the gradient text isn't in an `<h1>` — wait, it is). But `<h3>` tags are used inconsistently. Section headers all use `<h2>` which is correct. | Minor a11y concern |
| M2 | **No skip-to-content link** | Accessibility | No skip navigation for keyboard/screen reader users. | WCAG 2.1 gap |
| M3 | **Cursor glow uses `fixed` positioning** | Performance | The cursor glow div in HeroSection uses `position: fixed` and updates on every mouse move via refs, but it's always rendered even when scrolled past the hero. | Unnecessary GPU compositing on scroll |
| M4 | **Inline SVG noise filter** | Performance | SVG noise texture in HeroSection renders a full-viewport filter. This is GPU-intensive on mobile. | Mobile performance hit |
| M5 | **About section mobile carousel has no swipe** | UX | Mobile carousel says "Swipe or tap dots to navigate" but there's no touch/swipe handler — only dot buttons work. | Misleading UX, broken interaction model |
| M6 | **`!important` style overrides via `!` prefix** | Code Quality | Multiple `!ml-[10px]`, `!mr-[5px]`, `!mt-[20px]`, `!w-[250px]` in components. Sign of fighting the layout system. | Fragile styling, hard to maintain |
| M7 | **No footer** | UX/SEO | Site just ends after Profile section. No footer with links, copyright, social icons, or legal info. | Feels unfinished, missed SEO/link opportunities |
| M8 | **Resume PDF has poor filename** | UX | `Jonathan-Rodriguez-FlowCV-Resume-20251209.pdf` — exposed to users if downloaded. Fine but could be cleaner. Also no link to it from the site. | Minor professionalism issue |
| M9 | **Icon Cloud loads 14 external SVGs** | Performance | Each icon is fetched from `cdn.jsdelivr.net` at runtime. No preloading, no caching strategy. | Waterfall requests, potential FOUC on icon cloud |
| M10 | **No `aria-label` on nav links** | Accessibility | Navigation links like "Lab" and "Story" are ambiguous for screen readers without context. | Accessibility gap |
| M11 | **CSS has unused sidebar variables** | Code Quality | Extensive sidebar CSS variables defined (`--sidebar-*`, `--chart-*`) from shadcn defaults that are never used. | CSS bloat (minor) |
| M12 | **Work section "align-center" typo** | Code Quality | `className` has `align-center` (not a valid Tailwind class). Should be removed or use `text-center`. | No-op class in output |

### 🟢 LOW PRIORITY

| # | Issue | Category | Details | Impact |
|---|-------|----------|---------|--------|
| L1 | **Default Next.js SVGs in public/** | Code Quality | `next.svg`, `vercel.svg`, `globe.svg`, `window.svg`, `file.svg` — unused starter assets. | Clutter |
| L2 | **No favicon variety** | SEO/Branding | Only `favicon.ico`. No apple-touch-icon, no manifest, no theme-color. | Minor branding gap |
| L3 | **Stats are hardcoded** | Content | "30+ Projects", "4+ Years", "10+ Technologies" — fine but could be more impactful with real metrics. | Minor credibility concern |
| L4 | **Project cards lack links** | Conversion | None of the 8 projects link to a live demo or repo. | Missed proof of work |
| L5 | **No dark/light mode toggle** | UX | Site is dark-only. CSS has both light and dark variables defined but dark is never toggled. | Not a bug (dark portfolio is valid) |
| L6 | **`react-router-dom` imported but unused** | Bundle | Listed in dependencies. Next.js uses its own router. | Unnecessary dependency |

---

## Image Audit

| File | Dimensions | Size | Format | Optimized? |
|------|-----------|------|--------|-----------|
| dashboard.png | 1917×1026 | 244 KB | PNG | ❌ Should be WebP, needs responsive sizes |
| UIUX.png | 740×472 | 192 KB | PNG | ❌ Should be WebP |
| Supabase.png | 624×324 | 55 KB | PNG | ⚠️ Acceptable but WebP preferred |
| JR.png | 200×200 | 48 KB | PNG | ⚠️ Small but could be WebP |

**Recommendation:** Convert all to WebP, use Next.js `<Image>` component with `sizes` prop for responsive delivery.

---

## Bundle Analysis (Estimated)

| Dependency | Size (minified) | Used? | Action |
|-----------|----------------|-------|--------|
| three | ~600 KB | ❌ No | Remove |
| gsap | ~100 KB | ❌ No | Remove |
| react-router-dom | ~40 KB | ❌ No | Remove |
| motion (framer-motion) | ~120 KB | ✅ Yes | Keep, optimize imports |
| lucide-react | ~varies | ❌ No icons used | Remove or use |
| @radix-ui/react-slot | ~5 KB | ✅ Yes | Keep |

**Estimated bundle savings from removing unused deps: ~740 KB**

---

## Improvement Plan (Priority Order)

### Phase 2: Performance
1. Remove unused dependencies (three, gsap, react-router-dom, lucide-react)
2. Convert page.tsx to server component; move client state into Header only
3. Replace all `<img>` with Next.js `<Image>` 
4. Optimize/convert images to WebP
5. Lazy load sections below the fold
6. Remove cursor glow from fixed rendering when not in hero
7. Optimize icon cloud loading (preconnect to CDN)

### Phase 2: UX & Conversion
1. Redesign hero CTA — primary: scroll to projects, secondary: contact/GitHub
2. Add contact/CTA section at bottom
3. Add footer with social links + resume download
4. Fix mobile carousel to support actual swipe gestures
5. Improve project cards with links, outcomes, and visual thumbnails
6. Add smooth scroll behavior
7. Improve nav with active section highlighting

### Phase 2: Visual Design
1. Clean up spacing system (remove all `!important` overrides)
2. Improve typography scale consistency
3. Add subtle section transitions
4. Refine button hover/active states
5. Polish mobile nav experience

### Phase 2: Accessibility
1. Add skip-to-content link
2. Fix heading hierarchy
3. Improve ARIA labels on interactive elements
4. Ensure keyboard navigation works throughout
5. Verify contrast ratios on gray text

### Phase 2: SEO
1. Add comprehensive Open Graph meta tags
2. Add Twitter card meta tags
3. Add structured data (Person schema)
4. Add canonical URL
5. Add sitemap
6. Add robots.txt
7. Improve page title format

### Phase 3: Code Quality
1. Remove MetallicPaint.jsx (dead code)
2. Remove unused public assets
3. Clean up CSS variables (remove unused sidebar/chart vars)
4. Fix TypeScript strict mode issues
5. Consistent component patterns

### Phase 4: Polish
1. Scroll-triggered section animations (already partially done via useInView)
2. Smooth page transitions
3. Loading states
4. Micro-interactions on cards
5. Professional footer with gradient accent

---

**Status: Audit Complete ✅ — Ready for Phase 2 execution.**
