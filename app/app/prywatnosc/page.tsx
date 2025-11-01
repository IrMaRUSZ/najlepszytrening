'use client';

import React from 'react';
import styles from '../../../styles/Privacy.module.css'; // Upewnij się, że ścieżka do stylów jest poprawna

const PrivacyClient = () => {
  return (
    <div className={styles.container}>
      <main className={styles.content}>
        <h1 className={styles.title}>Polityka Prywatności Aplikacji &ldquo;Najlepszy trening&rdquo;</h1>
        <p className={styles.lastUpdate}>
          Data ostatniej aktualizacji: 2 listopada 2025
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>1. Zakres i zastosowanie polityki</h2>
          <p className={styles.paragraph}>
            Niniejsza Polityka Prywatności (&ldquo;Polityka&rdquo;) określa zasady przetwarzania danych osobowych użytkowników (&ldquo;Użytkownicy&rdquo;) Aplikacji mobilnej i webowej &ldquo;Najlepszy trening&rdquo; (&ldquo;Aplikacja&rdquo;) przez Administratora danych, tj. Ireneusz Maruszewski prowadzącego działalność gospodarczą pod firmą &ldquo;Najlepszytrening Ireneusz Maruszewski&rdquo;, z siedzibą: ul. Kopcińskiego 13 lok. 79, 90-242 Łódź, NIP: 725 233 34 37 (&ldquo;Administrator&rdquo;).
          </p>
          <p className={styles.paragraph}>
            Polityka stosuje się wyłącznie do danych przetwarzanych w związku z korzystaniem z Aplikacji. Inne usługi Administratora mogą być objęte odrębną polityką prywatności.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>2. Dane Administratora i kontakt</h2>
          <p className={styles.paragraph}>
            <strong>Administrator danych:</strong> Ireneusz Maruszewski (&ldquo;Administrator&rdquo;).<br />
            <strong>Adres siedziby:</strong> ul. Kopcińskiego 13 lok. 79, 90-242 Łódź.<br />
            <strong>E-mail kontaktowy:</strong> <a href="mailto:maruszewskiirek@gmail.com">maruszewskiirek@gmail.com</a>.
          </p>
          <p className={styles.paragraph}>
            Jeżeli ustanowiono Inspektora Ochrony Danych (IOD), jego dane kontaktowe należy wskazać tutaj (jeśli dotyczy).
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>3. Kategorie danych, cele i podstawy prawne przetwarzania</h2>
          <div className={styles.list}>
            <div style={{ marginBottom: '1.5rem' }}>
              <strong>Cel przetwarzania:</strong><br/> Zawarcie i wykonanie Umowy, obsługa Konta i Usług w Aplikacji<br/><br/>
              <strong>Kategorie danych:</strong><br/> Dane identyfikacyjne (np. imię i nazwisko lub nazwa użytkownika, adres e-mail), dane profilowe (wzrost, waga, płeć, wiek), dane o aktywności (treningi, metryki)<br/><br/>
              <strong>Podstawa prawna (RODO):</strong><br/> art. 6 ust. 1 lit. b RODO
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <strong>Cel przetwarzania:</strong><br/> Personalizacja planów treningowych i – jeżeli wyrażono odrębną zgodę – opieka trenerska<br/><br/>
              <strong>Kategorie danych:</strong><br/> Dane określające stan zdrowia, urazy, cele treningowe, zdjęcia sylwetki — dane szczególnej kategorii (art. 9 RODO)<br/><br/>
              <strong>Podstawa prawna (RODO):</strong><br/> art. 9 ust. 2 lit. a RODO (zgoda)
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <strong>Cel przetwarzania:</strong><br/> Komunikacja systemowa (powiadomienia PUSH, e-mail)<br/><br/>
              <strong>Kategorie danych:</strong><br/> Adres e-mail, identyfikator urządzenia<br/><br/>
              <strong>Podstawa prawna (RODO):</strong><br/> art. 6 ust. 1 lit. f RODO (uzasadniony interes Administratora)
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <strong>Cel przetwarzania:</strong><br/> Marketing bezpośredni (newsletter)<br/><br/>
              <strong>Kategorie danych:</strong><br/> Adres e-mail<br/><br/>
              <strong>Podstawa prawna (RODO):</strong><br/> art. 6 ust. 1 lit. a RODO (zgoda)
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>4. Przetwarzanie danych szczególnej kategorii (dane zdrowotne)</h2>
          <p className={styles.paragraph}>
            Jeśli Użytkownik dobrowolnie wprowadza dane dotyczące jego stanu zdrowia, urazów, zdjęcia sylwetki itp., to Administrator przetwarza te dane wyłącznie za zgodą Użytkownika, zgodnie z art. 9 ust. 2 lit. a RODO. Użytkownik może cofnąć zgodę w dowolnym momencie. Cofnięcie zgody nie wpływa na zgodność z prawem przetwarzania przed jej cofnięciem.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>5. Odbiorcy danych i przekazywanie danych poza EOG</h2>
          <p className={styles.paragraph}>
            Dane Użytkownika mogą być przekazywane zaufanym podmiotom przetwarzającym dane na rzecz Administratora (procesorom) – np. dostawcom infrastruktury chmurowej, operatorom płatności, usług marketingowych, systemów analitycznych.
          </p>
          <p className={styles.paragraph}>
            W przypadku przekazywania danych poza Europejski Obszar Gospodarczy (EOG), Administrator stosuje standardowe klauzule umowne (SCC) lub inne mechanizmy przewidziane prawem.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>6. Okres przechowywania danych</h2>
          <p className={styles.paragraph}>
            Dane osobowe będą przetwarzane przez czas trwania Umowy oraz przez okres niezbędny do wypełnienia obowiązków prawnych Administratora (np. archiwizacja księgowa), lub do momentu żądania usunięcia danych przez Użytkownika, jeśli przepisy prawa nie stanowią inaczej.
          </p>
          <p className={styles.paragraph}>
            Po usunięciu Konta Użytkownika lub rozwiązaniu Umowy, dane zostaną usunięte lub zanonimizowane w terminie ___ (np. 12 miesięcy) od momentu rozwiązania Umowy, chyba że obowiązują przepisy prawa nakazujące dłuższe przechowywanie. Użytkownik otrzyma informację o tym terminie.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>7. Zautomatyzowane podejmowanie decyzji, w tym profilowanie</h2>
          <p className={styles.paragraph}>
            Aplikacja może wykorzystywać algorytmy wspierające dobór planów treningowych na podstawie danych Użytkownika. Nie są to decyzje wyłącznie automatyczne, które posiadają względem Użytkownika skutki prawne lub w podobny sposób znacząco na niego wpływ.
          </p>
          <p className={styles.paragraph}>
            Użytkownik ma prawo zażądać interwencji ludzkiej, wyrażenia swojego stanowiska oraz wniesienia sprzeciwu wobec przetwarzania (art. 22 RODO).
          </p>
          <p className={styles.paragraph}>
            Administrator stosuje środki techniczne i organizacyjne w celu minimalizacji ryzyka wynikającego z profilowania.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>8. Prawa Użytkownika</h2>
          <p className={styles.paragraph}>
            Każdemu Użytkownikowi przysługują prawa wynikające z RODO:
          </p>
          <ul className={styles.list}>
            <li>prawo dostępu do swoich danych,</li>
            <li>prawo ich sprostowania, usunięcia (&ldquo;prawo do bycia zapomnianym&rdquo;),</li>
            <li>prawo ograniczenia przetwarzania,</li>
            <li>prawo przenoszenia danych,</li>
            <li>prawo wniesienia sprzeciwu wobec przetwarzania, w tym profilowania,</li>
            <li>prawo wycofania zgody w dowolnym momencie (bez wpływu na zgodność z prawem przetwarzania przed jego wycofaniem).</li>
          </ul>
          <p className={styles.paragraph}>
            Wniosek dotyczący realizacji powyższych praw Użytkownik może złożyć drogą elektroniczną na adres e-mail Administratora. Użytkownik ma prawo wniesienia skargi do organu nadzorczego, którym w Polsce jest Prezes Urzędu Ochrony Danych Osobowych.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>9. Dane dzieci</h2>
          <p className={styles.paragraph}>
            Usługa jest przeznaczona wyłącznie dla osób, które ukończyły 18 lat. Administrator nie przetwarza świadomie danych dzieci poniżej 18 roku życia w ramach Aplikacji. W przypadku dowiedzenia się o przetwarzaniu takich danych bez wymaganej zgody – Administrator niezwłocznie usunie te dane.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>10. Środki bezpieczeństwa</h2>
          <p className={styles.paragraph}>
            Administrator stosuje odpowiednie środki techniczne i organizacyjne, m.in. szyfrowanie danych w spoczynku i w transmisji, pseudonimizację danych tam, gdzie to możliwe, systemy autoryzacji dostępu, regularne testy bezpieczeństwa, backupy danych – w celu ochrony danych przed nieuprawnionym dostępem, zmianą lub utratą.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>11. Zmiany w Polityce Prywatności</h2>
          <p className={styles.paragraph}>
            Administrator zastrzega sobie prawo do zmiany niniejszej Polityki. O wszelkich istotnych zmianach Użytkownik zostanie poinformowany co najmniej 14 dni przed ich wejściem w życie – w sposób przewidziany w Aplikacji lub na podany adres e-mail. Jeżeli Użytkownik nie zgadza się ze zmianą – może w tym okresie usunąć Konto lub wypowiedzieć Umowę.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>12. Postanowienia końcowe</h2>
          <p className={styles.paragraph}>
            W sprawach nieuregulowanych Polityką zastosowanie mają przepisy RODO oraz obowiązujące przepisy prawa polskiego. Polityka wchodzi w życie z dniem 2 listopada 2025.
          </p>
        </section>
      </main>
    </div>
  );
};

export default PrivacyClient;