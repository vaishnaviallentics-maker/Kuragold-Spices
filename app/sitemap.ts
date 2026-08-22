import type { MetadataRoute } from 'next'
import { getProducts } from '@/hooks/useProducts'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kuragoldspices.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts()

  const staticRoutes: MetadataRoute.Sitemap = ['', '/about', '/products', '/quality', '/contact'].map(
    (route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: new Date(),
    })
  )

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE_URL}/products/${product.slug}`,
    lastModified: new Date(),
  }))

  return [...staticRoutes, ...productRoutes]
}
