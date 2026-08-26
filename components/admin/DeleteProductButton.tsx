'use client'

import { useState } from 'react'
import { Trash2, Loader2 } from 'lucide-react'
import { deleteProduct } from '@/app/admin/actions'
import { cn } from '@/lib/utils'

interface DeleteProductButtonProps {
  id: string
  name: string
  slug?: string
  variant?: 'table' | 'button'
  className?: string
}

export function DeleteProductButton({
  id,
  name,
  slug,
  variant = 'table',
  className,
}: DeleteProductButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"? This action will remove the product and its variants permanently.`
    )

    if (!confirmed) return

    setIsDeleting(true)
    try {
      await deleteProduct(id, slug)
    } catch {
      setIsDeleting(false)
    }
  }

  if (variant === 'button') {
    return (
      <button
        type="button"
        disabled={isDeleting}
        onClick={handleDelete}
        className={cn(
          'inline-flex items-center gap-2 rounded-full border border-red-300 bg-red-50 px-5 py-2.5 font-body text-xs font-bold uppercase tracking-wide text-red-700 hover:bg-red-600 hover:text-white transition-colors shadow-2xs',
          className
        )}
      >
        {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
        {isDeleting ? 'Deleting...' : 'Delete Product'}
      </button>
    )
  }

  return (
    <button
      type="button"
      disabled={isDeleting}
      onClick={handleDelete}
      className={cn(
        'font-bold text-red-600 hover:text-red-800 hover:underline inline-flex items-center gap-1 transition-colors',
        className
      )}
      title={`Delete ${name}`}
    >
      {isDeleting ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={13} />}
      Delete
    </button>
  )
}
