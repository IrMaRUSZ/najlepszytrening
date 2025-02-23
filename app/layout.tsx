// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '../components/Navbar'
import GoogleAnalytics from '../components/SEO/GoogleAnalytics'
import Script from 'next/script'
import CookiePopup from '@/components/CookiePopup'
import Providers from '../components/Providers'

const inter = Inter({ subsets: ['latin'] })
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || '';

const schemaData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://www.najlepszytrening.pl',
  name: 'Najlepszy Trening - Ireneusz Maruszewski',
  description: 'Profesjonalny trener personalny w Łodzi. Treningi personalne, indywidualny plan treningowy.',
  url: 'https://www.najlepszytrening.pl',
  telephone: '+48 737730868',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Dąbrowskiego 207/225',
    addressLocality: 'Łódź',
    addressRegion: 'łódzkie',
    postalCode: '93-231',
    addressCountry: 'PL'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 51.7349044,
    longitude: 19.5163388
  },      
  image: {
    '@type': 'ImageObject',
    url: 'https://www.najlepszytrening.pl/images/Maruszewski.webp',
    width: '1200',
    height: '630',
    caption: 'Ireneusz Maruszewski - Trener Personalny i Fizjoterapeuta w Łodzi'
  },
  priceRange: '$$',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday', 
      'Tuesday', 
      'Wednesday', 
      'Thursday', 
      'Friday', 
      'Saturday'
    ],
    opens: '07:00',
    closes: '21:00'
  },
  sameAs: [
    'https://instagram.com/trener_ireneusz',
    'https://youtube.com/@trener_ireneusz'
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '48',
    bestRating: '5',
    worstRating: '1'
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Usługi treningowe',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Trening personalny',
        description: 'Indywidualny trening pod okiem profesjonalnego trenera',
        price: '150.00',
        priceCurrency: 'PLN',
        availability: 'https://schema.org/InStock'
      },
      {
        '@type': 'Offer',
        name: 'Fizjoterapia',
        description: 'Profesjonalna fizjoterapia i rehabilitacja',
        price: '150.00',
        priceCurrency: 'PLN',
        availability: 'https://schema.org/InStock'
      },
      {
        '@type': 'Offer',
        name: 'Plany treningowe online',
        description: 'Spersonalizowane plany treningowe z prowadzeniem online',
        price: '250.00',
        priceCurrency: 'PLN',
        availability: 'https://schema.org/InStock'
      }
    ]
  }
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://www.najlepszytrening.pl#person',
  name: 'Ireneusz Maruszewski',
  jobTitle: ['Trener Personalny', 'Fizjoterapeuta'],
  description: 'Certyfikowany trener personalny i fizjoterapeuta z wieloletnim doświadczeniem w Łodzi',
  image: 'https://www.najlepszytrening.pl/images/Maruszewski.webp',
  url: 'https://www.najlepszytrening.pl',
  sameAs: [
    'https://instagram.com/trener_ireneusz',
    'https://youtube.com/@trener_ireneusz'
  ],
  worksFor: {
    '@id': 'https://www.najlepszytrening.pl'
  }
};

export const metadata: Metadata = {
  title: 'Trener Personalny Łódź | Najlepszy Trening',
  description: 'Profesjonalny trener personalny w Łodzi. Treningi personalne, indywidualny plan treningowy, skuteczne podejście.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <head>
        <Script id="schema-business" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
        <Script id="schema-person" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />

        <Script id="google-consent-mode" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){ dataLayer.push(arguments); }

            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied'
            });

            window.handleCookieConsent = function(isAccepted) {
              gtag('consent', 'update', {
                'ad_storage': isAccepted ? 'granted' : 'denied',
                'analytics_storage': isAccepted ? 'granted' : 'denied',
                'ad_user_data': isAccepted ? 'granted' : 'denied',
                'ad_personalization': isAccepted ? 'granted' : 'denied'
              });
            };
          `}
        </Script>

        <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <Providers>
          <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
          <Navbar />
          <CookiePopup />
          {children}
        </Providers>
      </body>
    </html>
  );
}