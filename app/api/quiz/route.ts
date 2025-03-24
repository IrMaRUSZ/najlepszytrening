import { NextResponse } from 'next/server';
import { PytanieQuizu } from '@/types/quiz';

interface DziennyZestawPytan {
  data: string;
  pytania: PytanieQuizu[];
}

// Zmodyfikowana struktura - pytania pogrupowane po datach
const pytaniaQuizu: DziennyZestawPytan[] = [
  {
    data: "2025-03-24",
    pytania: [
      {
        pytanie: "Na co ma wpływ trening siłowy?",
        odpowiedzi: [
          "Na wzrost masy kości, chroni przed osteoporozą.",
          "Wyłącznie na masę mięśniową, nie wpływa na strukturę kości.",
          "Osłabia kości z powodu nadmiernego obciążenia, zwiększając ryzyko mikrourazów.",
          "Powoduje zatrzymanie wapnia w organizmie, co prowadzi do kamicy nerkowej."
        ],
        poprawnaOdpowiedz: 0,
        wyjasnienie: "Trening siłowy pozytywnie wpływa na gęstość mineralną kości, stymulując ich wzrost i wzmacniając strukturę, co pomaga w profilaktyce osteoporozy."
      },
      {
        pytanie: "Czy trening siłowy powoduje zaprzestanie wzrostu u młodych osób?",
        odpowiedzi: [
          "Nie, to mit.",
          "Tak, powoduje przedwczesne zamknięcie chrząstek wzrostowych.",
          "Tak, ale tylko jeśli trening jest wykonywany z ciężarami przekraczającymi 60% masy ciała.",
          "Tak, dlatego młodzież powinna unikać treningu siłowego do ukończenia 18 roku życia."
        ],
        poprawnaOdpowiedz: 0,
        wyjasnienie: "To mit, że trening siłowy hamuje wzrost. Badania naukowe nie potwierdzają tej tezy. Odpowiednio nadzorowany trening jest bezpieczny i korzystny dla młodych osób."
      },
      {
        pytanie: "Czy masło jest dobrym źródłem tłuszczu?",
        odpowiedzi: [
          "Nie, bo zawiera tłuszcze nasycone, które są uważane za zwiększające ryzyko sercowo-naczyniowe.",
          "Tak, masło jest najzdrowszym źródłem tłuszczu w diecie, bo zawiera naturalne kwasy tłuszczowe.",
          "Tak, masło zawiera głównie zdrowe tłuszcze nienasycone i witaminy rozpuszczalne w tłuszczach.",
          "Tak, masło nie ma żadnego wpływu na poziom cholesterolu, to mit obalony przez najnowsze badania."
        ],
        poprawnaOdpowiedz: 0,
        wyjasnienie: "Masło zawiera wysokie stężenie tłuszczów nasyconych, które w nadmiarze mogą przyczyniać się do wzrostu poziomu cholesterolu LDL i zwiększać ryzyko chorób sercowo-naczyniowych."
      },
      {
        pytanie: "Czego źródłem są truskawki?",
        odpowiedzi: [
          "Witaminy C",
          "Witaminy D",
          "Witaminy B12",
          "Wysokiej zawartości żelaza"
        ],
        poprawnaOdpowiedz: 0,
        wyjasnienie: "Truskawki są znakomitym źródłem witaminy C."
      },
      {
        pytanie: "Wybierz posiłek który najbardziej będzie sycący:",
        odpowiedzi: [
          "Warzywa mrożone z piersią z kurczaka i ostrymi przyprawami",
          "Pizza z podwójnym serem i pepperoni",
          "Pełna miska płatków śniadaniowych z mlekiem",
          "Smoothie owocowe z dodatkiem miodu"
        ],
        poprawnaOdpowiedz: 0,
        wyjasnienie: "Warzywa zapewniają objętość i błonnik, ostre przyprawy zwiększają uczucie sytości, a białko z kurczaka wydłuża uczucie nasycenia - to kombinacja czynników zwiększających sytość przy relatywnie niskiej kaloryczności."
      }
    ]
  },
  {
    data: "2025-03-25",
    pytania: [
      {
        pytanie: "Czy garbienie pleców psuje plecy?",
        odpowiedzi: [
          "Nie, bo ciało się adaptuje do każdej pozycji, ale prawdopodobnie nie będzie to najsilniejsza pozycja.",
          "Tak, garbienie zawsze prowadzi do nieodwracalnych uszkodzeń kręgosłupa i dyskopatii.",
          "Tak, garbienie powoduje trwałe skrócenie mięśni klatki piersiowej, którego nie można już odwrócić po 25 roku życia.",
          "Nie ma to żadnego znaczenia dla zdrowia pleców, pozycja ciała to wyłącznie kwestia estetyki i kultury osobistej."
        ],
        poprawnaOdpowiedz: 0,
        wyjasnienie: "Ciało potrafi adaptować się do różnych pozycji, jednak długotrwałe garbienie może prowadzić do niekorzystnych adaptacji funkcjonalnych i strukturalnych, choć nie jest to bezpośrednio 'uszkodzenie' kręgosłupa."
      },
      {
        pytanie: "Wybierz aktywność, która najlepiej zredukuje stres bez negatywnych konsekwencji:",
        odpowiedzi: [
          "Spacer w parku",
          "Intensywny trening HIIT - im bardziej wyczerpujący, tym lepiej zredukuje stres",
          "Wypicie lampki wina - alkohol jest naturalnym relaksantem bez istotnych skutków ubocznych przy umiarkowanym spożyciu",
          "Wydłużenie czasu snu o dodatkowe 3 godziny - to jedyna skuteczna metoda redukcji chronicznego stresu"
        ],
        poprawnaOdpowiedz: 0,
        wyjasnienie: "Spacer w otoczeniu natury łączy korzyści lekkiej aktywności fizycznej, kontaktu z naturą (terapia lasem) i redukcji napięcia bez ryzyka przeciążenia organizmu czy uzależnienia."
      },
      {
        pytanie: "Czy osoby na dopingu mogą mieć problemy z agresją?",
        odpowiedzi: [
          "Mogą mieć problemy z agresją, ale nie zawsze tak jest. Zwykle osoby, które przed wzięciem dopingu mają problem z agresją, w trakcie dopingu problem się nasila.",
          "Doping nigdy nie powoduje agresji, to tylko mit stworzony przez media.",
          "Każda osoba stosująca doping sportowy będzie miała zwiększony poziom agresji bez wyjątku.",
          "Agresja po dopingu pojawia się wyłącznie u mężczyzn, kobiety są fizjologicznie odporne na ten efekt uboczny."
        ],
        poprawnaOdpowiedz: 0,
        wyjasnienie: "Niektóre substancje dopingujące, szczególnie sterydy anaboliczne, mogą nasilać agresję, jednak efekt ten zależy od indywidualnych predyspozycji, rodzaju substancji i dawkowania."
      },
      {
        pytanie: "Która z tych struktur potrzebuje najwięcej czasu na adaptację do obciążenia?",
        odpowiedzi: [
          "Ścięgna - czasami czas adaptacji po urazie, na przykład po zerwanym więzadle właściwym rzepki, może trwać 2 lata.",
          "Mięśnie - adaptacja mięśni jest najwolniejszym procesem, który może trwać nawet 3-4 lata po poważnym urazie.",
          "Kości - potrzebują one zawsze więcej czasu niż ścięgna na regenerację i adaptację do nowych obciążeń.",
          "Układ nerwowy - potrzebuje on najwięcej czasu, minimum 2-3 lata na pełną adaptację do złożonych wzorców ruchowych."
        ],
        poprawnaOdpowiedz: 0,
        wyjasnienie: "Ścięgna mają gorsze ukrwienie niż mięśnie i kości, co sprawia, że ich regeneracja i adaptacja trwa dłużej. Po poważnych urazach ścięgien proces pełnego powrotu może trwać nawet kilka lat."
      },
      {
        pytanie: "Który z tych produktów wpływa na zwiększoną ilość spalonych kalorii w ciągu dnia?",
        odpowiedzi: [
          "Kofeina - świetna substancja, która powinna wpłynąć pozytywnie na ilość spontanicznej aktywności i redukcję łaknienia.",
          "Zielona herbata - zawiera katechiny, które zwiększają metabolizm o 20-30% przez cały dzień.",
          "Ostra papryka - kapsaicyna w papryce podwaja tempo spalania kalorii przez 5 godzin po spożyciu.",
          "Grejpfrut - zawiera unikalne enzymy, które przyśpieszają spalanie tłuszczu w wątrobie o 150%."
        ],
        poprawnaOdpowiedz: 0,
        wyjasnienie: "Kofeina ma wpływ na spontaniczną aktywność fizyczną (NEAT) oraz może czasowo zmniejszać łaknienie, co pośrednio wpływa na bilans kaloryczny."
      }
    ]
  },
  {
    data: "2025-03-26",
    pytania: [
      {
        pytanie: "Czy czas snu ma wpływ na ilość zgubionej tkanki tłuszczowej?",
        odpowiedzi: [
          "Tak, jest kluczowy - osoby które śpią dłużej gubią szybciej i więcej tkanki tłuszczowej.",
          "Nie, sen wpływa tylko na zmęczenie, ale nie na metabolizm tkanki tłuszczowej.",
          "Tak, ale tylko jeśli śpi się dokładnie 8 godzin - każda inna długość snu hamuje odchudzanie.",
          "Nie, badania pokazują, że krótszy sen (5-6 godzin) przyspiesza metabolizm i sprzyja odchudzaniu."
        ],
        poprawnaOdpowiedz: 0,
        wyjasnienie: "Niedobór snu powoduje zaburzenia hormonalne - wzrost kortyzolu i greliny oraz spadek leptyny, co zwiększa apetyt, szczególnie na wysoko przetworzone produkty. Dodatkowo prowadzi do insulinooporności i utrudnia regenerację mięśni, co negatywnie wpływa na skład ciała."
      },
      {
        pytanie: "Które z tych ćwiczeń najlepiej rozwinie mięsień prosty brzucha?",
        odpowiedzi: [
          "Allachy",
          "Skłony tułowia (popularne brzuszki)",
          "Deska",
          "Nożyce"
        ],
        poprawnaOdpowiedz: 0,
        wyjasnienie: "Allachhy - świetne możliwości progresji, duże rozciągnięcie, jedno z lepszych ćwiczeń na ten mięsień"
      },
      {
        pytanie: "Chcesz schudnąć, co wybierasz?",
        odpowiedzi: [
          "Spacer 8000 kroków dziennie oraz trening siłowy 2 razy w tygodniu.",
          "Intensywne treningi cardio (bieganie, rower) 5 razy w tygodniu.",
          "Ścisła dieta 1200 kcal bez zwiększania aktywności fizycznej.",
          "Detoks sokowy przez 2 tygodnie, a następnie dieta bezglutenowa."
        ],
        poprawnaOdpowiedz: 0,
        wyjasnienie: "Kombinacja regularnej aktywności o niskiej intensywności (spacery) z treningiem siłowym daje najlepsze długofalowe efekty redukcji tkanki tłuszczowej przy jednoczesnym zachowaniu masy mięśniowej. Spacery nie przeciążają organizmu, są łatwe do włączenia w codzienną rutynę, a trening siłowy zwiększa podstawową przemianę materii."
      },
      {
        pytanie: "Które z poniższych twierdzeń dotyczących związku między snem a funkcjami poznawczymi jest najbardziej zgodne z obecną wiedzą naukową?",
        odpowiedzi: [
          "Sen wpływa głównie na pamięć krótkotrwałą, ale nie ma istotnego wpływu na zdolności rozwiązywania problemów.",
          "Niewyspanie powoduje jedynie chwilowe obniżenie funkcji poznawczych, które można zniwelować kawą lub innymi stymulantami.",
          "Chroniczne niewyspanie (poniżej 6 godzin na dobę) powoduje deficyty poznawcze porównywalne do lekkiego upojenia alkoholowego i zwiększa ryzyko demencji w późniejszym wieku.",
          "Jakość snu ma minimalny wpływ na funkcje poznawcze u zdrowych dorosłych, staje się istotna dopiero po 60 roku życia."
        ],
        poprawnaOdpowiedz: 2,
        wyjasnienie: "Badania wykazują, że przewlekły niedobór snu prowadzi do znaczącego pogorszenia funkcji poznawczych, w tym zdolności podejmowania decyzji, szybkości reakcji i pamięci. Długotrwałe zaburzenia snu są również czynnikiem ryzyka neurodegeneracji i demencji."
      },
      {
        pytanie: "Który ze wskaźników najdokładniej określa ryzyko zdrowotne związane z nadmierną masą ciała?",
        odpowiedzi: [
          "Wskaźnik BMI (Body Mass Index)",
          "Stosunek obwodu talii do obwodu bioder (WHR - Waist-Hip Ratio)",
          "Procentowa zawartość tkanki tłuszczowej w organizmie w połączeniu z obwodem talii",
          "Waga ciała w relacji do wzrostu"
        ],
        poprawnaOdpowiedz: 2,
        wyjasnienie: "Procentowa zawartość tkanki tłuszczowej w połączeniu z obwodem talii daje najdokładniejszy obraz ryzyka metabolicznego. BMI nie uwzględnia kompozycji ciała (proporcji mięśni do tkanki tłuszczowej), a WHR, choć lepszy od BMI, nie uwzględnia całkowitej ilości tkanki tłuszczowej. Tłuszcz trzewny (mierzony pośrednio przez obwód talii) jest szczególnie niebezpieczny metabolicznie."
      }
    ]
  }
];

export async function POST(request: Request) {
  try {
    const nowePytanie = await request.json();
    
    // Sprawdzenie czy mamy już zestaw na tę datę
    const data = nowePytanie.data || nowePytanie.dataPytania;
    const maxData = new Date();
    maxData.setDate(maxData.getDate() + 7);
    
    const dataQuizu = new Date(data);
    
    if (dataQuizu > maxData) {
      return NextResponse.json(
        { blad: 'Nie można dodać pytania na więcej niż tydzień do przodu' },
        { status: 400 }
      );
    }

    // Sprawdzamy czy istnieje już zestaw na tę datę
    const istniejacyZestaw = pytaniaQuizu.find(zestaw => zestaw.data === data);
    
    if (istniejacyZestaw) {
      // Dodajemy nowe pytanie do istniejącego zestawu
      const nowePytanieDoZestawu: PytanieQuizu = {
        pytanie: nowePytanie.pytanie,
        odpowiedzi: nowePytanie.odpowiedzi,
        poprawnaOdpowiedz: nowePytanie.poprawnaOdpowiedz,
        wyjasnienie: nowePytanie.wyjasnienie
      };
      
      istniejacyZestaw.pytania.push(nowePytanieDoZestawu);
    } else {
      // Tworzymy nowy zestaw na tę datę
      const nowyZestaw: DziennyZestawPytan = {
        data: data,
        pytania: [{
          pytanie: nowePytanie.pytanie,
          odpowiedzi: nowePytanie.odpowiedzi,
          poprawnaOdpowiedz: nowePytanie.poprawnaOdpowiedz,
          wyjasnienie: nowePytanie.wyjasnienie
        }]
      };
      
      pytaniaQuizu.push(nowyZestaw);
    }
    
    return NextResponse.json({ wiadomosc: 'Pytanie zostało dodane' });
  } catch {
    return NextResponse.json(
      { blad: 'Nie udało się dodać pytania' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const dzisiaj = new Date().toISOString().split('T')[0];
    const zestawNaDzis = pytaniaQuizu.find(zestaw => zestaw.data === dzisiaj);
    
    if (!zestawNaDzis || zestawNaDzis.pytania.length === 0) {
      return NextResponse.json(
        { blad: 'Brak pytań na dzisiaj' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(zestawNaDzis);
  } catch {
    return NextResponse.json(
      { blad: 'Nie udało się pobrać pytań' },
      { status: 500 }
    );
  }
}