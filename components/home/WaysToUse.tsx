import Link from 'next/link'
import { Flame, Leaf, Sparkles, Sun, type LucideIcon } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import type { Product } from '@/types'

const USAGE_NOTES: Record<string, { icon: LucideIcon; blurb: string }> = {
  'red-chilli-powder': {
    icon: Flame,
    blurb: 'The heat behind classic curries, tandoori marinades, and everyday tempering.',
  },
  'haldi-powder': {
    icon: Sun,
    blurb: 'A golden staple for dals and curries, and the base of a warming turmeric milk.',
  },
  'coriander-powder': {
    icon: Leaf,
    blurb: 'An earthy foundation spice for gravies, chutneys, and masala blends.',
  },
  'garam-masala': {
    icon: Sparkles,
    blurb: 'Stirred in at the end of cooking for the aroma and depth that finishes a dish.',
  },
}

export function WaysToUse({ products }: { products: Product[] }) {
  const items = products
    .filter((product) => USAGE_NOTES[product.slug])
    .map((product) => ({ product, ...USAGE_NOTES[product.slug] }))

  if (items.length === 0) return null

  return (
    <section className="bg-white px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-center text-center">
          <SectionLabel className="justify-center">In Your Kitchen</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-maroon sm:text-4xl">
            How to Use Our Spices
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ product, icon: Icon, blurb }) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group rounded-xl border border-border-gold/60 bg-ivory px-6 py-8 transition-all duration-300 hover:shadow-md"
            >
              <Icon className="mb-4 text-gold" size={28} aria-hidden="true" />
              <h3 className="mb-2 font-heading text-lg font-bold text-maroon group-hover:text-crimson">
                {product.name}
              </h3>
              <p className="text-sm leading-relaxed text-muted">{blurb}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
