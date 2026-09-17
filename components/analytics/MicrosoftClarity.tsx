'use client';

import Script from 'next/script';
import { useAnalyticsConsent } from './AnalyticsConsentProvider';

export default function MicrosoftClarity({ clarityId }: { clarityId: string }) {
  const { preferences, isReady } = useAnalyticsConsent();

  if (!clarityId || !isReady || !preferences.analytics) return null;

  return (
    <Script
      id="microsoft-clarity-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${clarityId}");
        `,
      }}
    />
  );
}
