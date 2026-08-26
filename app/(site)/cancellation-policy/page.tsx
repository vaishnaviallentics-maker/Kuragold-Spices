import type { Metadata } from 'next'
import { RefreshCw, XCircle, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { CONTACT_EMAIL_GEN, CONTACT_PHONE, SITE_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Cancellations & Refund Policy',
  description: `Cancellation and refund terms for ${SITE_NAME}. Information on order cancellations, product replacements, and freshness guarantees.`,
}

export default function CancellationPolicyPage() {
  return (
    <main className="bg-ivory px-6 py-12 sm:px-10 lg:py-16">
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <SectionLabel className="justify-center">REFUND & RETURN TERMS</SectionLabel>
          <h1 className="font-heading text-3xl sm:text-5xl font-bold text-maroon">Cancellations & Refund Policy</h1>
          <p className="font-body text-xs sm:text-sm text-muted">
            100% Purity & Customer Satisfaction Guarantee
          </p>
        </div>

        {/* Content Box */}
        <div className="rounded-3xl border border-gold/30 bg-white p-8 sm:p-12 shadow-sm space-y-8 font-body text-ink text-xs sm:text-sm leading-relaxed">
          <div className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-maroon flex items-center gap-2">
              <XCircle className="text-gold" size={20} />
              1. Order Cancellation Policy
            </h2>
            <p className="text-ink/80">
              You may cancel your order free of charge at any time <strong>before dispatch</strong> by contacting our customer care team via WhatsApp or phone.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-muted">
              <li><strong>Pre-Dispatch Cancellation:</strong> Full refund processed immediately to original payment method.</li>
              <li><strong>Post-Dispatch Cancellation:</strong> Once a package has been handed over to courier partners, cancellations cannot be processed.</li>
            </ul>
          </div>

          <div className="space-y-3 border-t border-border-gold/40 pt-6">
            <h2 className="font-heading text-lg font-bold text-maroon flex items-center gap-2">
              <RefreshCw className="text-gold" size={20} />
              2. Returns & Replacements
            </h2>
            <p className="text-ink/80">
              Due to the perishable and consumable nature of food spices, we do not accept returns once pouches are opened, unless:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-muted">
              <li>The outer package arrived damaged, torn, or tampered with during transit.</li>
              <li>An incorrect product item or pack size was delivered.</li>
              <li>A verified quality flaw is reported within 48 hours of delivery.</li>
            </ul>
          </div>

          <div className="space-y-3 border-t border-border-gold/40 pt-6">
            <h2 className="font-heading text-lg font-bold text-maroon flex items-center gap-2">
              <CheckCircle2 className="text-gold" size={20} />
              3. Refund Request Process
            </h2>
            <p className="text-ink/80">
              If your delivered product meets return criteria, please follow these steps:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-muted">
              <li>Take clear unboxing photos/videos of the package and item condition.</li>
              <li>Share the photos along with your Order ID on WhatsApp at <strong>{CONTACT_PHONE}</strong> or email <strong>{CONTACT_EMAIL_GEN}</strong> within 48 hours.</li>
              <li>Our quality team will review your request within 24 hours. Upon approval, a free replacement pouch or full refund will be initiated.</li>
            </ol>
          </div>
        </div>
      </div>
    </main>
  )
}
