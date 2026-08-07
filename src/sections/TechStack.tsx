import { motion } from 'framer-motion';
import { ChapterMark } from '../components/ChapterMark';
import { MonoTable } from '../components/MonoTable';
import styles from './TechStack.module.css';

const COLUMNS = [
  { title: 'Languages', items: ['Rust', 'TypeScript', 'Python', 'C++', 'Java'] },
  {
    title: 'Fields',
    items: [
      'Distributed Systems',
      'Artificial Intelligence',
      'Agent Architecture',
      'Desktop Applications',
      'Human Computer Interaction',
      'Neuroscience Computing',
      'Developer Tools',
    ],
  },
];

export function TechStack() {
  return (
    <section id="stack" className="section section-sm">
      <div className="container">
        <ChapterMark num="09" title="Stack" />
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          技术栈
        </motion.h2>
        <MonoTable columns={COLUMNS} />
      </div>
    </section>
  );
}
