'use client';
// app/auth/signin/page.tsx
import { signIn } from "next-auth/react";
import styles from '../../../styles/signin.module.css';

export default function SignIn() {
  const handleGoogleSignIn = () => {
    signIn('google', {
      callbackUrl: '/quiz',
      redirect: true,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Zaloguj się do quizu</h2>
        <p>Zaloguj się aby móc brać udział w quizie i zdobywać nagrody</p>
        
        <button
          onClick={handleGoogleSignIn}
          className={styles.googleButton}
        >
          Zaloguj przez Google
        </button>
      </div>
    </div>
  );
}