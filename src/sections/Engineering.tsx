import { motion } from 'framer-motion';
import { ChapterMark } from '../components/ChapterMark';
import { TwoCol } from '../components/TwoCol';
import styles from './Engineering.module.css';

const PILLARS = ['极简主义', '工业设计语言', '未来科技美学', '高性能交互体验'];

export function Engineering() {
  return (
    <section id="engineering" className="section">
      <div className="container">
        <ChapterMark num="08" title="Engineering" />
        <TwoCol
          left={
            <>
              <div className={styles.kicker}>Technology Should Be Invisible, But Its Impact Should Be Obvious.</div>
              <motion.h2
                className={styles.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-15%' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                技术应当隐形,但其影响应当显著。
              </motion.h2>
              <p className={styles.text}>
                优秀的软件应该同时拥有深度的工程能力与简洁的用户体验。我的设计理念融合:
              </p>
            </>
          }
          right={
            <ul className={styles.pillars}>
              {PILLARS.map((p, i) => (
                <motion.li
                  key={p}
                  className={styles.pillar}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                >
                  {p}
                </motion.li>
              ))}
            </ul>
          }
        />
        <motion.p
          className={styles.coda}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          复杂的系统应该拥有简单的表达。
        </motion.p>
      </div>
    </section>
  );
}
