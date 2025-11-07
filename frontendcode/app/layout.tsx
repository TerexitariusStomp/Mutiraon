import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { I18nProvider } from '@/i18n/I18nContext'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export async function generateMetadata({ params }: { params: { slug?: string[] } }) {
  // Check if we're on the app route
  const isAppRoute = params.slug && params.slug[0] === 'app';

  const baseMetadata = {
    description: 'Stablecoin de Impacto para a Economia Solidária do Brasil',
    generator: 'Amaz-One Dollar',
    icons: {
      icon: [
        {
          url: '/icon-light-32x32.png',
          media: '(prefers-color-scheme: light)',
        },
        {
          url: '/icon-dark-32x32.png',
          media: '(prefers-color-scheme: dark)',
        },
        {
          url: '/icon.svg',
          type: 'image/svg+xml',
        },
      ],
      apple: '/apple-icon.png',
    },
  };

  if (isAppRoute) {
    return {
      ...baseMetadata,
      title: 'Amaz-One Dollar App',
      description: 'Interface completa da stablecoin Amaz-One Dollar',
    };
  }

  return {
    ...baseMetadata,
    title: 'Amaz-One Dollar',
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt">
      <body className={`font-sans antialiased`}>
        <I18nProvider>
        {children}
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  )
}


