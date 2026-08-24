import { WA_NUMBER } from './constants'
import type { CartItem } from '@/types'

export function buildCartOrderMessage(items: CartItem[]): string {
  const lines = items
    .map(
      (item, i) =>
        `${i + 1}. *${item.productName}* (${item.sizeLabel}) × ${item.quantity} — ₹${(item.price * item.quantity).toLocaleString('en-IN')}`
    )
    .join('\n')

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const message = `Hello Kura Gold Spices Team,

I would like to place an order for the following items:

${lines}

*Total Order Amount: ₹${total.toLocaleString('en-IN')}*

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
  const totalPrice = price * quantity

  const message = `Hello Kura Gold Spices Team,

I am interested in ordering:
• *Product:* ${productName}
• *Pack Size:* ${sizeLabel}${qtyText}
• *Price:* ₹${totalPrice.toLocaleString('en-IN')}

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


