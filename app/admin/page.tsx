// Plik: app/admin/page.tsx - OSTATECZNA, KOMPLETNA WERSJA

'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import styles from '../../styles/Admin.module.css';

// Importujemy komponenty z dashboardu, aby móc je wyświetlić w podglądzie
import WeeklyLogTable from '../dashboard/WeeklyLogTable';
import BadgesDisplay, { Badge } from '../dashboard/BadgesDisplay';
import HistoryCharts from '../dashboard/HistoryCharts';
import { DailyEntry } from '../dashboard/page'; // Importujemy typ DailyEntry
import SeasonManager from './SeasonManager';

// --- INTERFEJSY DEFINIUJĄCE STRUKTURĘ DANYCH ---

interface Profile {
  id: string;
  username: string;
  tracked_metrics: string[] | null;
  team: string | null;
  quest_type: string | null;
  quest_target_value: number | null;
  quest_points_reward: number | null;
  // Dodajemy role, aby uniknąć błędów typu
  role?: 'admin' | 'user'; 
}
interface Challenge {
  id: number;
  title: string;
  challenge_type: string;
  points_reward: number;
  status: string;
}
// NOWY Interfejs do przechowywania danych podglądanego użytkownika
interface ViewedUserData {
  profile: Profile;
  historicalEntries: DailyEntry[];
  awardedBadges: Badge[];
}


// --- STAŁE DEFINICJE ---
const ALL_METRICS = ['body_weight', 'steps', 'was_training', 'sleep_hours', 'kilometers_ran', 'calories_eaten'];
const METRIC_LABELS: { [key: string]: string } = {
  body_weight: 'Waga', steps: 'Kroki', was_training: 'Trening siłowy',
  sleep_hours: 'Sen', kilometers_ran: 'Bieganie', calories_eaten: 'Kalorie'
};
const ALL_TEAMS = ['Drużyna Czerwona', 'Drużyna Niebieska', 'Drużyna Zielona', 'Drużyna Żółta'];
const QUEST_TYPES = [
    { value: 'SUM_STEPS', label: 'Suma kroków w tygodniu' },
    { value: 'SUM_KM', label: 'Suma kilometrów w tygodniu' },
    { value: 'COUNT_TRAININGS', label: 'Liczba treningów w tygodniu' }
];

type AdminView = 'users' | 'season';

export default function AdminPanelPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const router = useRouter();
  const [activeView, setActiveView] = useState<AdminView>('users');

  // NOWY STAN: Przechowuje dane użytkownika, którego dashboard podglądamy
  const [viewedUserDashboard, setViewedUserDashboard] = useState<ViewedUserData | null>(null);

  useEffect(() => {
    const initializeAdminPanel = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
      if (profile?.role === 'admin') {
        setIsAdmin(true);
        const { data: allProfiles } = await supabase.from('profiles').select('id, username, tracked_metrics, team, quest_type, quest_target_value, quest_points_reward');
        if (allProfiles) setProfiles(allProfiles as Profile[]);
      } else {
        router.push('/dashboard');
      }
      setLoading(false);
    };
    initializeAdminPanel();
  }, [router]);

  const fetchChallenges = useCallback(async (userId: string) => {
    const { data } = await supabase.from('challenges').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    if (data) setChallenges(data as Challenge[]);
  }, []);

  const handleProfileSelect = (profile: Profile) => {
    setSelectedProfile(profile);
    fetchChallenges(profile.id);
  };
  
  const handleTrackedMetricsChange = async (metric: string, isChecked: boolean) => {
    if (!selectedProfile) return;
    const currentMetrics = selectedProfile.tracked_metrics || [];
    const newMetrics = isChecked ? [...new Set([...currentMetrics, metric])] : currentMetrics.filter(m => m !== metric);
    const { data, error } = await supabase.from('profiles').update({ tracked_metrics: newMetrics }).eq('id', selectedProfile.id).select().single();
    if (data) {
        setSelectedProfile(data as Profile);
        setProfiles(profiles.map(p => p.id === data.id ? (data as Profile) : p));
    }
    if (error) alert(`Błąd zapisu metryk: ${error.message}`);
  };

  const handleAddManualBonus = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedProfile) return;
    const formData = new FormData(event.currentTarget);
    const title = formData.get('title') as string;
    const points = Number(formData.get('points'));
    if (!title || isNaN(points) || points <= 0) {
        alert("Proszę podać poprawny tytuł i dodatnią liczbę punktów.");
        return;
    }
    const { error } = await supabase.rpc('add_manual_bonus', { p_user_id: selectedProfile.id, p_title: title, p_points: points });
    if (error) {
        alert(`Błąd podczas przyznawania bonusu: ${error.message}`);
    } else {
        alert("Bonus został pomyślnie przyznany!");
        fetchChallenges(selectedProfile.id);
    }
    event.currentTarget.reset();
  };

  const handleResetBadges = async () => {
    if (!selectedProfile || !confirm(`Czy na pewno chcesz zresetować WSZYSTKIE odznaki dla gracza ${selectedProfile.username}?`)) return;
    const { error } = await supabase.rpc('reset_user_badges', { p_user_id: selectedProfile.id });
    if (error) {
        alert(`Błąd podczas resetowania odznak: ${error.message}`);
    } else {
        alert("Odznaki zostały pomyślnie zresetowane!");
        fetchChallenges(selectedProfile.id);
    }
  };

  const handleDeleteChallenge = async (challengeId: number) => {
    if (!selectedProfile || !confirm('Na pewno usunąć to wyzwanie?')) return;
    await supabase.from('challenges').delete().eq('id', challengeId);
    fetchChallenges(selectedProfile.id);
  };

  const handleTeamChange = async (newTeam: string) => {
    if (!selectedProfile) return;
    const teamToSave = newTeam === "" ? null : newTeam;
    const { data, error } = await supabase.from('profiles').update({ team: teamToSave }).eq('id', selectedProfile.id).select().single();
    if (data) {
        setSelectedProfile(data as Profile);
        setProfiles(profiles.map(p => p.id === data.id ? (data as Profile) : p));
    }
    if (error) alert(`Błąd zapisu drużyny: ${error.message}`);
  };

  const handleAssignQuest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedProfile) return;
    const formData = new FormData(event.currentTarget);
    const quest_type = formData.get('quest_type') as string;
    const quest_target_value = Number(formData.get('quest_target_value'));
    const quest_points_reward = Number(formData.get('quest_points_reward'));
    if (!quest_type || isNaN(quest_target_value) || isNaN(quest_points_reward)) {
        alert("Wypełnij wszystkie pola zadania poprawnymi danymi.");
        return;
    }
    const questDataToUpdate = { quest_type, quest_target_value, quest_points_reward, quest_is_completed: false };
    const { data, error } = await supabase.from('profiles').update(questDataToUpdate).eq('id', selectedProfile.id).select().single();
    if (error) {
        alert(`Błąd przypisywania zadania: ${error.message}`);
    } else {
        alert("Zadanie zostało pomyślnie przypisane!");
        setSelectedProfile(data as Profile);
        setProfiles(profiles.map(p => p.id === data.id ? (data as Profile) : p));
    }
  };

  // --- NOWE FUNKCJE DO PODGLĄDU DASHBOARDU ---
  const handleViewAsUser = async (userToView: Profile) => {
    setLoading(true);
    const [entriesResponse, badgesResponse] = await Promise.all([
      supabase.from('daily_entries').select('*').eq('user_id', userToView.id).order('entry_date', { ascending: true }),
      supabase.from('user_badges').select('badges(id, name, description, image_url)').eq('user_id', userToView.id)
    ]);
    const historicalEntries = (entriesResponse.data as DailyEntry[]) || [];
    // ✅ NOWA, POPRAWNA LINIA:
    const awardedBadges: Badge[] = badgesResponse.data?.map(item => item.badges).flat() || [];
    setViewedUserDashboard({
        profile: userToView,
        historicalEntries,
        awardedBadges,
    });
    setLoading(false);
  };

  const handleCloseUserView = () => {
    setViewedUserDashboard(null);
  };


  if (loading) { return <main className={styles.container}>Ładowanie...</main>; }
  if (!isAdmin) { return null; }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Panel Administratora</h1>
      <div className={styles.viewSwitcher}>
        <button onClick={() => setActiveView('users')} className={activeView === 'users' ? styles.activeView : ''}>
          Zarządzaj Użytkownikami
        </button>
        <button onClick={() => setActiveView('season')} className={activeView === 'season' ? styles.activeView : ''}>
          Zarządzaj Sezonem
        </button>
      </div>

      {activeView === 'users' && (
        <div className={styles.layout}>
          <div className={styles.sidebar}>
            <h2>Uczestnicy</h2>
            <ul>
              {profiles.map(p => (
                <li key={p.id} onClick={() => handleProfileSelect(p)} className={selectedProfile?.id === p.id ? styles.active : ''}>
                  {p.username}
                </li>
              ))}
            </ul>
          </div>
          
          <div className={styles.content}>
            {viewedUserDashboard ? (
              // WIDOK PODGLĄDU DASHBOARDU
              <div>
                <button onClick={handleCloseUserView} style={{ marginBottom: '1rem', background: 'var(--background-light)', border: '1px solid var(--border)' }}>
                  ← Wróć do zarządzania
                </button>
                <h2 style={{ marginTop: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                    Podgląd dashboardu dla: {viewedUserDashboard.profile.username}
                </h2>
                <div style={{ paddingTop: '1rem' }}>
                  <WeeklyLogTable
                    userId={viewedUserDashboard.profile.id}
                    trackedMetrics={viewedUserDashboard.profile.tracked_metrics || []}
                    initialEntries={viewedUserDashboard.historicalEntries}
                  />
                  <BadgesDisplay badges={viewedUserDashboard.awardedBadges} />
                  <HistoryCharts entries={viewedUserDashboard.historicalEntries} />
                </div>
              </div>
            ) : (
              // NORMALNY WIDOK ZARZĄDZANIA PROFILEM
              <>
                {!selectedProfile ? <p>Wybierz uczestnika z listy, aby zarządzać jego profilem.</p> : (
                  <div>
                    <h2>Zarządzanie: {selectedProfile.username}</h2>

                    <div className={styles.section}>
                      <button onClick={() => handleViewAsUser(selectedProfile)} style={{width: '100%', padding: '0.8rem', background: 'var(--primary-hover)', color: 'white', fontSize: '1rem'}}>
                        Pokaż Dashboard Użytkownika
                      </button>
                    </div>
                    
                    <div className={styles.section}>
                        <h3>Przypisz Zadanie Tygodniowe</h3>
                        <form onSubmit={handleAssignQuest} className={styles.questForm}>
                            <div>
                                <label htmlFor="quest-type">Typ zadania</label>
                                <select id="quest-type" name="quest_type" defaultValue={selectedProfile.quest_type || ''}>
                                    <option value="" disabled>-- Wybierz typ --</option>
                                    {QUEST_TYPES.map(type => (<option key={type.value} value={type.value}>{type.label}</option>))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="quest-target">Cel (wartość)</label>
                                <input id="quest-target" name="quest_target_value" type="number" placeholder="np. 50000" defaultValue={selectedProfile.quest_target_value || ''}/>
                            </div>
                             <div>
                                <label htmlFor="quest-reward">Nagroda (punkty)</label>
                                <input id="quest-reward" name="quest_points_reward" type="number" placeholder="np. 150" defaultValue={selectedProfile.quest_points_reward || ''}/>
                            </div>
                            <div className={styles.questFormButton}><button type="submit">Przypisz / Zaktualizuj Zadanie</button></div>
                        </form>
                    </div>

                    <div className={styles.section}>
                        <h3>Zarządzaj Drużyną</h3>
                        <div className={styles.teamAssignment}>
                          <label htmlFor="team-select">Przypisz do drużyny:</label>
                          <select id="team-select" value={selectedProfile.team || ''} onChange={(e) => handleTeamChange(e.target.value)}>
                            <option value="">-- Brak drużyny --</option>
                            {ALL_TEAMS.map(team => (<option key={team} value={team}>{team}</option>))}
                          </select>
                        </div>
                    </div>

                    <div className={styles.section}>
                      <h3>Konfiguracja Tabeli Dziennika</h3>
                      <div className={styles.metricsGrid}>
                        {ALL_METRICS.map(metric => (
                          <label key={metric} className={styles.metricLabel}>
                            <input type="checkbox" checked={selectedProfile.tracked_metrics?.includes(metric) || false} onChange={(e) => handleTrackedMetricsChange(metric, e.target.checked)}/>
                            {METRIC_LABELS[metric]}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className={styles.section}>
                        <h3>Przyznaj Bonus Manualny</h3>
                        <form onSubmit={handleAddManualBonus} className={styles.adminForm}>
                            <input name="title" placeholder="Tytuł bonusu (np. Rekord)" required/><input name="points" type="number" placeholder="Punkty" required/>
                            <button type="submit">Przyznaj</button>
                        </form>
                    </div>

                    <div className={styles.section}>
                      <h3>Lista Wyzwań i Bonusów</h3>
                      <table className={styles.adminTable}>
                        <thead><tr><th>Tytuł</th><th>Typ</th><th>Punkty</th><th>Status</th><th>Akcje</th></tr></thead>
                        <tbody>
                            {challenges.map(c => (<tr key={c.id}><td>{c.title}</td><td>{c.challenge_type}</td><td>{c.points_reward}</td><td><span className={styles.statusCompleted}>{c.status}</span></td><td><button onClick={() => handleDeleteChallenge(c.id)}>Usuń</button></td></tr>))}
                            {challenges.length === 0 && (<tr><td colSpan={5} style={{textAlign: 'center', color: 'var(--text-muted)'}}>Brak wyzwań dla tego użytkownika.</td></tr>)}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className={styles.section} style={{ borderColor: 'var(--error, #dc3545)' }}>
                        <h3 style={{ color: 'var(--error, #dc3545)' }}>Strefa Niebezpieczna</h3>
                        <div>
                          <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-muted)' }}>Usuwa wszystkie zdobyte odznaki i odejmuje przyznane za nie punkty.</p>
                          <button onClick={handleResetBadges} style={{ background: 'var(--error, #dc3545)', color: 'white' }}>Resetuj Odznaki Uczestnika</button>
                        </div>
                    </div>
                  </div>  
                )}
              </>
            )}
          </div>
        </div>
      )}

      {activeView === 'season' && (<SeasonManager />)}
    </main>
  );
}