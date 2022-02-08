<script lang="ts">
  import { supabase } from './supabaseClient';
  import { user } from './store';
  import { navigateTo, Router } from 'svelte-router-spa'
  import { routes } from './routes';

  const currentUser = supabase.auth.user();
  user.set(currentUser);

  supabase.auth.onAuthStateChange((_event, session) => {
    user.set(session?.user ?? null);
    navigateTo('home');
  });
</script>

<Router {routes} />

