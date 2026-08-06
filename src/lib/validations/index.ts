import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().min(1, 'Description is required'),
  technologies: z.array(z.string()).min(1, 'At least one technology is required'),
  images: z.array(z.string()),
  featured: z.boolean().default(false),
  liveUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  githubUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
});

export const serviceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  icon: z.string().min(1, 'Icon identifier is required'),
  order: z.number().int().default(0),
});

export const testimonialSchema = z.object({
  clientName: z.string().min(1, 'Client name is required'),
  company: z.string().optional(),
  designation: z.string().optional(),
  review: z.string().min(1, 'Review is required'),
  image: z.string().optional(),
  rating: z.number().int().min(1).max(5).default(5),
});

export const pricingSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  price: z.string().min(1, 'Price is required'),
  features: z.array(z.string()).min(1, 'At least one feature is required'),
});

export const enquirySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  projectDetails: z.string().optional(),
  status: z.enum(['PENDING', 'REVIEWED', 'COMPLETED']).default('PENDING'),
});
