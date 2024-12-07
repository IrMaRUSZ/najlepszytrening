'use client';

import React, { useState } from 'react';
import { Scale } from 'lucide-react';
import styles from '../../styles/Calculators.module.css';

interface BodyFatResults {
  bodyFatPercentage: number;
  fatMass: number;
  leanMass: number;
  category: string;
}

const BodyFat = () => {
  const [formData, setFormData] = useState({
    gender: 'male',
    weight: '',
    waist: '',
    neck: '',
    height: '',
    hip: '',
  });

  const [results, setResults] = useState<BodyFatResults | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getColorByPercentage = (percentage: number, gender: string): string => {
    if (gender === 'male') {
      if (percentage < 6) return '#eab308'; // żółty - ostrzeżenie
      if (percentage < 10) return '#fbbf24'; // złoty
      if (percentage < 15) return '#22c55e'; // zielony
      if (percentage < 20) return '#fb923c'; // pomarańczowy
      if (percentage < 25) return '#f97316'; // ciemny pomarańczowy
      return '#dc2626'; // czerwony
    } else {
      if (percentage < 14) return '#eab308'; // żółty - ostrzeżenie
      if (percentage < 18) return '#fbbf24'; // złoty
      if (percentage < 23) return '#22c55e'; // zielony
      if (percentage < 28) return '#fb923c'; // pomarańczowy
      if (percentage < 32) return '#f97316'; // ciemny pomarańczowy
      return '#dc2626'; // czerwony
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const validateInputs = () => {
    const { gender, weight, waist, neck, height, hip } = formData;
    
    const weightNum = parseFloat(weight);
    const waistNum = parseFloat(waist);
    const neckNum = parseFloat(neck);
    const heightNum = parseFloat(height);
    const hipNum = gender === 'female' ? parseFloat(hip) : 0;

    if (
      weightNum <= 0 || weightNum > 300 ||
      waistNum <= 0 || waistNum > 200 ||
      neckNum <= 0 || neckNum > 100 ||
      heightNum <= 0 || heightNum > 300 ||
      (gender === 'female' && (hipNum <= 0 || hipNum > 200))
    ) {
      setError('Proszę wprowadzić prawidłowe wartości pomiarów');
      return false;
    }

    return true;
  };

  const calculateBodyFat = () => {
    setError(null);
    
    if (!validateInputs()) return;

    const { gender, weight, waist, neck, height, hip } = formData;
    
    const weightNum = parseFloat(weight);
    const waistNum = parseFloat(waist);
    const neckNum = parseFloat(neck);
    const heightNum = parseFloat(height);
    const hipNum = gender === 'female' ? parseFloat(hip) : 0;

    let bodyFatPercentage: number;
    
    try {
      if (gender === 'male') {
        bodyFatPercentage = 495 / (1.0324 - 0.19077 * Math.log10(waistNum - neckNum) + 0.15456 * Math.log10(heightNum)) - 450;
      } else {
        bodyFatPercentage = 495 / (1.29579 - 0.35004 * Math.log10(waistNum + hipNum - neckNum) + 0.22100 * Math.log10(heightNum)) - 450;
      }

      bodyFatPercentage = Math.max(0, Math.min(50, bodyFatPercentage));
      bodyFatPercentage = Math.round(bodyFatPercentage * 10) / 10;

      const fatMass = Math.max(0, Math.round((weightNum * bodyFatPercentage / 100) * 10) / 10);
      const leanMass = Math.max(0, Math.round((weightNum - fatMass) * 10) / 10);

      const category = getCategory(bodyFatPercentage, gender);

      setResults({
        bodyFatPercentage,
        fatMass,
        leanMass,
        category
      });
    } catch {
      setError('Wystąpił błąd podczas obliczania. Sprawdź wprowadzone dane.');
      setResults(null);
    }
  };

  const getCategory = (bf: number, gender: string): string => {
    if (gender === 'male') {
      if (bf < 6) return 'Zasadnicze minimum';
      if (bf < 14) return 'Atletyczna';
      if (bf < 18) return 'Fitness';
      if (bf < 25) return 'Przeciętna';
      return 'Wysoka';
    } else {
      if (bf < 14) return 'Zasadnicze minimum';
      if (bf < 21) return 'Atletyczna';
      if (bf < 25) return 'Fitness';
      if (bf < 32) return 'Przeciętna';
      return 'Wysoka';
    }
  };

  return (
    <div className={styles.calculator}>
      <div className={styles.calculatorHeader}>
        <Scale className={styles.icon} />
        <h2>Kalkulator Tkanki Tłuszczowej</h2>
        <p>Oblicz swój poziom tkanki tłuszczowej metodą US Navy</p>
      </div>

      <div className={styles.form}>
        <div className={styles.inputGroup}>
          <label>Płeć</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleInputChange}
              />
              Mężczyzna
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleInputChange}
              />
              Kobieta
            </label>
          </div>
        </div>

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

          <div className={styles.inputGroup}>
            <label>Obwód szyi (cm)</label>
            <input
              type="number"
              name="neck"
              value={formData.neck}
              onChange={handleInputChange}
              placeholder="Np. 35"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Obwód pasa (cm)</label>
            <input
              type="number"
              name="waist"
              value={formData.waist}
              onChange={handleInputChange}
              placeholder="Np. 85"
            />
          </div>

          {formData.gender === 'female' && (
            <div className={styles.inputGroup}>
              <label>Obwód bioder (cm)</label>
              <input
                type="number"
                name="hip"
                value={formData.hip}
                onChange={handleInputChange}
                placeholder="Np. 97"
              />
            </div>
          )}
        </div>

        <button onClick={calculateBodyFat} className={styles.calculateButton}>
          Oblicz
          <Scale className={styles.buttonIcon} />
        </button>

        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}
      </div>

      {results && results.bodyFatPercentage >= 0 && (
        <div className={styles.results}>
          <div className={styles.resultCard}>
            <div className={styles.resultHeader}>
              <h3>Twoje wyniki</h3>
            </div>

            <div className={styles.mainResult}>
              <div 
                className={styles.percentageCircle}
                style={{ 
                  background: getColorByPercentage(results.bodyFatPercentage, formData.gender)
                }}
              >
                <span className={styles.mainValue}>{results.bodyFatPercentage}%</span>
                <span className={styles.mainLabel}>tkanka tłuszczowa</span>
              </div>
              <div 
                className={styles.categoryBadge}
                style={{ 
                  borderColor: getColorByPercentage(results.bodyFatPercentage, formData.gender),
                  color: getColorByPercentage(results.bodyFatPercentage, formData.gender)
                }}
              >
                {results.category}
              </div>
            </div>

            <div className={styles.detailsGrid}>
              <div className={styles.detailCard}>
                <span className={styles.detailValue}>{results.fatMass} kg</span>
                <span className={styles.detailLabel}>Tkanka tłuszczowa</span>
              </div>
              <div className={styles.detailCard}>
                <span className={styles.detailValue}>{results.leanMass} kg</span>
                <span className={styles.detailLabel}>Masa beztłuszczowa</span>
              </div>
            </div>

            <div className={styles.referenceTable}>
              <h4>Zalecane poziomy tkanki tłuszczowej</h4>
              <div className={styles.tableGrid}>
                <div className={styles.tableRow}>
                  <span>Zasadnicze minimum</span>
                  <span>M: 3-6% | K: 12-14%</span>
                </div>
                <div className={styles.tableRow}>
                  <span>Atletyczna</span>
                  <span>M: 6-14% | K: 14-21%</span>
                </div>
                <div className={styles.tableRow}>
                  <span>Fitness</span>
                  <span>M: 14-18% | K: 21-25%</span>
                </div>
                <div className={styles.tableRow}>
                  <span>Przeciętna</span>
                  <span>M: 18-25% | K: 25-32%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BodyFat;