import type { Metadata } from 'next'
import { WishlistPageContent } from '@/components/wishlist/WishlistPageContent'
import { getProducts } from '@/hooks/useProducts'

export const metadata: Metadata = {
  title: 'Wishlist',
  description: 'Your saved favorite spices from Kura Gold Spices.',
}

export const dynamic = 'force-dynamic'

export default async function WishlistPage() {
  const allProducts = await getProducts()

  return <WishlistPageContent allProducts={allProducts} />
}
