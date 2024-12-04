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
    hip: '', // tylko dla kobiet
  });

  const [results, setResults] = useState<BodyFatResults | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateBodyFat = () => {
    const { gender, weight, waist, neck, height, hip } = formData;
    
    if (!weight || !waist || !neck || !height || (gender === 'female' && !hip)) return;

    let bodyFatPercentage: number;
    
    if (gender === 'male') {
      // Formuła US Navy dla mężczyzn
      bodyFatPercentage = 495 / (1.0324 - 0.19077 * Math.log10(parseFloat(waist) - parseFloat(neck)) + 0.15456 * Math.log10(parseFloat(height))) - 450;
    } else {
      // Formuła US Navy dla kobiet
      bodyFatPercentage = 495 / (1.29579 - 0.35004 * Math.log10(parseFloat(waist) + parseFloat(hip) - parseFloat(neck)) + 0.22100 * Math.log10(parseFloat(height))) - 450;
    }

    const weightNum = parseFloat(weight);
    const fatMass = (weightNum * bodyFatPercentage) / 100;
    const leanMass = weightNum - fatMass;

    // Określenie kategorii
    const category = getCategory(bodyFatPercentage, gender);

    setResults({
      bodyFatPercentage: Math.round(bodyFatPercentage * 10) / 10,
      fatMass: Math.round(fatMass * 10) / 10,
      leanMass: Math.round(leanMass * 10) / 10,
      category
    });
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
      </div>

      {results && (
        <div className={styles.results}>
          <div className={styles.resultCard}>
            <div className={styles.resultHeader}>
              <h3>Twoje wyniki</h3>
              <div className={styles.bfResult}>
                <span className={styles.bfPercentage}>{results.bodyFatPercentage}%</span>
                <span className={styles.bfCategory}>{results.category}</span>
              </div>
            </div>

            <div className={styles.bfDetails}>
              <div className={styles.bfDetail}>
                <label>Tkanka tłuszczowa </label>
                <span>{results.fatMass} kg</span>
              </div>
              <div className={styles.bfDetail}>
                <label>Masa beztłuszczowa </label>
                <span>{results.leanMass} kg</span>
              </div>
            </div>

            <div className={styles.bfInfo}>
              <h4>Zalecane poziomy tkanki tłuszczowej:</h4>
              <ul>
                <li>Zasadnicze minimum: M: 3-6% | K: 12-14%</li>
                <li>Atletyczna: M: 6-14% | K: 14-21%</li>
                <li>Fitness: M: 14-18% | K: 21-25%</li>
                <li>Przeciętna: M: 18-25% | K: 25-32%</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BodyFat;
