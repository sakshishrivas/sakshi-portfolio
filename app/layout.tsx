import type { Metadata } from 'next';
import { Inter, Syne } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sakshi Shrivastava | Software Engineer & System Analyst',
  description:
    'Software Engineer and System Analyst specialising in Python, Django, REST APIs, PostgreSQL and enterprise SaaS. Building scalable backend systems from Gurugram, India.',
  keywords: [
    'Sakshi Shrivastava',
    'Software Engineer',
    'System Analyst',
    'Python Developer',
    'Django',
    'REST APIs',
    'Backend Developer',
    'PostgreSQL',
    'Enterprise SaaS',
    'Gurugram',
    'India',
  ],
  authors: [{ name: 'Sakshi Shrivastava' }],
  openGraph: {
    title: 'Sakshi Shrivastava | Software Engineer & System Analyst',
    description:
      'Software Engineer and System Analyst specialising in Python, Django, REST APIs, PostgreSQL and enterprise SaaS.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary',
    title: 'Sakshi Shrivastava | Software Engineer & System Analyst',
    description:
      'Software Engineer and System Analyst specialising in Python, Django, REST APIs and enterprise SaaS.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
