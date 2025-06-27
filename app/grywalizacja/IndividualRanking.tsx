'use client';

import styles from '../../styles/Grywalizacja.module.css';
import { ProfileForRanking } from '../../types'; // <-- DODAJ TEN IMPORT

interface IndividualRankingProps {
  profiles: ProfileForRanking[];
}

const getRankClass = (rank: string) => {
  switch (rank.toUpperCase()) {
    case 'ELITA':
      return styles.rankElita;
    case 'GRACZ':
      return styles.rankGracz;
    default:
      return styles.rankUczestnik;
  }
};

export default function IndividualRanking({ profiles }: IndividualRankingProps) {
  return (
    <div className={styles.rankingContainer}>
      <h2 className={styles.rankingTitle}>Ranking Indywidualny</h2>
      <table className={styles.rankingTable}>
        <thead>
          <tr>
            <th>#</th>
            <th>Uczestnik</th>
            <th>Punkty</th>
            <th>Ranga</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile, index) => (
            <tr key={profile.id}>
              <td>{index + 1}</td>
              <td>{profile.username}</td>
              <td>{profile.total_points}</td>
              <td>
                <span className={`${styles.rankBadge} ${getRankClass(profile.rank)}`}>
                  {profile.rank}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}