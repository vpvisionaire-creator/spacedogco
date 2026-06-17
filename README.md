# SPACEDOG — Mission Experience

A custom Astro build for spacedog.co. Premium portfolio meets NASA mission control.
"The Swiss Army knife of the creative space. We make it easy."

Not a template. One continuous cinematic scroll, with a signature interactive
Swiss Army knife section driven by GSAP ScrollTrigger.

---

## Run locally
```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs /dist
npm run preview
```
Requires Node 20+.

---

## File structure
```
spacedog/
├─ astro.config.mjs        # static output, HTML compression
├─ netlify.toml            # build + cache headers
├─ package.json            # astro + gsap
├─ ASSETS.md               # how to swap placeholders for real media/fonts
├─ public/
│  ├─ favicon.svg
│  └─ media/               # placeholder reel poster, project images, og
└─ src/
   ├─ data/site.js         # SINGLE SOURCE: nav, projects, blades, capabilities, clients
   ├─ styles/global.css    # design tokens + base + HUD primitives
   ├─ scripts/motion.js    # GSAP master: reveals, hero, KNIFE, parallax, nav
   ├─ layouts/Base.astro   # head/SEO, Nav, Footer, loads motion.js
   ├─ components/
   │  ├─ Nav.astro            # transparent → solid on scroll, mobile overlay, real symbol mark
   │  ├─ Footer.astro
   │  ├─ Hero.astro           # §01 space-station bay + realistic red toolbox trigger
   │  ├─ Toolbox.astro        # realistic red toolbox SVG (lid/latch/handle/stencil), open variant
   │  ├─ BrandStatement.astro # §02 pure type
   │  ├─ Toolkit.astro        # §03 SIGNATURE — pinned, toolbox→chaos→knife
   │  ├─ SwissKnife.astro     # real layered knife (8 blade PNGs + handle + HUD rings/labels)
   │  ├─ SelectedMissions.astro # §04 curated cards
   │  ├─ ProjectCard.astro
   │  ├─ Explorers.astro      # §05 philosophy + parallax
   │  ├─ Capabilities.astro   # §06 clean list, CAP IDs, underline hover
   │  ├─ Credibility.astro    # §07 real refs only
   │  └─ FinalCTA.astro       # §08 bookend
   └─ pages/
      ├─ index.astro          # homepage (8 sections in order)
      ├─ work/index.astro     # Selected Missions + filters
      ├─ work/[id].astro      # individual project (static-generated per project)
      ├─ about.astro          # "We Are Spacedog."
      ├─ identity.astro       # Brand Identity: logo system + color tokens + type
      └─ contact.astro        # "Start a Mission." + Netlify form
```

---

## The signature knife section (how it works)
`Toolkit.astro` is pinned by ScrollTrigger over ~300% scroll. A single scrubbed
GSAP timeline drives three phases:

1. **Problem** — the red toolbox opens and capability tags scatter (creative chaos), then fade.
2. **Solution** — one knife fades to center, closed.
3. **Deploy** — each real blade rotates from its hinge (closed→open), its HUD label
   reveals in sync, and the handle (with the SPCDG dog mark) pulses. Purple drop-shadow
   glow on the active blade. After all 8 deploy, the headline reveals.

**The artwork is real.** The knife is the actual `SPCDG_Knife (outlined).ai` file. Its
"SPCDG Knife" Illustrator layer was isolated and split into 8 transparent blade PNGs +
the handle, in `/public/media/knife/`. Exact geometry lives in `src/data/knife_layout.json`
(per-layer position %, the hinge, the transform-origin, and each blade's open angle).

Fold logic: every blade is rendered OPEN; `motion.js` computes a `closedDelta` to fold it
into the handle (the back "interview" tool folds to the 180° axis, all others to 0°,
normalized the short way). To re-tune resting angles, edit `closedDelta`/`foldAxis` in
`motion.js`. To replace artwork, re-export each layer to the same filename and update
`knife_layout.json`.

The hero's red toolbox (`Toolbox.astro`, realistic SVG with lid/latch/handle/stencil)
is the trigger: clicking it smooth-scrolls into the pinned section to start the sequence.

**Reduced motion:** `prefers-reduced-motion` disables the pin and all transforms —
the knife renders fully deployed and everything else fades only.

---

## Deploy — GitHub + Netlify
1. `git init && git add . && git commit -m "Spacedog mission experience"`
2. Push to a GitHub repo.
3. Netlify → **Add new site → Import from GitHub** → pick the repo.
4. Netlify auto-detects `netlify.toml`: build `npm run build`, publish `dist`.
5. Point the `spacedog.co` domain at the Netlify site (DNS).

The contact form uses **Netlify Forms** (`data-netlify="true"` + honeypot) — submissions
appear in the Netlify dashboard with zero backend. Disable by removing those attributes.

---

## Performance / accessibility
- Static HTML, inlined critical CSS, compressed output, immutable cache headers.
- Images lazy-load + async decode; hero video `preload="none"`.
- `will-change` only on animated blades.
- `prefers-reduced-motion` fully handled.
- Semantic landmarks, `aria-label`s on the knife and nav toggle, keyboard-reachable links.

---

## Assumptions made
- **Framer → Astro.** Blueprint specs Framer; translated 1:1 to a component-based
  Astro build per the request. Tokens, sections, copy, motion timings preserved.
- **Knife is native SVG**, not the raster reference, so GSAP can animate each blade
  independently. Styled to the reference (purple handle, dog mark, HUD rings/labels).
- **Project list** uses real titles named in the brief; imagery is placeholder pending
  real stills (ASSETS.md). Music-video slugs (Boston Richey, Tia Corine, Chainsmokers,
  Flipp Dinero) included as referenced.
- **No invented content** — no fake testimonials, stats, awards, or logos. Credibility
  shows real client text labels marked replaceable.
- **Capabilities** merged the blueprint list with the brief's list (kept the brief's).
- **Fonts** fall back to a heavy grotesque until Monument Extended is licensed.
- **Headline A** ("If the mission matters, let's talk.") used on the final CTA; swap
  for B/C in `FinalCTA.astro` if preferred.
