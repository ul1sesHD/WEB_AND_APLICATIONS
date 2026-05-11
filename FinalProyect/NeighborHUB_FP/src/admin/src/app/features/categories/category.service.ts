import { Injectable } from '@angular/core';
import { from, type Observable } from 'rxjs';
import { getSupabase, type Category, type CategoryInsert } from '@neighborhub/shared';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private sb = getSupabase();

  list(): Observable<Category[]> {
    return from((async () => {
      const { data, error } = await this.sb.from('categories').select('*').order('display_order', { ascending: true });
      if (error) throw error;
      return data ?? [];
    })());
  }

  getById(id: string): Observable<Category> {
    return from((async () => {
      const { data, error } = await this.sb.from('categories').select('*').eq('id', id).single();
      if (error) throw error;
      return data;
    })());
  }

  create(payload: CategoryInsert): Observable<Category> {
    return from((async () => {
      const { data, error } = await this.sb.from('categories').insert(payload).select().single();
      if (error) throw error;
      return data;
    })());
  }

  update(id: string, patch: Partial<Category>): Observable<Category> {
    return from((async () => {
      const { data, error } = await this.sb.from('categories').update(patch).eq('id', id).select().single();
      if (error) throw error;
      return data;
    })());
  }

  deactivate(id: string): Observable<void> {
    return from((async () => {
      const { error } = await this.sb.from('categories').update({ active: false }).eq('id', id);
      if (error) throw error;
    })());
  }
}
