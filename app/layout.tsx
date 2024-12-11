import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '../components/Navbar'
import { generateSchemaMarkup } from '../components/SEO/SchemaOrg'
import GoogleAnalytics from '../components/SEO/GoogleAnalytics'

const inter = Inter({ subsets: ['latin'] })

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || '';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.najlepszytrening.pl'),
  title: {
    default: 'Trener Personalny Łódź Widzew, Dąbrowa | FitFabric | Treningi i Fizjoterapia',
    template: '%s | Najlepszy Trening w Łodzi'
  },
  description: 'Trener personalny i fizjoterapeuta w FitFabric Łódź. Treningi na Widzewie, Dąbrowie, Chojnach i w Centrum. Kompleksowa opieka: treningi personalne, fizjoterapia, plany dietetyczne. 10+ lat doświadczenia. Pierwsza konsultacja gratis!',
  icons: {
    icon: [
      { url: '/icon/favicon.ico' },
      { url: '/icon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/icon/apple-touch-icon.png' }
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/icon/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/icon/android-chrome-512x512.png',
      }
    ]
  },
  keywords: [
    // Lokalizacje
    'trener personalny łódź widzew',
    'trener personalny łódź dąbrowa',
    'trener personalny łódź chojny',
    'trener personalny łódź centrum',
    'trener fitfabric łódź',
    'trening personalny widzew',
    'trening personalny dąbrowa',
    'treningi personalne chojny',
    // Siłownie
    'fitfabric trener personalny',
    'fitfabric widzew treningi',
    'fitfabric dąbrowa',
    // Podstawowe usługi z lokalizacjami
    'fizjoterapeuta łódź widzew',
    'fizjoterapeuta łódź dąbrowa',
    'fizjoterapeuta fitfabric',
    'doradca żywieniowy łódź widzew',
    'rehabilitacja sportowa łódź widzew',
    'rehabilitacja sportowa łódź dąbrowa',
    // Ogólne usługi
    'transformacje sylwetki łódź',
    'treningi personalne',
    'treningi indywidualne łódź',
    'Ireneusz Maruszewski trener',
    'Ireneusz Maruszewski fizjoterapeuta',
    'rehabilitacja po urazach',
    'plany żywieniowe łódź',
    'dietetyk sportowy łódź',
    'treningi online z trenerem',
    'indywidualny plan treningowy',
    'trening siłowy dla początkujących',
    'redukcja tkanki tłuszczowej',
    'budowanie masy mięśniowej',
    'trening funkcjonalny łódź'
  ],
  authors: [{ 
    name: 'Ireneusz Maruszewski',
    url: 'https://www.najlepszytrening.pl/o-mnie'
  }],
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
    title: 'Trener Personalny Łódź (Widzew, Dąbrowa) | FitFabric | Transformacje i Rehabilitacja',
    description: 'Szukasz trenera w Łodzi? Treningi w FitFabric na Widzewie i Dąbrowie. ✓ Trening personalny ✓ Fizjoterapia ✓ Plany żywieniowe ✓ 10+ lat doświadczenia ✓ Pierwsza konsultacja gratis! Dojazd do klienta w całej Łodzi.',
    siteName: 'Najlepszy Trening',
    images: [{
      url: '/images/Maruszewski.webp',
      width: 1200,
      height: 630,
      alt: 'Ireneusz Maruszewski - Trener Personalny i Fizjoterapeuta w Łodzi - FitFabric'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trener Personalny Łódź - FitFabric (Widzew, Dąbrowa) | Treningi i Rehabilitacja',
    description: 'Treningi personalne w FitFabric Łódź (Widzew, Dąbrowa). Fizjoterapia, plany treningowe i dietetyczne. Pierwsza konsultacja gratis!',
    images: ['/images/Maruszewski.webp'],
  },
  verification: {
    google: 'jfOKWAUcWmDB0Tpqtm0txBQ2PKwNXZKUpcYwxHhKX8g',
  },
  alternates: {
    canonical: 'https://www.najlepszytrening.pl'
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