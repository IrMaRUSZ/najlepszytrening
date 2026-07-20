import Link from 'next/link';
import styles from '../styles/Footer.module.css';

const toolLinks = [
  { href: '/narzedzia/bmi', label: 'Kalkulator BMI' },
  { href: '/narzedzia/bodyfat', label: 'Kalkulator tkanki tłuszczowej' },
  { href: '/narzedzia/onerepmax', label: 'Kalkulator maksymalnego ciężaru' },
  { href: '/narzedzia/Kalkulator-zapotrzebowania-kalorycznego', label: 'Kalkulator zapotrzebowania kalorycznego' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandColumn}>
          <Link href="/" className={styles.brand}>Najlepszy Trening</Link>
          <p>Trening personalny w Łodzi prowadzony przez fizjoterapeutę.</p>
        </div>

        <nav className={styles.linkColumn} aria-label="Kalkulatory treningowe">
          <h2>Kalkulatory</h2>
          {toolLinks.map((link) => (
            <Link key={link.href} href={link.href}>{link.label}</Link>
          ))}
        </nav>

        <nav className={styles.linkColumn} aria-label="Pozostałe przydatne strony">
          <h2>Przydatne strony</h2>
          <Link href="/narzedzia">Wszystkie narzędzia</Link>
          <Link href="/quiz">Quiz treningowy</Link>
          <Link href="/prywatnosc">Polityka prywatności</Link>
          <Link href="/cookie-settings">Ustawienia cookies</Link>
        </nav>
      </div>
    </footer>
  );
}
