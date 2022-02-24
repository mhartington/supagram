import { createClient } from '@supabase/supabase-js'
// import {replace } from 'svelte-spa-router';
import {navigate } from 'svelte-routing';
const supabaseUrl = import.meta.env.VITE_SVELTE_APP_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SVELTE_APP_SUPABASE_ANON_KEY as string;
export const DB_NAME = 'supagram';
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  autoRefreshToken: true,
  persistSession: true
})
export const signUp = async (creds: {email: string; password: string}) => {
  const {user, error}  = await supabase.auth.signUp(creds);
  if(error) {
    alert('There was an error signing up');
  }
}
export const logIn = async  (creds: {email: string; password: string}) => {
  const {user, error} = await supabase.auth.signIn(creds);
  if(error) {
    alert('There was an error loging in');
  }
}
export const logOut = async () => {
    await supabase.auth.signOut()
    supabase.getSubscriptions().map(sup => {
      supabase.removeSubscription(sup)
    })
     navigate('/', {replace: true});

}
