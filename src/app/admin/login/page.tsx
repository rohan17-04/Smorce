'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Loader2, ArrowRight, KeyRound, Mail, CheckCircle2, X, RefreshCw, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Forgot Password Modal State
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetStep, setResetStep] = useState<'email' | 'otp' | 'newPassword' | 'success'>('email');
  const [resetEmail, setResetEmail] = useState('smorce366@gmail.com');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState('');
  const [modalSuccess, setModalSuccess] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  // Step 1: Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalLoading(true);
    setModalError('');
    setModalSuccess('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send-otp', email: resetEmail }),
      });

      const data = await res.json();
      if (res.ok) {
        setResetStep('otp');
        setModalSuccess(data.message || 'Verification code sent.');
      } else {
        setModalError(data.error || 'Failed to send verification code.');
      }
    } catch {
      setModalError('Failed to send verification code. Please try again.');
    } finally {
      setModalLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalLoading(true);
    setModalError('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify-otp', email: resetEmail, otp: otp.trim() }),
      });

      const data = await res.json();
      if (res.ok) {
        setResetStep('newPassword');
        setModalSuccess('Code verified. Set your new password below.');
      } else {
        setModalError(data.error || 'Invalid or expired code.');
      }
    } catch {
      setModalError('Failed to verify code.');
    } finally {
      setModalLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setModalError('Passwords do not match.');
      return;
    }
    if (newPassword.length < 6) {
      setModalError('Password must be at least 6 characters long.');
      return;
    }

    setModalLoading(true);
    setModalError('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reset-password',
          email: resetEmail,
          otp: otp.trim(),
          newPassword,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setResetStep('success');
      } else {
        setModalError(data.error || 'Failed to reset password.');
      }
    } catch {
      setModalError('Failed to reset password.');
    } finally {
      setModalLoading(false);
    }
  };

  const closeResetModal = () => {
    setShowForgotModal(false);
    setResetStep('email');
    setOtp('');
    setNewPassword('');
    setShowNewPassword(false);
    setConfirmPassword('');
    setShowConfirmPassword(false);
    setModalError('');
    setModalSuccess('');
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass-card premium-shadow rounded-3xl p-8 sm:p-10">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
              <Lock className="h-8 w-8 text-accent" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-ink">Admin Portal</h1>
            <p className="mt-2 text-sm text-ink/75 dark:text-muted font-medium">Sign in to manage SMORCE inquiries and content</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-ink">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-line bg-alt px-4 py-3 text-ink transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="smorce366@gmail.com"
                required
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-ink">Password</label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-xs font-semibold text-accent hover:underline transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-line bg-alt pl-4 pr-11 py-3 text-ink transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  placeholder="••••••••••••"
                  required
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted hover:text-ink transition-colors focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="rounded-lg bg-accent/10 border border-accent/20 p-3 text-sm font-medium text-accent"
              >
                {error}
              </motion.p>
            )}

            <button
              suppressHydrationWarning
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 font-semibold text-white transition-all hover:bg-accent-hover disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>

      {/* Forgot Password OTP Modal */}
      <AnimatePresence>
        {showForgotModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-3xl border border-line p-6 sm:p-8 relative bg-bg shadow-2xl"
            >
              <button
                onClick={closeResetModal}
                className="absolute top-6 right-6 text-muted hover:text-ink transition-colors p-1"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="text-center mb-6">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10">
                  <KeyRound className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-ink">Reset Admin Password</h3>
                <p className="text-xs text-ink/75 dark:text-muted mt-1 font-medium">
                  Secure OTP verification dispatched to your registered email
                </p>
              </div>

              {modalError && (
                <div className="mb-4 rounded-xl bg-accent/10 border border-accent/20 p-3 text-xs font-semibold text-accent">
                  {modalError}
                </div>
              )}

              {modalSuccess && resetStep !== 'success' && (
                <div className="mb-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 p-3 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                  {modalSuccess}
                </div>
              )}

              {/* Step 1: Request OTP */}
              {resetStep === 'email' && (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1.5">Registered Admin Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-muted" />
                      <input
                        type="email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        className="w-full rounded-xl border border-line bg-alt pl-10 pr-4 py-2.5 text-sm text-ink focus:border-accent focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={modalLoading}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-accent py-2.5 text-sm font-semibold text-white hover:bg-accent-hover disabled:opacity-50 transition-all"
                  >
                    {modalLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send 6-Digit OTP'}
                  </button>
                </form>
              )}

              {/* Step 2: Verify OTP */}
              {resetStep === 'otp' && (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1.5">Enter 6-Digit Code</label>
                    <input
                      type="text"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      className="w-full text-center tracking-[8px] font-mono text-xl font-bold rounded-xl border border-line bg-alt py-3 text-ink focus:border-accent focus:outline-none"
                      placeholder="000000"
                      required
                    />
                    <p className="text-xs text-ink/75 dark:text-muted text-center mt-2.5 font-medium">
                      Code sent to <span className="text-ink font-bold">{resetEmail}</span>
                    </p>
                  </div>
                  <button
                    type="submit"
                    disabled={modalLoading || otp.length !== 6}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-accent py-2.5 text-sm font-semibold text-white hover:bg-accent-hover disabled:opacity-50 transition-all"
                  >
                    {modalLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Verify Code'}
                  </button>
                  <div className="flex justify-between items-center text-xs pt-1">
                    <button
                      type="button"
                      onClick={() => setResetStep('email')}
                      className="text-ink/80 hover:text-ink font-semibold transition-colors"
                    >
                      ← Change Email
                    </button>
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={modalLoading}
                      className="flex items-center gap-1 font-semibold text-accent hover:underline"
                    >
                      <RefreshCw className="h-3 w-3" /> Resend Code
                    </button>
                  </div>
                </form>
              )}

              {/* Step 3: Set New Password */}
              {resetStep === 'newPassword' && (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1.5">New Password</label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full rounded-xl border border-line bg-alt pl-4 pr-11 py-2.5 text-sm text-ink focus:border-accent focus:outline-none"
                        placeholder="At least 6 characters"
                        required
                      />
                      <button
                        type="button"
                        tabIndex={-1}
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted hover:text-ink transition-colors focus:outline-none"
                        aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1.5">Confirm New Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full rounded-xl border border-line bg-alt pl-4 pr-11 py-2.5 text-sm text-ink focus:border-accent focus:outline-none"
                        placeholder="Repeat new password"
                        required
                      />
                      <button
                        type="button"
                        tabIndex={-1}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted hover:text-ink transition-colors focus:outline-none"
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={modalLoading}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-accent py-2.5 text-sm font-semibold text-white hover:bg-accent-hover disabled:opacity-50 transition-all"
                  >
                    {modalLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Update Password'}
                  </button>
                </form>
              )}

              {/* Step 4: Success Screen */}
              {resetStep === 'success' && (
                <div className="text-center py-4 space-y-4">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-ink">Password Updated!</h4>
                    <p className="text-xs text-ink/75 dark:text-muted mt-1 font-medium">
                      Your admin credentials have been successfully updated. You can now log in with your new password.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={closeResetModal}
                    className="w-full rounded-xl bg-accent py-2.5 text-sm font-semibold text-white hover:bg-accent-hover transition-all"
                  >
                    Return to Sign In
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
