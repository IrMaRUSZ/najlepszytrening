'use client';
import React, { useState } from 'react';
import { Trophy, Users, Target, Gift, Medal } from 'lucide-react';
import styles from '../../styles/Grywalizacja.module.css';

interface TeamMember {
  name: string;
  points: number;
}

interface Team {
  name: string;
  members: TeamMember[];
}

interface Teams {
  [key: string]: Team;
}

const GamificationPage = () => {
  const allParticipants: TeamMember[] = [
    { name: "Rafał G", points: 0 },
    { name: "Ada L", points: 50 },
    { name: "Monika Z", points: 0 },
    { name: "Kasia W", points: 0 },
    { name: "Julia S", points: 30 },
    { name: "Michał P", points: 0 },
    { name: "Dawid L", points: 0 },
    { name: "Przemek F", points: 0 },
    { name: "Noemi W", points: 0 },
    { name: "Marek S", points: 0 },
    { name: "Trener Ireneusz", points: 0 },
    { name: "Kacper M", points: 0 },
    { name: "Dominika K", points: 0 }
  ].sort((a, b) => b.points - a.points);

  const teams: Teams = {
    team1: {
      name: "Drużyna Czerwona",
      members: [
        { name: "Ada L", points: 50 },
        { name: "Monika Z", points: 0 },
        { name: "Marek S", points: 0 }
      ]
    },
    team2: {
      name: "Drużyna Niebieska",
      members: [
        { name: "Kasia W", points: 0 },
        { name: "Julia S", points: 30 },
        { name: "Michał P", points: 0 }
      ]
    },
    team3: {
      name: "Drużyna Zielona",
      members: [
        { name: "Dawid L", points: 0 },
        { name: "Przemek F", points: 0 },
        { name: "Noemi W", points: 0 },
        { name: "Rafał G", points: 0 }
      ]
    },
    team4: {
      name: "Drużyna Żółta",
      members: [
        { name: "Trener Ireneusz", points: 0 },
        { name: "Kacper M", points: 0 },
        { name: "Dominika K", points: 0 }
      ]
    }
  };

  const [activeTab, setActiveTab] = useState<'teams' | 'individual' | 'rules' | 'prizes'>('teams');

  const calculateTeamPoints = (members: TeamMember[]): string => {
    const totalPoints = members.reduce((sum: number, member: TeamMember) => sum + member.points, 0);
    return (totalPoints / members.length).toFixed(1);
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
                  <span className={styles.teamPoints}>
                    {calculateTeamPoints(team.members)} pkt
                  </span>
                </div>
                <ul className={styles.membersList}>
                  {team.members.map((member, mIndex) => (
                    <li key={mIndex} className={styles.memberItem}>
                      <span className={styles.memberName}>{member.name}</span>
                      <span className={styles.memberPoints}>{member.points} pkt</span>
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
                  </tr>
                </thead>
                <tbody>
                  {allParticipants.map((participant, index) => (
                    <tr key={index} className={styles.tableRow}>
                      <td className={styles.tableCell}>
                        {index <= 2 && <Medal className={getMedalColor(index)} size={20} />}
                      </td>
                      <td className={styles.tableCell}>{participant.name}</td>
                      <td className={styles.tableCell}>{participant.points} pkt</td>
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
                  <li className={styles.ruleItem}>Wygrywa drużyna z najlepszym wspólczynnikiem punktow na czlonka</li>
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