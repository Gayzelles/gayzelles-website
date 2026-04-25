# gayzelles.com

Single-page brochure site for the Gayzelles — an LGBT+ running, hiking and climbing group based in Abbey Wood, South East London.

Static HTML/CSS/JS. No build step.

Everything that gets published lives under `public/`. Anything outside `public/` (this README, `.gitignore`, `netlify.toml`) is repo-only and won't end up on the live site.

## Local preview

```bash
./dev
# then visit http://localhost:8000
```

`./dev` just `cd`s into `public/` and runs `python3 -m http.server 8000`. Stop with `Ctrl+C`.

## Deploy to Netlify

Two options:

1. **Git-linked (recommended)**: push this repo to GitHub, then "Add new site → Import an existing project" in Netlify and pick the repo. No build command needed; publish directory is `public` (already set in `netlify.toml`).
2. **Drag and drop**: drag the `public/` folder onto the Netlify deploy UI at https://app.netlify.com/drop.

After the first deploy, wire up the custom domain in **Site settings → Domain management → Add a domain** (`gayzelles.com` and `www.gayzelles.com`). Either delegate DNS to Netlify or add the records they specify at your registrar. SSL is provisioned automatically.

## Layout

```
.
├── netlify.toml         # publish dir + headers (root only — not deployed)
├── README.md            # this file (not deployed)
├── .gitignore
└── public/              # everything below here is deployed
    ├── index.html
    ├── styles.css
    ├── script.js
    ├── robots.txt
    ├── sitemap.xml
    └── assets/          # logo + favicons
```
