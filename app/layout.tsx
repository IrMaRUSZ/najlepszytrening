import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '../components/Navbar'
import { generateSchemaMarkup } from '../components/SEO/SchemaOrg'
import GoogleAnalytics from '../components/SEO/GoogleAnalytics'

const inter = Inter({ subsets: ['latin'] })

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || '';

export const metadata: Metadata = {
  metadataBase: new URL('https://najlepszytrening.pl'),
  title: {
    default: 'Trener Personalny Łódź | Najlepszy Trening',
    template: '%s | Najlepszy Trening'
  },
  description: 'Profesjonalny trener personalny w Łodzi. Treningi personalne, indywidualny plan treningowy, skuteczne podejście. Transformacje sylwetki, treningi siłowe i funkcjonalne.',
  keywords: [
    'trener personalny łódź',
    'trening personalny',
    'treningi indywidualne łódź',
    'trener fitness łódź',
    'Ireneusz Maruszewski',
    'najlepszy trening',
    'treningi online',
    'plan treningowy',
    'trening siłowy łódź'
  ],
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
    url: 'https://najlepszytrening.pl',
    title: 'Trener Personalny Łódź | Najlepszy Trening',
    description: 'Profesjonalny trener personalny w Łodzi. Treningi personalne, indywidualny plan treningowy, skuteczne podejście.',
    siteName: 'Najlepszy Trening',
    images: [{
      url: '/images/Maruszewski.webp',
      width: 1200,
      height: 630,
      alt: 'Ireneusz Maruszewski - Trener Personalny Łódź'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trener Personalny Łódź | Najlepszy Trening',
    description: 'Profesjonalny trener personalny w Łodzi. Treningi personalne, indywidualny plan treningowy, skuteczne podejście.',
    images: ['/images/Maruszewski.webp'],
  },
  verification: {
    google: 'jfOKWAUcWmDB0Tpqtm0txBQ2PKwNXZKUpcYwxHhKX8g',
  },
  alternates: {
    canonical: 'https://najlepszytrening.pl'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        {generateSchemaMarkup()}
      </head>
      <body className={inter.className}>
        <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
        <Navbar />
        {children}
      </body>
    </html>
  )
}