# Assets to supply

Put every file under `assets/` (relative path; the site lives at `/Vaishnavcibu/`).
The page works without any of them, because each slot has a designed placeholder.

| # | File | Size (px) | Format | Max weight | Where it appears |
|---|------|-----------|--------|-----------:|------------------|
| 1 | `assets/portrait.webp` | **1200 × 1500** (4:5) | WebP, alpha OK | 180 KB | Hero stage (centre) |
| 2 | `assets/projects/amber.webp` | **1600 × 1000** (16:10) | WebP | 150 KB | 04 Projects · Amber |
| 3 | `assets/projects/schematics-ocr.webp` | **1600 × 1000** | WebP | 150 KB | 04 Projects · Schematic OCR Tool |
| 4 | `assets/projects/fes.webp` | **1600 × 1000** | WebP | 150 KB | 04 Projects · FES |
| 5 | `assets/projects/spf.webp` | **1600 × 1000** | WebP | 150 KB | 04 Projects · SPF |
| 6 | `assets/projects/wooden-nest.webp` | **1600 × 1000** | WebP | 150 KB | 04 Projects · Wooden Nest |
| 7 | `assets/cv.pdf` | A4 | PDF | 1 MB | Hero bottom-right card (optional) |
| — | `og.png` (repo root) | 1200 × 630 | PNG | — | **Already exists, but is not committed yet.** Social previews 404 until it is. |

## How to switch each one on

**Portrait.** Shoot or cut out on a dark or transparent background, single
key light from above, head in the upper third, shoulders cropped by the bottom
edge. In `index.html`, find `PORTRAIT SLOT` and uncomment the `<picture>`. The
red orb hides itself; the red glow stays behind you as a back-light.

**Project screenshots.** In each project card, uncomment the `<img>` under the
placeholder. The outline lettering is covered automatically. Crop to 16:10;
browser chrome is optional.

**CV.** In the hero's bottom-right card (`hero__br`), set `href="assets/cv.pdf"`,
add the `download` attribute, and change the pill text from `View Work` to
`Download CV`.

## Converting to WebP

```bash
# Google's cwebp (libwebp). Quality 78–82 is a good balance.
cwebp -q 80 portrait.jpg -o assets/portrait.webp
cwebp -q 80 -resize 1600 1000 amber.png -o assets/projects/amber.webp
```
Any exporter that writes WebP (Figma, Photoshop, squoosh.app in the browser)
works just as well.
