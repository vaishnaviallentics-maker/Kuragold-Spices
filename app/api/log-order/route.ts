import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

interface LogOrderItem {
  productName: string
  size: string
  price: number
  quantity: number
}

export async function POST(req: NextRequest) {
  const { items }: { items: LogOrderItem[] } = await req.json()
  const supabase = createClient()

  await supabase.from('whatsapp_orders').insert(
    items.map((item) => ({
      product_name: item.productName,
      size_label: item.size,
      price_inr: item.price,
      quantity: item.quantity,
    }))
  )

  return NextResponse.json({ ok: true })
}
