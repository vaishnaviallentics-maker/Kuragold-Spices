'use client'

import { PRODUCT_FULL_DETAILS, type ProductFullDetail } from '@/lib/productDetailsData'
import { ShieldCheck, Leaf, Sparkles, Utensils, HeartPulse, HardDriveDownload } from 'lucide-react'

export function ProductDetailedSpecs({ slug, fallbackDescription }: { slug: string; fallbackDescription?: string }) {
  const details: ProductFullDetail | undefined = PRODUCT_FULL_DETAILS[slug]

  if (!details) {
    if (!fallbackDescription) return null
    return (
      <div className="mt-12 rounded-3xl border border-gold/30 bg-white p-8 shadow-sm">
        <h2 className="font-heading text-lg font-bold text-maroon mb-3">Product Description</h2>
        <p className="font-body text-sm leading-relaxed text-ink/80">{fallbackDescription}</p>
      </div>
    )
  }

  return (
    <div className="mt-14 space-y-10 border-t border-border-gold/40 pt-12">
      <div className="rounded-3xl border border-gold/30 bg-white p-8 sm:p-10 shadow-sm space-y-8 font-body">
        {/* Main Title Banner */}
        <div className="border-b border-border-gold/40 pb-6">
          <span className="inline-block rounded-full bg-gold/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-dark mb-2">
            Detailed Product Specification
          </span>
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-maroon leading-tight">
            {details.headline}
          </h2>
        </div>

        {/* Section 1: Product Overview */}
        <div className="space-y-2.5">
          <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-maroon flex items-center gap-2">
            <Sparkles size={16} className="text-gold" />
            Product Overview
          </h3>
          <p className="text-xs sm:text-sm leading-relaxed text-ink/80">{details.overview}</p>
        </div>

        {/* Section 2: Detailed Description */}
        <div className="space-y-2.5 border-t border-border-gold/30 pt-6">
          <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-maroon flex items-center gap-2">
            <Leaf size={16} className="text-gold" />
            Product Description
          </h3>
          <p className="text-xs sm:text-sm leading-relaxed text-ink/80">{details.description}</p>
        </div>

        {/* Section 3: Key Features */}
        <div className="space-y-3 border-t border-border-gold/30 pt-6">
          <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-maroon flex items-center gap-2">
            <ShieldCheck size={16} className="text-gold" />
            Key Features & Quality Standards
          </h3>
          <ul className="grid gap-2.5 sm:grid-cols-2 text-xs sm:text-sm text-ink/90">
            {details.keyFeatures.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2 rounded-xl bg-cream/40 p-3 border border-border-gold/40">
                <span className="text-gold font-bold text-base leading-none">•</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 4: Health Benefits & Active Compounds */}
        <div className="space-y-4 border-t border-border-gold/30 pt-6">
          <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-maroon flex items-center gap-2">
            <HeartPulse size={16} className="text-gold" />
            Health Benefits & Bio-Active Compounds
          </h3>
          
          <div className="grid gap-4 sm:grid-cols-2">
            {details.healthBenefits.map((ben, idx) => (
              <div key={idx} className="rounded-2xl border border-border-gold/50 bg-ivory/50 p-4 space-y-1">
                <p className="font-bold text-xs text-maroon uppercase tracking-wide">{ben.title}</p>
                <p className="text-xs leading-relaxed text-muted">{ben.desc}</p>
              </div>
            ))}
          </div>

          {details.activeCompounds && details.activeCompounds.length > 0 && (
            <div className="mt-4 rounded-2xl bg-cream/30 p-4 border border-border-gold/40">
              <p className="font-heading text-xs font-bold uppercase tracking-wider text-maroon mb-2">
                Active Compounds Breakdown:
              </p>
              <ul className="space-y-1.5 text-xs text-ink/80">
                {details.activeCompounds.map((comp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-bold text-gold-dark">• {comp.compound}:</span>
                    <span>{comp.benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Section 5: Culinary Uses & Applications */}
        <div className="space-y-3 border-t border-border-gold/30 pt-6">
          <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-maroon flex items-center gap-2">
            <Utensils size={16} className="text-gold" />
            Culinary Uses & Applications
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-ink/80">
            {details.culinaryUses.map((useItem, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-gold font-bold">•</span>
                <span>{useItem}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 6: Storage & Freshness Instructions */}
        <div className="rounded-2xl bg-maroon/5 border border-maroon/20 p-5 space-y-1.5">
          <p className="font-heading text-xs font-bold uppercase tracking-wider text-maroon flex items-center gap-2">
            <HardDriveDownload size={14} className="text-gold" />
            Storage Instructions & Shelf Life
          </p>
          <p className="text-xs leading-relaxed text-muted">{details.storageInfo}</p>
        </div>
      </div>
    </div>
  )
}
