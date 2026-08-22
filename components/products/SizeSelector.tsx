import { cn } from '@/lib/utils'
import type { ProductVariant } from '@/types'

interface SizeSelectorProps {
  variants: ProductVariant[]
  selectedId: string
  onSelect: (variant: ProductVariant) => void
}

export function SizeSelector({ variants, selectedId, onSelect }: SizeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {variants.map((variant) => (
        <button
          key={variant.id}
          type="button"
          onClick={() => onSelect(variant)}
          className={cn(
            'rounded-full border px-3 py-1.5 font-body text-xs font-bold transition-colors',
            variant.id === selectedId
              ? 'border-gold bg-gold/10 text-maroon'
              : 'border-border-gold text-muted hover:border-gold'
          )}
        >
          {variant.size_label}
        </button>
      ))}
    </div>
  )
}
