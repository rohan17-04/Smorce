import { Metadata } from 'next';
import LegalCenter from '@/components/LegalCenter';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Legal Center — Privacy, Terms & Security',
  description: 'Everything you need to know about how Smorce protects your data, delivers services and keeps your information secure.',
  alternates: {
    canonical: '/legal',
  },
  openGraph: {
    title: 'Legal Center — SMORCE',
    description: 'How Smorce protects your data, delivers services and keeps your information secure.',
    url: '/legal',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Legal Center — SMORCE',
    description: 'How Smorce protects your data, delivers services and keeps your information secure.',
  },
};

export default function LegalPage() {
  return (
    <div className="relative min-h-screen bg-bg">
      <Navbar />
      <LegalCenter />
    </div>
  );
}
