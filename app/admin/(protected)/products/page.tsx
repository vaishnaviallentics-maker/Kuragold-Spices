import Link from 'next/link'
import { Plus } from 'lucide-react'
import { createProduct, toggleProductActive } from '@/app/admin/actions'
import { ToggleSwitch } from '@/components/admin/ToggleSwitch'
import { DeleteProductButton } from '@/components/admin/DeleteProductButton'
import { createClient } from '@/lib/supabase/server'
import { cn } from '@/lib/utils'
import type { Product } from '@/types'

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: { updated?: string; deleted?: string }
}) {
  const supabase = createClient()
  const { data: products } = await supabase
    .from('products')
    .select('*, product_variants(*)')
    .order('sort_order')

  const productList = (products as Product[]) ?? []

  return (
    <div className="flex flex-col gap-6">
      {searchParams?.updated === 'true' && (
        <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-xs font-bold text-emerald-800 flex items-center justify-between shadow-2xs">
          <span>✅ Product updated and saved successfully! All live store pages updated.</span>
        </div>
      )}

      {searchParams?.deleted === 'true' && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-xs font-bold text-amber-900 flex items-center justify-between shadow-2xs">
          <span>🗑️ Product deleted successfully.</span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-maroon sm:text-3xl">Products</h1>
          <p className="text-xs text-muted">Manage spices, availability status, prices, and best seller badges.</p>
        </div>

        <form action={createProduct}>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-maroon px-5 py-2.5 font-body text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-maroon-dark shadow-sm"
          >
            <Plus size={16} />
            Add Product
          </button>
        </form>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border-gold/60 bg-white shadow-xs">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead>
            <tr className="border-b border-border-gold/60 bg-cream/50 text-xs font-bold uppercase tracking-wide text-muted">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Best Seller</th>
              <th className="px-4 py-3">Active</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product) => (
              <tr key={product.id} className="border-b border-border-gold/40 last:border-0 hover:bg-cream/20">
                <td className="px-4 py-3 font-bold text-maroon">{product.name}</td>
                <td className="px-4 py-3 uppercase text-xs font-semibold text-muted">{product.category}</td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider',
                      product.status === 'active' && 'bg-emerald-100 text-emerald-800',
                      product.status === 'coming_soon' && 'bg-amber-100 text-amber-800',
                      product.status === 'future' && 'bg-gray-100 text-gray-600'
                    )}
                  >
                    {product.status ?? 'active'}
                  </span>
                </td>
                <td className="px-4 py-3 text-center text-base">
                  {product.is_best_seller ? '⭐' : '—'}
                </td>
                <td className="px-4 py-3">
                  <ToggleSwitch
                    checked={product.is_active}
                    onToggle={toggleProductActive.bind(null, product.id)}
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/products/${product.id}`} className="font-bold text-maroon hover:underline">
                      Edit
                    </Link>
                    <span className="text-muted">|</span>
                    <DeleteProductButton id={product.id} name={product.name} slug={product.slug} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
