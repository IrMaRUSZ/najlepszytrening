'use client';

import { useState, useEffect } from 'react';
import styles from '../styles/CookiePopup.module.css';
import { useAnalyticsConsent } from './analytics/AnalyticsConsentProvider';

// Dodajemy props do komponentu dla większej elastyczności
interface CookiePopupProps {
  delay?: number; // czas opóźnienia w ms
}

const CookiePopup = ({ delay = 1000 }: CookiePopupProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { isReady, hasDecision, savePreferences } = useAnalyticsConsent();

  useEffect(() => {
    if (!isReady || hasDecision) return;
    const timeoutId = window.setTimeout(() => setIsVisible(true), delay);
    return () => window.clearTimeout(timeoutId);
  }, [delay, hasDecision, isReady]);

  const handleConsent = (isAccepted: boolean) => {
    savePreferences({ necessary: true, analytics: isAccepted, marketing: false });
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.cookiePopup} role="dialog" aria-labelledby="cookie-popup-title">
      <p id="cookie-popup-title">
        Ta strona używa plików cookie do analizy ruchu i personalizacji treści. 
        Możesz zaakceptować lub odrzucić ich użycie.
      </p>
      <div className={styles.buttonContainer}>
        <button 
          onClick={() => handleConsent(true)} 
          className={styles.acceptButton}
          aria-label="Zaakceptuj pliki cookie"
        >
          Akceptuję
        </button>
        <button 
          onClick={() => handleConsent(false)} 
          className={styles.rejectButton}
          aria-label="Odrzuć pliki cookie"
        >
          Odrzucam
        </button>
      </div>
    </div>
  );
};

export default CookiePopup;
