import { type AnchorHTMLAttributes, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'outline' | 'whatsapp'

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-gold text-maroon-dark hover:bg-gold-light',
  outline:
    'border border-gold text-gold hover:bg-gold hover:text-maroon-dark',
  whatsapp:
    'bg-whatsapp text-white hover:bg-whatsapp-dark',
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-body text-sm font-bold uppercase tracking-wide transition-colors duration-200'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  return <button className={cn(base, variantClasses[variant], className)} {...props} />
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant
}

export function LinkButton({ variant = 'primary', className, ...props }: LinkButtonProps) {
  return <a className={cn(base, variantClasses[variant], className)} {...props} />
}
