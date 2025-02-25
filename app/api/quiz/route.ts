// Ścieżka pliku: /app/api/quiz/route.ts

import { NextResponse } from 'next/server';
import { PytanieQuizu } from '@/types/quiz';

const pytaniaQuizu: PytanieQuizu[] = [
    {
        pytanie: "Jaki jest zalecany spadek masy ciała tygodniowo podczas zdrowej redukcji?",
        odpowiedzi: ["0,2-0,3% masy ciała", "0,5-1% masy ciała", "1,5-2% masy ciała", "2-3% masy ciała"],
        poprawnaOdpowiedz: 1,
        wyjasnienie: "Zdrowa i zrównoważona redukcja masy ciała powinna wynosić 0,5-1% masy ciała tygodniowo. Pozwala to na utrzymanie masy mięśniowej i uniknięcie efektu jo-jo.",
        dataPytania: "2025-02-23"
      },
    {
      pytanie: "Jakie są kluczowe ograniczenia wskaźnika BMI?",
      odpowiedzi: [
        "Jest zbyt skomplikowany do obliczenia", 
        "Działa tylko dla osób wysokich", 
        "Nie uwzględnia składu ciała i rozmieszczenia tkanki tłuszczowej", 
        "Jest odpowiedni tylko dla dzieci"
      ],
      poprawnaOdpowiedz: 2,
      wyjasnienie: "BMI ma kluczowe ograniczenia: nie uwzględnia składu ciała, nie bierze pod uwagę rozmieszczenia tkanki tłuszczowej, ignoruje wiek i płeć, może być mylący dla sportowców i osób aktywnych.",
      dataPytania: "2025-02-24"
    },
    {
      pytanie: "Ile zaleca się spożywać dziennie warzyw?",
      odpowiedzi: [
        "400-500 g",
        "600-700 g",
        "800-1000 g",
        "1200-1500 g"
      ],
      poprawnaOdpowiedz: 2,
      wyjasnienie: "Zaleca się spożywanie około 800 g warzyw i owoców dziennie, z czego większość powinna stanowić warzywa. Jest to ilość, która dostarcza odpowiednią ilość błonnika, witamin i minerałów, wspierając zdrowy styl życia.",
      dataPytania: "2025-02-25"
    },
    {
      pytanie: "Jakie jest minimalne zalecane dzienne spożycie wody?",
      odpowiedzi: [
        "1.5 litra dziennie", 
        "2 litry dziennie", 
        "30ml na kg masy ciała", 
        "50ml na kg masy ciała"
      ],
      poprawnaOdpowiedz: 2,
      wyjasnienie: "Minimalne zalecane spożycie wody to 30ml na kg masy ciała, z uwzględnieniem zwiększonej ilości przy aktywności fizycznej.",
      dataPytania: "2025-02-26"
    },
    {
      pytanie: "Jaka jest minimalna zalecana dzienna liczba kroków podczas odchudzania?",
      odpowiedzi: [
        "5000 kroków", 
        "8000 kroków", 
        "10000 kroków", 
        "12000 kroków"
      ],
      poprawnaOdpowiedz: 1,
      wyjasnienie: "Podczas odchudzania zalecana jest codzienna aktywność na poziomie minimum 8000 kroków dziennie.",
      dataPytania: "2025-02-27"
    },
    {
      pytanie: "Które narzędzie dokładniej ocenia skład ciała niż BMI?",
      odpowiedzi: [
        "Mierzenie obwodu szyi", 
        "Ważenie się codziennie", 
        "Kalkulator tkanki tłuszczowej", 
        "Mierzenie wzrostu"
      ],
      poprawnaOdpowiedz: 2,
      wyjasnienie: "Kalkulator tkanki tłuszczowej jest dokładniejszy niż BMI, ponieważ uwzględnia więcej parametrów: płeć, wiek, obwody ciała i poziom aktywności fizycznej.",
      dataPytania: "2025-02-28"
    },
    {
      pytanie: "Ile razy w tygodniu warto wdrożyć trening siłowy podczas odchudzania?",
      odpowiedzi: [
        "Codziennie", 
        "4-5 razy", 
        "2-3 razy", 
        "1 raz"
      ],
      poprawnaOdpowiedz: 2,
      wyjasnienie: "Podczas odchudzania zaleca się trening siłowy 2-3 razy w tygodniu, co pomaga zachować masę mięśniową i wspomaga proces redukcji tkanki tłuszczowej.",
      dataPytania: "2025-02-29"
    }
  ];

export async function POST(request: Request) {
  try {
    const nowePytanie = await request.json();
    
    const dataQuizu = new Date(nowePytanie.dataPytania);
    const maxData = new Date();
    maxData.setDate(maxData.getDate() + 7);
    
    if (dataQuizu > maxData) {
      return NextResponse.json(
        { blad: 'Nie można dodać pytania na więcej niż tydzień do przodu' },
        { status: 400 }
      );
    }

    pytaniaQuizu.push(nowePytanie);
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
    const pytanieNaDzis = pytaniaQuizu.find(p => p.dataPytania === dzisiaj);

    if (!pytanieNaDzis) {
      return NextResponse.json(
        { blad: 'Brak pytania na dzisiaj' },
        { status: 404 }
      );
    }

    return NextResponse.json(pytanieNaDzis);
  } catch {
    return NextResponse.json(
      { blad: 'Nie udało się pobrać pytania' },
      { status: 500 }
    );
  }
}