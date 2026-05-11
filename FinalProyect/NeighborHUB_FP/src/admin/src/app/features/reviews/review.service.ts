import { Injectable } from '@angular/core';
import { from, type Observable } from 'rxjs';
import { getSupabase, type Review } from '@neighborhub/shared';

type ReviewRow = Review & {
  business?: { name: string } | null;
  author?: { name: string; avatar_url: string | null } | null;
};

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private sb = getSupabase();

  list(filters: { businessId?: string } = {}): Observable<ReviewRow[]> {
    return from((async () => {
      let q = this.sb.from('reviews')
        .select('*, business:businesses!reviews_business_id_fkey(name), author:profiles!reviews_author_id_fkey(name,avatar_url)')
        .order('created_at', { ascending: false });
      if (filters.businessId) q = q.eq('business_id', filters.businessId);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as unknown as ReviewRow[];
    })());
  }

  getById(id: string): Observable<ReviewRow> {
    return from((async () => {
      const { data, error } = await this.sb.from('reviews')
        .select('*, business:businesses!reviews_business_id_fkey(name), author:profiles!reviews_author_id_fkey(name,avatar_url)')
        .eq('id', id).single();
      if (error) throw error;
      return data as unknown as ReviewRow;
    })());
  }

  toggleActive(id: string, active: boolean): Observable<Review> {
    return from((async () => {
      const { data, error } = await this.sb.from('reviews').update({ active }).eq('id', id).select().single();
      if (error) throw error;
      return data;
    })());
  }

  softDelete(id: string): Observable<void> {
    return from((async () => {
      const { error } = await this.sb.from('reviews').update({ active: false }).eq('id', id);
      if (error) throw error;
    })());
  }
}
