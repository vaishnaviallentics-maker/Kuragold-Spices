# 🌶️ Kura Gold Spices — Extension Implementation Plan
### Phase-wise Development Guide · August 2026
### Based on: `Kuragold-Spices-main.zip` + Live site `kuragold-spices.vercel.app`

---

```
Brand         :  Kura Gold Spices
Company       :  JK Enterprises · Hyderabad, Telangana
WhatsApp      :  +91 89787 26655
Prepared by   :  Vaishnavi · Allentics IT Solutions
Reviewed by   :  Airaj Sir
```

---

## 📌 Ground Rules for This Plan

```
✅  Built against the ACTUAL zip file — every file name is real
✅  No splash screen — removed per explicit instruction
✅  No announcement bar was in original — being added now
✅  Garam Masala → Coming Soon (confirmed by Sir)
✅  Free shipping threshold: ₹599 (confirm before Step 2)
✅  No fake discounts, no unconfirmed marketing claims
✅  Reuse existing components — do not duplicate ProductCard, SizeSelector etc.
✅  Admin panel extended, not replaced
❌  No customer auth yet (future phase)
❌  No payment gateway yet (future phase)
❌  No Career page content (no content confirmed)
❌  No blog content (structure only — Coming Soon)
```

---

## 📋 What Currently EXISTS in the Codebase

> Do NOT re-build any of these. Extend or modify only.

| Component / File | Location | What it does |
|---|---|---|
| `Navbar.tsx` | `components/layout/` | 5 flat links + WA button + CartIcon |
| `Footer.tsx` | `components/layout/` | 4-column footer |
| `WhatsAppFloat.tsx` | `components/layout/` | Fixed green WA bubble |
| `CartContext.tsx` | `context/` | Cart state in localStorage |
| `Hero.tsx` | `components/home/` | Full-width maroon hero |
| `TrustBar.tsx` | `components/home/` | FSSAI / Telangana / Make in India |
| `AboutPreview.tsx` | `components/home/` | Story + stats — **remove from home** |
| `ProductsPreview.tsx` | `components/home/` | 4-col product grid — **replace with BestSellers** |
| `WaysToUse.tsx` | `components/home/` | Usage notes — **remove from home** |
| `OurProcess.tsx` | `components/home/` | 4-step process — **remove from home** |
| `QualityPreview.tsx` | `components/home/` | Why Kura Gold cards — **keep** |
| `FAQ.tsx` | `components/home/` | Accordion FAQ — **keep** |
| `ProductCard.tsx` | `components/products/` | Card with size/price/cart/WA |
| `SizeSelector.tsx` | `components/products/` | Size button group |
| `PriceDisplay.tsx` | `components/products/` | Price for selected size |
| `AddToCartButton.tsx` | `components/products/` | Add to cart action |
| `QuantityStepper.tsx` | `components/products/` | +/- quantity control |
| `ProductPurchasePanel.tsx` | `components/products/` | Full purchase UI on detail page |
| `useProducts.ts` | `hooks/` | Supabase product fetch |
| `useClaims.ts` | `hooks/` | Supabase confirmed claims fetch |
| `actions.ts` | `app/admin/` | All server actions |
| `AdminShell.tsx` | `components/admin/` | Admin sidebar + layout |
| `Button.tsx`, `SectionLabel.tsx`, `GoldRule.tsx` | `components/ui/` | UI primitives |
| `constants.ts` | `lib/` | WA number, shipping, site info |
| `whatsapp.ts` | `lib/` | 4 WA message builders |
| `types/index.ts` | `types/` | TypeScript interfaces |
| Admin pages | `app/admin/(protected)/` | Dashboard, products, claims, enquiries, orders |
| Public pages | `app/(site)/` | Home, About, Products, Quality, Contact, Cart |

---

## 🗄️ STEP 0 — Database Work (Already Partially Done)
### ⏱️ Time: 1 hour | Where: Supabase SQL Editor only

> **Status:** Garam Masala → Coming Soon confirmed. Run SQL below.
> Steps 0A–0D must be completed BEFORE any code changes.

---

### 0A — Extend `products` table with 4 new columns

```sql
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS status         TEXT    DEFAULT 'active',
  ADD COLUMN IF NOT EXISTS is_best_seller BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS is_featured    BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS sort_order     INTEGER DEFAULT 0;

-- status values used throughout:
--   'active'      → live product, has Add to Cart
--   'coming_soon' → visible, shows Coming Soon badge, no cart button
--   'future'      → hidden from public, admin-only
```

---

### 0B — Update existing product statuses and categories

```sql
-- Active products (confirmed by Sir)
UPDATE products
  SET status = 'active', category = 'pure_grounded', is_best_seller = true
  WHERE slug = 'red-chilli-powder';

UPDATE products
  SET status = 'active', category = 'pure_grounded', is_best_seller = true
  WHERE slug = 'haldi-powder';

UPDATE products
  SET status = 'active', category = 'pure_grounded', is_best_seller = true
  WHERE slug = 'coriander-powder';

UPDATE products
  SET status = 'active', category = 'combo'
  WHERE slug = 'combo-pack';

-- Garam Masala → Coming Soon (Sir confirmed)
UPDATE products
  SET status = 'coming_soon', is_active = false, category = 'blended'
  WHERE slug = 'garam-masala';
```

---

### 0C — Insert future Coming Soon products

```sql
-- Blended Spices (Coming Soon)
INSERT INTO products (name, slug, tagline, category, status, is_active, sort_order)
VALUES
  ('Chicken Biryani Masala', 'chicken-biryani-masala', 'Aromatic Blend', 'blended', 'coming_soon', false, 10),
  ('Mutton Biryani Masala',  'mutton-biryani-masala',  'Rich & Bold',    'blended', 'coming_soon', false, 11);

-- Whole Spices (Coming Soon)
INSERT INTO products (name, slug, tagline, category, status, is_active, sort_order)
VALUES
  ('Coriander Seeds', 'coriander-seeds', 'Whole & Fragrant', 'whole', 'coming_soon', false, 20),
  ('Black Pepper',    'black-pepper',    'Pungent & Bold',   'whole', 'coming_soon', false, 21),
  ('Cumin',           'cumin',           'Earthy & Warm',    'whole', 'coming_soon', false, 22);
```

---

### 0D — Create blogs table

```sql
CREATE TABLE IF NOT EXISTS blogs (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  title        TEXT        NOT NULL,
  slug         TEXT        NOT NULL UNIQUE,
  excerpt      TEXT,
  content      TEXT,
  cover_image  TEXT,
  category     TEXT        DEFAULT 'general',
  is_published BOOLEAN     DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "pub_read_published_blogs"
  ON blogs FOR SELECT USING (is_published = true);

CREATE POLICY "admin_all_blogs"
  ON blogs FOR ALL USING (auth.role() = 'authenticated');
```

---

### 0E — Verify with these queries

```sql
-- All products with new columns
SELECT name, slug, category, status, is_active, is_best_seller, sort_order
FROM products
ORDER BY sort_order, created_at;

-- Expected results:
--  red-chilli-powder   | pure_grounded | active       | true  | true
--  haldi-powder        | pure_grounded | active       | true  | true
--  coriander-powder    | pure_grounded | active       | true  | true
--  combo-pack          | combo         | active       | true  | false
--  garam-masala        | blended       | coming_soon  | false | false
--  chicken-biryani-... | blended       | coming_soon  | false | false
--  mutton-biryani-...  | blended       | coming_soon  | false | false
--  coriander-seeds     | whole         | coming_soon  | false | false
--  black-pepper        | whole         | coming_soon  | false | false
--  cumin               | whole         | coming_soon  | false | false

-- Blogs table exists
SELECT table_name FROM information_schema.tables WHERE table_name = 'blogs';
```

### Step 0 Done Checklist
```
□  4 columns added to products table (status, is_best_seller, is_featured, sort_order)
□  3 active products updated (correct category + is_best_seller = true)
□  Garam Masala → status=coming_soon, is_active=false
□  Combo Pack → status=active, category=combo
□  5 future products inserted (Chicken Biryani, Mutton Biryani, Coriander Seeds, Black Pepper, Cumin)
□  blogs table created with RLS
□  Verification query shows correct data for all 10 products
```

---

## 🔷 PHASE 1 — TypeScript Types + Constants
### ⏱️ Time: 30 minutes | Files: `types/index.ts`, `lib/constants.ts`

> Must be done before any component work. All subsequent phases depend on these types.

---

### 1A — Update `types/index.ts`

**Current `Product` interface** — add 4 new fields:

```typescript
export interface Product {
  id: string
  name: string
  slug: string
  tagline: string
  description: string
  image_url: string
  category: string         // now: 'pure_grounded' | 'blended' | 'whole' | 'combo'
  is_active: boolean
  product_variants: ProductVariant[]
  // ── NEW FIELDS ──────────────────────────────────
  status: 'active' | 'coming_soon' | 'future'
  is_best_seller: boolean
  is_featured: boolean
  sort_order: number
}
```

**Add Blog interface** (new — end of file):

```typescript
export interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image: string
  category: string
  is_published: boolean
  published_at: string
  created_at: string
}
```

---

### 1B — Update `lib/constants.ts`

```typescript
// CHANGE (line 3):
// FROM: export const FREE_SHIP_ABOVE = Number(process.env.NEXT_PUBLIC_FREE_SHIPPING_ABOVE ?? 499)
// TO:
export const FREE_SHIP_ABOVE = Number(process.env.NEXT_PUBLIC_FREE_SHIPPING_ABOVE ?? 599)

// ADD at end of file:
export const FREE_SHIP_MESSAGE = `Free Shipping On Orders Above ₹${599}/- Across India`

export const CATEGORY_LABELS: Record<string, string> = {
  pure_grounded: 'Pure Grounded Spices',
  blended:       'Blended Spices',
  whole:         'Whole Spices',
  combo:         'Combo Packs',
}
```

Also update Vercel environment variable:
```
NEXT_PUBLIC_FREE_SHIPPING_ABOVE=599
```

---

### 1C — Update `hooks/useProducts.ts`

```typescript
// Current: only fetches is_active = true
// New: fetch active + coming_soon products
// (future products stay hidden — is_active=false and status='future')

export async function getProducts(): Promise<Product[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*, product_variants(*)')
    .neq('status', 'future')          // ← CHANGE: exclude 'future' only
    .order('sort_order')               // ← CHANGE: use sort_order column
    .order('created_at')              // ← KEEP as secondary sort

  if (error || !data) return []

  return data.map((product) => ({
    ...product,
    product_variants: [...product.product_variants].sort(
      (a, b) => a.sort_order - b.sort_order
    ),
  })) as Product[]
}

// ADD new helper:
export async function getBestSellers(): Promise<Product[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*, product_variants(*)')
    .eq('status', 'active')
    .eq('is_best_seller', true)
    .order('sort_order')

  if (error || !data) return []

  return data.map((product) => ({
    ...product,
    product_variants: [...product.product_variants].sort(
      (a, b) => a.sort_order - b.sort_order
    ),
  })) as Product[]
}

// ADD blog fetcher:
export async function getPublishedBlogs() {
  const supabase = createClient()
  const { data } = await supabase
    .from('blogs')
    .select('id, title, slug, excerpt, cover_image, category, published_at')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(3)

  return data ?? []
}
```

### Phase 1 Done Checklist
```
□  Product interface: status, is_best_seller, is_featured, sort_order added
□  Blog interface added to types/index.ts
□  FREE_SHIP_ABOVE changed from 499 to 599 in constants.ts
□  FREE_SHIP_MESSAGE constant added
□  CATEGORY_LABELS map added
□  Vercel env var NEXT_PUBLIC_FREE_SHIPPING_ABOVE=599 updated
□  getProducts() updated: excludes 'future', orders by sort_order
□  getBestSellers() added
□  getPublishedBlogs() added
□  npx tsc --noEmit passes with 0 errors
```

---

## 🔷 PHASE 2 — Announcement Bar + Shipping Update
### ⏱️ Time: 2 hours | Files: new `AnnouncementBar.tsx`, `app/(site)/layout.tsx`, `app/(site)/cart/page.tsx`

---

### 2A — Create `components/layout/AnnouncementBar.tsx`

New component. No existing file to modify.

```
Design:
  Background  : bg-maroon-dark (#5C0E0E)
  Text colour : gold-light (#E8B84B)
  Height      : 36px
  Animation   : continuous left-scroll (CSS @keyframes)
  Position    : above Navbar in layout

Content items (scrolling):
  🚚 FREE SHIPPING ON ORDERS ABOVE ₹599/- ACROSS INDIA
  ·
  Order on WhatsApp: +91 89787 26655
  ·
  JK Enterprises · Hyderabad, Telangana
  ·
  Open 24 Hours

Implementation:
  - Text duplicated inline for seamless infinite loop
  - overflow: hidden, white-space: nowrap on wrapper
  - CSS animation: translateX(0) → translateX(-50%) over 28s linear infinite
  - Font: font-body, text-xs, font-bold, tracking-widest, uppercase
```

---

### 2B — Add AnnouncementBar to `app/(site)/layout.tsx`

```tsx
// Current layout.tsx:
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat'
import { CartProvider } from '@/context/CartContext'

// ADD:
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <AnnouncementBar />    {/* ADD — first thing inside CartProvider */}
      <Navbar />
      {children}
      <Footer />
      <WhatsAppFloat />
    </CartProvider>
  )
}
```

---

### 2C — Update shipping in `app/(site)/cart/page.tsx`

In the Order Summary card, replace the current shipping display with:

```tsx
import { SHIPPING_CHARGE, FREE_SHIP_ABOVE } from '@/lib/constants'

// In the Order Summary section:
const shipping = totalPrice >= FREE_SHIP_ABOVE ? 0 : SHIPPING_CHARGE
const remaining = FREE_SHIP_ABOVE - totalPrice

// Display:
{totalPrice >= FREE_SHIP_ABOVE ? (
  <div className="flex justify-between text-emerald-700 font-bold text-sm">
    <span>🎉 FREE Shipping</span>
    <span>₹0</span>
  </div>
) : (
  <>
    <div className="flex justify-between text-sm">
      <span>Shipping</span>
      <span className="font-bold text-maroon">₹{SHIPPING_CHARGE}</span>
    </div>
    <p className="text-xs text-gold">
      Add ₹{remaining} more for FREE shipping across India
    </p>
  </>
)}

// Grand total = totalPrice + shipping
<div className="flex justify-between font-bold text-lg text-maroon">
  <span>Total Amount</span>
  <span>₹{(totalPrice + shipping).toLocaleString('en-IN')}</span>
</div>
```

### Phase 2 Done Checklist
```
□  AnnouncementBar component created with scroll animation
□  Content: 🚚 FREE SHIPPING ₹599 + WA number + JK Enterprises
□  AnnouncementBar added to (site)/layout.tsx above Navbar
□  Announcement visible on Home, About, Products, Quality, Contact pages
□  Cart page: shipping shows ₹60 if below ₹599
□  Cart page: shows 🎉 FREE Shipping if ₹599+
□  Cart page: shows "₹X more for free shipping" prompt
□  Grand total in cart now includes shipping charge
□  Mobile: AnnouncementBar readable at 360px
```

---

## 🔷 PHASE 3 — Navbar Redesign
### ⏱️ Time: 4–5 hours | Files: `components/layout/Navbar.tsx` only

> Modify the existing Navbar. Do not create a new one.

---

### 3A — New NAV_LINKS structure

Replace the current flat `NAV_LINKS` array:

```typescript
// Current:
const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Quality', href: '/quality' },
  { label: 'Contact Us', href: '/contact' },
]

// Replace with:
type NavItem = {
  label: string
  href: string
  dropdown?: {
    group: string
    items: { label: string; href: string; badge?: string }[]
  }[]
}

const NAV_LINKS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  {
    label: 'Products',
    href: '/products',
    dropdown: [
      {
        group: '',
        items: [{ label: 'All Products', href: '/products' }],
      },
      {
        group: 'Pure Grounded Spices',
        items: [
          { label: 'Red Chilli Powder',  href: '/products/red-chilli-powder' },
          { label: 'Haldi Powder',       href: '/products/haldi-powder' },
          { label: 'Coriander Powder',   href: '/products/coriander-powder' },
        ],
      },
      {
        group: 'Blended Spices',
        items: [
          { label: 'Garam Masala',           href: '/products/garam-masala',           badge: 'Coming Soon' },
          { label: 'Chicken Biryani Masala', href: '/products/chicken-biryani-masala', badge: 'Coming Soon' },
          { label: 'Mutton Biryani Masala',  href: '/products/mutton-biryani-masala',  badge: 'Coming Soon' },
        ],
      },
      {
        group: 'Whole Spices',
        items: [
          { label: 'Coriander Seeds', href: '/products/coriander-seeds', badge: 'Coming Soon' },
          { label: 'Black Pepper',    href: '/products/black-pepper',    badge: 'Coming Soon' },
          { label: 'Cumin',           href: '/products/cumin',           badge: 'Coming Soon' },
        ],
      },
    ],
  },
  { label: 'Quality', href: '/quality' },
  {
    label: 'Shop',
    href: '/products',
    dropdown: [
      {
        group: '',
        items: [
          { label: 'Combo Pack',   href: '/products/combo-pack' },
          { label: 'Bulk Inquiry', href: '/contact' },
        ],
      },
    ],
  },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
]
```

---

### 3B — Desktop navbar layout change

```
BEFORE:
[Logo]  [Home] [About] [Products] [Quality] [Contact]  [Enquire on WhatsApp btn]  [🛒]

AFTER:
[Logo]  [Home] [About] [Products▼] [Quality] [Shop▼] [Blog] [Contact]  [Hello, Sign In]  [♡]  [🛒]
```

- Remove the "Enquire on WhatsApp" pill button from nav — it's the float button's job
- Add `Hello, Sign In` text link → `/contact` for now (comment: `// TODO: Customer Auth`)
- Add `♡` Heart icon (Lucide `Heart`) → no action yet (comment: `// TODO: Wishlist`)
- Keep existing `CartIcon` component exactly as is

---

### 3C — Dropdown panel design (desktop)

```
Trigger  : hover over "Products ▼" or "Shop ▼" link
Panel    : absolute positioned, white bg, shadow-xl, border border-gold/20, rounded-xl
           min-width: 560px for Products, 200px for Shop
           top: 100% of nav link, left-aligned to trigger

Group header: font-body text-xs uppercase tracking-widest text-muted, mb-2
Links: font-body text-sm text-ink hover:text-gold, py-1.5 block

"Coming Soon" badge on links:
  <span class="ml-2 rounded-full bg-cream text-maroon text-[9px] font-bold px-2 py-0.5">
    Coming Soon
  </span>
  Link text: text-muted cursor-default (not clickable)

Close: disappears when mouse leaves the group (CSS group-hover pattern)
       OR click outside (addEventListener on document)
```

---

### 3D — Mobile hamburger update

Current mobile overlay: flat list of 5 links.

Update to: same full-screen maroon overlay, flat list of ALL links:
```
Home
About Us
Products  (tap → goes to /products)
Quality
Shop
Blog
Contact Us
──────────────
Cart (X items)
Order on WhatsApp  [green pill]
```

No nested dropdown on mobile — just flat links. Products in dropdown are accessible via `/products` page's category filter (Phase 5).

### Phase 3 Done Checklist
```
□  Products ▼ dropdown renders on desktop hover
□  Products dropdown: 4 groups (All, Pure Grounded, Blended, Whole)
□  "Coming Soon" badge on all coming_soon product links
□  Coming Soon links: muted text, non-clickable (no href navigation)
□  Shop ▼ dropdown: Combo Pack + Bulk Inquiry
□  Blog link in nav
□  "Hello, Sign In" added (text only, links to /contact)
□  ♡ Heart icon added (Lucide Heart, no action)
□  🛒 CartIcon: unchanged from current
□  WA pill button removed from desktop nav
□  Mobile: all links in flat list inside hamburger overlay
□  Mobile: includes Cart + Order on WhatsApp links
□  Dropdown closes on outside click
□  No TypeScript errors
□  Active link highlight works for all new links
```

---

## 🔷 PHASE 4 — Home Page Restructure
### ⏱️ Time: 6–8 hours | Files: `app/(site)/page.tsx` + 5 new component files

---

### 4A — Update `app/(site)/page.tsx`

```tsx
// REMOVE these imports:
// import { AboutPreview } from '@/components/home/AboutPreview'
// import { ProductsPreview } from '@/components/home/ProductsPreview'
// import { WaysToUse } from '@/components/home/WaysToUse'
// import { OurProcess } from '@/components/home/OurProcess'

// ADD these imports:
import { ShopByCategory }     from '@/components/home/ShopByCategory'
import { BestSellers }        from '@/components/home/BestSellers'
import { ShopMoreSaveMore }   from '@/components/home/ShopMoreSaveMore'
import { RecipesComingSoon }  from '@/components/home/RecipesComingSoon'
import { BlogSection }        from '@/components/home/BlogSection'

// KEEP these imports:
import { Hero }           from '@/components/home/Hero'
import { TrustBar }       from '@/components/home/TrustBar'
import { QualityPreview } from '@/components/home/QualityPreview'
import { FAQ }            from '@/components/home/FAQ'
import { getClaims }      from '@/hooks/useClaims'
import { getProducts, getBestSellers, getPublishedBlogs } from '@/hooks/useProducts'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const [products, claims, bestSellers, blogs] = await Promise.all([
    getProducts(),
    getClaims(),
    getBestSellers(),
    getPublishedBlogs(),
  ])

  return (
    <main>
      <Hero products={products} claims={claims} />
      <TrustBar claims={claims} />
      <ShopByCategory />
      <BestSellers products={bestSellers} />
      <ShopMoreSaveMore />
      <QualityPreview claims={claims} />
      <RecipesComingSoon />
      <BlogSection blogs={blogs} />
      <FAQ />
    </main>
  )
}
```

> **Note:** `AboutPreview.tsx`, `ProductsPreview.tsx`, `WaysToUse.tsx`, `OurProcess.tsx`
> — keep files on disk, just remove from home page imports.
> They may be used on the About page in a future phase.

---

### 4B — `components/home/ShopByCategory.tsx` (NEW)

```
Section label : "SHOP BY CATEGORY"
Heading       : "Discover Spices for Every Kitchen"
Layout        : 3 cards in a row (1-col mobile, 3-col desktop)
Background    : bg-ivory or bg-cream alternating

Card 1 — Pure Grounded Spices
  Image   : /products/chilli.webp (existing)
  Tag     : "3 Products Available"
  Link    : /products?category=pure_grounded

Card 2 — Blended Spices
  Image   : /products/masala.webp (existing)
  Tag     : "Coming Soon"
  Link    : /products?category=blended

Card 3 — Whole Spices
  Image   : placeholder or cream background with 🌾 icon
  Tag     : "Coming Soon"
  Link    : /products?category=whole

Card design:
  rounded-2xl, overflow-hidden
  Image area: h-48, object-cover
  Bottom panel: maroon-dark background
  Card text: gold heading, muted subtitle
  "Explore →" link in gold
  Hover: scale(1.02), shadow-lg
```

---

### 4C — `components/home/BestSellers.tsx` (NEW — replaces ProductsPreview)

```typescript
// Props: { products: Product[] }
// products = best sellers from Supabase (is_best_seller=true, status='active')

// Heading     : "BEST SELLERS"
// Subheading  : "Loved by kitchens across India"
// Layout      : horizontal scroll on mobile, 4-col grid on desktop

// REUSE: existing <ProductCard> — do NOT create a new card component
// REUSE: SizeSelector, PriceDisplay, AddToCartButton inside ProductCard (unchanged)

// Wishlist ♡ icon: render on each card (top-right of image)
//   → no action yet, visual placeholder
//   → comment: // TODO Phase 6: connect to WishlistContext

// Footer: "VIEW ALL PRODUCTS" → /products (LinkButton variant="outline")

// Fallback: if products is empty, show all products (getProducts() fallback)
```

---

### 4D — `components/home/ShopMoreSaveMore.tsx` (NEW)

```
Section label : "SHOP MORE & SAVE MORE"
Heading       : "Bigger Flavours. Better Combinations."
Background    : bg-cream

3 combo cards (all link to /products/combo-pack for now):
  Card 1: "Daily Essential Spice Box"
  Card 2: "Family Spice Combo"
  Card 3: "Special Combo"

Card design:
  white bg, border border-gold/30, rounded-2xl, p-6
  Title in font-heading text-maroon
  Short placeholder description (1 line)
  "Explore →" link in gold
  NO prices, NO discount %, NO "X% OFF"
  (Sir will provide real pricing/structure later)

Important note in code comment:
  // No discounts shown until Sir provides actual combo pricing scheme
```

---

### 4E — `components/home/RecipesComingSoon.tsx` (NEW)

```
Heading    : "OUR COOKING RECIPES"
Subheading : "From our spices to your kitchen."
Body       : "Discover delicious recipes and simple cooking ideas
              made with Kura Gold Spices."
Center     : Large "COMING SOON" badge

Future categories (in code comment, not displayed yet):
  // Biryani | Vegetarian | Curries | Snacks | Everyday Cooking

Background : bg-maroon-dark
Text       : ivory heading, gold-muted body
Design     : clean, minimal, centred layout
```

---

### 4F — `components/home/BlogSection.tsx` (NEW)

```typescript
// Props: { blogs: Blog[] }  — fetched from Supabase (published only)

// Heading    : "FROM THE KURA GOLD KITCHEN"
// Subheading : "Stories, tips & inspiration for better cooking."

// If blogs.length === 0:
//   Show "Coming Soon" message
//   "Our team is preparing articles and guides. Check back soon."
//   No fake blog cards

// If blogs.length > 0:
//   3-column card grid
//   Each card:
//     [Cover image or placeholder]
//     Category tag (gold pill)
//     Title (font-heading text-maroon)
//     Excerpt (text-muted text-sm 2-line clamp)
//     "Read More →" link → /blog/[slug]

// Footer: "VIEW ALL BLOGS" → /blog

// Background: bg-ivory
```

### Phase 4 Done Checklist
```
□  page.tsx: removed AboutPreview, ProductsPreview, WaysToUse, OurProcess imports
□  page.tsx: added ShopByCategory, BestSellers, ShopMoreSaveMore, RecipesComingSoon, BlogSection
□  ShopByCategory: 3 cards with correct /products?category= links
□  BestSellers: reuses existing ProductCard, data from getBestSellers()
□  BestSellers: ♡ icon placeholder on each card
□  BestSellers: horizontal scroll on mobile
□  ShopMoreSaveMore: 3 combo cards, NO fake discounts
□  RecipesComingSoon: clean Coming Soon design on maroon bg
□  BlogSection: shows "Coming Soon" when no blogs, cards when blogs exist
□  Home page sections in correct order: Hero → TrustBar → ShopByCategory →
   BestSellers → ShopMoreSaveMore → QualityPreview → RecipesComingSoon → BlogSection → FAQ
□  All sections responsive on mobile
□  No TypeScript errors
```

---

## 🔷 PHASE 5 — Products Page: Category Filter + Coming Soon Cards
### ⏱️ Time: 3–4 hours | Files: `app/(site)/products/page.tsx`, `components/products/ProductCard.tsx`, `app/(site)/products/[slug]/page.tsx`

---

### 5A — Category filter tabs on Products page

Update `app/(site)/products/page.tsx`:

```typescript
// Read ?category= from searchParams
// Filter products array by category before rendering grid
// If no category param → show all (active + coming_soon)

interface Props {
  searchParams: { category?: string }
}

export default async function ProductsPage({ searchParams }: Props) {
  const products = await getProducts()
  const activeCategory = searchParams.category ?? 'all'

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory)

  return (
    <main>
      {/* Category Filter Tabs */}
      <div className="flex gap-2 flex-wrap mb-10">
        {['all', 'pure_grounded', 'blended', 'whole', 'combo'].map((cat) => (
          <Link
            key={cat}
            href={cat === 'all' ? '/products' : `/products?category=${cat}`}
            className={cn(
              'rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wide transition-colors',
              activeCategory === cat
                ? 'bg-gold text-maroon-dark'
                : 'bg-cream text-muted hover:bg-gold/20'
            )}
          >
            {CATEGORY_LABELS[cat] ?? 'All Products'}
          </Link>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}
```

---

### 5B — Update `ProductCard.tsx` for Coming Soon state

```typescript
// ProductCard.tsx — add conditional render based on product.status

export function ProductCard({ product }: { product: Product }) {
  const isComingSoon = product.status === 'coming_soon'

  if (isComingSoon) {
    return (
      // Coming Soon card — same outer shape, different content
      <div className="group flex flex-col overflow-hidden rounded-2xl border border-border-gold/60 bg-white shadow-sm">
        {/* Image or placeholder */}
        <div className="relative block h-48 bg-cream">
          {product.image_url ? (
            <Image src={product.image_url} alt={product.name} fill className="object-contain p-6 opacity-40" />
          ) : (
            <div className="flex h-full items-center justify-center text-4xl opacity-30">🌿</div>
          )}
          {/* Coming Soon overlay badge */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="rounded-full bg-maroon-dark px-5 py-2 font-body text-xs font-bold uppercase tracking-widest text-gold-light shadow-lg">
              Coming Soon
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <p className="font-body text-xs font-bold uppercase tracking-wide text-gold">{product.tagline}</p>
          <h3 className="font-heading text-lg font-bold text-maroon">{product.name}</h3>
          <p className="text-sm text-muted">We're working on this product. Stay tuned!</p>

          {/* Notify on WhatsApp — no Add to Cart */}
          <a
            href={buildComingSoonNotifyMessage(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-4 py-2.5 font-body text-xs font-bold uppercase tracking-wide text-white hover:bg-whatsapp-dark"
          >
            <MessageCircle size={14} />
            Notify Me on WhatsApp
          </a>
        </div>
      </div>
    )
  }

  // Active product — existing JSX unchanged below
  // ...existing code...
}
```

Add `buildComingSoonNotifyMessage` to `lib/whatsapp.ts`:

```typescript
export function buildComingSoonNotifyMessage(productName: string): string {
  const message = `Hello Kura Gold Spices Team,\n\nI am interested in "${productName}" which is listed as Coming Soon. Please notify me when it becomes available.\n\nThank you!`
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}
```

---

### 5C — Product detail page guard for coming_soon

In `app/(site)/products/[slug]/page.tsx`, after fetching:

```typescript
// After: const product = await getProductBySlug(params.slug)
// ADD:
if (product.status === 'coming_soon') {
  return (
    <main className="bg-ivory px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-body text-xs font-bold uppercase tracking-wide text-gold mb-3">
          {CATEGORY_LABELS[product.category] ?? 'Spice'}
        </p>
        <h1 className="font-heading text-3xl font-bold text-maroon mb-4">{product.name}</h1>
        {product.tagline && (
          <p className="font-accent text-lg italic text-gold mb-8">{product.tagline}</p>
        )}
        <div className="rounded-2xl bg-cream border border-gold/30 p-10 mb-8">
          <p className="font-heading text-2xl font-bold text-maroon mb-3">Coming Soon</p>
          <p className="text-sm text-muted mb-6">
            We are currently working on bringing this product to you.
            Get notified when it launches.
          </p>
          <a
            href={buildComingSoonNotifyMessage(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-body text-sm font-bold uppercase text-white hover:bg-whatsapp-dark"
          >
            <MessageCircle size={16} />
            Notify Me on WhatsApp
          </a>
        </div>
        <LinkButton href="/products" variant="outline">← Back to All Products</LinkButton>
      </div>
    </main>
  )
}
```

### Phase 5 Done Checklist
```
□  Products page: 5 category filter tabs render correctly
□  Clicking "Pure Grounded" → /products?category=pure_grounded shows 3 products
□  Clicking "Blended" → shows Garam Masala + 2 coming soon cards
□  Clicking "Whole" → shows 3 coming soon cards
□  Coming Soon cards: no SizeSelector, no price, no Add to Cart
□  Coming Soon cards: "Notify Me on WhatsApp" button works
□  Active product cards: all existing functionality unchanged
□  /products/garam-masala: shows Coming Soon page (not purchase panel)
□  /products/chicken-biryani-masala: shows Coming Soon page
□  buildComingSoonNotifyMessage() added to whatsapp.ts
□  CATEGORY_LABELS used for tab labels
□  No TypeScript errors
```

---

## 🔷 PHASE 6 — Wishlist (Frontend Only)
### ⏱️ Time: 3 hours | Files: new `context/WishlistContext.tsx`, `components/layout/Navbar.tsx`, `components/products/ProductCard.tsx`

> Customer auth and Supabase wishlist sync are future phases.
> This phase: localStorage only, same pattern as existing CartContext.

---

### 6A — Create `context/WishlistContext.tsx`

```typescript
// Mirror the pattern of CartContext.tsx exactly

'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

const STORAGE_KEY = 'kuragold_wishlist'

interface WishlistContextValue {
  wishlist: string[]                    // array of productId strings
  addToWishlist: (id: string) => void
  removeFromWishlist: (id: string) => void
  toggleWishlist: (id: string) => void
  isWishlisted: (id: string) => boolean
  count: number
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored) setWishlist(JSON.parse(stored))
    } catch { /* corrupt storage */ }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist))
    } catch { /* storage unavailable */ }
  }, [wishlist, hydrated])

  const addToWishlist    = (id: string) => setWishlist(prev => [...prev.filter(i => i !== id), id])
  const removeFromWishlist = (id: string) => setWishlist(prev => prev.filter(i => i !== id))
  const toggleWishlist   = (id: string) => isWishlisted(id) ? removeFromWishlist(id) : addToWishlist(id)
  const isWishlisted     = (id: string) => wishlist.includes(id)

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, toggleWishlist, isWishlisted, count: wishlist.length }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be inside WishlistProvider')
  return ctx
}

// TODO: Customer Auth Phase — sync wishlist with Supabase customer table
```

---

### 6B — Add WishlistProvider to `app/(site)/layout.tsx`

```tsx
import { WishlistProvider } from '@/context/WishlistContext'

export default function SiteLayout({ children }) {
  return (
    <CartProvider>
      <WishlistProvider>           {/* ADD — wraps inside CartProvider */}
        <AnnouncementBar />
        <Navbar />
        {children}
        <Footer />
        <WhatsAppFloat />
      </WishlistProvider>
    </CartProvider>
  )
}
```

---

### 6C — Add ♡ to Navbar right side

In `Navbar.tsx`, after the "Hello, Sign In" link:

```tsx
import { Heart } from 'lucide-react'
import { useWishlist } from '@/context/WishlistContext'

// Inside Navbar function:
const { count: wishlistCount } = useWishlist()

// In desktop right side (after Sign In, before CartIcon):
<button
  type="button"
  aria-label="Wishlist"
  className="relative shrink-0 text-gold-light transition-colors hover:text-gold"
  // TODO: navigate to /wishlist when wishlist page is built
>
  <Heart size={22} />
  {wishlistCount > 0 && (
    <span className="absolute -right-2 -top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-maroon px-1 font-body text-[10px] font-bold text-white">
      {wishlistCount}
    </span>
  )}
</button>
```

---

### 6D — Add ♡ to ProductCard (active products only)

In `ProductCard.tsx`, top-right of the image area:

```tsx
'use client'
import { Heart } from 'lucide-react'
import { useWishlist } from '@/context/WishlistContext'

// Inside ProductCard function (active products only):
const { isWishlisted, toggleWishlist } = useWishlist()
const wishlisted = isWishlisted(product.id)

// In image area (absolute positioned, top-right):
<button
  type="button"
  aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
  onClick={(e) => { e.preventDefault(); toggleWishlist(product.id) }}
  className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-1.5 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
>
  <Heart
    size={16}
    className={wishlisted ? 'fill-maroon text-maroon' : 'text-muted'}
  />
</button>
```

### Phase 6 Done Checklist
```
□  WishlistContext.tsx created (localStorage, hydration pattern)
□  WishlistProvider wraps children in (site)/layout.tsx
□  ♡ Heart icon in Navbar right side
□  ♡ shows count badge when wishlist has items
□  ♡ on each active ProductCard (top-right of image)
□  ♡ toggles: empty → filled gold, filled → empty
□  ♡ click does not navigate (e.preventDefault())
□  Coming Soon ProductCard does NOT show ♡ icon
□  TODO comment for Supabase sync in WishlistContext
□  No TypeScript errors
```

---

## 🔷 PHASE 7 — Blog Pages + Admin Blog Management
### ⏱️ Time: 3–4 hours | Files: new `app/(site)/blog/` pages, new `app/admin/(protected)/blog/` pages, `app/admin/actions.ts`, `components/admin/AdminShell.tsx`

---

### 7A — Public Blog list page: `app/(site)/blog/page.tsx`

```typescript
export const metadata = {
  title: 'Blog',
  description: 'Stories, tips and inspiration from Kura Gold Spices kitchen.',
}

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const blogs = await getPublishedBlogs()  // from useProducts.ts

  return (
    <main className="bg-ivory px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionLabel className="justify-center">Our Blog</SectionLabel>
        <h1 className="text-center font-heading text-3xl font-bold text-maroon sm:text-4xl">
          From the Kura Gold Kitchen
        </h1>
        <p className="mt-3 text-center text-sm text-muted">
          Stories, tips and inspiration for better cooking.
        </p>

        {blogs.length === 0 ? (
          // Coming Soon state
          <div className="mt-16 text-center">
            <p className="font-heading text-2xl font-bold text-maroon">Coming Soon</p>
            <p className="mt-3 text-sm text-muted">
              Our team is preparing articles and guides. Check back soon.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map(blog => <BlogCard key={blog.id} blog={blog} />)}
          </div>
        )}
      </div>
    </main>
  )
}
```

---

### 7B — Blog detail page: `app/(site)/blog/[slug]/page.tsx`

```typescript
// Fetch blog by slug from Supabase
// If not found → notFound()
// If found: render title, cover image, content, published date
// "← Back to Blog" link
// generateMetadata() for SEO
```

---

### 7C — Admin blog management

**Add to `app/admin/actions.ts`:**

```typescript
export async function createBlog() {
  const supabase = createClient()
  const slug = `blog-${Date.now()}`
  const { data } = await supabase
    .from('blogs')
    .insert({ title: 'New Blog Post', slug, is_published: false })
    .select('id')
    .single()
  if (!data) return
  revalidatePath('/admin/blog')
  redirect(`/admin/blog/${data.id}`)
}

export async function updateBlog(id: string, formData: FormData) {
  const supabase = createClient()
  const isPublished = formData.get('is_published') === 'on'
  await supabase.from('blogs').update({
    title:        String(formData.get('title') ?? ''),
    slug:         String(formData.get('slug') ?? ''),
    excerpt:      String(formData.get('excerpt') ?? ''),
    content:      String(formData.get('content') ?? ''),
    cover_image:  String(formData.get('cover_image') ?? ''),
    category:     String(formData.get('category') ?? 'general'),
    is_published: isPublished,
    published_at: isPublished ? new Date().toISOString() : null,
  }).eq('id', id)
  revalidatePath('/admin/blog')
  revalidatePath(`/admin/blog/${id}`)
  revalidatePath('/blog')
}

export async function deleteBlog(id: string) {
  const supabase = createClient()
  await supabase.from('blogs').delete().eq('id', id)
  revalidatePath('/admin/blog')
  redirect('/admin/blog')
}
```

**Create `app/admin/(protected)/blog/page.tsx`:**
```
Table: Title | Category | Published | Created | Actions
Toggle: Publish / Unpublish
[+ New Blog Post] button
```

**Create `app/admin/(protected)/blog/[id]/page.tsx`:**
```
Form: Title, Slug, Excerpt, Content (textarea), Cover Image URL, Category, Published checkbox
Save button → updateBlog server action
Delete button → deleteBlog
```

---

### 7D — Update AdminShell + Footer

In `components/admin/AdminShell.tsx`, add Blog to NAV_ITEMS:
```typescript
import { BookOpen } from 'lucide-react'

// Add to NAV_ITEMS array:
{ label: 'Blog', href: '/admin/blog', icon: BookOpen },
```

In `components/layout/Footer.tsx`, add Blog to navigation:
```typescript
// In NAV_LINKS array, add:
{ label: 'Blog', href: '/blog' }
```

### Phase 7 Done Checklist
```
□  /blog page: shows "Coming Soon" when no published blogs
□  /blog page: shows 3-column card grid when blogs published
□  /blog/[slug] page: renders full blog post
□  Admin sidebar: "Blog" link added
□  Admin /admin/blog: list of all blogs with publish toggle
□  Admin /admin/blog/[id]: create/edit form with all fields
□  createBlog, updateBlog, deleteBlog in actions.ts
□  Published blogs appear on /blog without redeploy
□  Footer: Blog link in Navigation column
□  Navbar: Blog link already added in Phase 3
□  No TypeScript errors
```

---

## 🔷 PHASE 8 — Admin Panel Extensions
### ⏱️ Time: 2–3 hours | Files: `app/admin/(protected)/products/[id]/page.tsx`, `app/admin/actions.ts`, `app/admin/(protected)/products/page.tsx`

---

### 8A — Update product edit form

In `app/admin/(protected)/products/[id]/page.tsx`, add new fields to the existing form:

```tsx
{/* Category — update options to new system */}
<select name="category" defaultValue={product.category} className={inputClass}>
  <option value="pure_grounded">Pure Grounded Spices</option>
  <option value="blended">Blended Spices</option>
  <option value="whole">Whole Spices</option>
  <option value="combo">Combo Packs</option>
</select>

{/* Status — new dropdown */}
<div>
  <label className={labelClass}>Status</label>
  <select name="status" defaultValue={product.status ?? 'active'} className={inputClass}>
    <option value="active">Active — Live with Add to Cart</option>
    <option value="coming_soon">Coming Soon — Visible, no cart</option>
    <option value="future">Future — Hidden from public</option>
  </select>
</div>

{/* Best Seller checkbox */}
<label className="flex items-center gap-2 font-body text-sm font-bold text-ink">
  <input type="checkbox" name="is_best_seller" defaultChecked={product.is_best_seller ?? false} className="h-4 w-4" />
  Mark as Best Seller (shown in home page Best Sellers section)
</label>

{/* Featured checkbox */}
<label className="flex items-center gap-2 font-body text-sm font-bold text-ink">
  <input type="checkbox" name="is_featured" defaultChecked={product.is_featured ?? false} className="h-4 w-4" />
  Mark as Featured
</label>

{/* Sort Order */}
<div>
  <label className={labelClass}>Sort Order (lower number = shown first)</label>
  <input type="number" name="sort_order" defaultValue={product.sort_order ?? 0} className={inputClass} />
</div>
```

---

### 8B — Update `updateProduct` server action

In `app/admin/actions.ts`, add new fields to the update:

```typescript
export async function updateProduct(id: string, oldSlug: string, formData: FormData) {
  const supabase = createClient()
  const newSlug = String(formData.get('slug') ?? oldSlug)

  await supabase.from('products').update({
    name:          String(formData.get('name') ?? ''),
    slug:          newSlug,
    category:      String(formData.get('category') ?? 'pure_grounded'),  // updated
    tagline:       String(formData.get('tagline') ?? ''),
    description:   String(formData.get('description') ?? ''),
    image_url:     String(formData.get('image_url') ?? ''),
    is_active:     formData.get('is_active') === 'on',
    // ── NEW FIELDS ─────────────────────────────────
    status:        String(formData.get('status') ?? 'active'),
    is_best_seller: formData.get('is_best_seller') === 'on',
    is_featured:   formData.get('is_featured') === 'on',
    sort_order:    Number(formData.get('sort_order') ?? 0),
  }).eq('id', id)

  revalidatePath('/admin/products')
  revalidatePath(`/admin/products/${id}`)
  revalidatePath(`/products/${oldSlug}`)
  revalidatePath('/')  // home page best sellers
  if (newSlug !== oldSlug) revalidatePath(`/products/${newSlug}`)
}
```

---

### 8C — Update products list table

In `app/admin/(protected)/products/page.tsx`, add Status and Best Seller columns:

```tsx
// In <thead>:
<th className="px-4 py-3">Name</th>
<th className="px-4 py-3">Category</th>
<th className="px-4 py-3">Status</th>      {/* NEW */}
<th className="px-4 py-3">Best Seller</th> {/* NEW */}
<th className="px-4 py-3">Active</th>
<th className="px-4 py-3">Actions</th>

// In each <tr>:
<td className="px-4 py-3">
  <span className={cn(
    'rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase',
    product.status === 'active' && 'bg-emerald-100 text-emerald-800',
    product.status === 'coming_soon' && 'bg-amber-100 text-amber-800',
    product.status === 'future' && 'bg-gray-100 text-gray-600',
  )}>
    {product.status ?? 'active'}
  </span>
</td>
<td className="px-4 py-3 text-center">
  {product.is_best_seller ? '⭐' : '—'}
</td>
```

### Phase 8 Done Checklist
```
□  Product edit form: Status dropdown (active/coming_soon/future)
□  Product edit form: Best Seller checkbox
□  Product edit form: Featured checkbox
□  Product edit form: Sort Order number input
□  Product edit form: Category updated to 4 new values
□  updateProduct action: saves all 4 new fields
□  updateProduct: revalidatePath('/') so home page updates
□  Products list table: Status column with colour badge
□  Products list table: Best Seller column (⭐ or —)
□  No TypeScript errors
```

---

## 🔷 PHASE 9 — Responsive Testing
### ⏱️ Time: 2–3 hours

Test every page at these exact widths in browser DevTools:

| Width | Device | What to check |
|---|---|---|
| 360px | Small Android | Navbar hamburger, announcement bar, 1-col grids, category tabs scroll |
| 390px | iPhone 14 | Hero, ShopByCategory, BestSellers horizontal scroll |
| 430px | Large phone | Cart page, shipping message, checkout button |
| 768px | iPad portrait | Navbar still hamburger, 2-col grids |
| 1024px | Small laptop | Desktop navbar appears, dropdowns work |
| 1280px | Desktop | Full layout, 4-col product grid |
| 1440px | Large desktop | max-w-7xl centred properly |

**Specific items to verify:**

```
Announcement bar:
□  Scrolls smoothly at all widths
□  Text doesn't overflow at 360px

Navbar:
□  Desktop dropdown opens/closes correctly (hover)
□  Mobile: all 7+ links visible in hamburger overlay
□  ♡ and 🛒 icons visible on mobile alongside hamburger

Home page:
□  ShopByCategory: 1-col on mobile, 3-col on desktop
□  BestSellers: horizontal scroll on mobile (overflow-x-auto)
□  ShopMoreSaveMore: 1-col mobile, 3-col desktop
□  RecipesComingSoon: text centred at all widths

Products page:
□  Category filter tabs: wrap correctly at narrow widths
□  Coming Soon cards: same height as active cards

Cart page:
□  Shipping message readable at 360px
□  Order summary stacks below items on mobile

Admin panel:
□  Blog section in sidebar visible
□  Product edit form: new fields display correctly on mobile
```

---

## 🔷 PHASE 10 — Final Build Check + Deploy
### ⏱️ Time: 30 minutes

```bash
# Run all checks in order:

# 1. Lint
npm run lint
# Fix any ESLint warnings/errors before proceeding

# 2. TypeScript
npx tsc --noEmit
# Must show 0 errors

# 3. Production build
npm run build
# Must complete with 0 errors
# Check: any "Missing required env variables" warnings

# 4. Commit and push
git add .
git commit -m "feat: categories, coming soon products, navbar dropdown, best sellers, blog, wishlist, announcement bar"
git push origin main
# Vercel auto-deploys from main

# 5. Verify on live URL (kuragold-spices.vercel.app):
```

**Post-deploy live checks:**
```
□  Announcement bar visible on all pages
□  Products dropdown opens on desktop
□  Garam Masala → Coming Soon page (no Add to Cart)
□  /products?category=pure_grounded → 3 active products
□  /products?category=blended → 1 coming soon + 2 coming soon
□  BestSellers shows on home page (Red Chilli, Haldi, Coriander)
□  ShopByCategory 3 cards visible on home
□  Blog section: "Coming Soon" shows on home + /blog
□  Cart: ₹599 threshold, free shipping message correct
□  Admin /admin/products: Status column visible
□  Admin /admin/blog: page accessible
□  Admin: editing a product's status to 'coming_soon' reflects on public site immediately
□  npm run build → 0 errors (re-run after any fixes)
```

---

## 📊 Complete Summary

| Phase | What | Key Files | Time |
|---|---|---|---|
| **0** | Database — new columns, coming soon products, blogs table | Supabase SQL | 1h |
| **1** | Types + constants + hooks update | `types/index.ts`, `constants.ts`, `useProducts.ts` | 0.5h |
| **2** | Announcement bar + ₹599 shipping in cart | `AnnouncementBar.tsx`, `layout.tsx`, `cart/page.tsx` | 2h |
| **3** | Navbar — dropdown menus + Sign In + ♡ + Blog link | `Navbar.tsx` | 4–5h |
| **4** | Home page — 5 new sections, 4 removed | `page.tsx` + 5 new home components | 6–8h |
| **5** | Products page — category filter + coming soon cards | `products/page.tsx`, `ProductCard.tsx`, `[slug]/page.tsx` | 3–4h |
| **6** | Wishlist — localStorage, ♡ in nav + cards | `WishlistContext.tsx`, `Navbar.tsx`, `ProductCard.tsx` | 3h |
| **7** | Blog pages + admin blog management | `/blog/`, `/admin/blog/`, `actions.ts` | 3–4h |
| **8** | Admin panel — new product fields (status, best seller, sort) | `products/[id]/page.tsx`, `actions.ts` | 2–3h |
| **9** | Responsive testing | Multiple files | 2–3h |
| **10** | Build check + Vercel deploy | — | 0.5h |
| **Total** | | | **~27–37h** |

---

## ❌ Explicitly NOT in this Plan

| Item | Reason |
|---|---|
| Splash screen | Removed per explicit instruction |
| Customer auth / sign-up | Future phase — too large |
| Supabase wishlist sync | Requires customer auth first |
| Payment gateway | Future phase 2 — not confirmed |
| Discount / OFF labels | Not confirmed by Sir |
| Career page | No content confirmed |
| Real blog content | Admin creates later — Coming Soon now |
| Recipe content | Coming Soon section only |
| Combo Pack 2 and 3 pricing | Only ₹204 for 4x100g confirmed |

---

## ⚠️ One Pending Confirmation

**Free Shipping Threshold:**
Current code: `₹499`
Extension plan: `₹599` (based on Sir's message: "Free Shipping On Words Above 599/-")

> Confirm before running Phase 1B (`constants.ts` change).
> If ₹499 is correct, skip that change.

---

*Plan prepared by: Vaishnavi · Allentics IT Solutions · August 2026*
*Built against: `Kuragold-Spices-main.zip` + `kuragold-spices.vercel.app`*
*Garam Masala status: Coming Soon (confirmed by Sir)*
