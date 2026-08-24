import { BestSellers } from '@/components/home/BestSellers'
import { BlogSection } from '@/components/home/BlogSection'
import { FAQ } from '@/components/home/FAQ'
import { Hero } from '@/components/home/Hero'
import { QualityPreview } from '@/components/home/QualityPreview'
import { RecipesComingSoon } from '@/components/home/RecipesComingSoon'
import { ShopByCategory } from '@/components/home/ShopByCategory'
import { ShopMoreSaveMore } from '@/components/home/ShopMoreSaveMore'
import { TrustBar } from '@/components/home/TrustBar'
import { getClaims } from '@/hooks/useClaims'
import { getProducts, getBestSellers, getPublishedBlogs } from '@/hooks/useProducts'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const [products, claims, bestSellers, blogs] = await Promise.all([
    getProducts(),
    getClaims(),
    getBestSellers(),
    getPublishedBlogs(),
  ])

  return (
    <main>
      <Hero products={products} claims={claims} />
      <TrustBar claims={claims} />
      <ShopByCategory />
      <BestSellers products={bestSellers} />
      <ShopMoreSaveMore />
      <QualityPreview claims={claims} />
      <RecipesComingSoon />
      <BlogSection blogs={blogs} />
      <FAQ />
    </main>
  )
}
