'use client';

import React from 'react';
import styles from '../../../styles/Privacy.module.css';

const PrivacyClient = () => {
  return (
    <div className={styles.container}>
      <main className={styles.content}>
        <h1 className={styles.title}>Polityka Prywatności</h1>
        
        <p className={styles.lastUpdate}>
          Ostatnia aktualizacja: 7 grudnia 2024
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>1. Administrator Danych Osobowych</h2>
          <p className={styles.paragraph}>
            Administratorem Państwa danych osobowych jest Ireneusz Maruszewski, prowadzący działalność gospodarczą pod nazwą Ireneusz Maruszews Najlepszy Trening, z siedzibą w Łodzi (dalej jako Administrator).
          </p>
          <p className={styles.paragraph}>
            Kontakt z Administratorem jest możliwy poprzez:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>E-mail: <a href="mailto:maruszewskiirek@gmail.com" className={styles.email}>maruszewskiirek@gmail.com</a></li>
            <li className={styles.listItem}>Formularz kontaktowy na stronie najlepszytrening.pl</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>2. Zakres Przetwarzanych Danych</h2>
          <p className={styles.paragraph}>
            Administrator przetwarza dane osobowe w zakresie niezbędnym do realizacji usług i zgodnie z obowiązującymi przepisami prawa, w szczególności:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>Podstawowe dane identyfikacyjne (imię i nazwisko)</li>
            <li className={styles.listItem}>Dane kontaktowe (adres e-mail, numer telefonu)</li>
            <li className={styles.listItem}>Dane dotyczące stanu zdrowia (wyłącznie w zakresie niezbędnym do bezpiecznej realizacji usług treningowych i za wyraźną zgodą)</li>
            <li className={styles.listItem}>Dane zawarte w korespondencji e-mail i formularzach kontaktowych</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>3. Cele i Podstawy Prawne Przetwarzania</h2>
          <p className={styles.paragraph}>Państwa dane osobowe są przetwarzane w następujących celach:</p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              Realizacja umowy o świadczenie usług treningowych (podstawa prawna: art. 6 ust. 1 lit. b RODO)
            </li>
            <li className={styles.listItem}>
              Prowadzenie działań marketingowych za zgodą użytkownika (podstawa prawna: art. 6 ust. 1 lit. a RODO)
            </li>
            <li className={styles.listItem}>
              Realizacja obowiązków prawnych, w tym podatkowych i rachunkowych (podstawa prawna: art. 6 ust. 1 lit. c RODO)
            </li>
            <li className={styles.listItem}>
              Dochodzenie lub obrona przed roszczeniami (podstawa prawna: art. 6 ust. 1 lit. f RODO)
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>4. Okres Przechowywania Danych</h2>
          <p className={styles.paragraph}>
            Państwa dane osobowe będą przechowywane przez następujące okresy:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              Dane związane z realizacją umowy: przez okres trwania umowy oraz do upływu okresu przedawnienia roszczeń
            </li>
            <li className={styles.listItem}>
              Dane przetwarzane na podstawie zgody: do momentu jej wycofania
            </li>
            <li className={styles.listItem}>
              Dane podatkowe i rachunkowe: przez okres wymagany przepisami prawa (obecnie 5 lat od końca roku kalendarzowego)
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>5. Odbiorcy Danych</h2>
          <p className={styles.paragraph}>
            Państwa dane mogą być przekazywane następującym kategoriom odbiorców:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              Podmiotom świadczącym usługi hostingowe i IT
            </li>
            <li className={styles.listItem}>
              Dostawcom systemów do zarządzania treningami
            </li>
            <li className={styles.listItem}>
              Podmiotom świadczącym usługi księgowe
            </li>
            <li className={styles.listItem}>
              Organom państwowym, gdy wynika to z obowiązujących przepisów prawa
            </li>
          </ul>
          <p className={styles.paragraph}>
            Administrator nie przekazuje danych osobowych do państw trzecich (poza Europejski Obszar Gospodarczy).
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>6. Prawa Osób, Których Dane Dotyczą</h2>
          <p className={styles.paragraph}>
            W związku z przetwarzaniem danych osobowych przysługują Państwu następujące prawa:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>Prawo dostępu do swoich danych oraz otrzymania ich kopii</li>
            <li className={styles.listItem}>Prawo do sprostowania (poprawiania) swoich danych</li>
            <li className={styles.listItem}>Prawo do usunięcia danych (jeżeli nie ma podstaw do ich dalszego przetwarzania)</li>
            <li className={styles.listItem}>Prawo do ograniczenia przetwarzania danych</li>
            <li className={styles.listItem}>Prawo do wniesienia sprzeciwu wobec przetwarzania danych</li>
            <li className={styles.listItem}>Prawo do przenoszenia danych</li>
            <li className={styles.listItem}>Prawo do cofnięcia zgody w dowolnym momencie (bez wpływu na zgodność z prawem przetwarzania przed jej cofnięciem)</li>
            <li className={styles.listItem}>Prawo do wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>7. Informacja o Wymogu Podania Danych</h2>
          <p className={styles.paragraph}>
            Podanie danych osobowych jest dobrowolne, ale niezbędne do zawarcia i realizacji umowy o świadczenie usług treningowych. 
            W przypadku niepodania danych nie będzie możliwe świadczenie usług.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>8. Pliki Cookies i Inne Technologie</h2>
          <p className={styles.paragraph}>
            Strona wykorzystuje pliki cookies i podobne technologie wyłącznie w celu:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>Zapewnienia prawidłowego działania strony</li>
            <li className={styles.listItem}>Zapamiętywania preferencji użytkownika</li>
            <li className={styles.listItem}>Celów statystycznych (anonymizowane dane)</li>
          </ul>
          <p className={styles.paragraph}>
            Mogą Państwo zablokować lub ograniczyć instalowanie plików cookies poprzez odpowiednią konfigurację przeglądarki internetowej.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>9. Zmiany Polityki Prywatności</h2>
          <p className={styles.paragraph}>
            Administrator zastrzega sobie prawo do zmiany niniejszej Polityki Prywatności. O wszelkich zmianach użytkownicy będą informowani poprzez stronę internetową lub drogą e-mailową.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>10. Bezpieczeństwo Danych</h2>
          <p className={styles.paragraph}>
            Administrator stosuje odpowiednie środki techniczne i organizacyjne zapewniające bezpieczeństwo przetwarzanych danych osobowych, w szczególności uniemożliwiające dostęp osobom nieuprawnionym, ich utratę lub bezprawne rozpowszechnianie.
          </p>
        </section>
      </main>
    </div>
  );
};

export default PrivacyClient;