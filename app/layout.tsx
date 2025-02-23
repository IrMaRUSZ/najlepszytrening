import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '../components/Navbar'
import GoogleAnalytics from '../components/SEO/GoogleAnalytics'
import Script from 'next/script'
import CookiePopup from '@/components/CookiePopup'

const inter = Inter({ subsets: ['latin'] })
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || '';

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
        <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){ dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
          `}
        </Script>
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
