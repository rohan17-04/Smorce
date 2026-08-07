import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/components/ThemeProvider';
import Analytics from '@/components/Analytics';
import JsonLd from '@/components/JsonLd';
import '@/index.css';

export const viewport: Viewport = {
  themeColor: '#0F1012',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.smorce.com'),
  title: {
    default: 'SMORCE — AI-Powered Digital Experiences That Scale Businesses',
    template: '%s | SMORCE',
  },
  description: 'SMORCE builds premium software, intelligent automations and high-converting digital products for startups and enterprises.',
  keywords: ['Software Development', 'AI Automation', 'SaaS', 'Digital Agency', 'React', 'Next.js'],
  authors: [{ name: 'SMORCE', url: 'https://www.smorce.com' }],
  creator: 'SMORCE',
  publisher: 'SMORCE',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'SMORCE — AI-Powered Digital Experiences',
    description: 'We help startups and enterprises build premium software, intelligent automations and high-converting digital products.',
    siteName: 'SMORCE',
    images: [
      {
        url: '/images/og-image.jpg', // Placeholder for actual OG image
        width: 1200,
        height: 630,
        alt: 'SMORCE Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SMORCE — AI-Powered Digital Experiences',
    description: 'We help startups and enterprises build premium software, intelligent automations and high-converting digital products.',
    images: ['/images/og-image.jpg'],
  },
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body>
        <ThemeProvider defaultTheme="light" storageKey="smorce-ui-theme">
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
