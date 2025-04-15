// components/Home/AboutSection.tsx
import Image from 'next/image';
import { Target, Heart, Brain, Shield } from 'lucide-react';
import styles from '../../styles//AboutSection.module.css';
import ContactForm from '@/components/ContactForm';

export async function generateMetadata() {
  return {
    title: "O mnie | Trener Personalny Łódź | Najlepszy Trening",
    description: "Poznaj mnie jako profesjonalnego trenera personalnego z Łodzi. Dowiedz się o moim doświadczeniu, kwalifikacjach i podejściu do treningu personalnego.",
    keywords: "trener personalny łódź, o trenerze, doświadczenie trenera, kwalifikacje trenerskie, kim jestem, historia trenera",
    openGraph: {
      title: "O mnie | Trener Personalny Łódź | Najlepszy Trening",
      description: "Poznaj mnie jako profesjonalnego trenera personalnego z Łodzi. Dowiedz się o moim doświadczeniu, kwalifikacjach i podejściu do treningu personalnego.",
      url: "https://www.najlepszytrening.pl/o-mnie",
      type: "website",
      images: [
        {
          url: "/images/maruszewski.web",
          width: 1200,
          height: 630,
          alt: "Trener Personalny Łódź Ireneusz Maruszewski - O mnie"
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
      icon: <Target className="w-6 h-6" />,
      title: "Wsparcie na każdym kroku",
      description: "Wiem, jak trudne mogą być początki. Dlatego jestem z Tobą na każdym etapie transformacji, pomagając pokonać największe przeszkody."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Więcej niż wygląd",
      description: "To nie tylko o lepszą sylwetkę - to o energię do życia, lepsze samopoczucie i pewność siebie, którą zyskujesz dzień po dniu."
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Realne podejście",
      description: "Żadnych diet-cud czy morderczych treningów. Razem wypracujemy zdrowe nawyki, które zostaną z Tobą na lata."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Bezpieczeństwo",
      description: "Jako fizjoterapeuta i trener, wiem jak zadbać o Twoje zdrowie i bezpieczeństwo, nawet jeśli masz kontuzje czy ograniczenia."
    }
  ];

  return (
    <section className={styles.aboutSection}>
      <div className={styles.content}>
        <div className={`${styles.imageWrapper} ${styles.animateLeft}`}>
          <Image
            src="/images/trainer-about.webp"
            alt="Ireneusz Maruszewski - Trener Personalny"
            width={400}
            height={600}
            className={styles.image}
          />
        </div>
        
        <div className={styles.textContent}>
          <h2 className={`${styles.title} ${styles.animateUp}`}>
            Zmiana zaczyna się od pierwszego kroku
          </h2>
          
          <div className={`${styles.textBlock} ${styles.animateUp}`}>
            <p className={styles.description}>
              Sam przeszedłem długą drogę od osoby szukającej w treningu ucieczki od codziennych problemów, 
              do trenera, który pomógł setkom osób odnaleźć radość w aktywności fizycznej. Rozumiem, jak 
              ciężko jest zacząć, szczególnie gdy brakuje czasu, motywacji, a życie stawia przed Tobą 
              kolejne wyzwania.
            </p>
            
            <p className={styles.approach}>
              Przez lata pracy przekonałem się, że najważniejsze nie są skomplikowane plany treningowe czy 
              restrykcyjne diety. Kluczem jest znalezienie Twojej osobistej motywacji i dopasowanie 
              aktywności do Twojego stylu życia - nawet jeśli masz napięty grafik, rodzinę czy wymagającą pracę.
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
            <p>
              W 2024 roku przeprowadziłem ponad 500 treningów z osobami takimi jak Ty - 
              zabieganymi, często zestresowanymi, ale zdeterminowanymi do zmiany. 
              Nie obiecuję cudów w miesiąc, ale gwarantuję, że razem znajdziemy sposób, 
              by treningi stały się naturalną, przyjemną częścią Twojego życia, 
              a nie kolejnym obowiązkiem na liście zadań.
            </p>
          </div>

          <div className={`${styles.ctaSection} ${styles.animateUp}`}>
      </div>
      <div className={styles.contactSection}>
  <ContactForm />
</div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;