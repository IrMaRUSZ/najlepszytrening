import TrainerSectionClient from './client/TrainerSectionClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Trening Personalny Łódź | Siłownia i Z Dojazdem | I. Maruszewski',
  },
  description: "Skuteczny trening personalny w Łodzi (Just Gym Gojawiczyńskiej) oraz treningi z dojazdem na Widzew, Centrum, Górna. Zobacz jak wygląda współpraca i zarezerwuj termin!",
  keywords: "trening personalny Łódź, indywidualne treningi Łódź, trener z dojazdem Łódź, trener Just Gym Łódź, ćwiczenia z fizjoterapeutą",
  openGraph: {
     title: "Trening Personalny Łódź | Siłownia i Z Dojazdem",
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