import React from 'react';
import Layout from '@/components/layout';
import PageFlowNav from '@/components/page-flow-nav';

const layers = [
  {
    number: '01',
    label: 'Engagement Layer',
    subtitle: 'What users see and do',
    color: 'rgba(0,180,180,0.15)',
    borderColor: 'rgba(0,180,180,0.5)',
    textColor: 'hsl(180 100% 35%)',
    products: ['Sales Cloud', 'Service Cloud', 'Field Service', 'Experience Cloud', 'Commerce Cloud', 'Slack'],
    description: 'The user-facing clouds and collaboration tools where customers, partners, and employees directly interact. This is the layer most visible to business users and the starting point for adoption conversations.',
  },
  {
    number: '02',
    label: 'Intelligence Layer',
    subtitle: 'What makes work smarter',
    color: 'rgba(64,224,208,0.1)',
    borderColor: 'rgba(64,224,208,0.4)',
    textColor: 'hsl(174 71% 56%)',
    products: ['Agentforce (Autonomous Agents)', 'Einstein AI (Embedded/Predictive)', 'Analytics & Tableau', 'Einstein Conversation Insights'],
    description: 'The AI and analytics layer that surfaces insights, automates decisions, and enables autonomous agent actions across every engagement layer cloud. Layer 2 is where Siemens DISW has the most unlocked but undeployed value.',
  },
  {
    number: '03',
    label: 'Platform & Data Foundation',
    subtitle: 'What makes it all possible',
    color: 'rgba(0,100,150,0.15)',
    borderColor: 'rgba(0,150,200,0.4)',
    textColor: 'hsl(200 80% 60%)',
    products: ['Data 360 (Data Cloud One)', 'MuleSoft (Integration, API Mgmt, Connectors)', 'Headless 360 / MCP', 'Einstein Trust Layer', 'Shield (Security)'],
    description: 'The foundational infrastructure that unifies data, governs AI interactions, connects enterprise systems, and exposes Salesforce as an API surface for any channel. Without this layer, Layers 1 and 2 operate in silos.',
  },
];

const accessValidationQuestions = [
  {
    q: 'Which agreement path governs this capability (main SELA, amendment, or separate agreement)?',
    hint: 'Confirm entitlement source first, then validate org-level provisioning and activation status.',
  },
  {
    q: 'Is this capability provisioned in DISW orgs or only contractually available at enterprise level?',
    hint: '"In agreement" does not automatically mean "activated in org." Confirm activation ownership with Siemens IT/Procurement.',
  },
  {
    q: 'Does execution depend on a separate agreement (for example Slack or Tableau)?',
    hint: 'Some capabilities require separate commercial structures even when adjacent Salesforce components are in-scope.',
  },
  {
    q: 'What is the correct architecture for activation (home org vs companion org, Data Cloud, MuleSoft, trust controls)?',
    hint: 'Document architecture decisions explicitly so execution sequencing and governance remain clear.',
  },
];

export default function PlatformFramework() {
  return (
    <Layout>
      <div className="bg-card border-b border-border py-10 px-8 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,180,180,0.1)] to-transparent pointer-events-none" />
        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Part 1 of 3</p>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-2">
            Platform Framework
          </h1>
          <p className="text-xl text-primary font-medium">
            How to Think About Salesforce Capabilities
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6 md:p-12 space-y-14">

        {/* Reframe callout */}
        <section className="bg-[rgba(0,180,180,0.05)] border border-primary/30 rounded-xl p-6 md:p-8">
          <p className="text-lg font-semibold text-foreground mb-2">The key reframe</p>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Salesforce is not a CRM. It is an enterprise platform with three distinct layers — and DISW needs fluency in all three to map contractual access to operational activation.
          </p>
          <div className="mt-4 pt-4 border-t border-primary/20">
            <p className="text-sm text-muted-foreground">
              The execution priority is to make Layer 2 and Layer 3 capabilities <span className="text-primary font-semibold">visible, governed, and activated</span> with a clear agreement path and provisioning owner.
            </p>
          </div>
        </section>

        {/* Three Layers */}
        <section>
          <h2 className="text-2xl font-semibold mb-8 text-foreground border-b border-border pb-2">
            The Three Layers of the Platform
          </h2>
          <div className="space-y-6">
            {layers.map((layer) => (
              <div
                key={layer.number}
                className="rounded-xl border p-6 md:p-8"
                style={{ backgroundColor: layer.color, borderColor: layer.borderColor }}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <span
                      className="text-5xl font-black opacity-40"
                      style={{ color: layer.textColor }}
                    >
                      {layer.number}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline gap-3 mb-3">
                      <h3 className="text-xl font-bold text-foreground">{layer.label}</h3>
                      <span className="text-sm font-medium" style={{ color: layer.textColor }}>
                        {layer.subtitle}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{layer.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {layer.products.map((p) => (
                        <span
                          key={p}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-background/50 border"
                          style={{ borderColor: layer.borderColor, color: layer.textColor }}
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Access Validation Lens */}
        <section>
          <h2 className="text-2xl font-semibold mb-2 text-foreground border-b border-border pb-2">
            The Access Validation & Activation Lens
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            For each high-priority capability, apply these four questions to confirm agreement path, provisioning status, and activation architecture before execution sequencing.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {accessValidationQuestions.map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6 flex flex-col gap-3 hover:border-primary/40 transition-colors">
                <div className="flex gap-3 items-start">
                  <span className="text-primary font-mono text-sm border border-primary/30 rounded px-1.5 py-0.5 flex-shrink-0 mt-0.5">
                    Q{i + 1}
                  </span>
                  <p className="font-semibold text-foreground leading-snug">{item.q}</p>
                </div>
                <div className="pl-8 border-l-2 border-primary/20">
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.hint}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DISW Implication */}
        <section className="bg-card border border-border rounded-xl p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-4 text-foreground">What This Means for DISW</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              DISW is navigating the same digital transformation it sells to its own customers — making it an authentically resonant context for a Salesforce platform conversation. The Agentforce + Data 360 stack is directly analogous to what DISW sells under the Industrial Copilot and Xcelerator brands.
            </p>
            <p>
              The three-layer framework gives Tara's team a governance architecture, not just a feature list. The question is not "which clouds does DISW have?" but "which layers does DISW have the architecture and team to actually operate?"
            </p>
            <p>
              The execution answer is Layer 2 visibility and Layer 3 governance — paired with explicit agreement mapping and org-level activation ownership.
            </p>
          </div>
        </section>

      </div>
      <PageFlowNav currentPath="/framework" />
    </Layout>
  );
}
