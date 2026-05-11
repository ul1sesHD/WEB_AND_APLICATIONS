import { z } from 'zod';

export const DAYS = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'] as const;

export const schema = z.object({
  name:                  z.string().min(2, 'Name is required'),
  categoryId:            z.string().min(1, 'Pick a category'),
  description:           z.string().optional(),
  vendorName:            z.string().optional(),
  vendorQuote:           z.string().optional(),
  yearsInNeighborhood:   z.coerce.number().int().min(0).optional(),
  story:                 z.string().optional(),
  phone:                 z.string().optional(),
  whatsapp:              z.string().optional(),
  website:               z.string().optional(),
  isEcoFriendly:         z.boolean(),
  ecoPractices:          z.string().optional(),
  address:               z.string().min(1, 'Address is required'),
  neighborhood:          z.string().min(1, 'Neighborhood is required'),
  landmark:              z.string().optional(),
  hours:                 z.record(z.enum(['monday','tuesday','wednesday','thursday','friday','saturday','sunday']),
    z.union([
      z.object({ open: z.string(), close: z.string() }),
      z.object({ closed: z.literal(true) }),
    ]),
  ).optional(),
});

export type FormData = z.infer<typeof schema>;

export const DEFAULT_HOURS = Object.fromEntries(
  DAYS.map((d) => [d, d === 'sunday' ? { closed: true as const } : { open: '08:00', close: '18:00' }]),
);
