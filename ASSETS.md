# Spacedog — Replacing Placeholder Assets

Everything below ships as a placeholder so the site builds and runs immediately.
Swap in real Spacedog files at the same paths — no code changes needed.

## 1. Hero showreel (`/public/media/`)
| File | Replace with | Notes |
|---|---|---|
| `hero-reel.mp4` | brand showreel / cinematic film | H.264 MP4, muted, ~1080p, < 8 MB ideal. Add a `.webm` sibling for smaller payloads. |
| `hero-poster.svg` | `hero-poster.jpg` | First frame of the reel. **If you change the extension**, update `poster="…"` in `src/components/Hero.astro`. |

The hero `<video>` autoplays muted+loop and lazy-loads (`preload="none"`). It degrades to the poster on mobile / slow connections.

## 2. Project imagery (`/public/media/projects/`)
Each card pulls `media` from `src/data/site.js`. Replace these placeholders (currently `.svg`) with real `.jpg`/`.webp`:

`greedy-unit · af1 · trenches · hypebeast · barriers · nina-chanel · c4-yachty · snkrs · boston-richey · tia-corine · chainsmokers · flipp-dinero`

- Recommended: 1600×1000 `.webp`, compressed (TinyPNG/Squoosh).
- If you keep `.jpg`, update the `media` paths in `src/data/site.js` (one line each).

## 3. Explorers background (`/public/media/explorers.svg`)
Wide cinematic still or video frame. Swap to `explorers.jpg` and update the path in `src/components/Explorers.astro`.

## 4. OG / social image (`/public/media/og.svg`)
1200×630 share image. Swap to `og.jpg` and update `ogImage` default in `src/layouts/Base.astro`.

## 5. Credibility logos
`src/components/Credibility.astro` and the About page render **text placeholders** marked `data-placeholder-logo`. Replace with white SVG/PNG logos **only where you have rights**. Real references in `CLIENTS` (site.js): Nike, Jordan, Hypebeast, Facebook Gaming, Barriers, C4 Energy, Romeo Santos, Liquid I.V.

## 6. Fonts (`/public/fonts/`)
The display stack falls back to Arial Black until you license the real face. To install:
1. Drop `MonumentExtended-Bold.woff2` (or Neue Haas Grotesk Display) into `/public/fonts/`.
2. Add to `src/layouts/Base.astro` `<head>`:
```html
<style>
  @font-face{
    font-family:"Monument Extended";
    src:url("/fonts/MonumentExtended-Bold.woff2") format("woff2");
    font-weight:800; font-display:swap;
  }
</style>
```
Courier New (mono) is a system font — no file needed.

## 7. The knife (real artwork)
The knife is now the **real `SPCDG_Knife (outlined).ai`** artwork, split into layers in
`/public/media/knife/`:
`handle.png` + 8 blades (`branding, social, campaigns, commercials, music, editorial,
docu, interview`). Geometry is in `src/data/knife_layout.json`.

To replace with updated artwork:
1. Re-export each blade + the handle as transparent PNGs at the same filenames.
2. If positions/hinges change, regenerate `knife_layout.json` (per-layer `left_pct`,
   `top_pct`, `w_pct`, `origin_x_pct`, `origin_y_pct`, and each blade's `open` angle).
3. The handle must render on top (it hides the hinge overlap and pulses on deploy).

To re-tune how blades fold when closed, edit `closedDelta` / `foldAxis` in `src/scripts/motion.js`.

## 8. Brand logos
Real assets in `/public/media/brand/`:
- `symbol.png` — SPCDG dog-in-helmet mark (used in nav, hero, favicon, identity page)
- `full-logo.png` — full lockup (identity page)

**Wordmark note:** the uploaded `SPACEDOG_word_mark.png` / `_abbrv.png` files were blank
(all-black, no content), so the wordmark renders as styled text ("SPACEDOG" / "SPCDG") in
the brand display font. Re-export those PNGs with visible white art and drop them in to use
the real lockup; then swap the text in `Nav.astro` / `Footer.astro` for an `<img>`.
