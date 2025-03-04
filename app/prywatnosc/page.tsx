import { Metadata } from 'next';
import PrivacyClient from './client/PrivacyClient';

export const metadata: Metadata = {
  title: "Polityka Prywatności | Najlepszy Trening Łódź",
  description: "Zapoznaj się z polityką prywatności Najlepszy Trening oraz informacjami o przetwarzaniu danych osobowych.",
  keywords: "polityka prywatności, ochrona danych osobowych, RODO, cookies, bezpieczeństwo danych",
  openGraph: {
    title: "Polityka Prywatności | Najlepszy Trening Łódź",
    description: "Zapoznaj się z polityką prywatności Najlepszy Trening oraz informacjami o przetwarzaniu danych osobowych.",
    url: "https://www.najlepszytrening.pl/prywatnosc",
    type: "website"
  },
  alternates: {
    canonical: 'https://www.najlepszytrening.pl/prywatnosc'
  }
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}