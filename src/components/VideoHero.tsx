import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import styles from './VideoHero.module.css';

export function VideoHero() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 0.6]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <div ref={ref} className={styles.wrap}>
      <motion.video
        className={styles.video}
        src="/Xiatian.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={prefersReducedMotion ? undefined : { scale, y }}
        aria-hidden="true"
      />
      <motion.div
        className={styles.overlay}
        style={prefersReducedMotion ? undefined : { opacity: overlayOpacity }}
        aria-hidden="true"
      />
      <div className={styles.bottomFade} aria-hidden="true" />
      <motion.div
        className={styles.scrollHint}
        style={prefersReducedMotion ? undefined : { opacity: hintOpacity }}
        aria-hidden="true"
      >
        <span className={styles.scrollText}>向下滚动</span>
        <span className={styles.scrollLine} />
      </motion.div>
    </div>
  );
}
