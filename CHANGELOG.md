# Changelog

## 2.0.0 — Redesign (November 2026)

A full visual redesign. All existing copy, contact details and links are kept;
the changes are to layout, visual language, interaction, structure and polish.

### Structure
- **Split into `index.html`, `css/style.css`, `js/main.js`, `assets/`.** The Pages
  workflow already uploads the whole repo, so no workflow change was needed.
  All paths are relative (`assets/...`, not `/assets/...`) because the site is
  served from `/Vaishnavcibu/`.
- **Every colour is a token in `:root`** (white / red / black plus opacity
  variants). No hard-coded colours anywhere else in the CSS.

### Design language
- **Framed canvas hero.** A 14px white rounded frame (28px radius, 8px on phones)
  floats over a deep-red radial backdrop (`--red-800 → --red-950 → --black-900`).
- **Bento cut-outs with inverted corners.** The Corezentric card, the
  "• Open to work" pill, the AI · Full Stack · Mobile chips and the View Work card
  are carved into the hero panel. The concave fillets are pure CSS
  (radial-gradient pseudo-elements), with no images. The same `.cut` component is
  reused on the CORE company card and the contact frame.
- **Type:** Anton (condensed display), Outfit 300/400/500 (body/UI), JetBrains
  Mono (the `00://HERO` section tags, now small and muted). Fluid `clamp()` scale.
- **Pills everywhere:** the primary CTA is a white pill with a black circular
  arrow that rotates 45° on hover while the pill inverts.
- **Hotspot callouts** (dot + drawn line + 2-line label) carry the hero facts:
  Products shipped, Based in, Focus.
- **Spot-lit stage.** Until a portrait is added, the hero shows an abstract red
  orb under a light cone with a floor shadow and vignette. Uncommenting the
  portrait `<picture>` hides the orb automatically and keeps the glow as a back-light.

### Sections
- **00 Hero:** headline is toggleable with `data-headline="name" | "tagline"`
  ("VAISHNAV CIBU" / "I BUILD PRODUCTS THAT SHIP"). The hero's long-form claim
  and "Whether it's a marketplace…" paragraph moved to an intro band below the frame.
- **01 About:** big condensed heading, two cards; tags are now outline pills.
- **02 Company:** bento with a large CORE card, Hoardgrid and Hoardbook cards, and
  a Founder · 2026 · LLP info tile (LLPIN kept).
- **03 Services:** 3×2 grid with large outline index numbers. On hover the card
  lifts, gets a red hairline and the arrow rotates. The hero chips deep-link to
  `#svc-ai`, `#svc-fullstack`, `#svc-mobile` and the target card highlights.
- **04 Projects (new):** Amber, Schematic OCR Tool, FES, SPF and Wooden Nest,
  pulled from github.com/Vaishnavcibu, each with stack pills, a GitHub pill and a
  ready image slot. Wooden Nest also links to the live site. This also fills the
  missing "04" in the menu.
- **05 Stack:** grouped pill rows plus a slow outline marquee.
- **06 Process:** horizontal timeline with red dot connectors that draw in on
  scroll; vertical on phones.
- **07 Why / 08 Numbers:** bento cards that invert to white on hover; big stat tiles.
- **09 Vision:** one huge statement with "simplify" in red.
- **10 Contact:** a framed card echoing the hero. Underlined fields; white pill
  submit. Email, phone, location, GitHub, LinkedIn, Portfolio kept.
- **Footer:** minimal row plus a giant cropped "VAISHNAV CIBU" wordmark.

### Bug fixes
- **Counters showed "0+".** The markup shipped `0` and relied on a
  requestAnimationFrame count-up to write the real number, so anything that didn't
  run it (link previews, crawlers, screenshots, background tabs, Lighthouse)
  showed "0+". The real values are now always in the DOM. The count-up only runs
  when a card scrolls into view, and if no frame runs the final value stays.
  Values live in one object: `STATS` at the top of `js/main.js`.
- **Heading order.** The skill rows and process steps jumped from `h2` to `h4`;
  they are now `h3`.
- **Duplicate `google-site-verification` meta** removed (it appeared twice).
- **Menu numbering** now matches the section tags (Contact is `10`, not `07`).

### Navigation
- Black floating bar that sits inside the hero frame at the top of the page, then
  blurs and floats on scroll. "VC." monogram, centred links, and a white
  "Contact me" pill. **Projects was added to the desktop links** because the new
  section is a primary destination (the brief listed six links).
- The active section is marked with a red dot under the link, with
  `aria-current="location"`. The dot is used instead of red text because small
  red-on-black text fails WCAG AA.
- Phones and tablets get a full-screen black overlay with large condensed links,
  a focus trap, Esc to close, scroll lock, and focus returned to the button.

### Motion
- Hero: frame scales 0.96 → 1, tiles stagger in, headline reveals line by line
  behind a clip mask, hotspot dots pop, lines draw and labels fade.
- Scroll reveals via IntersectionObserver, using `translate`/`opacity`, so they
  never fight hover transforms.
- Small red-dot custom cursor on desktop (fine pointer) only.
- `prefers-reduced-motion` disables the intro, reveals, marquees, pulses,
  count-up and cursor.

### Accessibility, SEO, performance
- Skip link, landmarks (`header`/`nav`/`main`/`footer`), one `h1`, labelled
  sections, a red `:focus-visible` ring, ≥44px tap targets on interactive pills,
  and `aria-live` form status. Decorative giant type is drawn with
  `content: attr()` so it stays out of the accessibility tree.
- Open Graph + Twitter `summary_large_image` tags (using `og.png`), canonical
  URL, and JSON-LD `Person` schema. Title and description are unchanged.
- Google Fonts load non-blocking with `display=swap` and preconnect. Inline SVG
  favicon avoids a 404. No images ship by default; the image slots include
  width/height and `loading="lazy"`.
- Removed the full-screen loader, scroll progress bar, grid background and
  animated grain; they delayed first paint and are replaced by the hero intro.

### Lighthouse (local, gzip on, as GitHub Pages serves it)
| Profile | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Mobile (median of 3) | 96 | 100 | 100 | 100 |
| Desktop | 99 | 100 | 100 | 100 |

CLS 0 · TBT ≤ 40 ms.

### Not carried over
- The commented-out project deck from v1 (Review2Reward, HoardBook, HoardGrid,
  LinkedOut, OCR Bill Extractor, NFC Smart Cycle Booking) was never rendered and
  is not in the new markup. It remains in git history (commit `a03da76`) if you
  want to restore any of it.
