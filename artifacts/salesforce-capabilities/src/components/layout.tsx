import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { domainsData } from '@/data/capabilities';
import CapabilitySearch from '@/components/capability-search';
import { capabilitiesGroupMeta, primaryNavItems } from '@/config/site-navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isCapabilitiesExpanded, setIsCapabilitiesExpanded] = useState(
    location.startsWith('/capabilities')
  );
  const collapseStorageKey = 'salesforce-capabilities-nav-collapsed';

  // Scroll to top on location change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const persistedState = window.localStorage.getItem(collapseStorageKey);
    setIsNavCollapsed(persistedState === 'true');
  }, []);

  useEffect(() => {
    window.localStorage.setItem(collapseStorageKey, String(isNavCollapsed));
  }, [isNavCollapsed]);

  const capabilitiesIndex = primaryNavItems.findIndex((item) => item.href === '/capabilities');
  const navBeforeCapabilities = primaryNavItems.slice(0, capabilitiesIndex);
  const navAfterCapabilities = primaryNavItems.slice(capabilitiesIndex + 1);
  const navToggleLabel = isNavCollapsed ? 'Show Navigation' : 'Hide Navigation';
  const navTogglePositionClass = isNavCollapsed ? 'left-4' : 'left-[19.25rem]';
  const mobileToggleLabel = isMobileMenuOpen ? 'Hide' : 'Show';

  return (
    <div className="min-h-[100dvh] flex flex-col md:flex-row bg-background text-foreground">
      <button
        type="button"
        aria-label={navToggleLabel}
        className={`hidden md:flex fixed top-4 z-50 rounded-md border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors items-center justify-center px-3 py-1.5 text-xs font-semibold shadow-sm ${
          navTogglePositionClass
        }`}
        onClick={() => setIsNavCollapsed(!isNavCollapsed)}
      >
        {navToggleLabel}
      </button>

      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between gap-3 p-4 border-b border-border bg-card sticky top-0 z-40">
        <div className="font-semibold text-primary truncate">Siemens DISW</div>
        <button
          type="button"
          aria-label={isMobileMenuOpen ? 'Hide navigation' : 'Show navigation'}
          className="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {mobileToggleLabel}
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 bg-card border-r border-border transform transition-all duration-200 ease-in-out
          ${isNavCollapsed ? 'md:w-0 md:overflow-hidden md:border-r-0' : 'md:w-72'}
          md:translate-x-0 md:static md:flex-shrink-0 flex flex-col
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          w-72
        `}
      >
        <div className="p-6 border-b border-border hidden md:block">
          <h1 className="text-xl font-bold tracking-tight text-foreground">Siemens DISW</h1>
          <p className="text-xs text-muted-foreground mt-1">Salesforce Capabilities Discussion</p>
        </div>

        <div className="px-4 pt-4">
          <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground/80 mb-2">Search</p>
        </div>
        <CapabilitySearch onNavigate={() => setIsMobileMenuOpen(false)} />

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <div className="mb-5">
            <p className="px-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground/80 mb-2">Overview</p>
          {navBeforeCapabilities.map((link) => {
            const isActive = location === link.href;
            return (
              <Link key={link.name} href={link.href} className="block">
                <div
                  className={`flex items-center gap-3 px-3 py-2.5 border-l-2 transition-colors ${
                    isActive
                      ? 'text-primary font-semibold border-primary'
                      : 'text-muted-foreground hover:text-foreground border-transparent'
                  }`}
                >
                  <link.icon size={18} />
                  {link.name}
                </div>
              </Link>
            );
          })}
          </div>

          {/* Expandable Capabilities Section */}
          <div className="mt-2 pt-4 border-t border-border">
            <p className="px-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground/80 mb-2">Architecture</p>
            <div className="mb-1">
              <div
                className={`flex items-center justify-between px-3 py-2.5 cursor-pointer border-l-2 transition-colors ${
                  location === '/capabilities' || location.startsWith('/capabilities/')
                    ? 'text-primary font-semibold border-primary'
                    : 'text-muted-foreground hover:text-foreground border-transparent'
                }`}
              >
                <Link href="/capabilities" className="flex items-center gap-3 flex-1">
                  <div className="flex items-center gap-3">
                    <capabilitiesGroupMeta.icon size={18} />
                    {capabilitiesGroupMeta.title}
                  </div>
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsCapabilitiesExpanded(!isCapabilitiesExpanded);
                  }}
                  className="p-1 rounded-sm hover:text-primary"
                >
                  {isCapabilitiesExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
              </div>
            </div>

            {isCapabilitiesExpanded && (
              <div className="pl-9 space-y-1 mt-1">
                {domainsData.map((domain) => {
                  const href = `/capabilities/${domain.id}`;
                  const isActive = location === href;
                  return (
                    <Link key={domain.id} href={href} className="block">
                      <div
                        className={`px-3 py-2 text-sm transition-colors border-l-2 ${
                          isActive
                            ? 'text-primary font-semibold border-primary'
                            : 'text-muted-foreground hover:text-foreground border-transparent'
                        }`}
                      >
                        {domain.name}
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-8 pt-4 border-t border-border">
            <p className="px-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground/80 mb-2">Appendix</p>
          {navAfterCapabilities.map((link) => {
            const isActive = location === link.href;
            return (
              <Link key={link.name} href={link.href} className="block">
                <div
                  className={`flex items-center gap-3 px-3 py-2.5 border-l-2 transition-colors ${
                    isActive
                      ? 'text-primary font-semibold border-primary'
                      : 'text-muted-foreground hover:text-foreground border-transparent'
                  }`}
                >
                  <link.icon size={18} />
                  {link.name}
                </div>
              </Link>
            );
          })}
          </div>
        </nav>

        <div className="p-4 border-t border-border">
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-2">Powered by</p>
          <div className="bg-white rounded-lg border border-border px-3 py-2 flex justify-center">
            <img src="/salesforce-logo.jpg" alt="Salesforce" className="h-8 w-auto" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex-1">
          {children}
        </div>
        
        {/* Footer */}
        <footer className="mt-12 py-6 px-8 border-t border-border bg-card text-center text-xs text-muted-foreground">
          Siemens DISW | Salesforce Capabilities Discussion | Confidential — For Internal Use Only
        </footer>
      </main>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
