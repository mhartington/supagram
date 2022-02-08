
<header>
  <h1 class="title">Supagram</h1>
  <slot name="buttons" />
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 16px;
    padding-top: calc(env(safe-area-inset-top) + 4px);
    border-bottom: thin solid #c7c7c7;
  }
  h1 {
    font-weight: bolder;
    font-family: monospace;
    font-size: 20px;
  }
</style>
