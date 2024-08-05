import { PropsWithChildren } from 'react';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import { cn } from '@/lib/utils';

const fontSans = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Beer Tracker',
  description:
    'Track your beer consumption and compete with your friends! Are you able to beat everyone?',
  generator: 'Next.js',
  keywords: ['beer', 'tracker', 'compete', 'leaderboard', 'friends'],
  authors: [
    {
      name: 'Bruno Dzięcielski',
      url: 'https://github.com/kriziu',
    },
  ],
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <body
        className={cn('min-h-dvh bg-background font-sans antialiased', fontSans.variable)}
      >
        {children}
      </body>
    </html>
  );
}
