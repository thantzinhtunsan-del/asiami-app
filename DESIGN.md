# Design System: Asiami (アジアミ) — Pan-Asian Marketplace

## 1. Visual Theme & Atmosphere

**Density:** 5 — Daily App Balanced. Enough product information density without overwhelm.
**Variance:** 7 — Offset Asymmetric. Left-biased hero, staggered grids, deliberate imbalance that feels curated rather than accidental.
**Motion:** 6 — Fluid CSS. Spring-physics-driven state transitions, a typewriter-style language switcher in the hero, shimmer loaders on product cards.

The atmosphere is warm, layered, and culturally confident — like a well-lit street market photographed at golden hour. The palette grounds itself in deep navy and cream parchment, with terracotta orange as the sole accent — a nod to the warmth of Southeast and East Asian craft markets. No coldness, no corporate sterility. The interface should feel like it was designed by someone who has actually been to these markets.

---

## 2. Color Palette & Roles

- **Parchment Canvas** (`#FFF8F0`) — Primary background surface. Warm off-white, never pure white. The base layer.
- **Pure Surface** (`#FFFFFF`) — Card fills and modal backgrounds only. Slight lift off the canvas.
- **Soft Cream Divider** (`#F5EDDF`) — Borders, dividers, input edges, subtle section separators.
- **Deep Navy Ink** (`#1A2B4A`) — Primary text, headings, navigation labels, high-contrast labels. Never pure black.
- **Navy Mid** (`#2C4270`) — Secondary headings, hover states on nav links, gradient fill.
- **Steel Caption** (`#6B7A99`) — Secondary text, metadata, timestamps, placeholder labels.
- **Terracotta** (`#E8622A`) — The single accent. CTAs, active states, focus rings, price highlights, progress indicators. Saturation held below 80%. No neon. No glow.
- **Terracotta Light** (`#F4845A`) — Hover state for terracotta elements. Never used standalone.
- **Terracotta Dark** (`#C44D1E`) — Active/pressed state for primary buttons.
- **Whisper Border** (`rgba(245, 237, 223, 0.8)`) — Card borders, 1px structural lines on white surfaces.
- **Navy Gradient Start** (`#1A2B4A`) → **Navy Gradient Mid** (`#2C4270`) → **Terracotta End** (`#E8622A`) — Hero section gradient only. 135deg angle. Not used elsewhere.

> **Rule:** One accent, always Terracotta. No purple. No teal. No neon. Color temperature stays warm throughout — no Zinc/Slate cold grays.

---

## 3. Typography Rules

- **Display / Hero Headlines:** `Geist` — Bold (700–800), track-tight (`letter-spacing: -0.03em`). Scale via `clamp(2.5rem, 6vw, 4rem)`. Hierarchy driven by weight and color, not size explosions. Deep Navy Ink.
- **Section Headings (H2–H3):** `Geist` — Semibold (600), `clamp(1.5rem, 3vw, 2rem)`. Track at `-0.02em`.
- **Body / Descriptions:** `Geist` — Regular (400), `1.125rem` / `18px`, line-height `1.7`, max `65ch` per line. Steel Caption for secondary body.
- **UI Labels / Badges / Metadata:** `Geist` — Medium (500), `0.875rem` / `14px`. Uppercase only for category labels, never for general UI text.
- **Prices / Numbers / Quantities:** `Geist Mono` — All monetary values, order numbers, stock counts, and statistics use monospace. Prevents layout shift on number changes.
- **Code / IDs:** `Geist Mono` — Tracking IDs, product SKUs, order references.

> **Banned Fonts:** `Inter`, `Times New Roman`, `Georgia`, `Garamond`, `Palatino`. No generic serif anywhere in the UI — this is a commerce dashboard, not editorial. If cultural script rendering is needed (Japanese, Myanmar, Thai, Chinese, Vietnamese), fall back gracefully to `system-ui` for that script only.

---

## 4. Hero Section

The hero communicates Asiami's multicultural identity through a **rotating language typewriter** — the headline cycles through 8 language translations of the core tagline with a smooth fade-and-slide transition (400ms, spring easing). This is the signature interaction.

- **Layout:** Left-aligned, asymmetric. The headline occupies the left 60% at desktop. Right side is open negative space — no stock photo fill, no floating card. The gradient background is the visual.
- **Language Dots:** A dot-progress indicator below the rotating headline — active dot expands to a pill, inactive dots are small circles. Terracotta active, `white/30` inactive.
- **CTA:** One primary button only (`Shop Now` — terracotta fill). The `Start Selling` action uses a ghost/frosted variant (`white/10` background, `white/20` border, backdrop-blur). No secondary "Learn more" links.
- **Stats Row:** Three stats — `0% Commission`, `8 Languages`, `7+ Communities` — separated by a `white/10` top border. Numbers in terracotta bold, labels in `white/60`. These are real product values; no fabricated metrics.
- **Banned from Hero:** Floating emojis, bouncing chevrons, "Scroll to explore" text, scroll arrow icons, centered layout, overlapping text/image stacks.

> Remove the existing floating emoji layer (`['🏮', '🌸', ...]`). Replace with a subtle radial gradient noise overlay (`opacity: 0.04`) using an SVG grain pseudo-element on the section.

---

## 5. Component Stylings

### Buttons
- **Primary (Terracotta Fill):** `background: #E8622A`, white text, `font-weight: 600`, `border-radius: 0.75rem` (12px), `padding: 0.75rem 1.5rem`. On hover: `background: #F4845A`, `box-shadow: 0 4px 20px rgba(232,98,42,0.25)`. On active: `-1px translateY`, `background: #C44D1E`. No outer glow. No neon.
- **Ghost / Frosted:** `background: rgba(255,255,255,0.10)`, `border: 1px solid rgba(255,255,255,0.20)`, `backdrop-filter: blur(8px)`. Used only over the hero gradient.
- **Secondary (Outline):** White background, Deep Navy Ink text, `border: 2px solid #F5EDDF`. Hover: `background: #F5EDDF`.
- **Destructive:** `background: #FEF2F2`, `color: #991B1B`, `border: 1px solid #FCA5A5`. Admin-only.

### Cards (Product, Seller, Category)
- `border-radius: 1.25rem` (20px). `background: #FFFFFF`. `border: 1px solid rgba(245,237,223,0.8)`.
- Shadow: `0 2px 8px rgba(26,43,74,0.06)`. On hover: `0 8px 24px rgba(26,43,74,0.10)`. Shadow tinted to navy, not generic gray.
- Use `transition: box-shadow 200ms ease, transform 200ms ease`. On hover: `translateY(-2px)`.
- Never stack cards in 3 equal columns. Use asymmetric 2-column zig-zag for features, horizontal scroll for category rows, or `auto-fill minmax(280px, 1fr)` grid for product listings.

### Inputs / Forms
- Label above, `font-size: 0.875rem`, `font-weight: 500`, Deep Navy Ink.
- Input: `border: 2px solid #F5EDDF`, `border-radius: 0.75rem`, `padding: 0.75rem 1rem`, `background: #FFFFFF`.
- Focus: `border-color: #E8622A`, `box-shadow: 0 0 0 3px rgba(232,98,42,0.15)`. No floating labels.
- Error: `border-color: #F87171`, helper text below in `#DC2626`, `font-size: 0.8125rem`.
- Helper text: Steel Caption color, below input.

### Badges / Tags
- `border-radius: 9999px` (pill). `padding: 0.25rem 0.625rem`. `font-size: 0.75rem`, `font-weight: 500`.
- Status variants: Pending (`#FEF3C7` / `#92400E`), Active (`#DCFCE7` / `#166534`), Rejected (`#FEE2E2` / `#991B1B`), Community (`#EFF6FF` / `#1E40AF`).
- Language badges: Cream background, Navy text — understated, not colorful.

### Loaders
- Skeletal shimmer matching exact card/row dimensions. `background: linear-gradient(90deg, #F5EDDF 25%, #FFF8F0 50%, #F5EDDF 75%)`, animated via `background-position`.
- No circular spinners anywhere. The shimmer communicates layout structure while loading.

### Empty States
- Composed, centred within the container. An SVG illustration (line art, culturally neutral). A clear headline, a one-line description, and one CTA.
- Example: "No products yet" → Line art of a market stall → "Add your first product" button.

### Order Status Timeline
- Vertical timeline, left-anchored dot track. Active step: Terracotta filled circle. Completed: Deep Navy filled. Pending: Soft Cream Divider stroke.
- Use `OrderStatusTimeline` component. No horizontal progress bars for multi-step order flows.

---

## 6. Layout Principles

- **Max-width container:** `1400px` centered, `padding: 0 clamp(1rem, 4vw, 3rem)`.
- **Product Grid:** CSS Grid, `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`. Never `repeat(3, 1fr)` hardcoded.
- **Feature Rows:** 2-column asymmetric splits (60/40 or 55/45), alternating image/text side (zig-zag). The "3 equal cards in a row" layout is banned.
- **Section Spacing:** Vertical gaps via `clamp(3rem, 8vw, 6rem)`. Internal card padding: `clamp(1rem, 3vw, 1.5rem)`.
- **Full-height sections:** `min-h-[100dvh]` only. Never `h-screen`.
- **No overlapping elements.** Every element occupies its own clean spatial zone. No absolute-positioned content stacking over text.
- **No `calc()` percentage hacks.** Grid and `clamp()` handle all responsive layout math.

---

## 7. Responsive Rules

- **< 768px (Mobile):** All multi-column layouts collapse to single column. Product grid becomes 2-column via `minmax(160px, 1fr)`. Below 400px: single column.
- **Hero on Mobile:** Rotating headline scales to `clamp(1.75rem, 8vw, 2.5rem)`. Stats row stacks to 2-column wrapping flex. Both CTAs stack full-width.
- **Navigation:** Desktop horizontal nav collapses to a slide-in drawer on mobile. No hamburger icon with 3 lines — use a clean X/menu toggle.
- **Touch Targets:** All interactive elements minimum `44px` height. Tap targets never smaller than `44x44px`.
- **Typography:** Headlines scale via `clamp()`. Body text minimum `1rem` / `16px`. No `12px` body text on mobile.
- **No horizontal scroll** — critical failure condition. Overflow clipping on all section containers.
- **Images:** Aspect-ratio locked via `aspect-ratio` CSS, not fixed `height` values.

---

## 8. Motion & Interaction

- **Spring Physics:** `stiffness: 120, damping: 22` — premium, weighted feel. No `ease-in-out` linear curves on interactive elements.
- **Hero Tagline Switcher:** Fade out (`opacity: 0`, `translateY(12px)`) over 400ms, swap text, fade in (`opacity: 1`, `translateY(0)`) over 400ms. Interval: 2800ms. This is a perpetual micro-loop.
- **Product Card Hover:** `translateY(-2px)` + shadow deepening. 200ms spring. No scale transforms on cards (causes layout shift in grids).
- **Button Active State:** `translateY(1px)` + darkened background. 100ms. Tactile press feedback.
- **Staggered List Reveals:** Product grids, seller listings, and order histories mount with cascade delays — `0ms, 60ms, 120ms, 180ms...` per item. Max 6 items staggered; beyond that, instant mount.
- **Skeletal Shimmer:** `background-position` animation from `-200%` to `200%` over 1.5s, linear, infinite.
- **Performance rule:** Animate exclusively via `transform` and `opacity`. Never animate `top`, `left`, `width`, `height`, `padding`, or `background-color` on large elements.
- **Grain overlay:** Fixed pseudo-element on the hero section. SVG noise filter, `opacity: 0.04`. Static — no animation.

---

## 9. Anti-Patterns (Banned)

- **No emojis anywhere** — including decorative floating emojis in the hero background. Remove existing `bounceGentle` emoji layer.
- **No `Inter` font** — `Geist` is the sole sans-serif.
- **No generic serif fonts** (`Times New Roman`, `Georgia`, `Garamond`) — no serif in commerce UI.
- **No pure black (`#000000`)** — use `#1A2B4A` (Deep Navy Ink) for all "black" contexts.
- **No neon or outer glow shadows** — warm, navy-tinted diffused shadows only.
- **No oversaturated accents** — Terracotta held to saturation below 80%. No hot pink, electric blue, neon purple.
- **No gradient text on large headers** — the hero gradient is background only. Text is always solid.
- **No custom mouse cursors.**
- **No overlapping elements** — clean spatial separation, always.
- **No 3-column equal card layouts** — asymmetric grids or `auto-fill` only.
- **No fabricated data** — stats like "99.98% uptime" or "124ms response time" are banned. Only real product values: `0% Commission`, `8 Languages`, `7+ Communities`.
- **No `LABEL // YEAR` formatting** — no "METRICS // 2025" dashboard cards.
- **No AI copywriting** — "Seamless", "Elevate", "Unleash", "Next-Gen", "Revolutionary" are banned from copy.
- **No filler UI text** — no "Scroll to explore", no bouncing chevrons, no scroll arrows.
- **No broken image links** — product images use Supabase Storage URLs or `picsum.photos` for placeholders. No direct Unsplash URLs.
- **No centered hero layout** — always left-aligned with asymmetric composition.
- **No circular loading spinners** — skeletal shimmer loaders only.
- **No generic placeholder names** — "John Doe", "Acme Corp", "Test Seller" banned from UI states.
