import Image from 'next/image'
import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import {
  CONTACT_EMAIL_GEN,
  CONTACT_PHONE,
  CONTACT_WA,
  FSSAI_LIC,
  HOURS,
  LOCATION,
  SITE_NAME,
  TAGLINE,
} from '@/lib/constants'
import { buildGeneralInquiryMessage } from '@/lib/whatsapp'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Quality', href: '/quality' },
  { label: 'Contact Us', href: '/contact' },
]

const PRODUCT_LINKS = [
  { label: 'Red Chilli Powder', href: '/products/red-chilli-powder' },
  { label: 'Haldi Powder', href: '/products/haldi-powder' },
  { label: 'Coriander Powder', href: '/products/coriander-powder' },
  { label: 'Garam Masala', href: '/products/garam-masala' },
  { label: 'Combo Pack', href: '/products/combo-pack' },
]

const ORDER_URL = buildGeneralInquiryMessage()

export function Footer() {
  return (
    <footer className="bg-maroon-dark px-6 pb-7 pt-14 sm:px-10 sm:pt-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <Image
            src="/logo.webp"
            alt={SITE_NAME}
            width={1024}
            height={559}
            className="mb-4 h-16 w-auto object-contain"
          />
          <p className="mb-2 font-accent text-lg italic text-gold-light">{TAGLINE}</p>
          <p className="mb-6 max-w-sm text-sm leading-relaxed text-gold-muted">
            Pure and natural Indian spices from Hyderabad, Telangana — sourced, ground, and packed with care.
          </p>
          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 font-body text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-whatsapp-dark shadow-sm"
          >
            <MessageCircle size={16} />
            Enquire on WhatsApp
          </a>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-wide text-gold">Navigation</h3>
          <ul className="flex flex-col gap-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-gold-muted transition-colors hover:text-gold-light">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-wide text-gold">Products</h3>
          <ul className="flex flex-col gap-2.5">
            {PRODUCT_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-gold-muted transition-colors hover:text-gold-light">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-wide text-gold">Contact</h3>
          <ul className="flex flex-col gap-2.5 text-sm text-gold-muted">
            <li>{CONTACT_WA}</li>
            <li>{CONTACT_PHONE}</li>
            <li>{CONTACT_EMAIL_GEN}</li>
            <li>{LOCATION}</li>
            <li>{HOURS}</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-gold/25 pt-6 text-center text-xs text-gold-muted sm:text-left">
        © {new Date().getFullYear()} {SITE_NAME} | JK Enterprises · FSSAI Lic. {FSSAI_LIC} · Made in India 🇮🇳
      </div>
    </footer>
  )
}
