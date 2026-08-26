import type { Metadata } from 'next'
import { Truck, Clock, MapPin, CheckCircle2 } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { FREE_SHIP_HYD, SHIPPING_CHARGE, SITE_NAME, LOCATION } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Shipping & Delivery Policy',
  description: `Shipping and delivery terms for ${SITE_NAME}. Information on delivery charges, Hyderabad local shipping, and dispatch timelines.`,
}

export default function ShippingPolicyPage() {
  return (
    <main className="bg-ivory px-6 py-12 sm:px-10 lg:py-16">
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <SectionLabel className="justify-center">DELIVERY TERMS</SectionLabel>
          <h1 className="font-heading text-3xl sm:text-5xl font-bold text-maroon">Shipping & Delivery Policy</h1>
          <p className="font-body text-xs sm:text-sm text-muted">
            Fresh Spices Delivered Directly from Our Hyderabad Facility
          </p>
        </div>

        {/* Content Box */}
        <div className="rounded-3xl border border-gold/30 bg-white p-8 sm:p-12 shadow-sm space-y-8 font-body text-ink text-xs sm:text-sm leading-relaxed">
          <div className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-maroon flex items-center gap-2">
              <MapPin className="text-gold" size={20} />
              1. Delivery Coverage Area
            </h2>
            <p className="text-ink/80">
              {SITE_NAME} currently delivers orders across <strong>Hyderabad and Telangana</strong> (Pincodes starting with 500, 501, 502, 503, and 504).
            </p>
          </div>

          <div className="space-y-3 border-t border-border-gold/40 pt-6">
            <h2 className="font-heading text-lg font-bold text-maroon flex items-center gap-2">
              <Truck className="text-gold" size={20} />
              2. Shipping Charges & Free Shipping Threshold
            </h2>
            <div className="rounded-2xl border border-border-gold/60 bg-cream/40 p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-border-gold/30 pb-2.5">
                <span className="font-bold text-maroon">Orders ₹{FREE_SHIP_HYD} & Above:</span>
                <span className="font-bold text-emerald-700 uppercase">FREE Delivery 🎉</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-maroon">Orders Below ₹{FREE_SHIP_HYD}:</span>
                <span className="font-bold text-ink">Flat ₹{SHIPPING_CHARGE} Shipping Fee</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 border-t border-border-gold/40 pt-6">
            <h2 className="font-heading text-lg font-bold text-maroon flex items-center gap-2">
              <Clock className="text-gold" size={20} />
              3. Processing & Dispatch Timelines
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-muted">
              <li><strong>Order Processing:</strong> Orders confirmed on WhatsApp before 2:00 PM are processed the same business day.</li>
              <li><strong>Dispatch Window:</strong> All packages are dispatched within 24 to 48 hours of order confirmation.</li>
              <li><strong>Estimated Delivery Time:</strong> Standard delivery takes <strong>2 to 10 business days</strong> from the date of order confirmation.</li>
            </ul>
          </div>

          <div className="space-y-3 border-t border-border-gold/40 pt-6">
            <h2 className="font-heading text-lg font-bold text-maroon flex items-center gap-2">
              <CheckCircle2 className="text-gold" size={20} />
              4. Order Tracking & Packaging
            </h2>
            <p className="text-ink/80">
              All spices are packed in food-grade, moisture-proof sealed pouches to preserve peak aroma and freshness. Once your package is dispatched, tracking details and courier confirmation will be shared directly on your registered WhatsApp number.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
