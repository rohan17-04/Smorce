'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ShieldAlert, KeyRound, LogOut, Loader2, X, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle';

export default function AdminNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  const [showChangeModal, setShowChangeModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error('Failed to logout', err);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess('Password updated successfully!');
        setTimeout(() => {
          setShowChangeModal(false);
          setCurrentPassword('');
          setShowCurrentPassword(false);
          setNewPassword('');
          setShowNewPassword(false);
          setConfirmPassword('');
          setShowConfirmPassword(false);
          setSuccess('');
        }, 1500);
      } else {
        setError(data.error || 'Failed to update password');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowChangeModal(false);
    setCurrentPassword('');
    setShowCurrentPassword(false);
    setNewPassword('');
    setShowNewPassword(false);
    setConfirmPassword('');
    setShowConfirmPassword(false);
    setError('');
    setSuccess('');
  };

  return (
    <>
      <nav className="border-b border-line bg-section">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10">
              <ShieldAlert className="h-5 w-5 text-accent" />
            </div>
            <div>
              <span className="font-bold text-ink tracking-tight block text-sm sm:text-base">SMORCE Admin</span>
              <span className="text-[10px] text-muted block -mt-1 font-medium">smorce366@gmail.com</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {!isLoginPage && (
              <>
                <button
                  suppressHydrationWarning
                  onClick={() => setShowChangeModal(true)}
                  className="flex items-center gap-1.5 rounded-lg border border-line bg-alt px-3 py-1.5 text-xs font-semibold text-ink hover:bg-line/50 transition-colors"
                >
                  <KeyRound className="h-3.5 w-3.5 text-accent" />
                  <span className="hidden sm:inline">Change Password</span>
                </button>

                <button
                  suppressHydrationWarning
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 rounded-lg border border-line bg-alt px-3 py-1.5 text-xs font-semibold text-ink hover:bg-accent/10 hover:text-accent transition-colors"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </>
            )}
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Change Password Modal */}
      <AnimatePresence>
        {showChangeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-3xl border border-line p-6 sm:p-8 relative bg-bg shadow-2xl"
            >
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 text-muted hover:text-ink transition-colors p-1"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="text-center mb-6">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10">
                  <KeyRound className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-ink">Change Admin Password</h3>
                <p className="text-xs text-ink/75 dark:text-muted mt-1 font-medium">
                  Update your credentials for smorce366@gmail.com
                </p>
              </div>

              {error && (
                <div className="mb-4 rounded-xl bg-accent/10 border border-accent/20 p-3 text-xs font-semibold text-accent">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 p-3 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  {success}
                </div>
              )}

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5">Current Password</label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full rounded-xl border border-line bg-alt pl-4 pr-11 py-2.5 text-sm text-ink focus:border-accent focus:outline-none"
                      placeholder="Enter current password"
                      required
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted hover:text-ink transition-colors focus:outline-none"
                      aria-label={showCurrentPassword ? 'Hide password' : 'Show password'}
                    >
                      {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
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
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-accent py-2.5 text-sm font-semibold text-white hover:bg-accent-hover disabled:opacity-50 transition-all"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save New Password'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
