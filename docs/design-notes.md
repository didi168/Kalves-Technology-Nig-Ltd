# Design Notes — Kalves Technology Nig Ltd

## 1. Visual References Studied

1. **Brand Flyer (`media_1794470739823_2681a655.jpg`)**
   - **Logo:** Circular broken ring in fresh lime/kelly green (`#7BB636` / `#8AC43F`) and deep navy-charcoal (`#182428`) enclosing a stylized dark charcoal "K" monogram.
   - **Brand Name:** Kalves Technology Nig Ltd
   - **Taglines:** `COMPLETE VISIBILITY. TOTAL CONTROL.` / `YOUR PARTNER IN PROTECTION`
   - **Value Proposition:** `Premium Camera Sales, Professional Installation, and Full Systems`
   - **Categories:** `SALES | INSTALLATION | DVRs | CAMERAS | ACCESSORIES`
   - **Services:** Curated Sales (Bullet, Dome, PTZ, Thermal & Specialized Cameras), Expert Installation, HD DVRs & NVRs (high-capacity storage, real-time analytics), Support & Maintenance.
   - **Sampled Brand Palette:**
     - Off-white / cool light grey ground: `#F3F5F6` / `#ECEEF0`
     - Deep navy-charcoal: `#182428` / `#1D2C30`
     - Steel slate accent (flyer curve): `#4A626D`
     - Kelly / lime green primary accent: `#7BB636` / `#8AC43F`
     - Pure white card surface: `#FFFFFF`

2. **Layout Reference (`Klyro` PDF — 1440 px desktop width)**
   - **Scale & Grid:** 1440 px desktop viewport, ~1200 px max container width, generous vertical section padding (`88px–120px` desktop, fluid `clamp()` down to mobile), crisp `1px` hairlines, consistent `14px`–`24px` border radii.
   - **Section Order (1:1 Fidelity):**
     1. Sticky/Top Navbar: Brand logo left, 5 centered nav links, 2 pill CTAs right (`WhatsApp` + `Request Quote`).
     2. Centered Hero: Eyebrow, H1, concise subtitle, centered dark pill CTA, circular subtle radar arcs + centered studio product visual, followed by the 5-category strip (`Sales · Installation · DVRs · Cameras · Accessories`).
     3. About / Showcase Section: Eyebrow, centered H2, wide rounded multi-camera NVR monitoring UI showcase frame, centered caption.
     4. Cost / Quote Banner Card: Light grey rounded split card with headline + dark CTA on left and angled tactile keypad visual on right.
     5. How It Works (Full-bleed rounded dark `#182428` block): Eyebrow, centered white H2, 4-column steps with minimal line icons, bold heading, concise description, bottom hairline + `01`–`04` step numbers.
     6. System Architecture ("Where Kalves Fits"): Eyebrow, H2, 3-node horizontal flow (`Field Hardware` → dark `Kalves System` center card → `Total Control`), bottom caption.
     7. 4-Card Impact Strip: Centered H2, 4 connected numbered cards (`1`–`4`), with card `4` highlighted in the primary brand accent (`#7BB636` replacing Klyro's coral red). *(Note: illustrative numeric benchmarks are marked with `<!-- EDIT: ... -->` for final verification.)*
     8. Who It's For ("Built for Homes & Businesses"): Eyebrow, H2, 2 side-by-side light cards bridged by a centered translucent green circular orb, each card featuring a minimal node graphic, audience tag, H3, and description.
     9. What You Get: Subtle dot-grid section background, centered H2 + subtitle, 3 numbered schematic cards (`1`, `2`, `3`) + full-width bottom guarantee bar.
     10. FAQs: 2-column layout (heading left, interactive accordion right with `+`/`-` circle icons).
     11. Quote / Bottom CTA Glow Section: Soft green bottom radial glow framing the static quote request form and direct Nigerian contact links (`tel:+2348152395154`, `wa.me/2348152395154`, `sirkalves@gmail.com`, `@kalvestech001`). *(Sticky mobile bottom bar omitted per user instruction.)*
     12. Dark Footer (`#182428`): Rounded top corners, logo top-left, 3 link columns, right-side quick callback/newsletter input + social/contact details, copyright bar.

## 2. Design Tokens (`:root`)

- **Fonts:** `Plus Jakarta Sans` (Google Fonts, `400, 500, 600, 700`, `display=swap`) — matches Klyro's clean geometric neo-grotesque display & body style; fallback tuned system sans.
- **Fluid Type Scale (`clamp`):**
  - `--text-hero`: `clamp(2.25rem, 1.45rem + 2.8vw, 3.625rem)` (36px–58px)
  - `--text-h2`: `clamp(1.75rem, 1.25rem + 1.8vw, 2.75rem)` (28px–44px)
  - `--text-h3`: `clamp(1.125rem, 1.05rem + 0.35vw, 1.375rem)` (18px–22px)
  - `--text-body`: `clamp(1rem, 0.97rem + 0.12vw, 1.0625rem)` (16px–17px)
- **WCAG AA Contrast Adjustments:**
  - Bright flyer green `#7BB636` fails 4.5:1 as small text on `#FFFFFF` (2.54:1). We keep `#7BB636` / `#8AC43F` for the logo, large accent fills (with `#111A1D` dark ink on `#7BB636` -> 7.6:1 contrast!), focus rings, and decorative accents, and use `--accent-ink: #3E6612` (6.8:1 on `#FFFFFF`, 6.2:1 on `#F3F5F6`) for any green text on light backgrounds, and `--accent-on-dark: #97D14E` (9.8:1 on `#182428`) for green text on dark surfaces.
- **Motion:**
  - GSAP 3.12.7 + ScrollTrigger + Lenis 1.1.20 (desktop smooth scroll only; native touch scroll on touch devices, `ignoreMobileResize: true`, pins/scrubs avoided on mobile, `prefers-reduced-motion: reduce` disables all animation and Lenis).
  - Animate only `transform` and `opacity`.

