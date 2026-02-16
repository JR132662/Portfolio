'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  const springConfig = { damping: 25, stiffness: 700 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const hasHover = window.matchMedia('(hover: hover)').matches;
    setIsTouch(!hasHover || hasCoarsePointer);
  }, []);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    },
    [cursorX, cursorY]
  );

  useEffect(() => {
    if (isTouch) return;

    document.documentElement.classList.add('custom-cursor-active');

    const addHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest(
          'a, button, [role="button"], input, textarea, select, .skill-tag, .magnetic'
        )
      ) {
        setIsHovering(true);
      }
    };

    const removeHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest(
          'a, button, [role="button"], input, textarea, select, .skill-tag, .magnetic'
        )
      ) {
        setIsHovering(false);
      }
    };

    const hide = () => setIsVisible(false);
    const show = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', addHover, { passive: true });
    document.addEventListener('mouseout', removeHover, { passive: true });
    document.documentElement.addEventListener('mouseleave', hide);
    document.documentElement.addEventListener('mouseenter', show);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', addHover);
      document.removeEventListener('mouseout', removeHover);
      document.documentElement.removeEventListener('mouseleave', hide);
      document.documentElement.removeEventListener('mouseenter', show);
    };
  }, [isTouch, onMouseMove]);

  if (isTouch) return null;

  return (
    <>
      {/* Dot — mix-blend-difference gives the inverted cursor effect */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        aria-hidden
      >
        <motion.div
          animate={{
            width: isHovering ? 56 : 10,
            height: isHovering ? 56 : 10,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 400 }}
          className="rounded-full bg-white"
        />
      </motion.div>

      {/* Glow ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        aria-hidden
      >
        <motion.div
          animate={{
            width: isHovering ? 80 : 36,
            height: isHovering ? 80 : 36,
            opacity: isVisible ? 0.15 : 0,
          }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
          className="rounded-full bg-blue-400 blur-xl"
        />
      </motion.div>
    </>
  );
}
