import type { Metadata } from 'next'
import { Cormorant_Garamond, Lato, Playfair_Display } from 'next/font/google'
import { CONTACT_WA, SITE_NAME, TAGLINE } from '@/lib/constants'
import '@/styles/globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-playfair',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['italic', 'normal'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kuragoldspices.com'),
  title: {
    default: `${SITE_NAME} | Pure & Natural Indian Spices`,
    template: `%s | ${SITE_NAME}`,
  },
  description: `${SITE_NAME} — pure and natural Indian spices from Hyderabad, Telangana. ${TAGLINE}. Order on WhatsApp: ${CONTACT_WA}.`,
  keywords: ['kura gold spices', 'pure indian spices', 'hyderabad spices', 'natural spices', 'jk enterprises'],
  openGraph: {
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Pure & Natural Indian Spices`,
    description: `${SITE_NAME} — pure and natural Indian spices from Hyderabad, Telangana.`,
    type: 'website',
    images: [{ url: '/logo.webp' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable} ${cormorant.variable}`}>
      <body className="min-h-screen bg-ivory font-body text-ink antialiased">{children}</body>
    </html>
  )
}
