import React from 'react';
import Layout from '@/components/layout';
import PageFlowNav from '@/components/page-flow-nav';
import type { TrainingRecommendation } from '@/data/capabilities';

const roles = [
  {
    role: 'Executive Sponsor / CDO',
    responsibilities: 'Defines data strategy, signs off on governance, aligns senior leadership. In some companies, this is the Chief Data Officer.',
    diswImplication: 'Andrew Allan (CIO) is the natural sponsor. The question is whether a CDO-level voice exists or is needed within DISW IT.',
    recommendationPriority: 'core',
  },
  {
    role: 'Enterprise / Data Architect',
    responsibilities: 'Owns the overall data strategy and Data 360 integration within DISW\'s technology landscape. Performs data quality assessments. Advises on the Data Cloud One architecture (Data Spaces, Home Org vs. Companion Org).',
    diswImplication: 'High-priority role recommendation. Companion org and data architecture decisions are strongest when a senior EA owns Data 360 architecture end-to-end.',
    recommendationPriority: 'high',
  },
  {
    role: 'Solution / Technical Architect',
    responsibilities: 'Leads use case identification and refinement, hands-on Data 360 configuration, connectivity to SAP and source systems. Post-implementation, identifies additional use cases and maintains connectivity.',
    diswImplication: 'DISW has Salesforce admins and developers — this is a distinct seniority level that bridges business and platform architecture.',
    recommendationPriority: 'core',
  },
  {
    role: 'Business Analyst',
    responsibilities: 'Ensures Data 360 and Agentforce solutions align with actual business needs. Advises on how to activate insights within existing workflows. Writes PRDs that Vibe Coding tools can consume.',
    diswImplication: 'High-priority role recommendation to connect IT governance with business GTM workflows and requirements.',
    recommendationPriority: 'high',
  },
  {
    role: 'Project Manager',
    responsibilities: 'Manages resource availability, coordinates between IT, business, and Salesforce teams.',
    diswImplication: 'Standard — Tara\'s org likely has this; key is PM experience with platform/data projects.',
    recommendationPriority: 'core',
  },
  {
    role: 'Developers + Data Engineers',
    responsibilities: 'Build custom applications and integrations, implement and manage data pipelines for efficient data collection and processing.',
    diswImplication: 'DISW has developers but likely needs upskilling on Agentforce Agent Script, Apex Actions, and MuleSoft Agentic Flows. Vibe Coding significantly accelerates this.',
    recommendationPriority: 'core',
  },
  {
    role: 'Application Administrators',
    responsibilities: 'Platform configurations, data models, access permissions, UI layouts, data management controls.',
    diswImplication: 'Kristina Graham\'s team — already engaged. Key upskill needed on Data 360 data model configuration and agent governance.',
    recommendationPriority: 'core',
  },
  {
    role: 'QA / Testing Lead',
    responsibilities: 'Leads UAT and unit testing for go-live. At agent scale: Agentforce Scorers (GA July 2026) allow automated evaluation of agent response quality — a new capability this role must own.',
    diswImplication: 'Agents fail differently than Apex. Probabilistic failure surfaces require new testing approaches beyond unit tests.',
    recommendationPriority: 'high',
  },
  {
    role: 'IT & Security',
    responsibilities: 'Data access controls, encryption, GDPR/EU AI Act compliance, field-level security. Should be involved throughout implementation — not just at go-live.',
    diswImplication: 'Bob Schmidt\'s team. Especially critical given Siemens\' global data residency and EU AI Act exposure.',
    recommendationPriority: 'core',
  },
];

const priorityRecommendations = roles.filter((r) => r.recommendationPriority === 'high');

const nextSteps = [
  'Tara to identify who at DISW currently covers the Enterprise Architect + Data Architect roles — and whether that person has Data 360 expertise.',
  'Drew + Bill to share Trailhead pre-work for DF\'26 attendees (Agentforce, Data 360, Headless 360 trails).',
  'Discuss Data Space governance architecture to resolve the Companion Org situation before Dreamforce.',
  'Align on whether the Aug 12 session with IT leadership should include the org/team design conversation or keep it technical.',
  'Tara to nominate additional IT team members for DF\'26 registration if any remain.',
];

const teamDesignTrainingRecommendations: TrainingRecommendation[] = [
  {
    title: 'Build Your Salesforce Center of Excellence',
    apiName: 'search-salesforce-center-of-excellence',
    type: 'TRAIL',
    audience: 'Executive',
    level: 'Intermediate',
    timeMinutes: 95,
    whyItMatters: 'Provides an operating model for governance, prioritization, and cross-functional delivery ownership.',
    url: 'https://trailhead.salesforce.com/search?keywords=Salesforce%20Center%20of%20Excellence',
    source: 'trailhead-mcp',
    lastVerifiedAt: '2026-08-07',
  },
  {
    title: 'Design a Data Cloud Implementation Team',
    apiName: 'search-data-cloud-implementation-team',
    type: 'MODULE',
    audience: 'Architect',
    level: 'Foundational',
    timeMinutes: 70,
    whyItMatters: 'Helps DISW align role coverage for architecture, data stewardship, and activation execution.',
    url: 'https://trailhead.salesforce.com/search?keywords=Data%20Cloud%20implementation',
    source: 'trailhead-mcp',
    lastVerifiedAt: '2026-08-07',
  },
  {
    title: 'V2MOM Strategy Execution',
    apiName: 'search-v2mom',
    type: 'MODULE',
    audience: 'Executive',
    level: 'Foundational',
    timeMinutes: 45,
    whyItMatters: 'Supports clarity on vision, priorities, and accountability across business and IT transformation goals.',
    url: 'https://trailhead.salesforce.com/search?keywords=V2MOM',
    source: 'trailhead-mcp',
    lastVerifiedAt: '2026-08-07',
  },
];

function formatLearningTime(minutes: number) {
  if (minutes >= 60) {
    const hours = Math.round((minutes / 60) * 10) / 10;
    return `${hours}h`;
  }
  return `${minutes}m`;
}

export default function TeamDesign() {
  return (
    <Layout>
      <div className="bg-card border-b border-border py-10 px-8 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,180,180,0.1)] to-transparent pointer-events-none" />
        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Part 3 of 3</p>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-2">
            Team Design
          </h1>
          <p className="text-xl text-primary font-medium">
            The team DISW needs to deliver Data 360 + Agentforce
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6 md:p-12 space-y-14">

        {/* Strategic framing */}
        <section className="bg-[rgba(0,180,180,0.05)] border border-primary/30 rounded-xl p-6 md:p-8">
          <p className="text-lg font-semibold text-foreground mb-3">The most important strategic conversation beyond capabilities</p>
          <p className="text-muted-foreground leading-relaxed text-base">
            The question isn't "what can Salesforce do?" — it's "who does DISW need to hire or develop to make it real?" The framework below was developed directly from Salesforce's Data 360 implementation guidance, validated at scale with enterprise customers.
          </p>
        </section>

        {/* Priority Recommendations */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-foreground border-b border-border pb-2">
            Priority Role Recommendations for DISW
          </h2>
          <p className="text-muted-foreground mb-6 text-sm">
            Roles to prioritize for faster and lower-risk activation of Data 360 + Agentforce:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {priorityRecommendations.map((g, i) => (
              <div key={i} className="bg-[rgba(0,180,180,0.05)] border border-primary/30 rounded-lg p-5">
                <div className="flex items-start gap-3">
                  <span className="text-primary font-mono text-sm border border-primary/30 rounded px-1.5 py-0.5 flex-shrink-0 mt-0.5">
                    Priority {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{g.role}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{g.diswImplication}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Full Roles Table */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-foreground border-b border-border pb-2">
            Required Roles for Data 360 + Agentforce at Enterprise Scale
          </h2>
          <div className="space-y-3">
            {roles.map((r, i) => (
              <div
                key={i}
                className={`bg-card border rounded-lg p-5 transition-colors ${
                  r.recommendationPriority === 'high'
                    ? 'border-primary/40 bg-[rgba(0,180,180,0.04)]'
                    : 'border-border'
                }`}
              >
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="lg:w-48 flex-shrink-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-foreground text-sm">{r.role}</span>
                      {r.recommendationPriority === 'high' && (
                        <span className="text-xs font-semibold bg-primary/20 text-primary border border-primary/30 rounded-full px-2 py-0.5">
                          Priority Recommendation
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Responsibilities</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{r.responsibilities}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">DISW Implication</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{r.diswImplication}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Org Design */}
        <section className="bg-card border border-border rounded-xl p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-4 text-foreground">The Org Design Conversation</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <span className="text-foreground font-semibold">Tara's goal: IT as a value center.</span> The structural answer: the Enterprise Architect and Solution Architect roles above help transform IT from an order-taker to a platform architect.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            With these roles and clear ownership, DISW can scale activation speed, governance, and business alignment without creating organizational friction.
          </p>
        </section>

        {/* Suggested Next Steps */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-foreground border-b border-border pb-2">
            Suggested Next Steps
          </h2>
          <ol className="space-y-3">
            {nextSteps.map((step, i) => (
              <li key={i} className="flex gap-4 bg-card border border-border rounded-lg p-4">
                <span className="text-primary font-mono text-sm border border-primary/30 rounded px-1.5 py-0.5 h-fit flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-muted-foreground leading-relaxed text-sm">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="bg-[rgba(0,180,180,0.05)] border border-primary/30 rounded-xl p-6 md:p-8">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h2 className="text-2xl font-semibold text-foreground">Trailhead Role Enablement</h2>
            <span className="text-xs text-muted-foreground">{teamDesignTrainingRecommendations.length} curated paths</span>
          </div>
          <p className="text-sm text-muted-foreground mb-5">
            Suggested learning for leadership and architecture roles to operationalize CoE governance, team design, and execution cadence.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {teamDesignTrainingRecommendations.map((rec) => (
              <a
                key={rec.apiName}
                href={rec.url}
                target="_blank"
                rel="noreferrer"
                className="block rounded-lg border border-border bg-card p-4 hover:border-primary/40 transition-colors"
              >
                <p className="text-sm font-semibold text-foreground mb-2">{rec.title}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded border border-border text-muted-foreground">{rec.type}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-background border border-border text-muted-foreground">{rec.audience}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-background border border-border text-muted-foreground">{rec.level}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-background border border-border text-muted-foreground">{formatLearningTime(rec.timeMinutes)}</span>
                </div>
                <p className="text-xs text-muted-foreground">{rec.whyItMatters}</p>
              </a>
            ))}
          </div>
        </section>

      </div>
      <PageFlowNav currentPath="/team-design" />
    </Layout>
  );
}
