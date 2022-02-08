<script>
  import { signUp, supabase, logIn } from '../supabaseClient';

  let cred = {};
  let signingIn = true;
  const toggle =  () => {
    signingIn = !signingIn
    console.log(signingIn)
  };
  // const login = async () => {
  //   //   try {
  //   //     loading = true;
  //   //     const { error } = await supabase.auth.signIn({ email });
  //   //     if (error) throw error;
  //   //     alert('Check your email for the login link!');
  //   //   } catch (error) {
  //   //     alert(error.error_description || error.message);
  //   //   } finally {
  //   //     loading = false;
  //   //   }
  // };


</script>

<main>
  <h1>Supagram</h1>
  {#if signingIn}
    <form on:submit|preventDefault={async () => await logIn(cred)}>
      <label>
        <input
          type="email"
          placeholder="Email"
          autocomplete="email"
          bind:value={cred.email}
        />
      </label>
      <label>
        <input
          type="password"
          placeholder="Password"
          autocomplete="current-password new-password"
          bind:value={cred.password}
        />
      </label>
      <label>
        <input type="submit" class="button block" value="Log In" />
      </label>
    </form>
  {:else}
    <form on:submit|preventDefault={async () => await signUp(cred)}>
      <label>
        <input
          type="email"
          placeholder="email"
          autocomplete="email"
          bind:value={cred.email}
        />
      </label>
      <label>
        <input
          type="password"
          placeholder="Password"
          autocomplete="current-password new-password"
          bind:value={cred.password}
        />
      </label>
      <label>
        <input type="submit" class="button block" value="Register" />
      </label>
    </form>
  {/if}
  <div>
    <button on:click={toggle}>{signingIn ? `Don't have an account? Sign up` : `Already have an account? Sign in`}</button>
  </div>
</main>

<style>
  main {
    height: 100%;
    max-width: 350px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  h1 {
    font-family: monospace;
    font-size: 40px;
    margin-top: 0;
  }
  input:not([type='submit']) {
    font-size: 24px;
    border-radius: 8px;
    border: thin solid grey;
  }
</style>
