import { FREE_SHIP_MESSAGE, CONTACT_WA, LOCATION, HOURS } from '@/lib/constants'

export function AnnouncementBar() {
  const items = [
    `🚚 ${FREE_SHIP_MESSAGE}`,
    `Order on WhatsApp: ${CONTACT_WA}`,
    `JK Enterprises · ${LOCATION}`,
    HOURS,
  ]

  const text = items.join('   ✦   ')

  return (
    <div className="relative z-50 overflow-hidden bg-[linear-gradient(90deg,#5C0E0E_0%,#3D0A0A_50%,#5C0E0E_100%)] py-2 text-gold-light border-b border-gold/30">
      <div className="animate-marquee select-none font-body text-xs font-bold uppercase tracking-widest">
        <span className="inline-block px-4">{text} &nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp; {text}</span>
        <span className="inline-block px-4">{text} &nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp; {text}</span>
      </div>
    </div>
  )
}
