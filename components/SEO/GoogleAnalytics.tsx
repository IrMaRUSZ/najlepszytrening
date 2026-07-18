'use client';

import { useEffect } from 'react'
import Script from 'next/script'
import { useAnalyticsConsent } from '../analytics/AnalyticsConsentProvider'

interface GoogleAnalyticsProps {
  measurementId: string;
}

const GoogleAnalytics = ({ measurementId }: GoogleAnalyticsProps) => {
  const { preferences, isReady } = useAnalyticsConsent();

  useEffect(() => {
    if (!isReady || typeof window.gtag !== 'function') return;
    window.gtag('consent', 'update', {
      analytics_storage: preferences.analytics ? 'granted' : 'denied',
    });
  }, [isReady, preferences.analytics]);

  if (!measurementId || !isReady || !preferences.analytics) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', { analytics_storage: 'granted' });
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
            send_page_view: true,
            cookie_domain: 'najlepszytrening.pl',
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  )
}

export default GoogleAnalytics
