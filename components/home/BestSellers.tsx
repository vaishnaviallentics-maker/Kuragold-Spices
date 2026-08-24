import { ProductCard } from '@/components/products/ProductCard'
import { LinkButton } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'
import type { Product } from '@/types'

export function BestSellers({ products }: { products: Product[] }) {
  const displayProducts = products.length > 0 ? products : []

  return (
    <section className="bg-white px-6 py-12 sm:px-10 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <SectionLabel className="justify-center">Best Sellers</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-maroon sm:text-4xl">
            Loved by Kitchens Across India
          </h2>
          <p className="mt-2 text-sm text-muted">
            Our most popular pure ground spices, packed with authentic flavor and aroma.
          </p>
        </div>

        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted py-8">Our best sellers will appear here.</p>
        )}

        <div className="mt-10 text-center">
          <LinkButton href="/products" variant="outline" className="border-maroon text-maroon hover:bg-maroon hover:text-ivory">
            View All Products
          </LinkButton>
        </div>
      </div>
    </section>
  )
}
