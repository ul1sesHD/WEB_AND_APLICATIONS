import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

export type SupabaseConfig = { url: string; anonKey: string };

let cachedClient: SupabaseClient<Database> | null = null;
let configOverride: SupabaseConfig | null = null;

/**
 * Explicit configuration. Useful when env vars cannot be read at module
 * scope (tests, server-side rendering, manual bootstrap).
 */
export const configureSupabase = (config: SupabaseConfig): void => {
  configOverride = config;
  cachedClient = null;
};

const readFromEnv = (): SupabaseConfig => {
  // Vite (web) — `import.meta.env.VITE_*` is replaced statically at build time.
  // Cast the meta because TypeScript does not know about Vite's augmentation here.
  const meta = (import.meta as unknown as { env?: Record<string, string | undefined> }).env;
  const viteUrl = meta?.['VITE_SUPABASE_URL'];
  const viteKey = meta?.['VITE_SUPABASE_ANON_KEY'];

  // Angular (admin) — `process.env.NG_APP_*` is replaced via DefinePlugin.
  const proc = (globalThis as { process?: { env?: Record<string, string | undefined> } })
    .process?.env;
  const ngUrl = proc?.['NG_APP_SUPABASE_URL'];
  const ngKey = proc?.['NG_APP_SUPABASE_ANON_KEY'];

  const url = viteUrl ?? ngUrl ?? '';
  const anonKey = viteKey ?? ngKey ?? '';
  if (!url || !anonKey) {
    throw new Error(
      'Supabase URL/anon key missing. Set VITE_SUPABASE_* (web), NG_APP_SUPABASE_* (admin), or call configureSupabase().',
    );
  }
  return { url, anonKey };
};

export const getSupabase = (): SupabaseClient<Database> => {
  if (cachedClient) return cachedClient;
  const { url, anonKey } = configOverride ?? readFromEnv();
  cachedClient = createClient<Database>(url, anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: 'neighborhub.auth',
    },
  });
  return cachedClient;
};

export type Sb = SupabaseClient<Database>;
