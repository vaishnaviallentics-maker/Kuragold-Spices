import { cn } from '@/lib/utils'

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p
      className={cn(
        'mb-3 flex items-center gap-3 font-body text-xs font-bold uppercase tracking-[0.2em] text-gold',
        className
      )}
    >
      <span className="h-px w-8 bg-gold" />
      {children}
    </p>
  )
}
