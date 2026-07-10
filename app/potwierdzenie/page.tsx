import React from 'react';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Potwierdzenie rezerwacji | Trening Personalny Łódź',
  robots: 'noindex, nofollow' // Ważne: ukrywamy tę stronę przed Google, by wchodzili tu tylko z reklam!
};

export default function PotwierdzeniePage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#0f0f0f', 
      color: '#f3f4f6',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '600px' }}>
        <CheckCircle size={80} color="#fca311" style={{ margin: '0 auto 2rem' }} />
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#fff' }}>Rezerwacja potwierdzona!</h1>
        <p style={{ fontSize: '1.2rem', color: '#9ca3af', marginBottom: '2rem', lineHeight: '1.6' }}>
          Dziękuję za umówienie konsultacji. Szczegóły spotkania zostały wysłane na Twój adres e-mail. 
          Do zobaczenia na treningu!
        </p>
        <Link 
          href="/" 
          style={{
            display: 'inline-block',
            padding: '1rem 2rem',
            backgroundColor: '#fca311',
            color: '#111',
            textDecoration: 'none',
            fontWeight: 'bold',
            borderRadius: '50px',
            transition: 'all 0.3s'
          }}
        >
          Wróć na stronę główną
        </Link>
      </div>
    </div>
  );
}