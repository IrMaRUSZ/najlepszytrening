'use client';
import React, { useState } from 'react';
import { Trophy, Users, Target, Gift, Medal } from 'lucide-react';
import styles from '../../styles/Grywalizacja.module.css';

interface TeamMember {
  name: string;
  points: number;
  weeklyPoints: number;
}

interface Team {
  name: string;
  members: TeamMember[];
}

interface Teams {
  [key: string]: Team;
}

const GamificationPage = () => {
  // Lista wszystkich uczestników z całkowitymi punktami
  const allParticipants: TeamMember[] = [
    { name: "Kasia W", points: 610, weeklyPoints: 120 },    // 490 + 20 + 100 bonus
    { name: "Ada L", points: 260, weeklyPoints: 120 },      // 140 + 120
    { name: "Noemi W", points: 260, weeklyPoints: 60 },     // 200 + 60
    { name: "Kacper M", points: 245, weeklyPoints: 50 },    // 195 + 50
    { name: "Marek S", points: 240, weeklyPoints: 40 },     // 200 + 40
    { name: "Julia S", points: 215, weeklyPoints: 130 },    // 85 + 30 + 100 bonus
    { name: "Rafał G", points: 185, weeklyPoints: 60 },     // 125 + 60
    { name: "Dawid L", points: 165, weeklyPoints: 40 },     // 125 + 40
    { name: "Trener Ireneusz", points: 140, weeklyPoints: 35 }, // 105 + 35
    { name: "Monika Z", points: 140, weeklyPoints: 0 },     // 40 + 0
    { name: "Michał P", points: 140, weeklyPoints: 100 },   // 40 + 0 + 100 bonus
    { name: "Dominika K", points: 85, weeklyPoints: 30 },   // 55 + 30
    { name: "Przemek F", points: 40, weeklyPoints: 0 }      // 40 + 0
  ].sort((a, b) => b.points - a.points);

  // Podział na drużyny z punktami tygodniowymi
  const teams: Teams = {
    team1: {
      name: "Drużyna Czerwona",
      members: [
        { name: "Ada L", points: 260, weeklyPoints: 120 },
        { name: "Julia S", points: 215, weeklyPoints: 130 },
        { name: "Dominika K", points: 85, weeklyPoints: 30 }
      ]
    },
    team2: {
      name: "Drużyna Niebieska (Zwycięzcy poprzedniego tygodnia)",
      members: [
        { name: "Kasia W", points: 610, weeklyPoints: 120 },
        { name: "Dawid L", points: 165, weeklyPoints: 40 },
        { name: "Przemek F", points: 40, weeklyPoints: 0 }
      ]
    },
    team3: {
      name: "Drużyna Zielona",
      members: [
        { name: "Noemi W", points: 260, weeklyPoints: 60 },
        { name: "Rafał G", points: 185, weeklyPoints: 60 },
        { name: "Monika Z", points: 140, weeklyPoints: 0 },
        { name: "Michał P", points: 140, weeklyPoints: 100 }
      ]
    },
    team4: {
      name: "Drużyna Żółta",
      members: [
        { name: "Kacper M", points: 245, weeklyPoints: 50 },
        { name: "Marek S", points: 240, weeklyPoints: 40 },
        { name: "Trener Ireneusz", points: 140, weeklyPoints: 35 }
      ]
    }
  };

  const [activeTab, setActiveTab] = useState<'teams' | 'individual' | 'rules' | 'prizes'>('teams');

  const calculateTeamPoints = (members: TeamMember[]): { total: string, weekly: string } => {
    const totalPoints = members.reduce((sum, member) => sum + member.points, 0);
    const weeklyPoints = members.reduce((sum, member) => sum + member.weeklyPoints, 0);
    return {
      total: (totalPoints / members.length).toFixed(1),
      weekly: (weeklyPoints / members.length).toFixed(1)
    };
  };

  const getMedalColor = (index: number): string => {
    if (index === 0) return styles.medalGold;
    if (index === 1) return styles.medalSilver;
    if (index === 2) return styles.medalBronze;
    return '';
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Grywalizacja Zimowa 2025</h1>
        
        <div className={styles.tabsContainer}>
          <button 
            onClick={() => setActiveTab('teams')}
            className={`${styles.tab} ${activeTab === 'teams' ? styles.tabActive : styles.tabInactive}`}
          >
            <Users size={20} />
            Drużyny
          </button>
          <button 
            onClick={() => setActiveTab('individual')}
            className={`${styles.tab} ${activeTab === 'individual' ? styles.tabActive : styles.tabInactive}`}
          >
            <Medal size={20} />
            Ranking
          </button>
          <button 
            onClick={() => setActiveTab('rules')}
            className={`${styles.tab} ${activeTab === 'rules' ? styles.tabActive : styles.tabInactive}`}
          >
            <Target size={20} />
            Zasady
          </button>
          <button 
            onClick={() => setActiveTab('prizes')}
            className={`${styles.tab} ${activeTab === 'prizes' ? styles.tabActive : styles.tabInactive}`}
          >
            <Gift size={20} />
            Nagrody
          </button>
        </div>

        {/* Teams View */}
        {activeTab === 'teams' && (
          <div className={styles.teamsGrid}>
            {Object.values(teams).map((team, index) => (
              <div key={index} className={styles.teamCard}>
                <div className={styles.teamHeader}>
                  <h3 className={styles.teamName}>{team.name}</h3>
                  <div className={styles.teamPoints}>
                    <div>Całkowita średnia: {calculateTeamPoints(team.members).total} pkt</div>
                    <div className={styles.weeklyPoints}>
                      Średnia tygodnia: {calculateTeamPoints(team.members).weekly} pkt
                    </div>
                  </div>
                </div>
                <ul className={styles.membersList}>
                  {team.members.map((member, mIndex) => (
                    <li key={mIndex} className={styles.memberItem}>
                      <span className={styles.memberName}>{member.name}</span>
                      <div className={styles.memberPointsContainer}>
                        <div className={styles.memberPoints}>{member.points} pkt</div>
                        <div className={styles.memberWeeklyPoints}>
                          +{member.weeklyPoints} pkt w tym tygodniu
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Individual Ranking View */}
        {activeTab === 'individual' && (
          <div className={styles.contentCard}>
            <h2 className={styles.sectionTitle}>Ranking Indywidualny</h2>
            <div className={styles.tableAnimation}>
              <table className={styles.individualTable}>
                <thead className={styles.tableHeader}>
                  <tr>
                    <th className={styles.tableHeaderCell}>Pozycja</th>
                    <th className={styles.tableHeaderCell}>Uczestnik</th>
                    <th className={styles.tableHeaderCell}>Punkty</th>
                    <th className={styles.tableHeaderCell}>Ten tydzień</th>
                  </tr>
                </thead>
                <tbody>
                  {allParticipants.map((participant, index) => (
                    <tr key={index} className={styles.tableRow}>
                      <td className={styles.tableCell}>
                        {index <= 2 && <Medal className={getMedalColor(index)} size={20} />}
                        {index + 1}
                      </td>
                      <td className={styles.tableCell}>{participant.name}</td>
                      <td className={styles.tableCell}>{participant.points} pkt</td>
                      <td className={styles.tableCell}>+{participant.weeklyPoints} pkt</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Rules View */}
        {activeTab === 'rules' && (
          <div className={styles.contentCard}>
            <h2 className={styles.sectionTitle}>System Punktacji</h2>
            
            <div className={styles.rulesContainer}>
              <div className={styles.ruleSection}>
                <h3 className={styles.ruleSectionTitle}>Punktacja Podstawowa</h3>
                <ul className={styles.ruleList}>
                  <li className={styles.ruleItem}>Uzupełnienie dziennej tabeli: 5 pkt</li>
                  <li className={styles.ruleItem}>Sen 7-9 godzin: 5 pkt</li>
                  <li className={styles.ruleItem}>Utrzymanie dziennej aktywności: 5 pkt za każdą</li>
                  <li className={styles.ruleItem}>Trening: 10 pkt (max 4 treningi/tydzień)</li>
                  <li className={styles.ruleItem}>Każde dodatkowe 5000 kroków: 10 pkt</li>
                  <li className={styles.ruleItem}>Każdy przebiegnięty kilometr: 10 pkt</li>
                </ul>
              </div>
              
              <div className={styles.ruleSection}>
                <h3 className={styles.ruleSectionTitle}>Punktacja Dodatkowa</h3>
                <ul className={styles.ruleList}>
                  <li className={styles.ruleItem}>Realizacja celu tygodniowego: 15 pkt</li>
                  <li className={styles.ruleItem}>Wygranie tygodnia: 50 pkt</li>
                  <li className={styles.ruleItem}>Uzupełnienie tabeli przez cały miesiąc: 40 pkt</li>
                  <li className={styles.ruleItem}>Pobicie rekordu: 30 pkt (wymagane nagranie)</li>
                  <li className={styles.ruleItem}>Post treningowy w social media: 10 pkt</li>
                  <li className={styles.ruleItem}>Kreatywne zdjęcie treningowe: 50 pkt</li>
                  <li className={styles.ruleItem}>Zrealizowanie głównego celu: 150 pkt</li>
                </ul>
              </div>

              <div className={styles.ruleSection}>
                <h3 className={styles.ruleSectionTitle}>Zasady Drużynowe</h3>
                <ul className={styles.ruleList}>
                  <li className={styles.ruleItem}>Lider drużyny po każdym tygodniu trafia do innej drużyny za najsłabszego uczestnika</li>
                  <li className={styles.ruleItem}>Wygrywa drużyna z najlepszym wspólczynnikiem punktów na członka + 300 puntków</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Prizes View */}
        {activeTab === 'prizes' && (
          <div className={styles.contentCard}>
            <h2 className={styles.sectionTitle}>Nagrody</h2>
            <div className={styles.prizesList}>
              <div className={styles.prizeItem}>
                <Trophy className={styles.prizeIcon + ' ' + styles.gold} size={24} />
                <span className={styles.prizeText}>1. Voucher treningowy (800 PLN)</span>
              </div>
              <div className={styles.prizeItem}>
                <Trophy className={styles.prizeIcon + ' ' + styles.silver} size={24} />
                <span className={styles.prizeText}>2. Sprzęt sportowy (200 PLN)</span>
              </div>
              <div className={styles.prizeItem}>
                <Trophy className={styles.prizeIcon + ' ' + styles.bronze} size={24} />
                <span className={styles.prizeText}>3. Niespodzianka</span>
              </div>
              <div className={styles.prizeItem}>
                <Trophy className={styles.prizeIcon + ' ' + styles.other} size={24} />
                <span className={styles.prizeText}>4. 150 punktów do następnego sezonu</span>
              </div>
              <div className={styles.prizeItem}>
                <Trophy className={styles.prizeIcon + ' ' + styles.other} size={24} />
                <span className={styles.prizeText}>5. 100 punktów do następnego sezonu</span>
              </div>
            </div>

            <div className={styles.charityBox}>
              <h3>Cel Charytatywny</h3>
              <p>Każde zebrane 2000 punktów = 10 PLN na cele charytatywne</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamificationPage;