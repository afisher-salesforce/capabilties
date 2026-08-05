import React from 'react';
import Layout from '@/components/layout';

const tier1 = [
  {
    cap: 'Agentforce / Agentic AI',
    why: 'The platform direction for every cloud DISW uses. CPQ+ does NOT support Agentforce natively — this is the reason Agentforce for Revenue Management (ARM) matters.',
    session: 'Session 3973: Build Siemens Sales Agents With Agentforce Script',
  },
  {
    cap: 'Data 360 (Data Cloud One)',
    why: 'Unified customer profile, RAG grounding for agents, zero-copy from SAP/Snowflake. The AI context fabric. Already licensed in the Siemens SELA.',
    session: 'Session 5058: Scale B2B Commerce Globally with Headless and Data 360',
  },
  {
    cap: 'Einstein Trust Layer',
    why: 'Zero data retention, PII masking, audit logging for every AI interaction. Required for EU AI Act compliance and Siemens\' global data governance obligations.',
    session: 'Covered in all Agentforce architecture sessions',
  },
  {
    cap: 'Headless 360 / MCP',
    why: 'Salesforce as the universal AI engine for any surface — SiePortal, a Teams bot, a mobile app. MCP Server now in Beta with ~100 skills.',
    session: 'Session 5058 + Agentic Architecture',
  },
  {
    cap: 'MuleSoft Agentforce Fabric',
    why: 'Converts existing MuleSoft APIs into agent-invokable actions — the integration nervous system for multi-agent workflows connecting SAP, external APIs, and enterprise systems. Note: MuleSoft core is in the Siemens SELA; Agentforce Fabric specifically went GA after July 31, 2025 and requires a separate addendum.',
    session: 'Session 4142: Agentic Architecture',
  },
];

const tier2 = [
  {
    cap: 'Agentforce for Revenue Management (ARM)',
    why: 'Already purchased in the Siemens SELA. Pilot about to start. The AI revenue platform that CPQ+ cannot be.',
    session: 'Session 3969: How Siemens is Shaping the Future of CPQ with Agents',
  },
  {
    cap: 'Slack Enterprise Grid + Agentforce in Slack',
    why: 'The IT consolidation play — Agentforce agents deployed in the collaboration surface where work happens. Change management framing for Patrick & Tara\'s org.',
    session: 'Session: Boosting Productivity with the Siemens Employee Agent',
  },
  {
    cap: 'Tableau Pulse / Proactive Analytics',
    why: 'Push-based metric monitoring — IT demonstrates value to business leaders without requiring them to build reports.',
    session: 'Covered in Analytics sessions',
  },
  {
    cap: 'Einstein Conversation Insights (ECI)',
    why: 'AI analysis of sales call transcripts — coaching signals, deal risk, competitive mentions. Directly relevant to DISW\'s sales ops team.',
    session: 'Session 4280: From siemens.com to Pipeline: The Autonomous SDR Agent',
  },
  {
    cap: 'Experience Cloud + Partner Community',
    why: 'Self-service portal for 14,000+ partners — Siemens already piloting Agentforce on Experience Cloud for partner onboarding.',
    session: 'Session 5048: Scaling Intelligent Partner Ecosystems on Agentforce',
  },
];

const tier3 = [
  {
    cap: 'Multi-Org / Data Space Architecture',
    why: 'The Companion Org vs. Home Org challenge DISW has been navigating. Data Spaces in Data Cloud One are the answer — IT must own this architecture decision.',
  },
  {
    cap: 'Shield & Data Governance',
    why: 'Field-level security, event monitoring, encryption — the governance layer that enterprise IT requires before agentic AI goes to production.',
  },
  {
    cap: 'Flex Credit Consumption Management',
    why: 'Consumption-based AI credits managed centrally via Siemens AG SELA. IT needs to govern allocation across DISW business units to prevent ungoverned spend.',
  },
  {
    cap: 'Agentforce Analytics & Observability',
    why: 'Now unmetered on Data 360 (as of July 13, 2026) — IT can demonstrate ROI, monitor agent health, and govern behavior with real-time dashboards at no additional credit cost.',
  },
];

const attendees = [
  { name: 'Tara Jiranek', title: 'Head of IT Transformation', sessions: 'Session 4142 — Agentic Architecture; Session 5058 — Headless + Data 360' },
  { name: 'Patrick Sluck', title: 'Senior Leader, Salesforce Platform & Support Transformation', sessions: 'Session 3973 — Build Sales Agents; Session 3969 — CPQ with Agents' },
  { name: 'Kristina Graham', title: 'Head of Salesforce Admin & Release Management', sessions: 'Agentforce for Admins; Observability' },
  { name: 'Jon Peterson', title: 'Senior Director, Digital Commerce and Operations', sessions: 'Session 5058 — Commerce + Data 360' },
  { name: 'Andrew Allan', title: 'CIO / Chief of Global Finance Operations & Technology', sessions: 'Exec Summit track' },
  { name: 'Missy Moreland-Bowers', title: 'VP FINOps Strategy & Transformation', sessions: 'Revenue Intelligence; Analytics' },
  { name: 'Lane Giles', title: 'Customer Support', sessions: 'Agentforce for Service; Einstein Conversation Insights' },
  { name: 'Susan Kacapyr', title: 'Senior Manager, IT Applications Development', sessions: 'Vibe Coding; Agent Builder' },
];

function TierBadge({ tier }: { tier: string }) {
  const styles: Record<string, string> = {
    '1': 'bg-[rgba(0,180,180,0.15)] text-primary border-primary/40',
    '2': 'bg-[rgba(64,224,208,0.1)] text-[hsl(174_71%_56%)] border-[rgba(64,224,208,0.3)]',
    '3': 'bg-[rgba(0,100,150,0.15)] text-[hsl(200_80%_60%)] border-[rgba(0,150,200,0.3)]',
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${styles[tier]}`}>
      Tier {tier}
    </span>
  );
}

export default function Dreamforce() {
  return (
    <Layout>
      <div className="bg-card border-b border-border py-10 px-8 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,180,180,0.1)] to-transparent pointer-events-none" />
        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Part 2 of 3</p>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-2">
            Dreamforce '26 — Priority Capabilities
          </h1>
          <p className="text-xl text-primary font-medium">
            What DISW's 12 registered attendees need to know before they arrive
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6 md:p-12 space-y-14">

        {/* Context */}
        <section className="bg-[rgba(0,180,180,0.05)] border border-primary/30 rounded-xl p-6 md:p-8">
          <p className="text-muted-foreground leading-relaxed">
            DISW has <span className="text-foreground font-semibold">12 registered attendees at Dreamforce '26</span>, including Tara Jiranek. The sessions below are the highest-signal capabilities for Tara's team to understand <em>before</em> arriving — so they can engage the content and speakers with context, not just as passive observers.
          </p>
        </section>

        {/* Tier 1 */}
        <section>
          <div className="flex items-center gap-3 mb-6 border-b border-border pb-3">
            <TierBadge tier="1" />
            <h2 className="text-xl font-semibold text-foreground">Core to DISW's Platform Strategy — Learn Now</h2>
          </div>
          <div className="space-y-4">
            {tier1.map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-5 hover:border-primary/40 transition-colors">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground mb-2">{item.cap}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.why}</p>
                  </div>
                  <div className="flex-shrink-0 md:max-w-xs">
                    <div className="bg-[rgba(0,180,180,0.08)] border border-primary/20 rounded-md px-3 py-2">
                      <p className="text-xs font-semibold text-primary mb-0.5">DF'26 Session</p>
                      <p className="text-xs text-muted-foreground">{item.session}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tier 2 */}
        <section>
          <div className="flex items-center gap-3 mb-6 border-b border-border pb-3">
            <TierBadge tier="2" />
            <h2 className="text-xl font-semibold text-foreground">Strategic Enablement — Learn At or After Dreamforce</h2>
          </div>
          <div className="space-y-4">
            {tier2.map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-5 hover:border-[rgba(64,224,208,0.3)] transition-colors">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground mb-2">{item.cap}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.why}</p>
                  </div>
                  <div className="flex-shrink-0 md:max-w-xs">
                    <div className="bg-[rgba(64,224,208,0.06)] border border-[rgba(64,224,208,0.2)] rounded-md px-3 py-2">
                      <p className="text-xs font-semibold text-[hsl(174_71%_56%)] mb-0.5">DF'26 Session</p>
                      <p className="text-xs text-muted-foreground">{item.session}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tier 3 */}
        <section>
          <div className="flex items-center gap-3 mb-6 border-b border-border pb-3">
            <TierBadge tier="3" />
            <h2 className="text-xl font-semibold text-foreground">Platform Governance — Critical for IT Architecture Role</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tier3.map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-5 hover:border-[rgba(0,150,200,0.3)] transition-colors">
                <h3 className="font-bold text-foreground mb-2">{item.cap}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.why}</p>
              </div>
            ))}
          </div>
        </section>

        {/* DISW Attendees */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-foreground border-b border-border pb-2">
            DISW Registered Attendees
          </h2>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-card/80 border-b border-border">
                <tr>
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Title</th>
                  <th className="px-5 py-4">Priority Sessions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {attendees.map((a, i) => (
                  <tr key={i} className="bg-background hover:bg-card/50 transition-colors">
                    <td className="px-5 py-4 font-semibold text-foreground whitespace-nowrap">{a.name}</td>
                    <td className="px-5 py-4 text-muted-foreground">{a.title}</td>
                    <td className="px-5 py-4 text-primary text-xs font-medium">{a.sessions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </Layout>
  );
}
