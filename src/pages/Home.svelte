<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import Post from '../components/Post.svelte';
  import { navigateTo } from 'svelte-router-spa';
  import Header from '../components/Header.svelte';
  import { DB_NAME, logOut, supabase } from '../supabaseClient';
import type { RealtimeSubscription } from '@supabase/supabase-js';
  let changesSub: RealtimeSubscription;
  let posts = [];
  onDestroy(() => {
    changesSub.unsubscribe();
  });
  onMount(() => {
    loadPosts();
    changesSub = supabase
      .from('*')
      .on('*', (payload) => {
        console.log('Change received!', payload);
        if(payload.eventType === 'INSERT'){
            posts = [payload.new, ...posts];
        }
        if(payload.eventType === 'DELETE'){
            posts = posts.filter(post => post.id !== payload.old.id);
        }
      })
      .subscribe();
  });

  const logout = async () => await logOut();
  const loadPosts = async () => {
    const query = await supabase.from(DB_NAME).select('*');
    posts = query.data.reverse();
  };
</script>

<main>
  <Header>
    <div slot="buttons">
      <button on:click={() => navigateTo('new')}>
        <i class="bi bi-plus-square" />
      </button>
      <button on:click={logout}>
        <i class="bi bi-person-x" />
      </button>
    </div>
  </Header>
  <div class="content">
    {#each posts as post}
      <Post img={post.img} caption={post.caption} />
    {/each}
  </div>
</main>
