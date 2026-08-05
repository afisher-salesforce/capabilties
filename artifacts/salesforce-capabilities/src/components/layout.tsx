import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
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

  return (
    <div className="min-h-[100dvh] flex flex-col md:flex-row bg-background text-foreground">
      <button
        type="button"
        aria-label={isNavCollapsed ? 'Show navigation' : 'Hide navigation'}
        className="fixed top-4 left-4 z-50 h-10 w-10 rounded-md border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors flex items-center justify-center"
        onClick={() => {
          if (window.innerWidth < 768) {
            setIsMobileMenuOpen(!isMobileMenuOpen);
            return;
          }
          setIsNavCollapsed(!isNavCollapsed);
        }}
      >
        {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Mobile Header */}
      <header className="md:hidden flex items-center p-4 pl-16 border-b border-border bg-card sticky top-0 z-40">
        <div className="font-semibold text-primary truncate">Siemens DISW</div>
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

        <CapabilitySearch onNavigate={() => setIsMobileMenuOpen(false)} />

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navBeforeCapabilities.map((link) => {
            const isActive = location === link.href;
            return (
              <Link key={link.name} href={link.href} className="block">
                <div
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${
                    isActive
                      ? 'bg-[rgba(0,180,180,0.15)] text-primary font-medium border-l-2 border-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground border-l-2 border-transparent'
                  }`}
                >
                  <link.icon size={18} />
                  {link.name}
                </div>
              </Link>
            );
          })}

          {/* Expandable Capabilities Section */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="mb-1">
              <div
                className={`flex items-center justify-between px-3 py-2.5 rounded-md cursor-pointer transition-colors ${
                  location === '/capabilities' || location.startsWith('/capabilities/')
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
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
                  className="p-1 rounded-sm hover:bg-[rgba(0,180,180,0.15)]"
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
                        className={`px-3 py-2 text-sm rounded-md transition-colors border-l-2 ${
                          isActive
                            ? 'bg-[rgba(0,180,180,0.15)] text-primary font-medium border-primary'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground border-transparent'
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

          {navAfterCapabilities.map((link) => {
            const isActive = location === link.href;
            return (
              <Link key={link.name} href={link.href} className="block">
                <div
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${
                    isActive
                      ? 'bg-[rgba(0,180,180,0.15)] text-primary font-medium border-l-2 border-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground border-l-2 border-transparent'
                  }`}
                >
                  <link.icon size={18} />
                  {link.name}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-2">Powered by</p>
          <div className="bg-white rounded-lg border border-border px-3 py-2 flex justify-center">
            <img src="/salesforce-logo.svg" alt="Salesforce" className="h-8 w-auto" />
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
