// components/Home/AboutSection.tsx
import Image from 'next/image';
import { Brain, Shield, Star, Clock, MapPin, ExternalLink } from 'lucide-react';
import styles from '../../styles/AboutSection.module.css';
import ContactForm from '@/components/ContactForm';

export async function generateMetadata() {
  return {
    title: "Ireneusz Maruszewski Trener i Fizjoterapeuta Łódź | Najlepszy Trening",
    description: "Ból pleców i brak energii po pracy? Jako fizjoterapeuta i trener w Łodzi pomagam zapracowanym odzyskać sprawność. Poznaj moje doświadczenie.",
    keywords: "Ireneusz Maruszewski, profil trenera, kwalifikacje fizjoterapeuty, doświadczenie trenera fitness, ekspert fitness Łódź, historia trenera, metody treningowe",
    openGraph: {
      title: "Ireneusz Maruszewski Trener i Fizjoterapeuta Łódź",
      description: "Ból pleców i brak energii po pracy? Jako fizjoterapeuta i trener w Łodzi pomagam zapracowanym odzyskać sprawność. Poznaj moje doświadczenie.",
      url: "https://www.najlepszytrening.pl/o-mnie",
      type: "website",
      images: [
        {
          url: "/images/Maruszewskibt.webp",
          width: 1200,
          height: 630,
          alt: "Ireneusz Maruszewski ekspert fitness i fizjoterapeuta z Łodzi"
        }
      ]
    },
    alternates: {
      canonical: 'https://www.najlepszytrening.pl/o-mnie'
    }
  }
}

const AboutSection = () => {
  const keyPoints = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Krótkie i intensywne treningi",
      description: "Od 45 do 60 minut konkretnej pracy. Zero marnowania czasu na zbędne ćwiczenia. Szanuję Twój napięty grafik."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Fizjoterapeutyczne podejście",
      description: "Główny nacisk kładziemy na zniwelowanie bólu wynikającego z pracy siedzącej. Najpierw zdrowie i pełne bezpieczeństwo."
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Trenuj tam gdzie Ci wygodnie",
      description: "Współpraca stacjonarna w Łodzi na siłowni Just Gym lub pełne wsparcie i prowadzenie w formie online."
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Podejście bez skrajności",
      description: "Żadnych magicznych diet czy morderczych reżimów. Budujemy zdrowe nawyki, które z łatwością utrzymasz w zabieganym życiu."
    }
  ];

  const googleReviews = [
    {
      name: "Paweł Petrusiewicz",
      initial: "P",
      text: "Trenuję z Irkiem od roku. Jest jedyną osobą którą spotkałem, która odważyła się poprowadzić trening na siłowni dla osoby na wózku. Ma dużą wiedzę, potrafi ułożyć taki plan treningu, który bez problemu można wykonywać i realnie poprawia siłę. Świetny fizjoterapeuta.",
      date: "11 miesięcy temu"
    },
    {
      name: "Barbara Morawska",
      initial: "B",
      text: "Z Irkiem współpracuję już od wielu miesięcy. Trafiłam do niego z polecenia po rekonstrukcji więzadła krzyżowego przedniego, szukając pomocy w bezpiecznym odbudowaniu mięśni i przezwyciężeniu strachu przed pełnym obciążaniem nogi. Zaufanie do jego wiedzy było najlepszą decyzją.",
      date: "Rok temu"
    },
    {
      name: "Przemek Szczygłowski",
      initial: "P",
      text: "Współpraca z Irkiem to najlepszy możliwy wybór. Treningi są dopasowane indywidualnie do mnie, a plan jest na bieżąco modyfikowany z uwzględnieniem aktualnych potrzeb i problemów. Dodatkowo świetna aplikacja, w której można sprawdzać mnóstwo parametrów i swój rosnący postęp.",
      date: "Miesiąc temu"
    },
    {
      name: "Agata Czyżewska",
      initial: "A",
      text: "Współpraca z Irkiem jest czystą przyjemnością. Nie spotkacie się tutaj z podejściem zero jedynkowym do treningów czy diety, katowaniem się i ograniczeniami za wszelką cenę. Zamiast tego dostajecie rzetelną wiedzę fizjoterapeutyczną, przez co trening jest w stu procentach bezpieczny.",
      date: "Rok temu"
    },
    {
      name: "Patryk Chabowski",
      initial: "P",
      text: "Dzięki Irkowi odzyskałem sprawność ruchową i motywację do ćwiczeń. Nie podchodzi do treningu szablonowo ani jak do kolejnego takiego samego klienta. Dla Irka jesteś pacjentem, a on jak na fizjoterapeutę przystało najpierw precyzyjnie zweryfikuje co możesz, a czego nie powinieneś robić.",
      date: "Dwa miesiące temu"
    }
  ];

  return (
    <section className={styles.aboutSection}>
      <div className={styles.content}>
        <div className={`${styles.imageWrapper} ${styles.animateLeft}`}>
          <Image
            src="/images/trainer-about.webp"
            alt="Ireneusz Maruszewski Trener Personalny i Fizjoterapeuta"
            width={400}
            height={600}
            className={styles.image}
          />
        </div>
        
        <div className={styles.textContent}>
          <h2 className={`${styles.title} ${styles.animateUp}`}>
            Trener i Fizjoterapeuta dla zapracowanych
          </h2>
          
          <div className={`${styles.textBlock} ${styles.animateUp}`}>
            <p className={styles.description}>
              Pracuję przede wszystkim z programistami, lekarzami oraz managerami. Doskonale wiem dlaczego boli Cię kręgosłup od wielogodzinnego siedzenia przy biurku oraz co najważniejsze wiem jak to naprawić.
            </p>
            
            <p className={styles.approach}>
              Jako fizjoterapeuta i trener personalny pomagam odzyskać sprawne ciało bez spędzania połowy życia na siłowni. Zamiast dokładać Ci kolejnych stresów tworzę system, który realnie wpasujesz w swój napięty harmonogram.
            </p>
          </div>
          
          <div className={styles.keyPoints}>
            {keyPoints.map((point, index) => (
              <div 
                key={index} 
                className={`${styles.keyPoint} ${styles.animateUp}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={styles.iconWrapper}>
                  {point.icon}
                </div>
                <h3 className={styles.pointTitle}>{point.title}</h3>
                <p className={styles.pointDescription}>{point.description}</p>
              </div>
            ))}
          </div>

          <div className={`${styles.motivation} ${styles.animateUp}`}>
            <div style={{ display: 'flex', gap: '4px', marginBottom: '10px' }}>
              {[1, 2, 3, 4, 5].map(star => (
                <Star key={star} size={20} fill="#fca311" color="#fca311" />
              ))}
            </div>
            <p>
              Zaufało mi już ponad pięćdziesiąt osób z Łodzi i całej Polski. Nie obiecuję cudów w trzydzieści dni, ale gwarantuję rzetelną pracę oraz medyczne bezpieczeństwo. Wspólnie sprawimy, że pozbędziesz się bólu, a trening stanie się naturalną częścią Twojego dnia.
            </p>
          </div>

          <div className={`${styles.ctaSection} ${styles.animateUp}`}>
          </div>
          <div className={styles.contactSection}>
            <ContactForm />
          </div>
        </div>
      </div>

      {/* --- SEKCJA OPINII GOOGLE --- */}
      <div className={`${styles.reviewsContainer} ${styles.animateUp}`} style={{ animationDelay: '0.6s' }}>
        <div className={styles.reviewsHeaderWrapper}>
          <h2 className={styles.reviewsTitle}>Dołącz do zadowolonych podopiecznych</h2>
          <div className={styles.googleRatingBadge}>
            <span className={styles.ratingNumber}>5.0</span>
            <div className={styles.ratingStars}>
              {[1, 2, 3, 4, 5].map(star => <Star key={star} size={18} fill="#fca311" color="#fca311" />)}
            </div>
            <span className={styles.ratingText}>Na podstawie 51 opinii w Google</span>
          </div>
        </div>

        <div className={styles.reviewsGrid}>
          {googleReviews.map((review, index) => (
            <div key={index} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <div className={styles.reviewAuthor}>
                  <div className={styles.googleIconWrapper}>
                    <span style={{fontWeight: 900, color: '#fff'}}>G</span>
                  </div>
                  <div className={styles.authorInfo}>
                    <span className={styles.authorName}>{review.name}</span>
                    <span className={styles.authorDate}>Zweryfikowana opinia z Google</span>
                  </div>
                </div>
                <div className={styles.stars}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} size={14} fill="#fca311" color="#fca311" />
                  ))}
                </div>
              </div>
              <p className={styles.reviewText}>&quot;{review.text}&quot;</p>
            </div>
          ))}
        </div>
        
        <div className={styles.reviewsAction}>
          <a 
            href="https://www.google.com/maps/place/Ireneusz+Maruszewski+%E2%80%93+Trener+Personalny+%C5%81%C3%B3d%C5%BA/@51.731175,19.5028131,17z/data=!3m1!4b1!4m6!3m5!1s0x471a337c1b414b41:0xb6987fee59c8c83!8m2!3d51.731175!4d19.505388!16s%2Fg%2F11tc7nd_ph?entry=ttu" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.reviewsLinkBtn}
          >
            Czytaj wszystkie 51 opinii w Google <ExternalLink size={18} />
          </a>
        </div>
      </div>
      
    </section>
  );
};

export default AboutSection;