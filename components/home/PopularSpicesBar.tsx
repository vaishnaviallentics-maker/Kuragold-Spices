import Image from 'next/image'
import Link from 'next/link'

const POPULAR_SPICES = [
  { name: 'Turmeric Powder', image: '/products/haldi.webp', href: '/products' },
  { name: 'Red Chilli Powder', image: '/products/chilli.webp', href: '/products' },
  { name: 'Coriander Powder', image: '/products/dhania.webp', href: '/products' },
  { name: 'Garam Masala', image: '/products/masala.webp', href: '/products' },
]

export function PopularSpicesBar() {
  return (
    <section className="border-t-4 border-[#5C0E0E] bg-[#F9F4EB] px-6 py-6 sm:px-10 lg:py-7 shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Title Area */}
        <div className="text-center lg:text-left shrink-0 max-w-xs">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-maroon">
            Our Popular Spices
          </h2>
          {/* Gold Ornament Line */}
          <div className="my-2 flex items-center justify-center lg:justify-start gap-2 text-gold">
            <span className="h-px w-6 bg-gold/50" />
            <span className="text-xs">✦</span>
            <span className="h-px w-6 bg-gold/50" />
          </div>
          <p className="font-body text-xs text-[#3A2414] font-medium leading-relaxed">
            Handpicked favorites that bring flavor to your kitchen.
          </p>
        </div>

        {/* Right 4 Spice Bowl Cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-8 w-full lg:w-auto justify-items-center">
          {POPULAR_SPICES.map((spice) => (
            <Link
              key={spice.name}
              href={spice.href}
              className="group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative h-24 w-32 sm:h-28 sm:w-36 overflow-hidden">
                <Image
                  src={spice.image}
                  alt={spice.name}
                  fill
                  sizes="144px"
                  className="object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="mt-1.5 font-heading text-xs sm:text-sm font-bold text-maroon group-hover:text-gold transition-colors">
                {spice.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
