import { VideoHero } from '../components/VideoHero';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <VideoHero />
    </section>
  );
}
