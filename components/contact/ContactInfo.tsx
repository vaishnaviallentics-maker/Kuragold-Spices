import { Clock, Mail, MapPin, MessageCircle } from 'lucide-react'
import {
  CONTACT_EMAIL_GEN,
  CONTACT_EMAIL_SUP,
  CONTACT_WA1,
  CONTACT_WA2,
  HOURS,
  LOCATION,
} from '@/lib/constants'
import { buildContactInquiryMessage } from '@/lib/whatsapp'

const WA_URL = buildContactInquiryMessage()

export function ContactInfo() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Call / WhatsApp Card with Both Numbers */}
        <div className="flex items-start gap-3 rounded-xl border border-border-gold/60 bg-white p-4">
          <MessageCircle className="mt-0.5 shrink-0 text-gold" size={20} aria-hidden="true" />
          <div>
            <p className="font-body text-xs font-bold uppercase tracking-wide text-muted">Call / WhatsApp</p>
            <p className="text-sm font-bold text-ink">{CONTACT_WA1}</p>
            <p className="text-sm font-bold text-ink">{CONTACT_WA2}</p>
          </div>
        </div>

        {/* General Enquiries */}
        <div className="flex items-start gap-3 rounded-xl border border-border-gold/60 bg-white p-4">
          <Mail className="mt-0.5 shrink-0 text-gold" size={20} aria-hidden="true" />
          <div>
            <p className="font-body text-xs font-bold uppercase tracking-wide text-muted">General Enquiries</p>
            <p className="text-sm font-bold text-ink">{CONTACT_EMAIL_GEN}</p>
          </div>
        </div>

        {/* Support */}
        <div className="flex items-start gap-3 rounded-xl border border-border-gold/60 bg-white p-4">
          <Mail className="mt-0.5 shrink-0 text-gold" size={20} aria-hidden="true" />
          <div>
            <p className="font-body text-xs font-bold uppercase tracking-wide text-muted">Support</p>
            <p className="text-sm font-bold text-ink">{CONTACT_EMAIL_SUP}</p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-3 rounded-xl border border-border-gold/60 bg-white p-4">
          <MapPin className="mt-0.5 shrink-0 text-gold" size={20} aria-hidden="true" />
          <div>
            <p className="font-body text-xs font-bold uppercase tracking-wide text-muted">Location</p>
            <p className="text-sm font-bold text-ink">{LOCATION}</p>
          </div>
        </div>

        {/* Hours */}
        <div className="flex items-start gap-3 rounded-xl border border-border-gold/60 bg-white p-4 sm:col-span-2">
          <Clock className="mt-0.5 shrink-0 text-gold" size={20} aria-hidden="true" />
          <div>
            <p className="font-body text-xs font-bold uppercase tracking-wide text-muted">Hours</p>
            <p className="text-sm font-bold text-ink">{HOURS}</p>
          </div>
        </div>
      </div>

      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex items-center justify-center gap-3 rounded-xl bg-whatsapp px-5 py-3.5 text-center text-white transition-all hover:bg-whatsapp-dark shadow-md"
      >
        <MessageCircle size={22} className="shrink-0" aria-hidden="true" />
        <span className="font-heading text-base font-bold tracking-wide">Enquire on WhatsApp</span>
      </a>
    </div>
  )
}
