// Plik: app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabaseClient';
import WeeklyLogTable from './WeeklyLogTable';
import HistoryCharts from './HistoryCharts';
import QuestDisplay from './QuestDisplay';
import { startOfWeek, format } from 'date-fns';
import styles from '../../styles/Dashboard.module.css'; 
import BadgesDisplay, { Badge } from './BadgesDisplay';

export type DailyEntry = Partial<{
    id: number; user_id: string; entry_date: string; body_weight: number | null; 
    steps: number | null; was_training: boolean | null; sleep_hours: number | null; 
    kilometers_ran: number | null; calories_eaten: number | null;
}>;

export interface Profile {
  username: string;
  tracked_metrics: string[];
  quest_type: string | null;
  quest_target_value: number | null;
  quest_points_reward: number | null;
  quest_is_completed: boolean | null;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [historicalEntries, setHistoricalEntries] = useState<DailyEntry[]>([]);
  const [questProgress, setQuestProgress] = useState(0);
  const [awardedBadges, setAwardedBadges] = useState<Badge[]>([]);

  useEffect(() => {
    const checkUserAndProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.push('/login'); return; }
      
      const currentUser = session.user;
      setUser(currentUser);

      const [profileResponse, entriesResponse, badgesResponse] = await Promise.all([
    supabase.from('profiles').select('username, tracked_metrics, quest_type, quest_target_value, quest_points_reward, quest_is_completed').eq('id', currentUser.id).single(),
    supabase.from('daily_entries').select('*').eq('user_id', currentUser.id).order('entry_date', { ascending: true }),
    // NOWA LINIA: Pobieramy odznaki, łącząc je z ich definicjami
   supabase.from('user_badges').select('badges(id, name, description, image_url)').eq('user_id', currentUser.id)
  ]);
      
      if (profileResponse.error) console.error("Błąd profilu:", profileResponse.error.message);
      else setProfile(profileResponse.data as Profile);
      
      if (entriesResponse.error) console.error("Błąd wpisów:", entriesResponse.error.message);
      else setHistoricalEntries(entriesResponse.data);
      if (entriesResponse.error) console.error("Błąd wpisów:", entriesResponse.error.message);
else setHistoricalEntries(entriesResponse.data);

// NOWE LINIE: Obsługa odznak
// ...
if (badgesResponse.error) {
  console.error("Błąd pobierania odznak:", badgesResponse.error.message);
} else {
  // POPRAWKA: Dodajemy .flat() do spłaszczenia tablicy
  const badgesData = badgesResponse.data
    .map(item => item.badges) // Tworzy tablicę tablic: [[badge1], [badge2]]
    .filter(Boolean)           // Usuwa ewentualne puste wpisy
    .flat();                  // Spłaszcza ją do: [badge1, badge2]
  
  console.log('DANE ODZNAK POBRANE Z BAZY (spłaszczone):', badgesData);

  // Teraz typ się zgadza, a asercja jest poprawna
  setAwardedBadges(badgesData as Badge[]);
}
// ...
      
      setLoading(false);
    };
    checkUserAndProfile();
  }, [router]);
  
  useEffect(() => {
    if (!profile || !profile.quest_type || historicalEntries.length === 0) {
      setQuestProgress(0);
      return;
    }

    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    const weekStartString = format(weekStart, 'yyyy-MM-dd');

    const currentWeekEntries = historicalEntries.filter(
      (entry) => entry.entry_date! >= weekStartString
    );
    
    let progress = 0;
    if (profile.quest_type === 'SUM_STEPS') {
      progress = currentWeekEntries.reduce((sum, entry) => sum + (entry.steps || 0), 0);
    } else if (profile.quest_type === 'SUM_KM') {
      progress = currentWeekEntries.reduce((sum, entry) => sum + (entry.kilometers_ran || 0), 0);
    } else if (profile.quest_type === 'COUNT_TRAININGS') {
      progress = currentWeekEntries.filter(entry => entry.was_training === true).length;
    }
    
    setQuestProgress(progress);
  }, [profile, historicalEntries]);

  if (loading || !user || !profile) {
    return <main className={styles.dashboardContainer}><p>Wczytywanie...</p></main>;
  }
  
  return (
    <main className={styles.dashboardContainer}>
      <h1 className={styles.welcomeHeader}>Witaj, {profile.username}!</h1>
      
      <QuestDisplay 
        questType={profile.quest_type}
        targetValue={profile.quest_target_value}
        pointsReward={profile.quest_points_reward}
        isCompleted={profile.quest_is_completed}
        currentProgress={questProgress}
      />
      
      <WeeklyLogTable 
        userId={user.id} 
        trackedMetrics={profile.tracked_metrics} 
        initialEntries={historicalEntries}
      />
      <BadgesDisplay badges={awardedBadges} />
      <HistoryCharts entries={historicalEntries} />
    </main>
  );
}