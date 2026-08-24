import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat'
import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContext'
import { WishlistProvider } from '@/context/WishlistContext'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <AnnouncementBar />
          <Navbar />
          {children}
          <Footer />
          <WhatsAppFloat />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  )
}
