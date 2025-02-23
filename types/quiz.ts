// types/quiz.ts
export interface PytanieQuizu {
  id?: string;
  pytanie: string;
  odpowiedzi: string[];
  poprawnaOdpowiedz: number;
  wyjasnienie: string;
  dataPytania: string;
}