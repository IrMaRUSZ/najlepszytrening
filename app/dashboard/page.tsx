// Plik: app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabaseClient';
import WeeklyLogTable from './WeeklyLogTable';
import HistoryCharts from './HistoryCharts';
import QuestDisplay from './QuestDisplay';
import BadgesDisplay, { Badge } from './BadgesDisplay';
import styles from '../../styles/Dashboard.module.css'; 
import { startOfWeek, endOfWeek, format, subDays, addDays } from 'date-fns';
import { pl } from 'date-fns/locale';

export type DailyEntry = Partial<{
    id: number; user_id: string; entry_date: string; body_weight: number | null; 
    steps: number | null; was_training: boolean | null; sleep_hours: number | null; 
    kilometers_ran: number | null; calories_eaten: number | null;
}>;

export interface Profile {
  username: string;
  tracked_metrics: string[];
}

interface QuestData {
  quest_type: string;
  target_value: number;
  points_reward: number;
  is_completed: boolean;
  current_progress: number;
}

interface WeeklyData {
  entries: DailyEntry[];
  quest: QuestData | null;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weeklyData, setWeeklyData] = useState<WeeklyData | null>(null);
  const [historicalEntries, setHistoricalEntries] = useState<DailyEntry[]>([]);
  const [awardedBadges, setAwardedBadges] = useState<Badge[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.push('/login'); return; }
      const currentUser = session.user;
      setUser(currentUser);

      const [profileResponse, weeklyDataResponse, badgesResponse, allEntriesResponse] = await Promise.all([
        supabase.from('profiles').select('username, tracked_metrics').eq('id', currentUser.id).single(),
        supabase.rpc('get_weekly_data_with_quest', {
          p_user_id: currentUser.id,
          p_target_date: format(currentDate, 'yyyy-MM-dd') 
        }),
        supabase.from('user_badges').select('badges(id, name, description, image_url)').eq('user_id', currentUser.id),
        supabase.from('daily_entries').select('*').eq('user_id', currentUser.id).order('entry_date', { ascending: true })
      ]);

      if (profileResponse.data) setProfile(profileResponse.data as Profile);
      if (weeklyDataResponse.data) setWeeklyData(weeklyDataResponse.data);
      if (allEntriesResponse.data) setHistoricalEntries(allEntriesResponse.data);
      if (badgesResponse.data) {
        const badgesData = badgesResponse.data.map(item => item.badges).flat().filter(Boolean);
        setAwardedBadges(badgesData as Badge[]);
      }
      setLoading(false);
    };
    fetchData();
  }, [router, currentDate]); 

  const handlePreviousWeek = () => setCurrentDate(subDays(currentDate, 7));
  const handleNextWeek = () => {
    // Ta logika jest teraz przekazywana do `WeeklyLogTable`, ale działa centralnie tutaj
    if (endOfWeek(currentDate, { weekStartsOn: 1 }) < new Date()) {
      setCurrentDate(addDays(currentDate, 7));
    }
  };
  const handleGoToCurrent = () => setCurrentDate(new Date());

  if (loading || !user || !profile || !weeklyData) {
    return <main className={styles.dashboardContainer}><p>Wczytywanie danych...</p></main>;
  }

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1, locale: pl });

  return (
    <main className={styles.dashboardContainer}>
      <h1 className={styles.welcomeHeader}>Witaj, {profile.username}!</h1>
      
      {/* ZMIANA: Usunięto zduplikowaną nawigację tygodnia. Zostaje tylko ta w tabeli. */}
      
      <QuestDisplay quest={weeklyData.quest} />
      
      {/* ZMIANA: Przekazano stan i funkcje nawigacyjne w dół do komponentu tabeli */}
      <WeeklyLogTable 
        userId={user.id} 
        trackedMetrics={profile.tracked_metrics} 
        initialEntries={weeklyData.entries || []}
        currentDate={currentDate}
        onPreviousWeek={handlePreviousWeek}
        onNextWeek={handleNextWeek}
        onGoToCurrent={handleGoToCurrent}
        key={format(weekStart, 'yyyy-MM-dd')}
      />

      <BadgesDisplay badges={awardedBadges} />
      <HistoryCharts entries={historicalEntries} />
    </main>
  );
}