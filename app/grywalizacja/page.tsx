'use client';
import React, { useState } from 'react';
import { Trophy, Users, Target, Gift, Medal } from 'lucide-react';
import styles from '../../styles/Grywalizacja.module.css';

interface TeamMember {
  name: string;
  points: number;
  rank?: 'UCZESTNIK' | 'GRACZ' | 'ELITA';
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
    { name: "Katarzyna W", points: 2097 }, // 1889 + 208
    { name: "Marek S", points: 1973 }, // 1773 + 150
    { name: "Kacper M", points: 1722 }, // 1517 + 205
    { name: "Rafał G", points: 1627 }, // 1340 + 287
    { name: "Julia S", points: 1261 }, // 1058 + 133
    { name: "Trener Ireneusz", points: 1188 }, // 967 + 221
    { name: "Dawid L", points: 969 }, // 874 + 95
    { name: "Ada L", points: 684 }, // 593 + 91
    { name: "Noemi W", points: 575 }, // unchanged
  ].sort((a, b) => b.points - a.points);

  const teams: Teams = {
    team1: {
      name: "Drużyna Czerwona",
      members: [
        { name: "Rafał G", points: 0 },
        { name: "Dawid L", points: 0 },
        { name: "Julia S", points: 100 },
      ]
    },
    team2: {
      name: "Drużyna Niebieska",
      members: [
        { name: "Katarzyna W", points: 0 },
        { name: "Trener Ireneusz", points: 0 },

      ]
    },
    team3: {
      name: "Drużyna Zielona",
      members: [
        { name: "Marek S", points: 100 },
        { name: "Noemi W", points: 0 },
      ]
    },
    team4: {
      name: "Drużyna Żółta",
      members: [
        { name: "Kacper M", points: 0 },
        { name: "Ada L", points: 0 },
      ]
    }
  };

  const [activeTab, setActiveTab] = useState<'teams' | 'individual' | 'rules' | 'prizes'>('teams');

  const calculateRank = (points: number): 'UCZESTNIK' | 'GRACZ' | 'ELITA' => {
    if (points >= 1500) return 'ELITA';
    if (points >= 501) return 'GRACZ';
    return 'UCZESTNIK';
  };

  const getMultiplier = (rank: 'UCZESTNIK' | 'GRACZ' | 'ELITA'): number => {
    switch (rank) {
      case 'ELITA': return 0.5;
      case 'GRACZ': return 0.7;
      case 'UCZESTNIK': return 1.2;
      default: return 1;
    }
  };

  const calculateTeamPoints = (members: TeamMember[]): string => {
    const totalPoints = members.reduce((sum: number, member: TeamMember) => sum + member.points, 0);
    return (totalPoints / members.length).toFixed(1);
  };

  const getMedalColor = (index: number): string => {
    if (index === 0) return styles.medalGold;
    if (index === 1) return styles.medalSilver;
    if (index === 2) return styles.medalBronze;
    return '';
  };return (
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
                    <th className={styles.tableHeaderCell}>Ranga</th>
                    <th className={styles.tableHeaderCell}>Mnożnik</th>
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
                      <td className={styles.tableCell}>{calculateRank(participant.points)}</td>
                      <td className={styles.tableCell}>x{getMultiplier(calculateRank(participant.points))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

{activeTab === 'rules' && (
  <div className={styles.contentCard}>
    <h2 className={styles.sectionTitle}>System Zasad i Punktacji</h2>
    
    <div className={styles.rulesContainer}>
      {/* RANGI */}
      <div className={styles.ruleSection}>
        <h3 className={styles.ruleSectionTitle}>System Rang</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={styles.teamCard}>
            <h4 className={styles.teamName}>UCZESTNIK</h4>
            <p className="text-gray-600 mb-4">0-500 punktów</p>
            <ul className={styles.ruleList}>
              <li className={styles.ruleItem}>Mnożnik x1.2 za aktywności</li>
              <li className={styles.ruleItem}>Podstawowe uczestnictwo w wydarzeniach</li>
              <li className={styles.ruleItem}>Zbieranie punktów</li>
            </ul>
          </div>
          
          <div className={styles.teamCard}>
            <h4 className={styles.teamName}>GRACZ</h4>
            <p className="text-gray-600 mb-4">501-1499 punktów</p>
            <ul className={styles.ruleList}>
              <li className={styles.ruleItem}>Mnożnik x0.7 za aktywności</li>
              <li className={styles.ruleItem}>Rozszerzone uczestnictwo</li>
              <li className={styles.ruleItem}>Możliwość tworzenia własnych wyzwań</li>
            </ul>
          </div>
          
          <div className={styles.teamCard}>
            <h4 className={styles.teamName}>ELITA</h4>
            <p className="text-gray-600 mb-4">1500+ punktów</p>
            <ul className={styles.ruleList}>
              <li className={styles.ruleItem}>Mnożnik x0.5 za aktywności</li>
              <li className={styles.ruleItem}>Głosowanie nad zmianami w systemie</li>
              <li className={styles.ruleItem}>Proponowanie nowych wydarzeń</li>
              <li className={styles.ruleItem}>Udział w radzie decyzyjnej</li>
              <li className={styles.ruleItem}>Wpływ na kierunek rozwoju gry</li>
              <li className={styles.ruleItem}>Specjalne odznaki i wyróżnienia</li>
              <li className={styles.ruleItem}>Możliwość wyzwania innego gracza na pojedynek</li>
            </ul>
          </div>
        </div>
      </div>

      {/* PUNKTACJA PODSTAWOWA */}
      <div className={styles.ruleSection}>
        <h3 className={styles.ruleSectionTitle}>Punktacja Podstawowa</h3>
        <div className={styles.teamCard}>
          <ul className={styles.ruleList}>
            <li className={styles.ruleItem}>Uzupełnienie dziennej tabeli: 5 pkt</li>
            <li className={styles.ruleItem}>Sen 7-9 godzin: 5 pkt</li>
            <li className={styles.ruleItem}>Utrzymanie dziennej aktywności: 5 pkt (za każdą aktywność)</li>
            <li className={styles.ruleItem}>Trening: 10 pkt (max 4 treningi/tydzień)</li>
            <li className={styles.ruleItem}>Każde dodatkowe 5000 kroków: 10 pkt</li>
            <li className={styles.ruleItem}>Każdy przebiegnięty kilometr: 10 pkt</li>
          </ul>
        </div>
      </div>

      {/* PUNKTACJA DODATKOWA */}
      <div className={styles.ruleSection}>
        <h3 className={styles.ruleSectionTitle}>Punktacja Dodatkowa</h3>
        <div className={styles.teamCard}>
          <ul className={styles.ruleList}>
            <li className={styles.ruleItem}>Realizacja celu tygodniowego: 15 pkt</li>
            <li className={styles.ruleItem}>Wygranie tygodnia: 50 pkt</li>
            <li className={styles.ruleItem}>Uzupełnienie tabeli przez cały miesiąc: 40 pkt</li>
            <li className={styles.ruleItem}>Pobicie rekordu: 30 pkt (wymagane nagranie)</li>
            <li className={styles.ruleItem}>Post treningowy w social media: 10 pkt</li>
            <li className={styles.ruleItem}>Kreatywne zdjęcie treningowe: 50 pkt</li>
          </ul>
        </div>
      </div>

      {/* PROGI */}
      <div className={styles.ruleSection}>
        <h3 className={styles.ruleSectionTitle}>System Progów</h3>
        <div className={styles.teamCard}>
          <ul className={styles.ruleList}>
            <li className={styles.ruleItem}>Tydzień 5: Min. 300 punktów</li>
            <li className={styles.ruleItem}>Tydzień 6: Min. 400 punktów</li>
            <li className={styles.ruleItem}>Tydzień 7: Min. 500 punktów</li>
            <li className={styles.ruleItem}>Tydzień 8: Min. 600 punktów</li>
          </ul>
        </div>
      </div>

      {/* KONSEKWENCJE */}
      <div className={styles.ruleSection}>
        <h3 className={styles.ruleSectionTitle}>Konsekwencje</h3>
        <div className={styles.teamCard}>
          <ul className={styles.ruleList}>
            <li className={styles.ruleItem}>Brak wymaganej liczby punktów = wykluczenie</li>
            <li className={styles.ruleItem}>Zakaz udziału w następnej edycji</li>
            <li className={styles.ruleItem}>Utrata wszystkich przywilejów</li>
          </ul>
        </div>
      </div>

      {/* ZASADY DRUŻYNOWE */}
      <div className={styles.ruleSection}>
        <h3 className={styles.ruleSectionTitle}>Zasady Drużynowe</h3>
        <div className={styles.teamCard}>
          <ul className={styles.ruleList}>
            <li className={styles.ruleItem}>Lider drużyny po każdym tygodniu trafia do innej drużyny za najsłabszego uczestnika</li>
            <li className={styles.ruleItem}>Wygrywa drużyna z najlepszym współczynnikiem punktów na członka</li>
          </ul>
        </div>
      </div>

      {/* WAŻNE INFORMACJE */}
      <div className={styles.ruleSection}>
        <h3 className={styles.ruleSectionTitle}>Ważne Informacje</h3>
        <div className={styles.teamCard}>
          <ul className={styles.ruleList}>
            <li className={styles.ruleItem}>Punkty są naliczane według mnożnika rangi</li>
            <li className={styles.ruleItem}>Aktywność jest monitorowana</li>
            <li className={styles.ruleItem}>Ranga Elity daje realny wpływ na rozwój gry</li>
            <li className={styles.ruleItem}>System zapewnia balans między doświadczonymi a nowymi uczestnikami</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
)}
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