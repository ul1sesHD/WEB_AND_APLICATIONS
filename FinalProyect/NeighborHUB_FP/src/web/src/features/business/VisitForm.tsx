import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { calculateImpact, formatCO2, visitService } from '@neighborhub/shared';
import { getSupabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/stores/authStore';

const schema = z.object({
  km:       z.coerce.number().min(0, 'Must be 0 or more').max(200, 'Are you sure?'),
  spending: z.coerce.number().min(0, 'Must be 0 or more').max(50_000).optional(),
});
type Values = z.infer<typeof schema>;

type Props = {
  businessId: string;
  onDone:     () => void;
};

export const VisitForm = ({ businessId, onDone }: Props) => {
  const { profile } = useAuthStore();
  const qc          = useQueryClient();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register, handleSubmit, formState: { errors }, watch,
  } = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { km: 0, spending: undefined } });

  const km       = Number(watch('km'))       || 0;
  const spending = Number(watch('spending')) || 0;
  const impact   = useMemo(() => calculateImpact(km, spending), [km, spending]);
  const co2      = formatCO2(impact.co2Kg);

  const mutate = useMutation({
    mutationFn: async (values: Values) => {
      if (!profile) throw new Error('Sign in first.');
      const r = await visitService.registerVisit(getSupabase(), {
        businessId,
        visitorId:        profile.id,
        kmDistance:       values.km,
        reportedSpending: values.spending,
        mode:             'manual',
      });
      if (r.error) throw r.error;
      return r.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['businesses', 'detail', businessId] });
      qc.invalidateQueries({ queryKey: ['profiles', 'impact'] });
      onDone();
    },
    onError: (err) => setServerError(err instanceof Error ? err.message : 'Could not save visit.'),
  });

  const onSubmit = (values: Values): void => { mutate.mutate(values); };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        label="Kilometers travelled"
        type="number" step="0.1" min={0}
        {...register('km')}
        error={errors.km?.message}
      />
      <Input
        label="Pesos spent (optional)"
        type="number" step="1" min={0}
        {...register('spending')}
        error={errors.spending?.message}
      />

      <div className="bg-quellite/10 border border-quellite/30 rounded-md px-4 py-3">
        <p className="font-body text-xs uppercase tracking-wider text-adobe">This visit saves</p>
        <p className="font-display text-3xl tracking-wider text-quellite">
          {co2.value}
        </p>
        <p className="font-body text-sm text-adobe">{co2.equivalence}</p>
      </div>

      {serverError && <p className="text-toldo text-sm font-bold">{serverError}</p>}

      <Button type="submit" disabled={mutate.isPending} fullWidth>
        {mutate.isPending ? 'Saving…' : 'Register visit'}
      </Button>
    </form>
  );
};
