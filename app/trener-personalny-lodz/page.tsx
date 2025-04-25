import TrainerSectionClient from './client/TrainerSectionClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Trener Personalny Łódź | Ireneusz Maruszewski | Najlepszy Trening",
  description: "Certyfikowany trener personalny w Łodzi z doświadczeniem fizjoterapeuty. Skuteczne indywidualne plany treningowe, wsparcie dietetyczne i treningi z dojazdem. Pierwsze konsultacje gratis!",
  keywords: "trener personalny Łódź, Ireneusz Maruszewski trener, najlepszy trening personalny, trening z fizjoterapeutą, trener z dojazdem Łódź, efektywne treningi indywidualne",
  openGraph: {
    title: "Trener Personalny Łódź | Ireneusz Maruszewski | Najlepszy Trening",
    description: "Certyfikowany trener personalny w Łodzi z doświadczeniem fizjoterapeuty. Skuteczne indywidualne plany treningowe, wsparcie dietetyczne i treningi z dojazdem. Pierwsze konsultacje gratis!",
    url: "https://www.najlepszytrening.pl/trener-personalny-lodz",
    type: "website",  
    images: [
      {
        url: "/images/trainer-about.webp",
        width: 1200,
        height: 630,
        alt: "Ireneusz Maruszewski - profesjonalny trener personalny w Łodzi"
      }
    ]
  },
  alternates: {
    canonical: 'https://www.najlepszytrening.pl/trener-personalny-lodz'
  }
};

export default function TrainerPage() {
  return <TrainerSectionClient />;
}