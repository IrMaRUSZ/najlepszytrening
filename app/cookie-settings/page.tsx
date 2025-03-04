'use client';
import { useState, useEffect } from 'react';
import styles from '../../styles/CookieSettings.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Polityka cookies – Jak używamy ciasteczek?',
  description: 'Dowiedz się, jak wykorzystujemy pliki cookies na naszej stronie. Sprawdź, jakie dane zbieramy i w jaki sposób możesz nimi zarządzać.',
  keywords: "cookies najlepszytrening",
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: 'https://www.najlepszytrening.pl/polityka-cookies',
    title: 'Polityka cookies – Jak używamy plików cookie?',
    description: 'Poznaj zasady korzystania z plików cookies na naszej stronie. Dowiedz się, jakie dane są gromadzone i jak możesz kontrolować ich wykorzystanie.',
    siteName: 'Najlepszy Trening',
    images: [
      {
        url: '/images/cookies.webp',
        width: 1200,
        height: 630,
        alt: 'Polityka cookies – Pliki cookie na naszej stronie',
      },
    ],
  },
};


const CookieSettings = () => {
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const storedPreferences = localStorage.getItem('cookiePreferences');
    if (storedPreferences) {
      setPreferences(JSON.parse(storedPreferences));
    }
  }, []);

  const savePreferences = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    alert('Ustawienia zapisane!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setPreferences((prev) => ({ ...prev, [name]: checked }));
  };
  

  return (
    <div className={styles.container}>
      <h2>Ustawienia plików cookie</h2>
      <p>Możesz dostosować swoje preferencje dotyczące plików cookie poniżej.</p>
      <div className={styles.option}>
        <input type="checkbox" id="necessary" checked disabled />
        <label htmlFor="necessary">Niezbędne pliki cookie (wymagane)</label>
      </div>
      <div className={styles.option}>
        <input
          type="checkbox"
          id="analytics"
          name="analytics"
          checked={preferences.analytics}
          onChange={handleChange}
        />
        <label htmlFor="analytics">Analityczne pliki cookie</label>
      </div>
      <div className={styles.option}>
        <input
          type="checkbox"
          id="marketing"
          name="marketing"
          checked={preferences.marketing}
          onChange={handleChange}
        />
        <label htmlFor="marketing">Marketingowe pliki cookie</label>
      </div>
      <button className={styles.saveButton} onClick={savePreferences}>
        Zapisz ustawienia
      </button>
    </div>
  );
};

export default CookieSettings;
