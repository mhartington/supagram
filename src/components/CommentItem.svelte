<script lang="ts">
  import { supabase } from '../supabaseClient';

  import { get } from 'svelte/store';
  import { user } from '../store';

  export let comment: {
    id: number;
    created_at: Date;
    post_id: number;
    user_id: string;
    comment: string;
  } | null;
  const currentUser = get(user);
  const deleteComment = async () => {
    await supabase.from('supagram_comments').delete().match({ id: comment.id });
  };
</script>

<div>
  <p>{comment.comment}</p>
  {#if comment.user_id === currentUser.id}
    <button on:click={deleteComment}> <i class="bi bi-three-dots" /> </button>
  {/if}
</div>

<style>
div {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
p {
  flex: 1;
}
</style>
