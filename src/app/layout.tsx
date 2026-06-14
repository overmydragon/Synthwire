import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Instrument_Serif, Fraunces } from 'next/font/google';
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
  weight: '400',
});

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  display: 'swap',
  axes: ['SOFT', 'WONK', 'opsz'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://synthwire.email'),
  title: {
    default: 'Synthwire — Your own research desk, not another aggregator',
    template: '%s | Synthwire',
  },
  description: 'A personal research inbox: curate your own newsletter sources, we consolidate them into one clean brief. No AI auto-subscribing. No inbox crawling.',
  keywords: ['newsletter reader', 'research inbox', 'newsletter consolidation', 'AI summaries', 'source directory', 'curated newsletters'],
  authors: [{ name: 'Synthwire' }],
  creator: 'Synthwire',
  publisher: 'Synthwire',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://synthwire.email',
    siteName: 'Synthwire',
    title: 'Synthwire — Your own research desk, not another aggregator',
    description: 'A personal research inbox: curate your own newsletter sources, we consolidate them.',
    images: [
      { url: '/og-image.svg', width: 1200, height: 630, alt: 'Synthwire' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Synthwire — Your own research desk, not another aggregator',
    description: 'A personal research inbox: curate your own newsletter sources, we consolidate them.',
    images: ['/og-image.svg'],
    creator: '@synthwire',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#0a090e',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${fraunces.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col bg-ink-950 text-white">
        <Navigation />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}