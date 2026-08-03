import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ChevronDown, ChevronRight, FileText, BarChart3, Database, Layers, Star, Users } from 'lucide-react';
import { domainsData } from '@/data/capabilities';
import CapabilitySearch from '@/components/capability-search';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCapabilitiesExpanded, setIsCapabilitiesExpanded] = useState(
    location.startsWith('/capabilities')
  );

  // Scroll to top on location change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Executive Summary', href: '/', icon: FileText },
    { name: 'External Research', href: '/research', icon: BarChart3 },
    { name: 'Platform Framework', href: '/framework', icon: Layers },
    { name: "Dreamforce '26", href: '/dreamforce', icon: Star },
    { name: 'Team Design', href: '/team-design', icon: Users },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col md:flex-row bg-background text-foreground">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card sticky top-0 z-40">
        <div className="font-semibold text-primary truncate">Siemens DISW</div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 -mr-2 text-muted-foreground hover:text-foreground"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 w-72 bg-card border-r border-border transform transition-transform duration-200 ease-in-out
          md:translate-x-0 md:static md:flex-shrink-0 flex flex-col
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-6 border-b border-border hidden md:block">
          <h1 className="text-xl font-bold tracking-tight text-foreground">Siemens DISW</h1>
          <p className="text-xs text-muted-foreground mt-1">Salesforce Capabilities Discussion</p>
        </div>

        <CapabilitySearch onNavigate={() => setIsMobileMenuOpen(false)} />

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navLinks.map((link) => {
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
                    <Database size={18} />
                    Salesforce Capabilities
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
        </nav>
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
