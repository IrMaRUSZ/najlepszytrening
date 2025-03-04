import { NextResponse } from 'next/server';
import { PytanieQuizu } from '@/types/quiz';

interface DziennyZestawPytan {
  data: string;
  pytania: PytanieQuizu[];
}

// Zmodyfikowana struktura - pytania pogrupowane po datach
const pytaniaQuizu: DziennyZestawPytan[] = [
  {
    data: "2025-03-01",
    pytania: [
      {
        pytanie: "Jakie są kluczowe procesy regeneracyjne zachodzące podczas snu?",
        odpowiedzi: ["Produkcja hormonów stresu", "Synteza białek mięśniowych", "Atrofia", "Poprawa wydolności oddechowej"],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Podczas snu zachodzą procesy takie jak produkcja hormonów wzrostu, regeneracja tkanek i synteza białek mięśniowych."
      },
      {
        pytanie: "Jak sen wpływa na poziom kortyzolu?",
        odpowiedzi: ["Zwiększa jego poziom", "Zmniejsza jego poziom", "Nie ma wpływu", "Wyrównuje wahania dobowe"],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Odpowiednia ilość snu zmniejsza poziom kortyzolu (hormonu stresu), co wspomaga proces budowy masy mięśniowej i regeneracji."
      },
      {
        pytanie: "Co dzieje się z mózgiem podczas snu głębokiego?",
        odpowiedzi: ["Zwiększa się aktywność metaboliczna", "Płyn mózgowo-rdzeniowy oczyszcza mózg", "Wzrasta ciśnienie śródczaszkowe", "Zwiększa się temperatura mózgu"],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Podczas snu głębokiego płyn mózgowo-rdzeniowy przepływa przez mózg usuwając toksyny i produkty przemiany materii."
      },
      {
        pytanie: "Która faza snu jest najważniejsza dla regeneracji fizycznej?",
        odpowiedzi: ["REM", "Sen głęboki (faza N3)", "Sen płytki (faza N1)", "Sen pośredni (faza N2)"],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Sen głęboki (faza N3) jest najważniejszy dla regeneracji fizycznej, wtedy następuje największe wydzielanie hormonu wzrostu."
      },
      {
        pytanie: "Jak niedobór snu wpływa na hormony głodu?",
        odpowiedzi: ["Zmniejsza poziom greliny i zwiększa leptynę", "Zwiększa poziom greliny i zmniejsza leptynę", "Nie wpływa na hormony głodu", "Zwiększa zarówno grelinę jak i leptynę"],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Niedobór snu zwiększa poziom greliny (hormon pobudzający apetyt) i zmniejsza leptynę (hormon sytości), co prowadzi do zwiększonego apetytu."
      }
    ]
  },
  {
    data: "2025-03-02",
    pytania: [
      {
        pytanie: "Jakie mogą być skutki niedostatecznej ilości snu dla sportowca?",
        odpowiedzi: ["Poprawa wyników treningowych", "Zwiększone ryzyko urazu", "Przyśpieszenie budowy masy mięśniowej", "Lepsza kontrola apetytu"],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Niedostateczna ilość snu może prowadzić do spowolnienia budowy masy mięśniowej, zwiększonego ryzyka kontuzji oraz gorszej regeneracji."
      },
      {
        pytanie: "Jaki wpływ na proces uczenia się nowych ruchów ma sen?",
        odpowiedzi: ["Pogarsza pamięć proceduralną", "Utrwala nowe wzorce ruchowe", "Nie ma wpływu", "Powoduje zanik nowych umiejętności"],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Sen, szczególnie faza REM, pomaga w utrwalaniu nowych wzorców ruchowych i poprawia pamięć proceduralną, co jest kluczowe przy nauce nowych ćwiczeń."
      },
      {
        pytanie: "Jak niewystarczająca ilość snu wpływa na kontrolę glikemii?",
        odpowiedzi: ["Poprawia wrażliwość na insulinę", "Pogarsza kontrolę poziomu cukru", "Nie ma wpływu", "Zmniejsza produkcję insuliny"],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Niewystarczająca ilość snu zmniejsza wrażliwość na insulinę i pogarsza kontrolę poziomu cukru we krwi, co może wpływać na wydolność treningową."
      },
      {
        pytanie: "Jak niedobór snu wpływa na układ immunologiczny?",
        odpowiedzi: ["Wzmacnia odporność", "Osłabia odporność", "Nie ma wpływu", "Zwiększa liczbę białych krwinek"],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Chroniczny niedobór snu osłabia układ odpornościowy, zwiększając podatność na infekcje, co może prowadzić do przerw w treningach."
      },
      {
        pytanie: "Jaki wpływ na motorykę ma niewystarczająca ilość snu?",
        odpowiedzi: ["Poprawia czas reakcji", "Wydłuża czas reakcji", "Poprawia koordynację", "Nie ma wpływu"],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Niewystarczająca ilość snu wydłuża czas reakcji, pogarsza koordynację i skupienie, co zwiększa ryzyko kontuzji podczas treningu."
      }
    ]
  },
  {
    data: "2025-03-03",
    pytania: [
      {
        pytanie: "Jaka jest zalecana optymalna długość snu dla sportowca?",
        odpowiedzi: ["4-6 godzin", "7-9 godzin", "8-10 godzin", "5-7 godzin"],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Optymalna długość snu dla sportowca wynosi 7-9 godzin, przy czym więcej snu może być potrzebne przy intensywnych treningach."
      },
      {
        pytanie: "Jak zmieniają się potrzeby snu w okresie intensywnych treningów?",
        odpowiedzi: ["Maleją", "Rosną", "Pozostają bez zmian", "Są bardziej nieregularne"],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Podczas okresów intensywnych treningów zapotrzebowanie na sen wzrasta, ponieważ organizm potrzebuje więcej czasu na regenerację."
      },
      {
        pytanie: "Jakie znaczenie ma regularność snu?",
        odpowiedzi: ["Jest nieistotna", "Wpływa na jakość snu", "Ma wpływ tylko na zasypianie", "Ma znaczenie tylko dla sportowców wyczynowych"],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Regularność snu (chodzenie spać i wstawanie o stałych porach) wpływa pozytywnie na jakość snu i synchronizuje rytm dobowy organizmu."
      },
      {
        pytanie: "Co oznacza pojęcie 'dług senny'?",
        odpowiedzi: ["Większą potrzebę snu u osób aktywnych", "Skumulowany efekt niedoboru snu", "Naturalny stan po intensywnym treningu", "Specjalny stan związany z nadmiarem melatoniny"],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Dług senny to skumulowany efekt chronicznego niedoboru snu, który ma negatywny wpływ na organizm i nie może być w pełni 'spłacony' poprzez jednorazowe wyspanie się."
      },
      {
        pytanie: "Jaki wpływ na sen ma intensywny trening wieczorem?",
        odpowiedzi: ["Zawsze poprawia jakość snu", "Może utrudniać zasypianie", "Nie ma wpływu", "Przyspiesza zasypianie u wszystkich osób"],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Intensywny trening wieczorem może utrudniać zasypianie ze względu na podwyższoną temperaturę ciała i poziom adrenaliny, chociaż reakcja jest indywidualna."
      }
    ]
  },
  {
    data: "2025-03-04",
    pytania: [
      {
        pytanie: "Jakie są zasady zdrowego snu, które mogą poprawić jego jakość?",
        odpowiedzi: ["Temperatura około 18°C", "Całkowite zaciemnienie", "Unikanie kofeiny min. 5h przed snem", "Wszystkie powyższe"],
        poprawnaOdpowiedz: 3,
        wyjasnienie: "Zasady zdrowego snu obejmują optymalną temperaturę pokoju (około 18°C), całkowite zaciemnienie i unikanie kofeiny min. 5h przed snem."
      },
      {
        pytanie: "Jak niebieskie światło wpływa na sen?",
        odpowiedzi: ["Ułatwia zasypianie", "Hamuje produkcję melatoniny", "Wydłuża fazę REM", "Nie ma wpływu"],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Niebieskie światło emitowane przez ekrany (telefony, komputery, telewizory) hamuje produkcję melatoniny, hormonu odpowiedzialnego za regulację snu."
      },
      {
        pytanie: "Co to jest higiena snu?",
        odpowiedzi: ["Mycie się przed snem", "Zestaw nawyków sprzyjających zdrowemu snowi", "Czystość pościeli", "Specjalna dieta przed snem"],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Higiena snu to zestaw nawyków i praktyk, które sprzyjają zdrowemu, regularnemu i głębokiemu snowi, np. regularne pory snu, odpowiednie warunki w sypialni."
      },
      {
        pytanie: "Jaki wpływ na sen ma spożywanie alkoholu wieczorem?",
        odpowiedzi: ["Poprawia jakość snu", "Pogarsza jakość snu", "Nie wpływa na sen", "Przedłuża fazę REM"],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Alkohol może ułatwiać zasypianie, ale znacząco pogarsza jakość snu, szczególnie przez zmniejszenie ilości i jakości fazy REM oraz głębokiego snu."
      },
      {
        pytanie: "Jakie znaczenie ma odpowiedni materac dla jakości snu?",
        odpowiedzi: ["Nie ma wpływu", "Wpływa tylko na komfort", "Może zmniejszać bóle i poprawiać jakość snu", "Ma znaczenie tylko dla osób z problemami kręgosłupa"],
        poprawnaOdpowiedz: 2,
        wyjasnienie: "Odpowiedni materac, dostosowany do wagi i preferencji, może znacząco zmniejszać bóle stawowe i mięśniowe oraz poprawiać jakość snu, co jest istotne dla sportowców."
      }
    ]
  },
  {
    data: "2025-03-05",
    pytania: [
      {
        pytanie: "Jaki wpływ na trening ma przewlekły stres?",
        odpowiedzi: ["Osłabienie układu odpornościowego", "Poprawa wyników sportowych", "Zmniejszenie ryzyka kontuzji", "Brak wpływu"],
        poprawnaOdpowiedz: 0,
        wyjasnienie: "Przewlekły stres może prowadzić do osłabienia układu odpornościowego, spowolnienia metabolizmu i gorszych efektów treningowych."
      },
      {
        pytanie: "Jak stres wpływa na poziom kortyzolu?",
        odpowiedzi: ["Zmniejsza jego poziom", "Zwiększa jego poziom", "Nie wpływa na kortyzol", "Stabilizuje jego poziom"],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Stres zwiększa poziom kortyzolu, co może prowadzić do katabolizmu (rozkładu) białek mięśniowych i utrudniać budowę masy mięśniowej."
      },
      {
        pytanie: "Jakie techniki redukcji stresu są najbardziej efektywne dla sportowców?",
        odpowiedzi: ["Medytacja i mindfulness", "Techniki oddechowe", "Sen i regeneracja", "Wszystkie powyższe"],
        poprawnaOdpowiedz: 3,
        wyjasnienie: "Dla sportowców efektywne są różne techniki redukcji stresu, w tym medytacja, mindfulness, techniki oddechowe oraz odpowiedni sen i regeneracja."
      },
      {
        pytanie: "Jak przewlekły stres wpływa na regenerację mięśni?",
        odpowiedzi: ["Przyspiesza regenerację", "Spowalnia regenerację", "Nie ma wpływu", "Wpływa tylko na mięśnie kończyn dolnych"],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Przewlekły stres poprzez podwyższony poziom kortyzolu spowalnia regenerację mięśni i może prowadzić do przeciążeń i kontuzji."
      },
      {
        pytanie: "Co to jest przetrenowanie?",
        odpowiedzi: ["Stan wysokiej formy sportowej", "Zbyt mała ilość treningów", "Stan wyczerpania fizycznego i psychicznego", "Naturalna reakcja na nowe ćwiczenia"],
        poprawnaOdpowiedz: 2,
        wyjasnienie: "Przetrenowanie to stan wyczerpania organizmu spowodowany zbyt dużą ilością treningów lub brakiem odpowiedniej regeneracji, często związany z chronicznym stresem."
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