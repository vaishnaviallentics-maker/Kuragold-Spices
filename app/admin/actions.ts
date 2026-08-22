'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

// Home/About/Quality/Products-grid are all `force-dynamic` (never cached), so
// they reflect Supabase changes on the very next request with no extra work.
// /products/[slug] is the one statically generated page — it needs an
// explicit revalidatePath whenever the product or a variant it shows changes.

export async function toggleProductActive(id: string, isActive: boolean) {
  const supabase = createClient()
  await supabase.from('products').update({ is_active: isActive }).eq('id', id)
  revalidatePath('/admin/products')
}

export async function createProduct() {
  const supabase = createClient()
  const slug = `new-product-${Date.now()}`
  const { data, error } = await supabase
    .from('products')
    .insert({ name: 'New Product', slug, category: 'spice', is_active: false })
    .select('id')
    .single()

  if (error || !data) return

  revalidatePath('/admin/products')
  redirect(`/admin/products/${data.id}`)
}

export async function updateProduct(id: string, oldSlug: string, formData: FormData) {
  const supabase = createClient()
  const newSlug = String(formData.get('slug') ?? oldSlug)

  await supabase
    .from('products')
    .update({
      name: String(formData.get('name') ?? ''),
      slug: newSlug,
      category: String(formData.get('category') ?? 'spice'),
      tagline: String(formData.get('tagline') ?? ''),
      description: String(formData.get('description') ?? ''),
      image_url: String(formData.get('image_url') ?? ''),
      is_active: formData.get('is_active') === 'on',
    })
    .eq('id', id)

  revalidatePath('/admin/products')
  revalidatePath(`/admin/products/${id}`)
  revalidatePath(`/products/${oldSlug}`)
  if (newSlug !== oldSlug) revalidatePath(`/products/${newSlug}`)
}

export async function addVariant(productId: string, slug: string, sizeLabel: string, price: number) {
  const supabase = createClient()
  await supabase
    .from('product_variants')
    .insert({ product_id: productId, size_label: sizeLabel, price_inr: price, sort_order: 99 })

  revalidatePath(`/admin/products/${productId}`)
  revalidatePath(`/products/${slug}`)
}

export async function updateVariant(id: string, price: number, slug: string) {
  const supabase = createClient()
  const { data } = await supabase
    .from('product_variants')
    .update({ price_inr: price })
    .eq('id', id)
    .select('product_id')
    .single()

  if (data) revalidatePath(`/admin/products/${data.product_id}`)
  revalidatePath(`/products/${slug}`)
}

export async function toggleVariantActive(id: string, isActive: boolean, slug: string) {
  const supabase = createClient()
  const { data } = await supabase
    .from('product_variants')
    .update({ is_active: isActive })
    .eq('id', id)
    .select('product_id')
    .single()

  if (data) revalidatePath(`/admin/products/${data.product_id}`)
  revalidatePath(`/products/${slug}`)
}

export async function deleteVariant(id: string, productId: string, slug: string) {
  const supabase = createClient()
  await supabase.from('product_variants').delete().eq('id', id)
  revalidatePath(`/admin/products/${productId}`)
  revalidatePath(`/products/${slug}`)
}

export async function toggleClaim(key: string, isConfirmed: boolean) {
  const supabase = createClient()
  await supabase.from('site_claims').update({ is_confirmed: isConfirmed }).eq('key', key)
  revalidatePath('/admin/claims')
}

export async function markEnquiryRead(id: string, isRead: boolean) {
  const supabase = createClient()
  await supabase.from('enquiries').update({ is_read: isRead }).eq('id', id)
  revalidatePath('/admin/enquiries')
}
