'use client';

import Script from 'next/script'

interface GoogleAnalyticsProps {
  measurementId: string;
}

const GoogleAnalytics = ({ measurementId }: GoogleAnalyticsProps) => {
  if (!measurementId) return null;

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
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
            send_page_view: true,
            cookie_domain: 'najlepszytrening.pl'
          });
        `}
      </Script>
    </>
  )
}

export default GoogleAnalytics