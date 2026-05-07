import type { BusinessHours, BusinessDay, DayName } from '../supabase/database.types';

export type OpenStatus = { open: boolean; message: string };

const ORDER: readonly DayName[] = [
  'sunday', 'monday', 'tuesday', 'wednesday',
  'thursday', 'friday', 'saturday',
] as const;

const toMinutes = (hhmm: string): number => {
  const [h = '0', m = '0'] = hhmm.split(':');
  return parseInt(h, 10) * 60 + parseInt(m, 10);
};

const isClosed = (d: BusinessDay): d is { closed: true } => 'closed' in d;

const findNextOpen = (
  hours: BusinessHours,
  fromIndex: number,
): { day: DayName; open: string } | null => {
  for (let i = 1; i <= 7; i++) {
    const day = ORDER[(fromIndex + i) % 7]!;
    const slot = hours[day];
    if (!isClosed(slot)) return { day, open: slot.open };
  }
  return null;
};

export const isOpenNow = (hours: BusinessHours, now: Date = new Date()): OpenStatus => {
  const todayIndex = now.getDay();
  const today      = ORDER[todayIndex]!;
  const slot       = hours[today];
  const minutes    = now.getHours() * 60 + now.getMinutes();

  if (!isClosed(slot)) {
    const opens  = toMinutes(slot.open);
    const closes = toMinutes(slot.close);
    if (minutes >= opens && minutes < closes) {
      return { open: true, message: `Open · closes at ${slot.close}` };
    }
    if (minutes < opens) {
      return { open: false, message: `Closed · opens today at ${slot.open}` };
    }
  }

  const next = findNextOpen(hours, todayIndex);
  if (!next) return { open: false, message: 'Closed' };
  return { open: false, message: `Closed · opens ${next.day} at ${next.open}` };
};
