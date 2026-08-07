import type { ReactNode } from 'react';
import styles from './TwoCol.module.css';

interface TwoColProps {
  left: ReactNode;
  right: ReactNode;
}

export function TwoCol({ left, right }: TwoColProps) {
  return (
    <div className={styles.row}>
      <div className={styles.col}>{left}</div>
      <div className={styles.col}>{right}</div>
    </div>
  );
}
