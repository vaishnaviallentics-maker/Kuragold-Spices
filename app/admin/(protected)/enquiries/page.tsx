import { markEnquiryRead } from '@/app/admin/actions'
import { createClient } from '@/lib/supabase/server'

function waLink(phone: string) {
  return `https://wa.me/${phone.replace(/\D/g, '')}`
}

export default async function AdminEnquiriesPage() {
  const supabase = createClient()
  const { data: enquiries } = await supabase
    .from('enquiries')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-heading text-2xl font-bold text-maroon sm:text-3xl">Enquiries</h1>

      {enquiries && enquiries.length > 0 ? (
        <div className="flex flex-col gap-3">
          {enquiries.map((enquiry) => (
            <details
              key={enquiry.id}
              className="rounded-xl border border-border-gold/60 bg-white p-4 open:shadow-sm"
            >
              <summary className="flex cursor-pointer flex-wrap items-center gap-3 [&::-webkit-details-marker]:hidden">
                <span
                  className={`h-2.5 w-2.5 shrink-0 rounded-full ${enquiry.is_read ? 'bg-border-gold' : 'bg-maroon'}`}
                  aria-hidden="true"
                />
                <span className="font-bold text-ink">{enquiry.name}</span>
                <span className="text-xs text-muted">{enquiry.email}</span>
                <span className="rounded-full bg-cream px-2.5 py-0.5 text-xs font-bold text-ink">
                  {enquiry.enquiry_type}
                </span>
                <span className="ml-auto text-xs text-muted">
                  {new Date(enquiry.created_at).toLocaleString('en-IN')}
                </span>
              </summary>

              <div className="mt-4 flex flex-col gap-3 border-t border-border-gold/40 pt-4">
                <p className="text-sm leading-relaxed text-ink">{enquiry.message}</p>
                {enquiry.phone && <p className="text-xs text-muted">Phone: {enquiry.phone}</p>}

                <div className="flex flex-wrap gap-3 pt-2">
                  <form action={markEnquiryRead.bind(null, enquiry.id, !enquiry.is_read)}>
                    <button
                      type="submit"
                      className="rounded-full border border-border-gold px-4 py-2 text-xs font-bold uppercase tracking-wide text-maroon transition-colors hover:bg-cream"
                    >
                      Mark as {enquiry.is_read ? 'Unread' : 'Read'}
                    </button>
                  </form>

                  {enquiry.phone && (
                    <a
                      href={waLink(enquiry.phone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-whatsapp px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-whatsapp-dark"
                    >
                      Reply on WhatsApp
                    </a>
                  )}

                  {enquiry.email && (
                    <a
                      href={`mailto:${enquiry.email}`}
                      className="rounded-full bg-gold px-4 py-2 text-xs font-bold uppercase tracking-wide text-maroon-dark transition-colors hover:bg-gold-light"
                    >
                      Reply by Email
                    </a>
                  )}
                </div>
              </div>
            </details>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted">No enquiries yet.</p>
      )}
    </div>
  )
}
