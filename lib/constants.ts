export const WA_NUMBER          = process.env.NEXT_PUBLIC_WA_NUMBER ?? '918978736677'
export const SHIPPING_CHARGE    = Number(process.env.NEXT_PUBLIC_SHIPPING_CHARGE ?? 60)
export const FREE_SHIP_HYD      = Number(process.env.NEXT_PUBLIC_FREE_SHIPPING_HYD ?? 399)
export const FREE_SHIP_ABOVE    = FREE_SHIP_HYD
export const FREE_SHIP_INDIA    = FREE_SHIP_HYD
export const SITE_NAME          = 'Kura Gold Spices'
export const TAGLINE            = 'Where Quality Comes to Life'
export const CONTACT_WA1        = '+91 89787 26655'
export const CONTACT_WA2        = '+91 89787 36677'
export const CONTACT_WA         = '+91 89787 26655 / +91 89787 36677'
export const CONTACT_PHONE      = '+91 89787 36677'
export const CONTACT_EMAIL_GEN  = 'care@kuragoldspices.com'
export const CONTACT_EMAIL_SUP  = 'support@kuragoldspices.com'
export const LOCATION           = 'Hyderabad, Telangana, India'
export const HOURS              = 'Open 24 Hours'
export const FSSAI_LIC          = '23626030003544'

export const FREE_SHIP_MESSAGE  = `FREE SHIPPING: Orders Above ₹${FREE_SHIP_HYD}/- in Hyderabad`

export function isHyderabadPincode(pincode: string): boolean {
  const cleanPin = pincode.trim()
  if (!cleanPin) return true // Default to Hyderabad if empty
  const prefix = cleanPin.slice(0, 3)
  return ['500', '501', '502', '503', '504'].includes(prefix)
}

export const CATEGORY_LABELS: Record<string, string> = {
  pure_grounded: 'Pure Grounded Spices',
  blended:       'Blended Spices',
  whole:         'Whole Spices',
  combo:         'Combo Packs',
}
