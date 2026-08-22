import { cn } from '@/lib/utils'

export function GoldRule({ className }: { className?: string }) {
  return <div className={cn('h-[3px] w-16 rounded-full bg-gold', className)} />
}
