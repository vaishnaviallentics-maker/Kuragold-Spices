import Link from 'next/link'
import { Plus } from 'lucide-react'
import { createProduct, toggleProductActive } from '@/app/admin/actions'
import { ToggleSwitch } from '@/components/admin/ToggleSwitch'
import { createClient } from '@/lib/supabase/server'

export default async function AdminProductsPage() {
  const supabase = createClient()
  const { data: products } = await supabase
    .from('products')
    .select('*, product_variants(*)')
    .order('created_at')

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-maroon sm:text-3xl">Products</h1>
        <form action={createProduct}>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 font-body text-xs font-bold uppercase tracking-wide text-maroon-dark transition-colors hover:bg-gold-light"
          >
            <Plus size={16} />
            Add Product
          </button>
        </form>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border-gold/60 bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-border-gold/60 text-xs font-bold uppercase tracking-wide text-muted">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Sizes</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(products ?? []).map((product) => (
              <tr key={product.id} className="border-b border-border-gold/40 last:border-0">
                <td className="px-4 py-3 font-bold text-ink">{product.name}</td>
                <td className="px-4 py-3 capitalize text-muted">{product.category}</td>
                <td className="px-4 py-3 text-muted">
                  {product.product_variants.map((v: { size_label: string }) => v.size_label).join(', ') || '—'}
                </td>
                <td className="px-4 py-3">
                  <ToggleSwitch
                    checked={product.is_active}
                    onToggle={toggleProductActive.bind(null, product.id)}
                  />
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/products/${product.id}`} className="font-bold text-maroon underline-offset-2 hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
