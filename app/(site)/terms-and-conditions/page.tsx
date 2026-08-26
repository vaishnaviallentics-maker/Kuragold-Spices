import type { Metadata } from 'next'
import { FileCheck, Gavel, Award, Globe } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { FSSAI_LIC, SITE_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: `Terms and Conditions governing the use of ${SITE_NAME} website and purchase of spice products.`,
}

export default function TermsAndConditionsPage() {
  return (
    <main className="bg-ivory px-6 py-12 sm:px-10 lg:py-16">
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <SectionLabel className="justify-center">LEGAL TERMS</SectionLabel>
          <h1 className="font-heading text-3xl sm:text-5xl font-bold text-maroon">Terms & Conditions</h1>
          <p className="font-body text-xs sm:text-sm text-muted">
            {SITE_NAME} · JK Enterprises · FSSAI Lic. {FSSAI_LIC}
          </p>
        </div>

        {/* Content Box */}
        <div className="rounded-3xl border border-gold/30 bg-white p-8 sm:p-12 shadow-sm space-y-8 font-body text-ink text-xs sm:text-sm leading-relaxed">
          <div className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-maroon flex items-center gap-2">
              <FileCheck className="text-gold" size={20} />
              1. Acceptance of Terms
            </h2>
            <p className="text-ink/80">
              By accessing, browsing, or purchasing products on {SITE_NAME}, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please refrain from using our services.
            </p>
          </div>

          <div className="space-y-3 border-t border-border-gold/40 pt-6">
            <h2 className="font-heading text-lg font-bold text-maroon flex items-center gap-2">
              <Award className="text-gold" size={20} />
              2. FSSAI & Product Quality Compliance
            </h2>
            <p className="text-ink/80">
              All spices manufactured, ground, and packaged by JK Enterprises adhere strictly to FSSAI food safety regulations under License No. <strong>{FSSAI_LIC}</strong>. We guarantee 100% pure, unadulterated ground and whole spices with zero artificial coloring or synthetic additives.
            </p>
          </div>

          <div className="space-y-3 border-t border-border-gold/40 pt-6">
            <h2 className="font-heading text-lg font-bold text-maroon flex items-center gap-2">
              <Globe className="text-gold" size={20} />
              3. Pricing & Order Accuracy
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-muted">
              <li>All prices listed on the website are in Indian Rupees (INR ₹) inclusive of applicable taxes.</li>
              <li>{SITE_NAME} reserves the right to modify prices, size variants, or promotional discounts without prior notice.</li>
              <li>In the event of an inadvertent typographical error in pricing or specifications, we reserve the right to correct the error prior to order dispatch.</li>
            </ul>
          </div>

          <div className="space-y-3 border-t border-border-gold/40 pt-6">
            <h2 className="font-heading text-lg font-bold text-maroon flex items-center gap-2">
              <Gavel className="text-gold" size={20} />
              4. Governing Law & Jurisdiction
            </h2>
            <p className="text-ink/80">
              These Terms & Conditions are governed by and construed in accordance with the laws of India. Any disputes arising out of or related to website usage or orders shall be subject to the exclusive jurisdiction of the courts in <strong>Hyderabad, Telangana</strong>.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
