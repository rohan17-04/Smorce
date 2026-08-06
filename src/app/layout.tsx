import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/ThemeProvider';
import '@/index.css';

export const metadata: Metadata = {
  title: 'SMORCE — AI-Powered Digital Experiences That Scale Businesses',
  description: 'SMORCE builds premium software, intelligent automations and high-converting digital products for startups and enterprises.',
  openGraph: {
    title: 'SMORCE — AI-Powered Digital Experiences',
    description: 'We help startups and enterprises build premium software, intelligent automations and high-converting digital products.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="system" storageKey="smorce-ui-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
