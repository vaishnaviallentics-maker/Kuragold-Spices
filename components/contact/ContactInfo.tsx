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
        className="mt-6 flex flex-col items-center gap-2 rounded-2xl bg-whatsapp px-6 py-8 text-center text-white transition-colors hover:bg-whatsapp-dark"
      >
        <MessageCircle size={40} aria-hidden="true" />
        <p className="font-heading text-xl font-bold">Enquire on WhatsApp</p>
        <p className="text-sm text-white/80">Tap to chat directly with our team on WhatsApp</p>
      </a>
    </div>
  )
}
