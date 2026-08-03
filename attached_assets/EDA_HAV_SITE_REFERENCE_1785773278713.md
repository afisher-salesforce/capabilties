# Siemens EDA HAV Executive Discussion Site
## Configuration & Design Reference

This document captures every decision made during the build of the EDA HAV executive site on Replit. Use it as a step-by-step blueprint to create a similar site for a new account.

---

## Table of Contents

1. [Project Architecture](#1-project-architecture)
2. [Replit Setup](#2-replit-setup)
3. [Tech Stack](#3-tech-stack)
4. [Design System](#4-design-system)
5. [Component Architecture](#5-component-architecture)
6. [Content Data Model](#6-content-data-model)
7. [Tab Structure](#7-tab-structure)
8. [Capability Mapping Pattern](#8-capability-mapping-pattern)
9. [Hero Image & Layout](#9-hero-image--layout)
10. [GitHub Sync Workflow](#10-github-sync-workflow)
11. [Replication Checklist](#11-replication-checklist)

---

## 1. Project Architecture

The project lives in a **pnpm monorepo** managed by Replit. Multiple independent apps ("artifacts") share a single repository and dependency catalog.

```
/ (repo root)
├── pnpm-workspace.yaml        # workspace config; lists artifacts/* and lib/*
├── artifacts/
│   ├── eda-inventory/         # ← this site
│   ├── mobility-field-engineer/
│   ├── nonprofit-forecasting/
│   ├── api-server/
│   └── mockup-sandbox/
└── lib/
    ├── api-client-react/
    └── db/
```

Each artifact under `artifacts/` is a fully independent Vite app with its own `package.json`, `vite.config.ts`, `src/`, and `public/` directory. They share nothing at runtime — only dev dependencies are deduplicated in the workspace catalog.

**Why a monorepo?**
Multiple client sites can be maintained in one Replit project, each on its own preview path, and pushed to a single GitHub repository from one place.

---

## 2. Replit Setup

### Creating the artifact

From the Replit Agent, a new artifact is bootstrapped using the `react-vite` scaffold:

- **Artifact kind:** `web`
- **Artifact dir:** `artifacts/eda-inventory`
- **Preview path:** `/` (root — so the dev URL lands here directly; other sites use sub-paths like `/mobility-field-engineer/`)
- **Workflow name:** `artifacts/eda-inventory: web`
- **Dev command:** `pnpm --filter @workspace/eda-inventory run dev`

### Vite configuration

Key decisions in `vite.config.ts`:

```ts
export default defineConfig({
  base: basePath,           // set from BASE_PATH env var injected by Replit
  server: {
    port,                   // set from PORT env var injected by Replit
    host: '0.0.0.0',
    allowedHosts: true,     // required — preview is proxied through Replit's iframe
  },
  plugins: [react(), tailwindcss(), runtimeErrorOverlay()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
  },
  build: {
    outDir: path.resolve(import.meta.dirname, 'dist/public'),
  },
});
```

**Critical:** `allowedHosts: true` must be set. Replit's preview pane is a proxied iframe — without this, Vite rejects requests from the preview origin and shows a blank page.

**Critical:** Never hardcode a port. Always read `process.env.PORT`. Replit assigns a unique port per artifact to avoid collisions.

### package.json name

The package name must follow the workspace convention: `@workspace/eda-inventory`. This is what `pnpm --filter` uses to target it.

---

## 3. Tech Stack

| Layer | Library | Version |
|---|---|---|
| Framework | React | 19.1.0 |
| Bundler | Vite | ^7.x |
| Styling | Tailwind CSS v4 | ^4.x |
| UI primitives | Radix UI | various |
| Routing | Wouter | ^3.3.5 |
| Data fetching | TanStack Query | ^5.x |
| Charts | Recharts | ^2.x |
| Animation | Framer Motion | ^12.x |
| Icons | Lucide React | ^0.5x |
| Type safety | TypeScript + Zod | — |

> **Note for this site:** The executive discussion site does not use routing, data fetching, charts, or animations. All those libraries are installed as part of the standard scaffold but are unused. The actual implementation is `App.tsx` + `index.css` — no third-party component library is used, by design.

**Why plain CSS instead of Tailwind for this site?**
The design tokens are a narrow custom palette (9 variables) tuned to Siemens brand colors. Plain CSS custom properties are faster to write and easier to share with another agent or developer than Tailwind utility classes. Tailwind is available for future pages.

---

## 4. Design System

All styles live in `artifacts/eda-inventory/src/index.css`. No external design system is used.

### Color tokens

```css
:root {
  --hav-bg:          #07181a;   /* page background */
  --hav-bg-elev:     #0c2227;   /* elevated surface */
  --hav-card:        #102d34;   /* card background */
  --hav-text:        #e8f4f4;   /* body text */
  --hav-muted:       #a7c0c3;   /* secondary text */
  --hav-accent:      #009999;   /* Siemens primary teal */
  --hav-accent-soft: #00bdbd33; /* teal at 20% opacity for borders */
  --hav-line:        #1b4950;   /* dividers and borders */
  --hav-good:        #48f0c8;   /* mint-teal for highlights / Executive Next Step */
  --hav-nav-bg:      #040c0d;   /* sticky nav background (darker than page) */
}
```

**Adapting for a new brand:**
Change `--hav-accent` to the client's primary color and adjust `--hav-accent-soft` to the same hue at ~20% opacity. Everything else (darks, text) can stay unless the brand requires a light-mode treatment.

### Typography

```css
font-family: Inter, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
```

System font stack — no web font loading, no FOUT, works offline. Inter is loaded from the OS on most modern machines.

### Radial gradient page background

```css
body {
  background:
    radial-gradient(circle at 20% 0%, #0f2e35, transparent 40%),
    radial-gradient(circle at 100% 20%, #124852, transparent 45%),
    var(--hav-bg);
}
```

Two overlapping radial gradients add depth without an image. The gradients use slightly lighter versions of the accent color family.

### Class naming convention

All classes are prefixed with `.hav-` to avoid collisions with Tailwind utilities or any future component library. For a new site, change the prefix to a short client/project abbreviation (e.g. `.mob-` for Mobility).

---

## 5. Component Architecture

The entire site is one React component: `artifacts/eda-inventory/src/App.tsx`. There are no sub-components or separate files. This is intentional for this use case — the site is read-only content, not an application.

### State

```ts
const [activeKey, setActiveKey] = useState("overview");
```

One piece of state: the active tab key. Everything else derives from it.

### Render structure

```tsx
<>
  <nav className="hav-sitenav">          {/* sticky tab bar — always visible */}
    ...tab buttons...
  </nav>

  {isOverview && (
    <div className="hav-hero">           {/* hero image — overview tab only */}
      <img ... />
      <div className="hav-hero-overlay"> {/* gradient + title text */}
    </div>
  )}

  {!isOverview && (
    <div className="hav-title-bar">     {/* slim title bar — all other tabs */}
  )}

  <div className="hav-container">        {/* max-width 1180px, centered */}

    {/* Special-case renders for data-heavy tabs */}
    {activeKey === "capability-map" && <CapabilityMapPanel />}
    {activeKey === "salesforce"     && <SalesforcePlatformPanel />}

    {/* Standard content tabs */}
    {isStandardTab && (
      <div className="hav-panel">
        <div className="hav-panel-head">...</div>
        {sections.map(s => <Section key={...} section={s} />)}
      </div>
    )}

  </div>
</>
```

---

## 6. Content Data Model

All content is typed and co-located in `App.tsx`. There is no CMS, no database, no API calls.

### Tab interface

```ts
interface Tab {
  key: string;      // used for routing/active state
  label: string;    // shown in the tab button
  title: string;    // shown in panel header
  summary: string;  // shown as subtitle in panel header
  sections: Section[];
}
```

### Section discriminated union

Each section has a `heading` and exactly one content variant:

```ts
type Section =
  | { heading: string; body: string }                          // paragraph text
  | { heading: string; bullets: string[] }                     // bullet list
  | { heading: string; cards: { k: string; v: string }[] }    // signal/insight cards
  | { heading: string; capabilities: {                         // Salesforce capability cards
        code: string;    // e.g. "DAG"
        name: string;    // e.g. "Agentic AI / Autonomous Agents"
        desc: string;    // one-sentence explanation in context
      }[]
    };
```

TypeScript's discriminated union enforces at compile time that each section has exactly one content type — no accidental mixing of bullets and cards in the same section.

### Special tab data

Two tabs (`capability-map` and `salesforce`) have their own dedicated data structures defined as module-level constants, not in the `tabs` array:

- `CAP_PHASES: CapPhase[]` — three implementation phases, each with a list of capabilities
- `CAP_GROUPS` — full Salesforce platform capability map, grouped by domain
- `FEATURED: Set<string>` — set of capability codes referenced in vignettes (used to highlight items in the Salesforce tab)
- `EXEC_NEXT_STEP: string` — the closing paragraph on the Capability Map tab

---

## 7. Tab Structure

| Order | Key | Label | Type | Description |
|---|---|---|---|---|
| 1 | `overview` | Connected Vision | Standard | Executive narrative + transformation arc + why now. Shows hero image. |
| 2 | `research` | External Brief | Standard | Market signals + narrative positioning for the Salesforce pitch. |
| 3 | `v1` | Vignette 1 | Standard | Current state → future state + Salesforce capabilities. |
| 4 | `v2` | Vignette 2 | Standard | Same structure as Vignette 1. |
| 5 | `v3` | Vignette 3 | Standard | Same structure as Vignette 1. |
| 6 | `v4` | Vignette 4 | Standard | Same structure as Vignette 1. |
| 7 | `v5` | Vignette 5 | Standard | Same structure as Vignette 1. |
| 8 | `capability-map` | Capability Map | Special | Phase 1/2/3 expansion path + Executive Next Step. |
| 9 | `salesforce` | Salesforce | Special | Full platform capability map, 14 domains, featured codes highlighted. |

**Replicating for a new account:**
- Keep the same tab order and structure.
- Replace vignette content with the new account's operational pain points.
- Update Salesforce capability codes in each vignette to match the actual capabilities relevant to the customer.
- Update `FEATURED` set to match the codes used in the new vignettes.

---

## 8. Capability Mapping Pattern

### Vignette capability cards

Each vignette's "Salesforce Capabilities" section uses `CODE: Name` format, sourced from the **Salesforce Business Capabilities Map v1.3 + Expert Additions**.

```ts
capabilities: [
  { code: "ORM", name: "Order Management",    desc: "..." },
  { code: "IEI", name: "Enterprise Integration", desc: "..." },
  { code: "DAG", name: "Agentic AI / Autonomous Agents", desc: "..." },
  { code: "IEP", name: "Enterprise Platform Connectors", desc: "..." },
]
```

**Card styling:** Teal-gradient card with the code in `--hav-accent` color, name in light text, description in muted text.

### EDA HAV capability mapping reference

| Vignette | ORM | IEI | IEP | DAG | FPM | FSM | ABI | DDH | ARI | VCM | VSS |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| V1 — Order close | ✓ | ✓ | ✓ | ✓ | | | | | | | |
| V2 — Capacity | | | | ✓ | ✓ | ✓ | ✓ | | | | |
| V3 — Finance | | | | ✓ | | | ✓ | ✓ | ✓ | | |
| V4 — Traveler | | ✓ | ✓ | | | | | ✓ | | ✓ | |
| V5 — Platform | | | | ✓ | | | ✓ | ✓ | | | ✓ |

### Capability Map phasing

The Capability Map tab groups capabilities into three phases:

| Phase | Title | Codes |
|---|---|---|
| 1 | Order Integrity and SAP Orchestration | ORM, IEI, IEP |
| 2 | Asset Intelligence and Financial Visibility | FPM, FSM, ABI, ARI |
| 3 | Connected Platform and Scaled Intelligence | DDH, VCM, DAG, VSS |

**Phasing logic:** Phase 1 = quick wins that reduce immediate pain (order/operations). Phase 2 = visibility and intelligence layer. Phase 3 = unified data model + AI + customer-facing.

### Salesforce platform tab

The Salesforce tab renders the full capability map (14 domains, ~90 capabilities) as a compact tag cloud. Capabilities in the `FEATURED` set get a mint-teal border and font weight:

```ts
const FEATURED = new Set(["ORM", "IEI", "DAG", "IEP", "FPM", "FSM", "ABI", "DDH", "ARI", "VCM", "VSS"]);
```

Update `FEATURED` for each new account to reflect the capabilities actually referenced in that site's vignettes.

---

## 9. Hero Image & Layout

### Hero image

- **File:** `artifacts/eda-inventory/public/cloud-ready-hero.avif`
- **Source:** Uploaded to `attached_assets/` then copied to `public/` with `cp`
- **Format:** AVIF — best compression for photographs, supported in all modern browsers
- **Reference in code:** `/cloud-ready-hero.avif` (absolute path served from Vite's `public/` dir)

```tsx
<img
  src="/cloud-ready-hero.avif"
  alt="Salesforce cloud platform hero"
  className="hav-hero-img"
/>
```

```css
.hav-hero-img {
  width: 100%;
  height: 420px;
  object-fit: cover;
  object-position: center 30%;   /* keeps subject (person) in frame */
}
```

**Gradient overlay:** A linear gradient from transparent at top to `rgba(7,24,26,0.95)` at bottom fades the image into the page background and makes white title text readable without a separate text-shadow background.

### Hero visibility rule

The hero is only shown on the `overview` (Connected Vision) tab. All other tabs show a slim title bar instead:

```tsx
const isOverview = activeKey === "overview";

{isOverview  && <div className="hav-hero">...</div>}
{!isOverview && <div className="hav-title-bar">...</div>}
```

**Why:** Repeating the hero on every tab feels like a mistake. The slim title bar maintains brand context (site name visible) without consuming viewport space.

### Sticky nav

```css
.hav-sitenav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #040c0d;           /* slightly darker than page bg */
  border-bottom: 1px solid var(--hav-line);
  padding: 0.55rem 0;
}
```

The nav bar is placed **outside** the main container so it spans full viewport width. Tabs wrap on narrow screens (`flex-wrap: wrap`).

---

## 10. GitHub Sync Workflow

### Setup (one-time)

The GitHub remote is added via shell:

```bash
git remote add origin https://github.com/<username>/<repo>.git
```

Replit auto-commits all file saves. To see commits, open the **Git pane** (top-right toolbar).

### Routine push

After Replit has auto-committed changes, push from the **Git pane** using the ↑ (push) button. Replit uses its GitHub OAuth connection (`afisher-salesforce` account, Active) — no token needed for a normal push.

### Force push (first sync only)

When pushing a Replit project to a GitHub repo that already has different history (e.g. you previously had a single HTML file there), a normal push fails with "Branch already exists." Two options:

**Option A — Git pane:**
Push → "Set upstream to origin/main" — works if Replit's UI accepts the force push. May show "Unknown Git Error" if histories are too divergent.

**Option B — Shell with temporary PAT (reliable):**

1. Create a GitHub Personal Access Token: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → `repo` scope.
2. Store it as a Replit Secret (`GITHUB_PAT`) via the Replit Agent or Secrets pane.
3. Run:
   ```bash
   git push https://<username>:${GITHUB_PAT}@github.com/<username>/<repo>.git main --force
   ```
4. Delete the secret immediately after:
   ```javascript
   await deleteEnvVars({ keys: ["GITHUB_PAT"], environment: "shared" });
   ```

After the first force push, all future pushes from the Git pane are non-forced and work normally.

### Importing from GitHub

To pull an existing repo into the Replit project:

```bash
git clone https://github.com/<username>/<repo>.git /tmp/myrepo
```

Then manually copy the relevant files into the artifact directory. For a single-file HTML React app, convert it into a proper Vite React component:
- Extract the `<style>` block → `src/index.css`
- Extract the `<script type="text/babel">` component → `src/App.tsx`
- Replace CDN `React.useState` with `import { useState } from "react"`
- Remove Babel standalone; Vite handles transpilation

---

## 11. Replication Checklist

Use this when building a similar site for a new account.

### Step 1 — Scaffold the artifact

Ask the Replit Agent:
> "Create a new web artifact called `[client-name]` using the react-vite scaffold at preview path `/[client-slug]/`"

### Step 2 — Set brand colors

In `src/index.css`, update the `:root` block:
```css
--hav-accent:      #009999;   /* ← replace with client primary color */
--hav-accent-soft: #00bdbd33; /* ← same hue, ~20% opacity */
--hav-good:        #48f0c8;   /* ← highlight/CTA color (can stay mint) */
```
Change the `--hav-` prefix to a client-specific prefix (e.g. `--mob-` for Mobility).

### Step 3 — Replace the class prefix

Find-and-replace `hav-` → `[client]-` across both `App.tsx` and `index.css`.

### Step 4 — Update tab content

In `App.tsx`, update the `tabs` array:
- `overview`: replace executive context, transformation arc, and "Why Now" bullets
- `research`: replace strategic signals and narrative positioning
- `v1`–`v5`: replace current state risks, future state shifts, and value drivers

### Step 5 — Map Salesforce capabilities to vignettes

For each vignette, identify 3–4 Salesforce capabilities from the Business Capabilities Map that power the future state. Use `CODE: Name` format. Update the `FEATURED` set to include all codes used.

### Step 6 — Update the Capability Map phases

Reorganize `CAP_PHASES` to reflect the logical phasing for the new account:
- Phase 1: capabilities that deliver value fastest / address most acute pain
- Phase 2: visibility, analytics, and intelligence layer
- Phase 3: unified platform, AI, and customer-facing capabilities

Update `EXEC_NEXT_STEP` with the specific call to action for that account.

### Step 7 — Add hero image

Upload a hero image (AVIF, JPG, or WebP) via the Replit file pane or `attached_assets/`. Copy it to `public/`:
```bash
cp attached_assets/[filename].[ext] artifacts/[client-slug]/public/hero.[ext]
```
Update the `src` in the `<img>` tag.

### Step 8 — Update site title

Change all occurrences of "Siemens EDA HAV | Executive Discussion Site" to the new account name throughout `App.tsx`.

### Step 9 — Push to GitHub

Connect the artifact's repo to GitHub via the Git pane (Settings → enter repo URL → connect). For first push to an existing repo, use the PAT method described in Section 10.

---

## File Reference

| File | Purpose |
|---|---|
| `artifacts/eda-inventory/src/App.tsx` | All content, types, data, and React rendering |
| `artifacts/eda-inventory/src/index.css` | All styles, design tokens, layout |
| `artifacts/eda-inventory/public/cloud-ready-hero.avif` | Hero image (overview tab only) |
| `artifacts/eda-inventory/vite.config.ts` | Vite/build configuration |
| `artifacts/eda-inventory/package.json` | Dependencies (`@workspace/eda-inventory`) |
| `artifacts/eda-inventory/tsconfig.json` | TypeScript configuration |
| `pnpm-workspace.yaml` | Monorepo workspace config and shared dependency catalog |

---

*Generated August 2026 — Siemens EDA HAV Executive Discussion Site, built on Replit.*
