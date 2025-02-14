'use client';

import { useState, useEffect } from 'react';
import styles from '../styles/CookiePopup.module.css';

// Rozszerzamy obiekt Window, aby TypeScript nie zgłaszał błędu
declare global {
  interface Window {
    handleCookieConsent?: (isAccepted: boolean) => void;
  }
}

const CookiePopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleConsent = (isAccepted: boolean) => {
    localStorage.setItem('cookieConsent', isAccepted ? 'granted' : 'denied');
    setIsVisible(false);

    if (window.handleCookieConsent) {
      window.handleCookieConsent(isAccepted);
    }
  };

  if (!isVisible) return null;

  return (
    <div className={styles.cookiePopup}>
      <p>
        Ta strona używa plików cookie do analizy ruchu i personalizacji treści. 
        Możesz zaakceptować lub odrzucić ich użycie.
      </p>
      <button onClick={() => handleConsent(true)} className={styles.acceptButton}>
        Akceptuję
      </button>
      <button onClick={() => handleConsent(false)} className={styles.rejectButton}>
        Odrzucam
      </button>
    </div>
  );
};

export default CookiePopup;
