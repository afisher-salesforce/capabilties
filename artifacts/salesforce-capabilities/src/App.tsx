import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import NotFound from '@/pages/not-found';

import ExecutiveSummary from '@/pages/executive-summary';
import ExternalResearch from '@/pages/external-research';
import PlatformFramework from '@/pages/platform-framework';
import Dreamforce from '@/pages/dreamforce';
import TeamDesign from '@/pages/team-design';
import CapabilitiesHub from '@/pages/capabilities-hub';
import DomainPage from '@/pages/domain-page';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={ExecutiveSummary} />
      <Route path="/research" component={ExternalResearch} />
      <Route path="/framework" component={PlatformFramework} />
      <Route path="/dreamforce" component={Dreamforce} />
      <Route path="/team-design" component={TeamDesign} />
      <Route path="/capabilities" component={CapabilitiesHub} />
      <Route path="/capabilities/:id" component={DomainPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
