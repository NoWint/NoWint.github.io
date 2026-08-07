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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} aria-label="主导航">
      <a href="#hero" className={styles.logoLink} aria-label=">_ PleaseEnterYourText">
        <span className={styles.logoPrompt}>&gt;_</span>
        <span className={styles.logoText}>PleaseEnterYourText</span>
      </a>
      <ul className={styles.links}>
        {LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href} className={styles.link}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
