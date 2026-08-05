import React from 'react';
import { Link } from 'wouter';
import Layout from '@/components/layout';
import { domainsData } from '@/data/capabilities';
import { ArrowRight } from 'lucide-react';
import PageFlowNav from '@/components/page-flow-nav';

export default function CapabilitiesHub() {
  const totalCapabilities = domainsData.reduce((acc, domain) => acc + domain.capabilities.length, 0);
  const selaCapabilities = domainsData.reduce((acc, domain) => 
    acc + domain.capabilities.filter(c => c.inSela).length, 0
  );

  return (
    <Layout>
      <div className="bg-card border-b border-border py-10 px-8 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,180,180,0.1)] to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-2">
              Salesforce Capabilities Map
            </h1>
            <p className="text-xl text-primary font-medium">
              14 domains covering the full platform
            </p>
          </div>
          
          {/* Summary SELA Bar */}
          <div className="bg-background border border-primary/30 rounded-lg p-4 flex items-center gap-6 shadow-sm">
            <div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider mb-1">SELA Coverage</div>
              <div className="text-2xl font-bold text-foreground">
                <span className="text-[#40e0d0]">{selaCapabilities}</span> <span className="text-muted-foreground text-lg font-normal">/ {totalCapabilities}</span>
              </div>
            </div>
            <div className="h-10 w-px bg-border"></div>
            <div className="text-sm text-muted-foreground max-w-[200px]">
              Capabilities officially licensed under the Siemens SELA.
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domainsData.map((domain) => {
            const total = domain.capabilities.length;
            const inSela = domain.capabilities.filter(c => c.inSela).length;
            
            return (
              <Link key={domain.id} href={`/capabilities/${domain.id}`} className="block group">
                <div className="h-full bg-card border border-border rounded-xl p-6 transition-all duration-200 hover:border-primary/50 hover:shadow-md hover:bg-card/80 flex flex-col relative overflow-hidden">
                  
                  {/* Subtle top border highlight if it contains SELA items */}
                  {inSela > 0 && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-[#40e0d0] opacity-70"></div>
                  )}

                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {domain.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-background rounded px-2.5 py-1 text-xs font-mono border border-border text-muted-foreground">
                      {total} Total
                    </div>
                    {inSela > 0 ? (
                      <div className="bg-[rgba(0,180,180,0.1)] rounded px-2.5 py-1 text-xs font-medium border border-primary/40 text-[#40e0d0]">
                        {inSela} in SELA
                      </div>
                    ) : (
                      <div className="bg-background rounded px-2.5 py-1 text-xs font-medium border border-border text-muted-foreground/50">
                        0 in SELA
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed flex-grow mb-6">
                    {domain.description}
                  </p>

                  <div className="flex items-center text-sm font-medium text-primary mt-auto group-hover:underline decoration-primary/50 underline-offset-4">
                    View Domain <ArrowRight size={16} className="ml-1.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <PageFlowNav currentPath="/capabilities" />
    </Layout>
  );
}
