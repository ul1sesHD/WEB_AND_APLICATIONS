import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { UserRole } from '@neighborhub/shared';
import { useAuthStore } from '@/stores/authStore';
import { ROUTES } from '@/routes';

type GuardOptions = {
  requireAuth?: boolean;
  requireRole?: UserRole | UserRole[];
  redirectTo?:  string;
};

const matchesRole = (role: UserRole | undefined, want: UserRole | UserRole[]): boolean => {
  if (!role) return false;
  return Array.isArray(want) ? want.includes(role) : role === want;
};

export const useGuard = (options: GuardOptions): void => {
  const navigate = useNavigate();
  const { profile, session, loading } = useAuthStore();

  useEffect(() => {
    if (loading) return;

    if (options.requireAuth && !session) {
      navigate(options.redirectTo ?? ROUTES.login, { replace: true });
      return;
    }

    if (options.requireRole && !matchesRole(profile?.role, options.requireRole)) {
      navigate(options.redirectTo ?? ROUTES.home, { replace: true });
    }
  }, [loading, session, profile, navigate, options]);
};
