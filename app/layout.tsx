import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jonathanrodriguez.dev";

export const metadata: Metadata = {
  title: "Jonathan Rodriguez — Full-Stack Developer & UI/UX Engineer",
  description:
    "React-focused full-stack developer building production-ready kiosks, edge AI analytics, and enterprise dashboards. Based in Miami.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Jonathan Rodriguez — Full-Stack Developer & UI/UX Engineer",
    description:
      "React-focused full-stack developer building production-ready kiosks, edge AI analytics, and enterprise dashboards.",
    url: siteUrl,
    type: "website",
    locale: "en_US",
    siteName: "Jonathan Rodriguez Portfolio",
    images: [
      {
        url: "/images/optimized/dashboard.webp",
        width: 1200,
        height: 630,
        alt: "Jonathan Rodriguez — Full-Stack Developer & UI/UX Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jonathan Rodriguez — Full-Stack Developer & UI/UX Engineer",
    description:
      "React-focused full-stack developer building production-ready kiosks, edge AI analytics, and enterprise dashboards.",
    images: ["/images/optimized/dashboard.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "theme-color": "#000000",
  },
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
