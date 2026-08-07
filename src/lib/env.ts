import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
  ADMIN_EMAIL: z.string().email('ADMIN_EMAIL is required'),
  ADMIN_PASSWORD_HASH: z.string().min(1, 'ADMIN_PASSWORD_HASH is required'),
  DATABASE_URL: z.string().url('DATABASE_URL must be a valid URL'),
  
  // Email config (optional for local dev if they fallback to console logs, but required for prod if sending real emails)
  GMAIL_USER: z.string().email().optional().or(z.literal('')),
  GMAIL_APP_PASS: z.string().optional().or(z.literal('')),
  
  // Tracking
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  NEXT_PUBLIC_CLARITY_ID: z.string().optional(),
});

export const env = envSchema.parse(process.env);
