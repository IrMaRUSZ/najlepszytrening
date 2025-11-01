// @/types/quiz.ts

export interface PytanieQuizu {
  pytanie: string;
  odpowiedzi: string[];
  poprawnaOdpowiedz: number;
  wyjasnienie: string;
  imageUrl?: string;
  videoUrl?: string;
  videoAspectRatio?: '16:9' | '9:16'; // <-- DODAJ TĘ LINIĘ
}

export interface DziennyZestawPytan {
  data: string;
  pytania: PytanieQuizu[];
}