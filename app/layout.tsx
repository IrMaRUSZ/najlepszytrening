import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '../components/Navbar'
import GoogleAnalytics from '../components/SEO/GoogleAnalytics'
import CookiePopup from '@/components/CookiePopup'
import generateSchemaMarkup from '../components/SEO/SchemaOrg'
import { AnalyticsConsentProvider } from '@/components/analytics/AnalyticsConsentProvider'
import CalendlyEventListener from '@/components/analytics/CalendlyEventListener'
import MicrosoftClarity from '@/components/analytics/MicrosoftClarity'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || '';
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || 'yjmy8m1lpk';

// Podstawowe metadane, które będą dziedziczone ale mogą być nadpisane
export const metadata: Metadata = {
  metadataBase: new URL('https://www.najlepszytrening.pl'),
  title: {
    template: '%s | Trener Personalny Łódź',
    default: 'Trener Personalny Łódź | Najlepszy Trening'
  },
  description: 'Sprawdzony trener personalny w Łodzi',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: 'https://www.najlepszytrening.pl',
    siteName: 'Najlepszy Trening',
    images: [
      {
        url: '/images/Maruszewskibt.webp',
        width: 1200,
        height: 630,
        alt: 'Ireneusz Maruszewski - Trener Personalny Łódź',
      },
    ],
  },
  icons: {
    icon: [
      { url: '/icon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon/favicon.ico' },
    ],
    apple: [
      { url: '/icon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <head>
        {generateSchemaMarkup()}
      </head>
      <body className={inter.className}>
        <AnalyticsConsentProvider>
          <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
          <MicrosoftClarity clarityId={CLARITY_ID} />
          <CalendlyEventListener />
          <Navbar />
          <CookiePopup />
          {children}
          <Footer />
        </AnalyticsConsentProvider>
      </body>
    </html>
  );
}
