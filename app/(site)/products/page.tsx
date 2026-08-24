import type { Metadata } from 'next'
import { ProductsExplorer } from '@/components/products/ProductsExplorer'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { getProducts } from '@/hooks/useProducts'

export const metadata: Metadata = {
  title: 'Products',
  description: 'Browse pure, natural spices from Kura Gold Spices — pick a pack size and add to cart.',
}

export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <main className="bg-ivory px-6 py-12 sm:px-10 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col items-center text-center">
          <SectionLabel className="justify-center">Our Products</SectionLabel>
          <h1 className="font-heading text-3xl font-bold text-maroon sm:text-4xl">
            Pure Spices. Real Flavour.
          </h1>
          <p className="mt-3 max-w-xl text-sm text-muted">
            Pick a pack size for each spice and add it to your cart — review everything before sending your order.
          </p>
        </div>

        {/* Sidebar Filter + Interactive Product Grid */}
        <ProductsExplorer initialProducts={products} />
      </div>
    </main>
  )
}
