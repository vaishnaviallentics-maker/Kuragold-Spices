'use client'

import { Heart, ArrowLeft, ShoppingBag } from 'lucide-react'
import { ProductCard } from '@/components/products/ProductCard'
import { LinkButton } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { useWishlist } from '@/context/WishlistContext'
import type { Product } from '@/types'

export function WishlistPageContent({ allProducts }: { allProducts: Product[] }) {
  const { wishlist } = useWishlist()

  // Filter products that are saved in the wishlist
  const wishlistedProducts = allProducts.filter((p) => wishlist.includes(p.id))

  return (
    <main className="bg-ivory px-6 py-12 sm:px-10 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col items-center text-center">
          <SectionLabel className="justify-center">Your Favourites</SectionLabel>
          <h1 className="font-heading text-3xl font-bold text-maroon sm:text-4xl">
            My Saved Spices ({wishlistedProducts.length})
          </h1>
          <p className="mt-2 text-sm text-muted">
            Keep track of your favorite spices and easily add them to your cart.
          </p>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="mx-auto max-w-md rounded-3xl border border-gold/30 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cream text-maroon">
              <Heart size={32} className="text-maroon/80" />
            </div>
            <h2 className="font-heading text-xl font-bold text-maroon">Your Wishlist is Empty</h2>
            <p className="mt-2 text-xs text-muted leading-relaxed">
              You haven&apos;t saved any spices to your favorites yet. Browse our pure spices and click the heart icon on any product to save it here!
            </p>
            <div className="mt-6">
              <LinkButton href="/products" variant="primary" className="w-full justify-center">
                Explore Spices Now →
              </LinkButton>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <LinkButton href="/products" variant="outline" className="text-xs">
                <ArrowLeft size={14} />
                Continue Shopping
              </LinkButton>
              <p className="text-xs font-bold text-muted uppercase tracking-wider">
                {wishlistedProducts.length} {wishlistedProducts.length === 1 ? 'Item Saved' : 'Items Saved'}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {wishlistedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
