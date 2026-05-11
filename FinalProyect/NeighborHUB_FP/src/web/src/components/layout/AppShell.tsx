import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { ROUTES } from '@/routes';
import { Logo } from '@/components/brand/Logo';

type Props = { children: ReactNode };

export const AppShell = ({ children }: Props) => {
  const { session, signOut } = useAuthStore();
  const { pathname }         = useLocation();
  const isLanding            = pathname === ROUTES.landing;

  return (
    <div className="min-h-screen flex flex-col bg-paper text-comal">
      {!isLanding && (
        <header className="border-b border-comal/10 bg-paper sticky top-0 z-30">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link to={session ? ROUTES.home : ROUTES.landing} className="flex items-center gap-2">
              <Logo size="sm" />
            </Link>
            <nav className="flex items-center gap-3 font-body text-sm">
              {session ? (
                <>
                  <Link to={ROUTES.profile} className="flex items-center gap-1 hover:text-toldo">
                    <UserIcon size={16} />
                    <span className="hidden sm:inline">Profile</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => void signOut()}
                    className="flex items-center gap-1 hover:text-toldo"
                  >
                    <LogOut size={16} />
                    <span className="hidden sm:inline">Sign out</span>
                  </button>
                </>
              ) : (
                <Link to={ROUTES.login} className="flex items-center gap-1 hover:text-toldo">
                  <LogIn size={16} />
                  <span>Sign in</span>
                </Link>
              )}
            </nav>
          </div>
        </header>
      )}
      <main className="flex-1">{children}</main>
    </div>
  );
};
