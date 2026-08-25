'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useMemo } from 'react'
import { Search, RotateCcw } from 'lucide-react'
import { ProductCard } from './ProductCard'
import { CATEGORY_LABELS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import type { Product } from '@/types'

const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Name A-Z', value: 'name_asc' },
  { label: 'Name Z-A', value: 'name_desc' },
  { label: 'Price Low to High', value: 'price_asc' },
  { label: 'Price High to Low', value: 'price_desc' },
]

export function ProductsExplorer({ initialProducts }: { initialProducts: Product[] }) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const urlCategory = searchParams.get('category') ?? 'all'
  const [selectedCategory, setSelectedCategory] = useState<string>(urlCategory)
  const [selectedSize, setSelectedSize] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('newest')

  const categories = [
    { key: 'all', label: 'All' },
    { key: 'pure_grounded', label: CATEGORY_LABELS.pure_grounded },
    { key: 'blended', label: CATEGORY_LABELS.blended },
    { key: 'whole', label: CATEGORY_LABELS.whole },
    { key: 'combo', label: CATEGORY_LABELS.combo },
  ]

  // Dynamically extract all available pack sizes across active products with count
  const availableSizes = useMemo(() => {
    const sizeMap = new Map<string, number>()
    initialProducts.forEach((p) => {
      // Exclude coming_soon or future products from size calculations
      if (p.status === 'coming_soon' || p.status === 'future') return

      if (p.product_variants && p.product_variants.length > 0) {
        p.product_variants.forEach((v) => {
          sizeMap.set(v.size_label, (sizeMap.get(v.size_label) ?? 0) + 1)
        })
      }
    })

    const customOrder = ['50g', '100g', '200g', '500g', '1kg', '3x100g', '3x500g']
    return Array.from(sizeMap.entries()).sort((a, b) => {
      const idxA = customOrder.indexOf(a[0])
      const idxB = customOrder.indexOf(b[0])
      if (idxA !== -1 && idxB !== -1) return idxA - idxB
      if (idxA !== -1) return -1
      if (idxB !== -1) return 1
      return a[0].localeCompare(b[0])
    })
  }, [initialProducts])

  // Active products count for "All Sizes" label
  const activeProductsCount = useMemo(() => {
    return initialProducts.filter((p) => p.status !== 'coming_soon' && p.status !== 'future').length
  }, [initialProducts])

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts]

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory)
    }

    // Size / Weight filter (only applies to active purchasable products)
    if (selectedSize !== 'all') {
      result = result.filter(
        (p) =>
          p.status !== 'coming_soon' &&
          p.status !== 'future' &&
          p.product_variants?.some((v) => v.size_label === selectedSize)
      )
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.tagline && p.tagline.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q))
      )
    }

    // Sorting
    result.sort((a, b) => {
      const priceA = a.product_variants[0]?.price_inr ?? 0
      const priceB = b.product_variants[0]?.price_inr ?? 0

      switch (sortBy) {
        case 'oldest':
          return (a.sort_order ?? 0) - (b.sort_order ?? 0)
        case 'name_asc':
          return a.name.localeCompare(b.name)
        case 'name_desc':
          return b.name.localeCompare(a.name)
        case 'price_asc':
          return priceA - priceB
        case 'price_desc':
          return priceB - priceA
        case 'newest':
        default:
          return (a.sort_order ?? 0) - (b.sort_order ?? 0)
      }
    })

    return result
  }, [initialProducts, selectedCategory, selectedSize, searchQuery, sortBy])

  const handleCategorySelect = (key: string) => {
    setSelectedCategory(key)
    if (key === 'all') {
      router.push('/products', { scroll: false })
    } else {
      router.push(`/products?category=${key}`, { scroll: false })
    }
  }

  const handleClearFilters = () => {
    setSelectedCategory('all')
    setSelectedSize('all')
    setSearchQuery('')
    setSortBy('newest')
    router.push('/products', { scroll: false })
  }

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedSize !== 'all' ||
    searchQuery.trim() !== '' ||
    sortBy !== 'newest'

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
      {/* Left Sidebar Filter Card */}
      <aside className="lg:col-span-4 xl:col-span-3">
        <div className="rounded-3xl border border-gold/30 bg-white p-6 shadow-sm space-y-6">
          {/* SEARCH */}
          <div>
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-maroon mb-2.5">
              SEARCH
            </h3>
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search spices..."
                className="w-full rounded-2xl border border-border-gold/80 bg-cream/30 py-2.5 pl-9 pr-4 font-body text-xs text-ink outline-none transition-colors focus:border-maroon focus:bg-white"
              />
            </div>
          </div>

          {/* CATEGORY */}
          <div>
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-maroon mb-2.5">
              CATEGORY
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.key
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => handleCategorySelect(cat.key)}
                    className={cn(
                      'rounded-full px-4 py-2 font-body text-xs font-bold transition-all duration-200 border',
                      isSelected
                        ? 'bg-maroon text-white border-maroon shadow-xs'
                        : 'bg-white text-ink border-border-gold/80 hover:border-gold hover:bg-cream/40'
                    )}
                  >
                    {cat.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* WEIGHT / PACK SIZE */}
          <div className="border-t border-border-gold/40 pt-5">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-maroon mb-3">
              Weight / Pack Size
            </h3>
            <div className="space-y-2 font-body text-xs text-ink">
              <label
                onClick={() => setSelectedSize('all')}
                className="flex items-center gap-2.5 cursor-pointer py-1 group select-none"
              >
                <div
                  className={cn(
                    'h-4 w-4 rounded-full border flex items-center justify-center transition-all',
                    selectedSize === 'all'
                      ? 'border-gold bg-gold/10'
                      : 'border-border-gold group-hover:border-gold'
                  )}
                >
                  {selectedSize === 'all' && (
                    <div className="h-2 w-2 rounded-full bg-gold" />
                  )}
                </div>
                <span className={cn('font-semibold', selectedSize === 'all' ? 'text-maroon' : 'text-ink')}>
                  All Sizes ({activeProductsCount})
                </span>
              </label>

              {availableSizes.map(([size, count]) => {
                const isSelected = selectedSize === size
                return (
                  <label
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className="flex items-center gap-2.5 cursor-pointer py-1 group select-none"
                  >
                    <div
                      className={cn(
                        'h-4 w-4 rounded-full border flex items-center justify-center transition-all',
                        isSelected
                          ? 'border-gold bg-gold/10'
                          : 'border-border-gold group-hover:border-gold'
                      )}
                    >
                      {isSelected && (
                        <div className="h-2 w-2 rounded-full bg-gold" />
                      )}
                    </div>
                    <span className={cn('font-semibold', isSelected ? 'text-gold-dark font-bold' : 'text-ink')}>
                      {size} <span className="text-muted font-normal">({count})</span>
                    </span>
                  </label>
                )
              })}
            </div>
          </div>

          {/* SORT BY */}
          <div className="border-t border-border-gold/40 pt-5">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-maroon mb-2.5">
              SORT BY
            </h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-2xl border border-border-gold/80 bg-white py-2.5 px-4 font-body text-xs font-bold text-ink outline-none focus:border-maroon"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* CLEAR FILTERS */}
          <button
            type="button"
            onClick={handleClearFilters}
            disabled={!hasActiveFilters}
            className={cn(
              'flex w-full items-center justify-center gap-2 rounded-2xl border border-border-gold/80 py-3 font-heading text-xs font-bold uppercase tracking-wider transition-all',
              hasActiveFilters
                ? 'bg-cream/60 text-maroon hover:bg-maroon hover:text-white hover:border-maroon cursor-pointer'
                : 'bg-cream/20 text-muted/50 cursor-not-allowed opacity-60'
            )}
          >
            <RotateCcw size={14} />
            CLEAR FILTERS
          </button>
        </div>
      </aside>

      {/* Right Product Cards Grid */}
      <main className="lg:col-span-8 xl:col-span-9">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-body text-xs font-bold uppercase tracking-wider text-muted">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-gold/30 bg-white p-12 text-center shadow-xs">
            <p className="font-heading text-xl font-bold text-maroon">No Products Match Your Filters</p>
            <p className="mt-2 text-xs text-muted">Try clearing your search query or selecting a different category.</p>
            <button
              type="button"
              onClick={handleClearFilters}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-maroon px-6 py-2.5 font-body text-xs font-bold uppercase tracking-wider text-white hover:bg-maroon-dark shadow-xs"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
