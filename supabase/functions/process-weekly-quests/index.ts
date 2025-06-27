// Plik: supabase/functions/process-weekly-quests/index.ts

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

Deno.serve(async () => {
  try {
    // Wywołujemy naszą nową, inteligentną funkcję w bazie danych
    const { data, error } = await supabaseAdmin.rpc('check_and_award_weekly_quests');

    if (error) {
      throw error;
    }
    
    const message = `Weekly quest check completed. Awarded quests to ${data.length} players.`;
    console.log(message);
    
    return new Response(JSON.stringify({ message: message, awarded_players: data }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });

  } catch (e) {
    console.error("Error processing weekly quests:", e.message);
    return new Response(JSON.stringify({ error: e.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});