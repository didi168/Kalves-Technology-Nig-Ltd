# Kalves Technology Nig Ltd — Landing Page

Static, responsive landing page for **Kalves Technology Nig Ltd** (*Complete Visibility. Total Control.*), built with plain HTML, CSS, and JavaScript for GitHub Pages.

## Project Structure

```text
index.html
404.html
robots.txt
sitemap.xml
.nojekyll
css/
  style.css        # Design tokens in :root, base, layout, sections, responsive rules
js/
  main.js          # Motion (GSAP + Lenis), mobile menu, showcase tabs, FAQs, static forms
assets/
  img/             # Optimized WebP product graphics & 1200x630 Open Graph banner
  svg/             # Brand logo (logo.svg) and favicon (favicon.svg)
docs/
  design-notes.md  # Reference analysis, palette, typography, contrast notes
```

## Quick Customization (`<!-- EDIT: ... -->` Markers)

Search `index.html`, `robots.txt`, and `sitemap.xml` for `EDIT:` to update business details:

| Marker | File(s) | What to update |
| --- | --- | --- |
| `EDIT: Update canonical and social URLs` | `index.html`, `robots.txt`, `sitemap.xml` | Replace placeholder `https://kalvestechnology.github.io/kalves-technology/` with your live URL |
| `EDIT: Business logo & name` | `index.html` | Swap logo file or company lockup text |
| `EDIT: Phone & WhatsApp number` | `index.html` | Update `tel:+2348152395154` and `https://wa.me/2348152395154` |
| `EDIT: Email address` | `index.html` | Update `sirkalves@gmail.com` |
| `EDIT: TikTok handle` | `index.html` | Update `@kalvestech001` link |
| `EDIT: Physical office address & opening hours` | `index.html` | Replace `[Office Address & Opening Hours, Nigeria]` placeholder |
| `EDIT: Illustrative benchmark values` | `index.html` | Replace illustrative metric cards (`48 Hrs`, `₦185K`, etc.) with verified company numbers |

## Design Tokens (`css/style.css`)

All visual tokens live in `:root` at the top of `css/style.css`:

| Token | Default Value | Purpose |
| --- | --- | --- |
| `--bg-page` | `#F3F5F6` | Page light grey background |
| `--bg-surface` | `#FFFFFF` | Card & header background |
| `--bg-dark` | `#182428` | Dark navy-charcoal sections & footer |
| `--accent` | `#7BB636` | Primary Kalves lime green |
| `--accent-ink` | `#3E6612` | High-contrast green text on light backgrounds |
| `--text-primary` | `#182428` | Main headings and dark text |
| `--text-secondary` | `#49585E` | Body copy |
| `--font-sans` | `"Plus Jakarta Sans", ...` | Display and body typeface |

## How to Swap the Logo

1. Replace `assets/svg/logo.svg` with your final vector logo (used in header and mobile menu).
2. Update `assets/svg/favicon.svg` for browser tabs.
3. Update the two inline dark-surface white+green logo `<svg>` marks in `index.html` (in `#architecture` center node and `<footer>`) so the dark charcoal strokes remain crisp white on `#182428`.

## Connecting Forms Before Launch

Both `#quote-form` and `#footer-newsletter-form` currently run client-side validation only (`<!-- TODO: connect to a form service -->`). Connect them to Formspree, Web3Forms, Netlify Forms, or your own backend endpoint before launch.

## Deploying on GitHub Pages

1. Push all files to your GitHub repository (`main` branch).
2. Open **Settings → Pages** in your GitHub repository.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then click **Save**.
4. Wait ~1–2 minutes for GitHub Pages to publish at `https://<username>.github.io/<repo-name>/`.
5. Update `canonical`, `og:url`, `robots.txt`, and `sitemap.xml` with that live URL.

## Adding a Custom Domain

1. In **Settings → Pages → Custom domain**, enter your domain (for example `kalvestech.com.ng`) and save (GitHub automatically creates a `CNAME` file).
2. At your DNS registrar, point `A` records to GitHub Pages IPs (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`) and a `CNAME` for `www` pointing to `<username>.github.io`.
3. Enable **Enforce HTTPS** once DNS propagates.
