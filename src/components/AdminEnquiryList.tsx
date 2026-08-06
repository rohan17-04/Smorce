'use client';

import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Clock, AlertTriangle, CheckCircle2, Building, Send, ChevronDown } from 'lucide-react';

export interface EnquiryItem {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company: string | null;
  service: string;
  message: string;
  status: string;
  createdAt: string | Date;
}

export default function AdminEnquiryList({ initialEnquiries }: { initialEnquiries: EnquiryItem[] }) {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>(initialEnquiries);
  const [filter, setFilter] = useState<string>('ALL');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const now = mounted ? new Date().getTime() : 0;

  const newCount = enquiries.filter((e) => e.status === 'NEW').length;

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch('/api/enquiries/status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
      }
    } catch (err) {
      console.error('Failed to update status', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = enquiries.filter((item) => {
    if (filter === 'ALL') return true;
    return item.status === filter;
  });

  return (
    <div className="space-y-8">
      {/* SLA Alert Banner Removed */}
      {/* Metrics Row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="glass-card rounded-2xl p-5 border border-line">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">Total Inquiries</p>
          <p className="mt-2 text-3xl font-extrabold text-ink">{enquiries.length}</p>
        </div>
        <div className="glass-card rounded-2xl p-5 border border-line">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">New / Unread</p>
          <p className="mt-2 text-3xl font-extrabold text-accent">{newCount}</p>
        </div>
        <div className="glass-card rounded-2xl p-5 border border-line">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Completed</p>
          <p className="mt-2 text-3xl font-extrabold text-emerald-400">
            {enquiries.filter((e) => e.status === 'COMPLETED').length}
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: 'ALL', label: 'All Inquiries' },
          { id: 'NEW', label: `New (${newCount})` },
          { id: 'IN_PROGRESS', label: 'In Progress' },
          { id: 'COMPLETED', label: 'Completed' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              filter === tab.id
                ? 'bg-ink text-bg shadow-md'
                : 'bg-section text-muted hover:text-ink border border-line'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Inquiries Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-line bg-section p-12 text-center text-muted">
            <Mail className="mx-auto h-10 w-10 opacity-30 mb-3" />
            <p className="text-base font-semibold text-ink">No inquiries match the selected filter.</p>
            <p className="text-xs mt-1">When new leads arrive, they will appear here in real time.</p>
          </div>
        ) : (
          filtered.map((enquiry) => {
            const created = new Date(enquiry.createdAt);

            return (
              <div
                key={enquiry.id}
                className="glass-card flex flex-col justify-between rounded-2xl p-6 transition-all border border-line"
              >
                <div>
                  {/* Status & Date Header */}
                  <div className="mb-4 flex items-center justify-between gap-2">
                    {enquiry.status === 'NEW' ? (
                      <span className="flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 text-[11px] font-bold text-accent">
                        ⚡ New Lead
                      </span>
                    ) : enquiry.status === 'COMPLETED' ? (
                      <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-bold text-emerald-400">
                        <CheckCircle2 className="h-3 w-3" /> Completed
                      </span>
                    ) : (
                      <span className="rounded-full bg-line/60 px-2.5 py-1 text-[11px] font-bold text-ink">
                        🔄 In Progress
                      </span>
                    )}

                    <span suppressHydrationWarning className="text-xs text-muted">
                      {mounted ? `${created.toLocaleDateString()} ${created.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : ''}
                    </span>
                  </div>

                  {/* Client Info */}
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-ink tracking-tight">{enquiry.name}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <a
                        href={`mailto:${enquiry.email}`}
                        className="text-xs font-semibold text-accent hover:underline flex items-center gap-1"
                      >
                        <Mail className="h-3.5 w-3.5" /> {enquiry.email}
                      </a>
                      {enquiry.phone && (
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${enquiry.phone}`}
                            className="text-xs font-semibold text-blue-400 hover:underline flex items-center gap-1"
                          >
                            <Phone className="h-3.5 w-3.5" /> {enquiry.phone}
                          </a>
                          <a
                            href={`https://wa.me/${enquiry.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1"
                            title="Chat on WhatsApp"
                          >
                            <MessageSquare className="h-3 w-3" /> WhatsApp
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {enquiry.company && (
                    <p className="mb-2 text-xs text-muted flex items-center gap-1.5">
                      <Building className="h-3.5 w-3.5 text-muted/70" />
                      <span className="font-semibold text-ink">{enquiry.company}</span>
                    </p>
                  )}

                  <div className="mb-3 inline-block rounded-lg bg-line/40 px-2.5 py-1 text-xs font-semibold text-ink">
                    🎯 {enquiry.service}
                  </div>

                  {/* Message Body */}
                  <div className="rounded-xl bg-alt/60 p-4 text-xs leading-relaxed text-ink/90 border border-line/40 max-h-36 overflow-y-auto">
                    {enquiry.message}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="mt-6 pt-4 border-t border-line">
                  {/* Status Dropdown */}
                  <div className="relative inline-block">
                    <select
                      value={enquiry.status}
                      disabled={updatingId === enquiry.id}
                      onChange={(e) => handleStatusChange(enquiry.id, e.target.value)}
                      className="appearance-none rounded-xl bg-section border border-line px-3 py-1.5 pr-8 text-xs font-bold text-ink focus:outline-none focus:border-accent cursor-pointer disabled:opacity-50"
                    >
                      <option value="NEW">New</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="COMPLETED">Completed</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 pointer-events-none text-muted" />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
