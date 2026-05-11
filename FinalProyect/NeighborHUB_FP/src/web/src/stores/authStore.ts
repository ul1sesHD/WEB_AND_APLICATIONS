import { create } from 'zustand';
import type { Session, User } from '@supabase/supabase-js';
import {
  profileService,
  ServiceError,
  type Profile,
  type Result,
  type UserRole,
} from '@neighborhub/shared';
import { getSupabase } from '@/lib/supabase';

type AuthState = {
  user:    User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  initialize: () => Promise<void>;
  signIn:  (email: string, password: string) => Promise<Result<void>>;
  signUp:  (args: SignUpArgs) => Promise<Result<void>>;
  signOut: () => Promise<void>;
};

export type SignUpArgs = {
  email:        string;
  password:     string;
  name:         string;
  neighborhood: string;
  role?:        UserRole;
};

const refreshProfile = async (userId: string): Promise<Profile | null> => {
  const r = await profileService.getProfile(getSupabase(), userId);
  return r.error ? null : r.data;
};

const ok = (): Result<void> => ({ data: undefined, error: null });

export const useAuthStore = create<AuthState>((set, get) => ({
  user:    null,
  profile: null,
  session: null,
  loading: true,

  initialize: async () => {
    const sb = getSupabase();
    const { data: { session } } = await sb.auth.getSession();
    const profile = session?.user ? await refreshProfile(session.user.id) : null;
    set({ session, user: session?.user ?? null, profile, loading: false });

    sb.auth.onAuthStateChange(async (_event, next) => {
      const np = next?.user ? await refreshProfile(next.user.id) : null;
      set({ session: next, user: next?.user ?? null, profile: np });
    });
  },

  signIn: async (email, password) => {
    const { data, error } = await getSupabase().auth.signInWithPassword({ email, password });
    if (error) return { data: null, error: new ServiceError(error.message, 'sign_in_failed') };
    const profile = data.user ? await refreshProfile(data.user.id) : null;
    set({ session: data.session, user: data.user, profile });
    return ok();
  },

  signUp: async (args) => {
    const { data, error } = await getSupabase().auth.signUp({
      email:    args.email,
      password: args.password,
      options:  { data: { name: args.name, role: args.role ?? 'user' } },
    });
    if (error) return { data: null, error: new ServiceError(error.message, 'sign_up_failed') };
    if (data.user && args.neighborhood.trim().length > 0) {
      await profileService.updateProfile(getSupabase(), data.user.id, {
        neighborhood: args.neighborhood,
      });
    }
    const profile = data.user ? await refreshProfile(data.user.id) : null;
    set({ session: data.session, user: data.user, profile });
    return ok();
  },

  signOut: async () => {
    await getSupabase().auth.signOut();
    set({ session: null, user: null, profile: null });
    void get;
  },
}));
