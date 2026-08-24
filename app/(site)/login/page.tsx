import type { Metadata } from 'next'
import { Suspense } from 'react'
import { AuthForm } from '@/components/auth/AuthForm'

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in or register for a Kura Gold Spices customer account to track orders and save wishlist items.',
}

export default function LoginPage() {
  return (
    <main className="bg-ivory px-6 py-12 sm:px-10 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <Suspense fallback={<p className="text-center text-maroon font-heading">Loading Sign In...</p>}>
          <AuthForm />
        </Suspense>
      </div>
    </main>
  )
}
