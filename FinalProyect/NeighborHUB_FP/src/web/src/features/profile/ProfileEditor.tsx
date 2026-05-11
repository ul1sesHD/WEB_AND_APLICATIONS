import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Camera } from 'lucide-react';
import { profileService, storageService } from '@neighborhub/shared';
import { getSupabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const schema = z.object({
  name:         z.string().min(1, 'Name is required'),
  neighborhood: z.string().optional(),
  phone:        z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export const ProfileEditor = () => {
  const { profile } = useAuthStore();
  const qc = useQueryClient();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name:         profile?.name ?? '',
      neighborhood: profile?.neighborhood ?? '',
      phone:        profile?.phone ?? '',
    },
  });

  const update = useMutation({
    mutationFn: async (data: FormData) => {
      const r = await profileService.updateProfile(getSupabase(), profile!.id, {
        name:         data.name,
        neighborhood: data.neighborhood ?? null,
        phone:        data.phone ?? null,
      });
      if (r.error) throw r.error;
      return r.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['profile'] }),
  });

  const uploadAvatar = useMutation({
    mutationFn: async (file: File) => {
      const r = await storageService.uploadAvatar(getSupabase(), profile!.id, file);
      if (r.error) throw r.error;
      await profileService.updateProfile(getSupabase(), profile!.id, { avatar_url: r.data });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['profile'] }),
  });

  return (
    <form onSubmit={handleSubmit((d) => update.mutate(d))} className="flex flex-col gap-5">
      {/* Avatar */}
      <div className="flex items-center gap-4">
        <div className="relative">
          {profile?.avatar_url ? (
            <img src={profile.avatar_url} alt="" className="w-20 h-20 rounded-full object-cover border-2 border-comal/20" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-comal/15 flex items-center justify-center">
              <span className="font-display text-3xl text-comal">{profile?.name?.charAt(0).toUpperCase()}</span>
            </div>
          )}
          <label className="absolute -bottom-1 -right-1 bg-toldo text-white rounded-full p-1.5 cursor-pointer hover:bg-toldo/90">
            <Camera size={14} />
            <input type="file" accept="image/*" className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadAvatar.mutate(f); }} />
          </label>
        </div>
        <div>
          <p className="font-body font-bold text-comal">{profile?.name}</p>
          <p className="font-body text-sm text-adobe">{profile?.role}</p>
        </div>
      </div>

      <Input label="Name" {...register('name')} error={errors.name?.message} />
      <Input label="Neighborhood" {...register('neighborhood')} />
      <Input label="Phone" {...register('phone')} />

      <Button type="submit" disabled={update.isPending} fullWidth>
        {update.isPending ? 'Saving...' : 'Save Changes'}
      </Button>
      {update.isSuccess && <p className="text-quellite text-sm font-body font-bold text-center">Profile updated!</p>}
      {update.isError && <p className="text-toldo text-sm font-body font-bold text-center">{(update.error as Error).message}</p>}
    </form>
  );
};
