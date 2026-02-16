'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

interface TextRevealProps {
  children: string;
  className?: string;
  /** Extra class applied to each inner word span (useful for gradient text) */
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

/**
 * Splits text into words and animates each word upward
 * with a staggered clip-path reveal — a signature GSAP effect.
 */
export default function TextReveal({
  children,
  className = '',
  wordClassName = '',
  delay = 0,
  stagger = 0.08,
  as: Tag = 'span',
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const words = containerRef.current.querySelectorAll('.gsap-word');
      if (!words.length) return;

      gsap.fromTo(
        words,
        {
          y: '110%',
          opacity: 0,
          rotateX: -80,
        },
        {
          y: '0%',
          opacity: 1,
          rotateX: 0,
          duration: 0.9,
          stagger,
          delay,
          ease: 'power3.out',
        }
      );
    },
    { scope: containerRef, dependencies: [delay, stagger] }
  );

  const words = children.split(' ');

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={containerRef} className={className} style={{ perspective: '600px' }}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: '0.1em' }}
        >
          <span
            className={`gsap-word inline-block ${wordClassName}`}
            style={{ transformOrigin: 'center bottom' }}
          >
            {word}
          </span>
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
}
