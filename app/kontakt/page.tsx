import ContactClient from './client/ContactClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Kontakt | Najlepszy Trening Łódź",
  description: "Skontaktuj się z nami, aby rozpocząć swoją drogę do lepszej formy. Znajdź nas w Łodzi przy ul. Dąbrowskiego 207/225 lub zadzwoń pod numer +48 737 730 868.",
  keywords: "kontakt trener personalny, najlepszy trening łódź, trening personalny kontakt, trener personalny łódź kontakt",
  openGraph: {
    title: "Kontakt | Najlepszy Trening Łódź",
    description: "Skontaktuj się z nami, aby rozpocząć swoją drogę do lepszej formy. Znajdź nas w Łodzi przy ul. Dąbrowskiego 207/225 lub zadzwoń pod numer +48 737 730 868.",
    url: "https://www.najlepszytrening.pl/kontakt",
    type: "website",
    images: [
      {
        url: "/images/kontakt.webp",
        width: 1200,
        height: 630,
        alt: "Kontakt - Najlepszy Trening Łódź"
      }
    ]
  },
  alternates: {
    canonical: 'https://www.najlepszytrening.pl/kontakt'
  }
};

export default function ContactPage() {
  return <ContactClient />;
}