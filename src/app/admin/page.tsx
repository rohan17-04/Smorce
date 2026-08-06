import React from 'react';
import { db } from '@/lib/db';
import AdminEnquiryList from '@/components/AdminEnquiryList';

export const dynamic = 'force-dynamic'; // Ensures this page always fetches fresh data from DB

export default async function AdminDashboard() {
  let enquiries: any[] = [];
  
  try {
    const rawEnquiries = await db.enquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });

    enquiries = rawEnquiries.map((e) => ({
      id: e.id,
      name: e.name,
      email: e.email,
      phone: e.phone,
      company: e.company,
      service: e.service,
      message: e.message,
      status: e.status || 'NEW',
      createdAt: e.createdAt.toISOString(),
    }));
  } catch (err) {
    console.error('Error fetching enquiries for admin dashboard:', err);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink">Client Inquiries</h1>
          <p className="text-sm text-muted mt-1">
            Real-time lead stream, 3-hour SLA follow-up monitoring, and status management.
          </p>
        </div>
      </div>

      <AdminEnquiryList initialEnquiries={enquiries} />
    </div>
  );
}
