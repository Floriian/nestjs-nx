import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_HOST: z.string().min(1),
  DATABASE_PORT: z.coerce.number(),
  DATABASE_PASSWORD: z.string().min(1),
  DATABASE_USER: z.string().min(1),
  DATABASE_DB: z.string().min(1),
});

export type Env = z.infer<typeof envSchema>;
