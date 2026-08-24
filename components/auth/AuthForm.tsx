'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Eye, EyeOff, Lock, Mail, User as UserIcon, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/public'
import { cn } from '@/lib/utils'

export function AuthForm() {
  const [tab, setTab] = useState<'signin' | 'register'>('signin')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTarget = searchParams?.get('redirect') || '/account'
  const [supabase] = useState(() => createClient())

  // Sign In State
  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')

  // Register State
  const [regName, setRegName] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regConfirmPassword, setRegConfirmPassword] = useState('')

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg(null)
    setSuccessMsg(null)

    const { data, error } = await supabase.auth.signInWithPassword({
      email: signInEmail,
      password: signInPassword,
    })

    if (error) {
      setErrorMsg(error.message)
      setLoading(false)
    } else if (data.session) {
      setSuccessMsg('Successfully signed in! Redirecting...')
      setTimeout(() => {
        router.push(redirectTarget)
        router.refresh()
      }, 1000)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg(null)
    setSuccessMsg(null)

    if (regPassword !== regConfirmPassword) {
      setErrorMsg('Passwords do not match.')
      setLoading(false)
      return
    }

    if (regPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters.')
      setLoading(false)
      return
    }

    const { data, error } = await supabase.auth.signUp({
      email: regEmail,
      password: regPassword,
      options: {
        data: { full_name: regName },
      },
    })

    if (error) {
      setErrorMsg(error.message)
      setLoading(false)
    } else if (data.user) {
      setSuccessMsg('Account created successfully! Please check your email to confirm registration or sign in.')
      setLoading(false)
      setTimeout(() => {
        setTab('signin')
        setSignInEmail(regEmail)
      }, 2000)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setErrorMsg(null)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/account`,
        },
      })
      if (error) {
        if (error.message.includes('not enabled') || error.message.includes('validation_failed')) {
          setErrorMsg('Google Sign-In is not enabled yet in your Supabase Dashboard. Please use Email & Password sign-in below or enable Google Provider in Supabase Auth.')
        } else {
          setErrorMsg(error.message)
        }
        setLoading(false)
      }
    } catch {
      setErrorMsg('Google Sign-In provider is disabled in Supabase Auth settings. Please sign in with Email & Password.')
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
      {/* Left Column: Premium Spice Kitchen Image */}
      <div className="relative h-80 overflow-hidden rounded-3xl lg:col-span-6 lg:h-[580px]">
        <Image
          src="/auth_showcase.webp"
          alt="Kura Gold Spices Kitchen"
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        <div className="absolute bottom-6 left-6 right-6">
          <div className="rounded-2xl border border-gold/40 bg-maroon-dark/85 p-6 backdrop-blur-md shadow-2xl">
            <span className="inline-block rounded-full bg-gold px-3 py-1 font-body text-[10px] font-bold uppercase tracking-widest text-maroon-dark shadow-sm">
              Kura Gold Premium
            </span>
            <h2 className="mt-3 font-heading text-2xl font-bold text-ivory sm:text-3xl drop-shadow-sm">
              Where Quality Comes To Life
            </h2>
            <p className="mt-2.5 font-body text-xs sm:text-sm font-medium text-white leading-relaxed drop-shadow-sm">
              100% pure Indian spices ground to perfection with natural aroma and authentic taste.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Authentication Card */}
      <div className="lg:col-span-6">
        <div className="rounded-3xl border border-gold/30 bg-white p-6 sm:p-10 shadow-lg">
          <p className="font-body text-xs font-bold uppercase tracking-widest text-maroon">
            WELCOME
          </p>
          <h1 className="mt-1 font-heading text-3xl font-bold text-maroon sm:text-4xl">
            {tab === 'signin' ? 'Sign In to Your Account' : 'Create Your Account'}
          </h1>
          <p className="mt-2 text-xs text-muted">
            {tab === 'signin'
              ? 'Access your orders, wishlist, and account settings.'
              : 'Join Kura Gold Spices for exclusive offers and easy order tracking.'}
          </p>

          {/* Auth Tabs Header */}
          <div className="mt-6 flex border-b border-border-gold/40">
            <button
              type="button"
              onClick={() => {
                setTab('signin')
                setErrorMsg(null)
                setSuccessMsg(null)
              }}
              className={cn(
                'flex-1 py-3 text-center font-heading text-sm font-bold uppercase tracking-wider transition-all border-b-2',
                tab === 'signin'
                  ? 'border-maroon text-maroon'
                  : 'border-transparent text-muted hover:text-maroon'
              )}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setTab('register')
                setErrorMsg(null)
                setSuccessMsg(null)
              }}
              className={cn(
                'flex-1 py-3 text-center font-heading text-sm font-bold uppercase tracking-wider transition-all border-b-2',
                tab === 'register'
                  ? 'border-maroon text-maroon'
                  : 'border-transparent text-muted hover:text-maroon'
              )}
            >
              Register
            </button>
          </div>

          {/* Alert Messages */}
          {errorMsg && (
            <div className="mt-4 flex items-center gap-2.5 rounded-2xl bg-rose-50 border border-rose-200 p-3.5 text-xs font-semibold text-rose-800">
              <AlertCircle size={16} className="shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mt-4 flex items-center gap-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 p-3.5 text-xs font-semibold text-emerald-800">
              <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Google OAuth Button */}
          <div className="mt-6">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-border-gold/80 bg-white py-3 px-4 font-body text-xs font-bold text-ink transition-all hover:bg-cream/40 shadow-2xs"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="relative my-6 flex items-center justify-center">
              <div className="w-full border-t border-border-gold/40" />
              <span className="absolute bg-white px-3 font-body text-[11px] font-bold uppercase tracking-wider text-muted">
                OR
              </span>
            </div>
          </div>

          {/* Sign In Form */}
          {tab === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block font-body text-xs font-bold uppercase tracking-wider text-muted mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                  <input
                    type="email"
                    required
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full rounded-2xl border border-border-gold/80 bg-white py-3 pl-10 pr-4 font-body text-xs text-ink outline-none transition-colors focus:border-maroon focus:ring-1 focus:ring-maroon"
                  />
                </div>
              </div>

              <div>
                <label className="block font-body text-xs font-bold uppercase tracking-wider text-muted mb-1">
                  Password *
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-border-gold/80 bg-white py-3 pl-10 pr-10 font-body text-xs text-ink outline-none transition-colors focus:border-maroon focus:ring-1 focus:ring-maroon"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-maroon"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <Link href="/contact" className="font-body text-xs font-bold text-maroon hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-maroon py-3.5 font-body text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-maroon-dark shadow-md"
              >
                <span>{loading ? 'Signing In...' : 'Sign In'}</span>
                {!loading && <ArrowRight size={16} />}
              </button>
            </form>
          )}

          {/* Register Form */}
          {tab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block font-body text-xs font-bold uppercase tracking-wider text-muted mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <UserIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Your Full Name"
                    className="w-full rounded-2xl border border-border-gold/80 bg-white py-3 pl-10 pr-4 font-body text-xs text-ink outline-none transition-colors focus:border-maroon focus:ring-1 focus:ring-maroon"
                  />
                </div>
              </div>

              <div>
                <label className="block font-body text-xs font-bold uppercase tracking-wider text-muted mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full rounded-2xl border border-border-gold/80 bg-white py-3 pl-10 pr-4 font-body text-xs text-ink outline-none transition-colors focus:border-maroon focus:ring-1 focus:ring-maroon"
                  />
                </div>
              </div>

              <div>
                <label className="block font-body text-xs font-bold uppercase tracking-wider text-muted mb-1">
                  Password *
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full rounded-2xl border border-border-gold/80 bg-white py-3 pl-10 pr-10 font-body text-xs text-ink outline-none transition-colors focus:border-maroon focus:ring-1 focus:ring-maroon"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-maroon"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-body text-xs font-bold uppercase tracking-wider text-muted mb-1">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full rounded-2xl border border-border-gold/80 bg-white py-3 pl-10 pr-4 font-body text-xs text-ink outline-none transition-colors focus:border-maroon focus:ring-1 focus:ring-maroon"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-maroon py-3.5 font-body text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-maroon-dark shadow-md"
              >
                <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
                {!loading && <ArrowRight size={16} />}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
