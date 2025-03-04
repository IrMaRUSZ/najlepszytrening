import GamificationClient from './client/GamificationClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Grywalizacja | Najlepszy Trening Łódź",
  description: "Weź udział w grywalizacji treningowej i rywalizuj o nagrody. Sprawdź zasady, rankingi i dołącz do drużyn w naszym programie motywacyjnym.",
  keywords: "grywalizacja treningowa, rywalizacja fitness, program motywacyjny, nagrody za trening, trener personalny łódź",
  openGraph: {
    title: "Grywalizacja | Najlepszy Trening Łódź",
    description: "Weź udział w grywalizacji treningowej i rywalizuj o nagrody. Sprawdź zasady, rankingi i dołącz do drużyn w naszym programie motywacyjnym.",
    url: "https://www.najlepszytrening.pl/grywalizacja",
    type: "website",
    images: [
      {
        url: "/images/grywalizacja.webp",
        width: 1200,
        height: 630,
        alt: "Grywalizacja treningowa - Najlepszy Trening Łódź"
      }
    ]
  },
  alternates: {
    canonical: 'https://www.najlepszytrening.pl/grywalizacja'
  }
};

export default function GamificationPage() {
  return <GamificationClient />;
}