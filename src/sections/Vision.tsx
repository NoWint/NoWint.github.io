import { motion } from 'framer-motion';
import { ChapterMark } from '../components/ChapterMark';
import styles from './Vision.module.css';

const LAYERS = ['人类认知的延伸', '创造力的放大器', '人与世界连接的新接口'];

export function Vision() {
  return (
    <section id="vision" className="section section-xl">
      <div className="container">
        <ChapterMark num="11" title="Vision" />
        <div className={styles.kicker}>Building The Next Layer of Computing</div>
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.cardKicker}>VISION</div>
          <h2 className={styles.cardTitle}>未来的软件不会只是工具。</h2>
          <p className={styles.cardLead}>它将成为:</p>
          <ul className={styles.layers}>
            {LAYERS.map((l, i) => (
              <motion.li
                key={l}
                className={styles.layer}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
              >
                {l}
              </motion.li>
            ))}
          </ul>
          <p className={styles.cardCoda}>
            PleaseEnterYourText 希望成为探索这一未来的一部分。
          </p>
          <p className={styles.cardCoda}>
            通过代码、系统与思想,构建下一代数字世界。
          </p>
        </motion.div>
      </div>
    </section>
  );
}
