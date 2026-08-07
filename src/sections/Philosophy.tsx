import { motion, useScroll, useTransform, useMotionTemplate, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { ChapterMark } from '../components/ChapterMark';
import styles from './Philosophy.module.css';

const LINES = [
  '面对一个复杂系统,',
  '我不会只关注它当前的实现,',
  '而会追问:',
  '它为什么这样存在?',
  '它解决的本质问题是什么?',
  '如果从零开始设计,',
  '是否能够构建更优雅、更开放、更强大的结构?',
];

const DIRECTIONS = [
  '更开放的信息基础设施',
  '更智能的软件系统',
  '更自然的人机协作方式',
  '更强大的创造工具',
];

function PhilosophyLine({ line, index, total, scrollYProgress, prefersReducedMotion }: {
  line: string;
  index: number;
  total: number;
  scrollYProgress: import('framer-motion').MotionValue<number>;
  prefersReducedMotion: boolean | null;
}) {
  const start = (index / total) * 0.5;
  const end = ((index + 1) / total) * 0.5;
  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
  const y = useTransform(scrollYProgress, [start, end], [40, 0]);
  const blur = useTransform(scrollYProgress, [start, end], [8, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;
  return (
    <motion.span
      className={styles.line}
      style={prefersReducedMotion ? { opacity } : { opacity, y, filter }}
    >
      {line}{' '}
    </motion.span>
  );
}

export function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  return (
    <section id="philosophy" ref={ref} className="section">
      <div className="container-narrow">
        <ChapterMark num="03" title="Philosophy" />
        <div className={styles.kicker}>From First Principles</div>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          从第一性原理出发
        </motion.h2>
        <p className={styles.text}>
          {LINES.map((line, i) => (
            <PhilosophyLine
              key={i}
              line={line}
              index={i}
              total={LINES.length}
              scrollYProgress={scrollYProgress}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </p>
        <div className={styles.directions}>
          {DIRECTIONS.map((d, i) => (
            <motion.div
              key={d}
              className={styles.direction}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            >
              {d}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
