import { NextResponse } from 'next/server';
import { PytanieQuizu } from '@/types/quiz';

interface DziennyZestawPytan {
  data: string;
  pytania: PytanieQuizu[];
}

// Zmodyfikowana struktura - pytania pogrupowane po datach
const pytaniaQuizu: DziennyZestawPytan[] = [
  {
    data: "2025-03-17",
    pytania: [
      {
        pytanie: "Czy mówienie do otyłych osób \"Musisz jeść mniej i więcej się ruszać, wystarczy\" jest właściwe?",
        odpowiedzi: [
          "Nie, bo często to jest złożony problem, takie osoby często będą potrzebowały kilku specjalistów, na przykład dietetyka, diabetologa i psychologa.",
          "Tak, bo to podstawowa zasada odchudzania – bilans kaloryczny jest jedyną rzeczą, która ma znaczenie.",
          "Tak, ale tylko jeśli osoba nie ma żadnych problemów metabolicznych i hormonalnych.",
          "Nie, bo każda osoba tyje i chudnie w inny sposób, a jedzenie mniej i ruszanie się więcej nie ma aż takiego wpływu."
        ],
        poprawnaOdpowiedz: 0,
        wyjasnienie: "Otyłość to problem wieloczynnikowy, który często wymaga pomocy specjalistów."
      },
      {
        pytanie: "Jakie są prognozy co do otyłości w Polsce w roku 2035?",
        odpowiedzi: [
          "Poziom otyłości zacznie spadać, bo ludzie będą coraz bardziej świadomi zdrowia.",
          "1/3 populacji będzie otyła.",
          "Tylko 10% społeczeństwa będzie miało problem z otyłością.",
          "Otyłość całkowicie zniknie dzięki nowoczesnym dietom i medycynie."
        ],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Według prognoz NFZ, w 2035 roku 1/3 populacji Polski będzie otyła, co stanowi poważny problem zdrowotny."
      },
      {
        pytanie: "Jakie są konsekwencje otyłości?",
        odpowiedzi: [
          "Nadwaga i otyłość nie różnią się w skutkach zdrowotnych, obie są naturalnym stanem organizmu.",
          "Otyłość wpływa tylko na wygląd i samoocenę, ale nie ma realnych skutków zdrowotnych.",
          "Otyłość jest chorobą i może prowadzić do chorób sercowo-naczyniowych (nadciśnienie, udar, zawał) oraz wielu innych chorób prowadzących do śmierci, na przykład tendinopatii, nowotworów, depresji.",
          "Otyłość powoduje jedynie problemy ze stawami, ale poza tym jest nieszkodliwa."
        ],
        poprawnaOdpowiedz: 2,
        wyjasnienie: "Otyłość to choroba zwiększająca ryzyko wielu poważnych schorzeń, takich jak cukrzyca typu 2, nowotwory i choroby sercowo-naczyniowe."
      },
      {
        pytanie: "Masz otyłość, jaką formę aktywności podejmiesz na początku?",
        odpowiedzi: [
          "Bieganie, bo najszybciej spala kalorie.",
          "Jazda na rowerze, bo pozwoli Ci zacząć, nie będzie zbyt wymagająca pod względem obciążania aparatu ruchu, a jednocześnie pozwoli włączyć ruch do Twojego życia.",
          "Skakanka, bo jest tania i możesz ćwiczyć w domu.",
          "Crossfit, bo to kompleksowy trening całego ciała."
        ],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Osoby z otyłością powinny zaczynać od aktywności, które nie obciążają nadmiernie stawów, a jazda na rowerze to dobry wybór - angażuje duże grupy mięśniowe bez nadmiernego obciążania aparatu ruchu."
      },
      {
        pytanie: "Widzisz otyłą osobę na siłowni, co robisz?",
        odpowiedzi: [
          "Proponujesz jej pomoc i rady, bo pewnie nie wie, jak ćwiczyć.",
          "Zwracasz uwagę trenerowi, żeby się nią zajął, bo może sobie zrobić krzywdę.",
          "Nie zwracasz na nią uwagi, żeby taka osoba mogła się poczuć naturalnie i nie czuła na sobie spojrzenia innych osób.",
          "Uśmiechasz się do niej zachęcająco, żeby wiedziała, że ma twoje wsparcie."
        ],
        poprawnaOdpowiedz: 2,
        wyjasnienie: "Osoby z otyłością często czują się niekomfortowo na siłowni z powodu spojrzeń innych. Traktowanie ich tak samo jak wszystkich innych ćwiczących pomaga im poczuć się naturalnie i kontynuować aktywność fizyczną."
      }
    ]
  },
  {
    data: "2025-03-18",
    pytania: [
      {
        pytanie: "Jakie skutki zdrowotne powoduje alkohol, nawet w małych dawkach pity regularnie?",
        odpowiedzi: [
          "Nie ma wpływu na zdrowie, jeśli pijesz umiarkowanie.",
          "Regularne picie małych dawek nie ma żadnego wpływu na organizm.",
          "Uszkadza praktycznie wszystkie narządy, powoduje nowotwory, uzależnienia, prowadzi do degeneracji mózgu, zaburzeń metabolicznych.",
          "Alkohol wzmacnia serce i poprawia krążenie."
        ],
        poprawnaOdpowiedz: 2,
        wyjasnienie: "Każda dawka alkoholu jest toksyczna, prowadząc do uszkodzenia narządów, nowotworów i zmian neurodegeneracyjnych."
      },
      {
        pytanie: "Masz 35 lat, za kolejne 45 lat stracisz większość masy mięśniowej i nie będziesz w stanie prawdopodobnie się ruszać i żyć samodzielnie. Co możesz zrobić, żeby zatrzymać, a nawet odwrócić ten proces?",
        odpowiedzi: [
          "Wprowadzić trening siłowy, bo zdobyta masa mięśniowa dzisiaj pozwoli mi być pełnosprawnym na stare lata.",
          "Nic, to naturalny proces starzenia się organizmu.",
          "Regularnie spacerować, ale unikać obciążenia mięśni.",
          "Brać suplementy, bo to wystarczy, aby zachować sprawność."
        ],
        poprawnaOdpowiedz: 0,
        wyjasnienie: "Trening siłowy jest kluczowy w zapobieganiu utracie masy mięśniowej i utrzymaniu sprawności w późniejszych latach."
      },
      {
        pytanie: "Jak myślisz, jak szkodliwa substancja jest alkohol, ile zabija ludzi rocznie na całym świecie?",
        odpowiedzi: [
          "Zabija więcej osób niż wojny razem wzięte na całym świecie, przez alkohol umiera co roku ok. 3 miliony osób.",
          "Alkohol jest mniej szkodliwy niż cukier, zabija około 500 tysięcy osób rocznie.",
          "Jest szkodliwy, ale umiera przez niego tylko około milion osób rocznie.",
          "Alkohol jest w miarę bezpieczny, jeśli pije się go z umiarem, zabija tylko osoby uzależnione."
        ],
        poprawnaOdpowiedz: 0,
        wyjasnienie: "Alkohol jest jedną z najbardziej szkodliwych legalnych substancji, powodującą około 3 miliony zgonów rocznie na świecie, co przewyższa liczbę ofiar wojen."
      },
      {
        pytanie: "Jak myślisz, jakie długofalowe skutki powoduje alkohol na Twój mózg?",
        odpowiedzi: [
          "W małych ilościach wspomaga kreatywność i funkcje poznawcze.",
          "Ma neutralny wpływ, jeśli pije się go okazjonalnie.",
          "Poprawia pamięć u osób starszych.",
          "Alkohol będzie prowadził do degeneracji mózgu, w skrócie będzie powodował to, że stajesz się coraz głupszy."
        ],
        poprawnaOdpowiedz: 3,
        wyjasnienie: "Alkohol, nawet w małych dawkach spożywany regularnie, prowadzi do uszkodzenia komórek mózgowych i stopniowej degeneracji funkcji poznawczych."
      },
      {
        pytanie: "W naszej kulturze alkohol jest normalizowany społecznie, nie jest uważany jako narkotyk, w literaturze często opisywany jest jako antydepresant, jak myślisz jakie ma skutki społeczne dla wielu rodzin?",
        odpowiedzi: [
          "Poprawia relacje rodzinne, bo ludzie są bardziej otwarci po alkoholu.",
          "Jeżeli rodzic jest alkoholikiem, a jest to na poziomie około 1 miliona osób w Polsce, to cała rodzina choruje. Dzieci określane są jako DDA - dzieci dorosłych alkoholików i jeżeli nie poddają się terapii, to potem też często uciekają w narkotyki, alkohol, mają problemy z założeniem rodziny. Często partnerzy alkoholików marnują sobie całe życie na pomoc takim osobom.",
          "Ma minimalne skutki, dopóki alkohol pity jest w domu, a nie w miejscach publicznych.",
          "Jeśli ktoś pije kulturalnie, to nie ma to żadnego wpływu na rodzinę."
        ],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Alkoholizm jednego członka rodziny ma destrukcyjny wpływ na całą rodzinę, szczególnie na dzieci, które często powielają wzorce w dorosłym życiu."
      }
    ]
  },
  {
    data: "2025-03-19",
    pytania: [
      {
        pytanie: "Jak myślisz, co wpływa na utrzymanie sprawnego mózgu najbardziej na stare lata?",
        odpowiedzi: [
          "Odpoczynek i unikanie stresu.",
          "Ciągłe uczenie się nowych rzeczy, uspołecznianie się i korzystanie z życia.",
          "Czytanie książek i rozwiązywanie krzyżówek.",
          "Ciężka praca fizyczna przez całe życie."
        ],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Mózg działa jak mięsień – im więcej go bodźcujesz, tym dłużej pozostaje sprawny. Nauka nowych rzeczy i interakcje społeczne pomagają utrzymać funkcje poznawcze."
      },
      {
        pytanie: "Twoja babka mieszka sama na 4 piętrze, ale funkcjonuje samodzielnie, wchodzi codziennie na 4 piętro samodzielnie, jest jej coraz ciężej, ale daje radę. Co robisz?",
        odpowiedzi: [
          "Namawiasz ją na przeprowadzkę na parter, bo schody są dla niej zbyt niebezpieczne.",
          "Wspieram ją w samodzielności, ale jej nie wyręczam. Staram się, żeby jak najwięcej się ruszała, na ile jej pozwala energia. Nie robię za nią zakupów, nie zakazuję jej się ruszać, wiem, że jeżeli przestanie się ruszać, to nie będzie w stanie za jakiś czas wstać z łóżka.",
          "Robisz za nią wszystkie zakupy i załatwiasz sprawy, żeby nie musiała się męczyć.",
          "Organizujesz dla niej opiekunkę, która będzie z nią zawsze, gdy wychodzi z domu."
        ],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Dla osób starszych kluczowe jest utrzymanie samodzielności i aktywności fizycznej. Wyręczanie ich w codziennych czynnościach przyspiesza utratę sprawności i samodzielności."
      },
      {
        pytanie: "Jak myślisz, czy samotność na stare lata skraca życie?",
        odpowiedzi: [
          "Tak, skraca życie, jest to jeden z kluczowych czynników długowieczności.",
          "Nie ma to znaczenia, długość życia zależy głównie od genów.",
          "Samotność wydłuża życie, bo człowiek mniej się stresuje.",
          "Samotność ma wpływ tylko na jakość życia, ale nie na jego długość."
        ],
        poprawnaOdpowiedz: 0,
        wyjasnienie: "Badania naukowe jednoznacznie wskazują, że samotność i izolacja społeczna są silnymi czynnikami ryzyka przedwczesnej śmierci, porównywalnymi z paleniem tytoniu."
      },
      {
        pytanie: "Masz starą osobę z ustabilizowanym nadciśnieniem, kocha pić kawę, czy jej to zakazujesz?",
        odpowiedzi: [
          "Tak, bo kawa może wywołać zawał serca u osób z nadciśnieniem.",
          "Tak, bo kawa zawsze podnosi ciśnienie, co jest niebezpieczne przy nadciśnieniu.",
          "Nie, bo kawa podnosi ciśnienie krótkofalowo i to nieznacznie, a w długim okresie może je nawet delikatnie obniżyć.",
          "Tak, ale tylko jeśli pije więcej niż jedną filiżankę dziennie."
        ],
        poprawnaOdpowiedz: 2,
        wyjasnienie: "Współczesne badania pokazują, że regularne spożycie kawy ma minimalny wpływ na długotrwałe ciśnienie krwi, a może nawet działać protekcyjnie w przypadku ustabilizowanego nadciśnienia."
      },
      {
        pytanie: "Które z tych zachowań najbardziej przyczynia się do długowieczności?",
        odpowiedzi: [
          "Codzienna medytacja i ćwiczenia oddechowe.",
          "Regularne spożywanie suplementów i witamin.",
          "Regularne kontakty społeczne, aktywność fizyczna, zbilansowana dieta i pozytywne nastawienie.",
          "Unikanie stresu i negatywnych emocji za wszelką cenę."
        ],
        poprawnaOdpowiedz: 2,
        wyjasnienie: "Kluczowe dla długowieczności są regularne kontakty społeczne, umiarkowana aktywność fizyczna, zdrowa dieta i pozytywne podejście do życia."
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