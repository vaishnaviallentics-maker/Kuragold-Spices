export interface ProductVariant {
  id: string
  product_id: string
  size_label: string
  price_inr: number
  is_active: boolean
  sort_order: number
}

export interface Product {
  id: string
  name: string
  slug: string
  tagline: string
  description: string
  image_url: string
  category: string
  is_active: boolean
  product_variants: ProductVariant[]
}

export interface Enquiry {
  id: string
  name: string
  email: string
  phone: string
  enquiry_type: string
  message: string
  is_read: boolean
  created_at: string
}

export interface WhatsAppOrder {
  id: string
  product_name: string
  size_label: string
  price_inr: number
  quantity: number
  created_at: string
}

export interface CartItem {
  productId: string
  productName: string
  productImage: string
  variantId: string
  sizeLabel: string
  price: number
  quantity: number
}

export interface SiteClaim {
  key: string
  label: string
  value: string
  is_confirmed: boolean
}

// Ready for Phase 2 payment — do not implement now
export interface Order {
  id: string
  product_name: string
  size_label: string
  price_inr: number
  shipping_inr: number
  total_inr: number
  customer_name?: string
  customer_phone?: string
  payment_status: 'pending' | 'paid' | 'failed'
  payment_method: 'whatsapp_manual' | 'razorpay' | 'upi'
  order_status: 'enquiry' | 'confirmed' | 'shipped' | 'delivered'
  created_at: string
}
