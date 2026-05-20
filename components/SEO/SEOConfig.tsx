// components/SEO/SEOConfig.tsx
import { Metadata } from 'next'

export const generateDefaultMetadata = (
  title?: string,
  description?: string
): Metadata => {
  const baseTitle = 'Trener Personalny Łódź | Najlepszy Trening'
  const baseDescription = 'Profesjonalny trener personalny w Łodzi. Treningi personalne, indywidualny plan treningowy, skuteczne podejście.'

  return {
    title: title ? `${title} | ${baseTitle}` : baseTitle,
    description: description || baseDescription,
    keywords: [
      'trener personalny łódź',
      'fizjoterapeuta łódź',
      'trening medyczny łódź',
      'trener fizjoterapeuta łódź',
      'rehabilitacja łódź',
      'trener personalny łódź Widzew',
      'trener personalny łódź Dąbrowa',
      'trening personalny',
      'Ireneusz Maruszewski',
      'bezpieczny trening siłowy'
    ].join(', '),
    authors: [{ name: 'Ireneusz Maruszewski' }],
    creator: 'Ireneusz Maruszewski',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'pl_PL',
      url: 'https://www.najlepszytrening.pl',
      title: baseTitle,
      description: baseDescription,
      siteName: 'Najlepszy Trening',
      images: [
        {
          url: '/images/Maruszewski.webp',
          width: 1200,
          height: 630,
          alt: 'Ireneusz Maruszewski - Trener Personalny Łódź',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: baseTitle,
      description: baseDescription,
      images: ['/images/Maruszewski.webp'],
    },
  }
}