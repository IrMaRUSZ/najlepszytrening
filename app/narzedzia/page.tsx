import ToolsClient from './client/ToolsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Kalkulatory treningowe | Najlepszy Trening Łódź",
  description: "Skorzystaj z naszych kalkulatorów treningowych: BMI, kalkulator tkanki tłuszczowej, kalkulator 1RM, kalkulator zapotrzebowania kalorycznego oraz darmowe plany treningowe.",
  keywords: "kalkulator BMI, kalkulator tkanki tłuszczowej, kalkulator 1RM, kalkulator diety, plan treningowy, trening siłowy",
  openGraph: {
    title: "Kalkulatory treningowe | Najlepszy Trening Łódź",
    description: "Skorzystaj z naszych kalkulatorów treningowych i darmowych planów treningowych. Oblicz swoje BMI, poziom tkanki tłuszczowej, zapotrzebowanie kaloryczne i więcej.",
    url: "https://www.najlepszytrening.pl/narzedzia",
    type: "website",
    images: [
      {
        url: "/images/narzedzia.webp",
        width: 1200,
        height: 630,
        alt: "Kalkulatory treningowe - Najlepszy Trening Łódź"
      }
    ]
  },
  alternates: {
    canonical: 'https://www.najlepszytrening.pl/narzedzia'
  }
};

export default function ToolsPage() {
  return <ToolsClient />;
}