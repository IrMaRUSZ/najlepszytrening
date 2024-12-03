'use client';

import React, { useState, useRef, TouchEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Quote, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import styles from '../../styles/TrustBuildingSection.module.css';

const MAX_CONTENT_LENGTH = 150;

interface ExpandableTextProps {
  content: string;
  maxLength: number;
}

const ExpandableText: React.FC<ExpandableTextProps> = ({ content, maxLength }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldShowButton = content.length > maxLength;

  const displayText = isExpanded ? content : content.slice(0, maxLength) + '...';

  return (
    <div className={styles.expandableText}>
      <p>{displayText}</p>
      {shouldShowButton && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className={styles.expandButton}
        >
          {isExpanded ? (
            <>Zwiń <ChevronUp size={16} /></>
          ) : (
            <>Czytaj więcej <ChevronDown size={16} /></>
          )}
        </button>
      )}
    </div>
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
];

const testimonials = [
  {
    name: "Basia",
    date: "25 Listopada 2024",
    image: "/opinion/Basia.webp",
    content: "Z Irkiem współpracuję już od 9 miesięcy. Trafiłam do niego z polecenia, 4 miesięce po rekonstrukcji więzadła krzyżowego przedniego, szukając pomocy w bezpiecznym odbudowaniu mięśni i przezwyciężeniu strachu przed pełnym obciążaniem operowanej nogi. Na początku skupialiśmy się na ćwiczeniach, które pamiętałam z rehabilitacji, a z czasem, gdy stawałam się coraz silniejsza, treningi stawały się bardziej wymagające i zawsze dopasowane do moich aktualnych potrzeb oraz celów. Właśnie tak wygląda współpraca z Irkiem – na początku pyta: Jaki mamy cel?. Odbudowa mięśni po kontuzji? OK, układamy plan treningowy pod ten cel. Chcesz też trochę schudnąć? W porządku, pracujemy nad kondycją i spalaniem kalorii, a ja doradzę ci jak jeść, żeby się nie zagłodzić, ale zredukować spożywane kalorie. Tym, co szczególnie wyróżnia Irka, jest jego ogromna wiedza na temat ćwiczeń, budowy człowieka, diety oraz, co okazuje się często przydatne, psychologii i motywacji. Jako osoba ciekawska, często dopytuję: „A czym różni się to ćwiczenie od tamtego? Dlaczego robimy coś w taki sposób, a nie inaczej?. Irek zawsze stara się mi odpowiedzieć w jak najbardziej wyczerpujący sposób często obalając przy tym wiele mitów i pseudonaukowych faktów. Dla mnie dużym atutem Irka jest to, że potrafi poprawić nastrój. Nawet jeśli przychodzę zestresowana, zmęczona, w kiepskim humorze, to po treningu wychodzę wykończona, ale dumna z siebie i w lepszym nastroju. Trzeba jednak podkreślić – treningi z Irkiem nie należą do lekkich i przyjemnych. Chętnie rozmawia o wszystkim, motywuje, śmieje się, ale nie odpuści żadnego powtórzenia, jeśli wyczuje, że jestem w stanie jeszcze je zrobić (a niestety ma do tego nosa). Podsumowując, Irek pomógł mi zarówno fizycznie, jak i psychicznie. Sama byłam zaskoczona, w jak dobrej formie obecnie jestem, kiedy ostatnio wybrałam się w góry. Bardzo chwalę sobie naszą współpracę i z całego serca polecam go każdemu, kto szuka trenera osobistego, który nie tylko zna się na rzeczy, ale też potrafi skutecznie zmotywować do działania.",
    verificationLink: "https://maps.app.goo.gl/ZTzdb63BS5FQ8XEa8",
  },
  {
    name: "Mateusz",
    date: "22 stycznia 2023",
    image: "/opinion/MateuszW.webp",
    content: "Irek to świetny trener personalny! Profesjonalizm i duża wiedza to jego ogromne atuty. Zawsze bardzo jasno tłumaczy każde ćwiczenie, a dieta dobrana przez niego jest smaczna i prosta w przygotowaniu. Widzę efekty współpracy z nim już po zaledwie 3 miesiącach!",
    verificationLink: "https://www.facebook.com/TrenerIreneusz/reviews",
  },
  {
    name: "Ania",
    date: "21 stycznia 2023",
    image: "/opinion/Ania.webp",
    content: "Mega profesjonalizm, świetne podejście do klienta, wsparcie na każdym etapie treningów i diety. Atmosfera na treningu super i wysoka kultura osobista. Efekty MEGA!!!",
    verificationLink: "https://www.facebook.com/TrenerIreneusz/reviews",
  },
  {
    name: "Agata",
    date: "02 Wrzesień 2024",
    image: "/opinion/AgataOpinia.webp",
    content: "Współpraca z Irkiem jest przyjemnością. Nie spotkacie się tutaj z 0:1 podejściem do treningów czy diety, katowaniem się i ograniczeniami za wszelką cenę czy naciąganiem na pseudo wiedzę treningowo-zdrowotną, przez którą nabawicie się kontuzji, albo zniechęcicie całkowicie do siłowni. Dostaniecie za to całą masę praktycznych wskazówek, porad oraz filmików instruktażowych jak poprawnie wykonywać ćwiczenia, jak zadbać o zdrowy balans życiowy. Ponadto, Irek podchodzi do każdego podopiecznego indywidualnie, z uwzględnieniem upodobań/celów danej osoby. Kontakt z nim jest bardzo szybki, a jakiekolwiek zmiany są wprowadzane na bieżąco. Niby nic samo się nie robi, ale efekty przy współpracy z Irkiem naprawdę pojawiają się w okamgnieniu :) Gorąco polecam!",
    verificationLink: "https://maps.app.goo.gl/XYPkTX88MPdGsYhQA",
  },
  {
    name: "Ewa",
    date: "23 Stycznia 2023",
    image: "/opinion/Ewa.webp",
    content: "Bardzo polecam współpracę z Irkiem. Dobiera indywidualnie ćwiczenia, a w razie potrzeby modyfikuje je. Ogromna wiedza, rzetelność oraz poczucie humoru, sprawia, że nigdy nie jest nudno.",
    verificationLink: "https://www.facebook.com/TrenerIreneusz/reviews",
  },
  {
    name: "Marek",
    date: "20 Maj 2024",
    image: "/opinion/Marek.webp",
    content: "Bardzo fajny kontakt z klientem, personalizacja treningów i wsparcie w rehabilitacji",
    verificationLink: "https://maps.app.goo.gl/HEHzkq1otWj5bYZF7",
  },
  {
    name: "Rafał",
    date: "5 Sierpień 2024",
    image: "/opinion/Rafał.webp",
    content: "Bardzo polecam współpracę z Irkiem, zgłosiłem się do niego mając 2 cele: wrócić do sprawności po operacji wiązadeł oraz aby schudnąć. Dieta + plan treningowy pozwoliły osiągnąć jedno i drugie. Nie rzuca Ci planu, diety i mówi masz i radź sobie, tylko pomaga na każdym kroku. Modyfikuje dietę w razie potrzeb, wyjaśnia jak ćwiczyć oraz oczywiście pokazuje krok po kroku jak poprawnie je wykonywać. Nigdy nie miałem problemu aby dopasować godziny wspólnego treningu, jest bardzo elastyczny , empatyczny i otwarty. Jeszcze raz to dodam gorąco polecam",
    verificationLink: "https://maps.app.goo.gl/fidBTsYCeYWGSDJDA",
  },
];

export const TrustBuildingSection = () => {
  const [activeTransformation, setActiveTransformation] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
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

  const handleTestimonialTouchEnd = () => {
    const difference = touchStartX.current - touchEndX.current;
    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        setActiveTestimonial(prev => 
          prev < testimonials.length - 1 ? prev + 1 : 0
        );
      } else {
        setActiveTestimonial(prev => 
          prev > 0 ? prev - 1 : testimonials.length - 1
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
        <h2 className={styles.sectionTitle}>Co Mówią Moi Podopieczni</h2>
        
        <div 
          className={styles.testimonialSlider}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTestimonialTouchEnd}
        >
          <div 
            className={styles.testimonialSliderTrack}
            style={{ 
              transform: `translateX(-${activeTestimonial * 100}%)`,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className={styles.testimonialSlide}>
                <div className={styles.testimonialCard}>
                  <Quote className={styles.quoteIcon} />
                  <div className={styles.testimonialContent}>
                    <div className={styles.testimonialImageWrapper}>
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={80}
                        height={80}
                        className={styles.testimonialImage}
                      />
                    </div>
                    <ExpandableText content={testimonial.content} maxLength={MAX_CONTENT_LENGTH} />
                  </div>
                  
                  <div className={styles.testimonialAuthor}>
                    <div>
                      <h4>{testimonial.name}</h4>
                      <p>{testimonial.date}</p>
                      <Link 
                        href={testimonial.verificationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.verificationLink}
                      >
                        Zweryfikowana opinia <ExternalLink className={styles.linkIcon} />
                      </Link>
                    </div>
                    <div className={styles.stars}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={styles.star} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.testimonialDots}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === activeTestimonial ? styles.activeDot : ''}`}
                onClick={() => setActiveTestimonial(index)}
                aria-label={`Przejdź do opinii ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};