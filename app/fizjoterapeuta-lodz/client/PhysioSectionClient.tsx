'use client'
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Shield, Activity, HeartPulse, ChevronDown, Lock, CheckCircle, CalendarCheck, Star, ChevronLeft, ChevronRight, Phone, Mail, MapPin } from 'lucide-react';
import styles from '../../../styles/trener-personalny-lodz.module.css';

const PhysioSectionClient = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  
  // --- LOGIKA PRZEKIEROWANIA PO REZERWACJI CALENDLY ---
  useEffect(() => {
    const handleCalendlyEvent = (e: MessageEvent) => {
      if (e.origin !== 'https://calendly.com') return;
      if (e.data && e.data.event === 'calendly.event_scheduled') {
        window.location.href = '/potwierdzenie';
      }
    };
    window.addEventListener('message', handleCalendlyEvent);
    return () => window.removeEventListener('message', handleCalendlyEvent);
  }, []);

  // --- LOGIKA KARUZELI ZDJĘĆ ---
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const galleryImages = [
    { src: "/images/Studycase.webp", alt: "Diagnoza fizjoterapeutyczna Łódź" },
    { src: "/images/treningpersonalny.webp", alt: "Rehabilitacja ruchowa i trening medyczny" },
    { src: "/images/treningpersonalny2.webp", alt: "Ireneusz Maruszewski Trener Medyczny" }
  ];

  const nextImg = () => setCurrentImgIndex((prev) => (prev + 1) % galleryImages.length);
  const prevImg = () => setCurrentImgIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  useEffect(() => {
    const timer = setInterval(nextImg, 5000);
    return () => clearInterval(timer);
  }, []);

  const calendlyRef = useRef<HTMLDivElement>(null);

  const scrollToCalendly = (e: React.MouseEvent) => {
    e.preventDefault();
    calendlyRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const faqItems = [
    {
      question: "Boli mnie kręgosłup lub kolano. Czy w ogóle powinienem trenować?",
      answer: "Odpowiednio dobrany ruch to najskuteczniejsze lekarstwo. Najgorsze, co możesz zrobić przy przewlekłym bólu na przykład dyskopatii, to całkowicie przestać się ruszać. Jako fizjoterapeuta i trener medyczny diagnozuję problem, a następnie dobieram ćwiczenia tak, aby odciążyć bolące struktury i wzmocnić te, które za ten ból odpowiadają."
    },
    {
      question: "Czym różni się trening medyczny od zwykłego treningu personalnego?",
      answer: "Zwykły trening skupia się na budowaniu sylwetki czy siły ogólnej. Trening medyczny czyli terapia ruchem skupia się na usunięciu asymetrii, przywróceniu pełnego zakresu ruchu i wzmocnieniu słabych ogniw po kontuzjach lub operacjach. To idealny pomost między leżanką u fizjoterapeuty a powrotem do normalnego, ciężkiego dźwigania."
    },
    {
      question: "Jestem po operacji na przykład rekonstrukcji ACL. Czy możesz mi pomóc?",
      answer: "Zdecydowanie tak. Fizjoterapia sportowa i powrót do sprawności RTP Return to Play po zabiegach ortopedycznych to jeden z moich głównych obszarów działania. Wprowadzam pacjentów od wczesnego etapu rehabilitacji ruchowej aż do momentu, gdy mogą wrócić do swojego ulubionego sportu bez strachu o ponowny uraz."
    },
    {
      question: "Jak wygląda pierwsze spotkanie i konsultacja?",
      answer: "Pierwsze spotkanie jest darmowe i polega na dogłębnej diagnostyce. Przeprowadzam wywiad, sprawdzam Twoją postawę, zakresy ruchomości w stawach i wykonuję testy funkcjonalne. Szukam przyczyny Twojego bólu lub ograniczeń, a nie tylko skupiam się na objawach."
    },
    {
      question: "Ile kosztuje wizyta fizjoterapeutyczna oraz trening medyczny?",
      answer: "Pojedyncza sesja treningu medycznego i rehabilitacji ruchowej to koszt 180 zł. Przy dłuższej współpracy w pakietach cena spada do 160 zł za sesję przy dziesięciu treningach oraz 140 zł za sesję przy dwudziestu treningach. Pierwsza diagnoza jest całkowicie darmowa."
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
    <section className={styles.trainingSection}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.socialProofBadge}>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={20} fill="#fca311" color="#fca311" />)}
            </div>
            <span>Fizjoterapeuta i Trener. Dziesiątki udanych rehabilitacji w Łodzi.</span>
          </div>

          <h1 className={styles.title}>Fizjoterapeuta i Trener Medyczny Łódź. Wróć do sprawności bez bólu.</h1>
          <p className={styles.subtitle}>
            Leżenie na kozetce nie rozwiąże problemu na zawsze. Połączenie wiedzy fizjoterapeuty i 
            narzędzi trenera personalnego to najskuteczniejsza droga. Pomagam usunąć ból, wracać do sportu 
            po kontuzjach i trenować bezpiecznie mimo ograniczeń zdrowotnych.
          </p>

          <div className={styles.heroActions}>
            <button onClick={scrollToCalendly} className={styles.mainCtaButton}>
              <CalendarCheck size={20} />
              Umów darmową diagnozę
            </button>
            <p className={styles.guaranteeText}>
              <Shield size={16} /> Zero ukrytych kosztów. Brak zobowiązań po pierwszej wizycie.
            </p>
          </div>
        </header>

        <div className={styles.mainGrid}>
          
          {/* KARUZELA ZDJĘĆ */}
          <div className={styles.imageWrapper}>
            {galleryImages.map((img, index) => (
              <Image 
                key={index}
                src={img.src}
                alt={img.alt}
                fill
                className={`${styles.mainImage} ${index === currentImgIndex ? styles.activeImage : styles.inactiveImage}`}
                priority={index === 0} 
              />
            ))}
            <div className={styles.imageOverlay} />
            
            <button type="button" onClick={prevImg} className={`${styles.carouselBtn} ${styles.carouselBtnLeft}`} aria-label="Poprzednie zdjęcie">
              <ChevronLeft size={24} />
            </button>
            <button type="button" onClick={nextImg} className={`${styles.carouselBtn} ${styles.carouselBtnRight}`} aria-label="Następne zdjęcie">
              <ChevronRight size={24} />
            </button>
            
            <div className={styles.carouselDots}>
              {galleryImages.map((_, idx) => (
                <button 
                  key={idx}
                  type="button"
                  onClick={() => setCurrentImgIndex(idx)}
                  className={`${styles.dot} ${idx === currentImgIndex ? styles.activeDot : ''}`}
                  aria-label={`Przejdź do zdjęcia numer ${idx + 1}`}
                />
              ))}
            </div>
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
                  <h2 className={styles.cardTitle}>Powrót po kontuzjach RTP</h2>
                  <p className={styles.cardText}>Skręcona kostka? Zerwane więzadła? Przepuklina kręgosłupa? Przeprowadzę Cię od momentu zakończenia ostrej fazy leczenia aż do powrotu do pełnej aktywności fizycznej, budując pewność Twojego ciała.</p>
                </div>
              </div>
            </article>
            <article className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}><HeartPulse className={styles.icon} /></div>
                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>Trening Medyczny</h2>
                  <p className={styles.cardText}>Jeśli lekarz kazał Ci przestać dźwigać, prawdopodobnie się mylił. Ruch to zdrowie, trzeba tylko wiedzieć jak go poprawnie dawkować przy Twoich dolegliwościach.</p>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div className={styles.pricingWrapper}>
          <h2 className={styles.sectionTitle}>Inwestycja w Twoje Zdrowie i Ciało bez Bólu</h2>
          <p className={styles.subtitle} style={{textAlign: 'center', marginBottom: '2rem'}}>
            Zanim zapłacisz mi złotówkę, muszę sprawdzić z czym mamy do czynienia. Nie zgaduję. 
            Rozpoczynamy od darmowej diagnostyki funkcjonalnej, by ułożyć bezpieczny plan działania.
          </p>

          <div className={styles.pricingGrid}>
            <div className={`${styles.pricingCard} ${styles.pricingCardPrimary}`}>
              <div className={styles.pricingBadge}>KROK 1 ZACZNIJ TUTAJ</div>
              <h3 className={styles.pricingCardTitle}>Diagnoza Fizjoterapeutyczna</h3>
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
                  <span>Wytypowanie przyczyny bólu i ograniczeń</span>
                </li>
              </ul>

              <button onClick={scrollToCalendly} className={styles.ctaButton} style={{width: '100%', gap: '10px'}}>
                <CalendarCheck size={20} /> Umów darmową diagnozę
              </button>
            </div>

            <div className={`${styles.pricingCard} ${styles.pricingCardSecondary}`}>
              <div className={styles.lockIcon}><Lock size={24} /></div>
              <h3 className={styles.pricingCardTitle}>
                Trening Medyczny <span className={styles.pricingSubTitle}>(Terapia ruchem)</span>
              </h3>
              
              <div className={styles.pricingRowsContainer}>
                <div className={styles.pricingRow}>
                  <span className={styles.pricingName}>Pojedyncza sesja około 60 minut</span>
                  <span className={styles.pricingValue}>180 zł</span>
                </div>
                
                <div className={`${styles.pricingRow} ${styles.pricingRowHighlight}`}>
                  <div>
                    <span className={styles.pricingName}>Pakiet dziesięciu sesji</span>
                    <span className={styles.pricingHighlightText}>Polecany przy urazach</span>
                  </div>
                  <span className={styles.pricingValue}>160 zł <span style={{fontSize:'0.8rem', fontWeight:'normal'}}>za sesję</span></span>
                </div>
                
                <div className={styles.pricingRow}>
                  <span className={styles.pricingName}>Pakiet dwudziestu sesji</span>
                  <span className={styles.pricingValue}>140 zł <span style={{fontSize:'0.8rem', fontWeight:'normal'}}>za sesję</span></span>
                </div>
              </div>

              <div className={styles.pricingDisclaimer}>
                <Shield size={20} style={{flexShrink: 0}} />
                <p>Rehabilitacja aktywna to proces. Wymaga wywiadu medycznego, dlatego pierwszym krokiem jest darmowa konsultacja.</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.faqSection}>
          <h2 className={styles.sectionTitle}>Najczęstsze obawy pacjentów</h2>
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

        <div className={styles.napContainer}>
          <h2 className={styles.sectionTitle} style={{ marginBottom: '1rem' }}>Gdzie trenujemy i rehabilitujemy?</h2>
          <p className={styles.subtitle}>
            Gabinetów masażu jest wiele, my stawiamy na powrót do pełnej aktywności. Spotykamy się na świetnie wyposażonej 
            siłowni <strong>Just Gym w Łodzi</strong> na Dąbrowie.
          </p>

          <address className={styles.napAddress}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <strong style={{ fontSize: '1.2rem', color: '#fff' }}>Ireneusz Maruszewski Fizjoterapeuta sportowy Łódź</strong>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', justifyContent: 'center', color: '#9ca3af', marginTop: '1rem' }}>
                <MapPin size={20} color="#fca311" /> 
                <span>Just Gym, ul. Poli Gojawiczyńskiej 26, 93 239 Łódź</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', justifyContent: 'center' }}>
                <Phone size={20} color="#fca311" /> 
                <a href="tel:+48737730868" style={{ color: '#fca311', textDecoration: 'none', fontWeight: 'bold' }}>+48 737 730 868</a>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', justifyContent: 'center' }}>
                <Mail size={20} color="#fca311" /> 
                <a href="mailto:maruszewskiirek@gmail.com" style={{ color: '#fca311', textDecoration: 'none', fontWeight: 'bold' }}>maruszewskiirek@gmail.com</a>
              </div>
            </div>
          </address>
        </div>

        <div ref={calendlyRef} className={styles.calendlyContainer}>
          <h2 className={styles.calendlyTitle}>Zrób pierwszy krok do sprawności</h2>
          <p className={styles.calendlySubtitle}>
            Wybierz termin poniżej. Na darmowej konsultacji zdiagnozuję Twój problem, wykonamy testy ruchowe i powiem Ci dokładnie, jak mogę pomóc w Twoim przypadku.
          </p>
          
          {React.useMemo(() => (
            <div className={styles.calendlyIframe}>
              <iframe
                src="https://calendly.com/maruszewskiirek?hide_gdpr_banner=1&embed_domain=najlepszytrening.pl&embed_type=Inline"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Zarezerwuj darmową diagnozę fizjoterapeutyczną"
              ></iframe>
            </div>
          ), [])}

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <p style={{ fontSize: '0.9rem', color: '#9ca3af', marginBottom: '1rem' }}>
              Kalendarz ładuje się zbyt długo?
            </p>
            <a 
              href="https://calendly.com/maruszewskiirek" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.mainCtaButton}
              style={{ display: 'inline-flex', textDecoration: 'none' }}
            >
              <CalendarCheck size={20} />
              Otwórz kalendarz w nowym oknie
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PhysioSectionClient;