'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { LayoutDashboard, Mail, Menu, Package, ShieldCheck, ShoppingBag, X, type LucideIcon } from 'lucide-react'
import { LogoutButton } from './LogoutButton'
import { SITE_NAME } from '@/lib/constants'
import { cn } from '@/lib/utils'

const NAV_ITEMS: { label: string; href: string; icon: LucideIcon }[] = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Enquiries', href: '/admin/enquiries', icon: Mail },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { label: 'Claims', href: '/admin/claims', icon: ShieldCheck },
]

function isActive(pathname: string, href: string) {
  return href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)
}

export function AdminShell({ email, children }: { email: string; children: React.ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const navLinks = (onNavigate?: () => void) => (
    <nav className="flex flex-1 flex-col gap-1">
      {NAV_ITEMS.map((item) => {
        const active = isActive(pathname, item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              'flex items-center gap-3 rounded-lg px-4 py-2.5 font-body text-sm font-bold transition-colors',
              active ? 'bg-gold/15 text-maroon' : 'text-muted hover:bg-cream hover:text-maroon'
            )}
          >
            <item.icon size={18} />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )

  return (
    <div className="flex min-h-screen bg-ivory">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border-gold bg-white lg:flex">
        <div className="border-b border-border-gold px-5 py-5">
          <Image
            src="/logo.webp"
            alt={SITE_NAME}
            width={1024}
            height={559}
            className="h-9 w-auto object-contain"
          />
        </div>
        <div className="flex flex-1 flex-col justify-between p-4">
          {navLinks()}
          <LogoutButton />
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border-gold bg-white px-5 py-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="text-maroon lg:hidden"
            >
              <Menu size={24} />
            </button>
            <div>
              <p className="font-heading text-base font-bold text-maroon">Kura Gold Admin</p>
              <p className="text-xs text-muted">Logged in as: {email}</p>
            </div>
          </div>
          <Link href="/" className="hidden text-xs font-bold text-muted hover:text-maroon sm:block">
            ← Back to site
          </Link>
        </header>

        <main className="flex-1 p-5 sm:p-8">{children}</main>
      </div>

      <div
        className={cn(
          'fixed inset-0 z-50 flex flex-col bg-white transition-opacity duration-200 lg:hidden',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <div className="flex items-center justify-between border-b border-border-gold px-5 py-4">
          <p className="font-heading text-base font-bold text-maroon">Kura Gold Admin</p>
          <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="text-maroon">
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-1 flex-col justify-between p-4">
          {navLinks(() => setOpen(false))}
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}
