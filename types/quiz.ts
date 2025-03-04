// @/types/quiz.ts

export interface PytanieQuizu {
  pytanie: string;
  odpowiedzi: string[];
  poprawnaOdpowiedz: number;
  wyjasnienie: string;
}

export interface DziennyZestawPytan {
  data: string;
  pytania: PytanieQuizu[];
}

// Usunięto interfejs PytanieQuizuPelnego, ponieważ nie jest już używany