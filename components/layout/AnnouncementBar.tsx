import { getSingleContent } from '@/lib/siteContent'
import { FREE_SHIP_MESSAGE, LOCATION } from '@/lib/constants'

export async function AnnouncementBar() {
  const customText = await getSingleContent('announcement_text', '')
  const defaultText = `🚚  ${FREE_SHIP_MESSAGE}   ✦   JK Enterprises · ${LOCATION}`
  const text = customText || defaultText
  const separator = '             ✦             '

  return (
    <div className="relative z-50 overflow-hidden bg-[linear-gradient(90deg,#5C0E0E_0%,#3D0A0A_50%,#5C0E0E_100%)] py-2.5 text-gold-light border-b border-gold/30">
      <div className="animate-marquee select-none font-body text-xs font-bold uppercase tracking-[0.22em] text-gold-light">
        <span className="inline-block px-16">{text}{separator}</span>
        <span className="inline-block px-16">{text}{separator}</span>
      </div>
    </div>
  )
}
