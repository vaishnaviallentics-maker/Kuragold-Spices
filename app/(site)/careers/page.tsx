import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Briefcase, Heart, ShieldCheck, Sparkles, Mail, MessageCircle, Users, Award, FileText, ChevronRight } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { CONTACT_EMAIL_GEN, CONTACT_WA, LOCATION, SITE_NAME } from '@/lib/constants'
import { buildGeneralMessage } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'Careers & Opportunities',
  description:
    'Learn about careers and work culture at Kura Gold Spices. Discover our values, growth opportunities, and submit your resume for future openings.',
}

export default function CareersPage() {
  const whatsappHrMessage = buildGeneralMessage(
    'Hello Kura Gold HR Team, I am interested in future career opportunities at Kura Gold Spices. I would like to submit my profile/resume.'
  )

  return (
    <main className="bg-ivory px-6 py-8 sm:px-10 lg:py-12">
      <div className="mx-auto max-w-5xl space-y-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 font-body text-xs text-muted">
          <Link href="/" className="hover:text-maroon transition-colors">
            Home
          </Link>
          <ChevronRight size={14} className="text-border-gold" />
          <span className="font-bold text-maroon">Careers</span>
        </nav>

        {/* Hero Section Typography */}
        <div className="text-center max-w-3xl mx-auto space-y-3 py-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 font-heading text-xs font-bold uppercase tracking-widest text-maroon shadow-2xs">
            <Sparkles size={14} className="text-gold" />
            CAREERS AT KURA GOLD
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-bold leading-tight text-maroon">
            Build Your Career <br />
            <span className="italic font-accent text-gold-dark">Where Passion Meets Purity</span>
          </h1>
          <p className="font-body text-xs sm:text-sm text-muted leading-relaxed max-w-2xl mx-auto">
            At {SITE_NAME}, we are on a mission to deliver 100% pure, unadulterated spices to every home across India. 
            Explore our work culture, brand values, and submit your profile for future opportunities.
          </p>
        </div>

        {/* Hero Banner Image */}
        <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-cream shadow-md">
          <div className="relative h-60 sm:h-80 md:h-96 w-full">
            <Image
              src="/careers/careers_hero_banner.png"
              alt="Kura Gold Spices Culinary Workspace"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>

        {/* Culture & Values Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-3xl border border-gold/30 bg-white p-7 shadow-xs space-y-3">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15 text-maroon">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-heading text-lg font-bold text-maroon">Uncompromising Purity</h3>
            <p className="text-xs text-muted leading-relaxed">
              Every process at Kura Gold is driven by a commitment to zero adulteration and authentic spice heritage.
            </p>
          </div>

          <div className="rounded-3xl border border-gold/30 bg-white p-7 shadow-xs space-y-3">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15 text-maroon">
              <Users size={24} />
            </div>
            <h3 className="font-heading text-lg font-bold text-maroon">Collaborative Environment</h3>
            <p className="text-xs text-muted leading-relaxed">
              We foster an energetic, supportive workplace where initiative is celebrated and ideas are heard.
            </p>
          </div>

          <div className="rounded-3xl border border-gold/30 bg-white p-7 shadow-xs space-y-3">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15 text-maroon">
              <Award size={24} />
            </div>
            <h3 className="font-heading text-lg font-bold text-maroon">Growth & Innovation</h3>
            <p className="text-xs text-muted leading-relaxed">
              As our distribution expands, team members gain opportunities across supply chain, sales, and food tech.
            </p>
          </div>
        </div>

        {/* Current Job Openings Section (No Openings Currently) */}
        <div className="rounded-3xl border border-gold/40 bg-white p-8 sm:p-12 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border-gold/40 pb-6">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-900 border border-amber-200 mb-2">
                <Briefcase size={14} className="text-gold-dark" />
                Current Hiring Status
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-maroon">
                Current Job Openings
              </h2>
            </div>
            <span className="inline-block rounded-full bg-cream/80 px-4 py-1.5 font-body text-xs font-bold text-maroon border border-border-gold/60 self-start sm:self-auto">
              0 Active Openings
            </span>
          </div>

          {/* No Openings Notice Banner */}
          <div className="rounded-2xl border border-border-gold/60 bg-cream/30 p-8 text-center space-y-4 max-w-2xl mx-auto">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cream text-gold-dark border border-gold/30">
              <FileText size={28} />
            </div>
            <div className="space-y-2">
              <h3 className="font-heading text-xl font-bold text-maroon">
                No Active Job Openings Currently
              </h3>
              <p className="font-body text-xs sm:text-sm text-muted leading-relaxed">
                Thank you for your interest in joining {SITE_NAME}! We do not have any open positions at the moment. 
                However, our team is continuously growing across sales, quality assurance, logistics, and digital marketing.
              </p>
            </div>
          </div>
        </div>

        {/* Future Talent Pool / Send Resume Section */}
        <div className="rounded-3xl border border-gold/40 bg-gradient-to-r from-maroon-dark via-maroon to-maroon-dark p-8 sm:p-12 text-center text-ivory shadow-xl space-y-6">
          <Sparkles className="mx-auto h-8 w-8 text-gold-light" />
          <div className="space-y-2 max-w-xl mx-auto">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold">
              Submit Your Resume for Future Roles
            </h2>
            <p className="text-xs sm:text-sm text-gold-muted leading-relaxed">
              Would you like to be considered for future openings? Send your resume and cover letter to our recruitment team, and we will reach out as soon as a matching position opens.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={`mailto:${CONTACT_EMAIL_GEN}?subject=Future%20Career%20Inquiry%20-%20Kura%20Gold%20Spices`}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-gold px-7 py-3 font-body text-xs font-bold uppercase tracking-widest text-maroon-dark hover:bg-gold-light shadow-md transition-transform"
            >
              <Mail size={16} />
              Email Resume
            </a>

            <a
              href={whatsappHrMessage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-gold-light/40 bg-white/10 px-7 py-3 font-body text-xs font-bold uppercase tracking-widest text-ivory hover:bg-white/20 shadow-md backdrop-blur-xs transition-transform"
            >
              <MessageCircle size={16} />
              HR Inquiry via WhatsApp
            </a>
          </div>

          <p className="text-[11px] text-gold-muted">
            📍 Office Location: {LOCATION}
          </p>
        </div>
      </div>
    </main>
  )
}
