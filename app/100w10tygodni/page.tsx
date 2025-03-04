import TrainingPlanClient from './/client/TrainingPlanClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Darmowy Plan Treningowy Pod Wyciskanie Leżąc | Najlepszy Trening Łódź",
  description: "Pobierz darmowy, profesjonalny plan treningowy skupiający się na rozwoju siły w wyciskaniu leżąc. Opracowany przez doświadczonego trenera personalnego z Łodzi.",
  keywords: "wyciskanie leżąc, darmowy plan treningowy, trening klatki piersiowej, zwiększenie siły w ławce, trener personalny łódź",
  openGraph: {
    title: "Darmowy Plan Treningowy Pod Wyciskanie Leżąc | Najlepszy Trening Łódź",
    description: "Pobierz darmowy, profesjonalny plan treningowy skupiający się na rozwoju siły w wyciskaniu leżąc. Opracowany przez doświadczonego trenera personalnego z Łodzi.",
    url: "https://www.najlepszytrening.pl/100w10tygodni",
    type: "website",
    images: [
      {
        url: "/images/100.webp",
        width: 1200,
        height: 630,
        alt: "Darmowy plan treningowy na wyciskanie leżąc - Najlepszy Trening Łódź"
      }
    ]
  },
  alternates: {
    canonical: 'https://www.najlepszytrening.pl/100w10tygodni'
  }
};

export default function TrainingPlanPage() {
  return <TrainingPlanClient />;
}