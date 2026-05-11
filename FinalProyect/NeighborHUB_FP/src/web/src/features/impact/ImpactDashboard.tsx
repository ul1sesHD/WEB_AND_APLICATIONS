import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { differenceInDays, subDays, format, isAfter } from 'date-fns';
import { TreePine, Car, ShoppingBag, Share2 } from 'lucide-react';
import {
  useUserImpact, visitService, calculateImpact,
  formatCO2, formatCurrency, type Visit,
} from '@neighborhub/shared';
import { getSupabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';
import { Card } from '@/components/ui/Card';
import { ImpactCounter } from '@/components/impact/ImpactCounter';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';

type Period = 'week' | 'month' | 'all';

const PERIOD_DAYS: Record<Period, number> = { week: 7, month: 30, all: 9999 };

const PeriodTabs = ({ active, onChange }: { active: Period; onChange: (p: Period) => void }) => (
  <div className="flex bg-comal/10 rounded-full p-0.5">
    {(['week', 'month', 'all'] as const).map((p) => (
      <button key={p} type="button" onClick={() => onChange(p)}
        className={[
          'flex-1 py-1.5 px-4 rounded-full font-body text-sm capitalize transition-colors',
          active === p ? 'bg-paper text-comal shadow-sm font-bold' : 'text-adobe hover:text-comal',
        ].join(' ')}>
        {p === 'all' ? 'All time' : p}
      </button>
    ))}
  </div>
);

// CSS bar chart
const BarChart = ({ data, color }: { data: { label: string; value: number }[]; color: string }) => {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex items-end gap-1 h-32">
      {data.map((d) => (
        <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
          <span className="font-body text-[10px] text-adobe">{d.value > 0 ? d.value.toFixed(1) : ''}</span>
          <div className="w-full rounded-t-sm transition-all" style={{
            height: `${Math.max((d.value / max) * 100, 2)}%`,
            backgroundColor: d.value > 0 ? color : 'rgba(0,0,0,0.05)',
          }} />
          <span className="font-body text-[10px] text-adobe">{d.label}</span>
        </div>
      ))}
    </div>
  );
};

// CSS donut chart
const DonutChart = ({ segments }: { segments: { label: string; value: number; color: string }[] }) => {
  const total = segments.reduce((s, d) => s + d.value, 0) || 1;
  let cumulative = 0;
  const gradientStops = segments.flatMap((s) => {
    const start = (cumulative / total) * 360;
    cumulative += s.value;
    const end = (cumulative / total) * 360;
    return [`${s.color} ${start}deg ${end}deg`];
  });

  return (
    <div className="flex items-center gap-4">
      <div className="w-28 h-28 rounded-full flex-shrink-0"
        style={{
          background: segments.length > 0 ? `conic-gradient(${gradientStops.join(', ')})` : '#e5e5e5',
          WebkitMask: 'radial-gradient(circle, transparent 42%, black 43%)',
          mask: 'radial-gradient(circle, transparent 42%, black 43%)',
        }} />
      <div className="flex flex-col gap-1">
        {segments.filter((s) => s.value > 0).slice(0, 5).map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: s.color }} />
            <span className="font-body text-xs text-comal">{s.label}</span>
            <span className="font-body text-xs text-adobe">{formatCurrency(s.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const EQUIVALENCE_ICONS = [
  { icon: TreePine,    calc: (co2: number) => (co2 / 21).toFixed(1), label: 'trees planted' },
  { icon: Car,         calc: (co2: number) => (co2 / 0.21).toFixed(0), label: 'km not driven' },
  { icon: ShoppingBag, calc: (co2: number) => Math.round(co2 / 2.5).toString(), label: 'supermarket trips replaced' },
];

export const ImpactDashboard = () => {
  const [period, setPeriod] = useState<Period>('month');
  const { profile } = useAuthStore();
  const userId = profile?.id ?? '';

  const impact = useUserImpact(userId);
  const { data: visits = [], isLoading: loadingVisits } = useQuery({
    queryKey: ['visits', 'user', userId, 'impact'],
    queryFn: async () => {
      const r = await visitService.listVisitsForUser(getSupabase(), userId, 200);
      if (r.error) throw r.error;
      return r.data;
    },
    enabled: Boolean(userId),
  });

  const cutoff = subDays(new Date(), PERIOD_DAYS[period]);
  const filtered = useMemo(
    () => visits.filter((v: Visit) => period === 'all' || isAfter(new Date(v.created_at), cutoff)),
    [visits, period, cutoff],
  );

  // Aggregate data for period
  const periodStats = useMemo(() => {
    let co2 = 0, spend = 0, km = 0;
    for (const v of filtered) {
      co2 += v.co2_saved_kg;
      spend += v.reported_spending ?? 0;
      km += v.km_distance;
    }
    return { co2, spend, km, count: filtered.length };
  }, [filtered]);

  // Daily CO2 for bar chart
  const dailyCo2 = useMemo(() => {
    const days = Math.min(PERIOD_DAYS[period], 14);
    const now = new Date();
    return Array.from({ length: days }, (_, i) => {
      const date = subDays(now, days - 1 - i);
      const dayVisits = filtered.filter((v: Visit) => {
        const d = new Date(v.created_at);
        return d.toDateString() === date.toDateString();
      });
      return {
        label: format(date, 'd'),
        value: dayVisits.reduce((s: number, v: Visit) => s + v.co2_saved_kg, 0),
      };
    });
  }, [filtered, period]);

  // Spending donut by category (simplified: group by business_id first chars as proxy)
  const COLORS = ['#C0392B', '#27AE60', '#2980B9', '#E67E22', '#8E44AD', '#16A085'] as const;
  const spendingSegments = useMemo(() => {
    const groups = new Map<string, number>();
    for (const v of filtered) {
      const key = v.business_id.slice(0, 6);
      groups.set(key, (groups.get(key) ?? 0) + (v.reported_spending ?? 0));
    }
    return Array.from(groups.entries()).map(([id, val], i) => ({
      label: `Business ${id}...`,
      value: val,
      color: COLORS[i % COLORS.length] as string,
    }));
  }, [filtered]);

  const co2 = formatCO2(periodStats.co2);
  const isLoading = impact.isLoading || loadingVisits;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-32" />
        <Skeleton className="h-8" />
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Hero stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card accentColor="#C0392B">
          <ImpactCounter value={Number(co2.value)} label="kg CO₂" color="#C0392B" />
        </Card>
        <Card accentColor="#E67E22">
          <ImpactCounter value={Math.round(periodStats.spend)} label="Pesos" color="#E67E22" />
        </Card>
        <Card accentColor="#27AE60">
          <ImpactCounter value={periodStats.count} label="Visits" color="#27AE60" />
        </Card>
      </div>

      <PeriodTabs active={period} onChange={setPeriod} />

      {/* CO2 line chart */}
      <Card>
        <h3 className="font-display text-lg tracking-wider text-comal mb-3">DAILY CO₂ SAVED</h3>
        <BarChart data={dailyCo2} color="#C0392B" />
      </Card>

      {/* Spending donut */}
      <Card>
        <h3 className="font-display text-lg tracking-wider text-comal mb-3">SPENDING BREAKDOWN</h3>
        {spendingSegments.length > 0 ? (
          <DonutChart segments={spendingSegments} />
        ) : (
          <p className="font-body text-adobe text-sm">No spending data for this period.</p>
        )}
      </Card>

      {/* Equivalences */}
      <div className="bg-quellite/10 rounded-md px-5 py-4">
        <p className="font-body text-xs uppercase tracking-widest text-adobe mb-3">Your impact equals</p>
        <div className="flex gap-4">
          {EQUIVALENCE_ICONS.map(({ icon: Icon, calc, label }) => (
            <div key={label} className="flex-1 flex flex-col items-center text-center gap-1">
              <Icon size={20} className="text-quellite" />
              <span className="font-display text-xl text-comal">{calc(periodStats.co2)}</span>
              <span className="font-body text-[10px] text-adobe leading-tight">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Share */}
      <Button variant="outline" fullWidth>
        <Share2 size={16} className="inline mr-1" /> Share my Impact
      </Button>
    </div>
  );
};
