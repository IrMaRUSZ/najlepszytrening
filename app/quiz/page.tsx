'use client';

// Ścieżka pliku: /app/quiz/page.tsx
import React, { useState, useEffect } from 'react';
import { Check, X, Award } from 'lucide-react';
import styles from '../../styles/quiz.module.css';
import { PytanieQuizu } from '../../types/quiz';

export default function QuizPage() {
  const [wybranaOdpowiedz, setWybranaOdpowiedz] = useState<number | null>(null);
  const [czyPoprawna, setCzyPoprawna] = useState<boolean>(false);
  const [pokazWyjasnienie, setPokazWyjasnienie] = useState<boolean>(false);
  const [pytanie, setPytanie] = useState<PytanieQuizu | null>(null);
  const [ladowanie, setLadowanie] = useState(true);
  const [blad, setBlad] = useState<string | null>(null);

  useEffect(() => {
    const pobierzPytanieNaDzis = async () => {
      try {
        const odpowiedz = await fetch('/api/quiz');
        if (!odpowiedz.ok) {
          throw new Error('Brak pytania na dzisiaj');
        }
        const dane = await odpowiedz.json();
        setPytanie(dane);
      } catch {
        setBlad('Nie udało się pobrać pytania');
      } finally {
        setLadowanie(false);
      }
    };

    pobierzPytanieNaDzis();
  }, []);

  const handleKlikniecieOdpowiedzi = (index: number) => {
    if (!pytanie) return;
    
    setWybranaOdpowiedz(index);
    setCzyPoprawna(index === pytanie.poprawnaOdpowiedz);
    setTimeout(() => setPokazWyjasnienie(true), 800);
  };

  if (ladowanie) {
    return <div className={styles.quizContainer}>Ładowanie...</div>;
  }

  if (blad || !pytanie) {
    return (
      <div className={styles.quizContainer}>
        <div className={styles.quizCard}>
          <p className={styles.error}>{blad || 'Brak pytania na dziś'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.quizContainer}>
      <div className={styles.quizCard}>
        <div className={styles.contentContainer}>
          <h2 className={styles.question}>{pytanie.pytanie}</h2>
          
          <div className={styles.optionsContainer}>
            {pytanie.odpowiedzi.map((odpowiedz, index) => (
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
            <div className={`${styles.explanationCard} ${
              czyPoprawna ? styles.correct : styles.incorrect
            }`}>
              {czyPoprawna && <Award className={styles.icon} />}
              <p>{pytanie.wyjasnienie}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}