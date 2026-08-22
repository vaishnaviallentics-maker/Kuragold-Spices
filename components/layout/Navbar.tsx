'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, MessageCircle, ShoppingBag, X } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { SITE_NAME, TAGLINE } from '@/lib/constants'
import { buildGeneralInquiryMessage } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Quality', href: '/quality' },
  { label: 'Contact Us', href: '/contact' },
]

const ORDER_URL = buildGeneralInquiryMessage()

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href)
}

function CartIcon({ totalItems, onClick }: { totalItems: number; onClick?: () => void }) {
  return (
    <Link
      href="/cart"
      aria-label={`Cart${totalItems > 0 ? `, ${totalItems} item${totalItems === 1 ? '' : 's'}` : ''}`}
      onClick={onClick}
      className="relative shrink-0 text-gold-light transition-colors hover:text-gold"
    >
      <ShoppingBag size={22} />
      {totalItems > 0 && (
        <span className="absolute -right-2 -top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-whatsapp px-1 font-body text-[10px] font-bold leading-none text-white">
          {totalItems}
        </span>
      )}
    </Link>
  )
}

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { totalItems } = useCart()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-nav border-b border-gold/20 bg-maroon-dark shadow-[0_2px_20px_rgba(0,0,0,0.3)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center" aria-label={`${SITE_NAME} — ${TAGLINE}`}>
          <Image
            src="/logo.webp"
            alt={`${SITE_NAME} — ${TAGLINE}`}
            width={1024}
            height={559}
            className="h-14 w-auto object-contain sm:h-16"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'border-b-[3px] border-transparent pb-1 font-body text-[0.73rem] font-bold uppercase tracking-[0.1em] text-gold-muted transition-colors hover:border-gold-light hover:text-gold-light',
                  active && 'border-gold-light text-gold-light'
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <a
          href={ORDER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden shrink-0 items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 font-body text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-whatsapp-dark lg:inline-flex shadow-sm"
        >
          <MessageCircle size={16} />
          Enquire on WhatsApp
        </a>

        <div className="flex shrink-0 items-center gap-5">
          <CartIcon totalItems={totalItems} />

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="text-gold lg:hidden"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      <div
        className={cn(
          'fixed inset-0 z-nav flex flex-col bg-maroon transition-opacity duration-300 lg:hidden',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <span className="font-heading text-lg font-bold text-gold">{SITE_NAME}</span>
          <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="text-gold">
            <X size={28} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col items-center justify-center gap-8">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'font-heading text-2xl uppercase tracking-wide text-gold-muted transition-colors hover:text-gold-light',
                  active && 'text-gold-light'
                )}
              >
                {link.label}
              </Link>
            )
          })}

          <Link
            href="/cart"
            onClick={() => setOpen(false)}
            className={cn(
              'flex items-center gap-2 font-heading text-2xl uppercase tracking-wide text-gold-muted transition-colors hover:text-gold-light',
              isActive(pathname, '/cart') && 'text-gold-light'
            )}
          >
            <ShoppingBag size={22} />
            Cart{totalItems > 0 && ` (${totalItems})`}
          </Link>

          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-whatsapp px-8 py-4 font-body text-sm font-bold uppercase tracking-wide text-white hover:bg-whatsapp-dark"
          >
            <MessageCircle size={18} />
            Order on WhatsApp
          </a>
        </nav>
      </div>
    </header>
  )
}
