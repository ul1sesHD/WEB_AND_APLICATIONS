import type { Sb } from '../supabase/client';
import type { Visit, VisitInsert } from '../supabase/database.types';
import { calculateImpact } from '../helpers/calculateImpact';
import { toGeoPoint } from '../helpers/geo';
import { ServiceError, ok, fail, type Result } from './_base';

export type RegisterVisitArgs = {
  businessId: string;
  visitorId: string;
  kmDistance: number;
  reportedSpending?: number;
  mode?: 'manual' | 'gps';
  visitLngLat?: { lng: number; lat: number };
};

export const registerVisit = async (sb: Sb, args: RegisterVisitArgs): Promise<Result<Visit>> => {
  const { co2Kg } = calculateImpact(args.kmDistance, args.reportedSpending ?? 0);
  const payload: VisitInsert = {
    business_id:       args.businessId,
    visitor_id:        args.visitorId,
    km_distance:       args.kmDistance,
    co2_saved_kg:      co2Kg,
    reported_spending: args.reportedSpending ?? null,
    mode:              args.mode ?? 'manual',
    visit_location:    args.visitLngLat ? toGeoPoint(args.visitLngLat.lng, args.visitLngLat.lat) : null,
  };
  const { data, error } = await sb.from('visits').insert(payload).select().single();
  if (error) return fail(new ServiceError(error.message, 'visits_create_failed'));
  return ok(data);
};

export const listVisitsForUser = async (sb: Sb, visitorId: string, limit = 50): Promise<Result<Visit[]>> => {
  const { data, error } = await sb
    .from('visits')
    .select('*')
    .eq('visitor_id', visitorId)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) return fail(new ServiceError(error.message, 'visits_list_failed'));
  return ok(data ?? []);
};

export const listVisitsForBusiness = async (
  sb: Sb,
  businessId: string,
  limit = 100,
): Promise<Result<Visit[]>> => {
  const { data, error } = await sb
    .from('visits')
    .select('*')
    .eq('business_id', businessId)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) return fail(new ServiceError(error.message, 'visits_business_list_failed'));
  return ok(data ?? []);
};
