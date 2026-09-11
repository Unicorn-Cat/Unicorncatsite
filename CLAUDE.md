# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # dev server on http://localhost:4321
npm run build     # static build to dist/
npm run preview   # serve dist/
npm run check     # astro check — TS + template diagnostics across .astro/.ts
npx prettier --write .   # prettier + prettier-plugin-astro (no format script)
```

No test suite. `npm run check` and `npm run build` are the gates: both type-check post frontmatter
against the content-collection schemas and fail on a bad post; `check` additionally reports TS and
template diagnostics that the build alone does not. Neither runs in CI yet (`deploy.yml` only builds).

**`@astrojs/check` is pinned to `0.9.6` on purpose — do not bump it.** From `0.9.7` on, the package
dropped its `main` field in favor of an `exports` map, and the `astro check` CLI in Astro 4.11 probes
for it with the legacy `resolve` package, which ignores `exports`. A newer version installs fine but
makes `astro check` claim the package is missing and prompt to install it. Bumping requires upgrading
Astro first.

Visual verification is done with headless Chrome screenshots against the dev server, e.g.:

```bash
'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' --headless=new --disable-gpu \
  --hide-scrollbars --window-size=1440,4100 --screenshot=<scratchpad>/home.png http://localhost:4321/
```

Desktop is 1440 wide, mobile 375. Breakpoints are 1023px and 767px.

## Architecture

Astro 4 static site (`unicorncatconsulting.com`), no UI framework, no client-side router. Deployed
to GitHub Pages by `.github/workflows/deploy.yml` on push to `main`; every PR also publishes a
preview under `https://unicorncatconsulting.com/pull/N/`.

### Base-href routing — the rule that bites

PR previews live on a subpath, so CI sets `BASE_URL` and the build sets `build.assetsPrefix` from it
(`astro.config.mjs`); `base.astro` emits `<base href={process.env.BASE_URL || "/"}>`.

**Every internal link and asset path must be relative with no leading slash.** `href="blog"`,
`href=""` for home, `src="logo-new.png"`. A leading `/` breaks preview deploys. In client scripts,
resolve URLs against `document.baseURI` (`new URL("blog", document.baseURI)`), never `location.origin`.

### Two visual shells

Pages pick one of two treatments, and components are paired to them:

- **Polished** (`/`, `/about`, `/404`) — brand marketing pages. `FooterPolished`, `ImageSlot`.
- **Board** (`/blog`, `/blog/[slug]`) — parchment bulletin-board / old-forum styling. Opt in with
  `<Base board>`, which sets `body.is-board`. `FooterBoard`, `BoardRow`.

`Nav` is shared and always uses the 1200px `.container` so the logo doesn't shift between shells.

### Styling

All CSS is one file: `src/styles/global.css`, imported once by `base.astro`. Tokens in `:root`
(type scale, spacing, radii, brand colors) come from the design handoff and are authoritative —
prefer an existing token over a literal value, and if a new value is needed add a token rather than
a one-off. Components carry class names, not scoped `<style>` blocks.

### Content collections (`src/content/config.ts`)

- **blog** — "The Workbench". Posts are partly written by a meeting-to-website pipeline that turns
  the weekly Alex + Dylan meeting into a lightly polished transcript post; a human merges the PR.
  Schema has both hand-authored board fields (`excerpt`, `badge`, `pinned`, `signoff`, `ctaHeading`)
  and pipeline fields (`description`, `authors`, `tags`, `sourceMeeting`, `episode`).
- **podcast** — the recording behind a transcript post. The pipeline can land episode files, but
  **the site renders no podcast pages**; don't add routes for it without being asked.

`src/content/*/_schema-example.md` documents the frontmatter each collection expects (underscore
prefix keeps them out of the collection). `views` is real counts only — omit it rather than invent a
number. Reading time is computed from the body in `lib/blog.ts`, never authored.

`src/lib/blog.ts` holds the author table (`AUTHORS`), date/view formatters, and the sort/filter
helpers (`visiblePosts` hides drafts in PROD only, `sortPinned`, `sortByDateDesc`). Use these rather
than re-implementing sorting or formatting in a page.

### Blog board state is client-side

The site is static, so `/blog` renders every row at build time and the inline script filters them
from the URL (`?category=`, `?q=`, `?page=`, 5 per page). Rows carry `data-category` and
`data-search`; zebra stripes and the last-row border are positional, so anything that changes row
visibility must call `restripe()`. Keeping state in the URL is deliberate — every view is linkable.

### Contact modal

`ContactModal` renders once per page from `base.astro`; any `.contact-trigger` button opens it
(`ContactTrigger` variants: violet / white / navlink / dark / text). There is no form endpoint, so a
valid submission is handed to the visitor's mail client via `mailto:` — the success copy says so.
Setting `CONTACT_ENDPOINT` in the component's script switches it to a real POST; the submitting and
failure states are already wired.

### Placeholders

`ImageSlot` renders a labeled neutral fill when no photo has been supplied; pass `src` once a real
image exists. `.sample-tag` styles mark sample content to be removed when real content lands.
