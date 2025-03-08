import { NextResponse } from 'next/server';
import { PytanieQuizu } from '@/types/quiz';

interface DziennyZestawPytan {
  data: string;
  pytania: PytanieQuizu[];
}

// Zmodyfikowana struktura - pytania pogrupowane po datach
const pytaniaQuizu: DziennyZestawPytan[] = [
  {
    data: "2025-03-07",
    pytania: [
      {
        pytanie: "Jaki jest główny problem związany z nadmierną suplementacją?",
        odpowiedzi: ["Zbyt wysoka cena suplementów", "Stosowanie bez odpowiedniej wiedzy", "Problemy z dostępnością", "Zbyt małe dawki"],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Wiele osób stosuje suplementy bez przemyślenia i odpowiedniej wiedzy, co może prowadzić do niepożądanych efektów i nieprzemyślanych zakupów pod wpływem reklam."
      },
      {
        pytanie: "Które z poniższych NIE jest jest suplementem wartym uwagi w pierwszej kolejności",
        odpowiedzi: ["Kreatyna", "Witamina D3", "Ashwagandha", "Koenzym Q10"],
        poprawnaOdpowiedz: 3,
        wyjasnienie: "Top 5 suplementów: kreatyna, białko w proszku, omega-3, witaminę D3 i ashwaghandha."
      },
      {
        pytanie: "Jakie jest zalecane dzienne dawkowanie kreatyny?",
        odpowiedzi: ["2g", "5g", "10g", "15g"],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Zalecane dawkowanie kreatyny to 5g dziennie, nie wymaga cyklowania i można ją przyjmować o dowolnej porze."
      },
      {
        pytanie: "Który suplement jest szczególnie ważny w naszej strefie geograficznej?",
        odpowiedzi: ["Kreatyna", "Białko w proszku", "Witamina D3", "Ashwagandha"],
        poprawnaOdpowiedz: 2,
        wyjasnienie: "Witamina D3 jest szczególnie ważna w naszej strefie geograficznej ze względu na ograniczoną ekspozycję na słońce."
      },
      {
        pytanie: "Co należy zrobić przed rozpoczęciem suplementacji witaminami?",
        odpowiedzi: ["Kupić jak najwięcej suplementów", "Określić niedobory jeżeli takie występują", "Rozpocząć intensywny trening", "Przeczytać opinie w internecie"],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "W większości przypadków niedobory witamin powinny być pokrytę dietą, suplemetnowanie kompleksów witaminowych to strata pieniędzy"
      }
    ]
  },
  {
    data: "2025-03-08",
    pytania: [
      {
        pytanie: "Jaka jest główna zaleta kreatyny?",
        odpowiedzi: ["Najlepsza cena", "Najlepiej przebadany suplement", "Łatwość stosowania", "Popularność wśród sportowców"],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Kreatyna jest opisana jako jeden z najlepiej przebadanych suplementów na świecie, co daje pewność co do jej skuteczności i bezpieczeństwa."
      },
      {
        pytanie: "Które z poniższych NIE jest korzyścią wynikającą ze stosowania kreatyny?",
        odpowiedzi: ["Wzrost siły", "Poprawa wydolności", "Wsparcie funkcji kognitywnych", "Redukcja tkanki tłuszczowej"],
        poprawnaOdpowiedz: 3,
        wyjasnienie: "Korzyści ze stosowania kreatyny: wzrost siły i masy mięśniowej, poprawę wydolności oraz wsparcie funkcji kognitywnych."
      },
      {
        pytanie: "Dlaczego monohydrat kreatyny jest uważany za najlepszą formę?",
        odpowiedzi: ["Najwyższa biodostępność", "Najniższa cena", "Najmniejsze dawki", "Najlepszy smak"],
        poprawnaOdpowiedz: 0,
        wyjasnienie: "Monohydrat kreatyny jest uważany za najlepszą formę ze względu na najwyższą biodostępność, najlepsze przebadanie oraz najlepszą relację jakości do ceny."
      },
      {
        pytanie: "Czy kreatyna wymaga cyklowania?",
        odpowiedzi: ["Tak, co 2 tygodnie", "Tak, co miesiąc", "Nie wymaga cyklowania", "Tak, co 3 miesiące"],
        poprawnaOdpowiedz: 2,
        wyjasnienie: "Kreatyna nie wymaga cyklowania i może być przyjmowana codziennie w dawce 5g."
      },
      {
        pytanie: "O jakiej porze najlepiej przyjmować kreatynę?",
        odpowiedzi: ["Rano na czczo", "Przed treningiem", "Po treningu", "O dowolnej porze"],
        poprawnaOdpowiedz: 3,
        wyjasnienie: "Kreatynę można przyjmować o dowolnej porze dnia, co czyni jej stosowanie bardzo wygodnym."
      }
    ]
  },
  {
    data: "2025-03-09",
    pytania: [
      {
        pytanie: "Jaką główną zaletę białka w proszku?",
        odpowiedzi: ["Niską cenę", "Wygodne źródło białka", "Lepszy smak niż białko ze źródeł naturalnych", "Szybsze efekty budowy mięśni"],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Białko w proszku jest wygodnym źródłem białka, co jest szczególnie wartościowe dla osób aktywnych fizycznie."
      },
      {
        pytanie: "Na co zwrócić uwagę przy wyborze białka w proszku?",
        odpowiedzi: ["Tylko na smak", "Na markę i cenę", "Na sprawdzone marki i certyfikaty jakości", "Na opinię znajomych"],
        poprawnaOdpowiedz: 2,
        wyjasnienie: "Przy wyborze białka w proszku należy zwrócić uwagę na sprawdzone marki, minimum dodatków oraz certyfikaty jakości."
      },
      {
        pytanie: "Jakie jest zalecane dzienne dawkowanie kwasów omega-3 (EPA/DHA)?",
        odpowiedzi: ["0,5g", "1-3g", "5-7g", "10g"],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Zalecane dzienne dawkowanie kwasów omega-3 (EPA/DHA) wynosi 1-3g, najlepiej przyjmowane z posiłkiem zawierającym tłuszcz."
      },
      {
        pytanie: "Które z poniższych NIE jest korzyścią wynikającą ze stosowania kwasów omega-3?",
        odpowiedzi: ["Wsparcie pracy mózgu", "Działanie przeciwzapalne", "Poprawa zdrowia serca", "Zwiększenie siły mięśniowej"],
        poprawnaOdpowiedz: 3,
        wyjasnienie: "Korzyści ze stosowania kwasów omega-3: wsparcie pracy mózgu, działanie przeciwzapalne oraz poprawę zdrowia serca, ale nie wspomina o zwiększeniu siły mięśniowej."
      },
      {
        pytanie: "Kiedy najlepiej przyjmować suplementy omega-3?",
        odpowiedzi: ["Na czczo", "Z posiłkiem zawierającym tłuszcz", "Przed snem", "Po treningu"],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Suplementy omega-3 najlepiej przyjmować z posiłkiem zawierającym tłuszcz, co zwiększa ich przyswajalność."
      }
    ]
  },
  {
    data: "2025-03-10",
    pytania: [
      {
        pytanie: "Co wpływa na dawkowanie witaminy D3 według artykułu?",
        odpowiedzi: ["Waga ciała", "Poziom we krwi", "Wiek", "Płeć"],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Dawkowanie witaminy D3 jest zależne od jej poziomu we krwi, dlatego zaleca się regularne badania poziomu tej witaminy."
      },
      {
        pytanie: "Z czym najlepiej łączyć witaminę D3?",
        odpowiedzi: ["Z witaminą C", "Z witaminą K2", "Z witaminą A", "Z witaminą E"],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Witaminę D3 najlepiej łączyć z witaminą K2, co poprawia jej działanie, szczególnie w kontekście mineralizacji kości."
      },
      {
        pytanie: "Które z poniższych NIE jest działaniem witaminy D3?",
        odpowiedzi: ["Regulacja układu odpornościowego", "Wsparcie mineralizacji kości", "Wpływ na nastrój", "Przyspieszenie spalania tłuszczu"],
        poprawnaOdpowiedz: 3,
        wyjasnienie: "Artykuł wymienia jako działania witaminy D3: regulację układu odpornościowego, wsparcie mineralizacji kości oraz wpływ na nastrój, ale nie wspomina o przyspieszeniu spalania tłuszczu."
      },
      {
        pytanie: "Jakie jest zalecane dzienne dawkowanie ashwagandhy?",
        odpowiedzi: ["100-300mg", "300-600mg", "600-1200mg", "1500-2000mg"],
        poprawnaOdpowiedz: 2,
        wyjasnienie: "Zalecane dzienne dawkowanie ashwagandhy wynosi 600-1200mg, najlepiej w formie standaryzowanego ekstraktu."
      },
      {
        pytanie: "Które z poniższych NIE jest działaniem ashwagandhy?",
        odpowiedzi: ["Redukcja stresu", "Poprawa jakości snu", "Wsparcie układu odpornościowego", "Zwiększenie poziomu testosteronu"],
        poprawnaOdpowiedz: 3,
        wyjasnienie: "Artykuł wymienia jako działania ashwagandhy: redukcję stresu, poprawę jakości snu oraz wsparcie układu odpornościowego, ale nie wspomina o zwiększeniu poziomu testosteronu."
      }
    ]
  },
  {
    data: "2025-03-11",
    pytania: [
      {
        pytanie: "Co to jest adaptogen w kontekście ashwagandhy?",
        odpowiedzi: ["Substancja wspomagająca adaptację do nowych warunków treningowych", "Związek pomagający organizmowi radzić sobie ze stresem", "Składnik poprawiający wchłanianie innych substancji", "Enzym trawienia białek"],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Adaptogen to związek, który pomaga organizmowi radzić sobie ze stresem i przystosowywać się do różnych warunków. Ashwagandha jest klasyfikowana jako adaptogen o udowodnionym działaniu."
      },
      {
        pytanie: "Czy ashwagandha wymaga cyklowania?",
        odpowiedzi: ["Nie, można stosować ciągle", "Tak, jest to możliwe", "Tylko przy dawkach powyżej 2000mg", "Tylko w połączeniu z innymi suplementami"],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Artykuł wspomina o możliwości cyklowania ashwagandhy, choć nie jest to bezwzględnie wymagane."
      },
      {
        pytanie: "Jakie są potencjalne skutki uboczne nieprzemyślanej suplementacji?",
        odpowiedzi: ["Tylko korzyści", "Problemy żołądkowo-jelitowe i obciążenie wątroby", "Zawsze lepsze efekty treningowe", "Wyłącznie korzyści finansowe"],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Nieprzemyślana suplementacja może prowadzić do problemów żołądkowo-jelitowych, obciążenia wątroby oraz potencjalnych interakcji z lekami."
      },
      {
        pytanie: "Co oznacza termin 'biodostępność' w kontekście suplementów?",
        odpowiedzi: ["Ekologiczne pochodzenie produktu", "Stopień wchłaniania i wykorzystania przez organizm", "Cena w stosunku do jakości", "Czas, przez który suplement pozostaje aktywny"],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Biodostępność określa stopień, w jakim substancja aktywna (np. suplement) jest wchłaniana i wykorzystywana przez organizm. Wysoka biodostępność oznacza lepsze przyswajanie i efektywność."
      },
      {
        pytanie: "Co jest ważniejsze według artykułu: suplementacja czy zbilansowana dieta?",
        odpowiedzi: ["Suplementacja", "Zbilansowana dieta", "Oba elementy są równie ważne", "Zależy od celu treningowego"],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Artykuł wyraźnie podkreśla, że suplementy to dodatek, a nie podstawa zdrowego stylu życia. Zbilansowana dieta jest fundamentem, a suplementacja może być jej uzupełnieniem."
      }
    ]
  },
  {
    data: "2025-03-12",
    pytania: [
      {
        pytanie: "Jaka jest ważność suplementacji w hierarchii elementów diety według artykułu?",
        odpowiedzi: ["5/5 (najważniejsza)", "3/5 (średnio ważna)", "1/5 (najmniej ważna)", "4/5 (bardzo ważna)"],
        poprawnaOdpowiedz: 2,
        wyjasnienie: "Według hierarchii elementów diety przedstawionej w artykule, suplementacja ma ważność 1/5, co czyni ją najmniej istotnym elementem w porównaniu do innych aspektów diety."
      },
      {
        pytanie: "Co ma największą ważność w hierarchii elementów diety?",
        odpowiedzi: ["Suplementacja", "Makroskładniki", "Bilans kaloryczny", "Jakość produktów"],
        poprawnaOdpowiedz: 2,
        wyjasnienie: "Zgodnie z artykułem, bilans kaloryczny ma najwyższą ważność (5/5) w hierarchii elementów diety. Jest to najważniejszy element, bez którego inne aspekty mają mniejsze znaczenie."
      },
      {
        pytanie: "Jakie zalecenie dotyczące białka podaje artykuł o diecie?",
        odpowiedzi: ["0,8g na kg masy ciała", "1,0-1,2g na kg masy ciała", "1,6-2,2g na kg masy ciała", "3g na kg masy ciała"],
        poprawnaOdpowiedz: 2,
        wyjasnienie: "Artykuł o diecie zaleca spożycie białka w ilości 1,6-2,2g na kg masy ciała, co jest szczególnie istotne dla zachowania masy mięśniowej."
      },
      {
        pytanie: "Który element ma taką samą ważność jak nawodnienie (4/5)?",
        odpowiedzi: ["Suplementacja", "Makroskładniki", "Jakość produktów", "Ilość posiłków"],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Zgodnie z hierarchią przedstawioną w artykule, makroskładniki mają ważność 4/5, tak samo jak nawodnienie."
      },
      {
        pytanie: "Co może być skutkiem niewystarczającego nawodnienia?",
        odpowiedzi: ["Lepsze efekty treningowe", "Gorsze efekty treningowe i ogólne samopoczucie", "Zwiększenie siły", "Nie ma wpływu na efekty treningowe"],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Niewystarczające nawodnienie może prowadzić do gorszych efektów treningowych i ogólnego samopoczucia, ponieważ nawodnienie jest jednym z kluczowych elementów diety (ważność 4/5)."
      }
    ]
  },
  {
    data: "2025-03-13",
    pytania: [
      {
        pytanie: "Które z poniższych jest prawdą o suplementacji?",
        odpowiedzi: ["Jest podstawą zdrowego stylu życia", "Jest ważniejsza niż bilans kaloryczny", "Jest dodatkiem do prawidłowej diety", "Zastępuje zbilansowaną dietę"],
        poprawnaOdpowiedz: 2,
        wyjasnienie: "Suplementacja jest dodatkiem do prawidłowej diety, a nie jej podstawą. Nie zastąpi ona zbilansowanej diety i stylu życia."
      },
      {
        pytanie: "Co należy monitorować podczas stosowania suplementów?",
        odpowiedzi: ["Tylko wagę ciała", "Reakcje organizmu", "Wyłącznie postępy treningowe", "Opinie innych osób"],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Podczas stosowania suplementów należy monitorować reakcje organizmu, przestrzegać zalecanych dawek oraz kupować od sprawdzonych producentów."
      },
      {
        pytanie: "Jakie jest potencjalne ryzyko związane z suplementacją?",
        odpowiedzi: ["Brak ryzyka", "Tylko problemy finansowe", "Zanieczyszczenia i interakcje", "Wyłącznie alergie"],
        poprawnaOdpowiedz: 2,
        wyjasnienie: "Ryzyko związane z suplementacją obejmuje możliwość obecności zanieczyszczeń, słabą kontrolę jakości niektórych producentów oraz potencjalne interakcje między suplementami lub z lekami."
      },
      {
        pytanie: "Co należy zrobić przed rozpoczęciem stosowania nowego suplementu?",
        odpowiedzi: ["Natychmiast zacząć przyjmowanie maksymalnej dawki", "Skonsultować się ze specjalistą i wykonać badania", "Przeczytać tylko opinie w internecie", "Zapytać znajomych, czy stosowali ten suplement"],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Przed rozpoczęciem stosowania nowego suplementu zaleca się wykonanie podstawowych badań krwi, konsultację ze specjalistą oraz określenie swoich indywidualnych potrzeb."
      },
      {
        pytanie: "Który składnik diety ma większą ważność: jakość produktów czy suplementacja?",
        odpowiedzi: ["Suplementacja", "Jakość produktów", "Oba mają taką samą ważność", "Żaden z nich nie jest istotny"],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Według hierarchii przedstawionej w artykule, jakość produktów ma ważność 3/5, podczas gdy suplementacja ma ważność 1/5, co oznacza, że jakość produktów jest bardziej istotna."
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