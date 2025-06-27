// Plik: supabase/functions/impersonate-user/index.ts
// OSTATECZNA, POPRAWNA WERSJA

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

// Zdefiniujmy ID admina w jednym miejscu, aby łatwo je zmienić w przyszłości
const ADMIN_USER_ID = '2cb6885d-1005-420a-9ee0-5328c9811b9b';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );
    
    // Krok 1: Pobierz użytkownika, który wywołuje tę funkcję
    const { data: { user: callingUser } } = await supabaseAdmin.auth.getUser(
      req.headers.get('Authorization')!.replace('Bearer ', '')
    );
    if (!callingUser) {
      throw new Error("Brak autoryzacji.");
    }

    // Krok 2: UPROSZCZONY I NIEZAWODNY TEST BEZPIECZEŃSTWA
    // Sprawdzamy, czy ID użytkownika jest ID admina. Koniec sprawdzania.
    if (callingUser.id !== ADMIN_USER_ID) {
      throw new Error("Tylko wyznaczony administrator może korzystać z tej funkcji.");
    }

    // Krok 3: Kontynuuj normalne działanie funkcji
    const { user_id_to_impersonate } = await req.json();
    if (!user_id_to_impersonate) {
      throw new Error("Nie podano ID użytkownika do impersonacji.");
    }

    const { data, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email: (await supabaseAdmin.auth.admin.getUserById(user_id_to_impersonate)).data.user.email,
    });

    if (linkError) throw linkError;
    
    return new Response(JSON.stringify({ magicLink: data.properties.action_link }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 401,
    });
  }
});