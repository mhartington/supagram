<script lang="ts">
  import { supabase } from './supabaseClient';
  import { user } from './store';
  import { Router, Route, navigate } from 'svelte-routing';
  import Login from './pages/Login.svelte';
  import Home from './pages/Home.svelte';
  import NewPost from './pages/NewPost.svelte';
  import {Keyboard, KeyboardResize } from '@capacitor/keyboard';
import { onMount } from 'svelte';
  const currentUser = supabase.auth.user();
  user.set(currentUser);
  onMount(()=>{
    Keyboard.setResizeMode({mode: KeyboardResize.Body})
  })
  supabase.auth.onAuthStateChange((_event, session) => {
    user.set(session?.user ?? null);
    navigate('/home');
  });
</script>

<Router>
  <Route path="/" component={Login} />
  <Route path="home" component={Home} />
  <Route path="new" component={NewPost} />
</Router>
