import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rodtechdev.com";

export const metadata: Metadata = {
  title: "Jonathan Rodriguez — Full-Stack Developer | React, Next.js, TypeScript",
  description:
    "Full-stack software engineer with 4+ years of experience building production-grade React & Next.js applications — enterprise kiosks, edge-AI analytics, and conversion-optimized web products. Based in Miami, FL.",
  keywords: [
    "Full-Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Frontend Engineer",
    "Software Engineer",
    "Miami Developer",
    "UI/UX Engineer",
    "Edge AI",
    "Enterprise Applications",
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Jonathan Rodriguez — Full-Stack Developer | React, Next.js, TypeScript",
    description:
      "Full-stack engineer building production-grade React & Next.js applications — enterprise kiosks, edge-AI analytics, and high-conversion web products.",
    url: siteUrl,
    type: "website",
    locale: "en_US",
    siteName: "Jonathan Rodriguez | Software Engineer Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jonathan Rodriguez — Full-Stack Developer | React & Next.js",
    description:
      "4+ years shipping production React apps — enterprise kiosks, edge-AI platforms, and conversion-optimized web products.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "theme-color": "#000000",
  },
};

/* JSON-LD Structured Data for recruiter/search discoverability */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jonathan Rodriguez",
  url: siteUrl,
  jobTitle: "Full-Stack Software Engineer",
  description:
    "Full-stack developer specializing in React, Next.js, TypeScript, and edge-AI systems. 4+ years of production experience.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Miami",
    addressRegion: "FL",
    addressCountry: "US",
  },
  email: "rodtechdevelopment@gmail.com",
  sameAs: [
    "https://www.github.com/jr132662",
    "https://www.linkedin.com/in/jonathanrodriguezdev",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Python",
    "PostgreSQL",
    "MongoDB",
    "Docker",
    "Computer Vision",
    "Edge AI",
    "TensorRT",
    "NVIDIA Jetson",
    "Supabase",
    "REST APIs",
    "Tailwind CSS",
    "Figma",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Skip to content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-lg focus:text-sm focus:font-medium"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
