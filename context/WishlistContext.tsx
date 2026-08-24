'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

const STORAGE_KEY = 'kuragold_wishlist'

interface WishlistContextValue {
  wishlist: string[]
  addToWishlist: (id: string) => void
  removeFromWishlist: (id: string) => void
  toggleWishlist: (id: string) => void
  isWishlisted: (id: string) => boolean
  count: number
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored) setWishlist(JSON.parse(stored))
    } catch {
      // storage unavailable
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist))
    } catch {
      // storage unavailable
    }
  }, [wishlist, hydrated])

  const addToWishlist = (id: string) => setWishlist((prev) => [...prev.filter((i) => i !== id), id])
  const removeFromWishlist = (id: string) => setWishlist((prev) => prev.filter((i) => i !== id))
  const toggleWishlist = (id: string) => (isWishlisted(id) ? removeFromWishlist(id) : addToWishlist(id))
  const isWishlisted = (id: string) => wishlist.includes(id)

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isWishlisted,
        count: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be inside WishlistProvider')
  return ctx
}
