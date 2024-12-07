'use client';

import React, { useState } from 'react';
import { Scale } from 'lucide-react';
import styles from '../../styles/Calculators.module.css';

interface BMIResults {
  bmi: number;
  category: string;
  description: string;
}

const BMI = () => {
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
  });

  const [results, setResults] = useState<BMIResults | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getColorByBMI = (bmi: number): string => {
    if (bmi < 16.0) return '#dc2626'; // Wygłodzenie
    if (bmi < 17.0) return '#ef4444'; // Wychudzenie
    if (bmi < 18.5) return '#fb923c'; // Niedowaga
    if (bmi < 25.0) return '#22c55e'; // Prawidłowa masa
    if (bmi < 30.0) return '#fbbf24'; // Nadwaga
    if (bmi < 35.0) return '#f97316'; // Otyłość I stopnia
    if (bmi < 40.0) return '#ef4444'; // Otyłość II stopnia
    return '#dc2626'; // Otyłość III stopnia
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const getCategory = (bmi: number): { category: string; description: string } => {
    if (bmi < 16.0) return { 
      category: 'Wygłodzenie',
      description: 'Stan wymagający natychmiastowej konsultacji lekarskiej.'
    };
    if (bmi < 17.0) return { 
      category: 'Wychudzenie',
      description: 'Masa ciała jest zbyt niska. Zalecana konsultacja z lekarzem.'
    };
    if (bmi < 18.5) return { 
      category: 'Niedowaga',
      description: 'Masa ciała poniżej normy. Rozważ zwiększenie kaloryczności diety.'
    };
    if (bmi < 25.0) return { 
      category: 'Prawidłowa masa ciała',
      description: 'Twoja masa ciała jest w normie. Utrzymuj zdrowy styl życia.'
    };
    if (bmi < 30.0) return { 
      category: 'Nadwaga',
      description: 'Masa ciała powyżej normy. Rozważ modyfikację diety i zwiększenie aktywności fizycznej.'
    };
    if (bmi < 35.0) return { 
      category: 'Otyłość I stopnia',
      description: 'Zalecana konsultacja z lekarzem i wprowadzenie zmian w stylu życia.'
    };
    if (bmi < 40.0) return { 
      category: 'Otyłość II stopnia',
      description: 'Wymagana konsultacja z lekarzem. Rozważ kompleksowe podejście do redukcji masy ciała.'
    };
    return { 
      category: 'Otyłość III stopnia',
      description: 'Stan wymagający natychmiastowej konsultacji lekarskiej i specjalistycznego leczenia.'
    };
  };

  const calculateBMI = () => {
    setError(null);
    
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);

    if (!weight || !height || weight <= 0 || height <= 0) {
      setError('Wprowadź prawidłowe wartości wagi i wzrostu');
      return;
    }

    if (weight < 30 || weight > 300) {
      setError('Wprowadź prawidłową wagę (30-300 kg)');
      return;
    }

    if (height < 100 || height > 250) {
      setError('Wprowadź prawidłowy wzrost (100-250 cm)');
      return;
    }

    try {
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
      const roundedBMI = Math.round(bmi * 10) / 10;
      const { category, description } = getCategory(roundedBMI);

      setResults({
        bmi: roundedBMI,
        category,
        description
      });
    } catch {
      setError('Wystąpił błąd podczas obliczania. Sprawdź wprowadzone dane.');
    }
  };

  return (
    <div className={styles.calculator}>
      <div className={styles.calculatorHeader}>
        <Scale className={styles.icon} />
        <h2>Kalkulator BMI</h2>
        <p>Oblicz swój wskaźnik masy ciała (Body Mass Index)</p>
      </div>

      <div className={styles.form}>
        <div className={styles.formGrid}>
          <div className={styles.inputGroup}>
            <label>Waga (kg)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              placeholder="Np. 70"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Wzrost (cm)</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              placeholder="Np. 175"
            />
          </div>
        </div>
        <p>Kalkulator BMI dla osób ćwiczących jest słabym sposobem oceny odpowiedniej masy ciała.</p>

        <button onClick={calculateBMI} className={styles.calculateButton}>
          Oblicz BMI
          <Scale className={styles.buttonIcon} />
        </button>

        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}
      </div>

      {results && (
        <div className={styles.results}>
          <div className={styles.resultCard}>
            <div className={styles.resultHeader}>
              <h3>Twoje BMI</h3>
            </div>

            <div className={styles.mainResult}>
              <div 
                className={styles.percentageCircle}
                style={{ 
                  background: getColorByBMI(results.bmi)
                }}
              >
                <span className={styles.mainValue}>{results.bmi}</span>
                <span className={styles.mainLabel}>BMI</span>
              </div>
              <div 
                className={styles.categoryBadge}
                style={{ 
                  borderColor: getColorByBMI(results.bmi),
                  color: getColorByBMI(results.bmi)
                }}
              >
                {results.category}
              </div>
              <p className={styles.description}>{results.description}</p>
            </div>

            <div className={styles.referenceTable}>
              <h4>Kategorie BMI</h4>
              <div className={styles.tableGrid}>
                <div className={styles.tableRow}>
                  <span>Wygłodzenie</span>
                  <span>&lt; 16.0</span>
                </div>
                <div className={styles.tableRow}>
                  <span>Wychudzenie</span>
                  <span>16.0 - 16.9</span>
                </div>
                <div className={styles.tableRow}>
                  <span>Niedowaga</span>
                  <span>17.0 - 18.4</span>
                </div>
                <div className={styles.tableRow}>
                  <span>Prawidłowa masa</span>
                  <span>18.5 - 24.9</span>
                </div>
                <div className={styles.tableRow}>
                  <span>Nadwaga</span>
                  <span>25.0 - 29.9</span>
                </div>
                <div className={styles.tableRow}>
                  <span>Otyłość I°</span>
                  <span>30.0 - 34.9</span>
                </div>
                <div className={styles.tableRow}>
                  <span>Otyłość II°</span>
                  <span>35.0 - 39.9</span>
                </div>
                <div className={styles.tableRow}>
                  <span>Otyłość III°</span>
                  <span>≥ 40.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BMI;