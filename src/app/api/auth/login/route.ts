import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { signToken } from '@/lib/auth';
import { checkRateLimit, resetRateLimit } from '@/lib/rate-limiter';
import bcrypt from 'bcrypt';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    // 1. Rate limiting by IP/Header (max 5 attempts per 15 minutes)
    const forwardedFor = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const clientIp = forwardedFor.split(',')[0].trim();
    const rateLimitKey = `login:${clientIp}`;
    
    const rateLimit = checkRateLimit(rateLimitKey, 5, 15 * 60 * 1000);
    if (!rateLimit.allowed) {
      const minutesRemaining = Math.ceil((rateLimit.resetTime - Date.now()) / 60000);
      return NextResponse.json(
        { error: `Too many failed login attempts. Please try again in ${minutesRemaining} minutes.` },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { email, password } = loginSchema.parse(body);

    const normalizedEmail = email.toLowerCase().trim();
    const admin = await db.admin.findUnique({ where: { email: normalizedEmail } });
    
    // Constant-time password check simulation even if user not found to prevent timing attacks
    const passwordToCheck = admin ? admin.password : '$2a$10$22nuxq62tXF4l68K8k228.f9Q7rX9v79rV1m45t8qV8v';
    const isValid = await bcrypt.compare(password, passwordToCheck);

    if (!admin || !isValid) {
      return NextResponse.json(
        { error: 'Invalid email address or password' },
        { status: 401 }
      );
    }

    // Successful login: reset rate limit
    resetRateLimit(rateLimitKey);

    // Sign 4-hour JWT token
    const token = await signToken({ id: admin.id, email: admin.email }, '4h');

    const response = NextResponse.json({ success: true, message: 'Authenticated successfully' });
    response.cookies.set('admin-session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 4, // 4 hours
      path: '/',
    });

    return response;
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message || 'Invalid input format' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Authentication failed. Please try again.' }, { status: 500 });
  }
}
