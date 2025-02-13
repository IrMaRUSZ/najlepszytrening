'use client';
import { useEffect, useState } from 'react';
import styles from '../styles/CookiePopup.module.css';

const CookiePopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAcceptedCookies = localStorage.getItem('cookieConsent');
    if (!hasAcceptedCookies) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  const rejectCookies = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.cookiePopup}>
      <div className={styles.cookieContent}>
        <p className={styles.cookieText}>
          Pomóż nam ulepszyć i dostosować Twoje doświadczenie.
          Korzystamy z plików cookies, aby zapewnić pełną funkcjonalność naszej witryny,
          dostosować jej obsługę, przeprowadzać analizy i wyświetlać spersonalizowane reklamy.
          Zapoznaj się z naszą <a href="/prywatnosc" className={styles.privacyLink}>polityką prywatności</a>.
        </p>
        <div className={styles.buttonContainer}>
          <button onClick={acceptCookies} className={styles.acceptButton}>Zaakceptuj wszystkie pliki cookie</button>
          <button onClick={rejectCookies} className={styles.rejectButton}>Odrzuć wszystkie</button>
        </div>
        <a href="/cookie-settings" className={styles.settingsLink}>Ustawienia plików cookie</a>
      </div>
    </div>
  );
};

export default CookiePopup;
