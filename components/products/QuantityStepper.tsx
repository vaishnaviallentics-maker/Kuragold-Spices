import { Minus, Plus } from 'lucide-react'

interface QuantityStepperProps {
  quantity: number
  onChange: (quantity: number) => void
  min?: number
}

export function QuantityStepper({ quantity, onChange, min = 1 }: QuantityStepperProps) {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-border-gold px-2 py-1">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(min, quantity - 1))}
        className="flex h-6 w-6 items-center justify-center rounded-full text-maroon transition-colors hover:bg-cream"
      >
        <Minus size={14} />
      </button>
      <span className="w-4 text-center font-body text-sm font-bold text-ink">{quantity}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(quantity + 1)}
        className="flex h-6 w-6 items-center justify-center rounded-full text-maroon transition-colors hover:bg-cream"
      >
        <Plus size={14} />
      </button>
    </div>
  )
}
