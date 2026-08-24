'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Building2, Heart, LogOut, Package, ShoppingBag, User as UserIcon } from 'lucide-react'
import { LinkButton } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { useAuth } from '@/context/AuthContext'
import { useWishlist } from '@/context/WishlistContext'

export default function AccountPage() {
  const { user, loading, signOut } = useAuth()
  const { wishlist } = useWishlist()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading || !user) {
    return (
      <main className="bg-ivory px-6 py-20 text-center">
        <p className="font-heading text-lg font-bold text-maroon">Loading your account details...</p>
      </main>
    )
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <main className="bg-ivory px-6 py-12 sm:px-10 lg:py-16">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border-gold/40 pb-6">
          <div>
            <SectionLabel>Customer Account</SectionLabel>
            <h1 className="font-heading text-3xl font-bold text-maroon sm:text-4xl">
              Welcome back, {user.user_metadata?.full_name || user.email?.split('@')[0]}!
            </h1>
            <p className="mt-1 text-xs text-muted">Logged in as {user.email}</p>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-rose-300 bg-rose-50 px-5 py-2.5 font-body text-xs font-bold text-rose-700 hover:bg-rose-100 shadow-xs"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>

        {/* Dashboard Quick Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/bulk-inquiry"
            className="group flex flex-col justify-between rounded-3xl border border-gold/50 bg-cream/30 p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-gold hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="font-heading text-xs font-bold uppercase tracking-wider text-maroon">
                Bulk Wholesale Orders
              </span>
              <div className="rounded-full bg-maroon p-3 text-white">
                <Building2 size={20} />
              </div>
            </div>
            <div className="mt-6">
              <p className="font-heading text-xl font-bold text-maroon">Bulk Quote</p>
              <p className="mt-1 text-xs text-muted">Commercial rates &amp; custom batch milling</p>
            </div>
          </Link>

          <Link
            href="/wishlist"
            className="group flex flex-col justify-between rounded-3xl border border-gold/30 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-gold hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="font-heading text-xs font-bold uppercase tracking-wider text-maroon">
                Saved Favourites
              </span>
              <div className="rounded-full bg-cream p-3 text-maroon">
                <Heart size={20} />
              </div>
            </div>
            <div className="mt-6">
              <p className="font-heading text-3xl font-bold text-maroon">{wishlist.length}</p>
              <p className="mt-1 text-xs text-muted">Saved spices in wishlist</p>
            </div>
          </Link>

          <Link
            href="/products"
            className="group flex flex-col justify-between rounded-3xl border border-gold/30 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-gold hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="font-heading text-xs font-bold uppercase tracking-wider text-maroon">
                Order Pure Spices
              </span>
              <div className="rounded-full bg-cream p-3 text-maroon">
                <Package size={20} />
              </div>
            </div>
            <div className="mt-6">
              <p className="font-heading text-xl font-bold text-maroon">Browse Store</p>
              <p className="mt-1 text-xs text-muted">Explore 100% ground &amp; whole spices</p>
            </div>
          </Link>

          <Link
            href="/cart"
            className="group flex flex-col justify-between rounded-3xl border border-gold/30 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-gold hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="font-heading text-xs font-bold uppercase tracking-wider text-maroon">
                Cart &amp; Orders
              </span>
              <div className="rounded-full bg-cream p-3 text-maroon">
                <ShoppingBag size={20} />
              </div>
            </div>
            <div className="mt-6">
              <p className="font-heading text-xl font-bold text-maroon">WhatsApp Orders</p>
              <p className="mt-1 text-xs text-muted">Review cart items &amp; send order</p>
            </div>
          </Link>
        </div>

        {/* Account Details Box */}
        <div className="rounded-3xl border border-border-gold/60 bg-white p-8 shadow-xs">
          <h2 className="font-heading text-xl font-bold text-maroon mb-4">Account Information</h2>
          <div className="space-y-3 font-body text-sm text-ink">
            <p>
              <strong className="text-maroon font-semibold">Name:</strong> {user.user_metadata?.full_name || 'Customer'}
            </p>
            <p>
              <strong className="text-maroon font-semibold">Email:</strong> {user.email}
            </p>
            <p>
              <strong className="text-maroon font-semibold">Account ID:</strong> {user.id}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-border-gold/40 flex flex-wrap gap-4">
            <LinkButton href="/products" variant="primary">
              Continue Shopping →
            </LinkButton>
          </div>
        </div>
      </div>
    </main>
  )
}
