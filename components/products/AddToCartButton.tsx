'use client'

import { useState } from 'react'
import { Check, ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { cn } from '@/lib/utils'

interface AddToCartButtonProps {
  productId: string
  productName: string
  productImage: string
  variantId: string
  sizeLabel: string
  price: number
  quantity?: number
  className?: string
}

export function AddToCartButton({
  productId,
  productName,
  productImage,
  variantId,
  sizeLabel,
  price,
  quantity = 1,
  className,
}: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleClick = () => {
    addItem({ productId, productName, productImage, variantId, sizeLabel, price }, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-4 py-2.5 font-body text-xs font-bold uppercase tracking-wide text-maroon-dark transition-colors hover:bg-gold-light',
        className
      )}
    >
      {added ? <Check size={16} /> : <ShoppingBag size={16} />}
      {added ? 'Added to Cart' : 'Add to Cart'}
    </button>
  )
}
