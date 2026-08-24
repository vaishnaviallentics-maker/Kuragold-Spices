'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Building2, CheckCircle2, Lock, MessageCircle, PackageCheck, Send, ShieldCheck, Truck } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { useAuth } from '@/context/AuthContext'
import { createClient } from '@/lib/supabase/public'

export default function BulkInquiryPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // Form State
  const [companyName, setCompanyName] = useState('')
  const [businessType, setBusinessType] = useState('Restaurant / Catering')
  const [contactName, setContactName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [spiceRequirements, setSpiceRequirements] = useState('')
  const [estimatedQuantity, setEstimatedQuantity] = useState('50 kg - 200 kg')
  const [deliveryPincode, setDeliveryPincode] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (user) {
      setContactName(user.user_metadata?.full_name || '')
      setEmail(user.email || '')
    }
  }, [user])

  if (loading) {
    return (
      <main className="bg-ivory px-6 py-20 text-center">
        <p className="font-heading text-lg font-bold text-maroon">Checking authentication...</p>
      </main>
    )
  }

  // If user is not logged in, prompt sign in first!
  if (!user) {
    return (
      <main className="bg-ivory px-6 py-16 sm:px-10 lg:py-24">
        <div className="mx-auto max-w-2xl text-center space-y-6">
          <div className="mx-auto h-16 w-16 rounded-3xl bg-cream border border-gold/40 flex items-center justify-center text-maroon shadow-sm">
            <Lock size={32} />
          </div>

          <div>
            <SectionLabel className="justify-center">B2B BULK SPICE PORTAL</SectionLabel>
            <h1 className="mt-2 font-heading text-3xl sm:text-4xl font-bold text-maroon">
              Sign In to Request Bulk Wholesale Pricing
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-muted leading-relaxed max-w-md mx-auto">
              Exclusive wholesale rates, custom packaging, and tier discounts are available for registered business buyers, wholesalers, and restaurant partners.
            </p>
          </div>

          <div className="rounded-3xl border border-gold/40 bg-white p-8 shadow-lg space-y-4">
            <div className="flex items-center justify-center gap-3 text-xs font-semibold text-ink">
              <span className="flex items-center gap-1 text-emerald-700">
                <CheckCircle2 size={16} /> Direct Mill Pricing
              </span>
              <span className="flex items-center gap-1 text-emerald-700">
                <CheckCircle2 size={16} /> Custom Batch Milling
              </span>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login?redirect=/bulk-inquiry"
                className="inline-flex items-center justify-center rounded-full bg-maroon px-8 py-3.5 font-body text-xs font-bold uppercase tracking-widest text-white hover:bg-maroon-dark shadow-md transition-transform hover:scale-105"
              >
                Sign In / Register to Access Bulk Portal
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setErrorMsg(null)

    const fullDetails = `Company: ${companyName} | Business: ${businessType} | Req: ${spiceRequirements} | Qty: ${estimatedQuantity} | Pincode: ${deliveryPincode} | Note: ${message}`

    const supabase = createClient()
    const { error } = await supabase.from('enquiries').insert([
      {
        name: contactName,
        email: email,
        phone: phone,
        enquiry_type: 'Bulk Inquiry',
        message: fullDetails,
      },
    ])

    if (error) {
      setErrorMsg(error.message)
      setSubmitting(false)
    } else {
      setSubmitted(true)
      setSubmitting(false)
    }
  }

  const waBulkText = `https://wa.me/919885820352?text=Hello%20Kura%20Gold%20Team,%20I%20want%20a%20bulk%20quote%20for%20my%20business:%0A*Company:*%20${encodeURIComponent(
    companyName
  )}%0A*Business%20Type:*%20${encodeURIComponent(businessType)}%0A*Spices:*%20${encodeURIComponent(
    spiceRequirements
  )}%0A*Qty:*%20${encodeURIComponent(estimatedQuantity)}.`

  return (
    <main className="bg-ivory px-6 py-12 sm:px-10 lg:py-16">
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Header Hero */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <SectionLabel className="justify-center">REGISTERED B2B BULK PORTAL</SectionLabel>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-maroon">
            Request Wholesale Spice Quote
          </h1>
          <p className="text-xs sm:text-sm text-muted">
            Welcome back, <strong className="text-maroon font-semibold">{user.email}</strong>! Submit your commercial quantity requirements below for direct mill prices.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-3xl border border-emerald-300 bg-emerald-50/80 p-8 sm:p-12 text-center shadow-lg space-y-4">
            <div className="mx-auto h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
              <CheckCircle2 size={36} />
            </div>
            <h2 className="font-heading text-2xl font-bold text-emerald-900">
              Bulk Inquiry Submitted Successfully!
            </h2>
            <p className="text-xs sm:text-sm text-emerald-800 max-w-lg mx-auto leading-relaxed">
              Thank you, {contactName}. Our commercial sales manager will review your requirement and send a customized bulk quotation to {email} within 2 hours.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <a
                href={waBulkText}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-8 py-3 font-body text-xs font-bold uppercase tracking-wider text-white hover:bg-whatsapp-dark shadow-md"
              >
                <MessageCircle size={16} />
                Connect Instantly on WhatsApp
              </a>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-border-gold/60 bg-white p-6 sm:p-10 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block font-body text-xs font-bold uppercase tracking-wider text-muted mb-1">
                    Company / Business Name *
                  </label>
                  <div className="relative">
                    <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Royal Bawarchi Restaurant / Grand Hotel"
                      className="w-full rounded-2xl border border-border-gold/80 bg-white py-3 pl-10 pr-4 font-body text-xs text-ink outline-none focus:border-maroon"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-body text-xs font-bold uppercase tracking-wider text-muted mb-1">
                    Business Category *
                  </label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full rounded-2xl border border-border-gold/80 bg-white py-3 px-4 font-body text-xs text-ink outline-none focus:border-maroon"
                  >
                    <option value="Restaurant / Hotel">Restaurant / Hotel / Catering</option>
                    <option value="Wholesaler / Super Stockist">Wholesaler / Super Stockist</option>
                    <option value="Grocery Retail Chain">Grocery Retail Chain</option>
                    <option value="Food Manufacturer / Baker">Food Manufacturer / Processor</option>
                    <option value="Export / Institutional">Spice Exporter / Institutional</option>
                  </select>
                </div>

                <div>
                  <label className="block font-body text-xs font-bold uppercase tracking-wider text-muted mb-1">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Your Full Name"
                    className="w-full rounded-2xl border border-border-gold/80 bg-white py-3 px-4 font-body text-xs text-ink outline-none focus:border-maroon"
                  />
                </div>

                <div>
                  <label className="block font-body text-xs font-bold uppercase tracking-wider text-muted mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-2xl border border-border-gold/80 bg-white py-3 px-4 font-body text-xs text-ink outline-none focus:border-maroon"
                  />
                </div>

                <div>
                  <label className="block font-body text-xs font-bold uppercase tracking-wider text-muted mb-1">
                    Required Spices *
                  </label>
                  <input
                    type="text"
                    required
                    value={spiceRequirements}
                    onChange={(e) => setSpiceRequirements(e.target.value)}
                    placeholder="e.g. Red Chilli Powder, Turmeric, Dhania"
                    className="w-full rounded-2xl border border-border-gold/80 bg-white py-3 px-4 font-body text-xs text-ink outline-none focus:border-maroon"
                  />
                </div>

                <div>
                  <label className="block font-body text-xs font-bold uppercase tracking-wider text-muted mb-1">
                    Estimated Order Quantity *
                  </label>
                  <select
                    value={estimatedQuantity}
                    onChange={(e) => setEstimatedQuantity(e.target.value)}
                    className="w-full rounded-2xl border border-border-gold/80 bg-white py-3 px-4 font-body text-xs text-ink outline-none focus:border-maroon"
                  >
                    <option value="25 kg - 50 kg">25 kg - 50 kg (Trial Batch)</option>
                    <option value="50 kg - 200 kg">50 kg - 200 kg</option>
                    <option value="200 kg - 500 kg">200 kg - 500 kg</option>
                    <option value="500 kg - 1 Ton">500 kg - 1 Ton</option>
                    <option value="1 Ton+ Commercial">1 Ton+ Commercial Bulk</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-body text-xs font-bold uppercase tracking-wider text-muted mb-1">
                  Delivery Location &amp; Pincode
                </label>
                <input
                  type="text"
                  value={deliveryPincode}
                  onChange={(e) => setDeliveryPincode(e.target.value)}
                  placeholder="e.g. Hyderabad - 500001"
                  className="w-full rounded-2xl border border-border-gold/80 bg-white py-3 px-4 font-body text-xs text-ink outline-none focus:border-maroon"
                />
              </div>

              <div>
                <label className="block font-body text-xs font-bold uppercase tracking-wider text-muted mb-1">
                  Additional Notes / Packaging Requirements
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Mention custom pouch sizes, mesh fineness, or specific delivery timelines..."
                  className="w-full rounded-2xl border border-border-gold/80 bg-white p-3 font-body text-xs text-ink outline-none focus:border-maroon"
                />
              </div>

              {errorMsg && (
                <p className="text-xs font-semibold text-rose-600">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-maroon py-4 font-body text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-maroon-dark shadow-md"
              >
                <Send size={16} />
                <span>{submitting ? 'Submitting Quote Request...' : 'Submit Bulk Inquiry'}</span>
              </button>
            </form>
          </div>
        )}

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border-gold/40 bg-white p-5 text-center">
            <PackageCheck size={24} className="mx-auto text-maroon mb-2" />
            <h4 className="font-heading text-xs font-bold text-maroon uppercase">Custom Batch Milling</h4>
            <p className="mt-1 text-[11px] text-muted">Custom coarseness &amp; tailored pouch sizes for your kitchen.</p>
          </div>
          <div className="rounded-2xl border border-border-gold/40 bg-white p-5 text-center">
            <Truck size={24} className="mx-auto text-maroon mb-2" />
            <h4 className="font-heading text-xs font-bold text-maroon uppercase">Direct Mill Pricing</h4>
            <p className="mt-1 text-[11px] text-muted">Zero middleman margins with direct factory supply.</p>
          </div>
          <div className="rounded-2xl border border-border-gold/40 bg-white p-5 text-center">
            <ShieldCheck size={24} className="mx-auto text-maroon mb-2" />
            <h4 className="font-heading text-xs font-bold text-maroon uppercase">FSSAI Certified Purity</h4>
            <p className="mt-1 text-[11px] text-muted">100% lab-tested batch report with every shipment.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
