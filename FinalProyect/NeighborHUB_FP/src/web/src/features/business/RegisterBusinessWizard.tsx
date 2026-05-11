import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { CheckCircle } from 'lucide-react';
import { businessService } from '@neighborhub/shared';
import { getSupabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';
import { StepIndicator } from '@/features/auth/StepIndicator';
import { schema, DEFAULT_HOURS, type FormData } from './wizard/schema';
import { StepBasics } from './wizard/StepBasics';
import { StepStoryContact } from './wizard/StepStoryContact';
import { StepLocation } from './wizard/StepLocation';

const SuccessScreen = () => (
  <div className="flex flex-col items-center text-center gap-4 py-8">
    <CheckCircle size={64} className="text-quellite" />
    <h2 className="font-display text-3xl tracking-wider text-comal">BUSINESS REGISTERED</h2>
    <p className="font-body text-adobe max-w-sm">
      Your business is awaiting community verification. 5 neighbors must confirm before it goes live.
    </p>
  </div>
);

export const RegisterBusinessWizard = () => {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const { profile } = useAuthStore();

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      isEcoFriendly: false,
      hours: DEFAULT_HOURS as FormData['hours'],
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const sb = getSupabase();
      const r = await businessService.createBusiness(sb, {
        owner_id:              profile!.id,
        category_id:           data.categoryId,
        name:                  data.name,
        description:           data.description ?? null,
        story:                 data.story ?? null,
        vendor_quote:          data.vendorQuote ?? null,
        vendor_name:           data.vendorName ?? null,
        phone:                 data.phone ?? null,
        whatsapp:              data.whatsapp ?? null,
        website:               data.website ?? null,
        address:               data.address,
        neighborhood:          data.neighborhood,
        landmark:              data.landmark ?? null,
        hours:                 (data.hours ?? null) as never,
        years_in_neighborhood: data.yearsInNeighborhood ?? null,
        is_eco_friendly:       data.isEcoFriendly,
        eco_practices:         data.ecoPractices ?? null,
        photo_url:             null,
        hero_photo_url:        null,
        location:              'POINT(-99.1332 19.4326)',
        city:                  'CDMX',
        status:                'pending',
      });
      if (r.error) throw r.error;
      return r.data;
    },
    onSuccess: () => setDone(true),
  });

  const handleNext = async () => {
    const fieldsPerStep: Record<number, (keyof FormData)[]> = {
      1: ['name', 'categoryId'],
      2: [],
      3: ['address', 'neighborhood'],
    };
    const valid = await methods.trigger(fieldsPerStep[step]);
    if (valid) setStep((s) => s + 1);
  };

  const handleSubmit = methods.handleSubmit((data) => mutation.mutate(data));

  if (done) return <SuccessScreen />;

  return (
    <FormProvider {...methods}>
      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-6">
        <StepIndicator current={step} total={3} />

        <h2 className="font-display text-xl tracking-wider text-comal text-center">
          {step === 1 && 'BUSINESS BASICS'}
          {step === 2 && 'STORY & CONTACT'}
          {step === 3 && 'LOCATION'}
        </h2>

        {mutation.isError && (
          <p className="text-toldo text-sm font-body font-bold text-center">
            {(mutation.error as Error).message}
          </p>
        )}

        {step === 1 && <StepBasics onNext={handleNext} />}
        {step === 2 && <StepStoryContact onNext={handleNext} onBack={() => setStep(1)} />}
        {step === 3 && <StepLocation onBack={() => setStep(2)} onSubmit={handleSubmit} isPending={mutation.isPending} />}
      </form>
    </FormProvider>
  );
};
