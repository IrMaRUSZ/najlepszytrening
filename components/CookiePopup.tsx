'use client';
import { useState, useEffect } from 'react';
import styles from '../styles/CookiePopup.module.css';

const CookiePopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'granted');
    setIsVisible(false);

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'ad_storage': 'granted',
        'analytics_storage': 'granted',
      });
    }
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'denied');
    setIsVisible(false);

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'ad_storage': 'denied',
        'analytics_storage': 'denied',
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className={styles.cookiePopup}>
      <p>Ta strona używa plików cookie do analizy ruchu i reklam. Czy zgadzasz się na ich używanie?</p>
      <button onClick={handleAccept} className={styles.acceptButton}>Akceptuję</button>
      <button onClick={handleReject} className={styles.rejectButton}>Odrzucam</button>
    </div>
  );
};

export default CookiePopup;
