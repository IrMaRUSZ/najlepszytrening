// Ścieżka pliku: /app/api/quiz/route.ts

import { NextResponse } from 'next/server';
import { PytanieQuizu } from '@/types/quiz';

const pytaniaQuizu: PytanieQuizu[] = [
  {
    pytanie: "Jakie są kluczowe procesy regeneracyjne zachodzące podczas snu?",
    odpowiedzi: ["Produkcja hormonów stresu", "Synteza białek mięśniowych", "Atrofia", "Poprawa wydolności oddechowej"],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Podczas snu zachodzą procesy takie jak produkcja hormonów wzrostu, regeneracja tkanek i synteza białek mięśniowych.",
    dataPytania: "2025-03-01"
  },
  {
    pytanie: "Jakie mogą być skutki niedostatecznej ilości snu dla sportowca?",
    odpowiedzi: ["Poprawa wyników treningowych", "Zwiększone ryzyko urazu", "Przyśpieszenie budowy masy mięśniowej", "Lepsza kontrola apetytu"],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Niedostateczna ilość snu może prowadzić do spowolnienia budowy masy mięśniowej, zwiększonego ryzyka kontuzji oraz gorszej regeneracji.",
    dataPytania: "2025-03-02"
  },
  {
    pytanie: "Jaka jest zalecana optymalna długość snu dla sportowca?",
    odpowiedzi: ["4-6 godzin", "7-9 godzin", "8-10 godzin", "5-7 godzin"],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Optymalna długość snu dla sportowca wynosi 7-9 godzin, przy czym więcej snu może być potrzebne przy intensywnych treningach.",
    dataPytania: "2025-03-03"
  },
  {
    pytanie: "Jakie są zasady zdrowego snu, które mogą poprawić jego jakość?",
    odpowiedzi: ["Temperatura około 18°C", "Całkowite zaciemnienie", "Unikanie kofeiny min. 5h przed snem", "Wszystkie powyższe"],
    poprawnaOdpowiedz: 3,
    wyjasnienie: "Zasady zdrowego snu obejmują optymalną temperaturę pokoju (około 18°C), całkowite zaciemnienie i unikanie kofeiny min. 5h przed snem.",
    dataPytania: "2025-03-04"
  },
  {
    pytanie: "Jaki wpływ na trening ma przewlekły stres?",
    odpowiedzi: ["Osłabienie układu odpornościowego", "Poprawa wyników sportowych", "Zmniejszenie ryzyka kontuzji", "Brak wpływu"],
    poprawnaOdpowiedz: 0,
    wyjasnienie: "Przewlekły stres może prowadzić do osłabienia układu odpornościowego, spowolnienia metabolizmu i gorszych efektów treningowych.",
    dataPytania: "2025-03-05"
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