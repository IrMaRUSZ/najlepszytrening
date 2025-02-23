'use client';

import { useState, useEffect } from 'react';
import styles from '../styles/CookiePopup.module.css';

// Definiujemy typ dla funkcji callback
type CookieConsentCallback = (isAccepted: boolean) => void;

// Definiujemy interfejs dla window
declare global {
  interface Window {
    handleCookieConsent?: CookieConsentCallback;
  }
}

// Dodajemy props do komponentu dla większej elastyczności
interface CookiePopupProps {
  delay?: number; // czas opóźnienia w ms
  onConsent?: CookieConsentCallback; // callback dla nadrzędnego komponentu
}

const CookiePopup = ({ delay = 1000, onConsent }: CookiePopupProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Sprawdzamy czy zgoda już istnieje
    const checkConsent = () => {
      try {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
          setTimeout(() => setIsVisible(true), delay);
        }
      } catch (error) {
        // Obsługa błędu gdy localStorage jest niedostępny
        console.warn('Nie można uzyskać dostępu do localStorage:', error);
        setIsVisible(true);
      }
    };

    checkConsent();
  }, [delay]);

  const handleConsent = (isAccepted: boolean) => {
    try {
      localStorage.setItem('cookieConsent', isAccepted ? 'granted' : 'denied');
      setIsVisible(false);

      // Wywołujemy oba callbacki
      if (window.handleCookieConsent) {
        window.handleCookieConsent(isAccepted);
      }
      
      if (onConsent) {
        onConsent(isAccepted);
      }
    } catch (error) {
      console.warn('Nie można zapisać zgody w localStorage:', error);
    }
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