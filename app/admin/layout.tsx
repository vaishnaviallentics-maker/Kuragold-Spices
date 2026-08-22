import type { Metadata } from 'next'

// Defense-in-depth alongside robots.ts's `disallow: /admin/` — keeps the
// admin panel out of search results even if something links to it directly.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children
}
