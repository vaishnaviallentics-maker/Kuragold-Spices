'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

export function LogoutButton({ className }: { className?: string }) {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className={cn(
        'flex items-center gap-3 rounded-lg px-4 py-2.5 font-body text-sm font-bold text-muted transition-colors hover:bg-cream hover:text-maroon',
        className
      )}
    >
      <LogOut size={18} />
      Logout
    </button>
  )
}
