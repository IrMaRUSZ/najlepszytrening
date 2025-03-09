import { NextResponse } from 'next/server';
import { PytanieQuizu } from '@/types/quiz';

interface DziennyZestawPytan {
  data: string;
  pytania: PytanieQuizu[];
}

// Zmodyfikowana struktura - pytania pogrupowane po datach
const pytaniaQuizu: DziennyZestawPytan[] = [
  {
    data: "2025-03-09",
    pytania: [
      {
        pytanie: "Który z produktów zawiera najwięcej kofeiny?",
        odpowiedzi: [
          "Filiżanka czarnej herbaty",
          "Filiżanka kawy rozpuszczalnej",
          "Puszka Red Bulla",
          "1 litr Coca-Coli",
          "1 litr Mountain Dew"
        ],
        poprawnaOdpowiedz: 4,
        wyjasnienie: "Mountain Dew zawiera najwięcej kofeiny - 152 mg w litrze. Dla porównania: filiżanka kawy zawiera około 57 mg, filiżanka herbaty 42 mg, puszka Red Bulla 80 mg, a litr Coca-Coli 96 mg kofeiny."
      },
      {
        pytanie: "Co warto wyeliminować, aby skuteczniej schudnąć?",
        odpowiedzi: [
          "Picie napojów zawierających kofeinę",
          "Uwzględnianie w diecie produktów, które lubisz",
          "Picie szklanki wody przed lub po posiłku",
          "Jedzenie posiłków przed telewizorem"
        ],
        poprawnaOdpowiedz: 3,
        wyjasnienie: "Jedzenie przed telewizorem powoduje rozproszenie uwagi, przez co nie skupiamy się odpowiednio na spożywanym posiłku. To może znacząco obniżyć nasze uczucie sytości i prowadzić do przejadania się."
      },
      {
        pytanie: "Które mięśnie są najbardziej zaangażowane podczas wykonywania wznosów ramion w bok?",
        odpowiedzi: [
          "Triceps (mięsień trójgłowy ramienia)",
          "Biceps (mięsień dwugłowy ramienia)",
          "Przednia część mięśnia naramiennego",
          "Mięsień nadgrzebieniowy"
        ],
        poprawnaOdpowiedz: 3,
        wyjasnienie: "Mięsień nadgrzebieniowy w pozycji początkowej ma bardzo dobrą dźwignię do generowania siły, podobnie jak boczna część mięśnia naramiennego. To one są najbardziej zaangażowane podczas wznosów ramion w bok."
      },
      {
        pytanie: "Który z tych produktów ma najwięcej kalorii w jednej sztuce?",
        odpowiedzi: [
          "Biszkopt",
          "Pączek",
          "Ciastko francuskie",
          "50 gramów orzechów"
        ],
        poprawnaOdpowiedz: 2,
        wyjasnienie: "Ciastko francuskie zawiera najwięcej kalorii - około 558 kcal w jednej sztuce. Dla porównania: biszkopt ma około 10 kcal, pączek około 292 kcal, a 50 gramów orzechów około 250 kcal."
      },
      {
        pytanie: "Jaki jest najlepszy czas na spożywanie posiłków po treningu?",
        odpowiedzi: [
          "Natychmiast po treningu",
          "W ciągu 30-60 minut po treningu",
          "2-3 godziny po treningu",
          "Czas nie ma znaczenia"
        ],
        poprawnaOdpowiedz: 3,
        wyjasnienie: "Dla większości osób czas spożycia posiłku po treningu nie ma kluczowego znaczenia. Ważniejsza jest ogólna podaż kalorii i makroskładników w ciągu dnia, a tzw. 'okno anaboliczne' nie ma tak istotnego wpływu na wyniki, jak wcześniej sądzono."
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