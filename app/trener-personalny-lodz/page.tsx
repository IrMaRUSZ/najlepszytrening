
//trener-personalny-lodz/page.tsx
'use client'
import React from 'react';
import Image from 'next/image';
import { Shield, Target, Heart, Clock, ChevronDown } from 'lucide-react';
import styles from '../../styles/trener-personalny-lodz.module.css';

export async function generateMetadata() {
  return {
    title: "Trener Personalny Łódź | Profesjonalne Treningi | Najlepszy Trening",
    description: "Profesjonalny trener personalny w Łodzi. Indywidualne plany treningowe, wsparcie dietetyczne i treningi dostosowane do Twoich celów. Pierwsze spotkanie bezpłatne!",
    keywords: "trener personalny łódź, indywidualny trening, plany treningowe, trening personalny, siłownia łódź, treningi indywidualne",
    openGraph: {
      title: "Trener Personalny Łódź | Profesjonalne Treningi | Najlepszy Trening",
      description: "Profesjonalny trener personalny w Łodzi. Indywidualne plany treningowe, wsparcie dietetyczne i treningi dostosowane do Twoich celów. Pierwsze spotkanie bezpłatne!",
      url: "https://www.najlepszytrening.pl/trener-personalny-lodz",
      type: "website",
      images: [
        {
          url: "/images/trainer-about.webp",
          width: 1200,
          height: 630,
          alt: "Profesjonalny Trener Personalny Łódź - Najlepszy Trening"
        }
      ]
    }
  }
}
const TrainingSection = () => {
  const [openQuestion, setOpenQuestion] = React.useState<number | null>(null);

  const faqItems = [
    {
      question: "Zbyt wiele nieudanych prób treningowych? Dlaczego tym razem może być inaczej?",
      answer: "Z mojego doświadczenia wynika, że większość osób porzuca treningi z trzech powodów: źle dobrany plan, brak realnych efektów i nuda. Dlatego w mojej pracy skupiam się na tym, żeby treningi były SKUTECZNE i CIEKAWE. Sam przeszedłem przez żmudne okresy bez efektów, testując różne metody na własnej skórze. Teraz wiem, co działa, a co jest tylko marnowaniem czasu. Nie stosuję uniwersalnych planów - pracujemy dokładnie nad tym, co przyniesie Ci najlepsze efekty."
    },
    {
      question: "Trening ma Cię stresować czy cieszyć? Jak podchodzę do motywacji",
      answer: "Wierzę, że trening ma być pozytywnym elementem dnia, a nie przykrym obowiązkiem. Za często spotykam się z podejściem 'no pain, no gain', które powoduje tylko to, że ludzie porzucają aktywność. W moim przypadku - kluczowa jest równowaga. Trening ma być wymagający (bez tego nie będzie efektów), ale również satysfakcjonujący. Skupiam się na małych zwycięstwach, celebruję postępy i podkreślam każdy, nawet najmniejszy sukces. Najlepszym dowodem na skuteczność takiego podejścia jest to, że ponad 80% moich podopiecznych zostaje ze mną dłużej niż rok - w branży, gdzie średnia to 3 miesiące."
    },
    {
      question: "Prowadzę bardzo intensywne życie. Jak wpasować trening w napiętny grafik?",
      answer: "Sam łączę pracę trenera z innymi obowiązkami i doskonale rozumiem wyzwania związane z brakiem czasu. Dlatego oferuję elastyczny grafik treningów w różnych częściach Łodzi (Widzew, Bałuty, Centrum, Górna), również wczesnym rankiem (od 6:00) i późnym wieczorem (do 22:00). Co więcej, moje treningi są zoptymalizowane czasowo - skuteczna sesja zajmuje nam 50-60 minut, a nie standardowe 90-120 minut jak u większości trenerów. Skracam do minimum zbędne przerwy i skupiam się na efektywności - bo wiem, że Twój czas jest na wagę złota."
    },
    {
      question: "Mam problem zdrowotny/kontuzję. Czy to dyskwalifikuje mnie z treningu?",
      answer: "Absolutnie nie! Połączenie mojego doświadczenia jako trenera personalnego z wiedzą z fizjoterapii daje unikalne spojrzenie na trening osób z ograniczeniami ruchowymi. Współpracuję z osobami po operacjach kolan, z przepuklinami kręgosłupa czy zaawansowaną osteoporozą. Wspólnie wypracowujemy bezpieczne, ale skuteczne metody treningu. Jednym z moich ulubionych wyzwań jest pokazanie podopiecznym, że mimo ograniczeń mogą więcej niż im się wydawało - widziałem zbyt wiele przypadków, gdy lekarze zbyt pochopnie zakazywali aktywności fizycznej, pogłębiając problemy zdrowotne."
    }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Trener Personalny Łódź - bez ściemy, bez cudów, za to z efektami</h1>
          <p className={styles.subtitle}>
            Nazywam się Ireneusz Maruszewski. Od ponad 4 lat pomagam mieszkańcom Łodzi zmienić podejście do 
            treningów. Nie obiecuję rewolucji w 30 dni ani sekretnych metod. Zamiast tego daję praktyczną 
            wiedzę, motywację dopasowaną do Ciebie i plan, który faktycznie wykonasz w swoim zabieganym życiu.
          </p>
        </header>

        <div className={styles.mainGrid}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/treningpersonalny.webp"
              alt="Ireneusz Maruszewski - trener personalny Łódź podczas treningu z podopiecznym"
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
                  <h2 className={styles.cardTitle}>Trenować mądrze, nie ciężej</h2>
                  <p className={styles.cardText}>
                    Moja filozofia treningu? Efektywność zamiast efektowności. W Łodzi pełno jest 
                    motywatorów krzyczących na siłowniach. Ja oferuję inne podejście: trening dopasowany 
                    do Twojego poziomu i możliwości. Bazuję na fizjologii i nauce, nie na mitach z czasopism 
                    fitness. Efekty przychodzą, gdy trenujemy mądrze - nie koniecznie najciężej.
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
                  <h2 className={styles.cardTitle}>Trening dla zabieganych</h2>
                  <p className={styles.cardText}>
                    Większość moich podopiecznych w Łodzi to osoby, które mają napięty grafik. 
                    Dlatego oferuję treningi trwające 45-60 minut.
                    Wykorzystuję protokoły treningowe optymalizujące czas (jak superserie, czy myo-reps), 
                    żebyś mógł efektywnie trenować nawet między spotkaniami czy po pracy.
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
                  <h2 className={styles.cardTitle}>Trener i partner w procesie zmiany</h2>
                  <p className={styles.cardText}>
                    Sam przeszedłem przez proces transformacji - od osoby szukającej w ćwiczeniach ucieczki 
                    od codziennych problemów do profesjonalnego trenera. Rozumiem zarówno fizyczne, jak i 
                    psychologiczne aspekty treningów. Wiem, kiedy potrzebny jest kop motywacyjny, a kiedy 
                    wsparcie. Po 4 latach pracy w Łodzi mogę powiedzieć, że często największe przeszkody są 
                    w głowie, nie w mięśniach.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div className={styles.exampleTraining}>
          <h2 className={styles.sectionTitle}>Jak naprawdę wygląda trening ze mną w Łodzi - bez lukru</h2>
          <div className={styles.timelineContainer}>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot}>
                <Clock className={styles.timelineIcon} />
              </div>
              <div className={styles.timelineContent}>
                <h3>Konsultacja początkowa (jednorazowo, bezpłatna)</h3>
                <p>
                  Zaczynamy od solidnej analizy. Omawiam Twoje doświadczenia, cele, przeszkody i możliwości. 
                  Wykonuję podstawowe pomiary i ocenę możliwośći, które pokazują stan wyjściowy. Szczerze mówię, 
                  co jest możliwe do osiągnięcia w danym czasie, co będzie potrzebne z Twojej strony i jakie 
                  elementy planu są kluczowe.
                </p>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.timelineDot}>
                <Clock className={styles.timelineIcon} />
              </div>
              <div className={styles.timelineContent}>
                <h3>Rozgrzewka (5 min)</h3>
                <p>
                  Zapomnij o nudnym bieganiu na bieżni. Moje rozgrzewki są funkcjonalne i specyficzne dla 
                  planowanego treningu.  To nie jest 
                  strata czasu - to już część treningu, która zwiększa efektywność głównej części.
                </p>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.timelineDot}>
                <Clock className={styles.timelineIcon} />
              </div>
              <div className={styles.timelineContent}>
                <h3>Część główna (40-45 min)</h3>
                <p>
                  Tu zaczyna się prawdziwa zabawa. Każdy trening to trochę inna historia.
                  Wykorzystuję różnorodne narzędzia - od klasycznych wolnych ciężarów, przez taśmy oporowe, 
                  kettlebell, po własną masę ciała. Jednego możesz być pewien: nigdy się nie znudzisz i 
                  zawsze będziesz czuć, że zrobiłeś dobrą robotę. Mój rekord? Podopieczny, który współpracuje 
                  ze mną już 3 lata, a każdy trening wciąż jest dla niego wyzwaniem.
                </p>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.timelineDot}>
                <Clock className={styles.timelineIcon} />
              </div>
              <div className={styles.timelineContent}>
                <h3>Zakończenie i feedback (5-10 min)</h3>
                <p>
                  Ta krótka część jest kluczowa dla długoterminowych efektów. Koncentrujemy się na rozluźnieniu, 
                  wykonujemy proste ćwiczenia rozciągające, ale przede wszystkim - rozmawiamy. Chcę wiedzieć, jak 
                  się czujesz, co było zbyt łatwe, a co zbyt trudne, co Ci się podobało, a co nie. Ten feedback 
                  pozwala mi modyfikować Twój plan na bieżąco.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.faqSection}>
          <h2 className={styles.sectionTitle}>Pytania, które powinieneś zadać, zanim zaczniemy</h2>
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
            Umów bezpłatną konsultację w Łodzi (bez zobowiązań)
          </a>
        </div>
      </div>
    </section>
  );
};

export default TrainingSection;