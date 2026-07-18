'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { trackGAEvent } from '@/lib/analytics';

function getServiceType(pathname: string) {
  if (pathname === '/trener-personalny-lodz') return 'personal_training_lodz';
  if (pathname === '/fizjoterapeuta-lodz') return 'physiotherapy_lodz';
  if (pathname === '/Wspolpraca-online') return 'online';
  return 'general';
}

export default function CalendlyEventListener() {
  const pathname = usePathname();
  const handledRef = useRef(false);

  useEffect(() => {
    handledRef.current = false;

    const handleCalendlyEvent = (event: MessageEvent) => {
      if (event.origin !== 'https://calendly.com') return;
      if (event.data?.event !== 'calendly.event_scheduled') return;
      if (handledRef.current) return;

      const eventUri = event.data?.payload?.event?.uri;
      const dedupeKey = eventUri ? `calendly-scheduled:${eventUri}` : `calendly-scheduled:${pathname}`;
      try {
        if (sessionStorage.getItem(dedupeKey)) return;
        sessionStorage.setItem(dedupeKey, 'true');
      } catch {
        // Ref nadal chroni przed duplikatem, gdy storage jest niedostępny.
      }

      handledRef.current = true;

      let redirected = false;
      const redirect = () => {
        if (redirected) return;
        redirected = true;
        window.location.href = '/potwierdzenie';
      };

      const tracked = trackGAEvent('calendly_event_scheduled', {
        page_path: pathname,
        service_type: getServiceType(pathname),
      }, redirect);

      if (!tracked) {
        redirect();
        return;
      }

      window.setTimeout(redirect, 800);
    };

    window.addEventListener('message', handleCalendlyEvent);
    return () => window.removeEventListener('message', handleCalendlyEvent);
  }, [pathname]);

  return null;
}
