import { notFound } from 'next/navigation'
import { updateProduct } from '@/app/admin/actions'
import { AddVariantForm } from '@/components/admin/AddVariantForm'
import { VariantRow } from '@/components/admin/VariantRow'
import { createClient } from '@/lib/supabase/server'
import type { ProductVariant } from '@/types'

const inputClass =
  'w-full rounded-lg border border-border-gold bg-white px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-gold'
const labelClass = 'mb-1.5 block font-body text-xs font-bold uppercase tracking-wide text-muted'

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: product } = await supabase
    .from('products')
    .select('*, product_variants(*)')
    .eq('id', params.id)
    .single()

  if (!product) notFound()

  const variants = [...(product.product_variants as ProductVariant[])].sort(
    (a, b) => a.sort_order - b.sort_order
  )

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-heading text-2xl font-bold text-maroon sm:text-3xl">Edit Product</h1>

      <form
        action={updateProduct.bind(null, product.id, product.slug)}
        className="flex max-w-2xl flex-col gap-4 rounded-xl border border-border-gold/60 bg-white p-6"
      >
        <div>
          <label className={labelClass}>Product Name</label>
          <input name="name" defaultValue={product.name} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Slug</label>
          <input name="slug" defaultValue={product.slug} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Category</label>
          <select name="category" defaultValue={product.category} className={inputClass}>
            <option value="spice">Spice</option>
            <option value="masala">Masala</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Tagline</label>
          <input name="tagline" defaultValue={product.tagline ?? ''} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Description</label>
          <textarea name="description" defaultValue={product.description ?? ''} rows={4} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Image URL</label>
          <input name="image_url" defaultValue={product.image_url ?? ''} className={inputClass} />
        </div>

        <label className="flex items-center gap-2 font-body text-sm font-bold text-ink">
          <input type="checkbox" name="is_active" defaultChecked={product.is_active} className="h-4 w-4" />
          Active on public site
        </label>

        <button
          type="submit"
          className="mt-2 self-start rounded-full bg-gold px-6 py-3 font-body text-sm font-bold uppercase tracking-wide text-maroon-dark transition-colors hover:bg-gold-light"
        >
          Save
        </button>
      </form>

      <div className="max-w-2xl rounded-xl border border-border-gold/60 bg-white p-6">
        <h2 className="mb-4 font-heading text-lg font-bold text-maroon">Sizes &amp; Prices</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border-gold/60 text-xs font-bold uppercase tracking-wide text-muted">
              <th className="py-2 pr-4">Size</th>
              <th className="py-2 pr-4">Price</th>
              <th className="py-2 pr-4">Active</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {variants.map((variant) => (
              <VariantRow key={variant.id} variant={variant} productId={product.id} slug={product.slug} />
            ))}
          </tbody>
        </table>

        <AddVariantForm productId={product.id} slug={product.slug} />
      </div>
    </div>
  )
}
