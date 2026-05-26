'use client'
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Shield, Activity, HeartPulse, ChevronDown, Lock, CheckCircle, CalendarCheck } from 'lucide-react';
// Używamy tego samego pliku CSS co w trenerze, by zachować spójność wizualną
import styles from '../../../styles/trener-personalny-lodz.module.css';

const PhysioSectionClient = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  
  const calendlyRef = useRef<HTMLDivElement>(null);

  const scrollToCalendly = (e: React.MouseEvent) => {
    e.preventDefault();
    calendlyRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const faqItems = [
    {
      question: "Boli mnie kręgosłup / kolano. Czy w ogóle powinienem trenować?",
      answer: "Odpowiednio dobrany ruch to najskuteczniejsze lekarstwo. Najgorsze, co możesz zrobić przy przewlekłym bólu (np. dyskopatii), to całkowicie przestać się ruszać. Jako fizjoterapeuta i trener medyczny diagnozuję problem, a następnie dobieram ćwiczenia tak, aby odciążyć bolące struktury i wzmocnić te, które za ten ból odpowiadają."
    },
    {
      question: "Czym różni się trening medyczny od zwykłego treningu personalnego?",
      answer: "Zwykły trening skupia się na budowaniu sylwetki czy siły ogólnej. Trening medyczny (terapia ruchem) skupia się na usunięciu asymetrii, przywróceniu pełnego zakresu ruchu i wzmocnieniu słabych ogniw po kontuzjach lub operacjach. To pomost między leżanką u fizjoterapeuty a powrotem do normalnego, ciężkiego dźwigania."
    },
    {
      question: "Jestem po operacji (np. rekonstrukcji ACL). Czy możesz mi pomóc?",
      answer: "Zdecydowanie tak. Fizjoterapia sportowa i powrót do sprawności (RTP - Return to Play) po zabiegach ortopedycznych to jeden z moich głównych obszarów działania. Wprowadzam pacjentów od wczesnego etapu rehabilitacji ruchowej aż do momentu, gdy mogą wrócić do swojego ulubionego sportu bez strachu o ponowny uraz."
    },
    {
      question: "Jak wygląda pierwsze spotkanie (konsultacja)?",
      answer: "Pierwsze spotkanie jest darmowe i polega na dogłębnej diagnostyce. Przeprowadzam wywiad, sprawdzam Twoją postawę, zakresy ruchomości w stawach i wykonuję testy funkcjonalne. Szukam przyczyny Twojego bólu lub ograniczeń, a nie tylko skupiam się na objawach."
    },
    {
      question: "Ile kosztuje wizyta fizjoterapeutyczna / trening medyczny?",
      answer: "Pojedyncza sesja treningu medycznego/rehabilitacji ruchowej to koszt 180 zł. Przy dłuższej współpracy w pakietach cena spada (160 zł/sesję przy 10 treningach, 140 zł/sesję przy 20 treningach). Pierwsza diagnoza jest całkowicie darmowa."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <section className={styles.section}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Fizjoterapeuta i Trener Medyczny Łódź – Wróć do sprawności bez bólu</h1>
          <p className={styles.subtitle}>
            Leżenie na kozetce nie rozwiąże problemu na zawsze. Połączenie wiedzy fizjoterapeuty i 
            narzędzi trenera personalnego to najskuteczniejsza droga. Pomagam usunąć ból, wracać do sportu 
            po kontuzjach i trenować bezpiecznie mimo ograniczeń zdrowotnych.
          </p>
        </header>

        <div className={styles.mainGrid}>
          <div className={styles.imageWrapper}>
            {/* SUGERUJĘ ZMIANĘ OBRAZKA NA TAKI GDZIE KOGOŚ POPRAWIASZ LUB ROBISZ DIAGNOZĘ */}
            <Image src="/images/treningpersonalny.webp" alt="Trener medyczny i fizjoterapeuta Łódź" fill className={styles.mainImage} priority />
            <div className={styles.imageOverlay} />
          </div>

          <div className={styles.cardGrid}>
            <article className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}><Activity className={styles.icon} /></div>
                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>Fizjoterapia Aktywna</h2>
                  <p className={styles.cardText}>Masaż przynosi ulgę na chwilę. Aby ból nie wrócił, musimy wzmocnić osłabione struktury. Diagnozuję problem i wprowadzam celowaną terapię ruchem, która uderza w przyczynę, a nie tylko w objawy.</p>
                </div>
              </div>
            </article>
            <article className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}><Shield className={styles.icon} /></div>
                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>Powrót po kontuzjach (RTP)</h2>
                  <p className={styles.cardText}>Skręcona kostka? Zerwane więzadła? Przepuklina kręgosłupa? Przeprowadzę Cię od momentu zakończenia ostrej fazy leczenia aż do powrotu do pełnej aktywności fizycznej, budując pewność Twojego ciała.</p>
                </div>
              </div>
            </article>
            <article className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}><HeartPulse className={styles.icon} /></div>
                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>Trening Medyczny</h2>
                  <p className={styles.cardText}>Jeśli lekarz kazał Ci &quot;przestać dźwigać&quot;, prawdopodobnie się mylił.</p>
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* CENNIK (Zostawiamy strukturę, lekko zmieniamy copywriting) */}
        <div className={styles.pricingWrapper} style={{marginTop: '4rem'}}>
          <h2 className={styles.sectionTitle}>Inwestycja w Twoje Zdrowie i Ciało bez Bólu</h2>
          <p className={styles.subtitle} style={{textAlign: 'center', marginBottom: '2rem'}}>
            Zanim zapłacisz mi złotówkę, muszę sprawdzić z czym mamy do czynienia. <strong style={{color: '#fff'}}>Nie zgaduję</strong>. 
            Rozpoczynamy od darmowej diagnostyki funkcjonalnej, by ułożyć bezpieczny plan działania.
          </p>

          <div className={styles.pricingGrid}>
            <div className={`${styles.pricingCard} ${styles.pricingCardPrimary}`}>
              <div className={styles.pricingBadge}>KROK 1</div>
              <h3 style={{fontSize: '1.5rem', marginBottom: '0.5rem', textAlign: 'center', color: '#fff'}}>Diagnoza Fizjoterapeutyczna</h3>
              <div className={styles.pricingPrice}>0 zł</div>
              
              <ul className={styles.pricingList}>
                <li className={styles.pricingListItem}>
                  <CheckCircle size={20} color="var(--primary)" /> 
                  <span>Testy ruchomości stawów</span>
                </li>
                <li className={styles.pricingListItem}>
                  <CheckCircle size={20} color="var(--primary)" /> 
                  <span>Ocena wzorców ruchowych</span>
                </li>
                <li className={styles.pricingListItem}>
                  <CheckCircle size={20} color="var(--primary)" /> 
                  <span>Wytypowanie przyczyny bólu/ograniczeń</span>
                </li>
              </ul>

              <button onClick={scrollToCalendly} className={styles.ctaButton} style={{width: '100%', gap: '10px'}}>
                <CalendarCheck size={20} /> Umów darmową diagnozę
              </button>
            </div>

            <div className={`${styles.pricingCard} ${styles.pricingCardSecondary}`}>
              <div style={{position: 'absolute', top: '15px', right: '15px', color: '#666'}}><Lock size={24} /></div>
              <h3 style={{fontSize: '1.5rem', marginBottom: '1.5rem', color: '#fff', paddingRight: '30px'}}>
                Trening Medyczny <span style={{fontSize: '1rem', fontWeight: 'normal', color: '#6b7280', display: 'block', marginTop: '5px'}}>(Terapia ruchem)</span>
              </h3>
              
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', color: '#e5e7eb'}}>
                <div className={styles.pricingRow}>
                  <span style={{fontWeight: 'bold', fontSize: '1.1rem'}}>Pojedyncza sesja (ok. 60 min)</span>
                  <span style={{fontWeight: 'bold', fontSize: '1.1rem', color: '#fff'}}>180 zł</span>
                </div>
                
                <div className={styles.pricingRow}>
                  <div>
                    <span style={{fontWeight: 'bold', fontSize: '1.1rem', display: 'block'}}>Pakiet 10 sesji</span>
                    <span style={{fontSize: '0.9rem', color: '#9ca3af'}}>Polecany przy urazach</span>
                  </div>
                  <span style={{fontWeight: 'bold', fontSize: '1.1rem', color: '#fff'}}>160 zł / sesja</span>
                </div>
                
                <div className={styles.pricingRow}>
                  <span style={{fontWeight: 'bold', fontSize: '1.1rem'}}>Pakiet 20 sesji</span>
                  <span style={{fontWeight: 'bold', fontSize: '1.1rem', color: '#fff'}}>140 zł / sesja</span>
                </div>
              </div>

              <div className={styles.pricingDisclaimer}>
                <Shield size={20} style={{color: '#6b7280'}} />
                <p style={{margin: 0}}>Rehabilitacja aktywna to proces. Wymaga wywiadu medycznego, dlatego pierwszym krokiem jest darmowa konsultacja.</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.faqSection}>
          <h2 className={styles.sectionTitle}>Najczęstsze obawy (FAQ)</h2>
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

        <div style={{ margin: '4rem 0', display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', textAlign: 'center' }}>
          <section>
            <h2 className={styles.sectionTitle} style={{ marginBottom: '1rem' }}>Gdzie trenujemy i rehabilitujemy?</h2>
            <p className={styles.subtitle} style={{ margin: '0 auto' }}>
              Gabinetów masażu jest wiele, my stawiamy na ruch. Spotykamy się na świetnie wyposażonej 
              siłowni <strong>Just Gym w Łodzi</strong> (dzielnica Dąbrowa).
            </p>
          </section>

          <address className={styles.napSection} style={{ fontStyle: 'normal', lineHeight: '1.8' }}>
            <strong style={{ fontSize: '1.2rem', color: 'var(--foreground)' }}>Ireneusz Maruszewski – Fizjoterapeuta sportowy Łódź</strong><br />
            Just Gym, ul. Poli Gojawiczyńskiej 26, 93-239 Łódź<br />
            <a href="tel:+48737730868" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 'bold' }}>+48 737 730 868</a><br />
            <a href="mailto:maruszewskiirek@gmail.com" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 'bold' }}>maruszewskiirek@gmail.com</a>
          </address>
        </div>

        <div ref={calendlyRef} className={styles.calendlyContainer}>
          <h2 style={{textAlign: 'center', fontSize: '2rem', marginBottom: '1rem', color: '#111'}}>Zrób pierwszy krok do sprawności</h2>
          <p style={{textAlign: 'center', maxWidth: '600px', margin: '0 auto 2rem', color: '#555', lineHeight: '1.6'}}>
            Wybierz termin poniżej. Na darmowej konsultacji zdiagnozuję Twój problem, wykonamy testy ruchowe i powiem Ci dokładnie, jak mogę pomóc w Twoim przypadku.
          </p>
          
          <div className={styles.calendlyIframe}>
            <iframe
              src="https://calendly.com/maruszewskiirek?hide_gdpr_banner=1"
              width="100%"
              height="100%"
              frameBorder="0"
              title="Zarezerwuj darmową diagnozę fizjoterapeutyczną"
            ></iframe>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PhysioSectionClient;