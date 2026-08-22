'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import { createClient } from '@/lib/supabase/client'
import { SITE_NAME } from '@/lib/constants'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    if (signInError) {
      setLoading(false)
      setError('Incorrect email or password.')
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,#5C0E0E_0%,#7A1515_50%,#3D0A0A_100%)] px-6">
      <div className="w-full max-w-sm rounded-2xl bg-ivory p-8 shadow-2xl">
        <div className="mb-6 flex flex-col items-center">
          <Image
            src="/logo.webp"
            alt={SITE_NAME}
            width={1024}
            height={559}
            className="h-14 w-auto object-contain"
          />
          <h1 className="mt-4 font-heading text-2xl font-bold text-maroon">Admin Login</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block font-body text-xs font-bold uppercase tracking-wide text-muted">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-border-gold bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="mb-1.5 block font-body text-xs font-bold uppercase tracking-wide text-muted">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-border-gold bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-gold"
            />
          </div>

          {error && <p className="font-body text-xs font-bold text-maroon">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 font-body text-sm font-bold uppercase tracking-wide text-maroon-dark transition-colors hover:bg-gold-light disabled:opacity-60"
          >
            {loading ? 'Logging in…' : 'Login'}
          </button>
        </form>

        <Link href="/" className="mt-6 block text-center text-xs text-muted hover:text-maroon">
          ← Back to site
        </Link>
      </div>
    </div>
  )
}
