import { z } from 'zod';

const envSchema = z.object({
  VITE_SUPABASE_URL:      z.string().url(),
  VITE_SUPABASE_ANON_KEY: z.string().min(20),
});

const parsed = envSchema.safeParse(import.meta.env);

if (!parsed.success) {
  // eslint-disable-next-line no-console
  console.error('Invalid environment variables:', parsed.error.format());
  throw new Error('Missing or invalid environment variables. See .env.example.');
}

export const env = parsed.data;
