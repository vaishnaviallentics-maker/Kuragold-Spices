import { LinkButton } from '@/components/ui/Button'
import { LogoutButton } from '@/components/admin/LogoutButton'
import { createClient } from '@/lib/supabase/server'

export default async function AdminDashboardPage() {
  const supabase = createClient()
  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)
  const todayISO = startOfToday.toISOString()

  const [
    { count: enquiriesTotal },
    { count: enquiriesToday },
    { count: ordersTotal },
    { count: ordersToday },
    { count: productsActive },
    { count: productsInactive },
    { data: recentEnquiries },
    { data: recentOrders },
    { data: claims },
  ] = await Promise.all([
    supabase.from('enquiries').select('*', { count: 'exact', head: true }),
    supabase.from('enquiries').select('*', { count: 'exact', head: true }).gte('created_at', todayISO),
    supabase.from('whatsapp_orders').select('*', { count: 'exact', head: true }),
    supabase.from('whatsapp_orders').select('*', { count: 'exact', head: true }).gte('created_at', todayISO),
    supabase.from('products').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('products').select('*', { count: 'exact', head: true }).eq('is_active', false),
    supabase.from('enquiries').select('*').order('created_at', { ascending: false }).limit(5),
    supabase.from('whatsapp_orders').select('*').order('created_at', { ascending: false }).limit(10),
    supabase.from('site_claims').select('*'),
  ])

  const confirmedClaims = (claims ?? []).filter((c) => c.is_confirmed).length
  const totalClaims = claims?.length ?? 0

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-heading text-2xl font-bold text-maroon sm:text-3xl">Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Enquiries" today={enquiriesToday ?? 0} total={enquiriesTotal ?? 0} />
        <StatCard label="WA Orders" today={ordersToday ?? 0} total={ordersTotal ?? 0} />
        <div className="rounded-xl border border-border-gold/60 bg-white p-5">
          <p className="font-body text-xs font-bold uppercase tracking-wide text-muted">Products</p>
          <p className="mt-2 font-heading text-2xl font-bold text-maroon">{productsActive ?? 0} Active</p>
          <p className="text-xs text-muted">{productsInactive ?? 0} inactive</p>
        </div>
      </div>

      <div className="rounded-xl border border-border-gold/60 bg-white p-5">
        <p className="font-body text-xs font-bold uppercase tracking-wide text-muted">Claims Status</p>
        <p className="mt-2 font-heading text-xl font-bold text-maroon">
          {confirmedClaims} of {totalClaims} confirmed
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border-gold/60 bg-white p-5">
          <h2 className="mb-4 font-heading text-lg font-bold text-maroon">Recent Enquiries</h2>
          {recentEnquiries && recentEnquiries.length > 0 ? (
            <ul className="flex flex-col gap-3">
              {recentEnquiries.map((e) => (
                <li key={e.id} className="border-b border-border-gold/40 pb-2 last:border-0">
                  <p className="text-sm font-bold text-ink">{e.name}</p>
                  <p className="text-xs text-muted">{e.enquiry_type} · {new Date(e.created_at).toLocaleDateString('en-IN')}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted">No enquiries yet.</p>
          )}
        </div>

        <div className="rounded-xl border border-border-gold/60 bg-white p-5">
          <h2 className="mb-4 font-heading text-lg font-bold text-maroon">Recent WhatsApp Order Clicks</h2>
          {recentOrders && recentOrders.length > 0 ? (
            <ul className="flex flex-col gap-3">
              {recentOrders.map((o) => (
                <li key={o.id} className="border-b border-border-gold/40 pb-2 last:border-0">
                  <p className="text-sm font-bold text-ink">
                    {o.product_name} · {o.size_label} × {o.quantity}
                  </p>
                  <p className="text-xs text-muted">
                    ₹{o.price_inr} each · {new Date(o.created_at).toLocaleDateString('en-IN')}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted">No orders logged yet.</p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <LinkButton href="/admin/products" variant="outline">Manage Products</LinkButton>
        <LinkButton href="/admin/enquiries" variant="outline">View Enquiries</LinkButton>
        <LinkButton href="/admin/claims" variant="outline">Manage Claims</LinkButton>
        <LogoutButton className="rounded-full border border-border-gold px-6 py-3 text-xs font-bold uppercase tracking-wide" />
      </div>
    </div>
  )
}

function StatCard({ label, today, total }: { label: string; today: number; total: number }) {
  return (
    <div className="rounded-xl border border-border-gold/60 bg-white p-5">
      <p className="font-body text-xs font-bold uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-2 font-heading text-2xl font-bold text-maroon">Today: {today}</p>
      <p className="text-xs text-muted">Total: {total}</p>
    </div>
  )
}
