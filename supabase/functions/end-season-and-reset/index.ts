// Plik: supabase/functions/end-season-and-reset/index.ts

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req) => {
  // Obsługa zapytań CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Używamy klucza administratora, aby mieć pełne uprawnienia
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // 1. Znajdź aktywny sezon
    const { data: activeSeason, error: seasonError } = await supabaseAdmin
      .from('seasons')
      .select('id')
      .eq('is_active', true)
      .single();

    if (seasonError || !activeSeason) {
      throw new Error('Nie znaleziono aktywnego sezonu do zakończenia.');
    }

    // 2. Pobierz wszystkich graczy
    const { data: profiles, error: profilesError } = await supabaseAdmin
      .from('profiles')
      .select('id, total_points, rank, team')
      .eq('is_eliminated', false);

    if (profilesError) throw profilesError;

    // 3. Przygotuj dane do archiwizacji
    const resultsToInsert = profiles.map(p => ({
      season_id: activeSeason.id,
      user_id: p.id,
      final_points: p.total_points,
      final_rank: p.rank,
      team: p.team
    }));

    // 4. Zapisz archiwalne wyniki
    if (resultsToInsert.length > 0) {
      const { error: insertError } = await supabaseAdmin
        .from('season_results')
        .insert(resultsToInsert);
      if (insertError) throw insertError;
    }

    // 5. Zresetuj punkty i questy w profilach graczy
    const userIds = profiles.map(p => p.id);
    if (userIds.length > 0) {
        const { error: updateError } = await supabaseAdmin
          .from('profiles')
          .update({
            total_points: 0,
            rank: 'Uczestnik',
            quest_type: null,
            quest_target_value: null,
            quest_points_reward: null,
            quest_is_completed: false
          })
          .in('id', userIds);
        if (updateError) throw updateError;
    }

    // 6. Deaktywuj stary sezon
    const { error: deactivateError } = await supabaseAdmin
      .from('seasons')
      .update({ is_active: false })
      .eq('id', activeSeason.id);

    if (deactivateError) throw deactivateError;
    
    // Zwróć pomyślną odpowiedź
    return new Response(JSON.stringify({ message: `Sezon ${activeSeason.id} został pomyślnie zakończony.` }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    // Zwróć błąd, jeśli coś poszło nie tak
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});