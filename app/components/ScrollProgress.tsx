'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!barRef.current) return;

    gsap.to(barRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, { dependencies: [] });

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] pointer-events-none">
      <div
        ref={barRef}
        className="h-full w-full origin-left"
        style={{
          transform: 'scaleX(0)',
          background:
            'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)',
          backgroundSize: '200% 100%',
          animation: 'scrollbar-shimmer 3s linear infinite',
        }}
      />
    </div>
  );
}
