'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, ChefHat, Sparkles, Utensils, MessageCircle, Search, Flame, X, ArrowRight, CheckCircle2, BookmarkPlus } from 'lucide-react'
import { ACTIVE_RECIPES, FUTURE_RECIPES, type Recipe } from '@/lib/recipesData'
import { buildGeneralMessage, buildSingleProductOrderMessage } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'

export default function RecipesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [activeModalRecipe, setActiveModalRecipe] = useState<Recipe | null>(null)

  const categories = ['All', 'Biryani & Rice', 'Royal Curries', 'Quick Sabzi & Snacks']

  const filteredRecipes = useMemo(() => {
    return ACTIVE_RECIPES.filter((r) => {
      const matchCat = selectedCategory === 'All' || r.category === selectedCategory
      const q = searchQuery.toLowerCase().trim()
      const matchQuery =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.spicesUsed.some((s) => s.name.toLowerCase().includes(q))
      return matchCat && matchQuery
    })
  }, [selectedCategory, searchQuery])

  return (
    <main className="bg-ivory px-4 py-10 sm:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 py-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 font-heading text-xs font-bold uppercase tracking-widest text-maroon shadow-2xs">
            <Sparkles size={14} className="text-gold" />
            KURA GOLD CULINARY KITCHEN
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-bold leading-tight text-maroon">
            Authentic Indian Recipes <br />
            <span className="italic font-accent text-gold-dark">Infused with Pure Spices</span>
          </h1>
          <p className="font-body text-xs sm:text-sm text-muted leading-relaxed max-w-2xl mx-auto">
            Transform your daily meals into royal feasts with our chef-crafted recipe collection. 
            Each dish is specially proportioned to bring out the deepest aroma of 100% pure Kura Gold Spices.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="rounded-3xl border border-gold/30 bg-white p-6 shadow-sm space-y-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recipes by dish or spice..."
                className="w-full rounded-2xl border border-border-gold/80 bg-cream/30 py-2.5 pl-10 pr-4 font-body text-xs text-ink outline-none focus:border-maroon focus:bg-white transition-colors"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    'rounded-full px-4 py-2 font-body text-xs font-bold transition-all duration-200 border',
                    selectedCategory === cat
                      ? 'bg-maroon text-white border-maroon shadow-xs'
                      : 'bg-white text-ink border-border-gold/80 hover:border-gold hover:bg-cream/40'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Recipes Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-bold text-maroon flex items-center gap-2">
              <ChefHat className="text-gold" size={22} />
              Chef-Crafted Recipes ({filteredRecipes.length})
            </h2>
          </div>

          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
              {filteredRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="group flex flex-col sm:flex-row overflow-hidden rounded-3xl border border-border-gold/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-xl"
                >
                  {/* Image Column */}
                  <div className="relative h-60 w-full sm:w-2/5 shrink-0 bg-cream">
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      fill
                      sizes="(min-width: 640px) 40vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-maroon px-3 py-1 font-body text-[10px] font-bold uppercase tracking-wider text-ivory shadow-xs">
                      {recipe.category}
                    </span>
                  </div>

                  {/* Info Column */}
                  <div className="flex flex-1 flex-col justify-between p-6 space-y-4">
                    <div>
                      <h3 className="font-heading text-lg font-bold text-maroon group-hover:text-gold transition-colors leading-snug">
                        {recipe.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-ink/75 line-clamp-2">
                        {recipe.description}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted">
                        <span className="flex items-center gap-1 font-medium">
                          <Clock size={13} className="text-gold" />
                          {recipe.prepTime}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-medium">
                          <ChefHat size={13} className="text-gold" />
                          {recipe.difficulty}
                        </span>
                        <span>•</span>
                        <span className="font-medium text-maroon-dark">
                          {recipe.spiceLevel}
                        </span>
                      </div>

                      <div className="mt-4 border-t border-border-gold/30 pt-3">
                        <p className="text-xs text-muted">
                          <strong className="text-maroon font-bold">Key Spices:</strong>{' '}
                          {recipe.spicesUsed.map((s) => s.name).join(', ')}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 flex gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveModalRecipe(recipe)}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-maroon px-4 py-2.5 font-body text-xs font-bold uppercase tracking-wider text-white hover:bg-maroon-dark transition-all shadow-xs"
                      >
                        <Utensils size={14} />
                        View Full Recipe
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-gold/30 bg-white p-12 text-center shadow-xs">
              <p className="font-heading text-xl font-bold text-maroon">No Recipes Found</p>
              <p className="mt-2 text-xs text-muted">Try clearing your search query or choosing another category.</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All')
                  setSearchQuery('')
                }}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-maroon px-6 py-2.5 font-body text-xs font-bold uppercase tracking-wider text-white hover:bg-maroon-dark"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* 🌟 Dedicated Section: "Our Cooking Recipes For Future" */}
        <div className="rounded-3xl border border-gold/40 bg-gradient-to-b from-white via-cream/30 to-white p-8 sm:p-12 shadow-md space-y-8">
          <div className="border-b border-border-gold/40 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-maroon/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-maroon mb-2">
                <BookmarkPlus size={14} className="text-gold" />
                UPCOMING CULINARY VAULT
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-maroon">
                Our Cooking Recipes For Future
              </h2>
              <p className="mt-1 font-body text-xs sm:text-sm text-muted">
                Sneak peek into upcoming masterclass recipes designed alongside our upcoming spice blends & whole peppercorns.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {FUTURE_RECIPES.map((fut) => (
              <div
                key={fut.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-border-gold/60 bg-white p-5 shadow-xs transition-all hover:border-gold hover:shadow-md space-y-4"
              >
                <div className="relative h-44 w-full rounded-xl bg-cream overflow-hidden">
                  <Image
                    src={fut.image}
                    alt={fut.title}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <span className="absolute top-2.5 left-2.5 rounded-full bg-gold-dark px-3 py-0.5 font-body text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
                    Coming Soon
                  </span>
                </div>

                <div className="space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading text-base font-bold text-maroon leading-tight">{fut.title}</h3>
                    <p className="mt-1 text-xs text-muted leading-relaxed line-clamp-2">{fut.description}</p>
                  </div>

                  <div className="pt-3 border-t border-border-gold/30 space-y-3">
                    <p className="text-[11px] font-semibold text-gold-dark">
                      ✦ Paired Product: <span className="text-maroon font-bold">{fut.futureProduct}</span>
                    </p>
                    <a
                      href={buildGeneralMessage(`Hello! Please notify me when the "${fut.title}" recipe masterclass drops!`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-maroon/40 bg-cream/50 py-2 font-body text-xs font-bold uppercase tracking-wider text-maroon hover:bg-maroon hover:text-white transition-colors"
                    >
                      <MessageCircle size={14} />
                      Get Recipe Alert
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recipe Submission Banner */}
        <div className="rounded-3xl border border-gold/40 bg-gradient-to-r from-maroon-dark via-maroon to-maroon-dark p-8 sm:p-12 text-center text-ivory shadow-xl">
          <Sparkles className="mx-auto h-8 w-8 text-gold-light mb-3" />
          <h2 className="font-heading text-2xl sm:text-3xl font-bold">Have a Favorite Family Recipe?</h2>
          <p className="mt-2 text-xs sm:text-sm text-gold-muted max-w-xl mx-auto leading-relaxed">
            We love featuring authentic home recipes made with Kura Gold Spices! Share your recipe with our culinary team and get featured on our brand store.
          </p>
          <div className="mt-6">
            <a
              href={buildGeneralMessage('Hello Kura Gold Team, I would like to submit my family recipe!')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-3 font-body text-xs font-bold uppercase tracking-widest text-maroon-dark hover:bg-gold-light shadow-md transition-transform hover:scale-105"
            >
              <MessageCircle size={16} />
              Submit Recipe via WhatsApp
            </a>
          </div>
        </div>
           {/* Interactive Full Recipe Modal Drawer */}
      {activeModalRecipe && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto"
          onClick={() => setActiveModalRecipe(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl border border-gold/40 bg-white p-6 sm:p-10 shadow-2xl space-y-6 font-body text-ink my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky Modal Top Header Bar with Close Button */}
            <div className="sticky -top-6 sm:-top-10 z-20 -mx-6 sm:-mx-10 -mt-6 sm:-mt-10 mb-4 bg-white/95 backdrop-blur-md border-b border-border-gold/30 px-6 sm:px-10 py-3.5 flex items-center justify-between">
              <span className="font-heading text-xs font-bold uppercase tracking-widest text-maroon flex items-center gap-2">
                <ChefHat size={16} className="text-gold" />
                Recipe Masterclass
              </span>
              <button
                type="button"
                onClick={() => setActiveModalRecipe(null)}
                className="inline-flex items-center gap-1.5 rounded-full bg-maroon/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-maroon hover:bg-maroon hover:text-white transition-colors shadow-2xs"
              >
                <X size={16} />
                <span>Close</span>
              </button>
            </div>

            {/* Modal Content Header */}
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="relative h-44 w-44 shrink-0 rounded-2xl bg-cream overflow-hidden mx-auto sm:mx-0 border border-border-gold/40">
                <Image
                  src={activeModalRecipe.image}
                  alt={activeModalRecipe.title}
                  fill
                  className="object-contain p-3"
                />
              </div>

              <div className="space-y-2">
                <span className="inline-block rounded-full bg-maroon/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-maroon">
                  {activeModalRecipe.category}
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-maroon">
                  {activeModalRecipe.title}
                </h2>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  {activeModalRecipe.description}
                </p>

                <div className="flex flex-wrap gap-4 text-xs font-semibold text-maroon pt-2">
                  <span>⏱️ Prep: {activeModalRecipe.prepTime}</span>
                  <span>🍳 Cook: {activeModalRecipe.cookTime}</span>
                  <span>👥 Serves: {activeModalRecipe.servings}</span>
                  <span>🌶️ Heat: {activeModalRecipe.spiceLevel}</span>
                </div>
              </div>
            </div>

            {/* Ingredients Section */}
            <div className="space-y-3 border-t border-border-gold/40 pt-5">
              <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-maroon flex items-center gap-2">
                <CheckCircle2 size={16} className="text-gold" />
                Ingredients List
              </h3>
              <ul className="grid gap-2 sm:grid-cols-2 text-xs sm:text-sm text-ink/90">
                {activeModalRecipe.ingredients.map((ing, idx) => (
                  <li key={idx} className="flex items-center gap-2 bg-cream/40 p-2.5 rounded-xl border border-border-gold/30">
                    <span className="h-2 w-2 rounded-full bg-gold shrink-0" />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Step by Step Instructions */}
            <div className="space-y-3 border-t border-border-gold/40 pt-5">
              <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-maroon flex items-center gap-2">
                <Flame size={16} className="text-gold" />
                Step-by-Step Culinary Preparation
              </h3>
              <ol className="space-y-3 text-xs sm:text-sm text-ink/90">
                {activeModalRecipe.instructions.map((step, idx) => (
                  <li key={idx} className="flex gap-3 bg-ivory p-3.5 rounded-xl border border-border-gold/30 leading-relaxed">
                    <span className="font-heading font-bold text-maroon text-sm shrink-0">{idx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Chef Tip */}
            <div className="rounded-2xl bg-amber-50 p-4 border border-amber-200 text-xs space-y-1">
              <p className="font-bold text-amber-900 uppercase tracking-wider">👩‍🍳 Chef Secrets Tip:</p>
              <p className="text-amber-800 leading-relaxed">{activeModalRecipe.chefTip}</p>
            </div>

            {/* Order Required Spices CTA */}
            <div className="pt-4 border-t border-border-gold/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-body text-xs font-bold text-maroon">Need spices for this recipe?</p>
                <p className="text-[11px] text-muted">Order 100% pure Kura Gold Spices directly on WhatsApp.</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveModalRecipe(null)}
                  className="rounded-full border border-border-gold bg-cream/40 px-5 py-2.5 font-body text-xs font-bold uppercase tracking-wider text-muted hover:bg-cream hover:text-ink transition-colors"
                >
                  Close Recipe
                </button>

                <a
                  href={buildGeneralMessage(`Hello! I want to order Kura Gold Spices for preparing "${activeModalRecipe.title}".`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-maroon px-8 py-2.5 font-body text-xs font-bold uppercase tracking-wider text-white hover:bg-maroon-dark shadow-md transition-all duration-200"
                >
                  ORDER NOW
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </main>
  )
}
