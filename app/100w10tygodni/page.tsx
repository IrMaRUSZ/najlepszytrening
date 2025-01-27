'use client';

import React, { useState } from 'react';
import styles from '../../styles/100w10tygodni.module.css';

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  weight?: number;
  rir?: number;
  tempo?: string;
  isAmrap?: boolean;
}

interface Workout {
  day: number;
  type: 'A' | 'B';
  exercises: Exercise[];
}

interface Week {
  weekNumber: number;
  isDeload: boolean;
  workouts: Workout[];
}

const roundToPlateWeight = (targetWeight: number): number => {
  const barWeight = 20;
  if (targetWeight <= barWeight) return barWeight;
  
  const availablePlates = [20, 10, 5, 2.5, 1.25];
  let remainingWeight = (targetWeight - barWeight) / 2;
  let actualPlateWeight = 0;

  for (const plate of availablePlates) {
    while (remainingWeight >= plate) {
      actualPlateWeight += plate;
      remainingWeight -= plate;
    }
  }

  return barWeight + (actualPlateWeight * 2);
};

const calculateWeight = (oneRM: number, targetReps: number): number => {
  const percentages: { [key: number]: number } = {
    1: 1.00,
    2: 0.95,
    3: 0.93,
    4: 0.90,
    5: 0.87,
    6: 0.85,
    7: 0.83,
    8: 0.80,
    9: 0.77,
    10: 0.75,
    11: 0.73,
    12: 0.70,
  };

  const percentage = percentages[targetReps] || 0.70;
  const theoreticalWeight = oneRM * percentage;
  return roundToPlateWeight(theoreticalWeight);
};

const getPlateBreakdown = (weight: number): string => {
  const barWeight = 20;
  if (weight <= barWeight) return "Tylko sztanga (20kg)";
  
  const plateWeight = (weight - barWeight) / 2;
  const plates: string[] = [];
  let remaining = plateWeight;
  
  [20, 10, 5, 2.5, 1.25].forEach(plate => {
    const count = Math.floor(remaining / plate);
    if (count > 0) {
      plates.push(`${count}×${plate}kg`);
      remaining -= count * plate;
    }
  });
  
  return `${plates.join(' + ')} na stronę`;
};

export default function TrainingPlan() {
  const [currentMax, setCurrentMax] = useState<string>('');
  const [generatedPlan, setGeneratedPlan] = useState<Week[] | null>(null);

  const generateWeeklyProgression = (startingMax: string): Week[] => {
    const max = parseFloat(startingMax);
    const weeks: Week[] = [];
    
    const getTrainingA = (week: number, isDeload: boolean, progressionValue: number): Exercise[] => {
      const baseWeight = max + progressionValue;
      const sets = isDeload ? "2" : "3";
      const standardRir = isDeload ? 3 : (week === 10 ? 0 : 2);
      
      return [
        {
          name: "Wyciskanie leżąc",
          sets: `${sets}s`,
          reps: "8-10p",
          weight: calculateWeight(baseWeight, 8),
          rir: standardRir,
          tempo: "2:0:1:0"
        },
        {
          name: "Podciąganie TRX",
          sets: `${sets}s`,
          reps: "AMRAP",
          isAmrap: true
        },
        {
          name: "Rozpiętki hantlami",
          sets: `${sets}s`,
          reps: "10-12p",
          rir: standardRir,
          tempo: "2:0:1:0"
        },
        {
          name: "Chest supported row",
          sets: `${sets}s`,
          reps: "8-10p",
          rir: standardRir,
          tempo: "2:0:1:0"
        },
        {
          name: "Uginanie ze sztangą",
          sets: `${sets}s`,
          reps: "10-12p",
          rir: standardRir,
          tempo: "2:0:1:0"
        },
        {
          name: "Deska",
          sets: `${sets}s`,
          reps: "30-60s"
        },
        {
          name: "Spacer farmera",
          sets: "2s",
          reps: "max dystans",
          isAmrap: true
        }
      ];
    };

    const getTrainingB = (week: number, isDeload: boolean, progressionValue: number): Exercise[] => {
      const baseWeight = max + progressionValue;
      const sets = isDeload ? "2" : "3";
      const standardRir = isDeload ? 3 : (week === 10 ? 0 : 2);
      
      return [
        {
          name: "Wyciskanie leżąc",
          sets: `${sets}s`,
          reps: "5p",
          weight: calculateWeight(baseWeight, 5),
          tempo: "2:1:1:1"
        },
        {
          name: "Wiosło w oparciu o ławkę z hantlem",
          sets: `${sets}s`,
          reps: "6-8p",
          rir: standardRir,
          tempo: "2:0:1:0"
        },
        {
          name: "OHP",
          sets: `${sets}s`,
          reps: "6-8p",
          rir: standardRir,
          tempo: "2:0:1:0"
        },
        {
          name: "Pompki",
          sets: `${sets}s`,
          reps: "AMRAP",
          isAmrap: true
        },
        {
          name: "Y raise",
          sets: `${sets}s`,
          reps: "10-12p",
          tempo: "2:1:1:1"
        },
        {
          name: "Skull crusher z hantlem",
          sets: `${sets}s`,
          reps: "10-12p",
          rir: standardRir,
          tempo: "2:0:1:0"
        },
        {
          name: "Martwy robak",
          sets: `${sets}s`,
          reps: "10p na stronę",
          tempo: "2:0:1:0"
        }
      ];
    };

    for (let week = 1; week <= 10; week++) {
      const isDeloadWeek = week === 10;
      const workouts: Workout[] = [];

      for (let session = 1; session <= 2; session++) {
        const baseProgression = week <= 3 ? 1.25 : 2.5;
        const progressionValue = (week - 1) * baseProgression;
        
        workouts.push({
          day: session,
          type: session === 1 ? 'A' : 'B',
          exercises: session === 1 
            ? getTrainingA(week, isDeloadWeek, progressionValue)
            : getTrainingB(week, isDeloadWeek, progressionValue)
        });
      }
      
      weeks.push({
        weekNumber: week,
        isDeload: isDeloadWeek,
        workouts
      });
    }
    
    return weeks;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const plan = generateWeeklyProgression(currentMax);
    setGeneratedPlan(plan);
  };

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          Plan Treningowy
        </h1>
        <p className={styles.subtitle}>
          10-tygodniowy program progresji w wyciskaniu leżąc
        </p>
      </div>

      <div className={styles.inputSection}>
        <form onSubmit={handleSubmit}>
          <label className={styles.inputLabel}>
            Twój obecny max w wyciskaniu (kg):
          </label>
          <input
            type="number"
            value={currentMax}
            onChange={(e) => setCurrentMax(e.target.value)}
            className={styles.input}
            required
            min="20"
            max="150"
            placeholder="Np. 50"
          />
          <button type="submit" className={styles.button}>
            Generuj Plan
          </button>
        </form>
      </div>

      {generatedPlan && (
        <div>
          {generatedPlan.map((week) => (
            <div key={week.weekNumber} className={styles.weekCard}>
              <div className={styles.weekHeader}>
                <h3 className={styles.weekTitle}>
                  Tydzień {week.weekNumber}
                  {week.isDeload && (
                    <span className={styles.deloadBadge}>
                      Deload
                    </span>
                  )}
                </h3>
              </div>
              
              {week.workouts.map((workout) => (
                <div key={workout.day} className={styles.trainingDay}>
                  <h4 className={styles.dayTitle}>
                    Trening {workout.type} (dzień {workout.day})
                  </h4>
                  {workout.exercises.map((exercise, idx) => (
                    <div key={idx} className={styles.exerciseCard}>
                      <div className={styles.exerciseHeader}>
                        <span className={styles.exerciseName}>
                          {exercise.name}
                        </span>
                        <div className={styles.exerciseDetails}>
                          <span className={styles.exerciseParam}>
                            {exercise.sets} {exercise.reps}
                          </span>
                          {exercise.weight && (
                            <span className={styles.exerciseParam}>
                              {exercise.weight}kg
                            </span>
                          )}
                          {!exercise.isAmrap && exercise.rir !== undefined && (
                            <span className={styles.exerciseParam}>
                              RIR: {exercise.rir}
                            </span>
                          )}
                          {exercise.tempo && (
                            <span className={styles.exerciseParam}>
                              {exercise.tempo}
                            </span>
                          )}
                          {exercise.isAmrap && (
                            <span className={styles.exerciseParam}>
                              AMRAP
                            </span>
                          )}
                        </div>
                      </div>
                      {exercise.weight && exercise.weight > 20 && (
                        <div className={styles.plateBreakdown}>
                          {getPlateBreakdown(exercise.weight)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}