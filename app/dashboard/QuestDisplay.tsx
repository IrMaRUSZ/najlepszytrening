// Plik: app/dashboard/QuestDisplay.tsx
'use client';

import styles from '../../styles/Dashboard.module.css';

interface QuestData {
  quest_type: string;
  target_value: number;
  points_reward: number;
  is_completed: boolean;
  current_progress: number;
}

interface QuestDisplayProps {
  quest: QuestData | null | undefined;
}

const QUEST_DESCRIPTIONS: { [key: string]: (target: number) => string } = {
  SUM_STEPS: (target) => `Zrób ${new Intl.NumberFormat('pl-PL').format(target)} kroków w tym tygodniu`,
  SUM_KM: (target) => `Przebiegnij ${target} km w tym tygodniu`,
  COUNT_TRAININGS: (target) => `Wykonaj ${target} treningów w tym tygodniu`,
};

export default function QuestDisplay({ quest }: QuestDisplayProps) {
  if (!quest) {
    return (
        <div className={`${styles.questContainer} ${styles.empty}`}>
            <h3>Zadanie Tygodniowe</h3>
            <p>Brak aktywnego zadania na ten tydzień.</p>
        </div>
    );
  }

  const { is_completed, points_reward, quest_type, target_value, current_progress } = quest;

  if (is_completed) {
    return (
      <div className={`${styles.questContainer} ${styles.completed}`}>
        <h3>Zadanie Tygodniowe Ukończone!</h3>
        <p>Gratulacje! Zdobyłeś/aś dodatkowe {points_reward} punktów!</p>
      </div>
    );
  }

  const description = QUEST_DESCRIPTIONS[quest_type]?.(target_value) || 'Nieznane zadanie';
  const progressPercentage = Math.min((current_progress / target_value) * 100, 100);

  return (
    <div className={styles.questContainer}>
      <h3>Twoje Zadanie Tygodniowe</h3>
      <p className={styles.questDescription}>{description}</p>
      <div className={styles.progressContainer}>
        <div className={styles.progressBar} style={{ width: `${progressPercentage}%` }}></div>
      </div>
      <div className={styles.progressDetails}>
        <span>Postęp: {new Intl.NumberFormat('pl-PL').format(current_progress)} / {new Intl.NumberFormat('pl-PL').format(target_value)}</span>
        <span className={styles.questReward}>Nagroda: {points_reward} pkt</span>
      </div>
    </div>
  );
}