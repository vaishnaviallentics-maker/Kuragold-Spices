import { FREE_SHIP_ABOVE, SHIPPING_CHARGE, WA_NUMBER } from './constants'
import type { CartItem } from '@/types'

export function buildCartOrderMessage(items: CartItem[]): string {
  const lines = items
    .map(
      (item, i) =>
        `${i + 1}. *${item.productName}* (${item.sizeLabel}) × ${item.quantity} — ₹${(item.price * item.quantity).toLocaleString('en-IN')}`
    )
    .join('\n')

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal >= FREE_SHIP_ABOVE ? 0 : SHIPPING_CHARGE
  const grandTotal = subtotal + shipping

  const shippingText = shipping === 0 ? 'FREE 🎉' : `₹${shipping}`

  const message = `Hello Kura Gold Spices Team,

I would like to place an order for the following items:

${lines}

--------------------------------
• Subtotal: ₹${subtotal.toLocaleString('en-IN')}
• Delivery Charge: ${shippingText}
*Total Payable Amount: ₹${grandTotal.toLocaleString('en-IN')}*
--------------------------------

Please confirm item availability and share payment & dispatch details. Thank you!`

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}

export function buildGeneralMessage(msg: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
}

export function buildSingleProductOrderMessage(
  productName: string,
  sizeLabel: string,
  price: number,
  quantity: number = 1
): string {
  const qtyText = quantity > 1 ? ` × ${quantity}` : ''
  const itemTotal = price * quantity
  const shipping = itemTotal >= FREE_SHIP_ABOVE ? 0 : SHIPPING_CHARGE
  const grandTotal = itemTotal + shipping
  const shippingText = shipping === 0 ? 'FREE 🎉' : `₹${shipping}`

  const message = `Hello Kura Gold Spices Team,

I am interested in ordering:
• *Product:* ${productName}
• *Pack Size:* ${sizeLabel}${qtyText}
• *Item Subtotal:* ₹${itemTotal.toLocaleString('en-IN')}
• *Delivery Charge:* ${shippingText}
*Total Payable Amount: ₹${grandTotal.toLocaleString('en-IN')}*

Please confirm availability and share payment & shipping details. Thank you!`

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}

export function buildGeneralInquiryMessage(): string {
  const message = `Hello Kura Gold Spices Team,

I am visiting your website and would like to know more about your pure Indian spices and product availability.`

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}

export function buildContactInquiryMessage(): string {
  const message = `Hello Kura Gold Spices Team,

I have an inquiry regarding Kura Gold Spices products and orders. Please assist me.`

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}

export function buildComingSoonNotifyMessage(productName: string): string {
  const message = `Hello Kura Gold Spices Team,\n\nI am interested in "${productName}" which is listed as Coming Soon. Please notify me when it becomes available.\n\nThank you!`
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}


