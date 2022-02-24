<script lang="ts">
  import type { RealtimeSubscription } from '@supabase/supabase-js';

  import { onDestroy, onMount } from 'svelte';

  import { supabase } from '../supabaseClient';
  import CommentItem from './CommentItem.svelte';
  export let postId: number = 0;
  let supaSub: RealtimeSubscription;
  let comments = [];
  onMount(() => {
    loadComments();
    supaSub = supabase
      .from('supagram_comments')
      .on('*', (payload) => {
        if (payload.eventType === 'INSERT') {
          if (payload.new.post_id === postId) {
            comments = [...comments, payload.new];
          }
        }
        if (payload.eventType === 'DELETE') {
          const newPosts = comments.filter(
            (comment) => comment.id !== payload.old.id
          );
          comments = newPosts;
        }
      })
      .subscribe();
  });
  onDestroy(() => {
    supaSub.unsubscribe();
    supaSub = null;
  });
  const loadComments = async () => {
    const { data } = await supabase
      .from('supagram_comments')
      .select('*')
      .match({ post_id: postId })
      .order('created_at', { ascending: true });

    comments = data;
  };
</script>
<div>
{#each comments as comment (comment.id)}
  <CommentItem {comment} />
{/each}
</div>

<style>
  div {
    padding: 8px 16px;
  }
</style>
