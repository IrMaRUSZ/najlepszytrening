// Plik: supabase/functions/check-achievements/index.ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { format, subDays } from 'https://esm.sh/date-fns';

const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

async function checkAndAwardBadges(player, badges) {
  const { data: userBadges, error: userBadgesError } = await supabaseAdmin
    .from('user_badges').select('badge_id').eq('user_id', player.id);
  
  if (userBadgesError) {
    console.error(`Error fetching badges for player ${player.id}:`, userBadgesError);
    return;
  }

  const userBadgeIds = new Set(userBadges.map(b => b.badge_id));
  const badgesToAward = [];

  for (const badge of badges) {
    if (userBadgeIds.has(badge.id)) continue;

    let earned = false;
    
    switch (badge.trigger_type) {
      case 'SINGLE_DAY_STEPS': {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { data, error } = await supabaseAdmin.from('daily_entries')
          .select('id').eq('user_id', player.id).gte('steps', badge.trigger_value).limit(1);
        if (data && data.length > 0) earned = true;
        break;
      }
      case 'KM_IN_WEEK': {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { data, error } = await supabaseAdmin.from('daily_entries')
          .select('kilometers_ran').eq('user_id', player.id)
          .gte('entry_date', format(subDays(new Date(), 7), 'yyyy-MM-dd'));
        const totalKm = (data || []).reduce((sum, entry) => sum + (entry.kilometers_ran || 0), 0);
        if (totalKm >= badge.trigger_value) earned = true;
        break;
      }
      case 'TRAININGS_IN_PERIOD': {
         // eslint-disable-next-line @typescript-eslint/no-unused-vars
         const { count, error } = await supabaseAdmin.from('daily_entries')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', player.id).eq('was_training', true)
          .gte('entry_date', format(subDays(new Date(), 14), 'yyyy-MM-dd'));
        if (count !== null && count >= badge.trigger_value) earned = true;
        break;
      }
      case 'CONSISTENT_TRAINING_MONTHLY': {
        let consistentWeeks = 0;
        for (let i = 0; i < 4; i++) {
            const weekEnd = subDays(new Date(), 7 * i);
            const weekStart = subDays(weekEnd, 6);
            const { count } = await supabaseAdmin.from('daily_entries')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', player.id).eq('was_training', true)
                .gte('entry_date', format(weekStart, 'yyyy-MM-dd'))
                .lte('entry_date', format(weekEnd, 'yyyy-MM-dd'));
            if (count !== null && count >= badge.trigger_value) {
                consistentWeeks++;
            }
        }
        if (consistentWeeks >= 4) earned = true;
        break;
      }
    }

    if (earned) {
      badgesToAward.push(badge);
    }
  }

  for (const badge of badgesToAward) {
    await supabaseAdmin.from('user_badges').insert({ user_id: player.id, badge_id: badge.id });
    await supabaseAdmin.from('challenges').insert({
      user_id: player.id,
      title: `Odznaka: ${badge.name}`,
      points_reward: badge.points_reward,
      challenge_type: 'BADGE_REWARD',
      status: 'completed'
    });
    console.log(`Awarded badge "${badge.name}" to player ${player.id}`);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
Deno.serve(async (req) => {
  try {
    const { data: badges, error: badgesError } = await supabaseAdmin.from('badges').select('*');
    if (badgesError) throw badgesError;
    
    const { data: players, error: playersError } = await supabaseAdmin.from('profiles').select('id');
    if (playersError) throw playersError;

    for (const player of players) {
      await checkAndAwardBadges(player, badges);
    }

    return new Response(JSON.stringify({ message: "Achievement check completed." }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});