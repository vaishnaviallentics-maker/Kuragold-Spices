'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Trash2, ShieldCheck, Truck, CheckCircle2 } from 'lucide-react'
import { LinkButton } from '@/components/ui/Button'
import { QuantityStepper } from '@/components/products/QuantityStepper'
import { useCart } from '@/context/CartContext'
import { getProducts } from '@/hooks/useProducts'
import { buildCartOrderMessage } from '@/lib/whatsapp'
import type { Product } from '@/types'

function CartSuggestedProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const defaultVariant = product.product_variants[0]

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!defaultVariant) return
    addItem(
      {
        productId: product.id,
        productName: product.name,
        productImage: product.image_url,
        variantId: defaultVariant.id,
        sizeLabel: defaultVariant.size_label,
        price: defaultVariant.price_inr,
      },
      1
    )
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="flex items-center gap-3.5 rounded-2xl border border-border-gold/60 bg-white p-3 shadow-sm transition-all duration-300 hover:border-gold hover:shadow-md">
      {/* Compact Image */}
      <Link href={`/products/${product.slug}`} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-cream sm:h-28 sm:w-28">
        {product.image_url && (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="112px"
            className="object-contain p-2 transition-transform duration-300 hover:scale-105"
          />
        )}
      </Link>

      {/* Info & Action */}
      <div className="flex flex-1 flex-col justify-between self-stretch py-0.5">
        <div>
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-heading text-sm font-bold leading-tight text-maroon hover:underline line-clamp-2">
              {product.name}
            </h3>
          </Link>
          {defaultVariant && (
            <p className="mt-1 font-body text-sm font-bold text-maroon">
              ₹{defaultVariant.price_inr.toLocaleString('en-IN')}
              <span className="ml-1.5 font-body text-xs font-normal text-muted">
                ({defaultVariant.size_label})
              </span>
            </p>
          )}
        </div>

        <div className="mt-2">
          <button
            type="button"
            onClick={handleAddToCart}
            className="inline-flex items-center justify-center rounded-full bg-maroon px-4 py-1.5 font-body text-xs font-bold uppercase tracking-wide text-ivory transition-colors hover:bg-maroon-dark"
          >
            {added ? 'Added ✓' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart()
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([])

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    getProducts().then((allProducts) => {
      const cartProductIds = items.map((i) => i.productId)
      const filtered = allProducts.filter((p) => !cartProductIds.includes(p.id))
      setSuggestedProducts(filtered.length > 0 ? filtered.slice(0, 3) : allProducts.slice(0, 3))
    })
  }, [items])

  const handleCheckout = () => {
    window.open(buildCartOrderMessage(items), '_blank', 'noopener,noreferrer')
  }

  if (items.length === 0) {
    return (
      <main className="px-6 py-14 sm:px-10 lg:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="font-heading text-3xl font-bold text-maroon">Your cart is empty</h1>
          <p className="mt-3 text-sm text-muted">
            Explore our pure spices from Hyderabad and add your favourites to the cart.
          </p>
          <LinkButton href="/products" variant="primary" className="mt-6 inline-flex">
            Shop Products
          </LinkButton>
        </div>
      </main>
    )
  }

  return (
    <main className="px-6 py-10 sm:px-10 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-heading text-3xl font-bold text-maroon sm:text-4xl">
            Your Cart
          </h1>
          <span className="rounded-full bg-cream px-4 py-1.5 font-body text-xs font-bold text-maroon">
            {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Item Cards List */}
          <div className="space-y-4 lg:col-span-7">
            {items.map((item) => (
              <div
                key={item.variantId}
                className="flex items-center gap-4 rounded-2xl border border-border-gold/60 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:gap-6 sm:p-5"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-cream">
                  {item.productImage && (
                    <Image
                      src={item.productImage}
                      alt={item.productName}
                      fill
                      sizes="80px"
                      className="object-contain p-2"
                    />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h2 className="font-heading text-base font-bold text-maroon truncate">
                    {item.productName}
                  </h2>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-cream px-2 py-0.5 font-body text-xs font-bold text-maroon">
                      {item.sizeLabel}
                    </span>
                    <span className="font-body text-xs text-muted">
                      ₹{item.price.toLocaleString('en-IN')} MRP
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>In Stock · Pure & Fresh</span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3 sm:flex-row sm:items-center sm:gap-6">
                  <QuantityStepper
                    quantity={item.quantity}
                    onChange={(q) => updateQuantity(item.variantId, q)}
                  />

                  <div className="text-right">
                    <p className="font-body text-lg font-bold text-maroon">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>

                  <button
                    type="button"
                    aria-label={`Remove ${item.productName} (${item.sizeLabel})`}
                    onClick={() => removeItem(item.variantId)}
                    className="p-1 text-muted transition-colors hover:text-maroon"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}

            <div className="pt-2">
              <Link href="/products" className="inline-flex items-center gap-2 text-sm font-bold text-maroon underline-offset-4 hover:underline">
                ← Continue Shopping
              </Link>
            </div>

            {/* You may also like... Section inside Left Column */}
            {suggestedProducts.length > 0 && (
              <div className="mt-8 border-t border-border-gold/40 pt-6">
                <h2 className="mb-4 font-heading text-lg font-bold text-maroon">
                  You may also like...
                </h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {suggestedProducts.map((product) => (
                    <CartSuggestedProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-gold/30 bg-white p-6 shadow-md">
              <h2 className="border-b border-border-gold/40 pb-4 font-heading text-xl font-bold text-maroon">
                Order Summary
              </h2>

              <div className="mt-4 space-y-3 font-body text-sm text-muted">
                <div className="flex justify-between border-b border-border-gold/40 pb-3">
                  <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                  <span className="font-bold text-maroon">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between pt-1 font-body text-lg font-bold text-maroon">
                  <span>Total Amount</span>
                  <span className="text-xl">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <p className="mt-2 text-[11px] text-muted leading-relaxed">
                MRP product total only. Order details and confirmation handled directly over WhatsApp.
              </p>

              <button
                type="button"
                onClick={handleCheckout}
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-maroon px-8 py-3.5 font-body text-sm font-bold uppercase tracking-wide text-white shadow-md transition-all hover:bg-maroon-dark hover:shadow-lg"
              >
                Checkout
              </button>

              {/* Trust Badges */}
              <div className="mt-6 space-y-2.5 border-t border-border-gold/40 pt-5 text-xs text-muted">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-gold shrink-0" />
                  <span>100% Pure & Authentic Indian Spices</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-gold shrink-0" />
                  <span>Direct Personal Confirmation from Our Team</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-gold shrink-0" />
                  <span>Hygienically Packed & Fast Dispatch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}




