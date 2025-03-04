import QuizClient from './client/QuizClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Quiz Treningowy | Najlepszy Trening Łódź",
  description: "Sprawdź swoją wiedzę o treningu i diecie. Rozwiąż quiz treningowy i dowiedz się, jak wiele wiesz o zdrowym stylu życia i efektywnym treningu.",
  keywords: "quiz treningowy, test wiedzy o treningu, fitness quiz, quiz wiedzy dietetycznej, test siłowy",
  openGraph: {
    title: "Quiz Treningowy | Najlepszy Trening Łódź",
    description: "Sprawdź swoją wiedzę o treningu i diecie. Rozwiąż quiz treningowy i dowiedz się, jak wiele wiesz o zdrowym stylu życia i efektywnym treningu.",
    url: "https://www.najlepszytrening.pl/quiz",
    type: "website",
    images: [
      {
        url: "/images/quiz.webp",
        width: 1200,
        height: 630,
        alt: "Quiz Treningowy - Najlepszy Trening Łódź"
      }
    ]
  },
  alternates: {
    canonical: 'https://www.najlepszytrening.pl/quiz'
  }
};

export default function QuizPage() {
  return <QuizClient />;
}