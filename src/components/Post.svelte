<script lang="ts">
  import { user } from '../store';
  import { get } from 'svelte/store';
  import { supabase } from '../supabaseClient';
  import CommentList from './CommentList.svelte';

  export let post: {
    id: number;
    caption: string;
    img: string;
    user_id: string;
    created_at: Date;
  } | null;

  let comment = '';

  const loadPhoto = (filename: string) => {
    const { data } = supabase.storage
      .from('public')
      .getPublicUrl(filename.split('/').slice(1).join('/'));
    return data.publicURL;
  };
  const deleteImage = async () => {
    await supabase.storage
      .from('public')
      .remove([post.img.split('/').slice(1).join('/')]);
  };
  const deletePost = async () => {
    await supabase.from('supagram').delete().match({ id: post.id });
    await deleteImage();
  };

  const img = loadPhoto(post.img);
  const currentUser = get(user);

  const resize = (e: any) => {
    const el = e.target as HTMLElement;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  };
  const onKeyDown = (e: any) => {
    const el = e.target as HTMLElement;
    if (e.keyCode == 13 && !e.shiftKey) {
      e.preventDefault();
      e.target.form.dispatchEvent(new Event('submit', { cancelable: true }));
      el.blur();
    }
  };
  const postComment = async () => {
    const newComment = {
      comment: comment,
      user_id: currentUser.id,
      post_id: post.id,
    };
    await supabase.from('supagram_comments').insert(newComment);
    comment = '';
  };
</script>

<article>
  <div class="post-header">
    <div class="post-author">
      <div class="post-author-img" />
      <!-- <p class="author">{author}</p> -->
    </div>
    {#if post.user_id === currentUser.id}
      <button on:click={deletePost}> <i class="bi bi-three-dots" /> </button>
    {/if}
  </div>
  <div class="img-wrapper">
    <img src={img} alt="" loading="lazy" />
  </div>
  <figure>
    <figcaption><p>{post.caption}</p></figcaption>
    <CommentList postId={post.id} />
  </figure>
  <div class="comment-input">
    <form on:submit|preventDefault={async () => postComment()}>
      <textarea
        on:input={resize}
        on:keydown={onKeyDown}
        bind:value={comment}
        placeholder="Add a comment…"
        autocomplete="off"
        autocorrect="off"
        spellcheck="false"
      />
      <button type="submit">Post</button>
    </form>
  </div>
</article>

<style>
  article {
    width: 100%;
    border-bottom: thin solid grey;
    overflow: hidden;
  }
  figure {
    width: 100%;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
  }
  figcaption {
    padding: 8px 16px;
  }
  .img-wrapper {
    width: 100%;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .post-header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 14px 16px;
    min-height: 48px;
  }
  /* .post-header p { */
  /*   flex: 1; */
  /*   overflow: hidden; */
  /*   text-overflow: ellipsis; */
  /*   white-space: nowrap; */
  /* } */
  .post-header .post-author {
    flex: 1;
  }
  .post-header .post-author-img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
    background-color: #333;
  }
  .comment-input {
    padding: 8px 16px;
  }
  .comment-input form {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .comment-input form textarea {
    border: none;
    resize: none;
    flex: 1;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  @media (min-width: 600px) {
    article {
      border: 0.55px solid #3c3c3c80;
      margin: 16px auto;
    }
  }
</style>
