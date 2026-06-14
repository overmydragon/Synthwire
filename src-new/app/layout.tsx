import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/landing/Navigation';
import { Footer } from '@/components/landing/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '400i', '700', '700i'],
});

export const metadata: Metadata = {
  title: {
    default: 'Synthwire — Build a high-signal brief on any topic',
    template: '%s | Synthwire',
  },
  description: 'Continuous discovery. Human-readable controls. Source transparency. Not another newsletter aggregator — a personal research inbox.',
  keywords: ['newsletter discovery', 'research inbox', 'AI summaries', 'content curation', 'knowledge management'],
  authors: [{ name: 'Synthwire' }],
  creator: 'Synthwire',
  publisher: 'Synthwire',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://synthwire.email',
    siteName: 'Synthwire',
    title: 'Synthwire — Build a high-signal brief on any topic',
    description: 'Continuous discovery. Human-readable controls. Source transparency.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Synthwire — Build a high-signal brief on any topic',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Synthwire — Build a high-signal brief on any topic',
    description: 'Continuous discovery. Human-readable controls. Source transparency.',
    images: ['/og-image.svg'],
    creator: '@synthwire',
  },
  verification: {
    google: 'google-site-verification-code',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#0f0a1a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col bg-violet-950 text-white">
        <Navigation />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}