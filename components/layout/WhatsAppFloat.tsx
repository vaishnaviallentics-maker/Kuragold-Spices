import { buildGeneralInquiryMessage } from '@/lib/whatsapp'

const ORDER_URL = buildGeneralInquiryMessage()

export function WhatsAppFloat() {
  return (
    <a
      href={ORDER_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order on WhatsApp"
      className="group fixed bottom-7 right-7 z-float flex h-[58px] w-[58px] items-center justify-center rounded-full bg-whatsapp shadow-[0_4px_20px_rgba(37,211,102,0.5)] transition-transform duration-200"
    >
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-maroon-dark px-3 py-1.5 font-body text-xs font-bold text-gold opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        Order on WhatsApp
      </span>
      <svg viewBox="0 0 32 32" width={28} height={28} fill="white" aria-hidden="true">
        <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.362.68 4.564 1.857 6.42L4 29l7.77-1.815A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.818c-1.99 0-3.86-.55-5.455-1.51l-.39-.232-4.61 1.077 1.113-4.482-.256-.407A9.77 9.77 0 0 1 5.182 15c0-5.966 4.856-10.818 10.822-10.818S26.818 9.034 26.818 15 21.97 24.818 16.004 24.818Zm5.966-8.135c-.327-.164-1.932-.953-2.232-1.062-.3-.109-.518-.164-.736.164-.218.327-.845 1.062-1.036 1.28-.19.218-.382.245-.709.082-.327-.164-1.38-.508-2.63-1.62-.972-.867-1.63-1.938-1.82-2.265-.19-.327-.02-.504.144-.667.148-.147.327-.382.49-.573.164-.19.218-.327.327-.545.109-.218.055-.409-.027-.573-.082-.164-.736-1.774-1.009-2.43-.266-.638-.536-.552-.736-.562-.19-.008-.409-.01-.627-.01-.218 0-.573.082-.873.409-.3.327-1.145 1.12-1.145 2.73 0 1.61 1.173 3.166 1.336 3.384.164.218 2.31 3.527 5.598 4.945.782.338 1.393.54 1.869.69.785.25 1.5.215 2.065.13.63-.094 1.932-.79 2.205-1.552.273-.763.273-1.416.191-1.552-.082-.136-.3-.218-.627-.382Z" />
      </svg>
    </a>
  )
}
