# Executive Briefing Site — Replit Build Guide

A step-by-step reference for building account-specific, executive-level discussion websites on Replit using this project as the template. These sites are designed for high-stakes pre-meeting preparation: static content, dark brand theme, sidebar navigation, global search, and Replit password-protected publishing.

---

## What This Template Produces

A multi-page internal briefing site with:
- **Left sidebar navigation** — persistent across all pages, collapsible sub-sections, mobile drawer
- **Themed dark design** — fully customizable brand colors via CSS custom properties
- **Static data layer** — all content lives in TypeScript data files, no database or backend required
- **Global capability/item search** — real-time fuzzy search across all data with keyboard navigation and scroll-to-target
- **Hero image page** — gradient-masked background image for the executive summary landing page
- **Badge system** — highlight items with a specific status (e.g. "IN SELA", "LICENSED", "LIVE")
- **Password-protected publishing** — Replit's built-in access control at deploy time

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | React 19 + TypeScript | Type-safe, component-based |
| Build tool | Vite 7 | Fast HMR, reads `PORT` + `BASE_PATH` env vars |
| Styling | Tailwind CSS v4 + CSS custom properties | Theme tokens, utility-first |
| Routing | Wouter | Lightweight client-side routing, no server needed |
| Icons | Lucide React | Consistent icon set |
| Monorepo | pnpm workspaces | Replit's standard multi-artifact structure |
| Hosting | Replit Deployments (Static/Web) | Password protection, CDN, instant publish |

---

## Project Structure

```
artifacts/<site-slug>/
├── src/
│   ├── App.tsx                    # Router — add a <Route> per page here
│   ├── main.tsx                   # Entry point (do not edit)
│   ├── index.css                  # ALL brand tokens live here (colors, fonts, radius)
│   ├── components/
│   │   ├── layout.tsx             # Sidebar, mobile drawer, footer — edit nav links here
│   │   └── capability-search.tsx  # Global search component (reusable as-is)
│   ├── data/
│   │   └── capabilities.ts        # ← Your primary content file. Replace this entirely.
│   └── pages/
│       ├── executive-summary.tsx  # Landing page with hero image
│       ├── external-research.tsx  # Company/account research page
│       ├── capabilities-hub.tsx   # Grid of all domain cards
│       ├── domain-page.tsx        # Dynamic page for each domain (reads from data file)
│       ├── platform-framework.tsx # Strategic framework page (3-layer model)
│       ├── dreamforce.tsx         # Event/roadmap priority page
│       └── team-design.tsx        # Org/team design page
├── public/
│   └── hero.jpeg                  # Hero image for the executive summary page
├── package.json
└── vite.config.ts                 # Do not edit — reads PORT and BASE_PATH from env
```

---

## Step 1 — Create the Artifact

In Replit, use the **artifacts skill** to register a new web artifact. This generates the Vite scaffold, wires up the workflow, and assigns a `PORT` and `BASE_PATH`. Give it a slug matching your site name, e.g. `my-account-briefing`.

The artifact's `previewPath` in `artifact.toml` will be `/my-account-briefing`. By convention the slug and previewPath should match.

> Never edit `vite.config.ts` or `artifact.toml` directly — use the artifact tools.

---

## Step 2 — Set Your Brand Theme

Open `src/index.css`. Every color in the site derives from CSS custom properties in the `:root, .dark` block. Edit these values only:

```css
:root, .dark {
  --background:       212 57% 6%;    /* Page background */
  --foreground:       209 100% 95%;  /* Primary text */

  --card:             215 58% 11%;   /* Card/sidebar background */
  --card-foreground:  209 100% 95%;

  --primary:          180 100% 35%;  /* Accent color — links, badges, active states */
  --primary-foreground: 212 57% 6%;

  --secondary:        216 51% 21%;   /* Subtle fills */
  --muted-foreground: 210 33% 61%;   /* Dimmed text */

  --border:           216 51% 21%;   /* All borders */

  --app-font-sans: 'Inter', 'Segoe UI', system-ui, sans-serif;
  --radius: 0.5rem;
}
```

Values are `H S% L%` (HSL without `hsl()`). For a light theme, swap background to a high lightness value and foreground to a low one — everything adapts automatically.

**Quick brand mapping:**
- Siemens teal → `--primary: 180 100% 35%`
- Salesforce blue → `--primary: 211 100% 50%`
- AWS orange → `--primary: 28 100% 52%`
- SAP blue → `--primary: 214 79% 45%`

---

## Step 3 — Replace the Data File

`src/data/capabilities.ts` is the single source of truth for all structured content. The shape is:

```typescript
export interface Capability {
  code: string;       // Short uppercase code, e.g. "DAG" — used as the URL anchor ID
  name: string;       // Display name
  inSela: boolean;    // Badge condition — rename this field to match your use case
  source: string;     // Attribution label shown at the bottom of each card
  description: string;
}

export interface Domain {
  id: string;         // URL slug — used in /capabilities/:id routing
  name: string;       // Display name for the domain
  description: string;
  capabilities: Capability[];
}

export const domainsData: Domain[] = [ /* ... */ ];
```

**To adapt for a non-Salesforce use case**, rename fields in the interface and find/replace across the pages:
- `inSela` → `isLicensed`, `isLive`, `isContracted`, etc.
- `"IN SELA"` badge text → whatever label fits
- Domain names and capability codes → your content

The global search component (`capability-search.tsx`) reads `domainsData` directly and requires no changes when you rename content — it searches `code`, `name`, `description`, and `domainName` automatically.

---

## Step 4 — Update the Sidebar Navigation

Open `src/components/layout.tsx`. Find the `navLinks` array near the top and edit it:

```typescript
const navLinks = [
  { name: 'Executive Summary',  href: '/',           icon: FileText },
  { name: 'External Research',  href: '/research',   icon: BarChart3 },
  { name: 'Platform Framework', href: '/framework',  icon: Layers },
  { name: "Dreamforce '26",     href: '/dreamforce', icon: Star },
  { name: 'Team Design',        href: '/team-design', icon: Users },
];
```

Icons come from `lucide-react` — browse the full set at [lucide.dev](https://lucide.dev).

The **Salesforce Capabilities** section below the nav links is the collapsible domain browser. It auto-generates from `domainsData`. To rename it, search for `"Salesforce Capabilities"` in `layout.tsx` and replace the string.

---

## Step 5 — Add/Remove Pages

### Adding a new page

1. Create `src/pages/my-new-page.tsx`:

```tsx
import React from 'react';
import Layout from '@/components/layout';

export default function MyNewPage() {
  return (
    <Layout>
      {/* Page header bar — matches site style */}
      <div className="bg-card border-b border-border py-10 px-8 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,180,180,0.1)] to-transparent pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-2">
            Page Title
          </h1>
          <p className="text-xl text-primary font-medium">Subtitle</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6 md:p-12 space-y-12">
        {/* Content sections here */}
      </div>
    </Layout>
  );
}
```

2. Register the route in `src/App.tsx`:

```tsx
import MyNewPage from '@/pages/my-new-page';

// Inside the Router's <Switch>:
<Route path="/my-new-page" component={MyNewPage} />
```

3. Add a nav link in `layout.tsx` (see Step 4).

### Removing a page

Delete the file, remove the `<Route>` from `App.tsx`, and remove the entry from `navLinks`.

---

## Step 6 — Replace the Hero Image

Place your hero image in `artifacts/<site-slug>/public/` and update the reference in `src/pages/executive-summary.tsx`:

```tsx
style={{ backgroundImage: "url('/your-image.jpeg')" }}
```

The gradient mask (`bg-gradient-to-b from-transparent via-background/60 to-background`) handles the fade automatically — swap it for `from-transparent to-background` for a harder edge.

Recommended image dimensions: **1600×900px minimum**, landscape.

---

## Common Page Patterns

### Numbered callout grid (Key Nuances style)
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {items.map((item, i) => (
    <div key={i} className="bg-card/50 border border-primary/20 rounded-lg p-5">
      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
        <span className="text-primary font-mono text-sm border border-primary/30 rounded px-1.5 py-0.5">
          {String(i + 1).padStart(2, '0')}
        </span>
        {item.title}
      </h4>
      <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
    </div>
  ))}
</div>
```

### Status badge pill
```tsx
{item.isLicensed && (
  <div className="bg-[rgba(0,180,180,0.15)] text-[#40e0d0] border border-primary text-xs font-bold px-3 py-1 rounded-full tracking-wide whitespace-nowrap">
    LICENSED
  </div>
)}
```

### Metric chip row
```tsx
<div className="flex flex-wrap gap-2">
  {metrics.map((m) => (
    <span key={m} className="text-xs bg-[rgba(0,180,180,0.1)] text-primary border border-primary/20 rounded-full px-2.5 py-1 font-medium">
      {m}
    </span>
  ))}
</div>
```

### Tinted callout box
```tsx
<section className="bg-[rgba(0,180,180,0.05)] border border-primary/30 rounded-xl p-6 md:p-8">
  <p className="text-lg font-semibold text-foreground mb-2">Key insight</p>
  <p className="text-muted-foreground leading-relaxed">{insight}</p>
</section>
```

### Data table
```tsx
<div className="overflow-x-auto rounded-lg border border-border">
  <table className="w-full text-sm text-left">
    <thead className="text-xs text-muted-foreground uppercase bg-card/80 border-b border-border">
      <tr>
        <th className="px-6 py-4">Column A</th>
        <th className="px-6 py-4">Column B</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-border">
      {rows.map((row, i) => (
        <tr key={i} className="bg-background hover:bg-card/50 transition-colors">
          <td className="px-6 py-4 font-medium text-foreground">{row.a}</td>
          <td className="px-6 py-4 text-muted-foreground">{row.b}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

---

## The Global Search Component

`src/components/capability-search.tsx` is self-contained and reusable. It:
- Pre-builds a flat search index from `domainsData` at module load time (fast, no runtime cost)
- Searches `code`, `name`, `description`, and `domainName` fields
- Highlights matched text inline
- Supports keyboard navigation (↑ ↓ Enter Escape)
- On select, navigates to `/capabilities/:domainId#CODE` and the domain page scrolls + highlights the card
- Closes on outside click and on mobile nav close via the `onNavigate` callback

**To adapt for different content:** change the `Result` interface fields and update the filter logic in the `results` computation. The rendering and keyboard logic need no changes.

**Scroll-to anchor pattern** (in `domain-page.tsx`):
```tsx
useEffect(() => {
  const hash = window.location.hash.replace('#', '');
  if (!hash) return;
  const timer = setTimeout(() => {
    const el = document.getElementById(`cap-${hash}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-2', 'ring-primary', 'ring-offset-2', 'ring-offset-background');
      setTimeout(() => el.classList.remove('ring-2', 'ring-primary', 'ring-offset-2', 'ring-offset-background'), 2500);
    }
  }, 120); // short delay for page render
  return () => clearTimeout(timer);
}, [domainId]);
```
Add `id={`cap-${item.code}`}` to each card element.

---

## Replit-Specific Configuration

### PORT and BASE_PATH
Replit assigns a unique `PORT` to each artifact. `vite.config.ts` reads both `PORT` and `BASE_PATH` from env vars and will throw at build time if either is missing. **Never hardcode these.** The artifact scaffold sets them automatically.

### Path-based routing
This project uses Wouter for client-side routing. All routes are relative to `BASE_PATH`. Do not use root-relative URLs like `/api/...` — they escape the artifact's prefix. Use `import.meta.env.BASE_URL` if you need to construct absolute-path URLs in code.

### allowedHosts
`vite.config.ts` sets `server.allowedHosts: true` — required because Replit's preview pane proxies requests through an iframe from a different origin.

### Replit pnpm workspace
Each artifact lives in `artifacts/<slug>/` and is declared in `pnpm-workspace.yaml`. Its package name follows `@workspace/<slug>`. Shared utilities go in `packages/` at the monorepo root.

---

## Publishing with Password Protection

1. In the Replit workspace, click **Deploy** (or use the `SuggestUserAction deploy` prompt).
2. Choose **Static** deployment (this app has no server).
3. Under **Access**, enable **Password Protection** and set a PIN or passphrase.
4. Deploy. Replit provisions a `.replit.app` subdomain with the access control applied.

> Replit's password protection is a lightweight gate — it is not a substitute for full authentication in truly sensitive contexts. For higher security, add a React-side PIN gate backed by `sessionStorage` before publishing, so the content is never rendered for unauthorized users even if the Replit gate is bypassed.

---

## Adapting This Template for Other Account Sites

| What to change | File(s) |
|---|---|
| Brand colors | `src/index.css` — `:root, .dark` block |
| Hero image | `public/<image>` + `src/pages/executive-summary.tsx` |
| All structured content | `src/data/capabilities.ts` |
| Nav links + sidebar label | `src/components/layout.tsx` |
| Routes | `src/App.tsx` |
| Page content | `src/pages/*.tsx` |
| Badge label ("IN SELA") | `src/pages/domain-page.tsx` + `src/components/capability-search.tsx` |
| Search fields | `src/components/capability-search.tsx` — `Result` interface + filter logic |
| Footer text | `src/components/layout.tsx` — bottom of `<footer>` |
| Site title | `src/components/layout.tsx` — `<h1>` in sidebar header |
| Browser tab title | `index.html` — `<title>` tag |

Estimated time to produce a new account site from this template: **2–4 hours** for content research and data entry; the structural code requires minimal changes.

---

## What NOT to Do

- **Do not edit `vite.config.ts`** — it reads Replit env vars that the platform manages.
- **Do not edit `artifact.toml` directly** — use the Replit artifact tools.
- **Do not hardcode `localhost` URLs** in page code — use the base path helpers.
- **Do not add a backend/API** unless you genuinely need dynamic data. Every page in this template renders from static TypeScript data — that is a feature, not a limitation.
- **Do not put secrets in the data files** — contract pricing, internal rates, or personally sensitive information. The data files are committed to the repo.

---

*Template built on Replit · React 19 + Vite 7 + Tailwind CSS v4 · pnpm workspaces*
