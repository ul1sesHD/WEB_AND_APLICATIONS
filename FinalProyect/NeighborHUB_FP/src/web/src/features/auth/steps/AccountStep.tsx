import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import type { RegisterValues } from '../schemas';

export const AccountStep = () => {
  const { register, formState: { errors } } = useFormContext<RegisterValues>();

  return (
    <div className="flex flex-col gap-4">
      <Input label="Full name"        {...register('name')}            error={errors.name?.message} />
      <Input label="Email"            type="email"                     autoComplete="email"
             {...register('email')}                                    error={errors.email?.message} />
      <Input label="Password"         type="password"                  autoComplete="new-password"
             {...register('password')}                                 error={errors.password?.message} />
      <Input label="Confirm password" type="password"                  autoComplete="new-password"
             {...register('confirmPassword')}                          error={errors.confirmPassword?.message} />
    </div>
  );
};
