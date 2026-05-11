import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { RequireAuth } from '@/components/layout/RequireAuth';
import { useAuthStore } from '@/stores/authStore';
import { ROUTES } from '@/routes';

import { LandingPage }          from '@/pages/LandingPage';
import { LoginPage }            from '@/pages/LoginPage';
import { RegisterPage }         from '@/pages/RegisterPage';
import { HomePage }             from '@/pages/HomePage';
import { ExplorePage }          from '@/pages/ExplorePage';
import { BusinessDetailPage }   from '@/pages/BusinessDetailPage';
import { RegisterBusinessPage } from '@/pages/RegisterBusinessPage';
import { CircularPage }         from '@/pages/CircularPage';
import { ProfilePage }          from '@/pages/ProfilePage';
import { WhyLocalPage }         from '@/pages/WhyLocalPage';
import { MyImpactPage }         from '@/pages/MyImpactPage';
import { AdminLinkPage }        from '@/pages/AdminLinkPage';

export const App = () => {
  const initialize = useAuthStore((s) => s.initialize);

  useEffect(() => { void initialize(); }, [initialize]);

  return (
    <AppShell>
      <Routes>
        <Route path={ROUTES.landing}  element={<LandingPage />} />
        <Route path={ROUTES.login}    element={<LoginPage />} />
        <Route path={ROUTES.register} element={<RegisterPage />} />
        <Route path={ROUTES.whyLocal} element={<WhyLocalPage />} />

        <Route
          path={ROUTES.home}
          element={<RequireAuth><HomePage /></RequireAuth>}
        />
        <Route
          path={ROUTES.explore}
          element={<RequireAuth><ExplorePage /></RequireAuth>}
        />
        <Route
          path="/business/:id"
          element={<RequireAuth><BusinessDetailPage /></RequireAuth>}
        />
        <Route
          path={ROUTES.registerBusiness}
          element={<RequireAuth role={['vendor', 'admin']}><RegisterBusinessPage /></RequireAuth>}
        />
        <Route
          path={ROUTES.circular}
          element={<RequireAuth><CircularPage /></RequireAuth>}
        />
        <Route
          path={ROUTES.profile}
          element={<RequireAuth><ProfilePage /></RequireAuth>}
        />
        <Route
          path={ROUTES.myImpact}
          element={<RequireAuth><MyImpactPage /></RequireAuth>}
        />
        <Route
          path={ROUTES.adminLink}
          element={<RequireAuth role="admin"><AdminLinkPage /></RequireAuth>}
        />

        <Route path="*" element={<Navigate to={ROUTES.landing} replace />} />
      </Routes>
    </AppShell>
  );
};
