import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '../components/Navbar'
import GoogleAnalytics from '../components/SEO/GoogleAnalytics'
import Script from 'next/script'
import CookiePopup from '@/components/CookiePopup'
import generateSchemaMarkup from '../components/SEO/SchemaOrg'

const inter = Inter({ subsets: ['latin'] })
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || '';

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/icon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icon/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icon/apple-touch-icon.png" />
        <link rel="icon" href="/icon/favicon.ico" />
        <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){ dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
          `}
        </Script>
        {generateSchemaMarkup()}
      </head>
      <body className={inter.className}>
        <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
        <Navbar />
        <CookiePopup />
        {children}
      </body>
    </html>
  );
}