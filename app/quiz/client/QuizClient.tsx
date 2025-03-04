'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, X, Award, ArrowLeft } from 'lucide-react';
import styles from '../../../styles/quiz.module.css';
import { DziennyZestawPytan } from '../../../types/quiz';

const QuizClient = () => {
  // Stany dla codziennego zestawu pytań
  const [dziennyZestaw, setDziennyZestaw] = useState<DziennyZestawPytan | null>(null);
  const [aktualnePytanieIndex, setAktualnePytanieIndex] = useState<number>(0);
  const [wybraneOdpowiedzi, setWybraneOdpowiedzi] = useState<(number | null)[]>([]);
  const [czyPoprawne, setCzyPoprawne] = useState<boolean[]>([]);
  const [pokazWyjasnienie, setPokazWyjasnienie] = useState<boolean[]>([]);
  const [ukonczoneZestawy, setUkonczoneZestawy] = useState<boolean[]>([]);
  const [wynikDzienny, setWynikDzienny] = useState<number>(0);
  const [pokazWynikDzienny, setPokazWynikDzienny] = useState<boolean>(false);
  const [ladowanie, setLadowanie] = useState(true);
  const [blad, setBlad] = useState<string | null>(null);
  
  // Usunięto stany dla pełnego quizu i listę pytań

  useEffect(() => {
    const pobierzZestawNaDzis = async () => {
      try {
        const odpowiedz = await fetch('/api/quiz');
        if (!odpowiedz.ok) {
          throw new Error('Brak pytań na dzisiaj');
        }
        const dane = await odpowiedz.json();
        setDziennyZestaw(dane);
        
        // Inicjalizacja stanów dla wszystkich pytań w zestawie
        if (dane && dane.pytania) {
          setWybraneOdpowiedzi(new Array(dane.pytania.length).fill(null));
          setCzyPoprawne(new Array(dane.pytania.length).fill(false));
          setPokazWyjasnienie(new Array(dane.pytania.length).fill(false));
          setUkonczoneZestawy(new Array(dane.pytania.length).fill(false));
        }
      } catch (error) {
        if (error instanceof Error) {
          setBlad(error.message);
        } else {
          setBlad('Nie udało się pobrać pytań');
        }
      } finally {
        setLadowanie(false);
      }
    };

    pobierzZestawNaDzis();
  }, []);

  // Funkcje dla codziennego quizu
  const handleKlikniecieOdpowiedzi = (index: number) => {
    if (!dziennyZestaw) return;

    const noweWybraneOdpowiedzi = [...wybraneOdpowiedzi];
    noweWybraneOdpowiedzi[aktualnePytanieIndex] = index;
    setWybraneOdpowiedzi(noweWybraneOdpowiedzi);

    const noweCzyPoprawne = [...czyPoprawne];
    const aktualnePytanie = dziennyZestaw.pytania[aktualnePytanieIndex];
    noweCzyPoprawne[aktualnePytanieIndex] = index === aktualnePytanie.poprawnaOdpowiedz;
    setCzyPoprawne(noweCzyPoprawne);

    const nowePokazWyjasnienie = [...pokazWyjasnienie];
    nowePokazWyjasnienie[aktualnePytanieIndex] = true;
    setPokazWyjasnienie(nowePokazWyjasnienie);

    const noweUkonczoneZestawy = [...ukonczoneZestawy];
    noweUkonczoneZestawy[aktualnePytanieIndex] = true;
    setUkonczoneZestawy(noweUkonczoneZestawy);

    // Sprawdzamy czy wszystkie pytania zostały ukończone
    const czyWszystkieUkonczone = noweUkonczoneZestawy.every(status => status === true);
    if (czyWszystkieUkonczone) {
      // Obliczanie wyniku
      const poprawneOdpowiedzi = noweCzyPoprawne.filter(poprawna => poprawna === true).length;
      setWynikDzienny(poprawneOdpowiedzi);
      // Pokazanie wyniku po krótkim opóźnieniu
      setTimeout(() => {
        setPokazWynikDzienny(true);
      }, 1500);
    }
  };

  const przejdzDoPytania = (index: number) => {
    if (!dziennyZestaw || index < 0 || index >= dziennyZestaw.pytania.length) return;
    setAktualnePytanieIndex(index);
  };

  const resetujDziennyQuiz = () => {
    if (!dziennyZestaw) return;
    setWybraneOdpowiedzi(new Array(dziennyZestaw.pytania.length).fill(null));
    setCzyPoprawne(new Array(dziennyZestaw.pytania.length).fill(false));
    setPokazWyjasnienie(new Array(dziennyZestaw.pytania.length).fill(false));
    setUkonczoneZestawy(new Array(dziennyZestaw.pytania.length).fill(false));
    setAktualnePytanieIndex(0);
    setPokazWynikDzienny(false);
  };

  // Usunięto funkcje dla pełnego quizu

  // Renderowanie podsumowania dziennego quizu
  const renderWynikDzienny = () => {
    if (!dziennyZestaw) return null;
    
    return (
      <div className={styles.quizContainer}>
        <div className={styles.quizCard}>
          <h1 className={styles.question}>Twój dzienny wynik: {wynikDzienny} z {dziennyZestaw.pytania.length}</h1>
          <p style={{ 
            textAlign: 'center', 
            marginBottom: '2rem',
            fontSize: '1.1rem'
          }}>
            {wynikDzienny === dziennyZestaw.pytania.length ? 'Doskonale! Wszystkie odpowiedzi poprawne!' : 
             wynikDzienny >= Math.floor(dziennyZestaw.pytania.length * 0.8) ? 'Świetny wynik! Prawie wszystkie odpowiedzi poprawne!' : 
             wynikDzienny >= Math.floor(dziennyZestaw.pytania.length * 0.6) ? 'Dobry wynik! Większość odpowiedzi poprawnych.' : 
             'Warto poszerzyć swoją wiedzę o treningu i regeneracji!'}
          </p>
          
          <div className={styles.optionsContainer}>
            <button 
              className={styles.optionButton}
              onClick={resetujDziennyQuiz}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1rem'
              }}
            >
              Rozwiąż dzienny quiz ponownie
              <ArrowRight size={20} />
            </button>
            
            {/* Usunięto przycisk do dodatkowego quizu treningowego */}
            
            <button 
              className={styles.optionButton}
              onClick={() => window.location.href = '/kontakt'}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'linear-gradient(135deg, #10b981, #059669)'
              }}
            >
              Skontaktuj się z trenerem
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Usunięto renderowanie pełnego quizu

  // Wyświetlanie wyniku dziennego quizu
  if (pokazWynikDzienny) {
    return renderWynikDzienny();
  }

  // Renderowanie codziennego quizu
  if (ladowanie) {
    return <div className={styles.quizContainer}>Ładowanie...</div>;
  }

  if (blad || !dziennyZestaw || dziennyZestaw.pytania.length === 0) {
    return (
      <div className={styles.quizContainer}>
        <div className={styles.quizCard}>
          <p style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            {blad || 'Brak pytań na dziś'}
          </p>
          <button 
            className={styles.optionButton}
            onClick={() => window.location.href = '/kontakt'}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'linear-gradient(135deg, #10b981, #059669)'
            }}
          >
            Skontaktuj się z trenerem
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // Renderowanie aktualnego pytania z zestawu na dziś
  const aktualnePytanie = dziennyZestaw.pytania[aktualnePytanieIndex];
  const wybranaOdpowiedz = wybraneOdpowiedzi[aktualnePytanieIndex];
  const aktualneWyjasnienie = pokazWyjasnienie[aktualnePytanieIndex];

  return (
    <div className={styles.quizContainer}>
      <div className={styles.quizCard}>
        <div className={styles.contentContainer}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginBottom: '1rem',
            color: 'rgb(31, 41, 55)',
            fontSize: '0.9rem'
          }}>
            <span>Quiz dzienny</span>
            <span>{new Date().toLocaleDateString('pl-PL')}</span>
          </div>
          
          <h2 className={styles.question}>{aktualnePytanie.pytanie}</h2>

          <div className={styles.optionsContainer}>
            {aktualnePytanie.odpowiedzi.map((odpowiedz, index) => (
              <button
                key={index}
                onClick={() => handleKlikniecieOdpowiedzi(index)}
                disabled={wybranaOdpowiedz !== null}
                className={`${styles.optionButton} ${
                  wybranaOdpowiedz !== null && index === aktualnePytanie.poprawnaOdpowiedz
                    ? styles.correct
                    : wybranaOdpowiedz === index && index !== aktualnePytanie.poprawnaOdpowiedz
                    ? styles.incorrect
                    : ''
                }`}
                aria-label={`Odpowiedź: ${odpowiedz}`}
                title={`Odpowiedź: ${odpowiedz}`}
              >
                <span>{odpowiedz}</span>
                {wybranaOdpowiedz !== null && index === aktualnePytanie.poprawnaOdpowiedz && (
                  <Check />
                )}
                {wybranaOdpowiedz === index && index !== aktualnePytanie.poprawnaOdpowiedz && (
                  <X />
                )}
              </button>
            ))}
          </div>

          {aktualneWyjasnienie && (
            <div
              className={`${styles.explanationCard} ${
                czyPoprawne[aktualnePytanieIndex] ? styles.correct : styles.incorrect
              }`}
            >
              {czyPoprawne[aktualnePytanieIndex] && <Award />}
              <p>{aktualnePytanie.wyjasnienie}</p>
            </div>
          )}
          
          {wybranaOdpowiedz !== null && (
            <div className={styles.navigationButtons} style={{ 
              display: 'flex', 
              justifyContent: 'center',
              marginTop: '1.5rem',
              gap: '1rem'
            }}>
              {aktualnePytanieIndex > 0 && (
                <button 
                  className={styles.optionButton}
                  onClick={() => przejdzDoPytania(aktualnePytanieIndex - 1)}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'linear-gradient(135deg, #9ca3af, #6b7280)'
                  }}
                >
                  <ArrowLeft size={20} />
                  Poprzednie
                </button>
              )}
              
              {aktualnePytanieIndex < dziennyZestaw.pytania.length - 1 && (
                <button 
                  className={styles.optionButton}
                  onClick={() => przejdzDoPytania(aktualnePytanieIndex + 1)}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'linear-gradient(135deg, #3b82f6, #2563eb)'
                  }}
                >
                  Następne
                  <ArrowRight size={20} />
                </button>
              )}
            </div>
          )}
          
          <div className={styles.quizProgress} style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1.5rem',
            gap: '0.5rem'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              fontSize: '0.9rem',
              color: 'rgb(107, 114, 128)'
            }}>
              {dziennyZestaw.pytania.length > 0 && (
                <span>{aktualnePytanieIndex + 1} z {dziennyZestaw.pytania.length} pytań</span>
              )}
            </div>
          </div>
          
          {wybranaOdpowiedz !== null && aktualnePytanieIndex === dziennyZestaw.pytania.length - 1 && (
            <button 
              className={styles.optionButton}
              onClick={() => setPokazWynikDzienny(true)}
              style={{
                marginTop: '1.5rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'linear-gradient(135deg, #93c5fd, #3b82f6)'
              }}
            >
              Zobacz swój wynik
              <Award size={20} />
            </button>
          )}
          
          {/* Usunięty przycisk przejścia do pełnego quizu */}
        </div>
      </div>
    </div>
  );
};

export default QuizClient;