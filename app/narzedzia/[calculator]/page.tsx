import { Metadata } from 'next';
import ClientCalculatorPage from './client/ClientCalculatorPage';

const validCalculators = ['Kalkulator-zapotrzebowania-kalorycznego', 'bodyfat', 'onerepmax', 'bmi'];

export async function generateMetadata({ params }): Promise<Metadata> {
  const calculator = params.calculator as string;
  
  if (!validCalculators.includes(calculator)) {
    return {
      title: 'Kalkulatory | Najlepszy Trening Łódź',
      description: 'Kalkulatory treningowe',
    };
  }
  
  const titles = {
    'Kalkulator-zapotrzebowania-kalorycznego': 'Kalkulator Zapotrzebowania Kalorycznego',
    'bodyfat': 'Kalkulator Tkanki Tłuszczowej',
    'onerepmax': 'Kalkulator Maksymalnego Ciężaru',
    'bmi': 'Kalkulator BMI',
  };
  
  const descriptions = {
    'Kalkulator-zapotrzebowania-kalorycznego': 'Oblicz swoje dzienne zapotrzebowanie kaloryczne',
    'bodyfat': 'Oblicz swój procent tkanki tłuszczowej',
    'onerepmax': 'Oblicz swój maksymalny ciężar na jedno powtórzenie',
    'bmi': 'Oblicz swój wskaźnik masy ciała',
  };
  
  return {
    title: `${titles[calculator]} | Najlepszy Trening Łódź`,
    description: descriptions[calculator],
    alternates: {
      canonical: `https://www.najlepszytrening.pl/narzedzia/${calculator}`,
    },
  };
}

export default function Page({ params }) {
  const { calculator } = params;
  // Możemy obsłużyć nieprawidłowe kalkulatory bezpośrednio na serwerze
  if (!validCalculators.includes(calculator)) {
    // Jeśli używasz Next.js 13+, możesz użyć notFound() z next/navigation
    return { notFound: true };
  }
  return <ClientCalculatorPage calculator={calculator} />;
}