import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/stores/authStore';
import { ROUTES } from '@/routes';
import { loginSchema, type LoginValues } from './schemas';

export const LoginForm = () => {
  const navigate = useNavigate();
  const { signIn } = useAuthStore();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register, handleSubmit, formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginValues): Promise<void> => {
    setServerError(null);
    const result = await signIn(values.email, values.password);
    if (result.error) {
      setServerError(result.error.message);
      return;
    }
    navigate(ROUTES.home, { replace: true });
  };

  return (
    <Card className="w-full max-w-md shadow-hard">
      <h1 className="font-display text-3xl tracking-wider text-comal mb-1">SIGN IN</h1>
      <p className="font-body text-adobe mb-6">Welcome back to NeighborHub.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          {...register('email')}
          error={errors.email?.message}
        />
        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          {...register('password')}
          error={errors.password?.message}
        />

        {serverError && (
          <p role="alert" className="text-toldo font-body font-bold text-sm">{serverError}</p>
        )}

        <Button type="submit" disabled={isSubmitting} fullWidth>
          {isSubmitting ? 'Signing in…' : 'Continue'}
        </Button>
      </form>

      <p className="font-body text-sm text-adobe text-center mt-6">
        Don&apos;t have an account?{' '}
        <Link to={ROUTES.register} className="text-toldo font-bold hover:underline">
          Sign up
        </Link>
      </p>
    </Card>
  );
};
