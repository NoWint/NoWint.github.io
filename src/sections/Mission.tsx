import { motion, useScroll, useTransform, useMotionTemplate, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { ChapterMark } from '../components/ChapterMark';
import styles from './Mission.module.css';

const EXPLORES = [
  '信息如何更加自由地流动',
  '人与机器如何更加自然地协作',
  '个体如何拥有更强大的创造能力',
  '软件如何成为人类认知的延伸',
];

const BUILDS = [
  '连接人与智能的系统',
  '增强创造力的工具',
  '面向未来的软件基础设施',
];

function BuildLine({ build, index, total, scrollYProgress, prefersReducedMotion }: {
  build: string;
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
    <motion.div
      className={styles.build}
      style={prefersReducedMotion ? { opacity } : { opacity, y, filter }}
    >
      {build}
    </motion.div>
  );
}

export function Mission() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  return (
    <section id="mission" ref={ref} className="section">
      <div className="container">
        <ChapterMark num="05" title="Mission" />
        <div className={styles.kicker}>Build The Future of Digital Creation</div>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          构建数字创造的未来
        </motion.h2>
        <p className={styles.lede}>我们的目标不是简单创造新的应用。而是探索:</p>
        <div className={styles.grid}>
          {EXPLORES.map((e, i) => (
            <motion.div
              key={e}
              className={styles.item}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
            >
              {e}
            </motion.div>
          ))}
        </div>
        <div className={styles.builds}>
          {BUILDS.map((b, i) => (
            <BuildLine
              key={b}
              build={b}
              index={i}
              total={BUILDS.length}
              scrollYProgress={scrollYProgress}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
