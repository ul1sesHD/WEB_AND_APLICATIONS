import { z } from 'zod';

export const loginSchema = z.object({
  email:    z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});
export type LoginValues = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  email:           z.string().email('Enter a valid email'),
  password:        z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  name:            z.string().min(2, 'Tell us your name'),
  neighborhood:    z.string().min(2, 'Pick a neighborhood'),
}).refine((d) => d.password === d.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords do not match',
});

export type RegisterValues = z.infer<typeof registerSchema>;
