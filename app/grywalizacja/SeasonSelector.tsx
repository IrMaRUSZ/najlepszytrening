// Plik: app/grywalizacja/SeasonSelector.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import styles from '../../styles/Grywalizacja.module.css';

interface Season {
  id: number;
  name: string;
}

interface SeasonSelectorProps {
  activeSeason: Season | null;
  completedSeasons: Season[];
}

export default function SeasonSelector({ activeSeason, completedSeasons }: SeasonSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSeasonId = searchParams.get('season');

  const handleSeasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const seasonId = event.target.value;
    if (seasonId === 'current' || !seasonId) {
      router.push('/grywalizacja');
    } else {
      router.push(`/grywalizacja?season=${seasonId}`);
    }
  };

  const selectedValue = currentSeasonId || 'current';

  return (
    <div className={styles.rankingContainer} style={{ marginBottom: '2rem', padding: '1rem 1.5rem' }}>
      <label htmlFor="season-select" style={{ marginRight: '1rem', fontWeight: '500' }}>Wybierz sezon:</label>
      <select 
        id="season-select" 
        onChange={handleSeasonChange} 
        value={selectedValue}
        style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--background-light)', color: 'var(--text)' }}
      >
        {activeSeason && <option value="current">Bieżący ({activeSeason.name})</option>}
        {completedSeasons.map(season => (
          <option key={season.id} value={season.id}>
            {season.name} (Zakończony)
          </option>
        ))}
      </select>
    </div>
  );
}