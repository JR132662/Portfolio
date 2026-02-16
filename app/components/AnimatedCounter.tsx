'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface AnimatedCounterProps {
  value: string; // e.g. "4+", "30+", "80k+", "100s"
  className?: string;
  duration?: number;
}

/**
 * Animates a numeric value from 0 to a target when it enters the viewport.
 * Parses numbers from strings like "4+", "30+", "80k+", "100s".
 */
export default function AnimatedCounter({
  value,
  className = '',
  duration = 2,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(value);

  useGSAP(() => {
    if (!ref.current) return;

    // Parse the numeric part
    const match = value.match(/^(\d+)/);
    if (!match) return;

    const target = parseInt(match[1], 10);
    const suffix = value.replace(/^\d+/, ''); // e.g. "+", "k+", "s"

    // Determine if there's a multiplier (k = 1000)
    const hasK = suffix.startsWith('k');
    const displaySuffix = suffix;

    const counter = { val: 0 };

    gsap.to(counter, {
      val: target,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        once: true,
      },
      onUpdate: () => {
        const rounded = Math.round(counter.val);
        if (hasK) {
          setDisplayValue(`${rounded}${displaySuffix}`);
        } else {
          setDisplayValue(`${rounded}${displaySuffix}`);
        }
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, { dependencies: [value, duration] });

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}
