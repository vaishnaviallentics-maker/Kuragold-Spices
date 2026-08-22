import { AboutPreview } from '@/components/home/AboutPreview'
import { FAQ } from '@/components/home/FAQ'
import { Hero } from '@/components/home/Hero'
import { OurProcess } from '@/components/home/OurProcess'
import { ProductsPreview } from '@/components/home/ProductsPreview'
import { QualityPreview } from '@/components/home/QualityPreview'
import { TrustBar } from '@/components/home/TrustBar'
import { WaysToUse } from '@/components/home/WaysToUse'
import { getClaims } from '@/hooks/useClaims'
import { getProducts } from '@/hooks/useProducts'

// Fetch products/claims fresh on every request (matches Phase 2's original
// behavior, and the plan's "confirmed claims only, live" admin-toggle model).
export const dynamic = 'force-dynamic'

export default async function Home() {
  const [products, claims] = await Promise.all([getProducts(), getClaims()])

  return (
    <main>
      <Hero products={products} claims={claims} />
      <TrustBar claims={claims} />
      <AboutPreview products={products} claims={claims} />
      <ProductsPreview products={products} />
      <WaysToUse products={products} />
      <OurProcess />
      <QualityPreview claims={claims} />
      <FAQ />
    </main>
  )
}
