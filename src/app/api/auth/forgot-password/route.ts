import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendOtpEmail } from '@/lib/email';
import bcrypt from 'bcrypt';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const sendOtpSchema = z.object({
  action: z.literal('send-otp'),
  email: z.string().email(),
});

const verifyOtpSchema = z.object({
  action: z.literal('verify-otp'),
  email: z.string().email(),
  otp: z.string().length(6),
});

const resetPasswordSchema = z.object({
  action: z.literal('reset-password'),
  email: z.string().email(),
  otp: z.string().length(6),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Action: Send OTP
    if (body.action === 'send-otp') {
      const { email } = sendOtpSchema.parse(body);

      const admin = await db.admin.findUnique({
        where: { email: email.toLowerCase().trim() },
      });

      if (!admin) {
        return NextResponse.json(
          { error: 'No admin account found with this email address' },
          { status: 404 }
        );
      }

      // Generate random 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

      // Invalidate old unused OTPs
      await db.passwordResetOtp.deleteMany({
        where: { email: email.toLowerCase().trim() },
      });

      // Save new OTP
      await db.passwordResetOtp.create({
        data: {
          email: email.toLowerCase().trim(),
          otp,
          expiresAt,
        },
      });

      // Send Email
      await sendOtpEmail(email.toLowerCase().trim(), otp);

      return NextResponse.json({
        success: true,
        message: 'A 6-digit verification code has been dispatched to your email.',
      });
    }

    // 2. Action: Verify OTP
    if (body.action === 'verify-otp') {
      const { email, otp } = verifyOtpSchema.parse(body);

      const record = await db.passwordResetOtp.findFirst({
        where: {
          email: email.toLowerCase().trim(),
          otp: otp.trim(),
          used: false,
          expiresAt: { gt: new Date() },
        },
      });

      if (!record) {
        return NextResponse.json(
          { error: 'Invalid or expired verification code. Please request a new one.' },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Code verified successfully.',
      });
    }

    // 3. Action: Reset Password
    if (body.action === 'reset-password') {
      const { email, otp, newPassword } = resetPasswordSchema.parse(body);

      const record = await db.passwordResetOtp.findFirst({
        where: {
          email: email.toLowerCase().trim(),
          otp: otp.trim(),
          used: false,
          expiresAt: { gt: new Date() },
        },
      });

      if (!record) {
        return NextResponse.json(
          { error: 'Invalid or expired verification code.' },
          { status: 400 }
        );
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update Admin password
      await db.admin.update({
        where: { email: email.toLowerCase().trim() },
        data: { password: hashedPassword },
      });

      // Mark OTP as used
      await db.passwordResetOtp.update({
        where: { id: record.id },
        data: { used: true },
      });

      return NextResponse.json({
        success: true,
        message: 'Your password has been reset successfully. You can now log in.',
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message || 'Invalid input' }, { status: 400 });
    }
    console.error('Password reset error:', error);
    return NextResponse.json({ error: 'Failed to process request. Please try again.' }, { status: 500 });
  }
}
