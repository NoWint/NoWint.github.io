import { motion, useScroll, useTransform, useMotionTemplate, useReducedMotion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ChapterMark } from '../components/ChapterMark';
import { useCountUp } from '../hooks/useCountUp';
import styles from './Vision.module.css';

const LAYERS = ['人类认知的延伸', '创造力的放大器', '人与世界连接的新接口'];

function LayerLine({ layer, index, total, scrollYProgress, prefersReducedMotion }: {
  layer: string;
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
    <motion.li
      className={styles.layer}
      style={prefersReducedMotion ? { opacity } : { opacity, y, filter }}
    >
      {layer}
    </motion.li>
  );
}

export function Vision() {
  const ref = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const cardY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const inView = useInView(cardRef, { once: true, margin: '-15%' });
  const projectCount = useCountUp(4, 1.5, inView);
  const chapterCount = useCountUp(12, 1.5, inView);

  return (
    <section id="vision" className="section section-xl" ref={ref}>
      <div className="container">
        <ChapterMark num="11" title="Vision" variant="emphasis" />
        <div className={styles.kicker}>Building The Next Layer of Computing</div>
        <motion.div style={{ y: prefersReducedMotion ? undefined : cardY }}>
          <motion.div
            ref={cardRef}
            className={styles.card}
            initial={{ opacity: 0, scale: 0.95, rotateX: 8 }}
            whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformPerspective: 1000 }}
          >
            <div className={styles.cardKicker}>VISION</div>
            <h2 className={styles.cardTitle}>未来的软件不会只是工具。</h2>
            <p className={styles.cardLead}>它将成为:</p>
            <ul className={styles.layers}>
              {LAYERS.map((l, i) => (
                <LayerLine
                  key={l}
                  layer={l}
                  index={i}
                  total={LAYERS.length}
                  scrollYProgress={scrollYProgress}
                  prefersReducedMotion={prefersReducedMotion}
                />
              ))}
            </ul>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNum}>{projectCount}</span>
                <span className={styles.statLabel}>PROJECTS</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>{chapterCount}</span>
                <span className={styles.statLabel}>CHAPTERS</span>
              </div>
            </div>
            <p className={styles.cardCoda}>
              PleaseEnterYourText 希望成为探索这一未来的一部分。
            </p>
            <p className={styles.cardCoda}>
              通过代码、系统与思想,构建下一代数字世界。
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
