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
          <li><Link href="/trener-personalny-lodz" onClick={closeMenu}>Treningi Łódź</Link></li>
          {/* NOWY LINK: Fizjoterapia */}
          <li><Link href="/fizjoterapeuta-lodz" onClick={closeMenu}>Fizjoterapia</Link></li>
          <li><Link href="/Wspolpraca-online" onClick={closeMenu}>Online</Link></li>
          <li><Link href="/o-mnie" onClick={closeMenu}>O mnie / Opinie</Link></li>
          <li><Link href="/blog" onClick={closeMenu}>Blog</Link></li>
          
          {/* CRO: Główny przycisk kierujący bezpośrednio do kalendarza! */}
          <li className={styles.navCta}>
            <a 
              href="https://calendly.com/maruszewskiirek" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={closeMenu} 
              style={{
                background: 'var(--primary)', 
                color: 'white', 
                padding: '8px 16px', 
                borderRadius: '20px', 
                fontWeight: 'bold',
                textDecoration: 'none',
                boxShadow: '0 2px 10px rgba(255, 69, 0, 0.2)'
              }}
            >
              Darmowa Konsultacja
            </a>
          </li>
        </ul>

        <button className={styles.mobileButton} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* --- Menu mobilne --- */}
        {isOpen && (
          <div className={styles.mobileMenu}>
            <Link href="/trener-personalny-lodz" onClick={closeMenu}>Treningi Łódź</Link>
            {/* NOWY LINK: Fizjoterapia */}
            <Link href="/fizjoterapeuta-lodz" onClick={closeMenu}>Fizjoterapia</Link>
            <Link href="/Wspolpraca-online" onClick={closeMenu}>Prowadzenie Online</Link>
            <Link href="/o-mnie" onClick={closeMenu}>O mnie / Opinie</Link>
            <Link href="/blog" onClick={closeMenu}>Blog</Link>
            
            <hr style={{width: '100%', borderColor: 'rgba(0,0,0,0.1)'}} />
            
            <a 
              href="https://calendly.com/maruszewskiirek" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={closeMenu}
              style={{
                color: 'var(--primary)',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                textDecoration: 'none',
                padding: '10px 0'
              }}
            >
              Umów Darmową Konsultację
            </a>

            <hr style={{width: '100%', borderColor: 'rgba(0,0,0,0.1)'}} />

            {!loading && (
                user ? (
                    <>
                        <Link href="/dashboard" onClick={closeMenu}>Twój Panel</Link>
                        <a onClick={() => { handleLogout(); closeMenu(); }} style={{cursor: 'pointer'}}>Wyloguj</a>
                    </>
                ) : null
            )}
          </div>
        )}
      </div>
    </nav>
  );
}