import {defineCustomElements} from '@ionic/pwa-elements/loader';
defineCustomElements(window);

import App from './App.svelte'

const app = new App({
  target: document.getElementById('app')
})

export default app
