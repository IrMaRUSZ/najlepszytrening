'use client'
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Shield, Target, Heart, ChevronDown, Lock, CheckCircle, CalendarCheck, Star, Activity, ChevronLeft, ChevronRight, ArrowRight, ArrowDown, Wrench, Dumbbell, Accessibility, ExternalLink, X, Phone, Mail, MapPin } from 'lucide-react';
import styles from '../../../styles/trener-personalny-lodz.module.css';
import CalendlyCTA from '../../../components/CalendlyCTA';

const heroSocialProof = {
  googleRating: '5,0',
  googleReviewCount: 50,
  googleReviewsUrl: 'https://www.google.com/maps/place/Ireneusz+Maruszewski+%E2%80%93+Trener+Personalny+%C5%81%C3%B3d%C5%BA/@51.7327166,19.5010375,18z/data=!4m16!1m9!3m8!1s0x471a337c1b414b41:0xb6987fee59c8c83!2zSXJlbmV1c3ogTWFydXN6ZXdza2kg4oCTIFRyZW5lciBQZXJzb25hbG55IMWBw7Nkxbo!8m2!3d51.731175!4d19.505388!9m1!1b1!16s%2Fg%2F11tc7nd_ph!3m5!1s0x471a337c1b414b41:0xb6987fee59c8c83!8m2!3d51.731175!4d19.505388!16s%2Fg%2F11tc7nd_ph?authuser=2&entry=ttu&g_ep=EgoyMDI2MDcyNy4wIKXMDSoASAFQAw%3D%3D',
  clientAvatars: [
    { src: '/opinion/Ania.webp', alt: 'Podopieczna Ireneusza' },
    { src: '/opinion/Rafał.webp', alt: 'Podopieczny Ireneusza' },
    { src: '/opinion/logoprzemek.webp', alt: 'Podopieczny Ireneusza' },
    { src: '/images/Magda.webp', alt: 'Magda, podopieczna Ireneusza' },
  ],
};

const heroReviewGroups = [
  {
    id: 'weight-loss',
    label: 'Chcę schudnąć',
    description: 'Redukcja i powrót do formy',
    icon: ArrowDown,
    reviews: [
      {
        author: 'Rafał',
        quote: 'Zgłosiłem się mając dwa cele: wrócić do sprawności po operacji wiązadeł oraz schudnąć. Dieta i plan treningowy pozwoliły osiągnąć jedno i drugie.',
        url: 'https://maps.app.goo.gl/4sujfwUdpr4UtMYN7',
      },
      {
        author: 'Filip',
        quote: 'Wróciłem do sportu i aktywnego trybu życia, zrzucając nadmierne kilogramy i odnajdując na nowo zapał do codziennej aktywności.',
        url: 'https://maps.app.goo.gl/8DV6L6CLzWsi5FFp7',
      },
    ],
  },
  {
    id: 'after-injury',
    label: 'Wracam po kontuzji',
    description: 'Bezpieczny powrót do treningu',
    icon: Wrench,
    reviews: [
      {
        author: 'Barbara',
        quote: 'Po rekonstrukcji ACL szukałam pomocy w bezpiecznym odbudowaniu mięśni i przezwyciężeniu strachu przed pełnym obciążaniem operowanej nogi.',
        url: 'https://maps.app.goo.gl/hyrZTbc11JCa6QWj7',
      },
      {
        author: 'Patryk',
        quote: 'Dzięki Irkowi odzyskałem sprawność ruchową i motywację do ćwiczeń. Zweryfikował, co mogę, a czego nie, i dobrał wymagający, ale możliwy trening.',
        url: 'https://maps.app.goo.gl/ckLQNs2SdcQ2cyfW9',
      },
    ],
  },
  {
    id: 'gym-start',
    label: 'Zaczynam na siłowni',
    description: 'Pewność i regularność',
    icon: Dumbbell,
    reviews: [
      {
        author: 'Przemek',
        quote: 'Dzięki tej współpracy polubiłem treningi na siłowni i przestały być one tylko obowiązkiem do odhaczenia.',
        url: 'https://maps.app.goo.gl/AFjUKMTAV9NHvgDC8',
      },
      {
        author: 'Wiola',
        quote: 'Dzięki niemu zrozumiałam, jak pracują moje mięśnie i na co zwracać uwagę przy treningach. Z każdym spotkaniem dowiaduję się więcej.',
        url: 'https://maps.app.goo.gl/Xhq6K3H8jS8FKqvz5',
      },
    ],
  },
  {
    id: 'limitations',
    label: 'Mam ograniczenia',
    description: 'Plan dopasowany do możliwości',
    icon: Accessibility,
    reviews: [
      {
        author: 'Paweł',
        quote: 'Jest jedyną osobą, którą spotkałem, która odważyła się poprowadzić trening na siłowni dla osoby na wózku.',
        url: 'https://maps.app.goo.gl/bauLs8KN9H8hMPyi8',
      },
      {
        author: 'Joanna',
        quote: 'Treningi uwzględniają stan organizmu i urazy. Do tego ogrom wiedzy, uważność na klienta, motywacja, zaangażowanie i empatia.',
        url: 'https://maps.app.goo.gl/a9A8uBGB1zEmBwVz7',
      },
    ],
  },
] as const;


const TrainerSectionClient = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const [activeReviewGroupId, setActiveReviewGroupId] = useState<string | null>(null);
  const activeReviewGroup = heroReviewGroups.find((group) => group.id === activeReviewGroupId);


  // --- LOGIKA KARUZELI ZDJĘĆ ---
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const galleryImages = [
    { src: "/images/treningpersonalny.webp", alt: "Ireneusz Maruszewski Trener Personalny Łódź" },
    { src: "/images/treningpersonalny2.webp", alt: "Trening na siłowni z trenerem" }, 
    { src: "/images/Studycase.webp", alt: "Konsultacja fizjoterapeutyczna w Łodzi" } ,
    { src: "/images/Magda.webp", alt: "Rezultaty" } ,
    { src: "/transformations/Dawidprzed.webp", alt: "Dawid przed przemianą" },
    { src: "/transformations/Dawidpo.webp", alt: "Dawid po przemianie" },
    { src: "/transformations/japrzed.webp", alt: "Ireneusz przed przemianą" },
    { src: "/transformations/japo.webp", alt: "Ireneusz po przemianie" },
    { src: "/transformations/JulkaPrzed.webp", alt: "Julia przed przemianą" },
    { src: "/transformations/JulkaPo.webp", alt: "Julia po przemianie" },
  ];

  const nextImg = () => setCurrentImgIndex((prev) => (prev + 1) % galleryImages.length);
  const prevImg = () => setCurrentImgIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  useEffect(() => {
    const timer = setInterval(nextImg, 5000);
    return () => clearInterval(timer);
  }, []);

  // -----------------------------

  const calendlyRef = useRef<HTMLDivElement>(null);

  const scrollToCalendly = () => {
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
        <header className={styles.croHero}>
          <div className={styles.heroCopy}>

            <p className={styles.eyebrow}>TRENER PERSONALNY · FIZJOTERAPEUTA · ŁÓDŹ</p>
            <h1 className={styles.heroTitle}>
              Fizjoterapeuta na sali treningowej. <span>Nie tylko przy leżance.</span>
            </h1>

            <p className={styles.differenceStatement}>
              Nie prowadzę przypadkowych treningów. <strong>Najpierw sprawdzam, jak pracuje Twoje ciało.</strong>
            </p>
            <p className={styles.heroSubtitle}>
              Dopiero wtedy dobieram ćwiczenia do Twojego celu, możliwości i ograniczeń niezależnie
              od tego, czy chcesz schudnąć, zacząć ćwiczyć, czy wrócić po kontuzji.
            </p>

            <div className={styles.earlyHeroCta}>
              <CalendlyCTA
                mode="action"
                onAction={scrollToCalendly}
                ctaSource="trainer_hero_early"
                serviceType="personal_training_lodz"
                ctaLabel="Umów darmową diagnozę"
                className={styles.heroCta}
              >
                📅 15 minut rozmowy.
                <ArrowRight size={20} aria-hidden="true" />
              </CalendlyCTA>
              <p>15 minut · bez zobowiązań · sprawdzimy, czy mogę Ci pomóc</p>
            </div>

            <a
              href={heroSocialProof.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialProof}
              aria-label="Zobacz opinie podopiecznych w Google Maps"
            >
              <div className={styles.avatarStack} aria-label="Podopieczni Ireneusza">
                {heroSocialProof.clientAvatars.map((avatar) => (
                  <Image
                    key={avatar.src}
                    src={avatar.src}
                    alt={avatar.alt}
                    width={44}
                    height={44}
                    sizes="(max-width: 640px) 38px, 44px"
                    className={styles.avatar}
                  />
                ))}
              </div>
              <div className={styles.socialProofCopy}>
                <div className={styles.ratingLine} aria-label="Pięć gwiazdek, opinie Google">
                  <span className={styles.heroStars}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={16} fill="currentColor" aria-hidden="true" />
                    ))}
                  </span>
                  <strong>{heroSocialProof.googleRating} w Google</strong>
                  <ExternalLink size={14} aria-hidden="true" />
                </div>
                <span className={styles.proofCaption}>
                  {heroSocialProof.googleReviewCount} opinii · zobacz prawdziwe historie podopiecznych
                </span>
              </div>
            </a>

            <div className={styles.proofDetails}>
              <dl className={styles.proofNumbers} aria-label="Doświadczenie Ireneusza">
                <div>
                  <dt>1500+</dt>
                  <dd>przeprowadzonych treningów</dd>
                </div>
                <div>
                  <dt>5 lat</dt>
                  <dd>doświadczenia</dd>
                </div>
              </dl>

              <p className={styles.reviewPickerLabel}>Zobacz opinie osób z podobnym celem:</p>
              <div className={styles.reviewPicker}>
                {heroReviewGroups.map((group) => {
                  const Icon = group.icon;
                  const isActive = activeReviewGroupId === group.id;
                  return (
                    <button
                      key={group.id}
                      type="button"
                      className={`${styles.reviewPickerButton} ${isActive ? styles.reviewPickerButtonActive : ''}`}
                      onClick={() => setActiveReviewGroupId(isActive ? null : group.id)}
                      aria-expanded={isActive}
                      aria-controls="hero-matched-reviews"
                    >
                      <Icon size={18} aria-hidden="true" />
                      <span>
                        <strong>{group.label}</strong>
                        <small>{group.description}</small>
                      </span>
                    </button>
                  );
                })}
              </div>

              {activeReviewGroup && (
                <div id="hero-matched-reviews" className={styles.matchedReviews} aria-live="polite">
                  <div className={styles.matchedReviewsHeader}>
                    <div>
                      <span>Opinie podopiecznych</span>
                      <strong>{activeReviewGroup.label}</strong>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveReviewGroupId(null)}
                      className={styles.matchedReviewsClose}
                      aria-label="Zamknij opinie"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <div className={styles.matchedReviewsList}>
                    {activeReviewGroup.reviews.map((review) => (
                      <article key={`${activeReviewGroup.id}-${review.author}`} className={styles.matchedReview}>
                        <div className={styles.matchedReviewStars} aria-label="Ocena 5 na 5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} size={13} fill="currentColor" aria-hidden="true" />
                          ))}
                        </div>
                        <blockquote>„{review.quote}”</blockquote>
                        <a href={review.url} target="_blank" rel="noopener noreferrer">
                          {review.author} · zobacz w Google <ExternalLink size={12} />
                        </a>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className={styles.croHeroActions}>
              <CalendlyCTA
                mode="action"
                onAction={scrollToCalendly}
                ctaSource="trainer_hero"
                serviceType="personal_training_lodz"
                ctaLabel="Umów darmową diagnozę"
                className={styles.heroCta}
              >
                Umów darmową diagnozę
                <ArrowRight size={20} aria-hidden="true" />
              </CalendlyCTA>
            </div>

          </div>

          <div className={styles.heroVisual}>
            <div className={styles.heroImageFrame}>
              <Image
                src="/images/Maruszewski.webp"
                alt="Ireneusz Maruszewski, trener personalny i fizjoterapeuta w Łodzi"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 46vw"
                className={styles.heroImage}
              />
              <div className={styles.heroImageShade} />
            </div>
            <div className={styles.mobileHeroActions}>
              <CalendlyCTA
                mode="action"
                onAction={scrollToCalendly}
                ctaSource="trainer_hero_mobile"
                serviceType="personal_training_lodz"
                ctaLabel="Umów darmową diagnozę"
                className={styles.heroCta}
              >
                Umów darmową diagnozę
                <ArrowRight size={20} aria-hidden="true" />
              </CalendlyCTA>
            </div>
          </div>
        </header>

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
            <CalendlyCTA mode="action" onAction={scrollToCalendly} ctaSource="trainer_hero" serviceType="personal_training_lodz" ctaLabel="Umów darmową diagnozę" className={styles.mainCtaButton}>
              <CalendarCheck size={20} />
              Umów darmową diagnozę
            </CalendlyCTA>
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

              <CalendlyCTA mode="action" onAction={scrollToCalendly} ctaSource="trainer_pricing" serviceType="personal_training_lodz" ctaLabel="Zarezerwuj bezpłatne miejsce" className={styles.ctaButton} style={{width: '100%', gap: '10px'}}>
                <CalendarCheck size={20} /> Zarezerwuj bezpłatne miejsce
              </CalendlyCTA>
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
            <CalendlyCTA
              ctaSource="trainer_fallback"
              serviceType="personal_training_lodz"
              ctaLabel="Otwórz kalendarz w nowym oknie"
              className={styles.mainCtaButton}
              style={{ display: 'inline-flex', textDecoration: 'none' }}
            >
              <CalendarCheck size={20} />
              Otwórz kalendarz w nowym oknie
            </CalendlyCTA>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TrainerSectionClient;
