'use client'

import { useState, useTransition } from 'react'
import { Trash2 } from 'lucide-react'
import { deleteVariant, toggleVariantActive, updateVariant } from '@/app/admin/actions'
import { ToggleSwitch } from './ToggleSwitch'
import type { ProductVariant } from '@/types'

export function VariantRow({ variant, productId, slug }: { variant: ProductVariant; productId: string; slug: string }) {
  const [price, setPrice] = useState(String(variant.price_inr))
  const [isPending, startTransition] = useTransition()
  const dirty = price !== String(variant.price_inr)

  return (
    <tr className="border-b border-border-gold/40 last:border-0">
      <td className="py-2 pr-4 text-sm font-bold text-ink">{variant.size_label}</td>
      <td className="py-2 pr-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted">₹</span>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-24 rounded-md border border-border-gold px-2 py-1 text-sm outline-none focus:border-gold"
          />
          {dirty && (
            <button
              type="button"
              disabled={isPending}
              onClick={() => startTransition(() => updateVariant(variant.id, Number(price), slug))}
              className="text-xs font-bold text-maroon underline-offset-2 hover:underline"
            >
              Save
            </button>
          )}
        </div>
      </td>
      <td className="py-2 pr-4">
        <ToggleSwitch
          checked={variant.is_active}
          onToggle={(next) => toggleVariantActive(variant.id, next, slug)}
        />
      </td>
      <td className="py-2">
        <button
          type="button"
          disabled={isPending}
          aria-label={`Delete ${variant.size_label}`}
          onClick={() => startTransition(() => deleteVariant(variant.id, productId, slug))}
          className="text-muted transition-colors hover:text-maroon"
        >
          <Trash2 size={16} />
        </button>
      </td>
    </tr>
  )
}
