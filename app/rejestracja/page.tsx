// Plik: app/rejestracja/page.tsx
// OSTATECZNA WERSJA - "DROGA NA SKRÓTY"
'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import styles from '../../styles/Auth.module.css';


export default function RejestracjaPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

// app/rejestracja/page.tsx - funkcja handleSignUp
// Plik: app/rejestracja/page.tsx - OSTATECZNA, CZYSTA WERSJA

// Plik: app/rejestracja/page.tsx - POPRAWIONA FUNKCJA

const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Walidacja nazwy użytkownika po stronie klienta (dobra praktyka)
    if (!username.trim()) {
        setError("Nazwa uczestnika jest wymagana.");
        return;
    }

    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      // KLUCZOWA ZMIANA: Przekazujemy dodatkowe dane tutaj
      options: {
        data: {
          username: username.trim() 
        }
      }
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess('Rejestracja pomyślna! Sprawdź email, aby aktywować konto. Po aktywacji możesz się zalogować.');
      // Opcjonalnie wyczyść formularz
      setEmail('');
      setPassword('');
      setUsername('');
    }
};

  return (
    <main className={styles.container}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>Stwórz konto</h1>
        <form onSubmit={handleSignUp}>
          {error && <p className={styles.errorMessage}>{error}</p>}
          {success && <p className={styles.successMessage}>{success}</p>}
          
          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.label}>Nazwa Uczestnika</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className={styles.input} required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Hasło</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input} minLength={6} required />
          </div>
          <button type="submit" className={styles.button}>Zarejestruj się</button>
        </form>
      </div>
    </main>
  );
}