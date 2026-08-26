import { toggleClaim } from '@/app/admin/actions'
import { ToggleSwitch } from '@/components/admin/ToggleSwitch'
import { createClient } from '@/lib/supabase/server'

export default async function AdminClaimsPage() {
  const supabase = createClient()
  const { data: claims } = await supabase.from('site_claims').select('*').order('key')

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-heading text-2xl font-bold text-maroon sm:text-3xl">Claims Management</h1>

      <p className="max-w-2xl rounded-lg border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-ink">
        Manage quality trust badges. Turning ON a badge will immediately show it on the public website.
      </p>

      <div className="overflow-x-auto rounded-xl border border-border-gold/60 bg-white">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="border-b border-border-gold/60 text-xs font-bold uppercase tracking-wide text-muted">
              <th className="px-4 py-3">Claim</th>
              <th className="px-4 py-3">Value shown on site</th>
              <th className="px-4 py-3">Visible</th>
            </tr>
          </thead>
          <tbody>
            {(claims ?? []).map((claim) => (
              <tr key={claim.key} className="border-b border-border-gold/40 last:border-0">
                <td className="px-4 py-3 font-bold text-ink">{claim.label}</td>
                <td className="px-4 py-3 text-muted">{claim.value}</td>
                <td className="px-4 py-3">
                  <ToggleSwitch
                    checked={claim.is_confirmed}
                    onToggle={toggleClaim.bind(null, claim.key)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
