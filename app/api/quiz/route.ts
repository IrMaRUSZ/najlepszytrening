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

const pulaPytanZBloga: PytanieQuizu[] = [
  {
    pytanie: "Wyobraź sobie starszego mężczyznę (powyżej 50 r.ż.), który doznaje osteoporotycznego złamania biodra. Jakie jest statystyczne ryzyko, że umrze w ciągu zaledwie jednego roku po operacji?",
    odpowiedzi: [
      "Mniej niż 1%",
      "Około 5%",
      "10-15%",
      "Szokujące 30-32%"
    ],
    poprawnaOdpowiedz: 3,
    wyjasnienie: "Złamania z powodu kruchości kości to cichy zabójca. Z polskich danych (Glinkowski et al., 2019) wynika, że roczna śmiertelność wynosi aż 30.4% - 32.8% dla mężczyzn! Trening siłowy, chroniący układ kostny, to dosłownie inwestycja w życie."
  },
  {
    pytanie: "Kto w Polsce znacznie częściej trafia do szpitala ze złamaniem osteoporotycznym – kobiety czy mężczyźni?",
    odpowiedzi: [
      "Mężczyźni, z powodu cięższej pracy fizycznej",
      "Kobiety (łamią kości prawie 2,5 raza częściej)",
      "Ryzyko jest dokładnie takie samo dla obu płci",
      "Zależy to wyłącznie od regionu zamieszkania"
    ],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Według polskich badań stosunek złamań kobiet do mężczyzn wynosi aż 2.46. Zmiany hormonalne następujące u kobiet po menopauzie drastycznie przyspieszają utratę gęstości mineralnej kości."
  },
  {
    pytanie: "Choć statystycznie to kobiety ponoszą ponad dwukrotnie wyższe ryzyko samego złamania biodra z powodu osteoporozy, kto wykazuje WYŻSZĄ śmiertelność w rok po takim urazie?",
    odpowiedzi: [
      "Mężczyźni",
      "Kobiety",
      "Osoby z niedowagą niezależnie od płci",
      "Nie ma różnicy między płciami"
    ],
    poprawnaOdpowiedz: 0,
    wyjasnienie: "Mężczyźni łamią kości rzadziej, ale statystyki śmiertelności są dla nich bardziej bezlitosne (powyżej 30% dla panów vs ok. 26-28% dla pań). Dlatego opieka pourazowa jest kluczowa w obu przypadkach."
  },
  {
    pytanie: "Z wiekiem ryzyko drastycznie rośnie. Jak dramatycznie wysoka jest śmiertelność (w ciągu zaledwie 12 miesięcy) po złamaniu szyjki kości udowej u pacjentów w przedziale 80-89 lat?",
    odpowiedzi: [
      "Osiąga około 15%",
      "Przekracza 30%",
      "Wynosi przerażające ponad 50%",
      "Wynosi 100%"
    ],
    poprawnaOdpowiedz: 2,
    wyjasnienie: "To najbardziej wstrząsająca statystyka. W grupie 80-89 lat śmiertelność w rok po złamaniu przekracza 50% (Glinkowski et al., 2019). Mięśnie i mocne kości zbudowane za młodu na siłowni naprawdę ratują życie na starość!"
  },
  {
    pytanie: "Czy dzięki postępowi medycyny i suplementom, liczba osteoporotycznych złamań biodra w Polsce (w latach 2008-2015) wreszcie zaczęła maleć?",
    odpowiedzi: [
      "Tak, spadła o blisko połowę",
      "Statystyki stoją w miejscu",
      "Nie, liczba złamań wzrosła o 14-19%",
      "Zniknęła całkowicie dzięki witaminie D3"
    ],
    poprawnaOdpowiedz: 2,
    wyjasnienie: "Niestety, problem drastycznie narasta! Liczba złamań wzrosła aż o 19.4% u kobiet i 14.2% u mężczyzn. Siedzący tryb życia, zła dieta i unikana aktywność oporowa zbierają ponure żniwo."
  },
  {
    pytanie: "Ile wynosi średni czas pobytu pacjenta po złamaniu biodra w polskim szpitalu publicznym?",
    odpowiedzi: [
      "Zazwyczaj 2-3 dni",
      "Około 11-13 dni",
      "Równo miesiąc",
      "Nawet pół roku"
    ],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Według danych czas hospitalizacji po operacji zmniejszył się w ostatnich latach z 13.6 do 11.2 dnia, co oznacza szybszy wypis, ale przed pacjentem i jego rodziną miesiące niezwykle ciężkiej rehabilitacji domowej."
  },
  {
    pytanie: "Jaki rodzaj aktywności fizycznej jest naukowo najsilniejszym bodźcem, który możemy zaaplikować w prewencji osteoporozy i złamań (tzw. budowanie gęstości kości)?",
    odpowiedzi: [
      "Tylko pływanie, bo odciąża stawy",
      "Codzienne, delikatne sesje stretchingu",
      "Trening siłowy (oporowy z obciążeniem)",
      "Spacery w tempie rekreacyjnym"
    ],
    poprawnaOdpowiedz: 2,
    wyjasnienie: "Zgodnie z Prawem Wolffa, obciążenie mechaniczne generowane np. podczas dźwigania ciężarów stymuluje kości do nadbudowy i utwardzenia się. Samo pływanie (brak kompresji grawitacyjnej) nie daje tak mocnego impulsu osteogennego!"
  },
  {
    pytanie: "Wracasz do mocnych treningów po urazie. Po 4 tygodniach ból znika całkowicie, a Twój mięsień wydaje się 'jak nowy' (odzyskał ok. 80% sprawności). Na jakim etapie gojenia jest wtedy Twoje uszkodzone ścięgno?",
    odpowiedzi: [
      "Również na ok. 80%",
      "Jest już dawno zregenerowane w 100%",
      "Dopiero na poziomie ok. 40%",
      "Ścięgna nie ulegają mikrouszkodzeniom"
    ],
    poprawnaOdpowiedz: 2,
    wyjasnienie: "To największa pułapka treningowa! Zgodnie z modelem obciążeń tkanek Benage (2022), mięśnie regenerują się drastycznie szybciej. Brak bólu mięśniowego to absolutnie NIE JEST sygnał do bicia rekordów – ścięgno jest wciąż słabe!"
  },
  {
    pytanie: "Ile czasu zazwyczaj trwa ostatnia, niezwykle ważna faza regeneracji ścięgna (tzw. faza przebudowy / remodeling)?",
    odpowiedzi: [
      "Zwykle około tygodnia",
      "Dokładnie 14 dni i noc",
      "Od kilku miesięcy do nawet LAT",
      "Kończy się w sekundę po ustąpieniu opuchlizny"
    ],
    poprawnaOdpowiedz: 2,
    wyjasnienie: "Proces układania nowych, silnych włókien kolagenowych w ścięgnie tak, by znów zniosło potężne obciążenie mechaniczne, to praca na długie miesiące (a często lata). Cierpliwość to klucz do braku nawrotów kontuzji."
  },
  {
    pytanie: "Każdy proces regeneracji zaczyna się tak samo. Ile średnio trwa pierwsza faza odpowiedzi organizmu na uraz (faza zapalna)?",
    odpowiedzi: [
      "Od 0 do ok. 1 tygodnia",
      "3 pełne miesiące",
      "Zależnie od pogody – nawet do roku",
      "Trwa zaledwie kilka minut po urazie"
    ],
    poprawnaOdpowiedz: 0,
    wyjasnienie: "Zgodnie z nauką o tkankach faza zapalna zajmuje z reguły pierwszy tydzień. To czas bólu, ciepła i obrzęku. Choć jest to bolesne, to stan zapalny jest konieczny, aby rozpocząć czyszczenie tkanki i proces gojenia!"
  },
  {
    pytanie: "Zgodnie z modelami gojenia uszkodzeń narządu ruchu (Benage 2022), po ilu tygodniach tkanka mięśniowa dobija do pułapu prawie 100% sprawności od kontuzji?",
    odpowiedzi: [
      "Po 1 tygodniu",
      "Po 4 tygodniach",
      "Dopiero w okolicy 12 tygodni",
      "Tkanka mięśniowa nigdy się nie regeneruje"
    ],
    poprawnaOdpowiedz: 2,
    wyjasnienie: "Choć odczucia 'lekkości' i braku bólu przychodzą bardzo szybko (już po 3-4 tyg), na pełną, wewnątrzkomórkową odpowiedź adaptacyjną mięśnia dającą 100% siły trzeba poczekać około 3 miesięcy (12 tygodni)."
  },
  {
    pytanie: "Jesteś 12 tygodni po kontuzji. Twój mięsień zregenerował się w 100% – na ile procent sprawności do przenoszenia obciążeń wyceniane jest w tym samym czasie uszkodzone ścięgno?",
    odpowiedzi: [
      "Jest wciąż na poziomie 20%",
      "Ma dopiero ok. 75% funkcjonalności",
      "Zrównało się z mięśniem (100%)",
      "Zyskało nadludzką siłę rzędu 150%"
    ],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "To jest właśnie moment 'pozornego bezpieczeństwa', w którym amatorzy nagle wrzucają na sztangę życiówki i… zrywają mięsień ze ścięgna. Mięsień może podnieść ciężar, ale tkanka łącząca (na 75%) jeszcze nie!"
  },
  {
    pytanie: "Jaki jest podstawowy powód fizjologiczny tłumaczący drastyczną przepaść w tempie gojenia między tkanką mięśniową, a ścięgnami?",
    odpowiedzi: [
      "Ścięgna nie zawierają w ogóle komórek",
      "Do ścięgien dociera dużo mniej krwi i składników odżywczych (słabe ukrwienie)",
      "Mięśnie są bliżej skóry",
      "Mięśnie mogą pobierać energię bezpośrednio ze słońca"
    ],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Tkanka mięśniowa to genialna, mocno krwawiąca gąbka, która ma masę naczyń krwionośnych - dzięki temu bardzo szybko się naprawia. Ścięgna (tkanka łączna) są w znacznej mierze słabo ukrwione (avaskularne), co drastycznie hamuje ich metabolizm i naprawę."
  },
  {
    pytanie: "Mając świadomość tej różnicy w gojeniu tkanek (mięśnie vs ścięgna), jak należy mądrze programować powroty na siłownię np. po dłuższym urlopie lub chorobie?",
    odpowiedzi: [
      "Robić 1 powtórzenie maksymalne w celu testu siły",
      "Wystartować lekko i celowo dawkować mniejsze objętości (i ciężary) stopniowo z tygodnia na tydzień",
      "Ćwiczyć wyłącznie na maszynach pneumatycznych",
      "Używać tylko gum oporowych przez kolejne pół roku"
    ],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Adaptacja (remodeling) powolnego ścięgna musi mieć szansę 'dogonić' dużo szybciej wracającą pamięć mięśniową. Złota zasada to powolne, konsekwentne (liniowe) dodawanie obciążeń, żeby nie zaskoczyć organizmu!"
  },
  {
    pytanie: "'Keto to jedyna dieta, na której zgubisz brzuch' - a co na to potężna naukowa metaanaliza z 2012 roku porównująca restrykcyjne diety (Hu et al.)?",
    odpowiedzi: [
      "W 100% przyznaje temu rację",
      "Udowadnia, że OBA modele diety (niskowęglowodanowa i niskotłuszczowa) odchudzają bardzo skutecznie",
      "Wskazuje, że diety ogólnie nie prowadzą do chudnięcia",
      "Stwierdza, że schudnąć można tylko pijąc specjalne koktajle"
    ],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Koniec internetowych kłótni! Analizując tysiące pacjentów badacze wykazali jednoznacznie: diety niskowęglowodanowe (Low-Carb) oraz niskotłuszczowe (Low-Fat) w tym samym stopniu pomagają pacjentom skutecznie utracić kilogramy (w warunkach deficytu)."
  },
  {
    pytanie: "Co stanie się z Twoimi wynikami (np. ryzykiem miażdżycy, cholesterolem), jeśli skutecznie schudniesz stosując dietę o wysokiej podaży węglowodanów, ale z obciętym tłuszczem (Low-Fat)?",
    odpowiedzi: [
      "Zdrowie ulegnie pogorszeniu z racji nadmiaru węgli",
      "Cukier natychmiast wywoła stan zapalny serca",
      "Podobnie jak w Low-Carb, wyniki badań (markery zdrowia) ulegną silnej POPRAWIE",
      "Zmieni się waga, ale markery krwi zostaną bez zmian"
    ],
    poprawnaOdpowiedz: 2,
    wyjasnienie: "Samo zrzucenie otyłości jest lekarstwem! Metaanalizy wykazują, że niezależnie od tego czy ucinałeś masło czy ryż, skuteczna redukcja wagi drastycznie zdejmuje stres metaboliczny z narządów wewnętrznych."
  },
  {
    pytanie: "Na Instagramie dieta 'Niskowęglowodanowa' to najczęściej reżim <50g cukru. Tymczasem w profesjonalnej metaanalizie naukowej ocenianej przez ekspertów próg dla bycia Low-Carb to...?",
    odpowiedzi: [
      "Dokładnie 0g węglowodanów",
      "Dieta, w której z węgli pochodzi nawet do 45% dziennej podaży energetycznej",
      "Próg maksymalnie 10g cukru z warzyw",
      "Brak limitu, dopóki pacjent je sałatki"
    ],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Zaskoczenie! W badaniach naukowych 'Low-Carb' rzadko oznacza drastyczne ketozy. Zazwyczaj to po prostu rozsądne obniżenie ich poziomu do ≤45% puli kalorii. Nie musisz rezygnować z ulubionych owoców, by dbać o profil metaboliczny!"
  },
  {
    pytanie: "Co w tych samych analizach zdefiniowano jako zdrowotną dietę 'Niskotłuszczową' (Low-Fat)?",
    odpowiedzi: [
      "Reżim dostarczający maksymalnie 30% dziennej energii z tłuszczu",
      "Maksymalnie 5g tłuszczu tylko w postaci orzechów",
      "Spożywanie wyłącznie samych białek",
      "Picie tylko chudego mleka"
    ],
    poprawnaOdpowiedz: 0,
    wyjasnienie: "Dieta zredukowana w tłuszcze to nie jest ekstremalnie suche i niesmaczne jedzenie. Próg w badaniach wynosił ≤30% energii z tłuszczu. Pozwala to na smaczny kompromis np. między chudym mięsem, znikomą ilością oliwy a większą dawką smacznych węglowodanów."
  },
  {
    pytanie: "Dlaczego metaanaliza udowadniająca skuteczność obydwu modeli żywieniowych jest 'najsilniejszym orężem' dla dietetyków opartej na dowodach medycznych (EBM)?",
    odpowiedzi: [
      "Ponieważ brała udział w niej ogromna ilość gwiazd fitness",
      "Ponieważ opiera się na recenzowanych Randomizowanych Badaniach Kontrolowanych (RCT) – tzw. 'złotym standardzie'",
      "Bo sponsorował ją wielki koncern przemysłu spożywczego",
      "Ponieważ wygrywa w ankietach popularności"
    ],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Metaanaliza RCT znajduje się na samym absolutnym szczycie piramidy dowodów naukowych. Zbiera wyniki dziesiątek eksperymentów rygorystycznie kontrolujących spożycie posiłków przez ochotników, zamykając usta pojedynczym i źle sprawdzonym badaniom obserwacyjnym."
  },
  {
    pytanie: "Wnioski na talerz: Skoro potężne badania sugerują, że chudniemy równie dobrze na diecie białkowo-tłuszczowej jak i węglowodanowej. Co gwarantuje w 100% Twoje efekty?",
    odpowiedzi: [
      "Spożywanie tabletek 'spalających' w nocy",
      "Codzienne picie przegotowanej wody z cytryną na czczo",
      "Skuteczne utrzymywanie umiarkowanego deficytu kalorycznego i dobór produktów tak, żeby posiłki sprawiały nam frajdę",
      "Regularne robienie drastycznych 5-dniowych postów wodnych"
    ],
    poprawnaOdpowiedz: 2,
    wyjasnienie: "Królową i Królem odchudzania są bilans kaloryczny oraz 'adherence' (zgodność i satysfakcja z utrzymania). Zamiast wchodzić w diety, których nienawidzisz, wybierz taką strukturę posiłków, którą będziesz w stanie z uśmiechem utrzymać za 2 lata!"
  },
  {
    pytanie: "'Jedząc tak dużo węgli, Twój układ sercowo-naczyniowy wysiądzie' – jak do tych słów mają się wielkie wnioski z przeglądu systematycznego opublikowanego w British Journal of Nutrition?",
    odpowiedzi: [
      "Niestety, jest to szczera i niepodważalna prawda",
      "Prawda, pod warunkiem, że omijamy ziemniaki i banany",
      "To czysty mit. Zarówno odchudzanie z ograniczeniem (LF) i z użyciem węglowodanów (LC) świetnie poprawia markery CVD",
      "Węglowodany wywołują palpitacje przy wyższym tętnie"
    ],
    poprawnaOdpowiedz: 2,
    wyjasnienie: "Twierdzenie o chorobotwórczych 'węglach' to jedno z największych kłamstw branży. Proces samej utraty tłuszczu trzewnego i poprawy wrażliwości na insulinę doskonale regeneruje układ krwionośny organizmu niezależnie od tego, jakim makroskładnikiem operujesz!"
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