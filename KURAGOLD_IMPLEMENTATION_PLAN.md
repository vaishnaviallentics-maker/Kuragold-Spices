# 🌶️ KURA GOLD SPICES
## Complete Phase-wise Website Implementation Plan
### Version 2.0 — Final | August 2026

---

```
Brand         :  Kura Gold Spices
Company       :  JK Enterprises
Owner         :  Javeria
WhatsApp      :  +91 89787 26655
Location      :  Hyderabad, Telangana, India
Hours         :  Open 24 Hours
Website       :  kuragoldspices.com
FSSAI Lic.    :  23626030003544
Prepared by   :  Vaishnavi — Allentics IT Solutions
Reviewed by   :  Airaj Sir
Approved by   :  Zaki Sir
```

---

## 📋 MASTER TABLE OF CONTENTS

```
PART A — CLIENT REQUIREMENTS
  A1.  All Confirmed Requirements
  A2.  Confirmed Product Catalogue & Prices
  A3.  Items Awaiting Client Confirmation
  A4.  Design Requirements (Finalised Template)

PART B — TECHNICAL ARCHITECTURE
  B1.  Technology Stack
  B2.  Final Navigation Structure
  B3.  Complete Folder Structure
  B4.  Database Schema (Supabase)
  B5.  Environment Variables

PART C — PHASE-WISE IMPLEMENTATION
  Phase 0 — Pre-Development Setup
  Phase 1 — Foundation & Layout
  Phase 2 — Home Page
  Phase 3 — Products & Ordering
  Phase 4 — Inner Pages
  Phase 5 — Admin Panel
  Phase 6 — QA, SEO & Deployment

PART D — REFERENCES
  D1.  WhatsApp Order Flow
  D2.  Future Payment Architecture
  D3.  Key Contacts & Numbers
  D4.  Master Done Checklist
```

---

# PART A — CLIENT REQUIREMENTS

---

## A1. All Confirmed Requirements

Everything in this section has been **explicitly confirmed by Zaki Sir and Airaj Sir**. These must be built exactly as described.

---

### 🔴 A1.1 — Splash Screen (Mentor Requirement — Exact Spec)

> *"First I Want Full Plain Maroon Color. Next The Logo Will Appear On Plain Page After 5 Second Then We Go Purchase Page."*
> — Zaki Sir, 20 August 2026

| Phase | Timing | What Happens |
|---|---|---|
| Phase 1 | 0 → 1.2s | **Full screen plain maroon. Absolutely nothing else visible.** |
| Phase 2 | 1.2s → 2.3s | **Kura Gold logo fades in** from centre of screen |
| Phase 3 | 2.3s → 3.2s | Brand name "KURA GOLD SPICES" rises up in gold |
| Phase 4 | 3.2s → 4.5s | Tagline "Where Quality Comes to Life" appears |
| Phase 5 | 5.0s | **Smooth fade out → main website appears** |

```
Maroon colour code confirmed: #6E0D0D
Logo source: kuragoldspices.com/logo.webp  (circular, round logo)
```

---

### 🎨 A1.2 — Design Template (Finalised by Mentor)

> Template finalised: **Heritage Royale** (Template A)
> Approved by Airaj Sir and Zaki Sir.

| Design Element | Value |
|---|---|
| Primary colour | Maroon — `#6E0D0D` / `#5C0E0E` / `#8B1A1A` |
| Accent colour | Gold — `#C8962A` / `#E8B84B` |
| Background | Ivory — `#FAF6EE` / Cream — `#F2EAD8` |
| Body font | Lato (300, 400, 700) |
| Heading font | Playfair Display (400, 600, 700, 900) |
| Accent font | Cormorant Garamond (Italic) |
| Logo style | Round/circular logo with maroon background |
| Nav background | Deep maroon `#5C0E0E` |
| Sections alternate | Ivory → White → Cream → Maroon |

---

### 🗂️ A1.3 — Navigation (Exact Requirement)

> Navigation confirmed by client + Airaj Sir feedback:

```
Home  |  About Us  |  Products  |  Quality  |  Contact Us
```

Additional nav elements:
- **WhatsApp "Order" button** (green) on the right side of desktop nav
- **Mobile**: hamburger menu → full-screen overlay with all links + WhatsApp button
- **Sticky**: nav stays fixed at top while scrolling
- **Active state**: current page link highlighted in gold

---

### 📦 A1.4 — Product & Ordering Requirements

> *"Contact option — once the add to cart and go for buy then come to direct WhatsApp"*
> — Zaki Sir, 20 August 2026

**Order Flow (confirmed — no payment gateway in Phase 1):**
```
Customer selects product
        ↓
Customer selects size (50g / 100g / 200g / 500g)
        ↓
Price updates automatically
        ↓
Customer clicks "Buy on WhatsApp"
        ↓
WhatsApp opens with pre-filled order message
        ↓
Javeria handles order manually
```

---

### 🚚 A1.5 — Shipping Rules (Confirmed by Sir)

```
Standard shipping  :  ₹60 per order
Free shipping      :  Orders of ₹499 or above
```

---

### 📱 A1.6 — WhatsApp Business Details (Confirmed from Screenshot)

```
Name on WhatsApp   :  Javeria (JK Enterprises)
WhatsApp Number    :  +91 89787 26655
Business Type      :  WhatsApp Business Account
Status             :  Open 24 Hours
Location           :  Hyderabad, Telangana
```

---

### 📧 A1.7 — Contact Information (From Live Site)

```
General Enquiries  :  care@kuragoldspices.com
Customer Support   :  support@kuragoldspices.com
Phone              :  +91 99868 92121
Website            :  kuragoldspices.com
```

> ⚠️ Confirm with Sir that these emails are active before going live.

---

## A2. Confirmed Product Catalogue & Prices

> All prices confirmed by Zaki Sir on 20 August 2026.

---

### Product 1 — Red Chilli Powder

```
Category   :  Spice Powder
Tagline    :  Bold Heat

Sizes & Prices:
  50g   →  ₹35
  100g  →  ₹54
  200g  →  ₹120
  500g  →  ₹275
```

---

### Product 2 — Haldi (Turmeric) Powder

```
Category   :  Spice Powder
Tagline    :  Golden Wellness

Sizes & Prices:
  50g   →  ₹33
  100g  →  ₹49
  200g  →  ₹110
  
  ⚠️ 500g size NOT confirmed — do not show
```

---

### Product 3 — Coriander (Dhania) Powder

```
Category   :  Spice Powder
Tagline    :  Earthy Aroma

Sizes & Prices:
  100g  →  ₹37
  200g  →  ₹74
  
  ⚠️ 50g and 500g NOT confirmed — do not show
```

---

### Product 4 — Garam Masala

```
Category   :  Masala Blend
Tagline    :  Signature Blend

Sizes & Prices:
  100g  →  ₹64
  200g  →  ₹120
  
  ⚠️ 50g and 500g NOT confirmed — do not show
```

---

## A3. Items Awaiting Client Confirmation

> **Do NOT display any of the following on the public website until Sir confirms them.**
> Use the admin panel toggle system (described in Phase 5).

| # | Item | Status | Question to Ask Sir |
|---|---|---|---|
| 1 | FSSAI Lic. 23626030003544 badge | ⚠️ Pending | "Can we display the FSSAI badge and licence number?" |
| 2 | Govt. of Telangana badge | ⚠️ Pending | "Can we display the Telangana government badge?" |
| 3 | Make in India badge | ⚠️ Pending | "Can we display the Make in India badge?" |
| 4 | "100% Natural Ingredients" claim | ⚠️ Pending | "Is this confirmed for all products?" |
| 5 | "No Added Colour" claim | ⚠️ Pending | "Is this confirmed for all products?" |
| 6 | "No Preservatives" claim | ⚠️ Pending | "Is this confirmed for all products?" |
| 7 | "Farm Sourced from Telangana" claim | ⚠️ Pending | "Is this accurate?" |
| 8 | Product descriptions (paragraph text) | ⚠️ Pending | "Please share description text for each product" |
| 9 | 500g Haldi / 50g & 500g Coriander & Masala | ⚠️ Pending | "Are there more sizes available?" |
| 10 | care@ and support@ emails | ⚠️ Pending | "Are both email addresses active and monitored?" |
| 11 | +91 99868 92121 phone number | ⚠️ Pending | "Is this number still active?" |
| 12 | Additional products beyond 4 | ⚠️ Pending | "Are there more products to add now or soon?" |

---

## A4. Design Requirements (Finalised Template)

The **Heritage Royale template** (Template A) was finalised by mentors. Key design decisions:

```
✅  Splash screen: plain maroon → circular logo → brand name → tagline → fade out
✅  Announcement bar: scrolling text, maroon background, gold text
✅  Navbar: deep maroon (#5C0E0E) with gold highlights and active indicators
✅  Hero: full-height maroon gradient with product pouches on right (desktop)
✅  Trust bar: cream background, gold top border, badge row
✅  Sections: alternate between Ivory, White, Cream, and Maroon backgrounds
✅  Product cards: white cards with coloured image backgrounds per spice type
✅  Gold rule dividers and section label style (small uppercase + left line)
✅  WhatsApp button: always green (#25D366) regardless of section
✅  Floating WhatsApp bubble: fixed bottom-right corner
✅  Footer: deep maroon background, gold headings, muted link colours
✅  Typography: Playfair Display for all headings, Lato for body text
✅  Mobile: hamburger → full-screen maroon overlay
```

---

# PART B — TECHNICAL ARCHITECTURE

---

## B1. Technology Stack

| Layer | Choice | Version | Reason |
|---|---|---|---|
| Framework | Next.js | 14 (App Router) | SEO-optimised, Vercel-native, React |
| Language | TypeScript | 5.x | Type safety, fewer runtime bugs |
| Styling | Tailwind CSS | 3.x | Fast utility-first styling |
| Custom CSS | CSS Variables | — | Brand colours, consistent theming |
| Database | Supabase | Latest | Free PostgreSQL, real-time, built-in auth |
| Auth | Supabase Auth | — | Admin login for Javeria |
| File Storage | Supabase Storage | — | Product images, logo, badges |
| Forms | React Hook Form + Zod | — | Validation + type-safe schemas |
| Deployment | Vercel | — | Free, auto-deploy from GitHub |
| WhatsApp | wa.me URL | — | No API cost, works on all devices |
| **Future only** | Razorpay | — | Payment — Phase 2 only, not now |

---

## B2. Final Navigation Structure

```
PUBLIC PAGES:
  /                 →  Home
  /about            →  About Us  (brand story lives here)
  /products         →  Products  (grid with size + price + WA buy)
  /products/[slug]  →  Product Detail
  /quality          →  Quality & Certifications
  /contact          →  Contact Us

ADMIN PAGES (protected — Supabase Auth):
  /admin/login      →  Admin login
  /admin            →  Dashboard
  /admin/products   →  Manage products
  /admin/products/[id] → Edit product + variants
  /admin/enquiries  →  View contact form submissions
  /admin/orders     →  View WhatsApp order clicks
  /admin/claims     →  Toggle quality claims on/off

API ROUTES:
  POST /api/log-order  →  Save WA click to Supabase
  POST /api/enquiry    →  Save contact form to Supabase
```

---

## B3. Complete Folder Structure

```
kuragold-spices/
│
├── app/                               ← Next.js App Router root
│   ├── layout.tsx                     ← Root: fonts, metadata, SplashScreen
│   ├── page.tsx                       ← Home page
│   │
│   ├── about/
│   │   └── page.tsx                   ← About Us (story + stats + WA info)
│   │
│   ├── products/
│   │   ├── page.tsx                   ← Products grid
│   │   └── [slug]/
│   │       └── page.tsx               ← Product detail page
│   │
│   ├── quality/
│   │   └── page.tsx                   ← Quality + certifications
│   │
│   ├── contact/
│   │   └── page.tsx                   ← Contact form + WA CTA
│   │
│   ├── admin/
│   │   ├── layout.tsx                 ← Auth guard (redirect if not logged in)
│   │   ├── login/
│   │   │   └── page.tsx               ← Admin login form
│   │   ├── page.tsx                   ← Admin dashboard
│   │   ├── products/
│   │   │   ├── page.tsx               ← List all products
│   │   │   └── [id]/
│   │   │       └── page.tsx           ← Edit product + variants + prices
│   │   ├── enquiries/
│   │   │   └── page.tsx               ← View contact form submissions
│   │   ├── orders/
│   │   │   └── page.tsx               ← View WhatsApp order clicks
│   │   └── claims/
│   │       └── page.tsx               ← Toggle quality claims on/off
│   │
│   └── api/
│       ├── log-order/
│       │   └── route.ts               ← POST: log WA order click
│       └── enquiry/
│           └── route.ts               ← POST: save contact form
│
├── components/
│   │
│   ├── layout/
│   │   ├── SplashScreen.tsx           ← Maroon → logo → brand → fade
│   │   ├── Navbar.tsx                 ← Sticky, 5 links, WA button, mobile
│   │   ├── AnnouncementBar.tsx        ← Scrolling ticker (maroon bg)
│   │   ├── Footer.tsx                 ← Links, contact, WA, copyright
│   │   └── WhatsAppFloat.tsx          ← Fixed green bubble bottom-right
│   │
│   ├── home/
│   │   ├── Hero.tsx                   ← Maroon hero + headline + product stack
│   │   ├── TrustBar.tsx               ← Badges row (conditional on claims)
│   │   ├── AboutPreview.tsx           ← Short about teaser on home
│   │   ├── ProductsPreview.tsx        ← 4 product cards on home
│   │   └── QualityPreview.tsx         ← Why Kura Gold cards
│   │
│   ├── products/
│   │   ├── ProductCard.tsx            ← Card: image + name + sizes + WA buy
│   │   ├── ProductGrid.tsx            ← Responsive grid of ProductCards
│   │   ├── SizeSelector.tsx           ← Size buttons (updates price + WA msg)
│   │   ├── PriceDisplay.tsx           ← Shows ₹ based on selected size
│   │   └── BuyOnWhatsApp.tsx          ← Green button → log + open WA
│   │
│   ├── contact/
│   │   ├── ContactForm.tsx            ← Form → POST /api/enquiry
│   │   └── ContactInfo.tsx            ← Phone, email, location, hours
│   │
│   └── ui/
│       ├── Button.tsx                 ← Primary, outline, WhatsApp variants
│       ├── SectionLabel.tsx           ← Gold label: "Our Range" style
│       ├── GoldRule.tsx               ← Decorative gold line divider
│       └── ClaimBadge.tsx             ← Shows claim only if is_confirmed=true
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts                  ← Browser Supabase client
│   │   ├── server.ts                  ← Server Supabase client
│   │   └── admin.ts                   ← Service role client (admin only)
│   ├── whatsapp.ts                    ← Build wa.me URLs with pre-filled text
│   └── constants.ts                   ← WA number, shipping rules, colours
│
├── types/
│   └── index.ts                       ← All TypeScript interfaces
│
├── hooks/
│   ├── useProducts.ts                 ← Fetch all products + variants
│   ├── useSelectedVariant.ts          ← Track selected size per product card
│   └── useClaims.ts                   ← Fetch confirmed site_claims
│
├── public/
│   ├── logo.webp                      ← Circular Kura Gold logo
│   ├── products/
│   │   ├── chilli.webp
│   │   ├── haldi.webp
│   │   ├── dhania.webp
│   │   └── masala_group.webp
│   └── badges/
│       ├── fssai.webp
│       ├── telangana.webp
│       └── make_in_india.webp
│
├── styles/
│   └── globals.css                    ← CSS variables + base resets
│
├── .env.local                         ← Secret keys — NEVER commit
├── .gitignore
├── next.config.js
├── tailwind.config.ts
└── package.json
```

---

## B4. Database Schema (Supabase)

### Complete SQL — Run in Supabase SQL Editor

```sql
-- ══════════════════════════════════════════════════
-- TABLE 1: products
-- ══════════════════════════════════════════════════
CREATE TABLE products (
  id           UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  name         TEXT    NOT NULL,
  slug         TEXT    NOT NULL UNIQUE,
  tagline      TEXT,
  description  TEXT    DEFAULT '[To be confirmed by Sir]',
  image_url    TEXT,
  category     TEXT    DEFAULT 'spice',
  is_active    BOOLEAN DEFAULT true,
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now()
);

-- ══════════════════════════════════════════════════
-- TABLE 2: product_variants
-- One row per size per product
-- ══════════════════════════════════════════════════
CREATE TABLE product_variants (
  id           UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id   UUID    REFERENCES products(id) ON DELETE CASCADE,
  size_label   TEXT    NOT NULL,         -- '50g', '100g', '200g', '500g'
  price_inr    NUMERIC(8,2) NOT NULL,
  is_active    BOOLEAN DEFAULT true,
  sort_order   INTEGER DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- ══════════════════════════════════════════════════
-- TABLE 3: enquiries
-- Saved from the Contact Us form
-- ══════════════════════════════════════════════════
CREATE TABLE enquiries (
  id            UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  name          TEXT    NOT NULL,
  email         TEXT,
  phone         TEXT,
  enquiry_type  TEXT    DEFAULT 'General Enquiry',
  message       TEXT    NOT NULL,
  is_read       BOOLEAN DEFAULT false,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- ══════════════════════════════════════════════════
-- TABLE 4: whatsapp_orders
-- Logged each time someone clicks "Buy on WhatsApp"
-- Helps track which products get most interest
-- ══════════════════════════════════════════════════
CREATE TABLE whatsapp_orders (
  id            UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  product_name  TEXT    NOT NULL,
  size_label    TEXT    NOT NULL,
  price_inr     NUMERIC(8,2) NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- ══════════════════════════════════════════════════
-- TABLE 5: site_claims
-- Controls which quality claims / badges appear on site
-- All start HIDDEN (is_confirmed = false)
-- Javeria enables them from admin when Sir confirms
-- ══════════════════════════════════════════════════
CREATE TABLE site_claims (
  key           TEXT    PRIMARY KEY,
  label         TEXT    NOT NULL,
  value         TEXT,
  is_confirmed  BOOLEAN DEFAULT false,
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- ══════════════════════════════════════════════════
-- TABLE 6: site_settings
-- Editable global configuration
-- ══════════════════════════════════════════════════
CREATE TABLE site_settings (
  key           TEXT    PRIMARY KEY,
  value         TEXT    NOT NULL,
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- ══════════════════════════════════════════════════
-- TABLE 7: orders
-- Not used in Phase 1 — ready for Phase 2 payment
-- ══════════════════════════════════════════════════
CREATE TABLE orders (
  id               UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  product_name     TEXT    NOT NULL,
  size_label       TEXT    NOT NULL,
  price_inr        NUMERIC(8,2) NOT NULL,
  shipping_inr     NUMERIC(8,2) DEFAULT 60,
  total_inr        NUMERIC(8,2) NOT NULL,
  customer_name    TEXT,
  customer_phone   TEXT,
  customer_address TEXT,
  payment_status   TEXT    DEFAULT 'pending',
  payment_method   TEXT    DEFAULT 'whatsapp_manual',
  order_status     TEXT    DEFAULT 'enquiry',
  created_at       TIMESTAMPTZ DEFAULT now()
);

-- ══════════════════════════════════════════════════
-- RLS: Enable Row Level Security
-- ══════════════════════════════════════════════════
ALTER TABLE products          ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants  ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries         ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_orders   ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_claims       ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings     ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders            ENABLE ROW LEVEL SECURITY;

-- Public can read active products
CREATE POLICY "pub_read_products"
  ON products FOR SELECT USING (is_active = true);

CREATE POLICY "pub_read_variants"
  ON product_variants FOR SELECT USING (is_active = true);

-- Public can read ONLY confirmed claims
CREATE POLICY "pub_read_confirmed_claims"
  ON site_claims FOR SELECT USING (is_confirmed = true);

CREATE POLICY "pub_read_settings"
  ON site_settings FOR SELECT USING (true);

-- Public can submit enquiries
CREATE POLICY "pub_insert_enquiry"
  ON enquiries FOR INSERT WITH CHECK (true);

-- Public can log WA order clicks
CREATE POLICY "pub_insert_wa_order"
  ON whatsapp_orders FOR INSERT WITH CHECK (true);

-- Admin full access
CREATE POLICY "admin_all_products"
  ON products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all_variants"
  ON product_variants FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all_enquiries"
  ON enquiries FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all_orders_log"
  ON whatsapp_orders FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all_claims"
  ON site_claims FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all_settings"
  ON site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all_orders"
  ON orders FOR ALL USING (auth.role() = 'authenticated');

-- ══════════════════════════════════════════════════
-- SEED DATA
-- ══════════════════════════════════════════════════

-- Site settings
INSERT INTO site_settings (key, value) VALUES
  ('shipping_charge',      '60'),
  ('free_shipping_above',  '499'),
  ('whatsapp_number',      '918978726655'),
  ('site_name',            'Kura Gold Spices'),
  ('tagline',              'Where Quality Comes to Life');

-- Claims (all hidden — enable from admin after Sir confirms)
INSERT INTO site_claims (key, label, value, is_confirmed) VALUES
  ('natural',       '100% Natural Ingredients',     '100% Natural Ingredients',    false),
  ('no_colour',     'No Added Colour',               'No Added Colour',             false),
  ('no_preserv',    'No Preservatives',              'No Preservatives',            false),
  ('farm_sourced',  'Farm Sourced from Telangana',   'Farm Sourced · Telangana',    false),
  ('small_batch',   'Small-Batch Processing',        'Small-Batch Processing',      false),
  ('fssai',         'FSSAI Certified Badge',         '23626030003544',              false),
  ('telangana',     'Govt. of Telangana Badge',      'Govt. of Telangana',          false),
  ('make_india',    'Make in India Badge',           'Make in India',               false);

-- Products
INSERT INTO products (name, slug, tagline, category) VALUES
  ('Red Chilli Powder', 'red-chilli-powder', 'Bold Heat',       'spice'),
  ('Haldi Powder',      'haldi-powder',      'Golden Wellness', 'spice'),
  ('Coriander Powder',  'coriander-powder',  'Earthy Aroma',    'spice'),
  ('Garam Masala',      'garam-masala',      'Signature Blend', 'masala');

-- Variants: Red Chilli Powder
WITH p AS (SELECT id FROM products WHERE slug='red-chilli-powder')
INSERT INTO product_variants (product_id, size_label, price_inr, sort_order) VALUES
  ((SELECT id FROM p),'50g', 35, 1),
  ((SELECT id FROM p),'100g',54, 2),
  ((SELECT id FROM p),'200g',120,3),
  ((SELECT id FROM p),'500g',275,4);

-- Variants: Haldi Powder
WITH p AS (SELECT id FROM products WHERE slug='haldi-powder')
INSERT INTO product_variants (product_id, size_label, price_inr, sort_order) VALUES
  ((SELECT id FROM p),'50g', 33, 1),
  ((SELECT id FROM p),'100g',49, 2),
  ((SELECT id FROM p),'200g',110,3);

-- Variants: Coriander Powder
WITH p AS (SELECT id FROM products WHERE slug='coriander-powder')
INSERT INTO product_variants (product_id, size_label, price_inr, sort_order) VALUES
  ((SELECT id FROM p),'100g',37,1),
  ((SELECT id FROM p),'200g',74,2);

-- Variants: Garam Masala
WITH p AS (SELECT id FROM products WHERE slug='garam-masala')
INSERT INTO product_variants (product_id, size_label, price_inr, sort_order) VALUES
  ((SELECT id FROM p),'100g',64, 1),
  ((SELECT id FROM p),'200g',120,2);
```

---

## B5. Environment Variables

```bash
# .env.local — Add to root of Next.js project
# ⚠️ NEVER commit this file to Git

# ── Supabase ──────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# ── Business ──────────────────────────────────
NEXT_PUBLIC_WA_NUMBER=918978726655
NEXT_PUBLIC_SHIPPING_CHARGE=60
NEXT_PUBLIC_FREE_SHIPPING_ABOVE=499

# ── Site ──────────────────────────────────────
NEXT_PUBLIC_SITE_URL=https://kuragoldspices.com
NEXT_PUBLIC_SITE_NAME=Kura Gold Spices
```

---

# PART C — PHASE-WISE IMPLEMENTATION

---

## ⚡ PHASE 0 — Pre-Development Setup
### Duration: 2 Days | Before any code is written

---

### Phase 0 Objectives
Set up all tools, accounts, and infrastructure before writing a single line of code. This prevents delays and blockers during development.

---

### 0.1 — Supabase Project Setup

```
Step 1  →  Go to supabase.com → Sign up / Login
Step 2  →  Click "New Project"
           Name        :  kuragold-spices
           Password    :  [strong password — save securely]
           Region      :  South Asia (Mumbai) — nearest to Hyderabad
Step 3  →  Wait for project to provision (~2 minutes)
Step 4  →  Go to SQL Editor → New Query
           Paste ALL SQL from Section B4 → Click Run
           Verify: all 7 tables created, seed data inserted
Step 5  →  Go to Settings → API
           Copy and save:
             Project URL     → NEXT_PUBLIC_SUPABASE_URL
             anon key        → NEXT_PUBLIC_SUPABASE_ANON_KEY
             service_role key → SUPABASE_SERVICE_ROLE_KEY
Step 6  →  Go to Authentication → Users → Invite User
           Enter Javeria's email address
           She receives a link to set her password
           This is the ONLY admin account
Step 7  →  Go to Storage → New Bucket
           Name        :  product-images
           Visibility  :  Public
           Upload:
             logo.webp
             chilli.webp
             haldi.webp
             dhania.webp
             masala_group.webp
             fssai.webp
             telangana.webp
             make_in_india.webp
Step 8  →  Copy public URLs for each image
           Format: https://[id].supabase.co/storage/v1/object/public/product-images/[filename]
Step 9  →  Update image_url in products table for each product using SQL:
           UPDATE products SET image_url='[url]' WHERE slug='red-chilli-powder';
           (repeat for all 4 products)
```

---

### 0.2 — Next.js Project Setup

```bash
# Create project
npx create-next-app@latest kuragold-spices \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --import-alias="@/*"

cd kuragold-spices

# Install all required packages
npm install @supabase/supabase-js @supabase/ssr
npm install react-hook-form zod @hookform/resolvers
npm install clsx tailwind-merge
npm install lucide-react

# Create .env.local and paste keys from Supabase
touch .env.local
```

---

### 0.3 — Base Configuration Files

**`styles/globals.css`** — CSS variables for Heritage Royale theme:
```css
:root {
  --maroon:   #6E0D0D;
  --crimson:  #8B1A1A;
  --cdk:      #5C0E0E;
  --gold:     #C8962A;
  --gold-l:   #E8B84B;
  --ivory:    #FAF6EE;
  --cream:    #F2EAD8;
  --cream2:   #E8DCC8;
  --text:     #2A1A0A;
  --text-m:   #7A5A3A;
  --border:   #DDD0B0;
  --wa:       #25D366;
  --wa-dk:    #1aab57;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { font-family: 'Lato', sans-serif; background: var(--ivory); }
```

**`lib/constants.ts`**:
```typescript
export const WA_NUMBER          = process.env.NEXT_PUBLIC_WA_NUMBER ?? '918978726655'
export const SHIPPING_CHARGE    = Number(process.env.NEXT_PUBLIC_SHIPPING_CHARGE ?? 60)
export const FREE_SHIP_ABOVE    = Number(process.env.NEXT_PUBLIC_FREE_SHIPPING_ABOVE ?? 499)
export const SITE_NAME          = 'Kura Gold Spices'
export const TAGLINE            = 'Where Quality Comes to Life'
export const CONTACT_PHONE      = '+91 99868 92121'
export const CONTACT_WA         = '+91 89787 26655'
export const CONTACT_EMAIL_GEN  = 'care@kuragoldspices.com'
export const CONTACT_EMAIL_SUP  = 'support@kuragoldspices.com'
export const LOCATION           = 'Hyderabad, Telangana, India'
export const HOURS              = 'Open 24 Hours'
export const FSSAI_LIC          = '23626030003544'
```

**`lib/whatsapp.ts`**:
```typescript
import { WA_NUMBER } from './constants'

export function buildOrderMessage(product: string, size: string, price: number): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
`Hi Javeria! 🌶️

I want to order from *Kura Gold Spices*:

📦 Product : ${product}
⚖️  Size    : ${size}
💰 Price   : ₹${price}

Please confirm my order.`
  )}`
}

export function buildGeneralMessage(msg: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
}
```

**`types/index.ts`**:
```typescript
export interface ProductVariant {
  id: string
  product_id: string
  size_label: string
  price_inr: number
  is_active: boolean
  sort_order: number
}

export interface Product {
  id: string
  name: string
  slug: string
  tagline: string
  description: string
  image_url: string
  category: string
  is_active: boolean
  product_variants: ProductVariant[]
}

export interface Enquiry {
  id: string
  name: string
  email: string
  phone: string
  enquiry_type: string
  message: string
  is_read: boolean
  created_at: string
}

export interface WhatsAppOrder {
  id: string
  product_name: string
  size_label: string
  price_inr: number
  created_at: string
}

export interface SiteClaim {
  key: string
  label: string
  value: string
  is_confirmed: boolean
}

// Ready for Phase 2 payment — do not implement now
export interface Order {
  id: string
  product_name: string
  size_label: string
  price_inr: number
  shipping_inr: number
  total_inr: number
  customer_name?: string
  customer_phone?: string
  payment_status: 'pending' | 'paid' | 'failed'
  payment_method: 'whatsapp_manual' | 'razorpay' | 'upi'
  order_status: 'enquiry' | 'confirmed' | 'shipped' | 'delivered'
  created_at: string
}
```

---

### Phase 0 Deliverables Checklist
```
□  Supabase project created (Mumbai region)
□  All 7 tables created
□  All RLS policies applied
□  All seed data inserted and verified
□  Admin user (Javeria) created
□  All 8 images uploaded to Supabase Storage
□  image_url updated in products table for all 4 products
□  Next.js project created with TypeScript + Tailwind
□  All npm packages installed
□  .env.local created with correct keys
□  CSS variables configured
□  constants.ts, whatsapp.ts, types/index.ts created
□  Project runs on localhost:3000 without errors
```

---

## 🏗️ PHASE 1 — Foundation & Layout
### Duration: 4–5 Days

---

### Phase 1 Objectives
Build the global shell that wraps every page: splash screen, navigation, announcement bar, footer, and floating WhatsApp button. After this phase, every page has a consistent, finished outer frame.

---

### 1.1 — Supabase Client Files

**`lib/supabase/client.ts`** (browser):
```typescript
import { createBrowserClient } from '@supabase/ssr'

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
```

**`lib/supabase/server.ts`** (server components):
```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createClient = () => {
  const cookieStore = cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (n) => cookieStore.get(n)?.value,
        set: (n, v, o) => cookieStore.set({ name: n, value: v, ...o }),
        remove: (n, o) => cookieStore.set({ name: n, value: '', ...o }),
      },
    }
  )
}
```

---

### 1.2 — SplashScreen Component

**`components/layout/SplashScreen.tsx`**

Behaviour (as confirmed by Sir):
```
0.0s → 1.2s   :  Full plain maroon. Nothing visible.
1.2s → 2.3s   :  Logo fades in (opacity 0 → 1)
2.3s → 3.2s   :  "KURA GOLD SPICES" rises from below (translateY 14px → 0)
3.2s → 4.5s   :  Tagline fades in + gold progress bar animates
5.0s           :  Entire splash fades out
5.7s           :  Splash removed from DOM
```

Key implementation notes:
- Uses `useEffect` + `setTimeout` for phase timing
- CSS `@keyframes` for smooth animations
- `localStorage.setItem('splashSeen', 'true')` to skip on page refresh (optional)
- `position: fixed; inset: 0; z-index: 9999` to cover entire screen

---

### 1.3 — AnnouncementBar Component

**`components/layout/AnnouncementBar.tsx`**

```
Design     :  Maroon background (#5C0E0E), gold text
Content    :  Scrolling marquee animation
Text       :  "Kura Gold Spices · Order on WhatsApp: +91 89787 26655 · 
              Shipping ₹60 · Free Shipping Above ₹499"
Animation  :  Continuous left-scroll using CSS @keyframes
Height     :  36px
```

---

### 1.4 — Navbar Component

**`components/layout/Navbar.tsx`**

```
Background       :  Deep maroon #5C0E0E
Border-bottom    :  1px solid rgba(200,150,42,0.2)
Shadow           :  0 2px 20px rgba(0,0,0,0.3)
Position         :  sticky top-0 z-index 800

Left side:
  - Circular logo image (54×54px, gold border ring)
  - "Kura Gold Spices" in Playfair Display gold
  - "Where Quality Comes to Life" in small uppercase muted

Center/Right links (desktop):
  Home | About Us | Products | Quality | Contact Us
  - Font: Lato 700, 0.73rem, uppercase, letter-spacing 1px
  - Colour: muted gold #c9a87a
  - Hover: bright gold #E8B84B, gold bottom border 3px
  - Active: same as hover

Far right (desktop):
  WhatsApp "Order" button — green #25D366
  - Rounded pill shape
  - WhatsApp SVG icon + "Order on WhatsApp" text
  - onClick → opens wa.me link

Mobile (≤1024px):
  - Hide desktop links
  - Show hamburger (3 gold lines)
  - onClick → full-screen maroon overlay
  - Overlay shows all 5 links + large WA button
  - Links close overlay on click
```

---

### 1.5 — Footer Component

**`components/layout/Footer.tsx`**

```
Background   :  Deep maroon #5C0E0E
Padding      :  64px 60px 28px

4-column grid:
  Column 1 (2fr) — Brand:
    Logo (circular, gold border)
    Italic tagline: "Where Quality Comes to Life"
    Description text
    Green WhatsApp "Order" button

  Column 2 — Navigation:
    Home, About Us, Products, Quality, Contact Us

  Column 3 — Products:
    Red Chilli Powder, Haldi Powder,
    Coriander Powder, Garam Masala

  Column 4 — Contact:
    +91 89787 26655
    +91 99868 92121
    care@kuragoldspices.com
    Hyderabad, Telangana
    Open 24 Hours

Bottom bar:
  © 2026 Kura Gold Spices | JK Enterprises
  FSSAI Lic. 23626030003544 | Made in India 🇮🇳

Mobile: stack to 2 columns, then 1 column
```

---

### 1.6 — WhatsApp Float Button

**`components/layout/WhatsAppFloat.tsx`**

```
Position     :  fixed bottom-28px right-28px z-600
Shape        :  Circle 58×58px
Background   :  #25D366 (WhatsApp green)
Shadow       :  0 4px 20px rgba(37,211,102,0.5)
Icon         :  WhatsApp SVG 28×28px white
Hover        :  scale(1.1), stronger shadow
Tooltip      :  "Order on WhatsApp" appears on hover (left side)
onClick      :  Opens wa.me with general message
```

---

### 1.7 — Root Layout

**`app/layout.tsx`**:
```
- Import Google Fonts: Playfair Display + Lato + Cormorant Garamond
- SEO metadata: title, description, og:image, og:title
- Render: <SplashScreen> + <AnnouncementBar> + <Navbar> + {children} + <Footer> + <WhatsAppFloat>
- Body class: font-lato, bg-ivory, text-text
```

---

### Phase 1 Deliverables Checklist
```
□  Supabase browser client created
□  Supabase server client created
□  SplashScreen: maroon → logo → name → tagline → fade (5s total)
□  AnnouncementBar: scrolling, maroon bg, gold text
□  Navbar: logo + 5 links + WA button + active states + mobile
□  Footer: 4-column grid + WA button + copyright
□  WhatsAppFloat: fixed green bubble + tooltip
□  Root layout: fonts loaded, metadata set, all layout components wrapped
□  All components render without errors on localhost:3000
□  Mobile hamburger menu opens/closes correctly
□  Active link highlights correctly on scroll
□  WhatsApp float button opens correct wa.me URL
```

---

## 🏠 PHASE 2 — Home Page
### Duration: 3–4 Days

---

### Phase 2 Objectives
Build the complete Home page (`app/page.tsx`) with all sections. This is the most important page — it's what visitors see first after the splash screen.

---

### Home Page Sections (in order):

#### Section 1 — Hero

```
Background   :  Maroon gradient (135deg, #5C0E0E → #7A1515 → #3D0A0A)
Pattern      :  Subtle triangle SVG pattern + radial gold glow
Min-height   :  88vh
Layout       :  Left content + Right product images

Left content:
  Badge     :  "✦ 100% Pure & Natural | No Added Colour"  [shown only if claim confirmed]
  Headline  :  "The Gold Standard of Indian Spices."
              Playfair Display 900, clamp(2.8rem, 6vw, 5rem), ivory
              "Gold" in italic gold
  Subtext   :  Cormorant Garamond italic, 1.25rem, muted gold
  Pills     :  4 small pills (only confirmed claims shown)
  Buttons   :
    [Explore Products]   → /products  (gold fill)
    [Buy on WhatsApp]    → wa.me link  (green)

Right side (desktop only):
  4 product pouches stacked/fanned
  Each: image + product name below
  Hover: translateY(-10px) lift effect
  Images from Supabase Storage
```

#### Section 2 — Trust Bar

```
Background   :  Cream #F2EAD8
Top border   :  3px solid gold
Layout       :  Horizontal flex, centered, gap 48px

Items shown (only if is_confirmed = true in site_claims):
  [FSSAI logo] FSSAI Lic. 23626030003544
  ✦
  [Telangana logo] Govt. of Telangana
  ✦
  [Make in India logo] Make in India
  ✦
  🏢 JK Enterprises · Hyderabad

If ALL claims are unconfirmed → trust bar still shows
  "JK Enterprises · Hyderabad, Telangana · Open 24 Hours"
  (never show a completely empty trust bar)
```

#### Section 3 — About Preview

```
Layout       :  Text left (60%) + Stats right (40%) — same as Heritage Royale template
Background   :  White

Left:
  Section label: "About Us"
  Heading: "Rooted in Tradition, Refined for Today."
  Gold rule divider
  Short paragraph about JK Enterprises + Javeria + Hyderabad
  4 bullet points (confirmed facts only)
  [Read Our Story] → /about button

Right:
  Maroon gradient background
  2×2 grid of stat boxes:
    100%  Pure Natural
    4+    Product Lines
    0     Added Colours
    24h   WhatsApp Support
```

#### Section 4 — Products Preview

```
Heading      :  "Pure Spices. Real Flavour."
Background   :  Ivory
Layout       :  4-column product card grid
Cards        :  Same as full ProductCard component
Show         :  All 4 confirmed products
Each card    :
  - Coloured image area (red/yellow/green/orange per product)
  - Product name + tagline
  - Size selector (buttons from Supabase)
  - Price display (updates on size select)
  - "Buy on WhatsApp" green button

CTA below grid: [View All Products] → /products
```

#### Section 5 — Quality Preview

```
Background   :  Deep maroon #5C0E0E
Layout       :  3×2 grid of quality cards
Section lbl  :  "Why Choose Us" (gold)
Heading      :  "Purity is Our Promise" (ivory)

6 cards (show confirmed claims only):
  🌿 Natural Ingredients     🏅 FSSAI Certified
  🌾 Farm-Fresh Sourcing     🇮🇳 Made in India
  📦 Multiple Pack Sizes     💬 24h WhatsApp Support

[View Quality Commitments] → /quality button
```

---

### API Routes (build in Phase 2)

**`app/api/log-order/route.ts`**:
```typescript
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { productName, size, price } = await req.json()
  const supabase = createClient()
  await supabase.from('whatsapp_orders').insert({
    product_name: productName,
    size_label: size,
    price_inr: price,
  })
  return NextResponse.json({ ok: true })
}
```

**`app/api/enquiry/route.ts`**:
```typescript
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const supabase = createClient()
  const { error } = await supabase.from('enquiries').insert(body)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
```

---

### Phase 2 Deliverables Checklist
```
□  Hero section: maroon gradient, headline, buttons, product pouches
□  Trust bar: conditional badges from Supabase site_claims
□  About preview: text + stats grid (2×2 maroon)
□  Products preview: 4 cards with size selector + price + WA button
□  Quality preview: 6 cards on maroon background
□  API route: POST /api/log-order → saves to Supabase
□  API route: POST /api/enquiry → saves to Supabase
□  All sections alternate backgrounds correctly
□  Home page is fully responsive (mobile, tablet, desktop)
□  All WhatsApp links open with correct pre-filled messages
□  Clicking size updates price and WA message text correctly
```

---

## 🛍️ PHASE 3 — Products & Ordering
### Duration: 4–5 Days

---

### Phase 3 Objectives
Build the complete Products experience — the grid page, the individual product detail page, and the complete size selector → price → WhatsApp ordering system.

---

### 3.1 — Products Grid Page (`/products`)

```
Heading      :  "Pure Spices. Real Flavour."
Sub          :  Short intro paragraph
Layout       :  4-column grid (2-col tablet, 1-col mobile)

Data fetch   :  Server component — fetch from Supabase at request time
               SELECT products.*, product_variants.*
               WHERE products.is_active = true
               ORDER BY sort_order

Each card includes:
  - Coloured background image area
  - "Pure" / "Wellness" badge top-left
  - Product image from Supabase Storage
  - Category tag (e.g. "Bold Heat") in gold
  - Product name in Playfair Display
  - Description (placeholder if not confirmed)
  - SizeSelector: buttons for each confirmed size
  - PriceDisplay: ₹ amount for selected size
  - Shipping note: "₹60 shipping · FREE above ₹499"
  - BuyOnWhatsApp button (full width, green)

Hover effect on card:
  - translateY(-5px)
  - Box shadow increases
  - Gold bottom border (3px, scaleX 0→1)
  - Product image scales up slightly
```

---

### 3.2 — SizeSelector Component

```typescript
// components/products/SizeSelector.tsx
// Props: variants, selectedId, onSelect

// Renders: [50g] [100g] [200g] [500g]
// Active size:   gold border + gold background tint
// Inactive size: grey border, white background
// On click → call onSelect(variant) → parent updates price + WA url
```

---

### 3.3 — BuyOnWhatsApp Component

```typescript
// components/products/BuyOnWhatsApp.tsx
// Props: productName, size, price

// On click:
//   1. fetch('/api/log-order', { method: 'POST', body: { productName, size, price } })
//   2. window.open(buildOrderMessage(productName, size, price), '_blank')

// Pre-filled WhatsApp message:
//   "Hi Javeria! 🌶️
//    I want to order from Kura Gold Spices:
//    📦 Product : Red Chilli Powder
//    ⚖️  Size    : 100g
//    💰 Price   : ₹54
//    Please confirm my order."
```

---

### 3.4 — Product Detail Page (`/products/[slug]`)

```
Layout       :  2-column (image left, details right)

Left column:
  - Large product image (from Supabase Storage)
  - Thumbnail strip (if multiple images added later)

Right column:
  - Category badge (e.g. "Spice Powder")
  - Product name (large, Playfair Display)
  - Tagline in italic gold
  - Description (placeholder if not confirmed)
  - Divider line
  - Size + Price section:
      SizeSelector (horizontal buttons)
      PriceDisplay (large ₹ amount)
      Shipping note
  - BuyOnWhatsApp (large, full-width green button)
  - Product highlights (confirmed claims only)
  - Quality badges (confirmed only)

SEO:
  - generateMetadata() function: title = "Red Chilli Powder | Kura Gold Spices"
  - og:image = product image URL
  - description = product tagline + description
```

---

### 3.5 — useProducts Hook

```typescript
// hooks/useProducts.ts
export async function getProducts(): Promise<Product[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('products')
    .select('*, product_variants(*)')
    .eq('is_active', true)
    .order('created_at')
  return data ?? []
}
```

---

### Phase 3 Deliverables Checklist
```
□  Products grid page: all 4 products from Supabase
□  SizeSelector: correct sizes per product, updates on click
□  PriceDisplay: correct price per size, updates on click
□  BuyOnWhatsApp: logs to Supabase + opens WA with correct message
□  Shipping note visible on every product card
□  Product detail page: /products/red-chilli-powder working
□  Product detail page: /products/haldi-powder working
□  Product detail page: /products/coriander-powder working
□  Product detail page: /products/garam-masala working
□  SEO metadata generated for each product page
□  generateStaticParams() implemented for all slugs
□  All product images load from Supabase Storage
□  Mobile layout: cards stack to 1 column
□  Tablet layout: 2 columns
□  Desktop layout: 4 columns
```

---

## 📄 PHASE 4 — Inner Pages
### Duration: 4–5 Days

---

### Phase 4 Objectives
Build the remaining public pages: About Us, Quality, and Contact Us.

---

### 4.1 — About Us Page (`/about`)

```
URL          :  /about
Nav label    :  About Us

Contains:
  Section 1 — Hero banner:
    Maroon background, "About Kura Gold Spices" heading
    Short tagline

  Section 2 — Brand Story (side by side):
    Left: Large product image or brand visual
    Right: Full story text
      - Who is JK Enterprises
      - Javeria and the WhatsApp business
      - Hyderabad, Telangana location
      - What inspired the brand
      - The mission: honest spices
      - Quote: "Where Quality Comes to Life"
    [placeholder sections for unconfirmed details]

  Section 3 — Stats (4 boxes):
    100% | Pure Natural
    4+   | Product Lines
    0    | Added Colours
    24h  | WhatsApp Support

  Section 4 — Values (3 cards):
    Honesty · Quality · Community
    [content placeholder until Sir confirms messaging]

  Section 5 — WhatsApp Contact Block:
    Javeria (JK Enterprises)
    +91 89787 26655
    Hyderabad, Telangana · Open 24 Hours
    [Chat on WhatsApp] button

  Section 6 — CTA:
    "Ready to taste the difference?"
    [Shop Products] → /products
```

---

### 4.2 — Quality Page (`/quality`)

```
URL          :  /quality
Nav label    :  Quality

Important:   Only show claims where is_confirmed = true in Supabase
             Fetch site_claims at request time (server component)

Contains:
  Section 1 — Page Hero:
    Maroon background
    "Our Quality Promise" heading

  Section 2 — Quality Commitments:
    6 cards (same as home quality preview but expanded with more text)
    Only show claims that are confirmed

  Section 3 — Certifications:
    Title: "Certified. Verified. Trusted."
    3 certification blocks (show only if is_confirmed = true):
      [FSSAI badge] FSSAI Certified · Lic. 23626030003544
      [Telangana badge] Govt. of Telangana
      [Make in India badge] Make in India
    If none confirmed: show "Certifications coming soon" placeholder

  Section 4 — Process (if Sir confirms info):
    "How we ensure quality"
    Steps: Source → Process → Test → Pack → Deliver
    [Placeholder until Sir provides process details]

  Section 5 — CTA:
    "Shop our pure spice range"
    [Shop Now] → /products
```

---

### 4.3 — Contact Us Page (`/contact`)

```
URL          :  /contact
Nav label    :  Contact Us

Layout       :  2-column grid

Left column — Contact Information:
  Section label: "Get in Touch"
  Heading: "We'd Love to Hear from You"
  Description: "For orders, queries, and wholesale..."

  Contact cards (4 cards):
    📞 Call / WhatsApp  :  +91 89787 26655
    📞 Phone            :  +91 99868 92121
    ✉️  General         :  care@kuragoldspices.com
    ✉️  Support         :  support@kuragoldspices.com
    📍 Location         :  Hyderabad, Telangana, India
    🕐 Hours            :  Open 24 Hours

  Large WhatsApp CTA block (green background):
    WhatsApp icon (large)
    "Place Order on WhatsApp"
    "Tap to chat with Javeria directly"
    → Opens wa.me/918978726655

Right column — Contact Form:
  Title: "Send a Message"
  Fields:
    Full Name *
    Phone Number
    Email Address *
    Enquiry Type (dropdown):
      General Enquiry
      Product Query
      Wholesale / Bulk Order
      Customer Support
    Message *
  Submit button: "Send Message ✦" (gold)
  On submit:
    Validate with Zod
    POST /api/enquiry
    Show success: "Thank you! We will contact you within 24 hours."
    Reset form
```

---

### Phase 4 Deliverables Checklist
```
□  About Us page: full brand story + stats + values + WA block
□  Quality page: claims shown ONLY if is_confirmed = true in Supabase
□  Quality page: certification badges shown ONLY if is_confirmed = true
□  Quality page: graceful placeholder when no claims confirmed
□  Contact Us page: 4 contact info cards
□  Contact Us page: large WhatsApp order CTA block
□  Contact Us page: form with validation (React Hook Form + Zod)
□  Contact form submission saved to Supabase enquiries table
□  Form shows success message after submit
□  Form resets after successful submit
□  All inner pages have correct SEO metadata
□  All pages fully responsive
```

---

## ⚙️ PHASE 5 — Admin Panel
### Duration: 5–6 Days

---

### Phase 5 Objectives
Build the protected admin panel that Javeria can use to manage products, view enquiries, toggle quality claims, and update pricing — all without needing a developer.

---

### 5.1 — Auth Guard (`admin/layout.tsx`)

```typescript
// Check Supabase session on every admin route
// If no session → redirect to /admin/login
// If session exists → render admin UI

export default async function AdminLayout({ children }) {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect('/admin/login')
  return <AdminShell>{children}</AdminShell>
}
```

---

### 5.2 — Admin Login (`/admin/login`)

```
Design:
  - Centred card on maroon background
  - Circular Kura Gold logo at top
  - "Admin Login" heading in Playfair Display
  - Email input
  - Password input
  - [Login] button (gold)
  - Error message if wrong credentials
  - Uses supabase.auth.signInWithPassword()
  - On success → redirect to /admin
```

---

### 5.3 — Admin Dashboard (`/admin`)

```
Shows at a glance:
  ┌──────────────────────────────────────────────┐
  │  Kura Gold Spices · Admin Panel              │
  ├──────────────┬─────────────┬─────────────────┤
  │  Enquiries   │  WA Orders  │  Products       │
  │  Today: 3    │  Today: 12  │  Active: 4      │
  │  Total: 47   │  Total: 238 │  Inactive: 0    │
  ├──────────────┴─────────────┴─────────────────┤
  │  Recent Enquiries (last 5)                   │
  │  Recent WA Order clicks (last 10)            │
  │  Claims Status: 0 of 8 confirmed             │
  └──────────────────────────────────────────────┘

Quick action buttons:
  [Manage Products] [View Enquiries] [Manage Claims] [Logout]
```

---

### 5.4 — Manage Products (`/admin/products`)

```
Table view of all products:
  Name | Category | Sizes | Status | Actions

Actions per product:
  [Edit] → /admin/products/[id]
  [Toggle Active/Inactive]

Add new product button (for future products Sir may add)
```

---

### 5.5 — Edit Product (`/admin/products/[id]`)

```
Form to edit:
  - Product name
  - Slug (auto-generated, editable)
  - Category (spice / masala)
  - Tagline
  - Description (was [TO BE CONFIRMED] — Javeria fills this in)
  - Image URL (or upload new image to Supabase Storage)
  - Active toggle

Variants section:
  Table: Size | Price | Active | Actions
  Inline edit: click price → edit field → save
  Add new variant: [+ Add Size]
  Delete variant: [✕]

Save button → updates Supabase in real-time
```

---

### 5.6 — Claims Management (`/admin/claims`) ← KEY FEATURE

```
This is how Sir's confirmed quality claims go live —
without needing a developer to update code.

Table:
  ┌─────────────────────────────┬─────────────────────────┬─────────┐
  │ Claim                       │ Value shown on site     │ Visible │
  ├─────────────────────────────┼─────────────────────────┼─────────┤
  │ 100% Natural Ingredients    │ 100% Natural            │ ❌ OFF  │
  │ No Added Colour             │ No Added Colour         │ ❌ OFF  │
  │ No Preservatives            │ No Preservatives        │ ❌ OFF  │
  │ Farm Sourced from Telangana │ Farm Sourced · Telangana│ ❌ OFF  │
  │ Small-Batch Processing      │ Small-Batch Processing  │ ❌ OFF  │
  │ FSSAI Certified Badge       │ 23626030003544          │ ❌ OFF  │
  │ Govt. of Telangana Badge    │ Govt. of Telangana      │ ❌ OFF  │
  │ Make in India Badge         │ Make in India           │ ❌ OFF  │
  └─────────────────────────────┴─────────────────────────┴─────────┘

Toggle switch per row:
  OFF → public site does NOT show this claim
  ON  → public site IMMEDIATELY shows this claim

Instructions text on page:
  "Only enable a claim after it has been confirmed by Sir.
   Turning ON a badge will immediately show it on the public website."
```

---

### 5.7 — View Enquiries (`/admin/enquiries`)

```
Table of all contact form submissions:
  Name | Email | Phone | Type | Date | Status | Action

Status: ● Unread (red dot) | ✓ Read (grey)

Click row → expand to see full message

Actions:
  [Mark as Read]
  [Reply on WhatsApp] → opens wa.me/[customer phone] if phone provided
  [Reply by Email]    → opens mailto:[customer email]
```

---

### 5.8 — WhatsApp Orders Log (`/admin/orders`)

```
Table of all "Buy on WhatsApp" button clicks:
  Product | Size | Price | Date/Time

Summary cards:
  Most popular product (by click count)
  Most popular size
  Today's clicks vs yesterday
  Total revenue potential (sum of price × clicks)

Note shown:
  "These are click-through logs only.
   Actual orders are confirmed directly with Javeria via WhatsApp."
```

---

### 5.9 — Admin Navigation Shell

```
Left sidebar (desktop):
  [KG Logo]
  Dashboard
  Products
  Enquiries
  Orders (WA Clicks)
  Claims
  ───────────
  [Logout]

Top bar:
  "Kura Gold Admin" · Logged in as: javeria@...
```

---

### Phase 5 Deliverables Checklist
```
□  Auth guard on all /admin/* routes
□  Admin login page with Supabase Auth
□  Logout functionality
□  Admin dashboard with 3 stat cards
□  Products list page
□  Edit product page: name, description, image, toggle active
□  Edit product variants: inline price editing, add/delete sizes
□  Claims management: toggle on/off per claim
□  Toggling claim immediately updates public site
□  View enquiries: table with expand, mark as read
□  View WA orders: table with summary stats
□  Admin sidebar navigation
□  Admin panel is mobile-accessible for Javeria on phone
```

---

## 🚀 PHASE 6 — QA, SEO & Deployment
### Duration: 3–4 Days

---

### Phase 6 Objectives
Test everything thoroughly, add SEO optimisation, and deploy the live website to kuragoldspices.com.

---

### 6.1 — SEO Optimisation

**`app/layout.tsx` — Root metadata**:
```typescript
export const metadata: Metadata = {
  title: {
    default: 'Kura Gold Spices | Pure & Natural Indian Spices',
    template: '%s | Kura Gold Spices'
  },
  description: 'Kura Gold Spices — pure and natural Indian spices from Hyderabad, Telangana. Order on WhatsApp: +91 89787 26655.',
  keywords: ['kura gold spices', 'pure indian spices', 'hyderabad spices', 'natural spices', 'jk enterprises'],
  openGraph: {
    siteName: 'Kura Gold Spices',
    type: 'website',
    url: 'https://kuragoldspices.com',
    images: [{ url: '/logo.webp' }],
  },
}
```

**`app/sitemap.ts`**:
```typescript
// Auto-generates sitemap for Google
// Includes: /, /about, /products, /products/[slug]×4, /quality, /contact
```

**`app/robots.ts`**:
```typescript
// Allow all crawlers on public pages
// Disallow: /admin/*
```

---

### 6.2 — Performance Checks

```
□  All images use Next.js <Image> component (auto-optimised)
□  All product images have correct width + height props
□  Fonts loaded with next/font/google (no layout shift)
□  SplashScreen removed from DOM after animation (not just hidden)
□  No unused CSS or JS imports
□  Lighthouse score target: Performance ≥ 80, SEO ≥ 90
```

---

### 6.3 — Responsive Testing

Test on these exact screen sizes:

| Device | Width | Must work |
|---|---|---|
| Small phone | 360px | ✓ |
| iPhone 14 | 390px | ✓ |
| Large phone | 430px | ✓ |
| Tablet | 768px | ✓ |
| Small laptop | 1024px | ✓ |
| Desktop | 1280px | ✓ |
| Large desktop | 1440px | ✓ |

---

### 6.4 — Functional Testing

```
□  Splash screen: all 5 phases work correctly (timing)
□  Navbar: all 5 links navigate to correct pages
□  WhatsApp float: opens correct wa.me URL
□  Announcement bar: scrolls continuously
□  Products: size selector updates price on every product
□  Products: WA button opens correct message for each product + size
□  Products: WA click is logged to Supabase
□  Contact form: validates required fields
□  Contact form: saves to Supabase enquiries table
□  Contact form: shows success message
□  Admin login: correct credentials → dashboard
□  Admin login: wrong credentials → error message
□  Admin claims: toggle updates Supabase + public site reflects change
□  Admin enquiries: submissions appear after form submit
□  Admin products: price edit saves to Supabase
□  All WhatsApp messages have correct pre-filled text
□  Shipping note "₹60 | Free above ₹499" visible on products page
```

---

### 6.5 — Deployment Steps

```bash
# Step 1: Final local test
npm run build      # Must build with 0 errors
npm run start      # Test production build locally

# Step 2: Push to GitHub
git add .
git commit -m "Phase 6: Final — ready for production"
git push origin main

# Step 3: Deploy to Vercel
# Go to: vercel.com → Import from GitHub
# Select: kuragold-spices repository
# Framework: Next.js (auto-detected)

# Step 4: Add Environment Variables in Vercel dashboard
# (Project Settings → Environment Variables)
# Add all 7 variables from .env.local

# Step 5: Deploy
# Click Deploy
# Vercel builds and gives URL: kuragold-spices.vercel.app

# Step 6: Add custom domain
# Vercel → Project → Settings → Domains
# Add: kuragoldspices.com
# Add: www.kuragoldspices.com

# Step 7: Update DNS at domain registrar
# A record    @    → 76.76.21.21  (Vercel IP)
# CNAME       www  → cname.vercel-dns.com

# Step 8: Wait for DNS propagation (15 min – 2 hours)
# HTTPS is automatically provisioned by Vercel

# Step 9: Test live site
# kuragoldspices.com → splash screen → full site
# Test all features on live domain
```

---

### 6.6 — Pre-Launch Confirmation Checklist

Before telling Sir the site is live, confirm:

```
□  Sir confirms which quality claims to enable (admin claims page)
□  Sir confirms product descriptions (Javeria fills in admin panel)
□  Sir confirms FSSAI / Telangana / Make in India badge display
□  Sir confirms all email addresses are active
□  Sir confirms phone numbers
□  Sir confirms all product prices are correct
□  Sir confirms shipping rules (₹60 / free above ₹499)
□  WhatsApp number tested: messages arrive at +91 89787 26655
□  Javeria has logged into admin panel and changed her password
□  Javeria knows how to toggle claims on/off
□  Javeria knows how to edit product prices
□  Javeria knows how to view enquiries
```

---

### Phase 6 Deliverables Checklist
```
□  sitemap.xml accessible at kuragoldspices.com/sitemap.xml
□  robots.txt accessible at kuragoldspices.com/robots.txt
□  All pages have correct <title> and <meta description>
□  All og:image, og:title, og:description set
□  All images load fast (Next.js Image optimisation)
□  Lighthouse Performance ≥ 80
□  Lighthouse SEO ≥ 90
□  Lighthouse Accessibility ≥ 70
□  No broken links
□  No console errors in browser
□  Site deployed and live at kuragoldspices.com
□  HTTPS working (green padlock)
□  www.kuragoldspices.com redirects to kuragoldspices.com
□  Vercel auto-deploy configured (future git push = auto live update)
□  Final approval received from Airaj Sir
□  Final approval received from Zaki Sir
```

---

# PART D — REFERENCES

---

## D1. WhatsApp Order Flow (Complete)

```
CUSTOMER JOURNEY:

1. Opens kuragoldspices.com
        ↓
2. Splash screen: maroon → logo → main site
        ↓
3. Browses products on Home or /products
        ↓
4. Clicks on a product
        ↓
5. Selects size (e.g. 100g)
   → Price updates: ₹54
   → Shipping: ₹60 (or FREE if order ≥ ₹499)
        ↓
6. Clicks green "Buy on WhatsApp" button
        ↓
   [Background] POST /api/log-order
   → Saved to Supabase: whatsapp_orders table
   → Data: product_name, size_label, price_inr, timestamp
        ↓
7. WhatsApp opens (web or app) with message:

   "Hi Javeria! 🌶️
    I want to order from Kura Gold Spices:
    📦 Product : Red Chilli Powder
    ⚖️  Size    : 100g
    💰 Price   : ₹54
    Please confirm my order."
        ↓
8. Javeria receives message on +91 89787 26655
        ↓
9. Javeria replies:
   - Confirms availability
   - Shares UPI / bank details manually
        ↓
10. Customer pays
        ↓
11. Javeria ships (₹60 or free if ≥ ₹499)
        ↓
12. Order delivered
```

---

## D2. Future Payment Architecture (Phase 2 — Not Now)

> The following is planned but **NOT built in Phase 1**.
> The database tables and TypeScript types are already in place.
> When Sir says "add payment", this is the plan:

```
Phase 2 will add:
  - Razorpay integration (Indian payment gateway)
  - Order summary page (before WhatsApp)
  - Customer name + address collection
  - Auto-send order confirmation SMS/WhatsApp after payment
  - Order tracking status in admin panel

Database already ready:
  - orders table (created in Phase 0)
  - Order interface in types/index.ts
  - payment_status field: 'pending' | 'paid' | 'failed'
  - payment_method field: 'whatsapp_manual' | 'razorpay' | 'upi'

To add Razorpay later:
  npm install razorpay
  Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to .env.local
  Create /api/create-order route
  Create /api/verify-payment route
  Add Razorpay checkout button alongside WA button
```

---

## D3. Key Contacts & Numbers

| Person | Role | Contact |
|---|---|---|
| Zaki Sir | Client / Owner (Saudi Arabia) | +966 56 181 2839 |
| Javeria | Business Owner / Takes WA orders | +91 89787 26655 |
| Airaj Sir | Project Manager | Via team WhatsApp group |
| Vaishnavi | Developer | Allentics IT Solutions |

| Item | Value |
|---|---|
| WhatsApp Order Number | +91 89787 26655 |
| General Enquiries Email | care@kuragoldspices.com |
| Support Email | support@kuragoldspices.com |
| Phone | +91 99868 92121 |
| FSSAI Licence | 23626030003544 |
| Shipping Charge | ₹60 |
| Free Shipping Above | ₹499 |
| Business Hours | Open 24 Hours |
| Location | Hyderabad, Telangana, India |
| Website | kuragoldspices.com |

---

## D4. Master Done Checklist

### Phase 0 — Setup
```
□  Supabase project created (Mumbai region)
□  All 7 tables created with correct schema
□  RLS policies applied to all tables
□  Seed data inserted (settings, claims, products, variants)
□  Admin user created for Javeria in Supabase Auth
□  All 8 images uploaded to Supabase Storage
□  Product image URLs updated in products table
□  Next.js project created (TypeScript, Tailwind, App Router)
□  All npm packages installed
□  .env.local created with Supabase keys
□  CSS variables added to globals.css
□  constants.ts, whatsapp.ts, types/index.ts created
□  Project runs on localhost:3000 without errors
```

### Phase 1 — Foundation
```
□  Supabase browser + server clients created
□  SplashScreen: 5-phase animation works correctly
□  AnnouncementBar: scrolls, correct content
□  Navbar: 5 links, WA button, active states, mobile hamburger
□  Footer: 4-column, all links, WA button
□  WhatsApp float: fixed position, opens correct URL
□  Root layout: fonts, metadata, all components wrapped
□  Mobile hamburger opens/closes overlay correctly
```

### Phase 2 — Home Page
```
□  Hero: maroon gradient, headline, buttons, product pouches
□  Trust bar: conditional claims from Supabase
□  About preview: story text + 2×2 stats
□  Products preview: 4 cards with size + price + WA
□  Quality preview: 6 cards on maroon
□  API route /api/log-order working
□  API route /api/enquiry working
□  Home page fully responsive
```

### Phase 3 — Products
```
□  Products grid: 4 products from Supabase
□  SizeSelector: updates price on click
□  BuyOnWhatsApp: logs to Supabase + opens WA
□  Shipping note visible
□  Product detail pages: all 4 slugs working
□  SEO metadata per product page
□  Responsive: 1/2/4 column grid
```

### Phase 4 — Inner Pages
```
□  About Us: story + stats + values + WA block
□  Quality: confirmed claims only from Supabase
□  Quality: certification badges conditional
□  Contact: form + validation + Supabase save
□  Contact: WA large CTA block
□  Contact: all contact info cards
□  All pages have SEO metadata
```

### Phase 5 — Admin
```
□  Auth guard on all /admin routes
□  Login page with Supabase Auth
□  Dashboard: 3 stat cards + recent data
□  Manage products: list + toggle active
□  Edit product: name, description, image, variants, prices
□  Claims page: toggle each claim on/off
□  View enquiries: table, mark as read
□  View WA orders: table + summary
□  Admin responsive on mobile
```

### Phase 6 — QA & Deployment
```
□  0 build errors (npm run build)
□  sitemap.xml and robots.txt configured
□  All pages have title + description
□  All images optimised with Next.js <Image>
□  Tested on 360px, 390px, 768px, 1280px, 1440px
□  All WA links tested and working
□  Contact form tested end-to-end
□  Admin login/logout tested
□  Claims toggle tested (live update on public site)
□  GitHub repository created and code pushed
□  Vercel project connected
□  Environment variables added to Vercel
□  Domain kuragoldspices.com connected
□  HTTPS working
□  Final approval: Airaj Sir ✓
□  Final approval: Zaki Sir ✓
□  Javeria trained on admin panel ✓
```

---

```
═══════════════════════════════════════════════════════════════
  Total Phases : 6 (+ Phase 0)
  Total Duration : ~6 Weeks
  Tech Stack : Next.js 14 + TypeScript + Tailwind + Supabase
  Design : Heritage Royale (Maroon + Gold) — Approved by Sir
  Ordering : WhatsApp only (Phase 1) | Razorpay ready (Phase 2)
  Admin : Javeria manages products, prices, claims — no dev needed
═══════════════════════════════════════════════════════════════
  Prepared  :  Vaishnavi · Allentics IT Solutions
  Reviewed  :  Airaj Sir
  Client    :  Zaki Sir · JK Enterprises
  Date      :  August 2026
═══════════════════════════════════════════════════════════════
```
