import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// For anonymous, public-read-only queries (product/claims listings) that must
// also run outside a request scope, e.g. generateStaticParams at build time —
// where the cookie-based server client (lib/supabase/server.ts) is unusable.
//
// `cache: 'no-store'` is set explicitly rather than relying on the page's
// `export const dynamic = 'force-dynamic'` to imply it — in practice that
// inference did not reliably bypass Next's fetch Data Cache for these calls,
// which left admin claim/price edits invisible on the public site until the
// dev server restarted. Forcing it at the client avoids depending on that.
export const createClient = () =>
  createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        fetch: (input, init) => fetch(input, { ...init, cache: 'no-store' }),
      },
    }
  )
