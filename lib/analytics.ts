export interface CalendlyEventParameters {
  cta_source: string;
  page_path: string;
  service_type: string;
  cta_label: string;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function hasAnalyticsConsent() {
  try {
    const stored = localStorage.getItem('cookiePreferences');
    if (!stored) return false;
    return JSON.parse(stored)?.analytics === true;
  } catch {
    return false;
  }
}

export function trackGAEvent(
  eventName: 'calendly_cta_click' | 'calendly_event_scheduled',
  parameters: Record<string, unknown>,
  eventCallback?: () => void,
) {
  if (typeof window === 'undefined' || !hasAnalyticsConsent() || typeof window.gtag !== 'function') {
    return false;
  }

  window.gtag('event', eventName, {
    ...parameters,
    ...(eventCallback ? { event_callback: eventCallback, event_timeout: 700 } : {}),
  });
  return true;
}
