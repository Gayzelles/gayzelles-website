# gayzelles.com

Single-page brochure site for the Gayzelles — a free LGBT+ 5K running, climbing & hiking club in South East London (Abbey Wood, Thamesmead, Woolwich).

Static HTML/CSS/JS. No build step.

Everything that gets published lives under `public/`. Anything outside `public/` (this README, `.gitignore`, `netlify.toml`) is repo-only and won't end up on the live site.

## What's on the page

- Hero with the rainbow-gradient wordmark and CTA buttons (Instagram + Strava)
- About / What we do (three cards: running, climbing, hiking)
- **When we meet** — the weekly schedule (Tue run / Thu climb / Sat parkrun) plus the embedded Strava club activity feed
- **Come join us** — IG and Strava cards (the Strava card embeds the club's weekly summary widget)
- Black footer with links to Strava, Instagram and Facebook — and a strip of mini gazelle logos racing across the top of it
- Click the hero logo for a small easter egg 🦌💫

## Local preview

```bash
./dev
# then visit http://localhost:8000
```

`./dev` just `cd`s into `public/` and runs `python3 -m http.server 8000`. Stop with `Ctrl+C`.

## Deploy to Netlify

The Netlify CLI is installed and this repo is already linked (`.netlify/state.json`). Three options:

1. **Git-linked (default)**: every push to `main` auto-deploys. Builds take ~3s. No action needed.
2. **Manual via CLI**: `netlify deploy --prod` (drop the `--prod` flag for a preview deploy).
3. **Drag and drop**: drag the `public/` folder onto https://app.netlify.com/drop.

The custom domain (`gayzelles.com`) is already wired up. SSL is provisioned automatically by Netlify via Let's Encrypt.

## Layout

```
.
├── CLAUDE.md            # guidance for future Claude Code sessions (not deployed)
├── README.md            # this file (not deployed)
├── dev                  # one-line shell script: cd public && python3 http.server (not deployed)
├── netlify.toml         # publish dir + headers (root only — not deployed)
├── .gitignore
├── .netlify/            # local Netlify CLI link (gitignored)
└── public/              # everything below here is deployed
    ├── index.html
    ├── styles.css
    ├── script.js
    ├── robots.txt
    ├── sitemap.xml
    └── assets/          # logo + favicons
```
