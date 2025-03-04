import TrainerSectionClient from './client/TrainerSectionClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Trener Personalny Łódź | Profesjonalne Treningi | Najlepszy Trening",
  description: "Profesjonalny trener personalny w Łodzi. Indywidualne plany treningowe, wsparcie dietetyczne i treningi dostosowane do Twoich celów. Pierwsze spotkanie bezpłatne!",
  keywords: "trener personalny łódź, indywidualny trening, plany treningowe, trening personalny, siłownia łódź, treningi indywidualne",
  openGraph: {
    title: "Trener Personalny Łódź | Profesjonalne Treningi | Najlepszy Trening",
    description: "Profesjonalny trener personalny w Łodzi. Indywidualne plany treningowe, wsparcie dietetyczne i treningi dostosowane do Twoich celów. Pierwsze spotkanie bezpłatne!",
    url: "https://www.najlepszytrening.pl/trener-personalny-lodz",
    type: "website",
    images: [
      {
        url: "/images/trainer-about.webp",
        width: 1200,
        height: 630,
        alt: "Profesjonalny Trener Personalny Łódź - Najlepszy Trening"
      }
    ]
  }
};

export default function TrainerPage() {
  return <TrainerSectionClient />;
}