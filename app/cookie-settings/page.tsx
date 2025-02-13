'use client';
import { useState, useEffect } from 'react';
import styles from '../../styles/CookieSettings.module.css';

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
