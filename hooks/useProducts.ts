import { createClient } from '@/lib/supabase/public'
import type { Product } from '@/types'

export async function getProducts(): Promise<Product[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*, product_variants(*)')
    .eq('is_active', true)
    .order('created_at')

  if (error || !data) return []

  return data.map((product) => ({
    ...product,
    product_variants: [...product.product_variants].sort(
      (a, b) => a.sort_order - b.sort_order
    ),
  })) as Product[]
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*, product_variants(*)')
    .eq('is_active', true)
    .eq('slug', slug)
    .maybeSingle()

  if (error || !data) return null

  return {
    ...data,
    product_variants: [...data.product_variants].sort((a, b) => a.sort_order - b.sort_order),
  } as Product
}
