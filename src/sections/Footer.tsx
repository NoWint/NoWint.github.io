import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer id="footer" className={styles.footer}>
      <div className="container">
        <div className={styles.logo}>
          <span className={styles.prompt}>&gt;_</span>
          <span className={styles.name}>PleaseEnterYourText</span>
        </div>
        <h2 className={styles.identity}>Xia Tian</h2>
        <p className={styles.role}>Founder of PleaseEnterYourText</p>
        <p className={styles.roles}>Independent Developer · System Builder · Future Explorer</p>
      </div>
    </footer>
  );
}
