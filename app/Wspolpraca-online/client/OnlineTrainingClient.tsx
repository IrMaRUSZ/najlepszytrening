"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MessageCircle, BarChart2, Video, ChevronLeft, ChevronRight, CalendarCheck, ShieldCheck } from 'lucide-react';
import styles from '../../../styles/OnlineTraining.module.css';

const appImages = Array.from({ length: 20 }, (_, i) => `/images/Apka${i + 1}.webp`);

const OnlineTrainingClient = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === appImages.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const nextSlide = () => setCurrentIndex((prev) => (prev === appImages.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? appImages.length - 1 : prev - 1));

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>Trenuj na własnych zasadach w mojej autorskiej aplikacji</h2>
          <p className={styles.subtitle}>
            Koniec z arkuszami w Excelu i gubiącymi się wiadomościami. Jako jeden z nielicznych trenerów oferuję prowadzenie online na mojej własnej, dedykowanej platformie treningowej z analizą wideo.
          </p>
        </header>

        <div className={styles.appShowcase}>
          {/* KARUZELA ZDJĘĆ - BEZ ZMIAN */}
          <div className={styles.appDemo} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className={styles.carouselContainer}>
              <div className={styles.carouselInner} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {appImages.map((src, index) => (
                  <div key={index} className={styles.carouselSlide}>
                    <Image src={src} alt={`Ekran aplikacji ${index + 1}`} width={600} height={1200} className={styles.carouselImage} priority={index === 0} />
                  </div>
                ))}
              </div>
              <button className={`${styles.carouselButton} ${styles.carouselPrev}`} onClick={prevSlide}><ChevronLeft size={24} /></button>
              <button className={`${styles.carouselButton} ${styles.carouselNext}`} onClick={nextSlide}><ChevronRight size={24} /></button>
              <div className={styles.carouselIndicator}>{currentIndex + 1} / {appImages.length}</div>
            </div>
          </div>
          
          <div className={styles.appFeatures}>
            <h3>Technologia, która przyspiesza efekty</h3>
            <div className={styles.featuresList}>
              <div className={styles.feature}>
                <Video className={styles.featureIcon} />
                <div>
                  <h4>Wideo w kontekście serii</h4>
                  <p>Wgrywasz film z wykonanym ćwiczeniem prosto do aktywnej serii w planie. Dzięki temu mogę natychmiast skorygować Twoją technikę – jestem z Tobą na każdym treningu.</p>
                </div>
              </div>
              <div className={styles.feature}>
                <BarChart2 className={styles.featureIcon} />
                <div>
                  <h4>Ożywione dane i krzywe 1RM</h4>
                  <p>Aplikacja automatycznie przelicza Twoje wyniki, rysuje wykresy maksymalnej siły (1RM) i liczy Powtórzenia Wysokostymulujące (PWS).</p>
                </div>
              </div>
              <div className={styles.feature}>
                <MessageCircle className={styles.featureIcon} />
                <div>
                  <h4>Wbudowany czat i kalendarz</h4>
                  <p>Szybka komunikacja wewnątrz aplikacji. W jednym miejscu notujesz sen, wagę, kroki i masz stały podgląd na kalendarz treningowy.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CRO: SEKCJA ZBIJAJĄCA OBIEKCJE */}
        <div style={{backgroundColor: 'rgba(255, 69, 0, 0.05)', padding: '3rem', borderRadius: '16px', margin: '4rem 0'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
            <ShieldCheck size={32} color="var(--primary)" />
            <h3 style={{margin: 0}}>Jak układam plan pod ból kręgosłupa online?</h3>
          </div>
          <p style={{lineHeight: '1.6'}}>
Często pytacie: <em>&quot;Jak ułożysz mi bezpieczny plan bez wizyty w gabinecie?&quot;</em> Jako fizjoterapeuta podchodzę do tego rygorystycznie:
          </p>
          <ul style={{marginTop: '1rem', lineHeight: '1.8', paddingLeft: '1.5rem'}}>
            <li>Przeprowadzam z Tobą pogłębiony <strong>wywiad wideo</strong> podczas pierwszej (darmowej) konsultacji.</li>
            <li>Poproszę Cię o nagranie konkretnych testów ruchowych w domu.</li>
            <li>Jeśli po analizie uznam, że Twój przypadek bezwzględnie wymaga pracy manualnej z fizjoterapeutą na żywo – <strong>powiem Ci to otwarcie</strong>, zanim zapłacisz za prowadzenie.</li>
          </ul>
        </div>

        <div className={styles.howItWorks}>
          <h3>Jak wygląda współpraca online?</h3>
          {/* Sekcja kroków (bez zmian, jest świetna) */}
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <h4>Darmowa rozmowa wideo</h4>
              <p>Omawiamy Twoje cele, historię kontuzji i sprawdzamy, czy aplikacja sprawdzi się u Ciebie.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <h4>Dostęp do platformy</h4>
              <p>Otrzymujesz bezpieczny dostęp z w 100% spersonalizowanym planem i instrukcjami wideo.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <h4>Trening i logowanie postępów</h4>
              <p>Na treningu korzystasz z apki. Notujesz obciążenia, RIR, wgrywasz wideo – ja mam podgląd na żywo.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>4</div>
              <h4>Cotygodniowy feedback</h4>
              <p>Analizuję Twoje filmy z techniką i wyniki, a następnie na bieżąco modyfikuję Twój plan.</p>
            </div>
          </div>
        </div>

{/* CRO: ZMIANA CTA NA CALENDLY (POPRAWIONY DARK MODE) */}
        <div className={styles.cta} style={{
          textAlign: 'center', 
          padding: '4rem 2rem', 
          backgroundColor: 'rgba(23, 23, 23, 0.9)', 
          border: '2px solid var(--primary)',
          boxShadow: '0 10px 30px rgba(252, 163, 17, 0.15)',
          borderRadius: '16px', 
          marginTop: '4rem'
        }}>
          <h3 style={{fontSize: '2rem', marginBottom: '1rem', color: '#fff'}}>Zacznijmy od niezobowiązującej rozmowy</h3>
          <p style={{fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem', color: '#d1d5db', lineHeight: '1.6'}}>
            Zarezerwuj 15 minut w moim kalendarzu. Pokażę Ci, jak aplikacja wygląda od środka i sprawdzimy, czy to rozwiązanie pasuje do Twojego stylu życia. Zero presji na sprzedaż.
          </p>
          
          <a 
            href="https://calendly.com/maruszewskiirek" /* ZMIEŃ NA SWÓJ LINK DO WIDEO ROZMOWY */
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.8rem',
              backgroundColor: 'var(--primary)', 
              color: '#111', /* Ciemny tekst na pomarańczowym tle dla max kontrastu */
              padding: '1.2rem 2.5rem', borderRadius: '8px', 
              textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem',
              boxShadow: '0 4px 15px rgba(252, 163, 17, 0.3)',
              transition: 'all 0.3s ease'
            }}>
            <CalendarCheck size={24} />
            Wybierz termin rozmowy wideo
          </a>
        </div>

      </div>
    </section>
  );
};

export default OnlineTrainingClient;