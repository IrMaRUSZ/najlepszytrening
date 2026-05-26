import PhysioSectionClient from './client/PhysioSectionClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Fizjoterapeuta i Trener Medyczny Łódź | Ireneusz Maruszewski',
  },
  description: "Fizjoterapeuta sportowy i trener medyczny w Łodzi. Pomagam wrócić do pełnej sprawności po kontuzjach, operacjach i w bólach kręgosłupa. Umów darmową konsultację!",
  keywords: "fizjoterapeuta łódź, fizjoterapeuta sportowy łódź, trener medyczny łódź, trening medyczny, fizjoterapia łódź, ból kręgosłupa, powrót do sportu",
  openGraph: {
    title: "Fizjoterapeuta Sportowy i Trener Medyczny Łódź | Ireneusz Maruszewski",
    description: "Rehabilitacja ruchowa i trening medyczny w Łodzi. Pozbądź się bólu, odbuduj formę po kontuzji i trenuj bezpiecznie pod okiem fizjoterapeuty.",
    url: "https://www.najlepszytrening.pl/fizjoterapeuta-lodz",
    type: "website",  
    images: [
      {
        url: "/images/fizjoterapia-trening-medyczny.webp", // Podmień na zdjęcie z gabinetu/w trakcie diagnozy
        width: 1200,
        height: 630,
        alt: "Ireneusz Maruszewski - Fizjoterapeuta i Trener Medyczny w Łodzi"
      }
    ]
  },
  alternates: {
    canonical: 'https://www.najlepszytrening.pl/fizjoterapeuta-lodz'
  }
};

export default function PhysioPage() {
  return <PhysioSectionClient />;
}