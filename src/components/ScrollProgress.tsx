import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

export function ScrollProgress() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={prefersReducedMotion ? { scaleX: scrollYProgress } : { scaleX }}
      aria-hidden="true"
      data-testid="scroll-progress"
    />
  );
}
