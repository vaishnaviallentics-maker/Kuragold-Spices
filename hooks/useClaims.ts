import { createClient } from '@/lib/supabase/public'
import type { SiteClaim } from '@/types'

export async function getClaims(): Promise<SiteClaim[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('site_claims')
    .select('*')
    .eq('is_confirmed', true)

  if (error || !data) return []
  return data
}
