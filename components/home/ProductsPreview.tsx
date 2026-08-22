import { ProductCard } from '@/components/products/ProductCard'
import { LinkButton } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'
import type { Product } from '@/types'

export function ProductsPreview({ products }: { products: Product[] }) {
  return (
    <section className="bg-ivory px-6 py-8 sm:px-10 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col items-center text-center">
          <SectionLabel className="justify-center">Our Products</SectionLabel>
          <h2 className="font-heading text-2xl font-bold text-maroon sm:text-3xl lg:text-4xl">
            Pure Spices. Real Flavour.
          </h2>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted">Products coming soon.</p>
        )}

        <div className="mt-6 text-center">
          <LinkButton href="/products" variant="outline">View All Products</LinkButton>
        </div>
      </div>
    </section>
  )
}
