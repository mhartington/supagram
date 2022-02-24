<script lang="ts">
  import Header from '../components/Header.svelte';
  // import { replace } from 'svelte-spa-router';
  import { DB_NAME, supabase } from '../supabaseClient';
  import { user } from '../store';
  import { get } from 'svelte/store';
  import { onMount } from 'svelte';
  import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
  import { navigate } from 'svelte-routing';
  let caption = '';
  let photo = '';
  const currentUser = get(user);
  const uploadFile = async () => {
    const file = await fetch(`data:image/jpeg;base64,${photo}`)
      .then((res) => res.blob())
      .then((blob) => new File([blob], 'my-file', { type: 'image/jpeg' }));

    const fileName = `${currentUser.id}-${new Date().getTime()}.jpeg`;

    const { data } = await supabase.storage
      .from('public')
      .upload(fileName, file);
    return data;
  };
  const share = async () => {
    if (!photo) {
      alert('Please add a photo');
      return;
    }

    const fileName = await uploadFile();
    await supabase
      .from(DB_NAME)
      .insert({ caption, img: fileName.Key, user_id: currentUser.id });
    goback();
  };
  const goback = () => navigate('/home', { replace: true });
  onMount(() => {
    takePhoto();
  });

  const takePhoto = async () => {
    try {
      const img = await Camera.getPhoto({
        quality: 100,
        resultType: CameraResultType.Base64,
        allowEditing: true
      });
      photo = img.base64String;
    } catch (e) {
      goback();
    }
  };
</script>

<main>
  <Header>
    <div class="buttons" slot="buttons">
      <button on:click={share}>Share</button>
    </div>
  </Header>
  <div class="content">
    {#if photo}
      <img
        src={`data:image/jpeg;base64,${photo}`}
        alt="something the use has uploaded"
      />
    {/if}
    <textarea
      class="caption"
      placeholder="Write a caption..."
      bind:value={caption}
    />
  </div>
</main>

<style>
  .content {
    height: 100%;
    width: 100%;
    margin: auto;
    padding: 16px;
  }
  img {
    display: block;
    max-width: 500px;
    width: 100%;
    height: auto;
    border-radius: 16px;
    margin: auto;
  }
  .caption {
    padding-top: 24px;
    display: block;
    border: unset;
    width: 100%;
    height: 200px;
    max-width: 375px;
    margin: auto;
    background: unset;
  }
  .caption:focus,
  .caption:focus-visible {
    outline: none;
  }
</style>
