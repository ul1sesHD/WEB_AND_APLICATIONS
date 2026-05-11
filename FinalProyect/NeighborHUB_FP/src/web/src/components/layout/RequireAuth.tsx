import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import type { UserRole } from '@neighborhub/shared';
import { useAuthStore } from '@/stores/authStore';
import { ROUTES } from '@/routes';

type Props = {
  children: ReactNode;
  role?:    UserRole | UserRole[];
};

const matchesRole = (role: UserRole | undefined, want: UserRole | UserRole[]): boolean => {
  if (!role) return false;
  return Array.isArray(want) ? want.includes(role) : role === want;
};

export const RequireAuth = ({ children, role }: Props) => {
  const { session, profile, loading } = useAuthStore();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <span className="font-body text-comal">Loading…</span>
      </div>
    );
  }

  if (!session) {
    return <Navigate to={ROUTES.login} state={{ from: location.pathname }} replace />;
  }

  if (role && !matchesRole(profile?.role, role)) {
    return <Navigate to={ROUTES.home} replace />;
  }

  return <>{children}</>;
};
