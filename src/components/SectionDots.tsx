import { useEffect, useState } from 'react';
import styles from './SectionDots.module.css';

interface SectionDotsProps {
  sections: Array<{ id: string; label: string }>;
}

export function SectionDots({ sections }: SectionDotsProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? '');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveId(s.id);
          });
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  return (
    <div className={styles.dots} aria-label="章节导航">
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={`${styles.dot} ${activeId === s.id ? styles.active : ''}`}
          aria-label={s.label}
          title={s.label}
          aria-current={activeId === s.id ? 'true' : undefined}
        />
      ))}
    </div>
  );
}
