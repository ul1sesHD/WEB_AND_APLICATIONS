import { useFormContext } from 'react-hook-form';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useLocationStore } from '@/stores/locationStore';
import type { RegisterValues } from '../schemas';

export const LocationStep = () => {
  const { register, formState: { errors } } = useFormContext<RegisterValues>();
  const { coords, permission, fromFallback, requestPermission } = useLocationStore();

  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Neighborhood"
        placeholder="e.g. Coyoacan, Roma Norte"
        {...register('neighborhood')}
        error={errors.neighborhood?.message}
      />

      <div className="bg-comal/5 border border-comal/15 rounded-md p-4 flex items-start gap-3">
        <MapPin size={20} className="text-toldo mt-1" />
        <div className="flex-1">
          <p className="font-body font-bold text-comal text-sm">Share your location (optional)</p>
          <p className="font-body text-adobe text-xs mb-2">
            Helps us show what&apos;s closest to you. You can change this later.
          </p>
          {permission === 'granted' && !fromFallback ? (
            <p className="font-body text-quellite text-sm">
              Location set: {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
            </p>
          ) : (
            <Button type="button" variant="outline" size="sm" onClick={requestPermission}>
              Use my location
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
