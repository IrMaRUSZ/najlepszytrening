'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export interface CookiePreferences {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
}

interface AnalyticsConsentContextValue {
  preferences: CookiePreferences;
  isReady: boolean;
  hasDecision: boolean;
  savePreferences: (preferences: CookiePreferences) => void;
}

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

const AnalyticsConsentContext = createContext<AnalyticsConsentContextValue | null>(null);

export function AnalyticsConsentProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const [isReady, setIsReady] = useState(false);
  const [hasDecision, setHasDecision] = useState(false);

  useEffect(() => {
    try {
      const storedPreferences = localStorage.getItem('cookiePreferences');
      if (storedPreferences) {
        const parsed = JSON.parse(storedPreferences) as Partial<CookiePreferences>;
        setPreferences({
          necessary: true,
          analytics: parsed.analytics === true,
          marketing: parsed.marketing === true,
        });
        setHasDecision(true);
      } else {
        const legacyConsent = localStorage.getItem('cookieConsent');
        if (legacyConsent === 'granted' || legacyConsent === 'denied') {
          const migratedPreferences: CookiePreferences = {
            necessary: true,
            analytics: legacyConsent === 'granted',
            marketing: false,
          };
          localStorage.setItem('cookiePreferences', JSON.stringify(migratedPreferences));
          setPreferences(migratedPreferences);
          setHasDecision(true);
        }
      }
    } catch (error) {
      console.warn('Nie można odczytać ustawień plików cookie:', error);
    } finally {
      setIsReady(true);
    }
  }, []);

  const savePreferences = (nextPreferences: CookiePreferences) => {
    const normalized: CookiePreferences = { ...nextPreferences, necessary: true };
    try {
      localStorage.setItem('cookiePreferences', JSON.stringify(normalized));
      localStorage.setItem('cookieConsent', normalized.analytics ? 'granted' : 'denied');
    } catch (error) {
      console.warn('Nie można zapisać ustawień plików cookie:', error);
    }
    setPreferences(normalized);
    setHasDecision(true);
  };

  const value = useMemo(() => ({
    preferences,
    isReady,
    hasDecision,
    savePreferences,
  }), [preferences, isReady, hasDecision]);

  return (
    <AnalyticsConsentContext.Provider value={value}>
      {children}
    </AnalyticsConsentContext.Provider>
  );
}

export function useAnalyticsConsent() {
  const context = useContext(AnalyticsConsentContext);
  if (!context) {
    throw new Error('useAnalyticsConsent wymaga AnalyticsConsentProvider');
  }
  return context;
}
