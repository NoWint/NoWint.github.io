import { motion } from 'framer-motion';
import { ChapterMark } from '../components/ChapterMark';
import { Blockquote } from '../components/Blockquote';
import styles from './BeyondCode.module.css';

const INTERESTS = ['古典音乐与钢琴', '电子游戏创造生态', '视觉设计', '科学探索', '新兴技术趋势'];

const TRIO = [
  { word: '工程', role: '给予结构' },
  { word: '艺术', role: '给予表达' },
  { word: '科学', role: '给予方向' },
];

export function BeyondCode() {
  return (
    <section id="beyond" className="section">
      <div className="container">
        <ChapterMark num="10" title="Beyond Code" />
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          技术之外
        </motion.h2>
        <p className={styles.lede}>技术之外,我关注:</p>
        <div className={styles.tags}>
          {INTERESTS.map((t, i) => (
            <motion.span
              key={t}
              className={styles.tag}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            >
              {t}
            </motion.span>
          ))}
        </div>
        <div className={styles.spacer} />
        <Blockquote>我相信创造力来自不同领域之间的连接。</Blockquote>
        <div className={styles.trio}>
          {TRIO.map((t, i) => (
            <motion.div
              key={t.word}
              className={styles.trioItem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
            >
              <span className={styles.trioWord}>{t.word}</span>
              <span className={styles.trioRole}>{t.role}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
