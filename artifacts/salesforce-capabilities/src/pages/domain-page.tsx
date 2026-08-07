import React, { useEffect } from 'react';
import { useRoute } from 'wouter';
import Layout from '@/components/layout';
import {
  domainsData,
  getAccessStatusLabel,
  getCapabilityTrainingRecommendations,
  isLicensedAccessStatus,
  resolveCapabilityAccessStatus,
} from '@/data/capabilities';
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

  const licensedCount = domain.capabilities.filter(c => isLicensedAccessStatus(resolveCapabilityAccessStatus(domain.id, c))).length;

  const formatLearningTime = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.round((minutes / 60) * 10) / 10;
      return `${hours}h`;
    }
    return `${minutes}m`;
  };

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
            <span className={licensedCount > 0 ? "text-[#40e0d0] font-medium" : "text-muted-foreground"}>
              {licensedCount} Licensed
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {domain.capabilities.map((cap) => {
            const accessStatus = resolveCapabilityAccessStatus(domain.id, cap);
            const isLicensed = isLicensedAccessStatus(accessStatus);
            const trainingRecommendations = getCapabilityTrainingRecommendations(domain.id, cap.code);
            return (
            <div
              key={cap.code}
              id={`cap-${cap.code}`}
              className={`bg-card rounded-xl p-6 flex flex-col transition-all duration-500 scroll-mt-8 ${
                isLicensed
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
                <div className={`flex-shrink-0 whitespace-nowrap border text-xs font-bold px-3 py-1 rounded-full tracking-wide ${
                  isLicensed
                    ? 'bg-[rgba(0,180,180,0.15)] text-[#40e0d0] border-primary'
                    : 'bg-background text-muted-foreground border-border'
                }`}>
                  {getAccessStatusLabel(accessStatus)}
                </div>
              </div>
              
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                {cap.description}
              </p>

              {trainingRecommendations.length > 0 && (
                <div className="mb-6 rounded-lg border border-primary/20 bg-[rgba(0,180,180,0.05)] p-4 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs uppercase tracking-widest font-semibold text-primary">Training Recommendations</p>
                    <p className="text-xs text-muted-foreground">
                      {trainingRecommendations.length} path{trainingRecommendations.length !== 1 ? 's' : ''} curated
                    </p>
                  </div>
                  <div className="space-y-3">
                    {trainingRecommendations.map((rec) => (
                      <a
                        key={rec.apiName}
                        href={rec.url}
                        target="_blank"
                        rel="noreferrer"
                        className="block rounded-md border border-border bg-card p-3 hover:border-primary/40 transition-colors"
                      >
                        <div className="flex items-center flex-wrap gap-2 mb-1.5">
                          <p className="text-sm font-semibold text-foreground">{rec.title}</p>
                          <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded border border-border text-muted-foreground">
                            {rec.type}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-1.5">
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-background border border-border text-muted-foreground">
                            {rec.audience}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-background border border-border text-muted-foreground">
                            {rec.level}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-background border border-border text-muted-foreground">
                            {formatLearningTime(rec.timeMinutes)}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{rec.whyItMatters}</p>
                      </a>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-auto pt-4 border-t border-border flex justify-between items-center text-xs">
                <span className="text-muted-foreground/60">Source</span>
                <span className="text-muted-foreground font-medium bg-background px-2 py-1 rounded border border-border">
                  {cap.source}
                </span>
              </div>
            </div>
          )})}
        </div>
      </div>
    </Layout>
  );
}
