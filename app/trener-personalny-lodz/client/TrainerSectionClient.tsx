'use client'
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Shield, Target, Heart, ChevronDown, Lock, CheckCircle, CalendarCheck, Star, Activity, ChevronLeft, ChevronRight, Phone, Mail, MapPin } from 'lucide-react';
import styles from '../../../styles/trener-personalny-lodz.module.css';


const TrainerSectionClient = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);


  // --- LOGIKA PRZEKIEROWANIA PO REZERWACJI CALENDLY ---
  useEffect(() => {
    const handleCalendlyEvent = (e: MessageEvent) => {
      // Ignorujemy wiadomości, które nie pochodzą z Calendly (bezpieczeństwo)
      if (e.origin !== 'https://calendly.com') return;

      // Debugowanie - jeśli chcesz podejrzeć w konsoli przeglądarki (F12)
      console.log('Otrzymano sygnał z Calendly:', e.data);

      if (e.data && e.data.event === 'calendly.event_scheduled') {
        // Twarde przekierowanie przeglądarki (zawsze działa z Iframe)
        window.location.href = '/potwierdzenie';
      }
    };

    window.addEventListener('message', handleCalendlyEvent);
    return () => window.removeEventListener('message', handleCalendlyEvent);
  },[]);
  
  // --- LOGIKA KARUZELI ZDJĘĆ ---
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const galleryImages = [
    { src: "/images/treningpersonalny.webp", alt: "Ireneusz Maruszewski Trener Personalny Łódź" },
    { src: "/images/treningpersonalny2.webp", alt: "Trening na siłowni z trenerem" }, 
    { src: "/images/Studycase.webp", alt: "Konsultacja fizjoterapeutyczna w Łodzi" } 
  ];

  const nextImg = () => setCurrentImgIndex((prev) => (prev + 1) % galleryImages.length);
  const prevImg = () => setCurrentImgIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  useEffect(() => {
    const timer = setInterval(nextImg, 5000);
    return () => clearInterval(timer);
  }, []);
  // -----------------------------

  const calendlyRef = useRef<HTMLDivElement>(null);

  const scrollToCalendly = (e: React.MouseEvent) => {
    e.preventDefault();
    calendlyRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const faqItems = [
    {
      question: "Ile kosztuje trener personalny w Łodzi?",
      answer: "Pojedynczy trening to koszt 180 zł. Pakiet dziesięciu treningów to 160 zł za sesję, a pakiet dwudziestu treningów kosztuje 140 zł za sesję. Pierwsza konsultacja jest bezpłatna."
    },
    {
      question: "Zbyt wiele nieudanych prób treningowych? Dlaczego tym razem może być inaczej?",
      answer: "Większość osób porzuca treningi z trzech powodów: źle dobrany plan, brak realnych efektów i nuda. W mojej pracy skupiam się na tym, żeby ćwiczenia były skuteczne i angażujące. Znam to z własnego doświadczenia. Testowałem różne metody i wiem, co faktycznie działa, a co jest tylko marnowaniem czasu. Nie stosuję uniwersalnych planów. Pracujemy nad tym, co przyniesie Ci najlepsze efekty, bez reżimu zero jedynkowego."
    },
    {
      question: "Trening ma mnie stresować czy cieszyć? Jak podchodzisz do motywacji?",
      answer: "Wierzę, że aktywność ma być pozytywnym elementem dnia. Bardzo często spotykam się z krzywdzącym podejściem trenowania ponad siły, co kończy się frustracją. W moim przypadku kluczowa jest równowaga. Trening będzie wymagał zaangażowania, ale da Ci ogromną satysfakcję. Moi podopieczni często chwalą dobrą atmosferę i poczucie humoru na zajęciach. Skupiamy się na małych zwycięstwach i trwałej budowie zdrowych nawyków."
    },
    {
      question: "Prowadzę bardzo intensywne życie. Jak wpasować trening w napięty grafik?",
      answer: "Sam łączę pracę trenera z wieloma obowiązkami i doskonale rozumiem wyzwania związane z brakiem czasu. Dlatego oferuję elastyczny grafik spotkań w różnych częściach Łodzi od wczesnego ranka do późnego wieczora. Co ważne, nasze sesje są zoptymalizowane czasowo. Skuteczny trening zajmie nam około 50 do 60 minut, zamiast standardowych dwóch godzin. Szanuję Twój czas."
    },
    {
      question: "Mam problem zdrowotny lub kontuzję. Czy mogę trenować?",
      answer: "Zdecydowanie tak. Połączenie mojego doświadczenia trenerskiego z wiedzą z fizjoterapii daje unikalne spojrzenie na pracę z ciałem. Regularnie pomagam osobom po operacjach kolan, rekonstrukcji więzadła czy z przepuklinami kręgosłupa. Wspólnie dobierzemy bezpieczne metody, które pomogą Ci pozbyć się bólu i odzyskać pełną sprawność. Często całkowita rezygnacja z ruchu to najgorszy możliwy wybór przy dolegliwościach bólowych."
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
            <span>Fizjoterapeuta i Trener. Dziesiątki udanych transformacji w Łodzi.</span>
          </div>

          <h1 className={styles.title}>Trenuj mądrze. Bez bólu i wymówek.</h1>
          
          <p className={styles.subtitle}>
            Nazywam się Ireneusz Maruszewski. Łączę <strong>medyczną wiedzę z efektywnym treningiem siłowym</strong>. 
            Pomagam osobom zapracowanym oraz wracającym po kontuzjach odzyskać sprawność. 
            Otrzymasz ode mnie praktyczną wiedzę, bezpieczny plan i wsparcie. Zrobimy formę bez restrykcyjnych diet i cudownych suplementów.
          </p>

          <div className={styles.heroActions}>
            <button onClick={scrollToCalendly} className={styles.mainCtaButton}>
              <CalendarCheck size={20} />
              Umów darmową diagnozę
            </button>
            <p className={styles.guaranteeText}>
              <Shield size={16} /> Zero ukrytych kosztów. Brak zobowiązań po pierwszym spotkaniu.
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

          {/* KARTY KORZYŚCI */}
          <div className={styles.cardGrid}>
            <article className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}><Activity className={styles.icon} /></div>
                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>Trening łączony z fizjoterapią</h2>
                  <p className={styles.cardText}>Koniec z obawami o kręgosłup czy stawy. Pracujemy nad sylwetką, jednocześnie pozbywając się dolegliwości bólowych z pracy siedzącej. Pełne bezpieczeństwo poparte wiedzą z anatomii.</p>
                </div>
              </div>
            </article>
            <article className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}><Target className={styles.icon} /></div>
                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>Rozwiązanie dla zabieganych</h2>
                  <p className={styles.cardText}>Zamiast spędzać dwie godziny na siłowni, wykonamy intensywną pracę w około 50 minut. Plan uwzględnia Twój napięty grafik, dając maksimum efektów w najkrótszym możliwym czasie.</p>
                </div>
              </div>
            </article>
            <article className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}><Heart className={styles.icon} /></div>
                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>Zdrowe podejście do diety</h2>
                  <p className={styles.cardText}>Nie znajdziesz u mnie gotowców kopiuj wklej. Uczę jak komponować posiłki z normalnych produktów. Zachowujemy miejsce na wyjścia ze znajomymi, żeby dieta nie była powodem do frustracji.</p>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div className={styles.pricingWrapper}>
          <h2 className={styles.sectionTitle}>Inwestycja w Twoje zdrowie</h2>
          <p className={styles.subtitle} style={{textAlign: 'center', marginBottom: '2rem'}}>
            Cenię pełną transparentność. Oto moje stawki. Jednak nie sprzedaję pakietów w ciemno. Zaczynamy zawsze od darmowej diagnozy.
          </p>

          <div className={styles.pricingGrid}>
            <div className={`${styles.pricingCard} ${styles.pricingCardPrimary}`}>
              <div className={styles.pricingBadge}>KROK 1 ZACZNIJ TUTAJ</div>
              <h3 className={styles.pricingCardTitle}>Konsultacja i Diagnoza</h3>
              <div className={styles.pricingPrice}>0 zł</div>
              
              <ul className={styles.pricingList}>
                <li className={styles.pricingListItem}>
                  <CheckCircle size={20} color="var(--primary)" /> 
                  <span>Szczegółowy wywiad zdrowotny</span>
                </li>
                <li className={styles.pricingListItem}>
                  <CheckCircle size={20} color="var(--primary)" /> 
                  <span>Testy wzorców ruchowych i ocena postawy</span>
                </li>
                <li className={styles.pricingListItem}>
                  <CheckCircle size={20} color="var(--primary)" /> 
                  <span>Ustalenie konkretnego planu działania</span>
                </li>
              </ul>

              <button onClick={scrollToCalendly} className={styles.ctaButton} style={{width: '100%', gap: '10px'}}>
                <CalendarCheck size={20} /> Zarezerwuj bezpłatne miejsce
              </button>
            </div>

            <div className={`${styles.pricingCard} ${styles.pricingCardSecondary}`}>
              <div className={styles.lockIcon}><Lock size={24} /></div>
              <h3 className={styles.pricingCardTitle}>
                Stała współpraca <span className={styles.pricingSubTitle}>(Opcja po konsultacji)</span>
              </h3>
              
              <div className={styles.pricingRowsContainer}>
                <div className={styles.pricingRow}>
                  <span className={styles.pricingName}>Pojedynczy trening</span>
                  <span className={styles.pricingValue}>180 zł</span>
                </div>
                
                <div className={`${styles.pricingRow} ${styles.pricingRowHighlight}`}>
                  <div>
                    <span className={styles.pricingName}>Pakiet dziesięciu treningów</span>
                    <span className={styles.pricingHighlightText}>Wybiera 80 procent podopiecznych</span>
                  </div>
                  <span className={styles.pricingValue}>160 zł <span style={{fontSize:'0.8rem', fontWeight:'normal'}}>za sesję</span></span>
                </div>
                
                <div className={styles.pricingRow}>
                  <span className={styles.pricingName}>Pakiet dwudziestu treningów</span>
                  <span className={styles.pricingValue}>140 zł <span style={{fontSize:'0.8rem', fontWeight:'normal'}}>za sesję</span></span>
                </div>
              </div>

              <div className={styles.pricingDisclaimer}>
                <Shield size={20} style={{flexShrink: 0}} />
                <p>Bardzo dbam o jakość prowadzonych zajęć, dlatego mam ograniczoną liczbę miejsc. Przyjmuję podopiecznych wyłącznie po pierwszym spotkaniu zapoznawczym.</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.faqSection}>
          <h2 className={styles.sectionTitle}>Często zadawane pytania</h2>
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
          <h2 className={styles.sectionTitle} style={{ marginBottom: '1rem' }}>Gdzie trenujemy?</h2>
          <p className={styles.subtitle}>
            Stacjonarnie pracuję z podopiecznymi na siłowni <strong>Just Gym przy ulicy Gojawiczyńskiej</strong>. 
            Istnieje też możliwość dojazdu do kilku dzielnic Łodzi.
          </p>

          <address className={styles.napAddress}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <strong style={{ fontSize: '1.2rem', color: '#fff' }}>Ireneusz Maruszewski Trener Personalny i Fizjoterapeuta</strong>
              
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
          <h2 className={styles.calendlyTitle}>Wybierz termin darmowej diagnozy</h2>
          <p className={styles.calendlySubtitle}>
            To zajmie zaledwie chwilę. Wybierz datę w kalendarzu poniżej. Zero zobowiązań. Porozmawiajmy i sprawdźmy, w jaki sposób mogę Ci pomóc.
          </p>
          
          {/* Memoizacja - uodparnia iframe na resetowanie przez karuzelę zdjęć */}
{React.useMemo(() => (
            <div className={styles.calendlyIframe}>
              <iframe
                src="https://calendly.com/maruszewskiirek?hide_gdpr_banner=1&embed_domain=najlepszytrening.pl&embed_type=Inline"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Zarezerwuj darmową diagnozę"
              ></iframe>
            </div>
          ), [])}

          {/* Fallback CRO - jeśli adblock wciąż dusi kalendarz u klienta, ten przycisk ratuje konwersję */}
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

export default TrainerSectionClient;