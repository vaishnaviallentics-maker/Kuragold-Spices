export function RecipesComingSoon() {
  return (
    <section className="bg-[linear-gradient(135deg,#5C0E0E_0%,#3D0A0A_100%)] px-6 py-14 text-center text-ivory sm:px-10 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="font-body text-xs font-bold uppercase tracking-widest text-gold-light">
          Our Cooking Recipes
        </p>
        <h2 className="mt-2 font-heading text-3xl font-bold text-ivory sm:text-4xl">
          Where Every Spice Tells a Story
        </h2>
        <p className="mt-4 text-sm text-gold-muted leading-relaxed max-w-2xl mx-auto">
          From the aroma of freshly ground spices to the warmth of a family meal, discover recipes that celebrate the flavours and traditions of Indian cooking.
        </p>

        {/* Modern Coming Soon Container (No Stars) */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-gold/40 bg-gold/15 px-6 py-2 backdrop-blur-md shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold"></span>
            </span>
            <span className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-gold-light">
              COMING SOON
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-white/80 font-medium">
            <span className="rounded-full bg-black/30 border border-gold/20 px-3.5 py-1.5 backdrop-blur-xs">
              Hyderabadi Biryani
            </span>
            <span className="rounded-full bg-black/30 border border-gold/20 px-3.5 py-1.5 backdrop-blur-xs">
              Rich Curries
            </span>
            <span className="rounded-full bg-black/30 border border-gold/20 px-3.5 py-1.5 backdrop-blur-xs">
              Traditional Gravies
            </span>
            <span className="rounded-full bg-black/30 border border-gold/20 px-3.5 py-1.5 backdrop-blur-xs">
              Authentic Masalas
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
