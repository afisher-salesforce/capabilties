# Clerk Authentication Implementation Guide
### Named-User Registration via Google OAuth on Replit

This guide documents exactly how to implement Clerk authentication in a Replit-hosted React + Express app so that a named corporate user (e.g. `afisher@salesforce.com`) can register and sign in via Google OAuth, and Clerk correctly presents gated content to allowed users.

Salesforce uses Google Workspace as its email and identity provider, so **"Sign in with Google"** is the primary path. The patterns below make it work correctly both in local development and in published Replit deployments.

---

## How It Works End-to-End

```
User clicks "Sign in with Google"
  → Clerk redirects to Google OAuth consent screen
  → Google authenticates the user (afisher@salesforce.com)
  → Google returns an OAuth token to Clerk
  → Clerk creates/updates an account linked to that email
  → Clerk sets a session cookie
  → App's DomainGate reads user.primaryEmailAddress
  → Email checked against ALLOWED_DOMAINS + ADMIN_EMAILS
  → Allowed → content rendered / Denied → access-denied page
```

Clerk handles all OAuth token exchange. The app only ever sees the verified email address.

---

## 1. Prerequisites

- A **Replit pnpm monorepo** with at least two artifacts:
  - A **React/Vite frontend** (the web app)
  - An **Express API server** (the backend)
- Clerk provisioned via the Replit **Auth pane** (not the external Clerk dashboard).  
  All configuration — enabling Google OAuth, branding, allowed sign-up methods — is done through the Auth pane in the Replit workspace toolbar.

---

## 2. Package Installation

### Frontend (React/Vite artifact)

```bash
pnpm --filter @workspace/<your-frontend> add @clerk/react @clerk/themes
```

### Backend (Express API artifact)

```bash
pnpm --filter @workspace/<your-api> add @clerk/express @clerk/shared http-proxy-middleware
```

Exact versions confirmed working:

| Package | Version |
|---|---|
| `@clerk/react` | `^6.14.1` |
| `@clerk/themes` | `^2.4.57` |
| `@clerk/express` | `^2.1.55` |
| `@clerk/shared` | `^4.28.1` |
| `http-proxy-middleware` | `^4.2.0` |

---

## 3. Environment Secrets

Replit auto-provisions three secrets when you enable Auth. Verify all three exist in the Secrets pane:

| Secret | Used by |
|---|---|
| `CLERK_PUBLISHABLE_KEY` | API server (`@clerk/express`) |
| `CLERK_SECRET_KEY` | API server (proxy middleware) |
| `VITE_CLERK_PUBLISHABLE_KEY` | Frontend (Vite exposes `VITE_` vars to the browser) |

Do **not** hardcode these values anywhere. The frontend reads `VITE_CLERK_PUBLISHABLE_KEY` via `import.meta.env`; the backend reads the others via `process.env`.

---

## 4. Frontend Setup

### 4a. CSS Layer Order (Critical for Tailwind v4)

The very first lines of your main CSS file must declare the layer order **before** any imports. If this is missing, Clerk's styles will fight with Tailwind's and produce broken UI.

```css
/* src/index.css — first lines, no exceptions */
@layer theme, base, clerk, components, utilities;
@import 'tailwindcss';
@import 'tw-animate-css';
@import '@clerk/themes/shadcn.css';
```

### 4b. Vite Config — Disable Tailwind Optimization

With Tailwind v4 + Clerk themes in production builds, you must disable Tailwind's optimizer or the Clerk theme import is stripped:

```ts
// vite.config.ts
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss({ optimize: false }),  // ← required; plain tailwindcss() breaks in prod
    // ...
  ],
});
```

### 4c. Publishable Key Resolution

Replit uses a multi-domain proxy. Use `publishableKeyFromHost` so the correct key is selected whether the app is accessed via the dev domain or the published domain:

```ts
// App.tsx (or main entry)
import { publishableKeyFromHost } from '@clerk/react/internal';

const clerkPubKey = publishableKeyFromHost(
  window.location.hostname,
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
);

if (!clerkPubKey) {
  throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY');
}

// Empty string in dev (intentional) — auto-populated in production
const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;
```

> **Why:** The dev publishable key starts with `pk_test_` and the prod key with `pk_live_`. `publishableKeyFromHost` picks the right one based on the hostname. Without this, the published app uses the wrong key and auth silently fails.

### 4d. Domain Restriction + Admin Bypass

After sign-in, read the verified email from Clerk and gate access. Named admin accounts can bypass domain rules entirely.

```ts
// Domains whose users are allowed access
const ALLOWED_DOMAINS = ['salesforce.com', 'siemens.com'];

// Named accounts that always pass regardless of domain rules
const ADMIN_EMAILS = new Set([
  'afisher@salesforce.com',
  'bill.schermer@salesforce.com',
]);

function isAllowedDomain(email: string): boolean {
  const normalized = email.toLowerCase();
  return (
    ADMIN_EMAILS.has(normalized) ||
    ALLOWED_DOMAINS.some((d) => normalized.endsWith(`@${d}`))
  );
}

function DomainGate({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();

  // Show spinner while Clerk resolves the session
  if (!isLoaded) {
    return <div className="loading-spinner" />;
  }

  const email = user?.primaryEmailAddress?.emailAddress ?? '';
  if (user && !isAllowedDomain(email)) {
    return <Redirect to="/access-denied" />;
  }

  return <>{children}</>;
}
```

> **Important:** This check runs client-side after Clerk's token validation. It is an access-control layer, not an authentication layer. Clerk itself still issues a valid session; the app then decides whether to show content.

### 4e. Routing — Wouter Wildcard Pattern

Clerk's Google OAuth flow uses sub-paths under `/sign-in` (e.g. `/sign-in/sso-callback`). The route **must** use `/*?` (wouter's optional wildcard) to match these:

```ts
// ✅ Correct — catches /sign-in, /sign-in/sso-callback, /sign-in/factor-one, etc.
<Route path="/sign-in/*?" component={SignInPage} />
<Route path="/sign-up/*?" component={SignUpPage} />

// ❌ Wrong — misses OAuth sub-paths; Google callback lands on 404
<Route path="/sign-in" component={SignInPage} />
```

If you use React Router instead of Wouter, use `path="/sign-in/*"`.

### 4f. ClerkProvider — Full Configuration

```tsx
import { ClerkProvider, SignIn, SignUp, Show, useClerk, useUser } from '@clerk/react';
import { shadcn } from '@clerk/themes';

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

function ClerkProviderWithRoutes() {
  const [, setLocation] = useLocation(); // wouter

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      proxyUrl={clerkProxyUrl}          // required for published Replit apps
      appearance={{
        theme: shadcn,
        cssLayerName: 'clerk',          // must match the @layer declaration in CSS
        variables: {
          colorPrimary: '#your-brand-color',
          // ... other design tokens
        },
      }}
      signInUrl={`${basePath}/sign-in`}
      signUpUrl={`${basePath}/sign-up`}
      routerPush={(to) => setLocation(stripBase(to))}
      routerReplace={(to) => setLocation(stripBase(to), { replace: true })}
    >
      {/* your app */}
    </ClerkProvider>
  );
}
```

The `routerPush` / `routerReplace` callbacks tell Clerk how to navigate inside your SPA router. Without them, Clerk falls back to `window.location` and breaks client-side routing.

### 4g. SignIn Component

```tsx
function SignInPage() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center">
      <SignIn
        routing="path"                        // required — tells Clerk this is path-based
        path={`${basePath}/sign-in`}          // must match the Route path
        signUpUrl={`${basePath}/sign-up`}
      />
    </div>
  );
}
```

### 4h. Home Route — Signed-In vs. Signed-Out

The home route (`/`) must render different content based on auth state, **not** redirect to `/sign-in` unconditionally. Clerk needs a public landing page to complete OAuth callbacks on the home path:

```tsx
function HomeRedirect() {
  return (
    <>
      <Show when="signed-in">
        <DomainGate>
          <YourDashboardPage />
        </DomainGate>
      </Show>
      <Show when="signed-out">
        <LandingPage />   {/* public marketing/login page */}
      </Show>
    </>
  );
}
```

### 4i. Protecting Other Routes

```tsx
function protect(Component: React.ComponentType) {
  return function Protected() {
    return (
      <>
        <Show when="signed-in">
          <DomainGate>
            <Component />
          </DomainGate>
        </Show>
        <Show when="signed-out">
          <Redirect to="/sign-in" />
        </Show>
      </>
    );
  };
}

// Usage
<Route path="/dashboard" component={protect(Dashboard)} />
```

---

## 5. Backend Setup

### 5a. Clerk Frontend API Proxy Middleware

Copy this file verbatim. It proxies Clerk's authentication API through your domain, which is required for the published `.replit.app` domain (Clerk cannot use its default `clerk.dev` CNAME without DNS configuration you don't control on Replit).

```ts
// src/middlewares/clerkProxyMiddleware.ts
import type { IncomingHttpHeaders } from 'http';
import type { RequestHandler } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const CLERK_FAPI = 'https://frontend-api.clerk.dev';
export const CLERK_PROXY_PATH = '/api/__clerk';

export function getClerkProxyHost(req: {
  headers: IncomingHttpHeaders;
}): string | undefined {
  const forwarded = req.headers['x-forwarded-host'];
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  const firstHop = raw?.split(',')[0]?.trim();
  return firstHop || req.headers.host?.trim() || undefined;
}

export function clerkProxyMiddleware(): RequestHandler {
  // Only active in production — dev instances don't need proxying
  if (process.env.NODE_ENV !== 'production') {
    return (_req, _res, next) => next();
  }

  const secretKey = process.env.CLERK_SECRET_KEY;
  if (!secretKey) {
    return (_req, _res, next) => next();
  }

  return createProxyMiddleware({
    target: CLERK_FAPI,
    changeOrigin: true,
    selfHandleResponse: true,
    pathRewrite: (path: string) =>
      path.replace(new RegExp(`^${CLERK_PROXY_PATH}`), ''),
    on: {
      proxyReq: (proxyReq, req) => {
        const protocol = req.headers['x-forwarded-proto'] || 'https';
        const host = getClerkProxyHost(req) || '';
        const proxyUrl = `${protocol}://${host}${CLERK_PROXY_PATH}`;
        proxyReq.setHeader('Clerk-Proxy-Url', proxyUrl);
        proxyReq.setHeader('Clerk-Secret-Key', secretKey);
        const xff = req.headers['x-forwarded-for'];
        const clientIp =
          (Array.isArray(xff) ? xff[0] : xff)?.split(',')[0]?.trim() ||
          req.socket?.remoteAddress || '';
        if (clientIp) proxyReq.setHeader('X-Forwarded-For', clientIp);
      },
      proxyRes: (proxyRes, req, res) => {
        const headers = { ...proxyRes.headers };
        delete headers['transfer-encoding'];
        delete headers['connection'];
        delete headers['keep-alive'];
        const status = proxyRes.statusCode ?? 502;
        if (status < 200 || status === 204) delete headers['content-length'];
        const bodyless =
          req.method === 'HEAD' || status < 200 || status === 204 || status === 304;
        if (headers['content-length'] !== undefined || bodyless) {
          res.writeHead(status, headers);
          proxyRes.on('error', () => res.destroy());
          proxyRes.pipe(res);
          return;
        }
        const chunks: Buffer[] = [];
        proxyRes.on('data', (chunk: Buffer) => chunks.push(chunk));
        proxyRes.on('end', () => {
          const body = Buffer.concat(chunks);
          headers['content-length'] = String(body.length);
          res.writeHead(status, headers);
          res.end(body);
        });
        proxyRes.on('error', () => {
          if (!res.headersSent) res.writeHead(502, { 'content-length': '0' });
          res.end();
        });
      },
    },
  }) as RequestHandler;
}
```

> **Why `selfHandleResponse: true`:** The Replit deployment edge (Cloud Run) rejects chunked Transfer-Encoding. Buffering the response lets us set a `Content-Length` before forwarding, converting chunked responses to length-known ones.

### 5b. Express App Wiring

The proxy middleware **must** be mounted before `express.json()` because it streams raw bytes:

```ts
// src/app.ts
import { clerkMiddleware } from '@clerk/express';
import { publishableKeyFromHost } from '@clerk/shared/keys';
import {
  CLERK_PROXY_PATH,
  clerkProxyMiddleware,
  getClerkProxyHost,
} from './middlewares/clerkProxyMiddleware';

const app = express();

// 1. Clerk proxy — MUST be before body parsers
app.use(CLERK_PROXY_PATH, clerkProxyMiddleware());

// 2. Body parsers
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Clerk session middleware
app.use(
  clerkMiddleware((req) => ({
    publishableKey: publishableKeyFromHost(
      getClerkProxyHost(req) ?? '',
      process.env.CLERK_PUBLISHABLE_KEY,
    ),
  })),
);

// 4. Your routes
app.use('/api', router);
```

---

## 6. Google OAuth Configuration

Google OAuth is enabled through the Replit **Auth pane** (not the Clerk dashboard). Once enabled, the "Sign in with Google" button appears automatically on the `<SignIn>` component — no code change needed.

**How named-user registration works with Google OAuth:**

1. User clicks "Sign in with Google" on the Clerk sign-in card.
2. Google's OAuth consent screen appears. The user selects or is auto-selected into their corporate account (`afisher@salesforce.com`).
3. Google returns the verified email to Clerk as part of the OAuth token.
4. Clerk creates an account if one doesn't exist, or resumes an existing session.
5. Clerk sets a signed session cookie for that account.
6. The app's `DomainGate` component reads `user.primaryEmailAddress.emailAddress` — this is the Google-verified email, not self-reported — and checks it against `ALLOWED_DOMAINS` and `ADMIN_EMAILS`.
7. Allowed users see content. Others are redirected to `/access-denied`.

**The email is always the Google-verified address.** Users cannot change it during OAuth sign-in. This makes domain and named-account checks reliable.

---

## 7. Access-Denied Page

Provide a route at `/access-denied` for users who complete OAuth but fail the domain check:

```tsx
// src/pages/access-denied.tsx
import { useClerk } from '@clerk/react';

export default function AccessDenied() {
  const { signOut } = useClerk();
  return (
    <div>
      <h1>Access Restricted</h1>
      <p>This resource is only available to @salesforce.com and @siemens.com accounts.</p>
      <button onClick={() => signOut({ redirectUrl: '/' })}>
        Sign Out
      </button>
    </div>
  );
}
```

---

## 8. Common Pitfalls

| Symptom | Root Cause | Fix |
|---|---|---|
| Google callback lands on 404 | Route uses `/sign-in` not `/sign-in/*?` | Add the `/*?` wildcard |
| Published app shows auth errors, dev works | `publishableKeyFromHost` not used | Replace bare `import.meta.env.VITE_CLERK_PUBLISHABLE_KEY` with `publishableKeyFromHost(...)` |
| Clerk styles broken / missing in prod | Tailwind optimizer strips `@clerk/themes` import | Set `tailwindcss({ optimize: false })` in vite.config.ts |
| Clerk styles fight Tailwind classes | `@layer` declaration missing or in wrong order | First lines of CSS must be `@layer theme, base, clerk, components, utilities;` |
| "Transfer-Encoding: chunked" 500 in prod | Proxy middleware mounted after body parsers, or `selfHandleResponse` missing | Mount proxy before `express.json()`; use the full middleware above verbatim |
| User can sign in but sees wrong content | `clerkProxyUrl` not passed to `<ClerkProvider>` | Pass `proxyUrl={import.meta.env.VITE_CLERK_PROXY_URL}` |
| Named user blocked despite being in ADMIN_EMAILS | Email case mismatch | Always normalize with `.toLowerCase()` before checking |
| `routerPush` not wired | Clerk falls back to `window.location`, breaks SPA nav | Pass `routerPush` and `routerReplace` to `<ClerkProvider>` |

---

## 9. Development vs. Production Behaviour

| Behaviour | Development | Production |
|---|---|---|
| Clerk proxy | Disabled (passes through) | Active — routes `/api/__clerk` to `frontend-api.clerk.dev` |
| Publishable key | `pk_test_...` | `pk_live_...` (resolved by `publishableKeyFromHost`) |
| "Development mode" badge | Shown on sign-in card | Hidden |
| Google OAuth | Works — may show Clerk dev-instance consent screen | Works — uses production OAuth credentials |
| Session persistence | Cleared on browser close | Persistent per Clerk session settings |

---

## 10. Checklist for a New Project

- [ ] Install packages: `@clerk/react`, `@clerk/themes` (frontend); `@clerk/express`, `@clerk/shared`, `http-proxy-middleware` (backend)
- [ ] Verify three secrets exist: `VITE_CLERK_PUBLISHABLE_KEY`, `CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`
- [ ] CSS: `@layer theme, base, clerk, components, utilities;` is the very first line
- [ ] CSS: `@import '@clerk/themes/shadcn.css';` after Tailwind import
- [ ] vite.config.ts: `tailwindcss({ optimize: false })`
- [ ] App.tsx: use `publishableKeyFromHost` for the publishable key
- [ ] App.tsx: pass `proxyUrl={import.meta.env.VITE_CLERK_PROXY_URL}` to `<ClerkProvider>`
- [ ] App.tsx: wire `routerPush` and `routerReplace` to your SPA router
- [ ] Routes: `/sign-in/*?` and `/sign-up/*?` with the `/*?` wildcard
- [ ] Home route (`/`): renders landing page when signed out, dashboard when signed in — never an unconditional redirect
- [ ] Copy `clerkProxyMiddleware.ts` verbatim
- [ ] Mount proxy middleware **before** `express.json()` in `app.ts`
- [ ] Enable Google OAuth in the Replit Auth pane
- [ ] Define `ALLOWED_DOMAINS` and `ADMIN_EMAILS` in `DomainGate`
- [ ] Add `/access-denied` route with a Sign Out button
