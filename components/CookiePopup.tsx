'use client';

import { useState, useEffect, useRef } from 'react';
import styles from '../styles/CookiePopup.module.css';
import { useAnalyticsConsent } from './analytics/AnalyticsConsentProvider';

// Dodajemy props do komponentu dla większej elastyczności
interface CookiePopupProps {
  delay?: number; // czas opóźnienia w ms
}

const CookiePopup = ({ delay = 0 }: CookiePopupProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const acceptButtonRef = useRef<HTMLButtonElement>(null);
  const { isReady, hasDecision, savePreferences } = useAnalyticsConsent();

  useEffect(() => {
    if (!isReady || hasDecision) return;
    const timeoutId = window.setTimeout(() => setIsVisible(true), delay);
    return () => window.clearTimeout(timeoutId);
  }, [delay, hasDecision, isReady]);

  useEffect(() => {
    if (!isVisible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    acceptButtonRef.current?.focus();

    const keepFocusInsideModal = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        return;
      }
      if (event.key !== 'Tab' || !modalRef.current) return;

      const focusableElements = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', keepFocusInsideModal);

    return () => {
      document.removeEventListener('keydown', keepFocusInsideModal);
      document.body.style.overflow = previousOverflow;
    };
  }, [isVisible]);

  const handleConsent = (isAccepted: boolean) => {
    savePreferences({ necessary: true, analytics: isAccepted, marketing: false });
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.cookieOverlay}>
      <div
        ref={modalRef}
        className={styles.cookiePopup}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-popup-title"
        aria-describedby="cookie-popup-description"
      >
        <h2 id="cookie-popup-title">Wybierz ustawienia cookies</h2>
        <p id="cookie-popup-description">
          Niezbędne pliki cookie zapewniają działanie strony. Za Twoją zgodą użyjemy także
          plików analitycznych, aby mierzyć ruch i skuteczność strony.
        </p>
        <a href="/prywatnosc" target="_blank" rel="noopener noreferrer" className={styles.privacyLink}>
          Przeczytaj politykę prywatności
        </a>
        <div className={styles.buttonContainer}>
          <button
            ref={acceptButtonRef}
            onClick={() => handleConsent(true)}
            className={`${styles.button} ${styles.acceptButton}`}
          >
            Akceptuję analityczne cookies
          </button>
          <button
            onClick={() => handleConsent(false)}
            className={`${styles.button} ${styles.rejectButton}`}
          >
            Odrzucam analityczne cookies
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookiePopup;
