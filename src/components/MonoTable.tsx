import { motion } from 'framer-motion';
import styles from './MonoTable.module.css';

interface Column {
  title: string;
  items: string[];
}

interface MonoTableProps {
  columns: Column[];
}

export function MonoTable({ columns }: MonoTableProps) {
  return (
    <div className={styles.grid}>
      {columns.map((col, ci) => (
        <motion.div
          key={col.title}
          className={styles.col}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: ci * 0.1 }}
        >
          <div className={styles.title}>{col.title}</div>
          <ul className={styles.list}>
            {col.items.map((item) => (
              <li key={item} className={styles.item}>{item}</li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
