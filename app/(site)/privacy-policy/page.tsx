import type { Metadata } from 'next'
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { CONTACT_EMAIL_GEN, CONTACT_PHONE, LOCATION, SITE_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy Policy for ${SITE_NAME}. Learn how we collect, protect, and handle your information during orders and website visits.`,
}

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-ivory px-6 py-12 sm:px-10 lg:py-16">
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <SectionLabel className="justify-center">LEGAL & PRIVACY</SectionLabel>
          <h1 className="font-heading text-3xl sm:text-5xl font-bold text-maroon">Privacy Policy</h1>
          <p className="font-body text-xs sm:text-sm text-muted">
            Last Updated: January 2026 · {SITE_NAME} (JK Enterprises)
          </p>
        </div>

        {/* Content Box */}
        <div className="rounded-3xl border border-gold/30 bg-white p-8 sm:p-12 shadow-sm space-y-8 font-body text-ink text-xs sm:text-sm leading-relaxed">
          <div className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-maroon flex items-center gap-2">
              <ShieldCheck className="text-gold" size={20} />
              1. Introduction & Overview
            </h2>
            <p className="text-ink/80">
              Welcome to {SITE_NAME} (operated by JK Enterprises). We respect your privacy and are committed to protecting the personal information you share with us when browsing our website, placing orders, or contacting customer care.
            </p>
          </div>

          <div className="space-y-3 border-t border-border-gold/40 pt-6">
            <h2 className="font-heading text-lg font-bold text-maroon flex items-center gap-2">
              <Eye className="text-gold" size={20} />
              2. Information We Collect
            </h2>
            <p className="text-ink/80">
              We collect minimal information necessary to fulfill your orders and improve user experience:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-muted">
              <li><strong>Contact Information:</strong> Name, phone number, delivery address, and pincode provided during WhatsApp checkout or order inquiry.</li>
              <li><strong>Account Details:</strong> Email address and encrypted credentials if you register an account.</li>
              <li><strong>Technical Data:</strong> Anonymized browser type, IP address, and page interaction analytics to optimize website speed and performance.</li>
            </ul>
          </div>

          <div className="space-y-3 border-t border-border-gold/40 pt-6">
            <h2 className="font-heading text-lg font-bold text-maroon flex items-center gap-2">
              <Lock className="text-gold" size={20} />
              3. How We Use & Protect Your Information
            </h2>
            <p className="text-ink/80">
              Your data is used strictly to process orders, communicate dispatch updates, respond to inquiries, and provide customer support.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-muted">
              <li>We <strong>never sell, rent, or trade</strong> your personal information to third parties or marketing agencies.</li>
              <li>WhatsApp interactions are handled directly through official WhatsApp business API channels.</li>
              <li>All web connections are encrypted using industry-standard SSL/TLS technology.</li>
            </ul>
          </div>

          <div className="space-y-3 border-t border-border-gold/40 pt-6">
            <h2 className="font-heading text-lg font-bold text-maroon flex items-center gap-2">
              <FileText className="text-gold" size={20} />
              4. Cookies & Analytics
            </h2>
            <p className="text-ink/80">
              Our website uses essential cookies to remember items in your shopping cart and maintain session preferences. You may disable cookies in your browser settings, though certain cart features may require cookies to function properly.
            </p>
          </div>

          <div className="space-y-3 border-t border-border-gold/40 pt-6">
            <h2 className="font-heading text-lg font-bold text-maroon">
              5. Contact Us Regarding Privacy
            </h2>
            <p className="text-ink/80">
              If you have any questions or concerns regarding this Privacy Policy or your personal data, please reach out to our privacy officer at:
            </p>
            <div className="rounded-2xl bg-cream/40 p-4 border border-border-gold/40 space-y-1 text-xs text-maroon font-semibold">
              <p>📍 {SITE_NAME} · JK Enterprises</p>
              <p>✉️ Email: {CONTACT_EMAIL_GEN}</p>
              <p>📞 Phone/WhatsApp: {CONTACT_PHONE}</p>
              <p>🏢 Address: {LOCATION}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
