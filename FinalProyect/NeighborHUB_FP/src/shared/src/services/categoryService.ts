import type { Sb } from '../supabase/client';
import type { Category, CategoryInsert } from '../supabase/database.types';
import { ServiceError, ok, fail, type Result } from './_base';

export const listCategories = async (sb: Sb): Promise<Result<Category[]>> => {
  const { data, error } = await sb
    .from('categories')
    .select('*')
    .eq('active', true)
    .order('display_order', { ascending: true });
  if (error) return fail(new ServiceError(error.message, 'categories_list_failed'));
  return ok(data ?? []);
};

export const getCategory = async (sb: Sb, id: string): Promise<Result<Category>> => {
  const { data, error } = await sb.from('categories').select('*').eq('id', id).maybeSingle();
  if (error) return fail(new ServiceError(error.message, 'categories_get_failed'));
  if (!data) return fail(new ServiceError('Category not found', 'categories_not_found', 404));
  return ok(data);
};

export const createCategory = async (sb: Sb, payload: CategoryInsert): Promise<Result<Category>> => {
  const { data, error } = await sb.from('categories').insert(payload).select().single();
  if (error) return fail(new ServiceError(error.message, 'categories_create_failed'));
  return ok(data);
};

export const updateCategory = async (
  sb: Sb,
  id: string,
  patch: Partial<Category>,
): Promise<Result<Category>> => {
  const { data, error } = await sb.from('categories').update(patch).eq('id', id).select().single();
  if (error) return fail(new ServiceError(error.message, 'categories_update_failed'));
  return ok(data);
};

export const deactivateCategory = (sb: Sb, id: string): Promise<Result<Category>> =>
  updateCategory(sb, id, { active: false });
