import { NextResponse } from 'next/server';
import { PytanieQuizu } from '@/types/quiz';

interface DziennyZestawPytan {
  data: string;
  pytania: PytanieQuizu[];
}

// Zmodyfikowana struktura - pytania pogrupowane po datach
const pytaniaQuizu: DziennyZestawPytan[] = [
  {
    data: "2025-03-13",
    pytania: [
      {
        pytanie: "Które z tych ćwiczeń jest dobrym ćwiczeniem pod rozbudowę pośladków?",
        odpowiedzi: [
          "Fire hydrant",
          "Clamshell",
          "Przwodzenie nóg na maszynie",
          "Kick back",
          "Deska"
        ],
        poprawnaOdpowiedz: 3,
        wyjasnienie: "Fire hydrant - brak możliowśći realnego dociążenia, niestabilna pozycja. Clamshell - to samo co wcześniej. Przywodzenie nóg na maszynie obciąża przywodziciele. Deska jest slabym ćwiczenim na brzuch. Kick back to świetne, ale trudne ćwiczenie na pośladek."
      },
      {
        pytanie: "Co warto wyeliminować, aby skuteczniej schudnąć?",
        odpowiedzi: [
          "Napoje zero",
          "Ziemniaki",
          "Jedzenie po 18",
          "Podjadanie zdrowych przekąsek - na przyklad orzechów"
        ],
        poprawnaOdpowiedz: 3,
        wyjasnienie: "Napoje zero pomagają utrzymać sytość w ryzach, ziemniaki są super sycące i mają malo kalorii, jedzenie po 18 to mit, garść orzechow ma okolo 180 kalorii, więc jest to bomba kaloryczna"
      },
      {
        pytanie: "Czy rolowanie zmniejsza ryzyko urazu",
        odpowiedzi: [
          "Tak, większość osób zapomina jak jest ważne.",
          "Nie, rolowanie jest przeceniane, zwykle będzie stratą czasu.",
        ],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Rolowanie może chwilowo zwiększyć zakres ruchu, ale nie zmniejsza ryzyka urazów i nie wplywa na regeneracje"
      },
        {
          pytanie: "Który z tych produktów zawiera najwięcej białka w 100 gramach?",
          odpowiedzi: [
            "Pierś z kurczaka",
            "Tofu",
            "Jogurt naturalny",
            "Orzechy włoskie"
          ],
          poprawnaOdpowiedz: 0,
          wyjasnienie: "Pierś z kurczaka zawiera najwięcej białka – około 31 g na 100 g. Dla porównania: tofu ma około 13 g, jogurt naturalny 5 g, a orzechy włoskie około 15 g."
        },
        {
          pytanie: "Która z tych aktywności spala najwięcej kalorii w ciągu godziny?",
          odpowiedzi: [
            "Spacer",
            "Jazda na rowerze",
            "Bieganie",
            "Pływanie"
          ],
          poprawnaOdpowiedz: 2,
          wyjasnienie: "Bieganie spala najwięcej kalorii – około 600-800 kcal na godzinę, w zależności od tempa. Spacer spala około 200-300 kcal, jazda na rowerze 400-700 kcal, a pływanie 500-800 kcal."
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