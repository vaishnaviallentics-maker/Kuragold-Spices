'use client'

import { useTransition } from 'react'
import { cn } from '@/lib/utils'

interface ToggleSwitchProps {
  checked: boolean
  onToggle: (next: boolean) => void | Promise<void>
}

export function ToggleSwitch({ checked, onToggle }: ToggleSwitchProps) {
  const [isPending, startTransition] = useTransition()

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={isPending}
      onClick={() =>
        startTransition(() => {
          onToggle(!checked)
        })
      }
      className={cn(
        'relative h-6 w-11 shrink-0 rounded-full transition-colors disabled:opacity-60',
        checked ? 'bg-whatsapp' : 'bg-border-gold'
      )}
    >
      <span
        className={cn(
          'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform',
          checked ? 'translate-x-5' : 'translate-x-0.5'
        )}
      />
    </button>
  )
}
