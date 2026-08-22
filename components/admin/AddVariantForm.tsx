'use client'

import { useState, useTransition } from 'react'
import { addVariant } from '@/app/admin/actions'

export function AddVariantForm({ productId, slug }: { productId: string; slug: string }) {
  const [size, setSize] = useState('')
  const [price, setPrice] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleAdd = () => {
    if (!size.trim() || !price) return
    startTransition(async () => {
      await addVariant(productId, slug, size.trim(), Number(price))
      setSize('')
      setPrice('')
    })
  }

  return (
    <div className="mt-4 flex flex-wrap items-end gap-3">
      <div>
        <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-muted">Size</label>
        <input
          value={size}
          onChange={(e) => setSize(e.target.value)}
          placeholder="e.g. 1kg"
          className="w-28 rounded-md border border-border-gold px-2 py-1.5 text-sm outline-none focus:border-gold"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-muted">Price (₹)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-24 rounded-md border border-border-gold px-2 py-1.5 text-sm outline-none focus:border-gold"
        />
      </div>
      <button
        type="button"
        disabled={isPending}
        onClick={handleAdd}
        className="rounded-full bg-gold px-4 py-2 font-body text-xs font-bold uppercase tracking-wide text-maroon-dark transition-colors hover:bg-gold-light disabled:opacity-60"
      >
        + Add Size
      </button>
    </div>
  )
}
