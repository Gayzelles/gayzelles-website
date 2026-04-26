# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A single-page static brochure site for **Gayzelles**, an LGBT+ 5K running, climbing & hiking club in South East London. Hosted on Netlify at `gayzelles.com`. No framework, no build step, no `package.json` — just HTML, CSS, and one tiny vanilla JS file.

## Common commands

```bash
# Local preview — runs python3 -m http.server inside public/, because the
# HTML uses absolute paths like /styles.css and /assets/logo.png that
# resolve against the publish root.
./dev
# then visit http://localhost:8000

# Deploy via Netlify CLI (alternative to Git-linked auto-deploys)
npx netlify deploy --dir=public --prod
```

There are no tests, no linter, no build step.

## Architecture

The single most important rule: **only `public/` is deployed.** `netlify.toml` sets `publish = "public"`, so anything outside that directory (CLAUDE.md, README.md, .gitignore, screenshots, ad-hoc notes) stays in the repo and never reaches the live site. Add a new asset → put it under `public/assets/` and reference it with an absolute path. Add a config or doc file → put it at the repo root.

Layout:

```
.
├── dev                  # one-line shell script for local preview (root only)
├── netlify.toml         # publish dir + security/cache headers (root only)
├── README.md / CLAUDE.md / .gitignore
└── public/              # ← only this gets deployed
    ├── index.html       # the entire page (header, hero, About, What we do,
    │                    #   When we meet, Join, footer)
    ├── styles.css       # all styling, mobile-first
    ├── script.js        # mobile hamburger nav, footer racing-gazelle
    │                     #   spawner, and hero-logo easter egg (click →
    │                     #   leap + confetti + toast). Vanilla JS, no deps.
    ├── robots.txt / sitemap.xml
    └── assets/          # logo + 32px / 180px / 256px / 1024px favicon variants
```

## Conventions that aren't visible from a single file

- **Modern browsers only.** No polyfills, no smooth-scroll JS fallback (CSS `scroll-behavior: smooth` is relied on), no vendor-prefix bloat. Don't add backwards-compat shims unless asked.
- **Mobile-first**, single primary breakpoint at `768px`. Above it: full nav bar, multi-column card grids. Below it: hamburger nav and stacked cards.
- **CSS custom properties in `:root` are the design system.** All colour, spacing-ish, radius and shadow tokens live there. The notable ones:
  - `--pride` — the rainbow gradient used as a 4px top page border, under section titles, on the hero word-mark, and on `.event-header` strips.
  - `--strava` (`#fc4c02`) — Strava brand orange.
  - `--ig-gradient` — the Instagram orange→pink→purple brand gradient.
  - `--strava-tint` / `--ig-tint` — translucent versions used for hover-state box-shadows.
- **Brand-coloured CTAs use BEM-style modifier classes**: `.btn--ig` / `.btn--strava` and `.join-card--ig` / `.join-card--strava`. The brand modifiers must be ordered after `.btn-primary` / `.btn-ghost` in the cascade so their hover overrides win at equal specificity. If you add a new platform-branded CTA, follow this pattern rather than inlining colours.
- **Section titles** use a small pride-gradient underline via `.section-title::after` — keep h2s using `.section-title` to maintain the pattern.
- **Sticky header** has `scroll-padding-top: 5rem` on `<html>` to keep anchored sections from being hidden under the header. Update this if header height changes.
- **Tone**: warm, friendly, inclusive. Emojis are welcome and used (✨ ☺️ 💫 🦌 🏃 🧗 🥾) — this is a deliberate choice for this project, not a default. The general "no emojis in code" instruction does **not** apply to copy in `index.html` here.
- **Cache headers**: `/assets/*` is served with `max-age=31536000, immutable`. If you replace an asset with a new version, change its filename rather than relying on cache invalidation.
- **Open Graph / Twitter meta `image` URLs must be absolute** (`https://gayzelles.com/...`), not relative. WhatsApp and iMessage fetch the meta tags server-side and have no notion of the site's domain — relative URLs silently produce imageless previews.
- **Benign console errors from Strava iframes**: the embedded Strava widgets log `jQuery is not defined` and `Strava.module is not a function` errors that originate inside the iframes (Strava's bug, not ours). Don't chase them.

## Linkable URLs (real, in production use)

- Strava club: `https://www.strava.com/clubs/gayzelles`
- Instagram: `https://instagram.com/gayzelles`
- Facebook: `https://www.facebook.com/profile.php?id=61581252675035`
- Production domain: `https://gayzelles.com`

## Netlify

The site is Git-linked and auto-deploys on every push to `main`. Builds take ~3s
(no build step). Project ID: `962beb33-dbd1-4a02-9339-6147721bb9cf`. Useful when
the local Netlify CLI is linked:

```bash
netlify status
netlify api listSiteDeploys --data='{"site_id":"962beb33-dbd1-4a02-9339-6147721bb9cf","per_page":5}'
```
