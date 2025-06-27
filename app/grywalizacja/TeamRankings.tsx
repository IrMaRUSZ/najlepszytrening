'use client';

import styles from '../../styles/Grywalizacja.module.css';
import { ProfileForRanking } from '../../types'; // <-- DODAJ TEN IMPORT

interface TeamRankingsProps {
  teams: Map<string, { members: ProfileForRanking[], average: number }>;
}

export default function TeamRankings({ teams }: TeamRankingsProps) {
  const sortedTeams = Array.from(teams.entries()).sort((a, b) => b[1].average - a[1].average);

  return (
    <div className={styles.teamsGrid}>
      {sortedTeams.map(([teamName, teamData]) => (
        <div key={teamName} className={styles.teamCard}>
          <h3 className={styles.teamName}>{teamName}</h3>
          <p className={styles.teamAverage}>{teamData.average.toFixed(1)} pkt (średnio)</p>
          <ul className={styles.memberList}>
            {teamData.members.map(member => (
              <li key={member.id}>
                <span>{member.username}</span>
                <span className={styles.memberPoints}>{new Intl.NumberFormat('pl-PL').format(member.total_points)} pkt</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}