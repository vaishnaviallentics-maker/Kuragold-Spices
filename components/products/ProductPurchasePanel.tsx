'use client'

import { useState } from 'react'
import { AddToCartButton } from './AddToCartButton'
import { PriceDisplay } from './PriceDisplay'
import { QuantityStepper } from './QuantityStepper'
import { SizeSelector } from './SizeSelector'
import { buildSingleProductOrderMessage } from '@/lib/whatsapp'
import type { Product } from '@/types'

export function ProductPurchasePanel({ product }: { product: Product }) {
  const variants = product.product_variants
  const [selectedId, setSelectedId] = useState(variants[0]?.id)
  const [quantity, setQuantity] = useState(1)
  const selected = variants.find((v) => v.id === selectedId) ?? variants[0]

  if (!selected) return null

  return (
    <div className="flex flex-col gap-5">
      <SizeSelector
        variants={variants}
        selectedId={selected.id}
        onSelect={(v) => {
          setSelectedId(v.id)
          setQuantity(1)
        }}
      />

      <PriceDisplay price={selected.price_inr} />

      <div className="flex items-center gap-4">
        <span className="font-body text-xs font-bold uppercase tracking-wide text-muted">Quantity</span>
        <QuantityStepper quantity={quantity} onChange={setQuantity} />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <AddToCartButton
          productId={product.id}
          productName={product.name}
          productImage={product.image_url}
          variantId={selected.id}
          sizeLabel={selected.size_label}
          price={selected.price_inr}
          quantity={quantity}
          className="flex-1 py-3 text-xs sm:w-auto"
        />
        <a
          href={buildSingleProductOrderMessage(product.name, selected.size_label, selected.price_inr, quantity)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center rounded-full border-2 border-maroon bg-white px-6 py-3 font-body text-xs font-bold uppercase tracking-wide text-maroon transition-colors hover:bg-maroon hover:text-ivory sm:w-auto"
        >
          Shop Now
        </a>
      </div>
    </div>
  )
}

