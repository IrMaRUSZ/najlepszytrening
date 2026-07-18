'use client';

import { CSSProperties, MouseEvent, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { trackGAEvent } from '@/lib/analytics';

interface CalendlyCTAProps {
  ctaSource: string;
  serviceType: string;
  ctaLabel: string;
  children: ReactNode;
  mode?: 'external' | 'action';
  href?: string;
  className?: string;
  style?: CSSProperties;
  onAction?: () => void;
  onClick?: () => void;
}

const DEFAULT_CALENDLY_URL = 'https://calendly.com/maruszewskiirek';

export default function CalendlyCTA({
  ctaSource,
  serviceType,
  ctaLabel,
  children,
  mode = 'external',
  href = DEFAULT_CALENDLY_URL,
  className,
  style,
  onAction,
  onClick,
}: CalendlyCTAProps) {
  const pathname = usePathname();

  const handleClick = (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    trackGAEvent('calendly_cta_click', {
      cta_source: ctaSource,
      page_path: pathname,
      service_type: serviceType,
      cta_label: ctaLabel,
    });
    onClick?.();
    if (mode === 'action') {
      event.preventDefault();
      onAction?.();
    }
  };

  if (mode === 'action') {
    return (
      <button type="button" className={className} style={style} onClick={handleClick}>
        {children}
      </button>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} style={style} onClick={handleClick}>
      {children}
    </a>
  );
}
