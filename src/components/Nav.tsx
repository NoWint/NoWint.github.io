import { useEffect, useState } from 'react';
import styles from './Nav.module.css';

const LINKS = [
  { href: '#hero', label: '首页' },
  { href: '#philosophy', label: '哲学' },
  { href: '#studio', label: '工作室' },
  { href: '#research', label: '研究' },
  { href: '#projects', label: '项目' },
  { href: '#vision', label: '愿景' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState('#hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    LINKS.forEach((link) => {
      const id = link.href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveHref(link.href);
          });
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} aria-label="主导航">
      <a href="#hero" className={styles.logoLink} aria-label="XiaTian">
        <span className={styles.logoText}>XiaTian</span>
      </a>
      <ul className={styles.links}>
        {LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className={`${styles.link} ${activeHref === link.href ? styles.linkActive : ''}`}
              aria-current={activeHref === link.href ? 'true' : undefined}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
