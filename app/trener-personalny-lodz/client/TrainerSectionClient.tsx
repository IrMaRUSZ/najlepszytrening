'use client'
import React, { useRef } from 'react';
import Image from 'next/image';
import { Shield, Target, Heart, ChevronDown, Lock, CheckCircle, CalendarCheck } from 'lucide-react';
import styles from '../../../styles/trener-personalny-lodz.module.css';

const TrainerSectionClient = () => {
  const [openQuestion, setOpenQuestion] = React.useState<number | null>(null);
  
  // Referencja do sekcji kalendarza, żeby płynnie do niego scrollować
  const calendlyRef = useRef<HTMLDivElement>(null);

  const scrollToCalendly = (e: React.MouseEvent) => {
    e.preventDefault();
    calendlyRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const faqItems = [
    {
      question: "Zbyt wiele nieudanych prób treningowych? Dlaczego tym razem może być inaczej?",
      answer: "Z mojego doświadczenia wynika, że większość osób porzuca treningi z trzech powodów: źle dobrany plan, brak realnych efektów i nuda. Dlatego w mojej pracy skupiam się na tym, żeby treningi były SKUTECZNE i CIEKAWE. Sam przeszedłem przez żmudne okresy bez efektów, testując różne metody na własnej skórze. Teraz wiem, co działa, a co jest tylko marnowaniem czasu. Nie stosuję uniwersalnych planów pracujemy dokładnie nad tym, co przyniesie Ci najlepsze efekty."
    },
    {
      question: "Trening ma Cię stresować czy cieszyć? Jak podchodzę do motywacji",
      answer: "Wierzę, że trening ma być pozytywnym elementem dnia, a nie przykrym obowiązkiem. Za często spotykam się z podejściem 'no pain, no gain', które powoduje tylko to, że ludzie porzucają aktywność. W moim przypadku - kluczowa jest równowaga. Trening ma być wymagający (bez tego nie będzie efektów), ale również satysfakcjonujący. Skupiam się na małych zwycięstwach, celebruję postępy i podkreślam każdy, nawet najmniejszy sukces. Najlepszym dowodem na skuteczność takiego podejścia jest to, że ponad 80% moich podopiecznych zostaje ze mną dłużej niż rok - w branży, gdzie średnia to 3 miesiące."
    },
    {
      question: "Prowadzę bardzo intensywne życie. Jak wpasować trening w napięty grafik?",
      answer: "Sam łączę pracę trenera z innymi obowiązkami i doskonale rozumiem wyzwania związane z brakiem czasu. Dlatego oferuję elastyczny grafik treningów w różnych częściach Łodzi (Widzew, Bałuty, Centrum, Górna), również wczesnym rankiem (od 6:00) i późnym wieczorem (do 22:00). Co więcej, moje treningi są zoptymalizowane czasowo skuteczna sesja zajmuje nam 50-60 minut, a nie standardowe 90-120 minut jak u większości trenerów. Skracam do minimum zbędne przerwy i skupiam się na efektywności  bo wiem, że Twój czas jest na wagę złota."
    },
    {
      question: "Mam problem zdrowotny/kontuzję. Czy to dyskwalifikuje mnie z treningu?",
      answer: "Absolutnie nie! Połączenie mojego doświadczenia jako trenera personalnego z wiedzą z fizjoterapii daje unikalne spojrzenie na trening osób z ograniczeniami ruchowymi. Współpracuję z osobami po operacjach kolan, z przepuklinami kręgosłupa czy zaawansowaną osteoporozą. Wspólnie wypracowujemy bezpieczne, ale skuteczne metody treningu. Jednym z moich ulubionych wyzwań jest pokazanie podopiecznym, że mimo ograniczeń mogą więcej niż im się wydawało  widziałem zbyt wiele przypadków, gdy lekarze zbyt pochopnie zakazywali aktywności fizycznej, pogłębiając problemy zdrowotne."
    }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Trener Personalny Łódź bez ściemy, bez cudów, za to z efektami</h1>
          <p className={styles.subtitle}>
            Nazywam się Ireneusz Maruszewski. Od ponad 4 lat pomagam mieszkańcom Łodzi zmienić podejście do 
            treningów. Nie obiecuję rewolucji w 30 dni ani sekretnych metod. Zamiast tego daję praktyczną 
            wiedzę, motywację dopasowaną do Ciebie i plan, który faktycznie wykonasz w swoim zabieganym życiu.
          </p>
        </header>

        {/* --- UKRYWAM GŁÓWNY GRID DLA CZYTELNOŚCI - ZOSTAW SWÓJ ORYGINALNY --- */}
        <div className={styles.mainGrid}>
          <div className={styles.imageWrapper}>
            <Image src="/images/treningpersonalny.webp" alt="Trener personalny Łódź" fill className={styles.mainImage} priority />
            <div className={styles.imageOverlay} />
          </div>

          <div className={styles.cardGrid}>
            <article className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}><Shield className={styles.icon} /></div>
                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>Trenować mądrze, nie ciężej</h2>
                  <p className={styles.cardText}>Moja filozofia treningu? Efektywność zamiast efektowności. W Łodzi pełno jest motywatorów krzyczących na siłowniach. Ja oferuję inne podejście: trening dopasowany do Twojego poziomu. Bazuję na fizjologii i nauce, nie na mitach. Efekty przychodzą, gdy trenujemy mądrze.</p>
                </div>
              </div>
            </article>
            <article className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}><Target className={styles.icon} /></div>
                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>Trening dla zabieganych</h2>
                  <p className={styles.cardText}>Większość moich podopiecznych w Łodzi to osoby, które mają napięty grafik. Dlatego oferuję treningi trwające 45-60 minut. Wykorzystuję protokoły treningowe optymalizujące czas, żebyś mógł efektywnie trenować nawet po pracy.</p>
                </div>
              </div>
            </article>
            <article className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}><Heart className={styles.icon} /></div>
                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>Trener i partner w procesie zmiany</h2>
                  <p className={styles.cardText}>Sam przeszedłem przez proces transformacji. Wiem, kiedy potrzebny jest kop motywacyjny, a kiedy wsparcie. Po 4 latach pracy w Łodzi mogę powiedzieć, że często największe przeszkody są w głowie, nie w mięśniach.</p>
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* --- SEKCJA JAK WYGLĄDA TRENING - ZOSTAW ORYGINALNĄ --- */}
        <div className={styles.exampleTraining}>
          <h2 className={styles.sectionTitle}>Jak naprawdę wygląda trening ze mną w Łodzi</h2>
          {/* ... (Twój kod z TimeLineContainer - zostaw go bez zmian) ... */}
        </div>

{/* --- CRO: RESPONSYWNA SEKCJA CENNIKA --- */}
        <div className={styles.pricingWrapper}>
          <h2 className={styles.sectionTitle}>Inwestycja w Twoje zdrowie</h2>
          <p className={styles.subtitle} style={{textAlign: 'center', marginBottom: '2rem'}}>
            Cenię transparentność. Oto moje stawki. Jednak <strong style={{color: '#fff'}}>nie sprzedaję pakietów w ciemno</strong>. 
            Musimy mieć pewność, że to rozwiązanie jest dla Ciebie w 100% bezpieczne i że nadajemy na tych samych falach.
          </p>

          <div className={styles.pricingGrid}>
            
            {/* Pakiet 1: Darmowa Konsultacja */}
            <div className={`${styles.pricingCard} ${styles.pricingCardPrimary}`}>
              <div className={styles.pricingBadge}>KROK 1</div>
              <h3 style={{fontSize: '1.5rem', marginBottom: '0.5rem', textAlign: 'center', color: '#fff'}}>Konsultacja i Diagnoza</h3>
              <div className={styles.pricingPrice}>0 zł</div>
              
              <ul className={styles.pricingList}>
                <li className={styles.pricingListItem}>
                  <CheckCircle size={20} color="var(--primary)" /> 
                  <span>Wywiad i ocena zdrowia</span>
                </li>
                <li className={styles.pricingListItem}>
                  <CheckCircle size={20} color="var(--primary)" /> 
                  <span>Sprawdzenie wzorców ruchowych</span>
                </li>
                <li className={styles.pricingListItem}>
                  <CheckCircle size={20} color="var(--primary)" /> 
                  <span>Omówienie realnych celów</span>
                </li>
              </ul>

              <button onClick={scrollToCalendly} className={styles.ctaButton} style={{width: '100%', gap: '10px'}}>
                <CalendarCheck size={20} /> Wybierz termin
              </button>
            </div>

            {/* Pakiet 2: Płatne pakiety */}
            <div className={`${styles.pricingCard} ${styles.pricingCardSecondary}`}>
              <div style={{position: 'absolute', top: '15px', right: '15px', color: '#666'}}><Lock size={24} /></div>
              <h3 style={{fontSize: '1.5rem', marginBottom: '1.5rem', color: '#fff', paddingRight: '30px'}}>
                Współpraca <span style={{fontSize: '1rem', fontWeight: 'normal', color: '#6b7280', display: 'block', marginTop: '5px'}}>(Dostępne po konsultacji)</span>
              </h3>
              
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', color: '#e5e7eb'}}>
                <div className={styles.pricingRow}>
                  <span style={{fontWeight: 'bold', fontSize: '1.1rem'}}>Pojedynczy trening</span>
                  <span style={{fontWeight: 'bold', fontSize: '1.1rem', color: '#fff'}}>180 zł</span>
                </div>
                
                <div className={styles.pricingRow}>
                  <div>
                    <span style={{fontWeight: 'bold', fontSize: '1.1rem', display: 'block'}}>Pakiet 10 treningów</span>
                    <span style={{fontSize: '0.9rem', color: '#9ca3af'}}>Najczęściej wybierany</span>
                  </div>
                  <span style={{fontWeight: 'bold', fontSize: '1.1rem', color: '#fff'}}>160 zł / sesja</span>
                </div>
                
                <div className={styles.pricingRow}>
                  <span style={{fontWeight: 'bold', fontSize: '1.1rem'}}>Pakiet 20 treningów</span>
                  <span style={{fontWeight: 'bold', fontSize: '1.1rem', color: '#fff'}}>140 zł / sesja</span>
                </div>
              </div>

              <div className={styles.pricingDisclaimer}>
                <Shield size={20} style={{color: '#6b7280'}} />
                <p style={{margin: 0}}>Ze względu na jakość usług, przyjmuję podopiecznych tylko po wcześniejszym bezpłatnym spotkaniu zapoznawczym. Zarezerwuj je obok.</p>
              </div>
            </div>

          </div>
        </div>

        <div className={styles.faqSection}>
          <h2 className={styles.sectionTitle}>Pytania, które powinieneś zadać, zanim zaczniemy</h2>
          <div className={styles.faqGrid}>
            {faqItems.map((item, index) => (
              <div key={index} className={styles.faqItem} onClick={() => setOpenQuestion(openQuestion === index ? null : index)}>
                <div className={styles.faqQuestion}>
                  <h3>{item.question}</h3>
                  <ChevronDown className={`${styles.faqIcon} ${openQuestion === index ? styles.faqIconOpen : ''}`} />
                </div>
                <div className={`${styles.faqAnswer} ${openQuestion === index ? styles.faqAnswerOpen : ''}`}>
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- CRO: OSADZONY WIDŻET CALENDLY --- */}
        <div ref={calendlyRef} className={styles.calendlyContainer}>
          <h2 style={{textAlign: 'center', fontSize: '2rem', marginBottom: '1rem', color: '#111'}}>Wybierz termin darmowej konsultacji</h2>
          <p style={{textAlign: 'center', maxWidth: '600px', margin: '0 auto 2rem', color: '#555', lineHeight: '1.6'}}>
            Zajmie Ci to 15 sekund. Wybierz datę w kalendarzu poniżej. Zero zobowiązań – spotkajmy się i sprawdźmy, jak mogę Ci pomóc z Twoim celem.
          </p>
          
          <div className={styles.calendlyIframe}>
            <iframe
              src="https://calendly.com/maruszewskiirek?hide_gdpr_banner=1"
              width="100%"
              height="100%"
              frameBorder="0"
              title="Zarezerwuj darmową konsultację"
            ></iframe>
          </div>
        </div>

        <div className={styles.faqSection}>
          <h2 className={styles.sectionTitle}>Pytania, które powinieneś zadać, zanim zaczniemy</h2>
          <div className={styles.faqGrid}>
            {faqItems.map((item, index) => (
              <div key={index} className={styles.faqItem} onClick={() => setOpenQuestion(openQuestion === index ? null : index)}>
                <div className={styles.faqQuestion}>
                  <h3>{item.question}</h3>
                  <ChevronDown className={`${styles.faqIcon} ${openQuestion === index ? styles.faqIconOpen : ''}`} />
                </div>
                <div className={`${styles.faqAnswer} ${openQuestion === index ? styles.faqAnswerOpen : ''}`}>
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- CRO: OSADZONY WIDŻET CALENDLY --- */}
        <div ref={calendlyRef} style={{marginTop: '5rem', padding: '2rem 0', backgroundColor: '#f0efef', borderRadius: '16px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)'}}>
          <h2 style={{textAlign: 'center', fontSize: '2rem', marginBottom: '1rem'}}>Wybierz termin darmowej konsultacji</h2>
          <p style={{textAlign: 'center', maxWidth: '600px', margin: '0 auto 2rem', color: '#555'}}>
            Zajmie Ci to 15 sekund. Wybierz datę w kalendarzu poniżej. Zero zobowiązań – spotkajmy się i sprawdźmy, jak mogę Ci pomóc z Twoim celem.
          </p>
          
          {/* Iframe Calendly - bezpośrednie ładowanie */}
          <div style={{ height: '700px', width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
            <iframe
              src="https://calendly.com/maruszewskiirek?hide_gdpr_banner=1"
              width="100%"
              height="100%"
              frameBorder="0"
              title="Zarezerwuj darmową konsultację"
            ></iframe>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TrainerSectionClient;