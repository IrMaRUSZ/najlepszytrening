import { NextResponse } from 'next/server';

// Krok 2.B - Interfejsy
interface PytanieQuizu {
  pytanie: string;
  odpowiedzi: string[];
  poprawnaOdpowiedz: number;
  wyjasnienie: string;
}

interface DziennyZestawPytan {
  data: string;
  pytania: PytanieQuizu[];
}

// Krok 2.B - Stała pulaPytanZBloga (Wersja 2.0 - Ulepszone pytania)
const pulaPytanZBloga: PytanieQuizu[] = [
  {
    pytanie: "W przypadku wystąpienia niespecyficznego bólu dolnego odcinka kręgosłupa, jakie działanie jest uznawane za największy błąd?",
    odpowiedzi: [
      "Wykonywanie ćwiczeń wzmacniających 'core'",
      "Całkowite zaprzestanie aktywności fizycznej i pozostanie w łóżku",
      "Delikatne ćwiczenia rozciągające",
      "Konsultacja z fizjoterapeutą w celu ustalenia planu działania"
    ],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Unikanie ruchu osłabia mięśnie stabilizujące kręgosłup i może prowadzić do przewlekłego bólu. Kluczowe jest utrzymanie lekkiej aktywności, aby wspierać regenerację."
  },
  {
    pytanie: "Który z poniższych suplementów diety posiada najlepiej udowodnione działanie zarówno w kontekście zwiększania siły, jak i wspierania funkcji kognitywnych?",
    odpowiedzi: [
      "L-karnityna",
      "BCAA (aminokwasy rozgałęzione)",
      "Monohydrat kreatyny",
      "Tribulus terrestris"
    ],
    poprawnaOdpowiedz: 2,
    wyjasnienie: "Monohydrat kreatyny jest jednym z najlepiej przebadanych suplementów. Badania potwierdzają jego skuteczność we wspomaganiu resyntezy ATP, co przekłada się na wzrost siły i wytrzymałości, a także na poprawę funkcji poznawczych."
  },
  {
    pytanie: "Jakie jest kluczowe założenie skutecznego odchudzania bez uciekania się do restrykcyjnych diet?",
    odpowiedzi: [
      "Stosowanie okresowych głodówek w celu 'zresetowania' metabolizmu",
      "Wprowadzanie małych, konsekwentnych i trwałych zmian w codziennych nawykach żywieniowych i ruchowych",
      "Całkowite wyeliminowanie jednej grupy makroskładników, np. węglowodanów",
      "Skupienie się wyłącznie na intensywnych treningach cardio"
    ],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Długoterminowa skuteczność w redukcji masy ciała opiera się na budowaniu trwałych nawyków, a nie na krótkotrwałych, restrykcyjnych zrywach, które często kończą się efektem jo-jo."
  },
  {
    pytanie: "Co, oprócz odpowiedniej ilości snu, jest fundamentalnym elementem skutecznej regeneracji potreningowej?",
    odpowiedzi: [
      "Codzienne sesje w saunie",
      "Picie napojów energetycznych w ciągu dnia",
      "Efektywne zarządzanie stresem i poziomem energii w ciągu dnia",
      "Stosowanie zimnych kąpieli bezpośrednio po każdym treningu"
    ],
    poprawnaOdpowiedz: 2,
    wyjasnienie: "Regeneracja to złożony proces. Wysoki poziom chronicznego stresu (kortyzol) może hamować procesy naprawcze w organizmie, nawet przy odpowiedniej ilości snu."
  },
  {
    pytanie: "Która forma aktywności fizycznej najefektywniej przyczynia się do zwiększenia tzw. NEAT (spontanicznej aktywności fizycznej niezwiązanej z treningiem)?",
    odpowiedzi: [
      "Dwugodzinny, intensywny trening siłowy raz w tygodniu",
      "Codzienne, krótkie sesje interwałowe (HIIT)",
      "Regularne spacery, wybieranie schodów zamiast windy i ogólna ruchliwość w ciągu dnia",
      "Uczestnictwo w maratonie raz w roku"
    ],
    poprawnaOdpowiedz: 2,
    wyjasnienie: "NEAT to suma kalorii spalanych na wszystkie czynności poza zaplanowanym treningiem. Regularna, codzienna aktywność o niskiej intensywności ma największy wpływ na jego wysoki poziom."
  },
  {
    pytanie: "Jaki jest optymalny i najczęściej rekomendowany sposób dawkowania monohydratu kreatyny w celu utrzymania jej stałego, podwyższonego poziomu w mięśniach?",
    odpowiedzi: [
      "Tylko w dni treningowe, 20g przed treningiem",
      "Cyklicznie: 4 tygodnie stosowania, 4 tygodnie przerwy",
      "Codziennie, w dawce około 3-5 gramów, bez konieczności robienia przerw",
      "W formie 'ładowania' – 30g dziennie przez pierwszy miesiąc"
    ],
    poprawnaOdpowiedz: 2,
    wyjasnienie: "Stała, codzienna suplementacja dawką 3-5g jest wystarczająca do wysycenia mięśni kreatyną i utrzymania tego stanu. Cykle i fazy ładowania nie są konieczne dla większości osób."
  },
  {
    pytanie: "W hierarchii ważności elementów skutecznej diety redukcyjnej, co stanowi absolutną podstawę?",
    odpowiedzi: [
      "Wybieranie wyłącznie produktów 'bio' i 'eko'",
      "Spożywanie 6 małych posiłków dziennie",
      "Utrzymanie deficytu kalorycznego",
      "Całkowita rezygnacja z cukru i glutenu"
    ],
    poprawnaOdpowiedz: 2,
    wyjasnienie: "Podstawowym prawem termodynamiki w kontekście odchudzania jest bilans energetyczny. Aby redukować masę ciała, należy spożywać mniej kalorii, niż organizm zużywa, niezależnie od innych czynników."
  },
  {
    pytanie: "Chroniczny niedobór snu (np. spanie poniżej 6 godzin na dobę) prowadzi do zmian hormonalnych, które utrudniają odchudzanie. Jakie to zmiany?",
    odpowiedzi: [
      "Wzrost poziomu testosteronu i spadek kortyzolu",
      "Wzrost poziomu greliny (hormon głodu) i spadek poziomu leptyny (hormon sytości)",
      "Spadek poziomu insuliny i wzrost hormonu wzrostu",
      "Wzrost poziomu estrogenów i progesteronu"
    ],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Niewystarczająca ilość snu zaburza regulację apetytu na poziomie hormonalnym, zwiększając uczucie głodu i osłabiając sygnały sytości, co sprzyja przejadaniu się."
  },
  {
    pytanie: "Który z poniższych suplementów jest kluczowy dla zdrowia kości i układu odpornościowego, a jego niedobory są powszechne w naszej szerokości geograficznej?",
    odpowiedzi: [
      "Witamina C",
      "Magnez",
      "Witamina D3",
      "Cynk"
    ],
    poprawnaOdpowiedz: 2,
    wyjasnienie: "Ze względu na ograniczoną syntezę skórną w okresie jesienno-zimowym w Polsce, suplementacja witaminą D3 jest rekomendowana dla większości populacji w celu wsparcia odporności i gospodarki wapniowo-fosforanowej."
  },
  {
    pytanie: "Podczas wykonywania martwego ciągu, gdzie powinna znajdować się sztanga w początkowej fazie ruchu?",
    odpowiedzi: [
      "Kilka centymetrów przed stopami, aby mieć miejsce na ruch",
      "Bezpośrednio nad stawami skokowymi",
      "Jak najbliżej piszczeli, niemal dotykając ich",
      "Na wysokości kolan, aby skrócić zakres ruchu"
    ],
    poprawnaOdpowiedz: 2,
    wyjasnienie: "Utrzymanie sztangi jak najbliżej osi ciała minimalizuje siły ścinające działające na kręgosłup lędźwiowy i pozwala na najbardziej efektywne i bezpieczne podniesienie ciężaru."
  },
  {
    pytanie: "Czym jest 'przeciążenie metaboliczne' w kontekście budowania masy mięśniowej?",
    odpowiedzi: [
      "Trenowaniem do skrajnego wyczerpania energetycznego, prowadzącego do omdlenia",
      "Spożywaniem nadmiernej ilości kalorii, prowadzącej do otłuszczenia",
      "Wykonywaniem ćwiczeń w taki sposób, aby doprowadzić do kumulacji metabolitów (np. jonów wodorowych) w mięśniu, co jest jednym z bodźców do wzrostu",
      "Obciążeniem organizmu zbyt dużą ilością suplementów diety"
    ],
    poprawnaOdpowiedz: 2,
    wyjasnienie: "Przeciążenie metaboliczne, obok napięcia mechanicznego, jest jednym z głównych mechanizmów hipertrofii. Osiąga się je np. przez krótsze przerwy między seriami lub większą liczbę powtórzeń."
  },
  {
    pytanie: "W kontekście diety sportowca, dlaczego odpowiednia podaż węglowodanów jest kluczowa?",
    odpowiedzi: [
      "Ponieważ są głównym źródłem budulca dla mięśni",
      "Ponieważ eliminują potrzebę spożywania białka",
      "Ponieważ są głównym i najszybciej dostępnym źródłem energii (glikogen mięśniowy) dla pracujących mięśni",
      "Ponieważ nawadniają organizm lepiej niż woda"
    ],
    poprawnaOdpowiedz: 2,
    wyjasnienie: "Węglowodany są magazynowane w mięśniach i wątrobie w formie glikogenu. Jego wysoki poziom jest niezbędny do wykonywania wysiłku o wysokiej intensywności."
  },
  {
    pytanie: "Co jest bardziej wiarygodnym wskaźnikiem ryzyka chorób metabolicznych niż sam wskaźnik BMI?",
    odpowiedzi: [
      "Masa ciała w kilogramach",
      "Wzrost w centymetrach",
      "Stosunek obwodu talii do wzrostu lub obwód talii w połączeniu z procentem tkanki tłuszczowej",
      "Wynik na wadze łazienkowej z pomiarem 'masy kostnej'"
    ],
    poprawnaOdpowiedz: 2,
    wyjasnienie: "BMI nie rozróżnia masy mięśniowej od tłuszczowej. Obwód talii jest dobrym wskaźnikiem ilości tłuszczu trzewnego, który jest silnie powiązany z ryzykiem chorób sercowo-naczyniowych i cukrzycy typu 2."
  },
  {
    pytanie: "Która z wymienionych substancji, będąca adaptogenem, jest ceniona za swoje właściwości redukujące stres i poziom kortyzolu?",
    odpowiedzi: [
      "Kofeina",
      "Ashwagandha",
      "Guarana",
      "Tauryna"
    ],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Ashwagandha to adaptogen, który w badaniach wykazał zdolność do modulowania odpowiedzi organizmu na stres, m.in. poprzez obniżanie poziomu kortyzolu."
  },
  {
    pytanie: "Dlaczego punktowe spalanie tkanki tłuszczowej (np. robienie 'brzuszków' w celu spalenia tłuszczu z brzucha) jest mitem?",
    odpowiedzi: [
      "Ponieważ tłuszcz można spalić tylko za pomocą tabletek",
      "Ponieważ organizm decyduje, skąd czerpie energię z tkanki tłuszczowej w sposób systemowy, a nie lokalny",
      "Ponieważ 'brzuszki' budują mięśnie, które ważą więcej niż tłuszcz",
      "Ponieważ działa to tylko u profesjonalnych sportowców"
    ],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Redukcja tkanki tłuszczowej zachodzi globalnie w całym organizmie w wyniku deficytu kalorycznego. Nie można zmusić ciała do spalania tłuszczu z konkretnego, wybranego miejsca."
  },
  {
    pytanie: "Jakie jest główne zadanie białka w diecie osoby aktywnej fizycznie?",
    odpowiedzi: [
      "Dostarczenie natychmiastowej energii do biegu",
      "Dostarczenie aminokwasów niezbędnych do naprawy i budowy tkanek, w tym mięśni",
      "Poprawa elastyczności stawów",
      "Regulacja temperatury ciała podczas wysiłku"
    ],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Białka są podstawowym budulcem organizmu. Trening uszkadza włókna mięśniowe, a aminokwasy z pożywienia są wykorzystywane w procesie ich regeneracji i nadbudowy (hipertrofii)."
  },
  {
    pytanie: "Który z kwasów tłuszczowych Omega-3 ma kluczowe znaczenie dla funkcji mózgu?",
    odpowiedzi: [
      "ALA (kwas alfa-linolenowy)",
      "DHA (kwas dokozaheksaenowy)",
      "EPA (kwas eikozapentaenowy)",
      "Kwas palmitynowy"
    ],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "DHA jest głównym składnikiem strukturalnym mózgu i siatkówki oka, odgrywając kluczową rolę w rozwoju i funkcjonowaniu układu nerwowego."
  },
  {
    pytanie: "Co jest głównym celem rozgrzewki przed treningiem siłowym?",
    odpowiedzi: [
      "Maksymalne zmęczenie mięśni, aby trening był bardziej efektywny",
      "Zwiększenie temperatury ciała, poprawa mobilności w stawach i aktywacja układu nerwowego do nadchodzącego wysiłku",
      "Spalenie jak największej liczby kalorii jeszcze przed główną częścią treningu",
      "Wykonanie pełnego treningu cardio, aby poprawić wydolność"
    ],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Prawidłowa rozgrzewka przygotowuje cały organizm do wysiłku, zwiększając przepływ krwi do mięśni i 'smarowanie' w stawach, co minimalizuje ryzyko kontuzji i poprawia wydajność."
  },
  {
    pytanie: "W jaki sposób trening siłowy wpływa na zdrowie kości?",
    odpowiedzi: [
      "Nie ma żadnego wpływu, oddziałuje tylko na mięśnie",
      "Osłabia kości poprzez mikrourazy",
      "Stymuluje osteoblasty (komórki kościotwórcze) do zwiększania gęstości mineralnej kości",
      "Powoduje utratę wapnia z kości na rzecz mięśni"
    ],
    poprawnaOdpowiedz: 2,
    wyjasnienie: "Obciążenie mechaniczne generowane podczas treningu siłowego jest sygnałem dla organizmu do wzmacniania struktury kostnej, co jest kluczowe w profilaktyce osteoporozy."
  },
  {
    pytanie: "Jeżeli celem jest maksymalizacja uczucia sytości w diecie o obniżonej kaloryczności, na których makroskładnikach i typach produktów należy się skupić?",
    odpowiedzi: [
      "Na cukrach prostych i sokach owocowych, aby szybko dostarczyć energię",
      "Na produktach o dużej objętości i niskiej gęstości kalorycznej, bogatych w białko i błonnik (np. warzywa, chude mięso)",
      "Wyłącznie na tłuszczach, ponieważ są najbardziej kaloryczne",
      "Na wysoko przetworzonych przekąskach typu 'light'"
    ],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Białko jest najbardziej sycącym makroskładnikiem. Błonnik z warzyw zwiększa objętość posiłku bez dodawania wielu kalorii, co fizycznie wypełnia żołądek i spowalnia trawienie."
  },
    {
    pytanie: "Które z poniższych stwierdzeń na temat snu jest prawdziwe w kontekście osiągania celów sportowych?",
    odpowiedzi: [
      "Faza snu REM jest kluczowa dla regeneracji fizycznej i naprawy mięśni.",
      "Można 'nadrobić' cały zarwany tydzień, śpiąc 12 godzin w jeden dzień weekendu.",
      "Głęboka faza snu (NREM) jest okresem, w którym następuje największe uwalnianie hormonu wzrostu, kluczowego dla regeneracji.",
      "Krótkie drzemki w ciągu dnia całkowicie niwelują negatywne skutki chronicznego niedoboru snu w nocy."
    ],
    poprawnaOdpowiedz: 2,
    wyjasnienie: "To właśnie podczas głębokich faz snu (slow-wave sleep) organizm najintensywniej się regeneruje, naprawia tkanki i uwalnia hormony anaboliczne, takie jak hormon wzrostu."
  }
];

// Krok 2.B - Logika Budująca Quiz
const pytaniaQuizu: DziennyZestawPytan[] = [];

function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

const generujQuiz = () => {
  const dzisiaj = new Date();
  for (let i = 0; i < 30; i++) {
    const data = new Date(dzisiaj);
    data.setDate(dzisiaj.getDate() + i);
    const dataString = data.toISOString().split('T')[0];

    const pulaDoLosowania = [...pulaPytanZBloga];
    const wylosowanePytania = shuffle(pulaDoLosowania).slice(0, 5);

    pytaniaQuizu.push({
      data: dataString,
      pytania: wylosowanePytania,
    });
  }
};

generujQuiz();

// Krok 2.B - Endpoint API
export async function GET() {
  try {
    const dzisiaj = new Date().toISOString().split('T')[0];
    const zestawNaDzis = pytaniaQuizu.find(zestaw => zestaw.data === dzisiaj);

    if (!zestawNaDzis || zestawNaDzis.pytania.length === 0) {
      const fallbackZestaw = pytaniaQuizu[0];
      if (!fallbackZestaw) {
         return NextResponse.json(
            { blad: 'Brak jakichkolwiek pytań w puli' },
            { status: 404 }
        );
      }
      return NextResponse.json(fallbackZestaw);
    }
    
    return NextResponse.json(zestawNaDzis);
  } catch {
    return NextResponse.json(
      { blad: 'Nie udało się pobrać pytań' },
      { status: 500 }
    );
  }
}