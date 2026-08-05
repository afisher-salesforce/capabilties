import React from 'react';
import Layout from '@/components/layout';
import PageFlowNav from '@/components/page-flow-nav';

export default function ExecutiveSummary() {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative w-full h-[420px] bg-card overflow-hidden border-b border-border">
        {/* Background Image - if the image is missing, the linear gradient over background color works as a fallback */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/disw-hero.jpeg')" }}
        />
        {/* Gradient Mask */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background opacity-95" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-10">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-2">
            Siemens DISW | Salesforce Capabilities Discussion
          </h1>
          <p className="text-xl md:text-2xl text-primary font-medium">
            Enterprise License Agreement Review & Capability Roadmap
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6 md:p-12 space-y-12">
        
        {/* Purpose */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground border-b border-border pb-2">Purpose of This Discussion</h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-4">
            This site is the reference guide for an executive-level discussion with Siemens Digital Industries Software (DISW) about their Salesforce platform capabilities — specifically those licensed under their Salesforce Enterprise License Agreement (SELA). It is prepared for <span className="text-foreground font-semibold">Tara Jiranek, Head of IT Transformation</span>, in support of her IT-as-a-value-center mandate, DISW's consolidation of shadow IT back under IT governance, and the platform opportunities ahead at Dreamforce '26.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The goal is to align Salesforce resources with DISW's strategic priorities, surface underutilized licensed capabilities, and identify the path to value across the full Salesforce platform. This document also applies to the Aug 12 DISW IT Leadership Session.
          </p>
        </section>

        {/* SELA at a glance */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground border-b border-border pb-2">The SELA at a Glance</h2>
          <div className="bg-card border border-border rounded-lg p-6 space-y-4 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Account</div>
                <div className="font-medium text-foreground">Siemens Corporation (parent entity)</div>
                <div className="text-sm text-muted-foreground mt-1">DISW accesses Salesforce platform via internal chargeback</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Term</div>
                <div className="font-medium text-foreground">March 1, 2025 → September 30, 2028</div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-border">
              <div className="text-sm text-muted-foreground mb-1">GA Coverage Rule</div>
              <div className="font-medium text-foreground">All Salesforce GA products as of July 31, 2025 are included.</div>
              <div className="text-sm text-muted-foreground mt-1">Products that went GA after that date require a separate addendum.</div>
            </div>
            
            <div className="pt-4 border-t border-border bg-[rgba(0,180,180,0.05)] -mx-6 -mb-6 p-6 rounded-b-lg border-primary/20">
              <div className="text-primary font-semibold mb-1 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary inline-block"></span>
                Key Nuance
              </div>
              <div className="text-foreground">
                <span className="font-bold">In SELA ≠ In Production</span> — Licenses being available under the SELA doesn't mean they're provisioned or activated in DISW's specific org(s). Deployment is a separate motion.
              </div>
            </div>
          </div>
        </section>

        {/* What's IN the SELA */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-foreground border-b border-border pb-2">What's IN the SELA (Key Inclusions)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="bg-card border border-border rounded-lg p-5 hover:border-primary/50 transition-colors shadow-sm">
              <h3 className="text-lg font-semibold text-primary mb-3">Agentforce (AI Agents)</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2"><span className="text-primary mt-1">•</span> <span><strong className="text-foreground">Agentforce Unlimited Edition</strong> — Autonomous AI agents for Sales (SDR, Coach, Pipeline Health), Service (Digital Agent, Case Routing, Dispatch), and Field Service. Includes Agentforce Builder, Atlas Reasoning Engine, and Human Escalation Handoff.</span></li>
                <li className="flex gap-2"><span className="text-primary mt-1">•</span> <span><strong className="text-foreground">Additional Einstein Requests for Agentforce</strong> — per-agent AI request pool</span></li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-5 hover:border-primary/50 transition-colors shadow-sm">
              <h3 className="text-lg font-semibold text-primary mb-3">Data Cloud & AI</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2"><span className="text-primary mt-1">•</span> <span><strong className="text-foreground">Customer Data Cloud - Data Services Card</strong> — Enables: identity resolution, unified customer profiles, vector search / RAG grounding for agent knowledge, segment-based activation</span></li>
                <li className="flex gap-2"><span className="text-primary mt-1">•</span> <strong className="text-foreground">Data Cloud Provisioning</strong></li>
                <li className="flex gap-2"><span className="text-primary mt-1">•</span> <strong className="text-foreground">Salesforce Foundations - Data Cloud Segmentation & Activation</strong></li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-5 hover:border-primary/50 transition-colors shadow-sm">
              <h3 className="text-lg font-semibold text-primary mb-3">Service AI</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2"><span className="text-primary mt-1">•</span> <span><strong className="text-foreground">Einstein for Service Add-on - Unlimited Edition</strong> — Case classification & routing, article recommendations, work summaries, case summaries, Knowledge Article generation</span></li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-5 hover:border-primary/50 transition-colors shadow-sm">
              <h3 className="text-lg font-semibold text-primary mb-3">Platform Foundation</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2"><span className="text-primary mt-1">•</span> <span><strong className="text-foreground">Salesforce Foundations</strong> — base entitlement bundle unlocking CRM + AI foundations across all clouds</span></li>
                <li className="flex gap-2"><span className="text-primary mt-1">•</span> <span><strong className="text-foreground">Einstein Trust Layer</strong> — zero data retention, PII masking, audit logging across all AI interactions</span></li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-5 hover:border-primary/50 transition-colors shadow-sm">
              <h3 className="text-lg font-semibold text-primary mb-3">Sales & Service Core</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2"><span className="text-primary mt-1">•</span> <span><strong className="text-foreground">Sales Cloud AI</strong> — Einstein Opportunity & Lead Scoring, Activity Capture, Deal Insights, Forecasting, Email Insights, Pipeline Inspection AI</span></li>
                <li className="flex gap-2"><span className="text-primary mt-1">•</span> <span><strong className="text-foreground">Service Cloud AI</strong> — Case Classification, Article Recommendations, Reply Recommendations, Conversation Mining, Next Best Action</span></li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-5 hover:border-primary/50 transition-colors shadow-sm">
              <h3 className="text-lg font-semibold text-primary mb-3">Analytics & Industry</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2"><span className="text-primary mt-1">•</span> <span><strong className="text-foreground">Tableau Plus</strong> (Creator, Explorer, Viewer) — includes Ask Data, Explain Data, and Auto-Insights</span></li>
                <li className="flex gap-2"><span className="text-primary mt-1">•</span> <span><strong className="text-foreground">Field Service & Manufacturing</strong> — Contractor, Dispatcher & Field Technician (UE), Manufacturing Cloud</span></li>
              </ul>
            </div>
            
          </div>
        </section>

        {/* Key Nuances Callout Box */}
        <section className="bg-[rgba(0,180,180,0.05)] border border-primary/30 rounded-xl p-6 md:p-8">
          <h2 className="text-2xl font-semibold mb-6 text-foreground flex items-center gap-3">
            <span className="bg-primary/20 text-primary p-2 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </span>
            Key Nuances for the DISW Conversation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg p-5">
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <span className="text-primary font-mono text-sm border border-primary/30 rounded px-1.5 py-0.5">01</span>
                Chargebacks Apply
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Siemens Corporation holds the contract. DISW accesses licenses via internal cost allocation. Activation at the DISW entity level is not automatic.</p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg p-5">
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <span className="text-primary font-mono text-sm border border-primary/30 rounded px-1.5 py-0.5">02</span>
                Consumption Credits are Pooled
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Einstein Requests, Data Services Credits, and Agentforce Conversations are pooled at the Siemens enterprise level. DISW must confirm allocation with Siemens IT/Procurement.</p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg p-5">
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <span className="text-primary font-mono text-sm border border-primary/30 rounded px-1.5 py-0.5">03</span>
                In SELA ≠ In Production
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Licenses being available under the SELA doesn't mean they're provisioned or activated in DISW's specific org(s). Deployment is a separate motion.</p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg p-5">
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <span className="text-primary font-mono text-sm border border-primary/30 rounded px-1.5 py-0.5">04</span>
                Agentforce Swap Clause
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">The Dec 2025 amendment included a one-time option to swap Agentforce entitlements back to Sales & Service Cloud UE (deadline was Jan 15, 2026). Confirm Siemens did not exercise this option.</p>
            </div>
          </div>
        </section>

        {/* Siemens Proof Points */}
        <section>
          <h2 className="text-2xl font-semibold mb-2 text-foreground border-b border-border pb-2">
            Siemens Proof Points — You Are Not Alone
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            Other Siemens divisions are already live on Agentforce and Data 360. DISW doesn't need to figure this out from scratch.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                org: 'Siemens SieSales (AG)',
                product: 'Multi-Agent Lead Qualification',
                metrics: ['~500 inbound B2B leads/day', '11% engagement rate', '100% response rate', '87% CSAT'],
                note: 'Published Salesforce customer story.',
              },
              {
                org: 'Siemens Energy Gas Services',
                product: 'Agentforce Service Agent',
                metrics: ['Live in production since January 2026', 'Customer technical support automation'],
                note: 'Proven production deployment — not a pilot.',
              },
              {
                org: 'Siemens AG / SiePortal',
                product: 'Headless 360 Commerce on Agentforce',
                metrics: ['1.3M customers', '70+ regions', 'Largest B2B Salesforce Commerce implementation ever'],
                note: 'Speaking at Dreamforce — Session 5058.',
              },
              {
                org: 'Siemens Energy — Berlin Hackathon',
                product: '3-Day Agentforce POC Sprint',
                metrics: ['45 participants', '3 POCs built', '$5M+ combined estimated business value'],
                note: 'Focus areas: Customer Self-Service, Human Agent Augmentation, Customer 360.',
              },
            ].map((p, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-5 hover:border-primary/40 transition-colors">
                <div className="mb-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">{p.org}</p>
                  <h3 className="font-bold text-foreground">{p.product}</h3>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {p.metrics.map((m) => (
                    <span key={m} className="text-xs bg-[rgba(0,180,180,0.1)] text-primary border border-primary/20 rounded-full px-2.5 py-1 font-medium">
                      {m}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">{p.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What's OUTSIDE the SELA */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-foreground border-b border-border pb-2">What's OUTSIDE the SELA</h2>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-card/80 border-b border-border">
                <tr>
                  <th scope="col" className="px-6 py-4">Category</th>
                  <th scope="col" className="px-6 py-4">Product / Capability</th>
                  <th scope="col" className="px-6 py-4">Why It's Out</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["Agentforce (External Users)", "Agentforce for Experience Cloud (A4X)", "Per-user add-on, not in SELA"],
                   ["Integration", "MuleSoft Agentforce Fabric", "New capability — went GA after July 31, 2025, requires separate addendum"],
                  ["Analytics", "Tableau Pulse / Proactive Insights", "Separate SKU beyond Tableau Plus"],
                  ["Analytics", "Agentforce for Tableau (agentic BI queries)", "Requires additional add-on"],
                  ["Marketing", "Marketing Cloud Engagement (Email/Journey)", "Not confirmed in current contract"],
                  ["Marketing", "All Marketing AI features", "Requires MC Engagement"],
                  ["Marketing", "Account Engagement / Pardot", "Not confirmed"],
                  ["Platform", "Professional Services / Signature Success", "Explicitly excluded from SELA swap mechanics"],
                  ["Platform", "Salesforce Shield / Security Add-ons", "Derivative/percentage-based — excluded by contract"],
                  ["Platform", "Products that went GA after July 31, 2025", "Require addendum"]
                ].map((row, i) => (
                  <tr key={i} className="bg-background hover:bg-card/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground whitespace-nowrap">{row[0]}</td>
                    <td className="px-6 py-4">{row[1]}</td>
                    <td className="px-6 py-4 text-muted-foreground">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
      <PageFlowNav currentPath="/" />
    </Layout>
  );
}
