import React from 'react';
import styles from '../../styles/Home.module.css';

export const FAQSection = () => {
  return (
    <section className={styles.quickProofSection} aria-labelledby="faq-title" style={{ marginTop: '40px' }}>
      <div className={styles.quickProofHeader}>
        <span className={styles.quickProofEyebrow}>Często zadawane pytania</span>
        <h2 id="faq-title">Trener personalny Łódź – to musisz wiedzieć przed startem</h2>
      </div>
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px', padding: '0 20px' }}>
        
        <article className={styles.quickProofCard} style={{ textAlign: 'left' }}>
          <h3>Jaka jest cena treningu personalnego w Łodzi?</h3>
          <p>
            Cena (cennik) zależy od wybranego pakietu i częstotliwości spotkań. Ponieważ stawiam na jakość i bezpieczeństwo (łącząc wiedzę fizjoterapeuty z doświadczeniem trenera), unikam masowego podejścia. <strong>Pierwsza konsultacja online (15 minut) jest zawsze w 100% bezpłatna</strong>. Porozmawiamy o Twoim celu, po czym dobierzemy najlepszą i najkorzystniejszą formę współpracy.
          </p>
        </article>

        <article className={styles.quickProofCard} style={{ textAlign: 'left' }}>
          <h3>W jakich dzielnicach Łodzi prowadzisz treningi?</h3>
          <p>
            Stacjonarnie najczęściej spotkamy się na siłowni Just Gym (ul. Gojawiczyńskiej). Współpracuję z podopiecznymi z całej Łodzi – m.in. <strong>Widzew, Górna, Bałuty, Retkinia czy Centrum</strong>. Jeśli szukasz trenera personalnego z dojazdem, daj znać podczas darmowej konsultacji – sprawdzimy opcje i lokalizacje. Współpracuję również z wieloma osobami w 100% online.
          </p>
        </article>

        <article className={styles.quickProofCard} style={{ textAlign: 'left' }}>
          <h3>Czy muszę być w formie, żeby zacząć współpracę?</h3>
          <p>
            Absolutnie nie! To moja praca, by pomóc Ci tę formę zbudować. Jako fizjoterapeuta specjalizuję się w pracy z osobami po kontuzjach, z bólem pleców, czy takimi, które nigdy wcześniej nie były na siłowni. Każdy plan treningowy układam od zera na podstawie Twoich obecnych możliwości.
          </p>
        </article>

      </div>
    </section>
  );
};
