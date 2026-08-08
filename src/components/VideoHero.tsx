import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useVelocity,
  useSpring,
  useMotionTemplate,
} from 'framer-motion';
import { useRef } from 'react';
import styles from './VideoHero.module.css';

export function VideoHero() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // 滚动提示层：上移 + 淡出
  const hintY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // 速度模糊（仅 scrollText）
  const velocity = useVelocity(scrollYProgress);
  const blurRaw = useTransform(velocity, [-0.5, 0, 0.5], [6, 0, 6]);
  const blurSpring = useSpring(blurRaw, { stiffness: 200, damping: 30 });
  const textFilter = useMotionTemplate`blur(${blurSpring}px)`;

  return (
    <div ref={ref} className={styles.wrap}>
      <motion.div
        className={styles.scrollHint}
        style={
          prefersReducedMotion
            ? undefined
            : { y: hintY, opacity: hintOpacity }
        }
        aria-hidden="true"
      >
        <motion.span
          className={styles.scrollText}
          style={prefersReducedMotion ? undefined : { filter: textFilter }}
        >
          向下滚动
        </motion.span>
        <span className={styles.scrollLine} />
      </motion.div>
    </div>
  );
}
