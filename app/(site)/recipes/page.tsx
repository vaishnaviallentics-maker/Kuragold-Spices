import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, ChefHat, Sparkles, Utensils, MessageCircle } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { buildGeneralInquiryMessage } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'Cooking Recipes',
  description: 'Discover authentic Indian recipes, cooking secrets, and step-by-step dish preparation guides powered by Kura Gold Spices.',
}

const UPCOMING_RECIPES = [
  {
    id: 1,
    title: 'Authentic Hyderabadi Dum Biryani',
    category: 'Biryani & Rice',
    prepTime: '45 mins',
    spiceUsed: 'Kura Gold Chicken Biryani Masala & Red Chilli',
    image: '/products/Kura_Gold_Chicken_Biryani_Masala.webp',
    tag: 'Coming Soon',
  },
  {
    id: 2,
    title: 'Rich South Indian Sambar & Rasam',
    category: 'Traditional Gravies',
    prepTime: '25 mins',
    spiceUsed: 'Kura Gold Haldi & Dhania Powder',
    image: '/products/dhania.webp',
    tag: 'Coming Soon',
  },
  {
    id: 3,
    title: 'Spiced Hyderabadi Mutton Curry',
    category: 'Rich Curries',
    prepTime: '50 mins',
    spiceUsed: 'Kura Gold Mutton Biryani Masala',
    image: '/products/Kura_Gold_Mutton_Biryani_Masala.webp',
    tag: 'Coming Soon',
  },
  {
    id: 4,
    title: 'Golden Immune-Boosting Milk (Haldi Doodh)',
    category: 'Wellness & Drinks',
    prepTime: '10 mins',
    spiceUsed: 'Kura Gold Pure Haldi Powder',
    image: '/products/haldi.webp',
    tag: 'Coming Soon',
  },
]

export default function RecipesPage() {
  return (
    <main className="bg-ivory px-6 py-12 sm:px-10 lg:py-16">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <SectionLabel className="justify-center">OUR COOKING RECIPES</SectionLabel>
          <h1 className="font-heading text-3xl sm:text-5xl font-bold text-maroon">
            Where Every Spice Tells a Story
          </h1>
          <p className="font-body text-sm sm:text-base text-muted leading-relaxed">
            From the aroma of freshly ground spices to the warmth of a family meal, discover recipes that celebrate the flavours and traditions of Indian cooking powered by 100% pure Kura Gold Spices.
          </p>

          {/* Glowing Coming Soon Badge */}
          <div className="pt-2">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-gold/40 bg-gold/15 px-6 py-2 backdrop-blur-md shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold"></span>
              </span>
              <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-maroon">
                FULL RECIPE HUB LAUNCHING SOON
              </span>
            </div>
          </div>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {UPCOMING_RECIPES.map((recipe) => (
            <div
              key={recipe.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border-gold/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-lg"
            >
              <div className="relative h-52 w-full bg-cream">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 rounded-full bg-maroon px-3 py-1 font-body text-[10px] font-bold uppercase tracking-wider text-ivory shadow-sm">
                  {recipe.category}
                </span>
                <span className="absolute top-3 right-3 rounded-full bg-gold/20 backdrop-blur-xs border border-gold/40 px-2.5 py-0.5 font-body text-[10px] font-bold text-maroon-dark">
                  {recipe.tag}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <h3 className="font-heading text-lg font-bold text-maroon group-hover:text-gold transition-colors">
                    {recipe.title}
                  </h3>
                  <div className="mt-3 flex items-center gap-4 text-xs text-muted">
                    <span className="flex items-center gap-1">
                      <Clock size={14} className="text-gold" />
                      {recipe.prepTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <ChefHat size={14} className="text-gold" />
                      Easy
                    </span>
                  </div>
                  <p className="mt-3 text-xs font-medium text-ink/80 border-t border-border-gold/30 pt-3">
                    <strong className="text-maroon font-semibold">Key Spice:</strong> {recipe.spiceUsed}
                  </p>
                </div>

                <div className="mt-5">
                  <a
                    href={buildGeneralInquiryMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-maroon/50 bg-cream/50 py-2.5 font-body text-xs font-bold uppercase tracking-wider text-maroon transition-all hover:bg-maroon hover:text-ivory shadow-2xs"
                  >
                    <Utensils size={14} />
                    Notify Recipe Drop
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recipe Suggestion Banner */}
        <div className="rounded-3xl border border-gold/40 bg-gradient-to-r from-maroon-dark via-maroon to-maroon-dark p-8 sm:p-12 text-center text-ivory shadow-xl">
          <Sparkles className="mx-auto h-8 w-8 text-gold-light mb-3" />
          <h2 className="font-heading text-2xl sm:text-3xl font-bold">Have a Favorite Recipe Recipe to Share?</h2>
          <p className="mt-2 text-xs sm:text-sm text-gold-muted max-w-xl mx-auto leading-relaxed">
            We love featuring family recipes made with Kura Gold Spices! Share your recipe with our culinary team and get featured on our brand store.
          </p>
          <div className="mt-6">
            <a
              href={buildGeneralInquiryMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-3 font-body text-xs font-bold uppercase tracking-widest text-maroon-dark hover:bg-gold-light shadow-md transition-transform hover:scale-105"
            >
              <MessageCircle size={16} />
              Submit Recipe via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
