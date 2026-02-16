'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Animation direction: 'up' | 'down' | 'left' | 'right' */
  direction?: 'up' | 'down' | 'left' | 'right';
  /** Extra delay (seconds) */
  delay?: number;
  /** Duration (seconds) */
  duration?: number;
  /** Distance in px */
  distance?: number;
  /** When true, staggers direct children instead of animating the wrapper */
  stagger?: number;
  /** ScrollTrigger start position */
  start?: string;
  /** Whether to also apply a slight scale */
  scale?: boolean;
  /** HTML tag */
  as?: React.ElementType;
}

/**
 * GSAP ScrollTrigger-powered reveal animation.
 * Drop-in replacement for framer-motion useInView patterns.
 */
export default function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = 60,
  stagger,
  start = 'top 85%',
  scale = false,
  as: Tag = 'div',
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const directionMap = {
      up: { y: distance, x: 0 },
      down: { y: -distance, x: 0 },
      left: { x: distance, y: 0 },
      right: { x: -distance, y: 0 },
    };

    const { x, y } = directionMap[direction];

    const targets = stagger
      ? ref.current.children
      : ref.current;

    gsap.fromTo(
      targets,
      {
        y,
        x,
        opacity: 0,
        ...(scale ? { scale: 0.95 } : {}),
      },
      {
        y: 0,
        x: 0,
        opacity: 1,
        ...(scale ? { scale: 1 } : {}),
        duration,
        delay,
        ease: 'power3.out',
        ...(stagger ? { stagger } : {}),
        scrollTrigger: {
          trigger: ref.current,
          start,
          once: true,
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, { scope: ref, dependencies: [direction, delay, duration, distance, stagger, start, scale] });

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
