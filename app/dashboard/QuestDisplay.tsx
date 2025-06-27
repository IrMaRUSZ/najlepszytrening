// Plik: app/dashboard/QuestDisplay.tsx
'use client';

import styles from '../../styles/Dashboard.module.css';

interface QuestDisplayProps {
  questType: string | null;
  targetValue: number | null;
  pointsReward: number | null;
  isCompleted: boolean | null;
  currentProgress: number;
}

const QUEST_DESCRIPTIONS: { [key: string]: (target: number) => string } = {
  SUM_STEPS: (target) => `Zrób ${new Intl.NumberFormat('pl-PL').format(target)} kroków w tym tygodniu`,
  SUM_KM: (target) => `Przebiegnij ${target} km w tym tygodniu`,
  COUNT_TRAININGS: (target) => `Wykonaj ${target} treningów w tym tygodniu`,
};

export default function QuestDisplay({
  questType,
  targetValue,
  pointsReward,
  isCompleted,
  currentProgress,
}: QuestDisplayProps) {
  
  // Jeśli nie ma aktywnego zadania, nic nie wyświetlamy
  if (!questType || !targetValue || !pointsReward) {
    return null;
  }

  // Jeśli zadanie jest ukończone, wyświetlamy gratulacje
  if (isCompleted) {
    return (
      <div className={`${styles.questContainer} ${styles.completed}`}>
        <h3>Zadanie Tygodniowe Ukończone!</h3>
        <p>Gratulacje! Zdobyłeś/aś dodatkowe {pointsReward} punktów!</p>
      </div>
    );
  }

  const description = QUEST_DESCRIPTIONS[questType]?.(targetValue) || 'Nieznane zadanie';
  const progressPercentage = Math.min((currentProgress / targetValue) * 100, 100);

  return (
    <div className={styles.questContainer}>
      <h3>Twoje Zadanie Tygodniowe</h3>
      <p className={styles.questDescription}>{description}</p>
      
      <div className={styles.progressContainer}>
        <div className={styles.progressBar} style={{ width: `${progressPercentage}%` }}></div>
      </div>

      <div className={styles.progressDetails}>
        <span>Postęp: {new Intl.NumberFormat('pl-PL').format(currentProgress)} / {new Intl.NumberFormat('pl-PL').format(targetValue)}</span>
        <span className={styles.questReward}>Nagroda: {pointsReward} pkt</span>
      </div>
    </div>
  );
}