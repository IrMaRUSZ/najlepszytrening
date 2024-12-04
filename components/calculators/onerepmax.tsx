'use client';

import React, { useState } from 'react';
import { Dumbbell } from 'lucide-react';
import styles from '../../styles/Calculators.module.css';

// Typy i interfejsy
type ExerciseName = 'Wyciskanie sztangi na ławce' | 'Przysiad ze sztangą' | 'Martwy ciąg';
type Gender = 'male' | 'female';

interface FormData {
  exercise: ExerciseName | '';
  weight: string;
  reps: string;
  gender: Gender;
  bodyweight: string;
}

interface StrengthLevel {
  level: string;
  ratio: string;
  nextLevel: {
    name: string;
    target: number;
  } | null;
  color: string;
}

interface Results {
  maxWeight: number;
  percentages: { [key: number]: number };
  strengthLevel: StrengthLevel | null;
}

// Standardy i stałe
const strengthStandards = {
  'Wyciskanie sztangi na ławce': {
    male: {
      beginner: { min: 0, max: 0.5 },
      novice: { min: 0.5, max: 0.8 },
      intermediate: { min: 0.8, max: 1.2 },
      advanced: { min: 1.2, max: 1.6 },
      elite: { min: 1.6, max: 2.0 }
    },
    female: {
      beginner: { min: 0, max: 0.3 },
      novice: { min: 0.3, max: 0.5 },
      intermediate: { min: 0.5, max: 0.8 },
      advanced: { min: 0.8, max: 1.1 },
      elite: { min: 1.1, max: 1.4 }
    }
  },
  'Przysiad ze sztangą': {
    male: {
      beginner: { min: 0, max: 0.8 },
      novice: { min: 0.8, max: 1.2 },
      intermediate: { min: 1.2, max: 1.6 },
      advanced: { min: 1.6, max: 2.1 },
      elite: { min: 2.1, max: 2.8 }
    },
    female: {
      beginner: { min: 0, max: 0.6 },
      novice: { min: 0.6, max: 0.9 },
      intermediate: { min: 0.9, max: 1.2 },
      advanced: { min: 1.2, max: 1.6 },
      elite: { min: 1.6, max: 2.0 }
    }
  },
  'Martwy ciąg': {
    male: {
      beginner: { min: 0, max: 1.0 },
      novice: { min: 1.0, max: 1.5 },
      intermediate: { min: 1.5, max: 2.0 },
      advanced: { min: 2.0, max: 2.5 },
      elite: { min: 2.5, max: 3.0 }
    },
    female: {
      beginner: { min: 0, max: 0.8 },
      novice: { min: 0.8, max: 1.2 },
      intermediate: { min: 1.2, max: 1.6 },
      advanced: { min: 1.6, max: 2.0 },
      elite: { min: 2.0, max: 2.4 }
    }
  }
} as const;

const levelColors = {
  'Początkujący': '#FF6B6B',
  'Nowicjusz': '#4ECDC4',
  'Średniozaawansowany': '#45B7D1',
  'Zaawansowany': '#96C93D',
  'Elite': '#FFD93D'
} as const;

// Komponent
const OneRepMax = () => {
  const [formData, setFormData] = useState<FormData>({
    exercise: '',
    weight: '',
    reps: '',
    gender: 'male',
    bodyweight: ''
  });

  const [results, setResults] = useState<Results | null>(null);

  const handleExerciseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as '' | ExerciseName;
    setFormData({ ...formData, exercise: value });
  };

  const getStrengthLevel = (exercise: ExerciseName, gender: Gender, bodyweight: number, oneRepMax: number): StrengthLevel | null => {
    const standards = strengthStandards[exercise][gender];
    const ratio = oneRepMax / bodyweight;

    if (ratio <= standards.beginner.max) {
      return {
        level: 'Początkujący',
        ratio: ratio.toFixed(2),
        nextLevel: {
          name: 'Nowicjusz',
          target: Math.ceil(standards.novice.min * bodyweight)
        },
        color: levelColors['Początkujący']
      };
    } else if (ratio <= standards.novice.max) {
      return {
        level: 'Nowicjusz',
        ratio: ratio.toFixed(2),
        nextLevel: {
          name: 'Średniozaawansowany',
          target: Math.ceil(standards.intermediate.min * bodyweight)
        },
        color: levelColors['Nowicjusz']
      };
    } else if (ratio <= standards.intermediate.max) {
      return {
        level: 'Średniozaawansowany',
        ratio: ratio.toFixed(2),
        nextLevel: {
          name: 'Zaawansowany',
          target: Math.ceil(standards.advanced.min * bodyweight)
        },
        color: levelColors['Średniozaawansowany']
      };
    } else if (ratio <= standards.advanced.max) {
      return {
        level: 'Zaawansowany',
        ratio: ratio.toFixed(2),
        nextLevel: {
          name: 'Elite',
          target: Math.ceil(standards.elite.min * bodyweight)
        },
        color: levelColors['Zaawansowany']
      };
    }
    return {
      level: 'Elite',
      ratio: ratio.toFixed(2),
      nextLevel: null,
      color: levelColors['Elite']
    };
  };

  const calculateOneRepMax = () => {
    const weightNum = parseFloat(formData.weight);
    const repsNum = parseFloat(formData.reps);
    const bodyweightNum = parseFloat(formData.bodyweight);
    
    if (!weightNum || !repsNum || !bodyweightNum || !formData.exercise) return;

    // Formuła Brzycki
    const maxWeight = Math.round(weightNum / (1.0278 - 0.0278 * repsNum));
    
    // Obliczanie procentów dla różnych zakresów powtórzeń
    const percentages: { [key: number]: number } = {};
    [1, 2, 3, 5, 8, 10, 12, 15].forEach(rep => {
      percentages[rep] = Math.round(maxWeight * (1.0278 - 0.0278 * rep));
    });

    const strengthLevel = getStrengthLevel(formData.exercise, formData.gender, bodyweightNum, maxWeight);
    setResults({ maxWeight, percentages, strengthLevel });
  };

  return (
    <div className={styles.calculator}>
      <div className={styles.calculatorHeader}>
        <Dumbbell className={styles.icon} />
        <h2>Kalkulator 1RM (One Rep Max)</h2>
        <p>Oblicz swój maksymalny ciężar na jedno powtórzenie</p>
      </div>

      <div className={styles.form}>
        <div className={styles.formGrid}>
          <div className={styles.inputGroup}>
            <label>Ćwiczenie</label>
            <select
              value={formData.exercise}
              onChange={handleExerciseChange}
              className={styles.select}
            >
              <option value="">Wybierz ćwiczenie</option>
              <option value="Wyciskanie sztangi na ławce">Wyciskanie sztangi na ławce</option>
              <option value="Przysiad ze sztangą">Przysiad ze sztangą</option>
              <option value="Martwy ciąg">Martwy ciąg</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>Płeć</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value as Gender })}
            >
              <option value="male">Mężczyzna</option>
              <option value="female">Kobieta</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>Waga ciała (kg)</label>
            <input
              type="number"
              value={formData.bodyweight}
              onChange={(e) => setFormData({ ...formData, bodyweight: e.target.value })}
              placeholder="Np. 80"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Ciężar (kg)</label>
            <input
              type="number"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              placeholder="Np. 100"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Ilość powtórzeń</label>
            <input
              type="number"
              value={formData.reps}
              onChange={(e) => setFormData({ ...formData, reps: e.target.value })}
              placeholder="Np. 8"
            />
          </div>
        </div>

        <button onClick={calculateOneRepMax} className={styles.calculateButton}>
          Oblicz 1RM
          <Dumbbell className={styles.buttonIcon} />
        </button>
      </div>

      {results && (
        <div className={styles.results}>
          <div className={styles.resultCard}>
            <div className={styles.resultHeader}>
              <h3>Twój maksymalny ciężar (1RM)</h3>
              <p className={styles.maxWeight}>{results.maxWeight} kg</p>
            </div>

            {results.strengthLevel && (
              <div className={styles.strengthSection}>
                <h4>Poziom zaawansowania:</h4>
                <div 
                  className={styles.levelCard}
                  style={{ borderColor: results.strengthLevel.color }}
                >
                  <span 
                    className={styles.levelBadge}
                    style={{ backgroundColor: results.strengthLevel.color }}
                  >
                    {results.strengthLevel.level}
                  </span>
                  <span className={styles.levelRatio}>
                    {results.strengthLevel.ratio}x wagi ciała
                  </span>
                  {results.strengthLevel.nextLevel && (
                    <div className={styles.nextLevel}>
                      <span>Do następnego poziomu ({results.strengthLevel.nextLevel.name}):</span>
                      <strong>{results.strengthLevel.nextLevel.target} kg</strong>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className={styles.percentageTable}>
              <div className={styles.tableHeader}>
                <span>Powtórzenia</span>
                <span>Ciężar (kg)</span>
                <span>% 1RM</span>
              </div>
              {Object.entries(results.percentages).map(([reps, weight]) => (
                <div key={reps} className={styles.tableRow}>
                  <span>{reps}</span>
                  <span>{weight}</span>
                  <span>{Math.round((weight / results.maxWeight) * 100)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OneRepMax;