<script lang="ts">
  export let img = '';
  export let caption = '';
</script>

<figure>
  <img src={`data:image/png;base64,${img}`} alt="" />
  <figcaption><p>{caption}</p></figcaption>
</figure>
<hr />

<style>
  figure {
    width: 100%;
    margin: 16px auto;
  }
  figcaption {
    width: 90%;
    margin: auto;
  }
  img {
    width: 100%;
    height: auto;
  }
</style>
