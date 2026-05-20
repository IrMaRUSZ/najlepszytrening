import { Metadata } from 'next';
import OnlineTrainingClient from './client/OnlineTrainingClient';

export const metadata: Metadata = {
  title: "Współpraca Online z Trenerem | Autorska Aplikacja",
  description: "Zdalny trening personalny wykorzystujący moją zaawansowaną, autorską aplikację. Analiza techniki wideo, atlas 3D, automatyczne wykresy progresu siłowego i stały kontakt.",
  keywords: "trening online, trener personalny online, autorska aplikacja treningowa, wsparcie treningowe, prowadzenie online, maruszew aplikacja",
  openGraph: {
    title: "Współpraca Online na wyższym poziomie | Najlepszy Trening",
    description: "Koniec z arkuszami Excela i gubieniem informacji. Trenuj za pomocą nowoczesnej, dedykowanej aplikacji z interaktywnym atlasem mięśni, śledzeniem progresu 1RM i wideo.",
    url: "https://www.najlepszytrening.pl/Wspolpraca-online",
    type: "website",
    images: [
      {
        url: "/images/maruszew.webp", // Podmień na screena ze swojej apki
        width: 1200,
        height: 630,
        alt: "Autorska aplikacja treningowa do współpracy online - Maruszew"
      }
    ]
  },
  alternates: {
    canonical: 'https://www.najlepszytrening.pl/Wspolpraca-online'
  }
};

export default function OnlineTrainingPage() {
  return <OnlineTrainingClient />;
}