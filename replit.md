# Salesforce Capabilities — Siemens DISW

An executive-level discussion site for Salesforce account teams to walk Siemens Digital Industries Software (DISW) through their Salesforce platform capabilities, with particular focus on what is licensed under the Siemens Enterprise License Agreement (SELA).

## Run & Operate

- `pnpm --filter @workspace/salesforce-capabilities run dev` — run the site (port assigned by workflow)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 19 + Vite, Tailwind CSS v4, Wouter routing
- All content is static — no backend, no database, no API calls

## Site Structure

| Route | Content |
|---|---|
| `/` | Executive Summary — hero image, SELA at a glance, inclusions/exclusions, key nuances |
| `/research` | External Research Brief — DISW company overview, products, executives, financials, transformation signals |
| `/capabilities` | Salesforce Capabilities Hub — 14 domain cards with SELA coverage counts |
| `/capabilities/:domain` | Individual domain pages — all capabilities with IN SELA badges |

14 domain pages: analytics-reporting, billing, collaboration, cpq, data-ai, field-service, industry-solutions, integration, marketing, order, partner, platform-governance, sales, service

## Where things live

- `artifacts/salesforce-capabilities/src/App.tsx` — layout, routing, sidebar navigation
- `artifacts/salesforce-capabilities/src/data/capabilities.ts` — all 97 capabilities across 14 domains, SELA flags
- `artifacts/salesforce-capabilities/src/index.css` — design tokens (Siemens deep blue/teal dark theme)
- `artifacts/salesforce-capabilities/public/disw-hero.jpeg` — hero image (Executive Summary page)
- `attached_assets/` — source reference documents (PDFs, MD, JPEG)

## Design Decisions

- Left sidebar navigation instead of tabs — 17 sections is too many for a tab bar at executive level
- "IN SELA" teal badge system on all capability cards — instantly scannable in a live meeting
- Hero image used only on Executive Summary with gradient mask overlay
- Dark theme: `#07101a` background, `#00b4b4` teal accent, `#40e0d0` mint for SELA highlights
- All content is static (no backend) — the site is a reference document, not an application

## SELA Coverage

27 of 97 capabilities are licensed in the Siemens SELA (March 2025 – September 2028):
- Data & AI: 9/9 (all included — Agentforce, Data Cloud, Einstein Trust Layer)
- Field Service: 5/8
- Service: 5/13
- Sales: 5/15
- Analytics & Reporting: 2/4
- Industry Solutions: 1/3

## User preferences

- Executive presentation style — dense but organized, no emojis
- Dark theme following Siemens brand palette (deep blue + teal)
- Left sidebar navigation preferred over tabs for sites with many sections
- Hero image with gradient mask approach (not full-bleed)
