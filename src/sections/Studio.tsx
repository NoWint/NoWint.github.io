import { motion, useScroll, useTransform, useMotionTemplate, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { ChapterMark } from '../components/ChapterMark';
import { Blockquote } from '../components/Blockquote';
import styles from './Studio.module.css';

const ERAS = [
  { name: '个人计算机', note: '软件作为被动工具' },
  { name: '移动互联网', note: '软件作为随身服务' },
  { name: '人工智能时代', note: '软件作为主动协作者' },
];

function EraLine({ era, index, total, scrollYProgress, prefersReducedMotion }: {
  era: { name: string; note: string };
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
      className={styles.era}
      style={prefersReducedMotion ? { opacity } : { opacity, y, filter }}
    >
      <div className={styles.eraName}>{era.name}</div>
      <div className={styles.eraNote}>{era.note}</div>
    </motion.div>
  );
}

export function Studio() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  return (
    <section id="studio" ref={ref} className="section section-lg">
      <div className="container">
        <ChapterMark num="04" title="Studio" />
        <div className={styles.logo}>
          <span className={styles.prompt}>&gt;_</span>
          <span className={styles.name}>PleaseEnterYourText</span>
        </div>
        <div className={styles.kicker}>Independent Technology Studio</div>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          构建面向未来的软件与智能系统
        </motion.h2>
        <p className={styles.text}>
          PleaseEnterYourText(PEYT)是一间独立技术工作室。我们探索软件、人工智能与人类创造力之间的新型关系,并尝试构建下一代数字基础设施。
        </p>
        <div className={styles.spacer} />
        <Blockquote>
          每一次计算范式的变化,都会重新定义人与技术之间的连接方式。
        </Blockquote>
        <p className={styles.text}>
          从个人计算机,到移动互联网,再到人工智能时代,软件正在从被动工具逐渐演变为主动协作者。PEYT 致力于探索这一过程中尚未被定义的可能性。
        </p>
        <div className={styles.eras}>
          {ERAS.map((era, i) => (
            <EraLine
              key={era.name}
              era={era}
              index={i}
              total={ERAS.length}
              scrollYProgress={scrollYProgress}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
