<header>
  <div class="header-inner">
    <h1 class="title">Supagram</h1>
    <slot name="buttons" />
  </div>
</header>

<style>
  header {
    position: sticky;
    top: 0;
    width: 100%;
    background-color: Canvas;
  }
  header .header-inner {
    display: flex;
    min-height: 44px;
    justify-content: space-between;
    align-items: center;
    padding: 3px 16px;
    padding-top: calc(env(safe-area-inset-top) + 4px);
    border-bottom: thin solid #c7c7c7;
  }
  h1 {
    font-weight: 900;
    font-family: monospace;
    font-size: 24px;
  }

  header :global(.buttons) {
    display: flex;
    align-items: center;
  }
  header :global(button) {
    min-width: 48px;
    height: 48px;
    margin: 2px;
  }
  header :global(i) {
    font-size: 24px;
  }
</style>
