import { Injectable } from '@angular/core';
import { from, type Observable } from 'rxjs';
import { getSupabase, type Business, type BusinessInsert, type BusinessUpdate, type BusinessDirectoryRow, type AdminPendingRow } from '@neighborhub/shared';

@Injectable({ providedIn: 'root' })
export class BusinessService {
  private sb = getSupabase();

  list(filters: { status?: string; category?: string; search?: string } = {}): Observable<BusinessDirectoryRow[]> {
    return from((async () => {
      let q = this.sb.from('v_business_directory').select('*').order('created_at', { ascending: false });
      if (filters.status && filters.status !== 'all') q = q.eq('status', filters.status as any);
      if (filters.category)                           q = q.eq('category_id', filters.category);
      if (filters.search)                             q = q.ilike('name', `%${filters.search}%`);
      const { data, error } = await q;
      if (error) throw error;
      return data ?? [];
    })());
  }

  listPending(): Observable<AdminPendingRow[]> {
    return from((async () => {
      const { data, error } = await this.sb.from('v_admin_pending').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data ?? [];
    })());
  }

  getById(id: string): Observable<Business> {
    return from((async () => {
      const { data, error } = await this.sb.from('businesses').select('*').eq('id', id).single();
      if (error) throw error;
      return data;
    })());
  }

  create(payload: BusinessInsert): Observable<Business> {
    return from((async () => {
      const { data, error } = await this.sb.from('businesses').insert(payload).select().single();
      if (error) throw error;
      return data;
    })());
  }

  update(id: string, patch: BusinessUpdate): Observable<Business> {
    return from((async () => {
      const { data, error } = await this.sb.from('businesses').update(patch).eq('id', id).select().single();
      if (error) throw error;
      return data;
    })());
  }

  approve(id: string): Observable<Business> {
    return this.update(id, { status: 'active' });
  }

  suspend(id: string): Observable<Business> {
    return this.update(id, { status: 'suspended' });
  }

  softDelete(id: string): Observable<void> {
    return from((async () => {
      const { error } = await this.sb.from('businesses').update({ deleted_at: new Date().toISOString() }).eq('id', id);
      if (error) throw error;
    })());
  }
}
