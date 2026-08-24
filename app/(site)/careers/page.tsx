import type { Metadata } from 'next'
import Link from 'next/link'
import { Briefcase, MapPin, Sparkles, CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react'
import { LinkButton } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { buildGeneralInquiryMessage } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join Kura Gold Spices (JK Enterprises) — build your career with Hyderabad’s premier spice brand.',
}

const OPEN_POSITIONS = [
  {
    id: 1,
    title: 'Quality Control & Food Safety Analyst',
    department: 'Quality Assurance',
    location: 'Hyderabad, Telangana',
    type: 'Full-Time',
    description: 'Responsible for raw spice inspection, moisture testing, aroma retention analysis, and FSSAI compliance auditing.',
  },
  {
    id: 2,
    title: 'Territory Sales Manager — Spices & Retail',
    department: 'Sales & Distribution',
    location: 'Telangana & Andhra Pradesh',
    type: 'Full-Time',
    description: 'Drive retail distribution, manage super-stockists and grocery store partnerships for Kura Gold pure spice range.',
  },
  {
    id: 3,
    title: 'E-Commerce & Digital Growth Specialist',
    department: 'Marketing',
    location: 'Hyderabad, Telangana',
    type: 'Full-Time / Hybrid',
    description: 'Manage online D2C store performance, customer acquisition, social media content, and brand campaigns.',
  },
  {
    id: 4,
    title: 'Spice Milling & Production Supervisor',
    department: 'Operations',
    location: 'Hyderabad, Telangana',
    type: 'Full-Time',
    description: 'Oversee cold-grinding production lines, hygienic pouch packaging, and inventory batch management.',
  },
]

export default function CareersPage() {
  return (
    <main className="bg-ivory px-6 py-12 sm:px-10 lg:py-16">
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <SectionLabel className="justify-center">JOIN THE KURA GOLD TEAM</SectionLabel>
          <h1 className="font-heading text-3xl sm:text-5xl font-bold text-maroon">
            Build Your Career in Spice Excellence
          </h1>
          <p className="font-body text-sm sm:text-base text-muted leading-relaxed">
            At Kura Gold Spices (JK Enterprises), we are passionate about purity, innovation, and tradition. Join our growing team in Hyderabad and help us bring authentic Indian flavours to every kitchen.
          </p>
        </div>

        {/* Culture Highlights */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-3xl border border-border-gold/60 bg-white p-6 shadow-sm">
            <div className="h-10 w-10 rounded-2xl bg-cream flex items-center justify-center text-maroon mb-4">
              🌿
            </div>
            <h3 className="font-heading text-lg font-bold text-maroon">Purity &amp; Quality First</h3>
            <p className="mt-2 text-xs text-muted leading-relaxed">
              We never compromise on quality. Every team member takes pride in maintaining 100% unadulterated standards.
            </p>
          </div>

          <div className="rounded-3xl border border-border-gold/60 bg-white p-6 shadow-sm">
            <div className="h-10 w-10 rounded-2xl bg-cream flex items-center justify-center text-maroon mb-4">
              🚀
            </div>
            <h3 className="font-heading text-lg font-bold text-maroon">Fast-Growing Brand</h3>
            <p className="mt-2 text-xs text-muted leading-relaxed">
              Experience fast career growth in a rapidly expanding FMCG spice brand backed by strong heritage.
            </p>
          </div>

          <div className="rounded-3xl border border-border-gold/60 bg-white p-6 shadow-sm">
            <div className="h-10 w-10 rounded-2xl bg-cream flex items-center justify-center text-maroon mb-4">
              🤝
            </div>
            <h3 className="font-heading text-lg font-bold text-maroon">Inclusive Work Culture</h3>
            <p className="mt-2 text-xs text-muted leading-relaxed">
              Collaborative, supportive environment where every idea is valued and individual achievement is celebrated.
            </p>
          </div>
        </div>

        {/* Open Positions List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border-gold/40 pb-4">
            <div>
              <h2 className="font-heading text-2xl font-bold text-maroon">Open Positions</h2>
              <p className="text-xs text-muted">Explore current opportunities across sales, quality, and operations</p>
            </div>
            <span className="rounded-full bg-maroon px-3 py-1 font-body text-xs font-bold text-gold-light">
              {OPEN_POSITIONS.length} Active Roles
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {OPEN_POSITIONS.map((job) => (
              <div
                key={job.id}
                className="flex flex-col justify-between rounded-3xl border border-border-gold/60 bg-white p-6 shadow-xs transition-all hover:border-gold hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-cream px-3 py-1 font-body text-[10px] font-bold uppercase tracking-wider text-maroon">
                      {job.department}
                    </span>
                    <span className="font-body text-xs font-semibold text-gold">
                      {job.type}
                    </span>
                  </div>

                  <h3 className="mt-4 font-heading text-lg font-bold text-maroon">{job.title}</h3>

                  <div className="mt-2 flex items-center gap-1.5 text-xs text-muted">
                    <MapPin size={14} className="text-gold" />
                    <span>{job.location}</span>
                  </div>

                  <p className="mt-3 text-xs text-muted leading-relaxed">{job.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-border-gold/30">
                  <a
                    href={`https://wa.me/919885820352?text=Hello%20Kura%20Gold%20Team,%20I%20am%20interested%20in%20applying%20for%20the%20role%20of%20${encodeURIComponent(
                      job.title
                    )}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-maroon py-2.5 font-body text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-maroon-dark shadow-xs"
                  >
                    <span>Apply Now</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* General Application Banner */}
        <div className="rounded-3xl border border-border-gold/60 bg-white p-8 sm:p-10 shadow-sm text-center">
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-maroon">Don't See a Matching Role?</h3>
          <p className="mt-2 text-xs sm:text-sm text-muted max-w-xl mx-auto leading-relaxed">
            We are always looking for passionate talent! Send your resume to our HR team and we will reach out when a suitable position opens up.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:careers@kuragoldspices.com"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-maroon px-6 py-3 font-body text-xs font-bold uppercase tracking-wider text-white hover:bg-maroon-dark shadow-sm transition-transform hover:scale-105"
            >
              ✉ Email Resume to HR
            </a>
            <a
              href={buildGeneralInquiryMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-maroon px-6 py-3 font-body text-xs font-bold uppercase tracking-wider text-maroon hover:bg-cream shadow-2xs"
            >
              <MessageCircle size={16} />
              Contact Careers HR on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
