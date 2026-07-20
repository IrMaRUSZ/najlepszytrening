'use client';

import React, { useState, useRef, TouchEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Activity, Accessibility, ExternalLink, Heart, Scale, Smartphone, UserCheck } from 'lucide-react';
import styles from '../../styles/TrustBuildingSection.module.css';

interface ResultCardProps {
  title: string;
  quote: string;
  expandedQuote: string;
  name: string;
  verificationLink: string;
  icon: React.ReactNode;
}

const ResultCard = ({ title, quote, expandedQuote, name, verificationLink, icon }: ResultCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article className={styles.resultCard}>
      <div className={styles.resultIcon} aria-hidden="true">{icon}</div>
      <h3 className={styles.resultTitle}>{title}</h3>
      <blockquote className={styles.resultQuote}>„{isExpanded ? expandedQuote : quote}”</blockquote>
      <button
        type="button"
        onClick={() => setIsExpanded((current) => !current)}
        className={styles.expandButton}
        aria-expanded={isExpanded}
      >
        {isExpanded ? 'Zwiń cytat' : 'Rozwiń cytat'}
      </button>
      <footer className={styles.resultFooter}>
        <strong>{name}</strong>
        <Link
          href={verificationLink}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.verificationLink}
        >
          Zweryfikowana opinia <ExternalLink className={styles.linkIcon} />
        </Link>
      </footer>
    </article>
  );
};

const transformations = [
  {
    id: 1,
    beforeImage: "/transformations/Dawidprzed.webp",
    afterImage: "/transformations/Dawidpo.webp",
    duration: "6 miesiącach",
    story: "Dawid przyszedł do mnie z celem poprawy sylwetki. Zadawał bardzo dużo pytań i to bardzo dobrze, bo dzięki temu udawało się wdrażać nowe nawyki, które były niezbędne do tego, żeby schudnął i rozpoczął sensowną pracę na siłowni."
  },
  {
    id: 2,
    beforeImage: "/transformations/japrzed.webp",
    afterImage: "/transformations/japo.webp",
    duration: "10 lat",
    story: "Chciałem przedstawić przemianę mojego pierwszego podopiecznego, trochę długo to zajęło, ale popełniał wszystkie możliwe błędy. Traktował treningi bardziej jako terapię niż cel sam w sobie. Trochę się zmieniło przez ten czas."
  },
    {
    id: 3,
    beforeImage: "/transformations/JulkaPrzed.webp",
    afterImage: "/transformations/JulkaPo.webp",
    duration: "3 miesiącach",
    story: "-14 KG MNIEJ 🔥 Liczby nie kłamią, ale to opinia mówi najwięcej. Od 87 kg do 73 kg. To nie jest magia, to efekt konsekwentnej pracy i dobrze dobranego planu. 📉 ​Często pytacie mnie, czy da się schudnąć bez głodówek i katowania się na siłowni. Patrząc na tę przemianę – odpowiedź brzmi: TAK. Ale kluczem nie jest tylko dieta, a wsparcie i wiedza, o których wspomina w swojej opinii Julia. ​Jako trener nie jestem tylko od rozpisania serii. Jestem od tego, żebyś w chwilach zwątpienia nie odpuścił(a). Motywacja to paliwo, a ja dbam o to, by Twój bak był zawsze pełny. 💪"
  },
];

const resultCards: ResultCardProps[] = [
  {
    title: "Powrót do sprawności po ACL",
    name: "Basia",
    quote: "Trafiłam do niego z polecenia, 4 miesięce po rekonstrukcji więzadła krzyżowego przedniego, szukając pomocy w bezpiecznym odbudowaniu mięśni i przezwyciężeniu strachu przed pełnym obciążaniem operowanej nogi.",
    expandedQuote: "Trafiłam do niego z polecenia, 4 miesięce po rekonstrukcji więzadła krzyżowego przedniego, szukając pomocy w bezpiecznym odbudowaniu mięśni i przezwyciężeniu strachu przed pełnym obciążaniem operowanej nogi. Na początku skupialiśmy się na ćwiczeniach, które pamiętałam z rehabilitacji, a z czasem, gdy stawałam się coraz silniejsza, treningi stawały się bardziej wymagające i zawsze dopasowane do moich aktualnych potrzeb oraz celów.",
    verificationLink: "https://maps.app.goo.gl/ZTzdb63BS5FQ8XEa8",
    icon: <Activity />,
  },
  {
    title: "Redukcja masy ciała i powrót do aktywności",
    name: "Rafał",
    quote: "Zgłosiłem się do niego mając 2 cele: wrócić do sprawności po operacji wiązadeł oraz aby schudnąć. Dieta + plan treningowy pozwoliły osiągnąć jedno i drugie.",
    expandedQuote: "Zgłosiłem się do niego mając 2 cele: wrócić do sprawności po operacji wiązadeł oraz aby schudnąć. Dieta + plan treningowy pozwoliły osiągnąć jedno i drugie. Nie rzuca Ci planu, diety i mówi masz i radź sobie, tylko pomaga na każdym kroku. Modyfikuje dietę w razie potrzeb, wyjaśnia jak ćwiczyć oraz oczywiście pokazuje krok po kroku jak poprawnie je wykonywać.",
    verificationLink: "https://maps.app.goo.gl/fidBTsYCeYWGSDJDA",
    icon: <Scale />,
  },
  {
    title: "Polubienie treningów",
    name: "Przemek",
    quote: "Dzięki tej współpracy polubiłem treningi na siłowni i przestały być one tylko obowiązkiem do odhaczenia.",
    expandedQuote: "Irek jest osobą z ogromną wiedzą na temat treningu siłowego i na każdym treningu stara się tą wiedzę przekazać tak, żeby ćwiczenia były bezpieczne i nie doprowadziły do kontuzji. Dzięki tej współpracy polubiłem treningi na siłowni i przestały być one tylko obowiązkiem do odhaczenia.",
    verificationLink: "https://share.google/HQwUTecbRj68Gf81z",
    icon: <Heart />,
  },
  {
    title: "Bezpieczny trening z ograniczeniami",
    name: "Paweł Petrusiewicz",
    quote: "Jest jedyną osobą którą spotkałem, która odważyła się poprowadzić trening na siłowni dla osoby na wózku.",
    expandedQuote: "Trenuję z Irkiem od roku. Jest jedyną osobą którą spotkałem, która odważyła się poprowadzić trening na siłowni dla osoby na wózku. Ma dużą wiedzę, potrafi ułożyć taki plan treningu, który bez problemu można wykonywać i realnie poprawia siłę. Świetny fizjoterapeuta.",
    verificationLink: "https://www.google.com/maps/place/Ireneusz+Maruszewski+%E2%80%93+Trener+Personalny+%C5%81%C3%B3d%C5%BA/@51.731175,19.5028131,17z/data=!3m1!4b1!4m6!3m5!1s0x471a337c1b414b41:0xb6987fee59c8c83!8m2!3d51.731175!4d19.505388!16s%2Fg%2F11tc7nd_ph?entry=ttu",
    icon: <Accessibility />,
  },
  {
    title: "Indywidualna opieka i kontrola",
    name: "Agata",
    quote: "Irek podchodzi do każdego podopiecznego indywidualnie, z uwzględnieniem upodobań/celów danej osoby. Kontakt z nim jest bardzo szybki, a jakiekolwiek zmiany są wprowadzane na bieżąco.",
    expandedQuote: "Dostaniecie za to całą masę praktycznych wskazówek, porad oraz filmików instruktażowych jak poprawnie wykonywać ćwiczenia, jak zadbać o zdrowy balans życiowy. Ponadto, Irek podchodzi do każdego podopiecznego indywidualnie, z uwzględnieniem upodobań/celów danej osoby. Kontakt z nim jest bardzo szybki, a jakiekolwiek zmiany są wprowadzane na bieżąco.",
    verificationLink: "https://maps.app.goo.gl/XYPkTX88MPdGsYhQA",
    icon: <UserCheck />,
  },
  {
    title: "Aplikacja i monitorowanie postępów",
    name: "Przemek",  
    quote: "Duży plus również za świetną aplikację, która zbiera wszystkie najważniejsze rzeczy w jednym miejscu i bardzo ułatwia monitorowanie postępów.",
    expandedQuote: "Współpraca z Irkiem to najlepszy możliwy wybór, treningi są dopasowane indywidualnie do mnie a plan jest na bieżąco modyfikowany z uwzględnieniem aktualnych potrzeb i problemów, dzięki czemu czuję, że wszystko jest naprawdę przemyślane i kontrolowane. Duży plus również za świetną aplikację, która zbiera wszystkie najważniejsze rzeczy w jednym miejscu i bardzo ułatwia monitorowanie postępów.",
    verificationLink: "https://share.google/HQwUTecbRj68Gf81z",
    icon: <Smartphone />,
  },
];

export const TrustBuildingSection = () => {
  const [activeTransformation, setActiveTransformation] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const difference = touchStartX.current - touchEndX.current;
    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        setActiveTransformation(prev => 
          prev < transformations.length - 1 ? prev + 1 : 0
        );
      } else {
        setActiveTransformation(prev => 
          prev > 0 ? prev - 1 : transformations.length - 1
        );
      }
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.transformationContainer}>
        <h2 className={styles.sectionTitle}>Realne Rezultaty</h2>
        
        <div 
          id="transformacje"
          className={styles.transformationSlider}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className={styles.transformationSliderTrack}
            style={{ 
              transform: `translateX(-${activeTransformation * 100}%)`,
            }}
          >
            {transformations.map((transform, index) => (
              <div key={index} className={styles.transformationSlide}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={transform.beforeImage}
                    alt="Przed transformacją"
                    width={500}
                    height={600}
                    className={styles.transformationImage}
                  />
                  <span className={styles.imageLabel}>Przed</span>
                </div>
                <div className={styles.imageWrapper}>
                  <Image
                    src={transform.afterImage}
                    alt="Po transformacji"
                    width={500}
                    height={600}
                    className={styles.transformationImage}
                  />
                  <span className={styles.imageLabel}>
                    Po {transform.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.transformationDots}>
            {transformations.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === activeTransformation ? styles.activeDot : ''}`}
                onClick={() => setActiveTransformation(index)}
                aria-label={`Przejdź do transformacji ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <p className={styles.transformationStory}>
          {transformations[activeTransformation].story}
        </p>
      </div>

      <div className={styles.testimonialsContainer}>
        <h2 className={styles.sectionTitle}>Zobacz, w czym pomogła indywidualna współpraca</h2>
        <p className={styles.resultsIntro}>Konkretne doświadczenia podopiecznych, od powrotu po kontuzji po lepszą kontrolę całego procesu.</p>
        <div className={styles.resultsGrid}>
          {resultCards.map((result) => (
            <ResultCard key={result.title} {...result} />
          ))}
        </div>
      </div>
    </section>
  );
};
