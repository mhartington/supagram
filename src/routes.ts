import Home from './pages/Home.svelte';
import NewPost from './pages/NewPost.svelte';
import Login from './pages/Login.svelte';

const routes = [
  { name: '/', component: Login, },
  { name: 'home', component: Home, },
  { name: 'new', component: NewPost, },
  // {
  //   name: 'admin',
  //   component: AdminLayout,
  //   onlyIf: { guard: userIsAdmin, redirect: '/login' },
  // },
];

export { routes };
