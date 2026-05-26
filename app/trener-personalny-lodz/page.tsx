import TrainerSectionClient from './client/TrainerSectionClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    // USUŃ absolute z emoji — Google może go obciąć lub zignorować
    // ZAMIAST: 'Trener Personalny Łódź 🏋️‍♂️ Darmowa Konsultacja | Najlepszy Trening'
    absolute: 'Trener Personalny Łódź | Ireneusz Maruszewski | Darmowa Konsultacja',
  },
  description: "Trener personalny w Łodzi z wykształceniem fizjoterapeuty. Treningi na siłowni Just Gym (ul. Gojawiczyńskiej) i online. Ponad 50 opinii ⭐. Pierwsza konsultacja bezpłatna!",
  // description musi zawierać: miasto, lokalizację, social proof, CTA
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