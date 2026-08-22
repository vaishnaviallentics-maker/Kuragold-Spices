import { CheckCircle2, MessageCircle, PackageCheck, Sparkles } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'

const STEPS = [
  {
    icon: CheckCircle2,
    title: 'Handpicked',
    body: 'Whole spices selected with care before grinding.',
  },
  {
    icon: Sparkles,
    title: 'Freshly Ground',
    body: 'Ground and blended in small batches, not left sitting on a shelf.',
  },
  {
    icon: PackageCheck,
    title: 'Securely Packed',
    body: 'Sealed to keep every batch fresh from our kitchen to yours.',
  },
  {
    icon: MessageCircle,
    title: 'Confirmed on WhatsApp',
    body: 'Every order is verified and confirmed personally before it ships.',
  },
]

export function OurProcess() {
  return (
    <section className="bg-cream px-6 py-8 sm:px-10 lg:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col items-center text-center">
          <SectionLabel className="justify-center">Our Process</SectionLabel>
          <h2 className="font-heading text-2xl font-bold text-maroon sm:text-3xl lg:text-4xl">
            From Kitchen to Doorstep
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <div key={step.title} className="relative text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-maroon-dark text-gold">
                <step.icon size={24} aria-hidden="true" />
              </div>
              <p className="mb-1 font-body text-xs font-bold uppercase tracking-wide text-gold">
                Step {i + 1}
              </p>
              <h3 className="mb-2 font-heading text-lg font-bold text-maroon">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
