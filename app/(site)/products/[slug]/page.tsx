import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ProductPurchasePanel } from '@/components/products/ProductPurchasePanel'
import { getProductBySlug, getProducts } from '@/hooks/useProducts'

const PLACEHOLDER_DESCRIPTION = '[To be confirmed by Sir]'

const CATEGORY_LABELS: Record<string, string> = {
  masala: 'Masala Blend',
  combo: 'Combo Pack',
  spice: 'Spice Powder',
}

interface ProductPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug)
  if (!product) return {}

  return {
    title: product.name,
    description: product.tagline
      ? `${product.tagline} — ${product.name} from Kura Gold Spices.`
      : product.name,
    openGraph: product.image_url ? { images: [{ url: product.image_url }] } : undefined,
  }
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug)
  if (!product) notFound()

  const hasDescription = Boolean(product.description) && product.description !== PLACEHOLDER_DESCRIPTION

  return (
    <main className="bg-ivory px-6 py-16 sm:px-10">
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
        <div className="relative h-80 overflow-hidden rounded-2xl bg-cream sm:h-96">
          {product.image_url && (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain p-10"
            />
          )}
        </div>

        <div>
          <p className="font-body text-xs font-bold uppercase tracking-wide text-gold">
            {CATEGORY_LABELS[product.category] ?? 'Spice Powder'}
          </p>
          <h1 className="mt-1 font-heading text-3xl font-bold text-maroon sm:text-4xl">{product.name}</h1>
          {product.tagline && (
            <p className="mt-2 font-accent text-lg italic text-gold">{product.tagline}</p>
          )}

          <div className="my-6 h-px bg-border-gold" />

          {hasDescription && (
            <p className="mb-8 max-w-lg text-sm leading-relaxed text-muted">{product.description}</p>
          )}

          <ProductPurchasePanel product={product} />
        </div>
      </div>
    </main>
  )
}
