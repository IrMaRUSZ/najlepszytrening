'use client';
// app/quiz/page.tsx
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
import { Check, X, Award } from 'lucide-react';
import styles from '../../styles/quiz.module.css';
import { PytanieQuizu  } from '@/types/quiz';

export default function QuizPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [wybranaOdpowiedz, setWybranaOdpowiedz] = useState<number | null>(null);
  const [czyPoprawna, setCzyPoprawna] = useState<boolean>(false);
  const [pokazWyjasnienie, setPokazWyjasnienie] = useState<boolean>(false);
  const [pytanie, setPytanie] = useState<PytanieQuizu | null>(null);
  const [ladowanie, setLadowanie] = useState(true);

  // Sprawdź czy użytkownik jest zalogowany
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    const pobierzPytanieNaDzis = async () => {
      try {
        const odpowiedz = await fetch('/api/quiz');
        if (!odpowiedz.ok) {
          throw new Error('Brak pytania na dzisiaj');
        }
        const dane: PytanieQuizu = await odpowiedz.json();
        setPytanie(dane);
      } catch (error) {
        console.error('Błąd:', error);
      } finally {
        setLadowanie(false);
      }
    };

    if (session) {
      pobierzPytanieNaDzis();
    }
  }, [session]);

  const handleKlikniecieOdpowiedzi = async (index: number) => {
    if (!pytanie || !session?.user) return;
    
    setWybranaOdpowiedz(index);
    const isCorrect = index === pytanie.poprawnaOdpowiedz;
    setCzyPoprawna(isCorrect);
    
    // Zapisz odpowiedź
    try {
      await fetch('/api/quiz/answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionId: pytanie.id,
          answer: index,
          isCorrect,
        }),
      });
    } catch (error) {
      console.error('Błąd zapisywania odpowiedzi:', error);
    }

    setTimeout(() => setPokazWyjasnienie(true), 800);
  };

  if (status === "loading" || ladowanie) {
    return <div className={styles.quizContainer}>Ładowanie...</div>;
  }

  if (!session) {
    return null; // Router przekieruje do strony logowania
  }

  if (!pytanie) {
    return (
      <div className={styles.quizContainer}>
        <div className={styles.quizCard}>
          <p>Brak pytania na dziś</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.quizContainer}>
      <div className={styles.quizCard}>
        <h2 className={styles.question}>{pytanie.pytanie}</h2>
        
        <div className={styles.optionsContainer}>
          {pytanie.odpowiedzi.map((odpowiedz: string, index: number) => (
            <button
              key={index}
              onClick={() => handleKlikniecieOdpowiedzi(index)}
              disabled={wybranaOdpowiedz !== null}
              className={`${styles.optionButton} ${
                wybranaOdpowiedz !== null && index === pytanie.poprawnaOdpowiedz
                  ? styles.correct
                  : wybranaOdpowiedz === index
                  ? styles.incorrect
                  : ''
              }`}
            >
              <span>{odpowiedz}</span>
              {wybranaOdpowiedz !== null && index === pytanie.poprawnaOdpowiedz && (
                <Check className={styles.icon} />
              )}
              {wybranaOdpowiedz === index && index !== pytanie.poprawnaOdpowiedz && (
                <X className={styles.icon} />
              )}
            </button>
          ))}
        </div>

        {pokazWyjasnienie && (
          <div
            className={`${styles.explanationCard} ${
              czyPoprawna ? styles.correct : styles.incorrect
            }`}
          >
            {czyPoprawna && <Award className={styles.icon} />}
            <p>{pytanie.wyjasnienie}</p>
          </div>
        )}
      </div>
    </div>
  );
}