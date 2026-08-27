import Image from 'next/image'
import { FSSAI_LIC } from '@/lib/constants'
import type { SiteClaim } from '@/types'

const CERT_ITEMS = [
  { key: 'fssai', label: `FSSAI Lic. ${FSSAI_LIC}`, icon: '/badges/fssai.webp', width: 32, height: 32, className: 'h-8 w-8' },
  { key: 'telangana', label: 'Govt. of Telangana', icon: '/badges/telangana.webp', width: 32, height: 32, className: 'h-8 w-8' },
  { key: 'make_india', label: 'Make in India', icon: '/badges/make_in_india.webp', width: 64, height: 40, className: 'h-10 w-16 object-contain shrink-0' },
]

export function TrustBar({ claims }: { claims: SiteClaim[] }) {
  const confirmedCerts = CERT_ITEMS.filter((item) =>
    claims.some((c) => c.key === item.key && c.is_confirmed)
  )
  const hasCerts = confirmedCerts.length > 0

  return (
    <section className="border-t-[3px] border-gold bg-cream py-4 sm:py-6 overflow-hidden">
      <div className="mx-auto flex max-w-7xl items-center overflow-x-auto no-scrollbar gap-6 px-4 whitespace-nowrap sm:flex-wrap sm:justify-center sm:gap-12 sm:px-6 sm:whitespace-normal">
        {confirmedCerts.map((item, i) => (
          <div key={item.key} className="flex shrink-0 items-center gap-3">
            {i > 0 && <span className="text-gold shrink-0" aria-hidden="true">✦</span>}
            <span className="flex items-center gap-2">
              <Image
                src={item.icon}
                alt={item.label}
                width={item.width}
                height={item.height}
                className={`${item.className} object-contain`}
              />
              <span className="font-body text-xs font-bold uppercase tracking-wide text-ink shrink-0">{item.label}</span>
            </span>
          </div>
        ))}

        <div className="flex shrink-0 items-center gap-3">
          {hasCerts && <span className="text-gold shrink-0" aria-hidden="true">✦</span>}
          <span className="font-body text-xs font-bold uppercase tracking-wide text-ink shrink-0">
            🏢 JK Enterprises · Hyderabad{!hasCerts && ', Telangana · Open 24 Hours'}
          </span>
        </div>
      </div>
    </section>
  )
}
