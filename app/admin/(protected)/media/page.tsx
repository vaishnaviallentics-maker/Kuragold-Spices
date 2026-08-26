'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Upload, Copy, Check, Image as ImageIcon, Search, Trash2 } from 'lucide-react'

const MEDIA_ITEMS = [
  { label: 'Red Chilli Powder Pouch', url: '/products/chilli.webp', category: 'Products' },
  { label: 'Haldi Powder Pouch', url: '/products/haldi.webp', category: 'Products' },
  { label: 'Coriander Powder Pouch', url: '/products/dhania.webp', category: 'Products' },
  { label: '3-Pouch Combo Pack', url: '/products/Kura_Gold_Combo_Pack_3_Exact_Pouches.png', category: 'Products' },
  { label: 'Garam Masala Blend', url: '/products/Kura_Gold_Garam_Masala_Blend.png', category: 'Products' },
  { label: 'Chicken Biryani Blend', url: '/products/Kura_Gold_Chicken_Biryani_Blend.png', category: 'Products' },
  { label: 'Mutton Biryani Blend', url: '/products/Kura_Gold_Mutton_Biryani_Blend.png', category: 'Products' },
  { label: 'Raw Coriander Seeds', url: '/products/raw_coriander_seeds.png', category: 'Whole Spices' },
  { label: 'Raw Black Peppercorns', url: '/products/raw_black_pepper.png', category: 'Whole Spices' },
  { label: 'Raw Cumin Seeds', url: '/products/raw_cumin_seeds.png', category: 'Whole Spices' },
  { label: 'Hyderabadi Chicken Biryani Dish', url: '/recipes/recipe_hyderabadi_chicken_biryani.png', category: 'Recipes' },
  { label: 'Andhra Mutton Curry Dish', url: '/recipes/recipe_andhra_mutton_curry.png', category: 'Recipes' },
  { label: 'Golden Dal Tadka Dish', url: '/recipes/recipe_golden_dal_tadka.png', category: 'Recipes' },
  { label: 'Aloo Gobi Dhaniya Fry Dish', url: '/recipes/recipe_aloo_gobi_fry.png', category: 'Recipes' },
  { label: 'Careers Banner Image', url: '/careers/careers_hero_banner.png', category: 'Banners' },
  { label: 'Brand Logo', url: '/logo.webp', category: 'Brand' },
]

export default function AdminMediaPage() {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Products', 'Whole Spices', 'Recipes', 'Banners', 'Brand']

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedUrl(url)
    setTimeout(() => setCopiedUrl(null), 2000)
  }

  const filteredMedia = MEDIA_ITEMS.filter((item) => {
    const matchCat = selectedCategory === 'All' || item.category === selectedCategory
    const matchSearch = !searchQuery || item.label.toLowerCase().includes(searchQuery.toLowerCase()) || item.url.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-maroon">Media Library</h1>
          <p className="text-xs text-muted">Browse, copy image URLs, and manage product & banner media assets.</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="rounded-xl border border-border-gold/60 bg-white p-4 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search media by name or path..."
              className="w-full rounded-lg border border-border-gold bg-cream/30 py-2 pl-9 pr-4 font-body text-xs text-ink outline-none focus:border-maroon focus:bg-white"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-3 py-1 font-body text-xs font-bold transition-all border ${
                  selectedCategory === cat
                    ? 'bg-maroon text-white border-maroon'
                    : 'bg-white text-ink border-border-gold/60 hover:bg-cream'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filteredMedia.map((item) => (
          <div
            key={item.url}
            className="group flex flex-col overflow-hidden rounded-xl border border-border-gold/60 bg-white shadow-xs transition-all hover:border-gold hover:shadow-md"
          >
            <div className="relative h-36 sm:h-44 w-full bg-cream/60 overflow-hidden">
              <Image
                src={item.url}
                alt={item.label}
                fill
                className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute top-2 left-2 rounded-full bg-maroon px-2 py-0.5 text-[9px] font-bold uppercase text-white shadow-xs">
                {item.category}
              </span>
            </div>

            <div className="flex flex-1 flex-col justify-between p-3.5 space-y-2">
              <div>
                <p className="font-heading text-xs font-bold text-maroon line-clamp-1">{item.label}</p>
                <p className="font-mono text-[10px] text-muted truncate mt-0.5">{item.url}</p>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(item.url)}
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-border-gold/80 bg-cream/40 py-1.5 font-body text-[11px] font-bold text-maroon hover:bg-maroon hover:text-white transition-colors"
              >
                {copiedUrl === item.url ? (
                  <>
                    <Check size={12} className="text-emerald-500" />
                    Copied URL!
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    Copy Image URL
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
