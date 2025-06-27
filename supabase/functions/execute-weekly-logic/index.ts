// Plik: supabase/functions/execute-weekly-logic/index.ts

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { differenceInWeeks } from 'https://esm.sh/date-fns';

// Ten interfejs jest teraz używany w logice wymiany drużynowej
interface Profile {
  id: string;
  total_points: number;
  team: string | null;
}

Deno.serve(async () => { 
  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { data: activeSeason, error: seasonError } = await supabaseAdmin
      .from('seasons')
      .select('id, start_date')
      .eq('is_active', true)
      .single();

    if (seasonError || !activeSeason) {
      throw new Error(`Nie znaleziono aktywnego sezonu: ${seasonError?.message || 'Brak sezonu'}`);
    }

    // --- CZĘŚĆ A: SPRAWDZANIE PROGÓW I ELIMINACJA ---
    const currentWeekNumber = differenceInWeeks(new Date(), new Date(activeSeason.start_date)) + 1;
    const { data: threshold, error: thresholdError } = await supabaseAdmin
      .from('season_thresholds').select('min_points_required')
      .eq('season_id', activeSeason.id).eq('week_number', currentWeekNumber)
      .single();
    if (thresholdError && thresholdError.code !== 'PGRST116') { console.error('Błąd pobierania progu:', thresholdError.message); }
    if (threshold) {
      const minPoints = threshold.min_points_required;
      const { data: playersToEliminate, error: playersError } = await supabaseAdmin
        .from('profiles').select('id').eq('is_eliminated', false).lt('total_points', minPoints);
      if(playersError) console.error('Błąd pobierania graczy do eliminacji:', playersError.message);
      if (playersToEliminate && playersToEliminate.length > 0) {
        const playerIds = playersToEliminate.map(p => p.id);
        await supabaseAdmin.from('profiles').update({ is_eliminated: true }).in('id', playerIds);
      }
    }

    // --- CZĘŚĆ B: WYMIANA GRACZY MIĘDZY DRUŻYNAMI ---
    const { data: allPlayers, error: allPlayersError } = await supabaseAdmin
        .from('profiles')
        .select('id, total_points, team')
        .eq('is_eliminated', false)
        .not('team', 'is', null);
    
    if (allPlayersError || !allPlayers) throw new Error("Błąd pobierania graczy do wymiany.");
    
    const teamOrder = ['Drużyna Czerwona', 'Drużyna Niebieska', 'Drużyna Zielona', 'Drużyna Żółta'];
    const teamData = new Map<string, { leader: Profile | null, weakest: Profile | null }>();

    teamOrder.forEach(teamName => {
        const members = allPlayers.filter(p => p.team === teamName);
        if (members.length > 0) {
            members.sort((a, b) => b.total_points - a.total_points);
            teamData.set(teamName, {
                leader: members[0],
                weakest: members[members.length - 1],
            });
        }
    });

    const updates: { id: string, team: string }[] = [];
    for (let i = 0; i < teamOrder.length; i++) {
        const currentTeamName = teamOrder[i];
        const nextTeamName = teamOrder[(i + 1) % teamOrder.length];
        const currentTeam = teamData.get(currentTeamName);
        const nextTeam = teamData.get(nextTeamName);

        if (currentTeam?.leader && nextTeam?.weakest && currentTeam.leader.id !== nextTeam.weakest.id) {
            updates.push({ id: currentTeam.leader.id, team: nextTeamName });
            updates.push({ id: nextTeam.weakest.id, team: currentTeamName });
        }
    }
    
    if(updates.length > 0) {
        // Usuwamy duplikaty, na wypadek gdyby lider jednej drużyny był najsłabszym w innej
        const uniqueUpdates = updates.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i);
        await supabaseAdmin.from('profiles').upsert(uniqueUpdates, { onConflict: 'id' });
    }
    
    // --- NOWA CZĘŚĆ: RESETOWANIE STATUSU ZADAŃ NA NOWY TYDZIEŃ ---
    await supabaseAdmin
        .from('profiles')
        .update({ quest_is_completed: false })
        .eq('is_eliminated', false);

    return new Response( JSON.stringify({ message: "Logika tygodniowa wykonana pomyślnie, zadania zresetowane." }), { headers: { "Content-Type": "application/json" }, status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Wystąpił nieznany błąd.";
    return new Response( JSON.stringify({ error: errorMessage }), { headers: { "Content-Type": "application/json" }, status: 500 });
  }
});