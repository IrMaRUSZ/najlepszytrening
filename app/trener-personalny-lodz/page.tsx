// components/TrainingSection/index.tsx
"use client"
import React from 'react';
import Image from 'next/image';
import { Shield, Target, Heart, Clock, ChevronDown } from 'lucide-react';
import styles from '../../styles/trener-personalny-lodz.module.css';

const TrainingSection = () => {
  const [openQuestion, setOpenQuestion] = React.useState<number | null>(null);

  const faqItems = [
    {
      question: "Nigdy nie trenowałem/am. Czy dam radę?",
      answer: "Absolutnie tak! Każdy kiedyś zaczynał od zera. Pierwsze treningi skupiamy na nauce prawidłowej techniki i oswajaniu się z ćwiczeniami. Tempo dostosowuję do Twoich możliwości."
    },
    {
      question: "Jak często powinienem trenować?",
      answer: "To zależy od Twoich celów i możliwości czasowych. Zwykle zalecam 2-3 treningi tygodniowo na początek. W miarę postępów możemy zwiększyć częstotliwość."
    },
    {
      question: "Co jeśli mam kontuzję lub problemy zdrowotne?",
      answer: "Przed rozpoczęciem treningów dokładnie omówimy Twoją historię zdrowotną. Doświeram ćwiczenia tak, by były bezpieczne i nie powodowały dyskomfortu. W razie potrzeby współpracuję z fizjoterapeutami."
    },
    {
      question: "Ile trwa trening i jak wygląda?",
      answer: "Pojedynczy trening trwa około 60 minut. Zaczynamy od rozgrzewki, przechodzimy do części głównej dopasowanej do Twoich celów, a kończymy rozciąganiem. Przez cały czas jestem obok i dbam o prawidłową technikę."
    }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Pierwszy krok jest najtrudniejszy</h1>
          <p className={styles.subtitle}>
            Rozumiem Twoje obawy. Sam kiedyś zaczynałem i wiem, jak przytłaczająca może być siłownia 
            na początku. Dlatego jako trener skupiam się przede wszystkim na tym, żebyś czuł się 
            pewnie i bezpiecznie podczas każdego treningu.
          </p>
        </header>

        <div className={styles.mainGrid}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/treningpersonalny.webp"
              alt="Trening pod okiem doświadczonego trenera"
              fill
              className={styles.mainImage}
              priority
            />
            <div className={styles.imageOverlay} />
          </div>

          <div className={styles.cardGrid}>
            <article className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  <Shield className={styles.icon} />
                </div>
                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>Zero oceniania</h2>
                  <p className={styles.cardText}>
                    Pamiętasz ten stres przed pierwszym wejściem na siłownię? Te wszystkie spojrzenia? 
                    U mnie trenujesz w komfortowych warunkach, gdzie możesz skupić się tylko na sobie. 
                    Każdy ruch, każde ćwiczenie wykonujesz pod moim czujnym okiem.
                  </p>
                </div>
              </div>
            </article>

            <article className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  <Target className={styles.icon} />
                </div>
                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>Plan skrojony na miarę</h2>
                  <p className={styles.cardText}>
                    Każdy organizm jest inny. Dlatego zanim zaczniemy trenować, dokładnie poznam 
                    Twoją historię, tryb życia i cele. Wspólnie ustalimy plan, który będziesz 
                    w stanie realizować bez wywracania życia do góry nogami.
                  </p>
                </div>
              </div>
            </article>

            <article className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  <Heart className={styles.icon} />
                </div>
                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>Zawsze jestem obok</h2>
                  <p className={styles.cardText}>
                    Trening to nie tylko ćwiczenia. To także rozmowy o Twoich obawach, 
                    wątpliwościach i sukcesach. Jestem tu, by Cię zmotywować, gdy brakuje Ci sił, 
                    i pochwalić, gdy przekraczasz własne granice.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div className={styles.exampleTraining}>
          <h2 className={styles.sectionTitle}>Jak wygląda trening ze mną?</h2>
          <div className={styles.timelineContainer}>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot}>
                <Clock className={styles.timelineIcon} />
              </div>
              <div className={styles.timelineContent}>
                <h3>Przed treningiem</h3>
                <p>
                  Spotykamy się 10 minut przed treningiem. Irek pyta jak się czuję, czy nic mnie nie boli
                  i czy jestem gotowa na dzisiejsze wyzwania. Sprawdzamy postępy z ostatniego treningu
                  i omawiamy plan na dziś.
                </p>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.timelineDot}>
                <Clock className={styles.timelineIcon} />
              </div>
              <div className={styles.timelineContent}>
                <h3>Rozgrzewka (10-15 min)</h3>
                <p>
                  Zaczynamy od porządnej rozgrzewki. Irek zawsze tłumaczy, dlaczego wykonujemy dane 
                  ćwiczenie i jak wpływa na nasze ciało. Rozgrzewamy dokładnie te partie, które będziemy 
                  trenować.
                </p>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.timelineDot}>
                <Clock className={styles.timelineIcon} />
              </div>
              <div className={styles.timelineContent}>
                <h3>Trening główny (35-40 min)</h3>
                <p>
                  To najważniejsza część treningu. Każde ćwiczenie jest najpierw demonstrowane. 
                  Wykonuję wszystko pod czujnym okiem - Irek poprawia technikę, motywuje i pilnuje, żebym 
                  nie robiła nic ponad swoje możliwości. Między seriami mamy czas na złapanie oddechu i 
                  krótką rozmowę.
                </p>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.timelineDot}>
                <Clock className={styles.timelineIcon} />
              </div>
              <div className={styles.timelineContent}>
                <h3>Rozciąganie i podsumowanie (10 min)</h3>
                <p>
                  Na koniec zawsze jest czas na porządne rozciąganie. Omawiamy wykonany trening,
                  planujemy kolejny i dostaję wskazówki dotyczące regeneracji. Często też 
                  dostaję pracę domową - proste ćwiczenia do wykonania między treningami.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.faqSection}>
          <h2 className={styles.sectionTitle}>Najczęściej zadawane pytania</h2>
          <div className={styles.faqGrid}>
            {faqItems.map((item, index) => (
              <div 
                key={index} 
                className={styles.faqItem}
                onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
              >
                <div className={styles.faqQuestion}>
                  <h3>{item.question}</h3>
                  <ChevronDown 
                    className={`${styles.faqIcon} ${openQuestion === index ? styles.faqIconOpen : ''}`}
                  />
                </div>
                <div className={`${styles.faqAnswer} ${openQuestion === index ? styles.faqAnswerOpen : ''}`}>
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.ctaContainer}>
          <a 
            href="https://calendly.com/maruszewskiirek" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            Umów darmową konsultację
          </a>
        </div>
      </div>
    </section>
  );
};

export default TrainingSection;