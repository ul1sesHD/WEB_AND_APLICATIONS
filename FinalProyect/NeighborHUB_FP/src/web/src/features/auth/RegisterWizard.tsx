import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useAuthStore } from '@/stores/authStore';
import { ROUTES } from '@/routes';
import { registerSchema, type RegisterValues } from './schemas';
import { StepIndicator } from './StepIndicator';
import { AccountStep } from './steps/AccountStep';
import { LocationStep } from './steps/LocationStep';
import { ConfirmStep } from './steps/ConfirmStep';

const STEP_FIELDS: ReadonlyArray<ReadonlyArray<keyof RegisterValues>> = [
  ['name', 'email', 'password', 'confirmPassword'],
  ['neighborhood'],
  [],
];

export const RegisterWizard = () => {
  const navigate = useNavigate();
  const { signUp } = useAuthStore();
  const [step, setStep] = useState(1);
  const [serverError, setServerError] = useState<string | null>(null);

  const methods = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
    defaultValues: { email: '', password: '', confirmPassword: '', name: '', neighborhood: '' },
  });

  const next = async (): Promise<void> => {
    const fields = STEP_FIELDS[step - 1] ?? [];
    const valid  = fields.length === 0 ? true : await methods.trigger([...fields]);
    if (valid) setStep((s) => Math.min(s + 1, 3));
  };

  const back = (): void => setStep((s) => Math.max(s - 1, 1));

  const onSubmit = async (values: RegisterValues): Promise<void> => {
    setServerError(null);
    const result = await signUp({
      email:        values.email,
      password:     values.password,
      name:         values.name,
      neighborhood: values.neighborhood,
    });
    if (result.error) {
      setServerError(result.error.message);
      return;
    }
    navigate(ROUTES.home, { replace: true });
  };

  return (
    <Card className="w-full max-w-md shadow-hard">
      <div className="mb-4"><StepIndicator current={step} total={3} /></div>
      <h1 className="font-display text-3xl tracking-wider text-comal mb-1">CREATE ACCOUNT</h1>
      <p className="font-body text-adobe mb-6">Step {step} of 3</p>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {step === 1 && <AccountStep />}
          {step === 2 && <LocationStep />}
          {step === 3 && <ConfirmStep />}

          {serverError && (
            <p role="alert" className="text-toldo font-body font-bold text-sm">{serverError}</p>
          )}

          <div className="flex gap-3 mt-2">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={back} fullWidth>Back</Button>
            )}
            {step < 3 ? (
              <Button type="button" onClick={next} fullWidth>Continue</Button>
            ) : (
              <Button type="submit" disabled={methods.formState.isSubmitting} fullWidth>
                {methods.formState.isSubmitting ? 'Creating…' : 'Create account'}
              </Button>
            )}
          </div>
        </form>
      </FormProvider>

      <p className="font-body text-sm text-adobe text-center mt-6">
        Already have an account?{' '}
        <Link to={ROUTES.login} className="text-toldo font-bold hover:underline">Sign in</Link>
      </p>
    </Card>
  );
};
