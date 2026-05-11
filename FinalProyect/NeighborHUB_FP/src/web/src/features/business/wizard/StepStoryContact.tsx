import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { DAYS, DEFAULT_HOURS, type FormData } from './schema';

export const StepStoryContact = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const { register, watch, setValue } = useFormContext<FormData>();
  const hours = watch('hours') ?? DEFAULT_HOURS;

  const toggleDay = (day: typeof DAYS[number]) => {
    const current = (hours as Record<string, unknown>)[day];
    const isClosed = current && typeof current === 'object' && 'closed' in current;
    const next = isClosed ? { open: '08:00', close: '18:00' } : { closed: true as const };
    setValue('hours', { ...hours, [day]: next } as FormData['hours']);
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <label className="font-body font-bold text-comal text-sm uppercase tracking-wide">Story</label>
        <textarea {...register('story')} rows={3}
          className="w-full bg-paper border-2 border-comal/30 rounded-sharp px-4 py-3 font-body text-comal placeholder-comal/40 focus:outline-none focus:border-toldo mt-1" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input label="Phone" {...register('phone')} />
        <Input label="WhatsApp" {...register('whatsapp')} />
      </div>
      <Input label="Website" {...register('website')} />

      <div>
        <p className="font-body font-bold text-comal text-sm uppercase tracking-wide mb-2">Hours</p>
        <div className="flex flex-col gap-2">
          {DAYS.map((day) => {
            const val = (hours as Record<string, unknown>)[day];
            const isClosed = val && typeof val === 'object' && 'closed' in val;
            return (
              <div key={day} className="flex items-center gap-2">
                <span className="font-body text-sm text-comal w-20 capitalize">{day}</span>
                <button type="button" onClick={() => toggleDay(day)}
                  className={`px-2 py-0.5 rounded-full text-xs font-body ${isClosed ? 'bg-toldo/15 text-toldo' : 'bg-quellite/15 text-quellite'}`}>
                  {isClosed ? 'Closed' : 'Open'}
                </button>
                {!isClosed && (() => {
                  const cur = (hours as Record<string, { open?: string; close?: string }>)[day] ?? {};
                  return (
                    <div className="flex items-center gap-1 text-sm font-body">
                      <input type="time" defaultValue={cur.open ?? '08:00'}
                        onChange={(e) => setValue('hours', { ...hours, [day]: { open: e.target.value, close: cur.close ?? '18:00' } } as FormData['hours'])}
                        className="bg-paper border border-comal/20 rounded px-1 py-0.5" />
                      <span>–</span>
                      <input type="time" defaultValue={cur.close ?? '18:00'}
                        onChange={(e) => setValue('hours', { ...hours, [day]: { open: cur.open ?? '08:00', close: e.target.value } } as FormData['hours'])}
                        className="bg-paper border border-comal/20 rounded px-1 py-0.5" />
                    </div>
                  );
                })()}
              </div>
            );
          })}
        </div>
      </div>

      <label className="flex items-center gap-2 font-body text-comal">
        <input type="checkbox" {...register('isEcoFriendly')} className="accent-quellite w-4 h-4" />
        Eco-friendly business
      </label>
      {watch('isEcoFriendly') && (
        <textarea {...register('ecoPractices')} rows={2} placeholder="Describe your eco practices..."
          className="w-full bg-paper border-2 border-comal/30 rounded-sharp px-4 py-3 font-body text-comal placeholder-comal/40 focus:outline-none focus:border-toldo" />
      )}

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} fullWidth>Back</Button>
        <Button onClick={onNext} fullWidth>Next</Button>
      </div>
    </div>
  );
};
