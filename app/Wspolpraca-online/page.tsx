import { Metadata } from 'next';
import OnlineTrainingClient from './client/OnlineTrainingClient';

export const metadata: Metadata = {
  title: "Współpraca Online | Najlepszy Trening Łódź",
  description: "Trenuj z profesjonalnym wsparciem, gdziekolwiek jesteś. Spersonalizowany plan treningowy, stały kontakt z trenerem i monitorowanie postępów.",
  keywords: "trening online, trener personalny online, plan treningowy online, wsparcie treningowe, trening zdalny, aplikacja treningowa",
  openGraph: {
    title: "Współpraca Online | Najlepszy Trening Łódź",
    description: "Trenuj z profesjonalnym wsparciem, gdziekolwiek jesteś. Spersonalizowany plan treningowy, stały kontakt z trenerem i monitorowanie postępów.",
    url: "https://www.najlepszytrening.pl/wspolpraca-online",
    type: "website",
    images: [
      {
        url: "/images/online-training.webp",
        width: 1200,
        height: 630,
        alt: "Współpraca Online - Najlepszy Trening Łódź"
      }
    ]
  },
  alternates: {
    canonical: 'https://www.najlepszytrening.pl/wspolpraca-online'
  }
};

export default function OnlineTrainingPage() {
  return <OnlineTrainingClient />;
}