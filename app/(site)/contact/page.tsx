import type { Metadata } from 'next'
import { ContactForm } from '@/components/contact/ContactForm'
import { ContactInfo } from '@/components/contact/ContactInfo'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SITE_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Get in touch with ${SITE_NAME} for orders, queries, and wholesale enquiries.`,
}

export default function ContactPage() {
  return (
    <main className="bg-ivory px-6 py-16 sm:px-10">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2">
        <div>
          <SectionLabel>Get in Touch</SectionLabel>
          <h1 className="font-heading text-3xl font-bold text-maroon sm:text-4xl">
            We&rsquo;d Love to Hear from You
          </h1>
          <p className="mt-3 max-w-md text-sm text-muted">
            For orders, queries, and wholesale enquiries — reach out any way that suits you.
          </p>

          <div className="mt-8">
            <ContactInfo />
          </div>
        </div>

        <div className="h-fit rounded-2xl border border-border-gold/60 bg-white p-6 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </main>
  )
}
