import CookieSettingsClient from '../cookie-settings/client/CookieSettingsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Polityka cookies – Jak używamy ciasteczek?',
  description: 'Dowiedz się, jak wykorzystujemy pliki cookies na naszej stronie. Sprawdź, jakie dane zbieramy i w jaki sposób możesz nimi zarządzać.',
  keywords: "cookies najlepszytrening",
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: 'https://www.najlepszytrening.pl/polityka-cookies',
    title: 'Polityka cookies – Jak używamy plików cookie?',
    description: 'Poznaj zasady korzystania z plików cookies na naszej stronie. Dowiedz się, jakie dane są gromadzone i jak możesz kontrolować ich wykorzystanie.',
    siteName: 'Najlepszy Trening',
    images: [
      {
        url: '/images/cookies.webp',
        width: 1200,
        height: 630,
        alt: 'Polityka cookies – Pliki cookie na naszej stronie',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.najlepszytrening.pl/polityka-cookies'
  }
};

export default function CookieSettingsPage() {
  return <CookieSettingsClient />;
}