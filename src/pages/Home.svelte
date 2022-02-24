<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import Post from '../components/Post.svelte';
  import { navigate } from 'svelte-routing';
  import Header from '../components/Header.svelte';
  import { logOut, supabase } from '../supabaseClient';
  import type { RealtimeSubscription } from '@supabase/supabase-js';
  let changesSub: RealtimeSubscription;
  let posts = [];

  onDestroy(() => {
    changesSub.unsubscribe();
  });

  onMount(() => {
    loadPosts();
    changesSub = supabase
      .from('supagram')
      .on('*', (payload) => {
        if (payload.eventType === 'INSERT') {
          posts = [payload.new, ...posts];
        }
        if (payload.eventType === 'DELETE') {
          const newPosts = posts.filter((post) => post.id !== payload.old.id);
          posts = newPosts;
        }
      })
      .subscribe();
  });

  const logout = async () => await logOut();

  const loadPosts = async () => {
    const { data } = await supabase
      .from('supagram')
      .select('*')
      .order('created_at', { ascending: false });
    posts = data;
  };
</script>

<main>
  <Header>
    <div slot="buttons">
      <button on:click={() => navigate('/new')}>
        <i class="bi bi-plus-square" />
      </button>
      <button on:click={logout}>
        <i class="bi bi-person-x" />
      </button>
    </div>
  </Header>
  <div class="content">
    <div class="post-container">
      {#each posts as post (post.id)}
        <Post {post} />
      {/each}
    </div>
  </div>
</main>

<style>
  @media (min-width: 600px) {
    .post-container {
      max-width: 500px;
      margin: auto;
    }
  }
</style>
