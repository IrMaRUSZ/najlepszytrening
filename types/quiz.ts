// Ścieżka pliku: /types/quiz.ts

export interface PytanieQuizu {
    pytanie: string;
    odpowiedzi: string[];
    poprawnaOdpowiedz: number;
    wyjasnienie: string;
    dataPytania: string; // Format: RRRR-MM-DD
  }