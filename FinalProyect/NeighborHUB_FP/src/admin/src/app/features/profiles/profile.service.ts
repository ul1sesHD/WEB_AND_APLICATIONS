import { Injectable } from '@angular/core';
import { from, type Observable } from 'rxjs';
import { getSupabase, type Profile, type ProfileUpdate } from '@neighborhub/shared';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private sb = getSupabase();

  list(filters: { search?: string; role?: string } = {}): Observable<Profile[]> {
    return from((async () => {
      let q = this.sb.from('profiles').select('*').is('deleted_at', null).order('created_at', { ascending: false });
      if (filters.search) q = q.ilike('name', `%${filters.search}%`);
      if (filters.role)   q = q.eq('role', filters.role as any);
      const { data, error } = await q;
      if (error) throw error;
      return data ?? [];
    })());
  }

  getById(id: string): Observable<Profile> {
    return from((async () => {
      const { data, error } = await this.sb.from('profiles').select('*').eq('id', id).single();
      if (error) throw error;
      return data;
    })());
  }

  update(id: string, patch: ProfileUpdate): Observable<Profile> {
    return from((async () => {
      const { data, error } = await this.sb.from('profiles').update(patch).eq('id', id).select().single();
      if (error) throw error;
      return data;
    })());
  }

  softDelete(id: string): Observable<void> {
    return from((async () => {
      const { error } = await this.sb.from('profiles').update({ deleted_at: new Date().toISOString(), active: false }).eq('id', id);
      if (error) throw error;
    })());
  }
}
