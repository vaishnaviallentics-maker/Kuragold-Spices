import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import {
  CONTACT_EMAIL_GEN,
  CONTACT_EMAIL_SUP,
  CONTACT_PHONE,
  CONTACT_WA,
  HOURS,
  LOCATION,
} from '@/lib/constants'
import { buildContactInquiryMessage } from '@/lib/whatsapp'

const CARDS = [
  { icon: MessageCircle, label: 'Call / WhatsApp', value: CONTACT_WA },
  { icon: Phone, label: 'Phone', value: CONTACT_PHONE },
  { icon: Mail, label: 'General Enquiries', value: CONTACT_EMAIL_GEN },
  { icon: Mail, label: 'Support', value: CONTACT_EMAIL_SUP },
  { icon: MapPin, label: 'Location', value: LOCATION },
  { icon: Clock, label: 'Hours', value: HOURS },
]

const WA_URL = buildContactInquiryMessage()

export function ContactInfo() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {CARDS.map((card) => (
          <div
            key={card.label}
            className="flex items-start gap-3 rounded-xl border border-border-gold/60 bg-white p-4"
          >
            <card.icon className="mt-0.5 shrink-0 text-gold" size={20} aria-hidden="true" />
            <div>
              <p className="font-body text-xs font-bold uppercase tracking-wide text-muted">{card.label}</p>
              <p className="text-sm font-bold text-ink">{card.value}</p>
            </div>
          </div>
        ))}
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
