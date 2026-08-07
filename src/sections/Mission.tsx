import { motion } from 'framer-motion';
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

export function Mission() {
  return (
    <section id="mission" className="section">
      <div className="container">
        <ChapterMark num="05" title="Mission" />
        <div className={styles.kicker}>Build The Future of Digital Creation</div>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
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
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
            >
              {e}
            </motion.div>
          ))}
        </div>
        <div className={styles.builds}>
          {BUILDS.map((b, i) => (
            <motion.div
              key={b}
              className={styles.build}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
            >
              {b}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
