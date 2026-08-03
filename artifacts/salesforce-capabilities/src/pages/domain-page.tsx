import React, { useEffect } from 'react';
import { useRoute } from 'wouter';
import Layout from '@/components/layout';
import { domainsData } from '@/data/capabilities';
import NotFound from './not-found';

export default function DomainPage() {
  const [match, params] = useRoute('/capabilities/:id');
  const domainId = params?.id;
  
  const domain = domainsData.find(d => d.id === domainId);

  // Scroll to a specific capability card when navigated from search (URL hash = capability code)
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    // Short delay lets the page render before scrolling
    const timer = setTimeout(() => {
      const el = document.getElementById(`cap-${hash}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('ring-2', 'ring-primary', 'ring-offset-2', 'ring-offset-background');
        setTimeout(() => el.classList.remove('ring-2', 'ring-primary', 'ring-offset-2', 'ring-offset-background'), 2500);
      }
    }, 120);
    return () => clearTimeout(timer);
  }, [domainId]);

  if (!match || !domain) {
    return <NotFound />;
  }

  const inSelaCount = domain.capabilities.filter(c => c.inSela).length;

  return (
    <Layout>
      <div className="bg-card border-b border-border py-10 px-8 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,180,180,0.05)] to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-5xl">
          <div className="text-sm text-primary font-semibold tracking-wider uppercase mb-2">Salesforce Domain</div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            {domain.name}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            {domain.description}
          </p>
          
          <div className="mt-6 flex items-center gap-4 text-sm">
            <span className="text-muted-foreground">{domain.capabilities.length} Total Capabilities</span>
            <span className="text-border">•</span>
            <span className={inSelaCount > 0 ? "text-[#40e0d0] font-medium" : "text-muted-foreground"}>
              {inSelaCount} Included in SELA
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {domain.capabilities.map((cap) => (
            <div 
              key={cap.code}
              id={`cap-${cap.code}`}
              className={`bg-card rounded-xl p-6 flex flex-col transition-all duration-500 scroll-mt-8 ${
                cap.inSela 
                  ? 'border-2 border-primary/60 shadow-[0_0_15px_rgba(0,180,180,0.1)]' 
                  : 'border border-border'
              }`}
            >
              <div className="flex justify-between items-start mb-4 gap-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-primary font-mono font-bold bg-primary/10 px-2 py-0.5 rounded text-sm">
                    {cap.code}
                  </span>
                  <h3 className="text-lg font-bold text-foreground">{cap.name}</h3>
                </div>
                
                {cap.inSela && (
                  <div className="flex-shrink-0 whitespace-nowrap bg-[rgba(0,180,180,0.15)] text-[#40e0d0] border border-primary text-xs font-bold px-3 py-1 rounded-full tracking-wide">
                    IN SELA
                  </div>
                )}
              </div>
              
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                {cap.description}
              </p>
              
              <div className="mt-auto pt-4 border-t border-border flex justify-between items-center text-xs">
                <span className="text-muted-foreground/60">Source</span>
                <span className="text-muted-foreground font-medium bg-background px-2 py-1 rounded border border-border">
                  {cap.source}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
