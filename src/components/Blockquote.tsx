import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import styles from './Blockquote.module.css';

interface BlockquoteProps {
  children: ReactNode;
}

export function Blockquote({ children }: BlockquoteProps) {
  return (
    <div className={styles.wrap}>
      <motion.div
        className={styles.rule}
        initial={{ height: 0 }}
        whileInView={{ height: '100%' }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      />
      <motion.blockquote
        className={styles.quote}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        {children}
      </motion.blockquote>
    </div>
  );
}
