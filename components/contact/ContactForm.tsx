'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const ENQUIRY_TYPES = [
  'General Enquiry',
  'Product Query',
  'Wholesale / Bulk Order',
  'Customer Support',
] as const

const COUNTRY_CODES = [
  { code: '+91', name: 'India (+91)' },
  { code: '+1', name: 'United States (+1)' },
  { code: '+44', name: 'United Kingdom (+44)' },
  { code: '+971', name: 'United Arab Emirates (+971)' },
  { code: '+966', name: 'Saudi Arabia (+966)' },
  { code: '+65', name: 'Singapore (+65)' },
  { code: '+61', name: 'Australia (+61)' },
  { code: '+1-CA', name: 'Canada (+1)' },
  { code: '+974', name: 'Qatar (+974)' },
  { code: '+965', name: 'Kuwait (+965)' },
  { code: '+968', name: 'Oman (+968)' },
  { code: '+973', name: 'Bahrain (+973)' },
  { code: '+60', name: 'Malaysia (+60)' },
  { code: '+49', name: 'Germany (+49)' },
  { code: '+33', name: 'France (+33)' },
  { code: '+39', name: 'Italy (+39)' },
  { code: '+34', name: 'Spain (+34)' },
  { code: '+31', name: 'Netherlands (+31)' },
  { code: '+41', name: 'Switzerland (+41)' },
  { code: '+81', name: 'Japan (+81)' },
  { code: '+82', name: 'South Korea (+82)' },
  { code: '+86', name: 'China (+86)' },
  { code: '+852', name: 'Hong Kong (+852)' },
  { code: '+64', name: 'New Zealand (+64)' },
  { code: '+27', name: 'South Africa (+27)' },
  { code: '+94', name: 'Sri Lanka (+94)' },
  { code: '+977', name: 'Nepal (+977)' },
  { code: '+880', name: 'Bangladesh (+880)' },
  { code: '+92', name: 'Pakistan (+92)' },
] as const

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  country_code: z.string().min(1),
  phone: z.string().min(6, 'Please enter a valid phone number').max(15, 'Phone number is too long'),
  email: z.string().email('Enter a valid email address'),
  enquiry_type: z.enum(ENQUIRY_TYPES),
  message: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

const inputClass =
  'w-full rounded-lg border border-border-gold bg-white px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-gold'
const labelClass = 'mb-1.5 block font-body text-xs font-bold uppercase tracking-wide text-muted'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { country_code: '+91', enquiry_type: 'General Enquiry' },
  })

  const onSubmit = async (values: FormValues) => {
    setStatus('idle')
    const dialCode = values.country_code.replace('-CA', '')
    const payload = {
      name: values.name,
      email: values.email,
      phone: `${dialCode} ${values.phone}`,
      enquiry_type: values.enquiry_type,
      message: values.message || '',
    }
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('request failed')
      setStatus('success')
      reset({ country_code: '+91', enquiry_type: 'General Enquiry', name: '', phone: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <h2 className="font-heading text-2xl font-bold text-maroon">Send a Message</h2>

      <div>
        <label className={labelClass}>Full Name *</label>
        <input {...register('name')} className={inputClass} placeholder="Full Name" />
        {errors.name && <p className="mt-1 text-xs text-maroon">{errors.name.message}</p>}
      </div>

      <div>
        <label className={labelClass}>Phone Number *</label>
        <div className="flex gap-2">
          <select
            {...register('country_code')}
            className="w-36 shrink-0 rounded-lg border border-border-gold bg-white px-3 py-2.5 text-xs sm:text-sm text-ink outline-none transition-colors focus:border-gold"
          >
            {COUNTRY_CODES.map((c) => (
              <option key={`${c.name}-${c.code}`} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
          <input
            type="tel"
            placeholder="Phone Number"
            {...register('phone')}
            className={inputClass}
          />
        </div>
        {errors.phone && <p className="mt-1 text-xs text-maroon">{errors.phone.message}</p>}
      </div>

      <div>
        <label className={labelClass}>Email Address *</label>
        <input type="email" {...register('email')} className={inputClass} placeholder="Email Address" />
        {errors.email && <p className="mt-1 text-xs text-maroon">{errors.email.message}</p>}
      </div>

      <div>
        <label className={labelClass}>Enquiry Type</label>
        <select {...register('enquiry_type')} className={inputClass}>
          {ENQUIRY_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Message</label>
        <textarea rows={4} {...register('message')} className={inputClass} placeholder="Write your message here (optional)..." />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 font-body text-sm font-bold uppercase tracking-wide text-maroon-dark transition-colors hover:bg-gold-light disabled:opacity-60"
      >
        {isSubmitting ? 'Sending…' : 'Send Message ✦'}
      </button>

      {status === 'success' && (
        <p className="rounded-lg bg-cream px-4 py-3 text-sm text-ink">
          Thank you! We will contact you within 24 hours.
        </p>
      )}
      {status === 'error' && (
        <p className="rounded-lg bg-maroon/5 px-4 py-3 text-sm text-maroon">
          Something went wrong — please try again or message us on WhatsApp.
        </p>
      )}
    </form>
  )
}
