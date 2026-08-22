import type { Metadata } from 'next'
import { ProductCard } from '@/components/products/ProductCard'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { getProducts } from '@/hooks/useProducts'

export const metadata: Metadata = {
  title: 'Products',
  description: 'Browse pure, natural spices from Kura Gold Spices — pick a pack size and add to cart.',
}

// Plan 3.1: "Data fetch: Server component — fetch from Supabase at request time".
export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <main className="bg-ivory px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-center text-center">
          <SectionLabel className="justify-center">Our Products</SectionLabel>
          <h1 className="font-heading text-3xl font-bold text-maroon sm:text-4xl">
            Pure Spices. Real Flavour.
          </h1>
          <p className="mt-3 max-w-xl text-sm text-muted">
            Pick a pack size for each spice and add it to your cart — review everything before
            sending your order.
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted">Products coming soon.</p>
        )}
      </div>
    </main>
  )
}
