// Plik: app/dashboard/BadgesDisplay.tsx
'use client';

// ✅ ZMIANA: Dodano brakujący import komponentu Image
import Image from 'next/image'; 
import styles from '../../styles/Dashboard.module.css';

// Interfejs pozostaje bez zmian
export interface Badge {
  id: number;
  name: string;
  description: string;
  image_url: string | null;
}

interface BadgesDisplayProps {
  badges: Badge[];
}

export default function BadgesDisplay({ badges }: BadgesDisplayProps) {
  if (!badges || badges.length === 0) {
    return null;
  }

  return (
    <div className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>Twoje Osiągnięcia</h2>
      <div className={styles.badgesGrid}>
        {badges.map(badge => (
          <div key={badge.id} className={styles.badgeCard} title={badge.description}>
            <div className={styles.badgeIcon}>
              {badge.image_url ? (
                // ✅ ZMIANA: Dodano wymagane atrybuty width i height.
                // Możesz dostosować te wartości, jeśli Twoje ikonki mają inny rozmiar.
                <Image src={badge.image_url} alt={badge.name} width={40} height={40} />
              ) : (
                <span className={styles.badgeEmoji}>🏅</span>
              )}
            </div>
            <span className={styles.badgeName}>{badge.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}