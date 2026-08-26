import fs from 'fs'
import path from 'path'
import { createClient } from '@/lib/supabase/server'

export interface SiteContentItem {
  key: string
  value: string
  category: 'header' | 'home' | 'about' | 'quality' | 'careers' | 'contact' | 'policies'
  label: string
  type: 'text' | 'textarea'
}

export const DEFAULT_SITE_CONTENT: SiteContentItem[] = [
  // Header & Announcements
  {
    key: 'announcement_text',
    value: '🚚  FREE SHIPPING: ORDERS ABOVE ₹399/- IN HYDERABAD   ✦   JK ENTERPRISES · HYDERABAD, TELANGANA, INDIA',
    category: 'header',
    label: 'Top Announcement Bar Text',
    type: 'text',
  },

  // Home Page
  {
    key: 'home_hero_headline',
    value: 'Authentic Indian Spices Infused with Pure Heritage',
    category: 'home',
    label: 'Home Hero Main Headline',
    type: 'text',
  },
  {
    key: 'home_hero_subheadline',
    value: 'Elevate your daily cooking with 100% pure, farm-sourced spices milled at low temperatures to lock in natural essential oils and rich aroma.',
    category: 'home',
    label: 'Home Hero Subtitle',
    type: 'textarea',
  },

  // About Us Page
  {
    key: 'about_story_headline',
    value: 'The Kura Gold Heritage & Sourcing Promise',
    category: 'about',
    label: 'About Page Story Headline',
    type: 'text',
  },
  {
    key: 'about_story_body',
    value: 'Rooted in the fertile soils of Telangana, Kura Gold Spices was founded on a simple principle: uncompromised purity. We source raw spices directly from verified regional farmers, selecting only plump, oil-rich chillies, turmeric fingers, and coriander seeds.',
    category: 'about',
    label: 'About Page Story Text',
    type: 'textarea',
  },

  // Quality Page
  {
    key: 'quality_fssai_no',
    value: '23626030003544',
    category: 'quality',
    label: 'FSSAI License Certificate Number',
    type: 'text',
  },
  {
    key: 'quality_promise_text',
    value: 'Every batch of Kura Gold Spices is subjected to rigorous laboratory testing for moisture, volatile oil content, and zero synthetic dye adulteration.',
    category: 'quality',
    label: 'Quality Lab Testing Guarantee Text',
    type: 'textarea',
  },

  // Careers Page
  {
    key: 'careers_status_title',
    value: 'No Active Job Openings Currently',
    category: 'careers',
    label: 'Careers Hiring Status Banner Title',
    type: 'text',
  },
  {
    key: 'careers_status_body',
    value: 'We are currently operating with a full team. However, we are always eager to connect with passionate culinary talent, spice technologists, and sales professionals for future expansions.',
    category: 'careers',
    label: 'Careers Hiring Status Message',
    type: 'textarea',
  },
  {
    key: 'careers_resume_email',
    value: 'careers@kuragoldspices.com',
    category: 'careers',
    label: 'Resume Submission Email Address',
    type: 'text',
  },

  // Contact & Footer
  {
    key: 'contact_phone',
    value: '+91 89787 26655',
    category: 'contact',
    label: 'Customer Support Phone Number',
    type: 'text',
  },
  {
    key: 'contact_whatsapp',
    value: '918978726655',
    category: 'contact',
    label: 'WhatsApp Business Number',
    type: 'text',
  },
  {
    key: 'contact_email',
    value: 'info@kuragoldspices.com',
    category: 'contact',
    label: 'Support & General Inquiry Email',
    type: 'text',
  },

  // Policies
  {
    key: 'shipping_delivery_timeline',
    value: '2 to 10 business days',
    category: 'policies',
    label: 'Shipping Delivery Timeline Notice',
    type: 'text',
  },
  {
    key: 'shipping_free_limit',
    value: '₹399',
    category: 'policies',
    label: 'Free Shipping Threshold Amount',
    type: 'text',
  },
]

const LOCAL_STORE_PATH = path.join(process.cwd(), 'data', 'site_content.json')

function readLocalStore(): Record<string, string> {
  try {
    if (fs.existsSync(LOCAL_STORE_PATH)) {
      const raw = fs.readFileSync(LOCAL_STORE_PATH, 'utf8')
      return JSON.parse(raw)
    }
  } catch {
    // Ignore error
  }
  return {}
}

function writeLocalStore(store: Record<string, string>) {
  try {
    const dir = path.dirname(LOCAL_STORE_PATH)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(LOCAL_STORE_PATH, JSON.stringify(store, null, 2), 'utf8')
  } catch {
    // Ignore error
  }
}

export async function getSiteContentMap(): Promise<Record<string, string>> {
  const contentMap: Record<string, string> = {}

  // 1. Load default values
  DEFAULT_SITE_CONTENT.forEach((item) => {
    contentMap[item.key] = item.value
  })

  // 2. Overlay local JSON store values
  const localData = readLocalStore()
  Object.assign(contentMap, localData)

  // 3. Attempt to overlay Supabase site_content values if available
  try {
    const supabase = createClient()
    const { data } = await supabase.from('site_content').select('key, value')
    if (data && data.length > 0) {
      data.forEach((row) => {
        if (row.key && row.value !== null) {
          contentMap[row.key] = row.value
        }
      })
    }
  } catch {
    // Supabase fallback silently to local/defaults
  }

  return contentMap
}

export async function getSingleContent(key: string, fallback: string = ''): Promise<string> {
  const map = await getSiteContentMap()
  return map[key] ?? fallback
}

export async function updateContentKey(key: string, value: string) {
  // Update local JSON store
  const localData = readLocalStore()
  localData[key] = value
  writeLocalStore(localData)

  // Attempt Supabase update
  try {
    const supabase = createClient()
    await supabase.from('site_content').upsert({ key, value }, { onConflict: 'key' })
  } catch {
    // Supabase fallback silently
  }
}
