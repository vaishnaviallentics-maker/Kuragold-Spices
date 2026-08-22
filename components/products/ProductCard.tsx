'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { AddToCartButton } from './AddToCartButton'
import { PriceDisplay } from './PriceDisplay'
import { SizeSelector } from './SizeSelector'
import { buildSingleProductOrderMessage } from '@/lib/whatsapp'
import type { Product } from '@/types'

export function ProductCard({ product }: { product: Product }) {
  const variants = product.product_variants
  const [selectedId, setSelectedId] = useState(variants[0]?.id)
  const selected = variants.find((v) => v.id === selectedId) ?? variants[0]

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border-gold/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/products/${product.slug}`} className="relative block h-48 bg-cream">
        {product.image_url && (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <Link href={`/products/${product.slug}`}>
          <p className="font-body text-xs font-bold uppercase tracking-wide text-gold">{product.tagline}</p>
          <h3 className="font-heading text-lg font-bold text-maroon">{product.name}</h3>
        </Link>

        {selected && (
          <div className="mt-auto flex flex-col gap-3">
            <SizeSelector variants={variants} selectedId={selected.id} onSelect={(v) => setSelectedId(v.id)} />
            <PriceDisplay price={selected.price_inr} />

            <div className="flex flex-col gap-2 sm:flex-row">
              <AddToCartButton
                productId={product.id}
                productName={product.name}
                productImage={product.image_url}
                variantId={selected.id}
                sizeLabel={selected.size_label}
                price={selected.price_inr}
                className="flex-1 py-2.5 text-xs"
              />
              <a
                href={buildSingleProductOrderMessage(product.name, selected.size_label, selected.price_inr)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center rounded-full border-2 border-maroon bg-white px-3 py-2.5 font-body text-xs font-bold uppercase tracking-wide text-maroon transition-colors hover:bg-maroon hover:text-ivory"
              >
                Shop Now
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

