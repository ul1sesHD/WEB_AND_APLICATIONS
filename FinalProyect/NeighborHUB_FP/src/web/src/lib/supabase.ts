import { configureSupabase, getSupabase } from '@neighborhub/shared';
import { env } from './env';

let bootstrapped = false;

export const bootstrapSupabase = (): void => {
  if (bootstrapped) return;
  configureSupabase({
    url:     env.VITE_SUPABASE_URL,
    anonKey: env.VITE_SUPABASE_ANON_KEY,
  });
  bootstrapped = true;
};

export { getSupabase };
