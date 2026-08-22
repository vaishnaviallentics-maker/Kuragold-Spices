import { createClient } from '@/lib/supabase/server'
import type { WhatsAppOrder } from '@/types'

function topEntry(counts: Record<string, number>): string {
  const entries = Object.entries(counts)
  if (entries.length === 0) return '—'
  return entries.sort((a, b) => b[1] - a[1])[0][0]
}

export default async function AdminOrdersPage() {
  const supabase = createClient()
  const { data } = await supabase
    .from('whatsapp_orders')
    .select('*')
    .order('created_at', { ascending: false })

  const orders = (data ?? []) as WhatsAppOrder[]

  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)
  const startOfYesterday = new Date(startOfToday)
  startOfYesterday.setDate(startOfYesterday.getDate() - 1)

  const todayCount = orders.filter((o) => new Date(o.created_at) >= startOfToday).length
  const yesterdayCount = orders.filter(
    (o) => new Date(o.created_at) >= startOfYesterday && new Date(o.created_at) < startOfToday
  ).length

  const productCounts: Record<string, number> = {}
  const sizeCounts: Record<string, number> = {}
  let revenuePotential = 0

  for (const order of orders) {
    productCounts[order.product_name] = (productCounts[order.product_name] ?? 0) + order.quantity
    sizeCounts[order.size_label] = (sizeCounts[order.size_label] ?? 0) + order.quantity
    revenuePotential += order.price_inr * order.quantity
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-heading text-2xl font-bold text-maroon sm:text-3xl">WhatsApp Orders Log</h1>

      <p className="max-w-2xl rounded-lg border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-ink">
        These are click-through logs only. Actual orders are confirmed directly with our team via
        WhatsApp.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard label="Most Popular Product" value={topEntry(productCounts)} />
        <SummaryCard label="Most Popular Size" value={topEntry(sizeCounts)} />
        <SummaryCard label="Today vs Yesterday" value={`${todayCount} vs ${yesterdayCount}`} />
        <SummaryCard label="Revenue Potential" value={`₹${revenuePotential.toLocaleString('en-IN')}`} />
      </div>

      <div className="overflow-x-auto rounded-xl border border-border-gold/60 bg-white">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-border-gold/60 text-xs font-bold uppercase tracking-wide text-muted">
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Size</th>
              <th className="px-4 py-3">Qty</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Date/Time</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-border-gold/40 last:border-0">
                <td className="px-4 py-3 font-bold text-ink">{order.product_name}</td>
                <td className="px-4 py-3 text-muted">{order.size_label}</td>
                <td className="px-4 py-3 text-muted">{order.quantity}</td>
                <td className="px-4 py-3 text-muted">₹{order.price_inr}</td>
                <td className="px-4 py-3 text-muted">{new Date(order.created_at).toLocaleString('en-IN')}</td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-muted">
                  No orders logged yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border-gold/60 bg-white p-5">
      <p className="font-body text-xs font-bold uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-2 font-heading text-xl font-bold text-maroon">{value}</p>
    </div>
  )
}
