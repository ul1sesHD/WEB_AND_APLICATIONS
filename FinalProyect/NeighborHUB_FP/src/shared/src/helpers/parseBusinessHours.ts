import type { BusinessHours, BusinessDay, DayName } from '../supabase/database.types';

const DAY_NAMES: readonly DayName[] = [
  'monday', 'tuesday', 'wednesday', 'thursday',
  'friday', 'saturday', 'sunday',
] as const;

const TIME_RE = /^\d{2}:\d{2}$/;

const parseDay = (raw: unknown): BusinessDay | null => {
  if (!raw || typeof raw !== 'object') return null;
  const day = raw as Record<string, unknown>;
  if (day['closed'] === true) return { closed: true };
  const open  = day['open'];
  const close = day['close'];
  if (typeof open === 'string' && typeof close === 'string' && TIME_RE.test(open) && TIME_RE.test(close)) {
    return { open, close };
  }
  return null;
};

export const parseBusinessHours = (json: unknown): BusinessHours | null => {
  if (!json || typeof json !== 'object') return null;
  const source = json as Record<string, unknown>;
  const result: Partial<BusinessHours> = {};
  for (const day of DAY_NAMES) {
    const parsed = parseDay(source[day]);
    if (!parsed) return null;
    result[day] = parsed;
  }
  return result as BusinessHours;
};
