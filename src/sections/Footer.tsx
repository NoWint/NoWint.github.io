import { motion } from 'framer-motion';
import { useTypewriter } from '../hooks/useTypewriter';
import styles from './Footer.module.css';

const ROLES = [
  'Independent Developer',
  'System Builder',
  'Future Explorer',
];

export function Footer() {
  const brand = useTypewriter('>_ PleaseEnterYourText', 60, true);

  return (
    <footer id="footer" className={`section section-lg ${styles.footer}`}>
      <div className="container">
        <motion.div
          className={styles.logo}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.prompt}>{brand}</span>
        </motion.div>
        <motion.h2
          className={styles.identity}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          Xia Tian
        </motion.h2>
        <motion.p
          className={styles.role}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
        >
          Founder of PleaseEnterYourText
        </motion.p>
        <div className={styles.roles}>
          {ROLES.map((r, i) => (
            <motion.span
              key={r}
              className={styles.roleTag}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.9 + i * 0.15 }}
            >
              {r}
            </motion.span>
          ))}
        </div>
      </div>
    </footer>
  );
}
