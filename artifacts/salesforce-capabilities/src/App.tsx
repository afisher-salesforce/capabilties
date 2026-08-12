import { useEffect, useRef } from 'react';
import {
  ClerkProvider,
  SignIn,
  SignUp,
  Show,
  useClerk,
  useUser,
} from '@clerk/react';
import { publishableKeyFromHost } from '@clerk/react/internal';
import { shadcn } from '@clerk/themes';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter, Redirect, useLocation } from 'wouter';

import ExecutiveSummary from '@/pages/executive-summary';
import ExternalResearch from '@/pages/external-research';
import PlatformFramework from '@/pages/platform-framework';
import Dreamforce from '@/pages/dreamforce';
import TeamDesign from '@/pages/team-design';
import CapabilitiesHub from '@/pages/capabilities-hub';
import DomainPage from '@/pages/domain-page';
import ForwardLookingStatements from '@/pages/forward-looking-statements';
import NotFound from '@/pages/not-found';
import LandingPage from '@/pages/landing';
import AccessDenied from '@/pages/access-denied';

const queryClient = new QueryClient();

// REQUIRED — copy verbatim per Clerk skill.
const clerkPubKey = publishableKeyFromHost(
  window.location.hostname,
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
);

if (!clerkPubKey) {
  throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY');
}

// REQUIRED — empty in dev (intentional), auto-populated in prod.
const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

function stripBase(path: string): string {
  return basePath && path.startsWith(basePath)
    ? path.slice(basePath.length) || '/'
    : path;
}

// ── Domain restriction ──────────────────────────────────────────────────────
const ALLOWED_DOMAINS = ['salesforce.com', 'siemens.com'];

function isAllowedDomain(email: string): boolean {
  return ALLOWED_DOMAINS.some((d) => email.toLowerCase().endsWith(`@${d}`));
}

function DomainGate({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const email = user?.primaryEmailAddress?.emailAddress ?? '';
  if (user && !isAllowedDomain(email)) {
    return <Redirect to="/access-denied" />;
  }

  return <>{children}</>;
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Show when="signed-in">
        <DomainGate>{children}</DomainGate>
      </Show>
      <Show when="signed-out">
        <Redirect to="/sign-in" />
      </Show>
    </>
  );
}

/** Wrap a page component so it requires auth + valid domain. */
function protect(Component: React.ComponentType) {
  return function Protected() {
    return (
      <ProtectedRoute>
        <Component />
      </ProtectedRoute>
    );
  };
}

// ── Route components ────────────────────────────────────────────────────────
function HomeRedirect() {
  return (
    <>
      <Show when="signed-in">
        <DomainGate>
          <ExecutiveSummary />
        </DomainGate>
      </Show>
      <Show when="signed-out">
        <LandingPage />
      </Show>
    </>
  );
}

function SignInPage() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12">
      <SignIn
        routing="path"
        path={`${basePath}/sign-in`}
        signUpUrl={`${basePath}/sign-up`}
      />
    </div>
  );
}

function SignUpPage() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12">
      <SignUp
        routing="path"
        path={`${basePath}/sign-up`}
        signInUrl={`${basePath}/sign-in`}
      />
    </div>
  );
}

// ── Cache invalidation on user change ──────────────────────────────────────
function ClerkQueryClientCacheInvalidator() {
  const { addListener } = useClerk();
  const qc = useQueryClient();
  const prevUserIdRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    return addListener(({ user }) => {
      const userId = user?.id ?? null;
      if (
        prevUserIdRef.current !== undefined &&
        prevUserIdRef.current !== userId
      ) {
        qc.clear();
      }
      prevUserIdRef.current = userId;
    });
  }, [addListener, qc]);

  return null;
}

// ── Clerk appearance (dark Siemens theme) ──────────────────────────────────
const clerkAppearance = {
  theme: shadcn,
  cssLayerName: 'clerk',
  options: {
    logoPlacement: 'inside' as const,
    logoLinkUrl: basePath || '/',
    logoImageUrl: `${window.location.origin}${basePath}/logo.svg`,
    socialButtonsVariant: 'iconButton' as const,
  },
  variables: {
    colorPrimary: '#00b4b4',
    colorForeground: '#e8f4ff',
    colorMutedForeground: '#7aa2be',
    colorDanger: '#ef4444',
    colorBackground: '#0f1f31',
    colorInput: '#0a1929',
    colorInputForeground: '#e8f4ff',
    colorNeutral: '#1a3352',
    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    borderRadius: '0.5rem',
  },
  elements: {
    rootBox: 'w-full flex justify-center',
    cardBox:
      'bg-[#0f1f31] rounded-xl w-[440px] max-w-full overflow-hidden border border-[#1a3352] shadow-xl shadow-black/40',
    card: '!shadow-none !border-0 !bg-transparent !rounded-none',
    footer: '!shadow-none !border-0 !bg-[#0a1929] !rounded-none',
    headerTitle: 'text-[#e8f4ff] font-bold',
    headerSubtitle: 'text-[#7aa2be]',
    socialButtonsBlockButtonText: 'text-[#e8f4ff]',
    formFieldLabel: 'text-[#7aa2be] text-sm',
    footerActionLink: 'text-[#00b4b4]',
    footerActionText: 'text-[#7aa2be]',
    dividerText: 'text-[#7aa2be]',
    identityPreviewEditButton: 'text-[#00b4b4]',
    formFieldSuccessText: 'text-[#40e0d0]',
    alertText: 'text-[#e8f4ff]',
    logoBox: 'mb-1',
    logoImage: 'h-10 w-auto',
    socialButtonsBlockButton:
      'border-[#1a3352] bg-[#0a1929] hover:bg-[#162840]',
    formButtonPrimary:
      'bg-[#00b4b4] hover:bg-[#009999] text-[#07101a] font-semibold',
    formFieldInput: 'bg-[#0a1929] border-[#1a3352] text-[#e8f4ff]',
    footerAction: '!bg-[#0a1929]',
    dividerLine: 'bg-[#1a3352]',
    alert: 'bg-[#1a3352] border-[#1a3352]',
    otpCodeFieldInput: 'bg-[#0a1929] border-[#1a3352] text-[#e8f4ff]',
    formFieldRow: '',
    main: '',
  },
};

// ── Router ──────────────────────────────────────────────────────────────────
function Router() {
  return (
    <Switch>
      <Route path="/" component={HomeRedirect} />
      {/* REQUIRED — /*? is the only wouter wildcard that matches Clerk OAuth sub-paths */}
      <Route path="/sign-in/*?" component={SignInPage} />
      <Route path="/sign-up/*?" component={SignUpPage} />
      <Route path="/access-denied" component={AccessDenied} />
      <Route path="/research" component={protect(ExternalResearch)} />
      <Route path="/framework" component={protect(PlatformFramework)} />
      <Route path="/dreamforce" component={protect(Dreamforce)} />
      <Route path="/team-design" component={protect(TeamDesign)} />
      <Route path="/capabilities" component={protect(CapabilitiesHub)} />
      <Route path="/capabilities/:id" component={protect(DomainPage)} />
      <Route
        path="/forward-looking-statements"
        component={protect(ForwardLookingStatements)}
      />
      <Route component={NotFound} />
    </Switch>
  );
}

function ClerkProviderWithRoutes() {
  const [, setLocation] = useLocation();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      proxyUrl={clerkProxyUrl}
      appearance={clerkAppearance}
      signInUrl={`${basePath}/sign-in`}
      signUpUrl={`${basePath}/sign-up`}
      localization={{
        signIn: {
          start: {
            title: 'Siemens DISW',
            subtitle: 'Sign in to access the Salesforce capabilities discussion',
          },
        },
        signUp: {
          start: {
            title: 'Request Access',
            subtitle: 'Use your @salesforce.com or @siemens.com email to continue',
          },
        },
      }}
      routerPush={(to) => setLocation(stripBase(to))}
      routerReplace={(to) => setLocation(stripBase(to), { replace: true })}
    >
      <QueryClientProvider client={queryClient}>
        <ClerkQueryClientCacheInvalidator />
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

function App() {
  return (
    <WouterRouter base={basePath}>
      <ClerkProviderWithRoutes />
    </WouterRouter>
  );
}

export default App;
