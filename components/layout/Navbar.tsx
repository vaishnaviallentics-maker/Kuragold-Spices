'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ChevronDown, Heart, Menu, MessageCircle, ShoppingBag, User as UserIcon, X } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { SITE_NAME, TAGLINE } from '@/lib/constants'
import { buildGeneralInquiryMessage } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'

type NavDropdownGroup = {
  group: string
  items: { label: string; href: string; badge?: string }[]
}

type NavItem = {
  label: string
  href: string
  dropdown?: NavDropdownGroup[]
}

const NAV_LINKS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  {
    label: 'Products',
    href: '/products',
    dropdown: [
      {
        group: '',
        items: [
          { label: 'All Products', href: '/products' },
          { label: 'Pure Grounded Spices', href: '/products?category=pure_grounded' },
          { label: 'Blended Spices', href: '/products?category=blended' },
          { label: 'Whole Spices', href: '/products?category=whole' },
          { label: 'Combo Packs', href: '/products?category=combo' },
        ],
      },
    ],
  },
  { label: 'Quality', href: '/quality' },
  { label: 'Recipes', href: '/recipes' },
  { label: 'Bulk Inquiry', href: '/bulk-inquiry' },
  { label: 'Blog', href: '/blog' },
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
  const { count: wishlistCount } = useWishlist()
  const { user } = useAuth()

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
    <header className="relative z-nav border-b border-gold/20 bg-maroon-dark shadow-[0_2px_20px_rgba(0,0,0,0.3)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex shrink-0 items-center py-1" aria-label={`${SITE_NAME} — ${TAGLINE}`}>
          <Image
            src="/logo.webp"
            alt={`${SITE_NAME} — ${TAGLINE}`}
            width={1024}
            height={559}
            className="h-16 w-auto object-contain sm:h-20 lg:h-[84px] transition-transform duration-300 hover:scale-105"
            priority
          />
        </Link>

        {/* Desktop Navigation Links with Dropdowns */}
        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href)
            const hasDropdown = Boolean(link.dropdown?.length)

            return (
              <div key={link.label} className="group relative py-2">
                <Link
                  href={link.href}
                  className={cn(
                    'inline-flex items-center gap-1 border-b-[3px] border-transparent pb-1 font-body text-[0.73rem] font-bold uppercase tracking-[0.1em] text-gold-muted transition-colors hover:border-gold-light hover:text-gold-light',
                    active && 'border-gold-light text-gold-light'
                  )}
                >
                  {link.label}
                  {hasDropdown && <ChevronDown size={14} className="text-gold/70 transition-transform group-hover:rotate-180" />}
                </Link>

                {/* Dropdown Menu Panel */}
                {hasDropdown && link.dropdown && (
                  <div className="absolute left-0 top-full hidden w-max min-w-[210px] group-hover:block pt-1.5 z-50">
                    <div className="rounded-2xl border border-gold/30 bg-white p-3 shadow-xl backdrop-blur-md">
                      {link.dropdown.map((group, idx) => (
                        <ul key={idx} className="space-y-1">
                          {group.items.map((item) => (
                            <li key={item.label}>
                              <Link
                                href={item.href}
                                className="flex items-center justify-between rounded-lg px-3.5 py-2 font-body text-xs font-bold text-ink transition-colors hover:bg-cream hover:text-maroon"
                              >
                                <span>{item.label}</span>
                                {item.badge && (
                                  <span className="ml-2 rounded-full bg-maroon-dark/10 px-2 py-0.5 font-body text-[9px] font-bold text-maroon">
                                    {item.badge}
                                  </span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Right Section: Sign In + Wishlist + Cart */}
        <div className="flex shrink-0 items-center gap-4 sm:gap-5">
          {/* Customer Auth Button */}
          {user ? (
            <Link
              href="/account"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-maroon/60 px-3.5 py-1.5 font-body text-xs font-bold text-gold-light hover:bg-gold hover:text-maroon transition-all shadow-xs"
            >
              <UserIcon size={14} />
              <span>My Account</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/15 px-4 py-1.5 font-body text-xs font-bold text-gold-light hover:bg-gold hover:text-maroon transition-all shadow-xs"
            >
              <UserIcon size={14} />
              <span>Sign In</span>
            </Link>
          )}

          {/* Wishlist Button */}
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="relative shrink-0 text-gold-light transition-colors hover:text-gold"
          >
            <Heart size={21} />
            {wishlistCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-maroon px-1 font-body text-[10px] font-bold text-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Icon */}
          <CartIcon totalItems={totalItems} />

          {/* Mobile Hamburger Toggle */}
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

      {/* Mobile Drawer Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-[99999] flex flex-col bg-maroon-dark text-ivory transition-all duration-300 lg:hidden overflow-y-auto',
          open ? 'pointer-events-auto opacity-100 translate-x-0' : 'pointer-events-none opacity-0 -translate-x-full'
        )}
      >
        {/* Drawer Sticky Top Bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3 border-b border-gold/20 bg-maroon-dark">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center">
            <Image
              src="/logo.webp"
              alt={SITE_NAME}
              width={1024}
              height={559}
              className="h-11 w-auto object-contain"
            />
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gold transition-colors hover:bg-white/10"
          >
            <X size={22} />
          </button>
        </div>

        {/* Drawer Navigation Links — simple, scannable list */}
        <nav className="flex flex-col px-5 py-2">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href)
            const hasDropdown = Boolean(link.dropdown?.length)

            if (hasDropdown && link.dropdown) {
              return (
                <details key={link.href} className="group border-b border-gold/10">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-heading text-lg font-bold text-gold-muted transition-colors [&::-webkit-details-marker]:hidden">
                    <span className={cn(active && 'text-gold-light')}>{link.label}</span>
                    <ChevronDown
                      size={18}
                      className="shrink-0 text-gold/60 transition-transform duration-200 group-open:rotate-180"
                    />
                  </summary>
                  <div className="flex flex-col gap-0.5 pb-3">
                    {link.dropdown[0].items.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          'rounded-lg px-3 py-2.5 font-body text-sm text-gold-muted/90 transition-colors hover:bg-white/5 hover:text-gold-light',
                          isActive(pathname, subItem.href) && 'text-gold-light'
                        )}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </details>
              )
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'border-b border-gold/10 py-4 font-heading text-lg font-bold text-gold-muted transition-colors hover:text-gold-light',
                  active && 'text-gold-light'
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Quick actions + primary CTA */}
        <div className="mt-auto flex flex-col gap-4 px-5 py-6">
          <div className="grid grid-cols-3 gap-2.5">
            <Link
              href={user ? '/account' : '/login'}
              onClick={() => setOpen(false)}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-gold/25 py-3 text-gold-light transition-colors hover:bg-white/5"
            >
              <UserIcon size={19} />
              <span className="font-body text-[11px] font-bold">{user ? 'Account' : 'Sign In'}</span>
            </Link>

            <Link
              href="/wishlist"
              onClick={() => setOpen(false)}
              className="relative flex flex-col items-center gap-1.5 rounded-xl border border-gold/25 py-3 text-gold-light transition-colors hover:bg-white/5"
            >
              <Heart size={19} />
              <span className="font-body text-[11px] font-bold">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="absolute right-2.5 top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-maroon px-1 font-body text-[9px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className="relative flex flex-col items-center gap-1.5 rounded-xl border border-gold/25 py-3 text-gold-light transition-colors hover:bg-white/5"
            >
              <ShoppingBag size={19} />
              <span className="font-body text-[11px] font-bold">Cart</span>
              {totalItems > 0 && (
                <span className="absolute right-2.5 top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-whatsapp px-1 font-body text-[9px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 font-body text-sm font-bold uppercase tracking-wide text-white shadow-md transition-colors hover:bg-whatsapp-dark"
          >
            <MessageCircle size={18} />
            Order on WhatsApp
          </a>
        </div>
      </div>
    </header>
  )
}
