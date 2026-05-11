import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import type { FormData } from './schema';

export const StepLocation = ({ onBack, onSubmit, isPending }: { onBack: () => void; onSubmit: () => void; isPending: boolean }) => {
  const { register, formState: { errors } } = useFormContext<FormData>();

  return (
    <div className="flex flex-col gap-5">
      <Input label="Address" {...register('address')} error={errors.address?.message} />
      <Input label="Neighborhood" {...register('neighborhood')} error={errors.neighborhood?.message} />
      <Input label="Landmark" {...register('landmark')} hint="e.g. Near the yellow church" />
      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} fullWidth>Back</Button>
        <Button onClick={onSubmit} disabled={isPending} fullWidth>
          {isPending ? 'Submitting...' : 'Register Business'}
        </Button>
      </div>
    </div>
  );
};
