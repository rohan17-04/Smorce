import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Check, Loader2, ChevronDown } from 'lucide-react';
import { useInView } from '@/lib/hooks';
import { ContactRowProps, CustomSelectProps } from '@/types';
import { EASE } from '@/lib/variants';

const SERVICES = [
  'Business Automation',
  'SaaS Development',
  'Website Development',
  'UI/UX Design',
  'AI Automation',
  'Cloud Infrastructure',
  'Mobile Applications',
];

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const { ref, inView } = useInView();
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: SERVICES[0],
    message: '',
  });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage(null);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to submit');
      }

      setStatus('success');
      setForm({ name: '', email: '', phone: '', company: '', service: SERVICES[0], message: '' });
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  const inputCls =
    'w-full rounded-xl lg:rounded-2xl border border-line bg-card px-4 py-4 lg:py-3.5 text-[15px] lg:text-[14.5px] text-ink placeholder:text-muted/50 transition-colors duration-300 focus:border-ink/30 focus:outline-none';

  return (
    <section id="contact" className="relative bg-bg py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left: invitation */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.15em] text-accent"
            >
              <span className="h-1 w-6 rounded-full bg-accent" />
              Let&apos;s talk
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              className="mt-4 text-balance text-[2rem] font-bold leading-[1.1] tracking-[-0.025em] text-ink lg:text-[2.75rem]"
            >
              Book a free strategy call
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
              className="mt-5 max-w-md text-[16px] leading-[1.65] text-muted"
            >
              Tell us what you&apos;re building. We&apos;ll get back within one business day
              with a thoughtful response — not a sales pitch.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
              className="mt-10 space-y-4"
            >
              <ContactRow label="Email" value="smorce366@gmail.com" />
              <ContactRow label="Response time" value="Within 1 business day" />
              <ContactRow label="Location" value="Remote — India" />
            </motion.div>
          </div>

          {/* Right: form */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            className="glass-card premium-shadow rounded-[2rem] lg:rounded-4xl p-6 sm:p-8 lg:p-10"
          >
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="flex h-full flex-col items-center justify-center py-16 text-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10"
                >
                  <Check className="h-7 w-7 text-success" />
                </motion.div>
                <h3 className="mt-6 text-[20px] font-bold text-ink">
                  Message received
                </h3>
                <p className="mt-2 max-w-xs text-[14px] text-muted">
                  We&apos;ll review your project and reach out within one business day.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-[13px] font-semibold text-accent hover:text-accent-hover"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[12.5px] font-medium text-muted">
                      Name *
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputCls}
                      placeholder="Alex Morgan"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[12.5px] font-medium text-muted">
                      Email *
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputCls}
                      placeholder="alex@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[12.5px] font-medium text-muted">
                      Phone / WhatsApp *
                    </label>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={inputCls}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[12.5px] font-medium text-muted">
                      Company
                    </label>
                    <input
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className={inputCls}
                      placeholder="Company or Brand name"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-[12.5px] font-medium text-muted">
                    What do you need?
                  </label>
                  <CustomSelect
                    value={form.service}
                    onChange={(val) => setForm({ ...form, service: val })}
                    options={SERVICES}
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[12.5px] font-medium text-muted">
                    Project details
                  </label>
                  <textarea
                    required
                    minLength={10}
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${inputCls} resize-none`}
                    placeholder="Describe your project, key goals, timeline, and requirements..."
                  />
                </div>

                {status === 'error' && (
                  <p className="text-[13px] text-accent">
                    {errorMessage || 'Something went wrong. Please try again or email smorce366@gmail.com.'}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="group btn-primary w-full disabled:opacity-60 py-4 lg:py-4"
                >
                  {status === 'loading' ? (
                    <>
                      <span className="relative z-10 flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="relative z-10 flex items-center gap-2">
                        Send message
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </>
                  )}
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const ContactRow = React.memo(function ContactRow({ label, value }: ContactRowProps) {
  return (
    <div className="flex items-center justify-between border-b border-line pb-4">
      <span className="text-[13px] font-medium uppercase tracking-[0.08em] text-muted/70">
        {label}
      </span>
      <span className="text-[15px] font-medium text-ink">{value}</span>
    </div>
  );
});

const CustomSelect = React.memo(function CustomSelect({
  value,
  onChange,
  options,
  className,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`${className} flex items-center justify-between text-left`}
      >
        <span className="truncate">{value}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-line bg-bg shadow-[0_10px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.3)]"
          >
            <div className="max-h-60 overflow-y-auto p-1.5 custom-scrollbar">
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left text-[14px] transition-colors duration-200 ${
                    value === option
                      ? 'bg-alt font-semibold text-ink'
                      : 'text-ink hover:bg-alt/50'
                  }`}
                >
                  {option}
                  {value === option && (
                    <Check className="h-4 w-4 text-ink opacity-70" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
