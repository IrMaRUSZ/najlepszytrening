// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import styles from '../styles/Navbar.module.css';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.wrapper}>
        <Link href="/" className={styles.brand} onClick={closeMenu}>
          <span className={styles.brandFirst}>Najlepszy</span>
          <span className={styles.brandSecond}>Trening</span>
        </Link>

        {/* --- Menu na duże ekrany --- */}
        <ul className={styles.menu}>
          <li><Link href="/o-mnie">O mnie</Link></li>
          <li><Link href="/trener-personalny-lodz">Trener</Link></li>
          <li><Link href="/Wspolpraca-online">Współpraca-online</Link></li>
          <li><Link href="/kontakt">Kontakt</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/narzedzia">Narzędzia</Link></li>
          <li><Link href="/quiz">Quiz</Link></li>
          <li><Link href="/grywalizacja">Grywalizacja</Link></li>

          {/* Dynamiczna część na końcu */}
          {!loading && (
            user ? (
              <>
                <li><Link href="/dashboard" className={styles.navButton}>Panel</Link></li>
                <li><a onClick={handleLogout} style={{cursor: 'pointer'}} className={styles.navButtonSecondary}>Wyloguj</a></li>
              </>
            ) : (
              // ZMIANA 1: Zastępujemy linki Logowanie/Rejestracja wartością null
              null
            )
          )}
        </ul>

        <button className={styles.mobileButton} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* --- Menu mobilne --- */}
        {isOpen && (
          <div className={styles.mobileMenu}>
            <Link href="/o-mnie" onClick={closeMenu}>O mnie</Link>
            <Link href="/trener-personalny-lodz" onClick={closeMenu}>Trener</Link>
            <Link href="/Wspolpraca-online" onClick={closeMenu}>Online</Link>
            <Link href="/kontakt" onClick={closeMenu}>Kontakt</Link>
            <Link href="/blog" onClick={closeMenu}>Blog</Link>
            <Link href="/narzedzia" onClick={closeMenu}>Narzędzia</Link>
            <Link href="/quiz" onClick={closeMenu}>Quiz</Link>
            <Link href="/grywalizacja" onClick={closeMenu}>Grywalizacja</Link>

            <hr />

            {!loading && (
                user ? (
                    <>
                        <Link href="/dashboard" onClick={closeMenu}>Panel</Link>
                        <a onClick={() => { handleLogout(); closeMenu(); }} style={{cursor: 'pointer'}}>Wyloguj</a>
                    </>
                ) : (
                    // ZMIANA 2: Tutaj również zastępujemy linki wartością null
                    null
                )
            )}
          </div>
        )}
      </div>
    </nav>
  );
}