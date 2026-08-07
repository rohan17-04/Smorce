import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendCustomerAssuranceEmail, sendAdminNotificationEmail } from '@/lib/email';
import { z } from 'zod';
import { checkRateLimit } from '@/lib/rate-limiter';

export const dynamic = 'force-dynamic';

const enquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(6, 'Please enter a valid phone number').optional().nullable().or(z.literal('')),
  company: z.string().optional().nullable(),
  service: z.string().min(2, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = enquirySchema.parse(body);

    // Rate Limiting (IP based)
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown-ip';
    const rateLimit = checkRateLimit(`enquiry-${ip}`, 5, 15 * 60 * 1000); // 5 requests per 15 minutes
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // 1. Save to Database
    const enquiry = await db.enquiry.create({
      data: {
        name: data.name.trim(),
        email: data.email.toLowerCase().trim(),
        phone: data.phone && data.phone.trim() !== '' ? data.phone.trim() : null,
        company: data.company ? data.company.trim() : null,
        service: data.service.trim(),
        message: data.message.trim(),
        status: 'NEW',
      },
    });

    // 2. Dispatch Emails in Parallel (Awaited to ensure SMTP transmission completes)
    const emailResults = await Promise.allSettled([
      sendCustomerAssuranceEmail(enquiry.email, enquiry.name, enquiry.service, enquiry.id),
      sendAdminNotificationEmail(enquiry),
    ]);

    emailResults.forEach((result, idx) => {
      if (result.status === 'rejected') {
        if (process.env.NODE_ENV !== 'production') console.error(`❌ [SMORCE Email Dispatch ${idx}] Rejected:`, result.reason);
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Inquiry submitted successfully. A confirmation email has been sent.',
      data: enquiry,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message || 'Invalid input data' }, { status: 400 });
    }
    if (process.env.NODE_ENV !== 'production') console.error('Error submitting enquiry:', error);
    return NextResponse.json({ error: 'Failed to process inquiry. Please try again.' }, { status: 500 });
  }
}
