import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { User, Store, BarChart3, History, ExternalLink } from 'lucide-react';
import {
  businessService, visitService, useUserImpact,
  formatCO2, formatCurrency, type Visit,
} from '@neighborhub/shared';
import { getSupabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { ImpactCounter } from '@/components/impact/ImpactCounter';
import { ProfileEditor } from '@/features/profile/ProfileEditor';
import { ROUTES } from '@/routes';

type Tab = 'personal' | 'businesses' | 'stats' | 'history';

const TABS: { key: Tab; label: string; icon: typeof User }[] = [
  { key: 'personal',   label: 'Profile',    icon: User },
  { key: 'businesses', label: 'Businesses', icon: Store },
  { key: 'stats',      label: 'Stats',      icon: BarChart3 },
  { key: 'history',    label: 'History',    icon: History },
];

const TabBar = ({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) => (
  <div className="flex border-b border-comal/15 overflow-x-auto">
    {TABS.map(({ key, label, icon: Icon }) => (
      <button key={key} type="button" onClick={() => onChange(key)}
        className={[
          'flex items-center gap-1.5 px-4 py-3 font-body text-sm whitespace-nowrap transition-colors border-b-2',
          active === key ? 'border-toldo text-toldo font-bold' : 'border-transparent text-adobe hover:text-comal',
        ].join(' ')}>
        <Icon size={16} /> {label}
      </button>
    ))}
  </div>
);

const MyBusinesses = ({ ownerId }: { ownerId: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['businesses', 'owner', ownerId],
    queryFn: async () => {
      const r = await businessService.listBusinesses(getSupabase(), {});
      if (r.error) throw r.error;
      return r.data.filter((b) => b.owner_profile_id === ownerId);
    },
  });

  if (isLoading) return <div className="flex flex-col gap-3">{[1,2].map((i) => <Skeleton key={i} className="h-20" />)}</div>;

  const items = data ?? [];
  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <Store size={32} className="text-comal/30 mx-auto mb-2" />
        <p className="font-body text-adobe">You haven't registered any businesses yet.</p>
        <Link to={ROUTES.registerBusiness}>
          <Button variant="outline" size="sm" className="mt-3">Register a Business</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {items.map((b) => (
        <Link key={b.id} to={ROUTES.businessDetail(b.id)}>
          <Card>
            <div className="flex items-center gap-3">
              {b.photo_url ? (
                <img src={b.photo_url} alt="" className="w-14 h-14 rounded-md object-cover" />
              ) : (
                <div className="w-14 h-14 rounded-md bg-comal/10 flex items-center justify-center">
                  <Store size={24} className="text-comal/40" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-body font-bold text-comal truncate">{b.name}</p>
                <p className="font-body text-sm text-adobe">{b.category_name} · {b.status}</p>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

const StatsTab = ({ userId }: { userId: string }) => {
  const { data, isLoading } = useUserImpact(userId);
  if (isLoading) return <div className="flex flex-col gap-3">{[1,2,3].map((i) => <Skeleton key={i} className="h-24" />)}</div>;

  const co2 = formatCO2(data?.total_co2_saved_kg ?? 0);

  return (
    <div className="grid grid-cols-3 gap-3">
      <Card accentColor="#27AE60">
        <ImpactCounter value={data?.total_visits ?? 0} label="Visits" color="#27AE60" />
      </Card>
      <Card accentColor="#C0392B">
        <ImpactCounter value={Number(co2.value)} label="kg CO₂" suffix="" color="#C0392B" />
      </Card>
      <Card accentColor="#E67E22">
        <ImpactCounter value={Math.round(data?.total_local_spending ?? 0)} label="Pesos" suffix="" color="#E67E22" />
      </Card>
    </div>
  );
};

const VisitHistory = ({ userId }: { userId: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['visits', 'user', userId],
    queryFn: async () => {
      const r = await visitService.listVisitsForUser(getSupabase(), userId, 20);
      if (r.error) throw r.error;
      return r.data;
    },
  });

  if (isLoading) return <div className="flex flex-col gap-2">{[1,2,3].map((i) => <Skeleton key={i} className="h-14" />)}</div>;

  const visits = data ?? [];
  if (visits.length === 0) return <p className="font-body text-adobe text-center py-8">No visits recorded yet.</p>;

  return (
    <ul className="flex flex-col gap-2">
      {visits.map((v: Visit) => (
        <li key={v.id} className="bg-paper border border-comal/10 rounded-md px-4 py-3 flex items-center justify-between">
          <div>
            <p className="font-body text-sm text-comal font-bold">{v.business_id.slice(0, 8)}...</p>
            <p className="font-body text-xs text-adobe">
              {formatDistanceToNow(new Date(v.created_at), { addSuffix: true })}
            </p>
          </div>
          <div className="text-right">
            <p className="font-body text-sm text-comal">{v.km_distance} km</p>
            <p className="font-body text-xs text-quellite">{v.co2_saved_kg.toFixed(2)} kg CO₂</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export const ProfilePage = () => {
  const [tab, setTab] = useState<Tab>('personal');
  const { profile } = useAuthStore();

  if (!profile) return null;

  return (
    <div className="max-w-3xl mx-auto w-full flex flex-col">
      <header className="px-4 py-6">
        <h1 className="font-display text-3xl tracking-wider text-comal">YOUR PROFILE</h1>
      </header>

      <TabBar active={tab} onChange={setTab} />

      <div className="px-4 py-6">
        {tab === 'personal'   && <ProfileEditor />}
        {tab === 'businesses' && <MyBusinesses ownerId={profile.id} />}
        {tab === 'stats'      && <StatsTab userId={profile.id} />}
        {tab === 'history'    && <VisitHistory userId={profile.id} />}
      </div>

      {profile.role === 'admin' && (
        <div className="px-4 pb-6">
          <Link to={ROUTES.adminLink}>
            <Button variant="outline" fullWidth>
              Open Admin Panel <ExternalLink size={14} className="inline ml-1" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
