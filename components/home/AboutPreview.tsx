import { LinkButton } from '@/components/ui/Button'
import { GoldRule } from '@/components/ui/GoldRule'
import { SectionLabel } from '@/components/ui/SectionLabel'
import type { Product, SiteClaim } from '@/types'

const BULLETS = [
  'Family-run by JK Enterprises',
  'Based in Hyderabad, Telangana',
  'Orders confirmed personally on WhatsApp',
  'Multiple pack sizes for every kitchen',
]

interface AboutPreviewProps {
  products: Product[]
  claims: SiteClaim[]
}

export function AboutPreview({ products, claims }: AboutPreviewProps) {
  const naturalConfirmed = claims.some((c) => c.key === 'natural' && c.is_confirmed)
  const noColourConfirmed = claims.some((c) => c.key === 'no_colour' && c.is_confirmed)

  const stats = [
    naturalConfirmed && { value: '100%', label: 'Pure Natural' },
    { value: `${products.length}+`, label: 'Product Lines' },
    noColourConfirmed && { value: '0', label: 'Added Colours' },
    { value: '24/7', label: 'Dedicated Support' },
  ].filter(Boolean) as { value: string; label: string }[]

  return (
    <section className="bg-white px-6 py-8 sm:px-10 lg:py-10">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[3fr_2fr]">
        <div>
          <SectionLabel>About Us</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-maroon sm:text-4xl">
            Rooted in Tradition, Refined for Today.
          </h2>
          <GoldRule className="my-5" />
          <p className="max-w-xl text-base leading-relaxed text-muted">
            JK Enterprises brings Kura Gold Spices to your kitchen from Hyderabad, Telangana. Every
            order is handled with utmost care, ensuring purity and freshness from our hands to
            yours.
          </p>

          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {BULLETS.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2 text-sm text-ink">
                <span className="mt-1 text-gold" aria-hidden="true">✦</span>
                {bullet}
              </li>
            ))}
          </ul>

          <LinkButton href="/about" variant="outline" className="mt-8 inline-flex">
            Read Our Story
          </LinkButton>
        </div>

        <div className="rounded-2xl bg-[linear-gradient(135deg,#5C0E0E_0%,#7A1515_50%,#3D0A0A_100%)] p-8">
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-3xl font-black text-gold sm:text-4xl">{stat.value}</p>
                <p className="mt-1 font-body text-xs font-bold uppercase tracking-wide text-gold-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
