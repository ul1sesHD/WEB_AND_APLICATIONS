import { Injectable } from '@angular/core';
import { from, type Observable } from 'rxjs';
import { getSupabase, type Visit, type UserImpactRow } from '@neighborhub/shared';

type VisitRow = Visit & {
  business?: { name: string } | null;
  visitor?: { name: string } | null;
};

@Injectable({ providedIn: 'root' })
export class VisitService {
  private sb = getSupabase();

  list(filters: { businessId?: string; userId?: string; limit?: number } = {}): Observable<VisitRow[]> {
    return from((async () => {
      let q = this.sb.from('visits')
        .select('*, business:businesses!visits_business_id_fkey(name), visitor:profiles!visits_visitor_id_fkey(name)')
        .order('created_at', { ascending: false })
        .limit(filters.limit ?? 100);
      if (filters.businessId) q = q.eq('business_id', filters.businessId);
      if (filters.userId)     q = q.eq('visitor_id', filters.userId);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as unknown as VisitRow[];
    })());
  }

  getAggregates(): Observable<{ totalKm: number; totalCo2: number; totalVisits: number; topBusinesses: any[] }> {
    return from((async () => {
      const [vRes, impactRes] = await Promise.all([
        this.sb.from('visits').select('km_distance, co2_saved_kg'),
        this.sb.from('v_user_impact').select('*').order('total_visits', { ascending: false }).limit(10),
      ]);
      const visits = vRes.data ?? [];
      const totalKm = visits.reduce((s, v) => s + v.km_distance, 0);
      const totalCo2 = visits.reduce((s, v) => s + v.co2_saved_kg, 0);
      return {
        totalKm: Math.round(totalKm * 10) / 10,
        totalCo2: Math.round(totalCo2 * 10) / 10,
        totalVisits: visits.length,
        topBusinesses: impactRes.data ?? [],
      };
    })());
  }
}
