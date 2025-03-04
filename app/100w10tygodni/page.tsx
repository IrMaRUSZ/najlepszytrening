'use client';

import React, { useState } from 'react';
import styles from '../../styles/100w10tygodni.module.css';



export async function generateMetadata() {
  return {
    title: "Darmowy Plan Treningowy Pod Wyciskanie Leżąc | Najlepszy Trening Łódź",
    description: "Pobierz darmowy, profesjonalny plan treningowy skupiający się na rozwoju siły w wyciskaniu leżąc. Opracowany przez doświadczonego trenera personalnego z Łodzi.",
    keywords: "wyciskanie leżąc, darmowy plan treningowy, trening klatki piersiowej, zwiększenie siły w ławce, trener personalny łódź",
    openGraph: {
      title: "Darmowy Plan Treningowy Pod Wyciskanie Leżąc | Najlepszy Trening Łódź",
      description: "Pobierz darmowy, profesjonalny plan treningowy skupiający się na rozwoju siły w wyciskaniu leżąc. Opracowany przez doświadczonego trenera personalnego z Łodzi.",
      url: "https://www.najlepszytrening.pl/100w10tygodni",
      type: "website",
      images: [
        {
          url: "/images/100.webp",
          width: 1200,
          height: 630,
          alt: "Darmowy plan treningowy na wyciskanie leżąc - Najlepszy Trening Łódź"
        }
      ]
    }
  }
}
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
  
  const getPercentageForReps = (reps: number): number => {
    // Bazując na tabeli z obrazka
    if (reps <= 1) return 1.00;     // 100%
    if (reps <= 2) return 0.95;     // 95%
    if (reps <= 4) return 0.90;     // 90%
    if (reps <= 6) return 0.85;     // 85%
    if (reps <= 8) return 0.80;     // 80%
    if (reps <= 10) return 0.75;    // 75%
    if (reps <= 12) return 0.70;    // 70%
    if (reps <= 16) return 0.65;    // 65%
    if (reps <= 20) return 0.60;    // 60%
    if (reps <= 24) return 0.55;    // 55%
    return 0.50;                    // 50%
  };
  
  const calculateWeight = (oneRM: number, targetReps: number): number => {
    const percentage = getPercentageForReps(targetReps);
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
            weight: calculateWeight(baseWeight, 11),
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
            weight: calculateWeight(baseWeight, 7),
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