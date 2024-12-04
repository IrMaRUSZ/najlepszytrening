'use client';

import React, { useState } from 'react';
import {Calculator } from 'lucide-react';
import styles from '../../styles/Calculators.module.css';

interface DietResults {
  bmr: number;
  maintenance: number;
  goals: {
    reduction: { calories: number; macros: MacroSplit };
    maintain: { calories: number; macros: MacroSplit };
    build: { calories: number; macros: MacroSplit };
  };
}

interface MacroSplit {
  protein: number;
  carbs: number;
  fats: number;
}

const Diet = () => {
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    age: '',
    gender: 'male',
    activity: 'moderate',
    goal: 'maintain',
    proteinPreference: 'moderate' // nowa opcja
  });

  const [results, setResults] = useState<DietResults | null>(null);

  const activityLevels = {
    sedentary: { label: 'Siedzący (brak ćwiczeń)', multiplier: 1.2 },
    light: { label: 'Lekko aktywny (1-2 treningi/tydzień)', multiplier: 1.375 },
    moderate: { label: 'Umiarkowanie aktywny (3-4 treningi/tydzień)', multiplier: 1.55 },
    active: { label: 'Bardzo aktywny (5-6 treningów/tydzień)', multiplier: 1.725 },
    athletic: { label: 'Profesjonalny sportowiec', multiplier: 1.9 }
  };

  const proteinMultipliers = {
    low: { label: 'Standardowe (1.6g/kg)', value: 1.6 },
    moderate: { label: 'Podwyższone (2g/kg)', value: 2 },
    high: { label: 'Wysokie (2.2g/kg)', value: 2.2 }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateMacros = (calories: number): MacroSplit => {
    const weight = parseFloat(formData.weight);
    const proteinMultiplier = proteinMultipliers[formData.proteinPreference as keyof typeof proteinMultipliers].value;
    
    const protein = Math.round(weight * proteinMultiplier);
    const fats = Math.round((calories * 0.25) / 9); // 25% kalorii z tłuszczów
    const carbs = Math.round((calories - (protein * 4) - (fats * 9)) / 4);

    return { protein, carbs, fats };
  };

  const calculate = () => {
    const { weight, height, age, gender, activity } = formData;
    
    if (!weight || !height || !age) return;

    // BMR (Mifflin-St Jeor)
    const bmr = gender === 'male' ?
      (10 * parseFloat(weight)) + (6.25 * parseFloat(height)) - (5 * parseFloat(age)) + 5
      : (10 * parseFloat(weight)) + (6.25 * parseFloat(height)) - (5 * parseFloat(age)) - 161;

    const maintenance = Math.round(bmr * activityLevels[activity as keyof typeof activityLevels].multiplier);

    const results: DietResults = {
      bmr: Math.round(bmr),
      maintenance,
      goals: {
        reduction: {
          calories: Math.round(maintenance * 0.8), // 20% deficyt
          macros: calculateMacros(Math.round(maintenance * 0.8))
        },
        maintain: {
          calories: maintenance,
          macros: calculateMacros(maintenance)
        },
        build: {
          calories: Math.round(maintenance * 1.1), // 10% nadwyżka
          macros: calculateMacros(Math.round(maintenance * 1.1))
        }
      }
    };

    setResults(results);
  };

  return (  
    <div className={styles.calculator}>
      <div className={styles.calculatorHeader}>
        <Calculator className={styles.icon} />
        <h2>Kalkulator zapotrzebowania kalorycznego</h2>
        <p>Oblicz swoje zapotrzebowanie kaloryczne i makroskładniki</p>
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

          <div className={styles.inputGroup}>
            <label>Wiek</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="Np. 25"
            />
          </div>
        </div>

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

        <div className={styles.inputGroup}>
          <label>Poziom aktywności</label>
          <select
            name="activity"
            value={formData.activity}
            onChange={handleInputChange}
          >
            {Object.entries(activityLevels).map(([key, { label }]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label>Preferencja białka</label>
          <select
            name="proteinPreference"
            value={formData.proteinPreference}
            onChange={handleInputChange}
          >
            {Object.entries(proteinMultipliers).map(([key, { label }]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        <button onClick={calculate} className={styles.calculateButton}>
          Oblicz
          <Calculator className={styles.buttonIcon} />
        </button>
      </div>

      {results && (
        <div className={styles.results}>
          <div className={styles.resultCard}>
            <div className={styles.resultHeader}>
              <h3>Twoje zapotrzebowanie kaloryczne</h3>
              <div className={styles.bmrInfo}>
                <span>BMR (Podstawowa przemiana materii)</span>
                <span className={styles.bmrValue}>{results.bmr} kcal</span>
              </div>
            </div>

            <div className={styles.goalsGrid}>
              <div className={styles.goalCard}>
                <h4>Redukcja</h4>
                <span className={styles.goalCalories}>{results.goals.reduction.calories} kcal</span>
                <div className={styles.macrosList}>
                  <div className={styles.macro}>
                    <span>Białko: {results.goals.reduction.macros.protein}g</span>
                    <div 
                      className={styles.macroBar} 
                      style={{
                        width: '100%',
                        backgroundColor: '#FF6B6B'
                      }}
                    />
                  </div>
                  <div className={styles.macro}>
                    <span>Węgle: {results.goals.reduction.macros.carbs}g</span>
                    <div 
                      className={styles.macroBar} 
                      style={{
                        width: `${(results.goals.reduction.macros.carbs / results.goals.reduction.macros.protein) * 100}%`,
                        backgroundColor: '#4ECDC4'
                      }}
                    />
                  </div>
                  <div className={styles.macro}>
                    <span>Tłuszcze: {results.goals.reduction.macros.fats}g</span>
                    <div 
                      className={styles.macroBar} 
                      style={{
                        width: `${(results.goals.reduction.macros.fats / results.goals.reduction.macros.protein) * 100}%`,
                        backgroundColor: '#FFE66D'
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className={`${styles.goalCard} ${styles.maintenanceCard}`}>
                <h4>Utrzymanie</h4>
                <span className={styles.goalCalories}>{results.goals.maintain.calories} kcal</span>
                <div className={styles.macrosList}>
                  <div className={styles.macro}>
                    <span>Białko: {results.goals.maintain.macros.protein}g</span>
                    <div 
                      className={styles.macroBar} 
                      style={{
                        width: '100%',
                        backgroundColor: '#FF6B6B'
                      }}
                    />
                  </div>
                  <div className={styles.macro}>
                    <span>Węgle: {results.goals.maintain.macros.carbs}g</span>
                    <div 
                      className={styles.macroBar} 
                      style={{
                        width: `${(results.goals.maintain.macros.carbs / results.goals.maintain.macros.protein) * 100}%`,
                        backgroundColor: '#4ECDC4'
                      }}
                    />
                  </div>
                  <div className={styles.macro}>
                    <span>Tłuszcze: {results.goals.maintain.macros.fats}g</span>
                    <div 
                      className={styles.macroBar} 
                      style={{
                        width: `${(results.goals.maintain.macros.fats / results.goals.maintain.macros.protein) * 100}%`,
                        backgroundColor: '#FFE66D'
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.goalCard}>
                <h4>Masa</h4>
                <span className={styles.goalCalories}>{results.goals.build.calories} kcal</span>
                <div className={styles.macrosList}>
                  <div className={styles.macro}>
                    <span>Białko: {results.goals.build.macros.protein}g</span>
                    <div 
                      className={styles.macroBar} 
                      style={{
                        width: '100%',
                        backgroundColor: '#FF6B6B'
                      }}
                    />
                  </div>
                  <div className={styles.macro}>
                    <span>Węgle: {results.goals.build.macros.carbs}g</span>
                    <div 
                      className={styles.macroBar} 
                      style={{
                        width: `${(results.goals.build.macros.carbs / results.goals.build.macros.protein) * 100}%`,
                        backgroundColor: '#4ECDC4'
                      }}
                    />
                  </div>
                  <div className={styles.macro}>
                    <span>Tłuszcze: {results.goals.build.macros.fats}g</span>
                    <div 
                      className={styles.macroBar} 
                      style={{
                        width: `${(results.goals.build.macros.fats / results.goals.build.macros.protein) * 100}%`,
                        backgroundColor: '#FFE66D'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Diet;