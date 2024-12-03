"use client"

import React from 'react';
import Image from 'next/image';
import { Activity, Clock, MessageCircle, BarChart2, Shield, Video } from 'lucide-react';
import styles from '../../styles/OnlineTraining.module.css';

const OnlineTraining = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>Trenuj z profesjonalnym wsparciem, gdziekolwiek jesteś</h2>
          <p className={styles.subtitle}>
            Trening online to nie tylko ćwiczenia - to kompleksowe wsparcie, stały kontakt 
            i spersonalizowany plan, który realizujesz w dogodnym dla siebie miejscu i czasie.
          </p>
        </header>

        <div className={styles.appShowcase}>
          <div className={styles.appDemo}>
            <Image
              src="/images/fitebo.webp"
              alt="Panel treningowy w aplikacji Fitebo"
              width={1200}
              height={1200}
              className={styles.appImage}
              priority
            />
          </div>
          <div className={styles.appFeatures}>
            <h3>Nowoczesna platforma treningowa</h3>
            <div className={styles.featuresList}>
              <div className={styles.feature}>
                <Video className={styles.featureIcon} />
                <div>
                  <h4>Instruktaże video</h4>
                  <p>Każde ćwiczenie z dokładnym opisem i filmem pokazowym</p>
                </div>
              </div>
              <div className={styles.feature}>
                <BarChart2 className={styles.featureIcon} />
                <div>
                  <h4>Monitorowanie postępów</h4>
                  <p>Śledź swoje wyniki i zobacz, jak się rozwijasz</p>
                </div>
              </div>
              <div className={styles.feature}>
                <MessageCircle className={styles.featureIcon} />
                <div>
                  <h4>Stały kontakt</h4>
                  <p>Wsparcie i odpowiedzi na pytania na bieżąco</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.howItWorks}>
          <h3>Jak wygląda współpraca online?</h3>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <h4>Konsultacja i planowanie</h4>
              <p>
                Zaczynamy od dokładnego wywiadu. Poznaję Twoje cele, możliwości 
                czasowe i doświadczenie. Na tej podstawie tworzę spersonalizowany plan.
              </p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <h4>Dostęp do platformy</h4>
              <p>
                Otrzymujesz dostęp do aplikacji Fitebo. Pokazuję Ci, jak z niej 
                korzystać i jak wykonywać zaplanowane ćwiczenia.
              </p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <h4>Regularne treningi</h4>
              <p>
                Trenujesz według planu, a ja czuwam nad Twoimi postępami. 
                Regularnie analizujemy wyniki i dostosowujemy plan.
              </p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>4</div>
              <h4>Wsparcie i motywacja</h4>
              <p>
                Jestem z Tobą w stałym kontakcie. Odpowiadam na pytania, 
                motywuję i pomagam przezwyciężać trudności.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.systemFeatures}>
          <h3>Co otrzymujesz w ramach współpracy?</h3>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <Activity className={styles.cardIcon} />
              <h4>Plan treningowy</h4>
              <p>
                Spersonalizowany plan treningowy, dostosowany do Twojego poziomu 
                i możliwości. Regularnie aktualizowany w oparciu o postępy.
              </p>
            </div>
            <div className={styles.featureCard}>
              <Shield className={styles.cardIcon} />
              <h4>Wsparcie techniczne</h4>
              <p>
                Poprawna technika to podstawa. Każde ćwiczenie z dokładną 
                instrukcją video i opisem wykonania.
              </p>
            </div>
            <div className={styles.featureCard}>
              <Clock className={styles.cardIcon} />
              <h4>Elastyczność</h4>
              <p>
                Trenujesz kiedy chcesz i gdzie chcesz. Plan dopasowany 
                do Twojego harmonogramu.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.cta}>
          <h3>Rozpocznij trening online</h3>
          <p>
            Umów się na bezpłatną konsultację. Poznamy się, omówimy Twoje cele 
            i sprawdzimy, czy trening online będzie dla Ciebie odpowiedni.
          </p>
          <a 
            href="https://calendly.com/maruszewskiirek" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            Umów darmową konsultację
          </a>
        </div>
      </div>
    </section>
  );
};

export default OnlineTraining;