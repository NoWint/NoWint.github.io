import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { useEffect } from 'react';

export function ScrollProgress() {
  const prefersReducedMotion = useReducedMotion();
  const scrollProgress = useMotionValue(0);
  const scaleX = useSpring(scrollProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.set(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollProgress]);

  return (
    <motion.div
      style={prefersReducedMotion ? { scaleX: scrollProgress } : { scaleX }}
      aria-hidden="true"
      data-testid="scroll-progress"
    />
  );
}
