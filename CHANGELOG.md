# Changelog

## 2.1.3 — Wordmark sequence: rise, hold, red sweep, sink (November 2026)

- **Fixed: the giant "VAISHNAV CIBU" looked frozen while scrolling.** Its rise
  moved it down inside its strip at the same speed the page moved up, so on
  screen it stood still. It now lifts only a short way and moves up with the
  page.
- **New sequence, tied to the scroll position.** It runs over the last
  stretch of the page, from the wordmark entering the screen to the bottom:
  1. it rises into view and fades in;
  2. it holds, fully visible;
  3. a red glow band passes across the letters, with a soft red halo;
  4. as the red passes, it sinks downward and fades out.

  Scrolling back up plays it in reverse.
- The wordmark is the last thing on the page, so this stretch is short (11vw).
  The animation follows the scroll with an even catch-up: a quick flick to
  the bottom still unfolds the whole sequence over about 2½ seconds, and small
  scrolls respond at once.
- The footer layout and every other footer element are unchanged, and no
  space was added below the footer. With no JavaScript or with reduced
  motion, the wordmark is the static original.

## 2.1.2 — Deploys always load matching files (November 2026)

- **Fixed: after a deploy the footer could look broken for a few minutes.**
  GitHub Pages lets browsers reuse files for up to 10 minutes. A browser
  could therefore load the new page with the previous, cached `style.css`,
  which has no styles for the restored footer row and draws the wordmark in
  black. The stylesheet and script links now carry `?v=<commit id>`, stamped
  in by the deploy workflow, so every deploy uses fresh file URLs.
- The footer and its wordmark animation are unchanged from 2.1.1.

## 2.1.1 — Footer restored (November 2026)

- **The footer is back to its 2.0.0 design.** The markup and styles are
  identical to commit `c0f4779`:
  - the row with "© 2026 Vaishnav Cibu", "Founder · Corezentric
    Technologies LLP" and the "Back to top" link;
  - the giant cropped "VAISHNAV CIBU" wordmark on the page's dark background.
- **Removed** everything 2.1.0 added there: the white sheet, the white-to-red
  transition, the extra scroll space below the page, the nav sliding away,
  and the "All rights reserved." text.
- **New: only the wordmark animates** (`js/motion.js`, section 11).
  1. As you scroll into the footer it rises out of its clip line and fades
     in, in step with the scroll.
  2. Once it settles at the bottom, a soft light sweeps across it with a
     brief white halo (about 2.5 seconds).
  3. Scrolling back up makes it fade and sink back down. It shines again the
     next time you reach the bottom.
- With no JavaScript or with reduced motion, the wordmark is exactly the
  static original.
- Checked: no horizontal scroll and no console errors at 375, 768, 1440 and
  1536 px.
- Lighthouse in A/B runs: mobile 94 (2.0.0: 92), desktop 100;
  Accessibility, Best Practices and SEO 100.

## 2.1.0 — Laptop layout fix, motion, section upgrades (November 2026)

### Fixed
- **Hero broke on laptop screens.** On a typical laptop (for example
  1920×1080 at 125% scaling, which gives a 1536×695 browser window) the hero
  needed about 800px of height but the frame was capped at the screen height,
  so the headline spilled out below the white frame. The frame now always
  grows with its content, and from 1200px wide the copy sits beside the
  Corezentric card instead of on top of the headline, with the headline
  sized from the screen height. The whole hero now fits in one screen at
  1280×600, 1366×625, 1536×695, 1440×900, 1920×950 and 2560×1300, with
  both headline variants.
- **Nav lost its blur once you scrolled.** The nav's entrance animation was
  held after it finished (`fill-mode: both`), which turns off
  `backdrop-filter` in Chrome. It now releases when done (`backwards`), and the
  floating bar is a little more opaque.
- **Scrollbars.** The default light page scrollbar is replaced with a slim
  dark one that matches the site, the mobile menu's scrollbar is hidden, and
  no element on the page shows its own scrollbar or scrolls sideways.

### Hero
- Hotspots are pinned to points on the orb's surface, so they move with it
  at every screen size instead of drifting onto the copy or the cut-outs.
- The tagline headline ("I build products that ship") stays on one line on
  tablets, and its hotspots move to the free space beside the orb.

### Motion (GSAP 3.13 + ScrollTrigger, anime.js 3.2.2, loaded from cdnjs)
- All motion lives in `js/motion.js`. If the CDN is unreachable, or the
  visitor has asked for reduced motion, the page stays fully readable and
  static. Loops pause when they are off screen.
- Headings rise out of a mask as they scroll into view.
- Scroll parallax in the hero, and marquees that speed up while you scroll
  (desktop).
- Magnetic primary buttons, a red spotlight that follows the cursor on cards,
  and a 3D tilt on the About ID card (desktop, mouse only).

### Sections
- **01 About**, redesigned: a framed "ID card" (sticky on desktop, tilts toward
  the cursor) next to a story column with:
  - a manifesto whose words light up as you read;
  - a journey path that draws itself;
  - the belief as a large quote;
  - the focus areas as big interactive rows.

  All of the original text is kept.
- **04 Selected work:** stacked cards. On desktop each card sticks under the
  nav, and the next one slides over it while the covered one shrinks and dims.
  Each project has its own animated line illustration until a screenshot is
  added.
- **05 Toolkit:** a "periodic table" of all 30 skills, filterable by discipline.
  The tiles ripple in from the centre and re-sort with a stagger (anime.js).
- **06 Process:**
  - Desktop: the section pins and the five stages travel sideways as you
    scroll, with a progress counter. The current stage turns into a white
    spotlight card and its icon draws itself.
  - Phones: a rail that fills as you scroll.
- **07 Why work with me:** expanding panels. The one you hover, tap or focus
  with the keyboard opens and shows its text; phones show all five as cards.
- **09 Vision and 10 Contact are unchanged**, as requested.

### Footer finale (scroll-synchronised)
1. A white sheet rises from below the page with the copyright on it.
2. Red floods up from the bottom and blends the white away, while the
   copyright fades and sinks downward. The nav slides out of the way.
3. The giant "VAISHNAV CIBU" wordmark rises onto the red.

Scrolling back up plays it in reverse. With reduced motion it is a static
white footer. "All rights reserved." was added to the copyright line.

### Checked
- No horizontal scroll and no console errors at 375, 768, 1024, 1440 and
  1536 px. Every in-page link resolves, there is one `h1`, and there are no
  duplicate IDs.

| Lighthouse | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Mobile (local, gzip; median of alternating A/B runs) | 94 | 100 | 100 | 100 |
| Desktop | 99 | 100 | 100 | 100 |

In the same A/B runs the previous version (2.0.0) scored a median of 92 on
mobile, so the animation layer costs no measurable performance. Single runs
on a busy machine can dip much lower.

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
