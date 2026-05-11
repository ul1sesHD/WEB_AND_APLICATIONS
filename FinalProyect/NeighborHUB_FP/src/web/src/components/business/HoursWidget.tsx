import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { isOpenNow, type BusinessHours, type DayName } from '@neighborhub/shared';

type Props = { hours: BusinessHours };

const DAY_LABELS: Record<DayName, string> = {
  monday:    'Mon',
  tuesday:   'Tue',
  wednesday: 'Wed',
  thursday:  'Thu',
  friday:    'Fri',
  saturday:  'Sat',
  sunday:    'Sun',
};

const ORDER: DayName[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const slotText = (slot: BusinessHours[DayName]): string =>
  'closed' in slot ? 'Closed' : `${slot.open} – ${slot.close}`;

export const HoursWidget = ({ hours }: Props) => {
  const [open, setOpen] = useState(false);
  const status = isOpenNow(hours);

  return (
    <div className="border border-comal/15 rounded-md bg-paper">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 focus:outline-none"
      >
        <span className={`font-body font-bold ${status.open ? 'text-quellite' : 'text-toldo'}`}>
          {status.message}
        </span>
        <ChevronDown
          size={18}
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <ul className="border-t border-comal/10 divide-y divide-comal/10">
          {ORDER.map((day) => (
            <li key={day} className="flex justify-between px-4 py-2 font-body text-sm">
              <span className="text-adobe uppercase tracking-wide">{DAY_LABELS[day]}</span>
              <span className="text-comal">{slotText(hours[day])}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
