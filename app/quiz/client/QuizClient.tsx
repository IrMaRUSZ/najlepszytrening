// client/QuizClient.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, X, Award, ArrowLeft } from 'lucide-react';
import styles from '../../../styles/quiz.module.css'; // Upewnij się, że ta ścieżka jest poprawna
import { DziennyZestawPytan } from '../../../types/quiz'; // Upewnij się, że ta ścieżka jest poprawna

const QuizClient = () => {
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
  
  useEffect(() => {
    const pobierzZestawNaDzis = async () => {
      try {
        const odpowiedz = await fetch('/api/quiz');
        if (!odpowiedz.ok) {
          const bladInfo = await odpowiedz.json();
          throw new Error(bladInfo.blad || 'Brak pytań na dzisiaj');
        }
        const dane = await odpowiedz.json();
        setDziennyZestaw(dane);
        
        if (dane && dane.pytania) {
          const iloscPytan = dane.pytania.length;
          setWybraneOdpowiedzi(new Array(iloscPytan).fill(null));
          setCzyPoprawne(new Array(iloscPytan).fill(false));
          setPokazWyjasnienie(new Array(iloscPytan).fill(false));
          setUkonczoneZestawy(new Array(iloscPytan).fill(false));
        }
      } catch (error) {
        if (error instanceof Error) {
          setBlad(error.message);
        } else {
          setBlad('Wystąpił nieoczekiwany błąd');
        }
      } finally {
        setLadowanie(false);
      }
    };

    pobierzZestawNaDzis();
  }, []);

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

    const czyWszystkieUkonczone = noweUkonczoneZestawy.every(status => status === true);
    if (czyWszystkieUkonczone) {
      const poprawneOdpowiedzi = noweCzyPoprawne.filter(poprawna => poprawna === true).length;
      setWynikDzienny(poprawneOdpowiedzi);
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
    const iloscPytan = dziennyZestaw.pytania.length;
    setWybraneOdpowiedzi(new Array(iloscPytan).fill(null));
    setCzyPoprawne(new Array(iloscPytan).fill(false));
    setPokazWyjasnienie(new Array(iloscPytan).fill(false));
    setUkonczoneZestawy(new Array(iloscPytan).fill(false));
    setAktualnePytanieIndex(0);
    setPokazWynikDzienny(false);
  };

  const renderWynikDzienny = () => {
    if (!dziennyZestaw) return null;
    
    return (
      <div className={styles.quizContainer}>
        <div className={styles.quizCard}>
          <h1 className={styles.question}>Twój dzienny wynik: {wynikDzienny} z {dziennyZestaw.pytania.length}</h1>
          <p style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.1rem' }}>
            {wynikDzienny === dziennyZestaw.pytania.length ? 'Doskonale! Wszystkie odpowiedzi poprawne!' : 
             wynikDzienny >= Math.floor(dziennyZestaw.pytania.length * 0.8) ? 'Świetny wynik! Prawie wszystkie odpowiedzi poprawne!' : 
             wynikDzienny >= Math.floor(dziennyZestaw.pytania.length * 0.6) ? 'Dobry wynik! Większość odpowiedzi poprawnych.' : 
             'Warto poszerzyć swoją wiedzę o treningu i regeneracji!'}
          </p>
          <div className={styles.optionsContainer}>
            <button className={styles.optionButton} onClick={resetujDziennyQuiz}>
              Rozwiąż dzienny quiz ponownie <ArrowRight size={20} />
            </button>
            <button className={styles.optionButton} onClick={() => window.location.href = '/kontakt'} style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
              Skontaktuj się z trenerem <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (ladowanie) return <div className={styles.quizContainer}>Ładowanie...</div>;
  if (pokazWynikDzienny) return renderWynikDzienny();

  if (blad || !dziennyZestaw || dziennyZestaw.pytania.length === 0) {
    return (
      <div className={styles.quizContainer}>
        <div className={styles.quizCard}>
          <p style={{ textAlign: 'center', marginBottom: '1.5rem' }}>{blad || 'Brak pytań na dziś'}</p>
          <button className={styles.optionButton} onClick={() => window.location.href = '/kontakt'} style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
            Skontaktuj się z trenerem <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  const aktualnePytanie = dziennyZestaw.pytania[aktualnePytanieIndex];
  const wybranaOdpowiedz = wybraneOdpowiedzi[aktualnePytanieIndex];
  const aktualneWyjasnienie = pokazWyjasnienie[aktualnePytanieIndex];

  return (
    <div className={styles.quizContainer}>
      <div className={styles.quizCard}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'rgb(31, 41, 55)', fontSize: '0.9rem' }}>
            <span>Quiz dzienny</span>
            <span>{new Date().toLocaleDateString('pl-PL')}</span>
          </div>
          
          {aktualnePytanie.videoUrl && (
            <div className={
              aktualnePytanie.videoAspectRatio === '9:16'
                ? styles.videoContainerVertical
                : styles.videoContainer
            }>
              <iframe src={aktualnePytanie.videoUrl} title="Pytanie wideo" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
          )}
          {!aktualnePytanie.videoUrl && aktualnePytanie.imageUrl && (
            <div className={styles.imageContainer}>
              <img src={aktualnePytanie.imageUrl} alt="Pytanie obrazkowe" className={styles.quizImage}/>
            </div>
          )}

          <h2 className={styles.question}>{aktualnePytanie.pytanie}</h2>

          <div className={styles.optionsContainer}>
            {aktualnePytanie.odpowiedzi.map((odpowiedz, index) => (
              <button
                key={index}
                onClick={() => handleKlikniecieOdpowiedzi(index)}
                disabled={wybranaOdpowiedz !== null}
                className={`${styles.optionButton} ${
                  wybranaOdpowiedz !== null && index === aktualnePytanie.poprawnaOdpowiedz ? styles.correct : 
                  wybranaOdpowiedz === index && index !== aktualnePytanie.poprawnaOdpowiedz ? styles.incorrect : ''
                }`}
              >
                <span>{odpowiedz}</span>
                {wybranaOdpowiedz !== null && index === aktualnePytanie.poprawnaOdpowiedz && <Check />}
                {wybranaOdpowiedz === index && index !== aktualnePytanie.poprawnaOdpowiedz && <X />}
              </button>
            ))}
          </div>

          {aktualneWyjasnienie && (
            <div className={`${styles.explanationCard} ${czyPoprawne[aktualnePytanieIndex] ? styles.correct : styles.incorrect}`}>
              {czyPoprawne[aktualnePytanieIndex] && <Award />}
              <p>{aktualnePytanie.wyjasnienie}</p>
            </div>
          )}
          
          {wybranaOdpowiedz !== null && (
            <div className={styles.navigationButtons} style={{ marginTop: '1.5rem', gap: '1rem' }}>
              {aktualnePytanieIndex > 0 && (
                <button className={styles.optionButton} onClick={() => przejdzDoPytania(aktualnePytanieIndex - 1)} style={{ background: 'linear-gradient(135deg, #9ca3af, #6b7280)' }}>
                  <ArrowLeft size={20} /> Poprzednie
                </button>
              )}
              {aktualnePytanieIndex < dziennyZestaw.pytania.length - 1 && (
                <button className={styles.optionButton} onClick={() => przejdzDoPytania(aktualnePytanieIndex + 1)} style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}>
                  Następne <ArrowRight size={20} />
                </button>
              )}
            </div>
          )}
          
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem', color: 'rgb(107, 114, 128)', fontSize: '0.9rem' }}>
            <span>Pytanie {aktualnePytanieIndex + 1} z {dziennyZestaw.pytania.length}</span>
          </div>
          
          {ukonczoneZestawy.every(status => status === true) && (
            <button className={styles.optionButton} onClick={() => setPokazWynikDzienny(true)} style={{ marginTop: '1.5rem', background: 'linear-gradient(135deg, #93c5fd, #3b82f6)' }}>
              Zobacz swój wynik <Award size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizClient;