import { motion, useScroll, useTransform, useMotionTemplate, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { ChapterMark } from '../components/ChapterMark';
import { Blockquote } from '../components/Blockquote';
import styles from './Intro.module.css';

const FIELDS = [
  '人工智能与智能体系统',
  '分布式通信架构',
  '跨平台软件工程',
  '人机交互设计',
  '脑科学与计算认知',
];

export function Intro() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  return (
    <section id="intro" ref={ref} className="section section-lg">
      <div className="container-narrow">
        <ChapterMark num="02" title="Intro" />
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          探索智能、系统与人类创造力的交汇点
        </motion.h2>
        <p className={styles.lede}>
          我是一名独立开发者、系统设计者与技术探索者。
        </p>
        <p className={styles.text}>
          我关注软件、人工智能与人类认知之间的深层连接,并尝试通过工程实践探索下一代计算系统的可能形态。我的工作横跨:
        </p>
        <p className={styles.fields}>
          {FIELDS.map((line, i) => {
            const start = (i / FIELDS.length) * 0.5;
            const end = ((i + 1) / FIELDS.length) * 0.5;
            const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
            const y = useTransform(scrollYProgress, [start, end], [40, 0]);
            const blur = useTransform(scrollYProgress, [start, end], [8, 0]);
            const filter = useMotionTemplate`blur(${blur}px)`;
            return (
              <motion.span
                key={i}
                className={styles.field}
                style={prefersReducedMotion ? { opacity } : { opacity, y, filter }}
              >
                {line}{' '}
              </motion.span>
            );
          })}
        </p>
        <div className={styles.spacer} />
        <Blockquote>
          技术的价值不仅在于解决已有问题,而在于重新定义未来的问题边界。
        </Blockquote>
      </div>
    </section>
  );
}
