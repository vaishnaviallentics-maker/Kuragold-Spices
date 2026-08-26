'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, Image as ImageIcon, X, Check, Link as LinkIcon, FolderOpen, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

interface ImageInputPickerProps {
  name?: string
  defaultValue?: string
  label?: string
  className?: string
}

const PRESET_MEDIA_ASSETS = [
  { label: 'Red Chilli Pouch', url: '/products/chilli.webp', category: 'Products' },
  { label: 'Haldi Pouch', url: '/products/haldi.webp', category: 'Products' },
  { label: 'Dhaniya Pouch', url: '/products/dhania.webp', category: 'Products' },
  { label: 'Combo 3-Pouches', url: '/products/Kura_Gold_Combo_Pack_3_Exact_Pouches.png', category: 'Products' },
  { label: 'Garam Masala Blend', url: '/products/Kura_Gold_Garam_Masala_Blend.png', category: 'Products' },
  { label: 'Chicken Biryani Blend', url: '/products/Kura_Gold_Chicken_Biryani_Blend.png', category: 'Products' },
  { label: 'Mutton Biryani Blend', url: '/products/Kura_Gold_Mutton_Biryani_Blend.png', category: 'Products' },
  { label: 'Raw Coriander Seeds', url: '/products/raw_coriander_seeds.png', category: 'Whole Spices' },
  { label: 'Raw Black Pepper', url: '/products/raw_black_pepper.png', category: 'Whole Spices' },
  { label: 'Raw Cumin Seeds', url: '/products/raw_cumin_seeds.png', category: 'Whole Spices' },
  { label: 'Hyderabadi Chicken Biryani', url: '/recipes/recipe_hyderabadi_chicken_biryani.png', category: 'Recipes' },
  { label: 'Andhra Mutton Curry', url: '/recipes/recipe_andhra_mutton_curry.png', category: 'Recipes' },
  { label: 'Golden Dal Tadka', url: '/recipes/recipe_golden_dal_tadka.png', category: 'Recipes' },
  { label: 'Aloo Gobi Dhaniya Fry', url: '/recipes/recipe_aloo_gobi_fry.png', category: 'Recipes' },
  { label: 'Logo', url: '/logo.webp', category: 'Brand' },
]

export function ImageInputPicker({
  name = 'image_url',
  defaultValue = '',
  label = 'Image URL & Media Upload',
  className,
}: ImageInputPickerProps) {
  const [imageUrl, setImageUrl] = useState<string>(defaultValue)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [showGallery, setShowGallery] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>('All')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Upload file to Supabase storage bucket or convert to data URL fallback
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const supabase = createClient()
      const fileExt = file.name.split('.').pop()
      const fileName = `upload-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`
      const filePath = `product-images/${fileName}`

      // Attempt Supabase storage upload
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(filePath, file, { cacheControl: '3600', upsert: true })

      if (!error && data) {
        const { data: publicUrlData } = supabase.storage.from('product-images').getPublicUrl(filePath)
        if (publicUrlData?.publicUrl) {
          setImageUrl(publicUrlData.publicUrl)
          setIsUploading(false)
          return
        }
      }

      // Fallback to FileReader DataURL if bucket is not initialized
      const reader = new FileReader()
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImageUrl(reader.result)
        }
        setIsUploading(false)
      }
      reader.readAsDataURL(file)
    } catch {
      // Fallback Data URL
      const reader = new FileReader()
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImageUrl(reader.result)
        }
        setIsUploading(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const categories = ['All', 'Products', 'Whole Spices', 'Recipes', 'Brand']

  const filteredAssets = PRESET_MEDIA_ASSETS.filter(
    (asset) => activeTab === 'All' || asset.category === activeTab
  )

  return (
    <div className={cn('space-y-2', className)}>
      <label className="block font-body text-xs font-bold uppercase tracking-wide text-muted">
        {label}
      </label>

      {/* Main Container */}
      <div className="space-y-3 rounded-xl border border-border-gold/80 bg-cream/20 p-4">
        {/* Hidden Form Input for Submit */}
        <input type="hidden" name={name} value={imageUrl} />

        {/* Input Bar with Action Buttons */}
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <LinkIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Paste image URL (or upload/choose below)..."
              className="w-full rounded-lg border border-border-gold bg-white py-2 pl-9 pr-8 font-body text-xs text-ink outline-none transition-colors focus:border-gold"
            />
            {imageUrl && (
              <button
                type="button"
                onClick={() => setImageUrl('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-maroon"
                title="Clear URL"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <div className="flex gap-2">
            {/* File Upload Button */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-maroon/30 bg-maroon/10 px-3 py-2 font-body text-xs font-bold text-maroon hover:bg-maroon hover:text-white transition-colors"
            >
              {isUploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
              Upload File
            </button>

            {/* Media Gallery Picker Button */}
            <button
              type="button"
              onClick={() => setShowGallery(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gold/40 bg-gold/15 px-3 py-2 font-body text-xs font-bold text-maroon-dark hover:bg-gold hover:text-maroon-dark transition-colors"
            >
              <ImageIcon size={14} />
              Media Gallery
            </button>
          </div>
        </div>

        {/* Live Image Preview Thumbnail */}
        {imageUrl ? (
          <div className="relative flex items-center gap-4 rounded-lg border border-border-gold/60 bg-white p-3 shadow-2xs">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-cream border border-border-gold/40">
              <Image
                src={imageUrl}
                alt="Selected Image Preview"
                fill
                className="object-contain p-1"
                onError={() => {}}
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="inline-block rounded-full bg-emerald-100 px-2 py-0.5 font-body text-[10px] font-bold uppercase text-emerald-800">
                Image Selected
              </span>
              <p className="mt-1 font-mono text-xs text-muted truncate">{imageUrl}</p>
            </div>
            <button
              type="button"
              onClick={() => setImageUrl('')}
              className="rounded-full bg-cream p-1.5 text-muted hover:bg-maroon hover:text-white transition-colors"
              title="Remove Image"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border-gold/60 bg-white p-4 text-center cursor-pointer hover:border-gold hover:bg-cream/30 transition-all"
          >
            <FolderOpen size={24} className="text-gold mb-1" />
            <p className="font-body text-xs font-bold text-maroon">No image selected</p>
            <p className="text-[11px] text-muted">Click to upload an image file or choose from Media Gallery</p>
          </div>
        )}
      </div>

      {/* Preset Media Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 z-modal flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 sm:p-6">
          <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl border border-gold/30 bg-white p-6 shadow-2xl space-y-5">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border-gold/40 pb-4">
              <div>
                <h3 className="font-heading text-lg font-bold text-maroon flex items-center gap-2">
                  <ImageIcon size={20} className="text-gold" />
                  Media Assets Gallery
                </h3>
                <p className="text-xs text-muted">Select an existing brand or product image from the library.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowGallery(false)}
                className="rounded-full bg-cream p-1.5 text-muted hover:bg-maroon hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveTab(cat)}
                  className={cn(
                    'rounded-full px-3 py-1 font-body text-xs font-bold transition-all border',
                    activeTab === cat
                      ? 'bg-maroon text-white border-maroon'
                      : 'bg-cream/50 text-ink border-border-gold/60 hover:bg-gold/20'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Assets Grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 max-h-96 overflow-y-auto p-1">
              {filteredAssets.map((asset) => {
                const isSelected = imageUrl === asset.url
                return (
                  <div
                    key={asset.url}
                    onClick={() => {
                      setImageUrl(asset.url)
                      setShowGallery(false)
                    }}
                    className={cn(
                      'group relative flex flex-col items-center rounded-xl border p-2.5 cursor-pointer transition-all bg-white shadow-2xs hover:shadow-md',
                      isSelected
                        ? 'border-maroon ring-2 ring-maroon/20 bg-maroon/5'
                        : 'border-border-gold/60 hover:border-gold'
                    )}
                  >
                    <div className="relative h-24 w-full rounded-lg bg-cream/60 overflow-hidden mb-2">
                      <Image
                        src={asset.url}
                        alt={asset.label}
                        fill
                        className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                      />
                      {isSelected && (
                        <div className="absolute top-1 right-1 rounded-full bg-maroon p-1 text-white shadow-xs">
                          <Check size={12} />
                        </div>
                      )}
                    </div>
                    <p className="font-body text-[11px] font-bold text-maroon text-center line-clamp-1 w-full">
                      {asset.label}
                    </p>
                    <span className="text-[9px] text-muted uppercase tracking-wider">{asset.category}</span>
                  </div>
                )
              })}
            </div>

            <div className="border-t border-border-gold/40 pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setShowGallery(false)}
                className="rounded-full bg-maroon px-5 py-2 font-body text-xs font-bold uppercase text-white hover:bg-maroon-dark"
              >
                Close Gallery
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
