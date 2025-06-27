  // app/login/page.tsx
  'use client';

  import { useState } from 'react';
  import { useRouter } from 'next/navigation';
  import { supabase } from '../../lib/supabaseClient';
  import styles from '../../styles/Auth.module.css';

  export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSignIn = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);

      // Wywołujemy funkcję signInWithPassword z Supabase
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        setError(error.message);
      } else {
        // Jeśli logowanie się powiedzie, przekieruj użytkownika do panelu
        // Supabase Auth Helpers automatycznie zarządza ciasteczkami sesji
        router.push('/dashboard'); // Stworzymy tę stronę w następnym kroku
        router.refresh(); // Ważne, aby odświeżyć stan serwera (np. navbar)
      }
    };

    return (
      <main className={styles.container}>
        <div className={styles.authCard}>
          <h1 className={styles.title}>Zaloguj się</h1>
          <form onSubmit={handleSignIn}>
            {error && <p className={styles.errorMessage}>{error}</p>}

            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>Hasło</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                required
              />
            </div>
            <button type="submit" className={styles.button}>
              Zaloguj
            </button>
          </form>
        </div>
      </main>
    );
  }