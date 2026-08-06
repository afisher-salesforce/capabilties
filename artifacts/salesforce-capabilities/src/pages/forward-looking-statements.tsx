import React from 'react';
import Layout from '@/components/layout';
import PageFlowNav from '@/components/page-flow-nav';

const VERBATIM_FORWARD_LOOKING_STATEMENT = [
  'This presentation may include forward-looking statements regarding product capabilities, roadmap direction, and expected outcomes.',
  'Any unreleased services, features, or functionality referenced are informational only and do not represent a commitment to deliver any specific capability by a particular date.',
  'Purchasing decisions should be made based only on currently available products and services as documented in executed agreements and official Salesforce documentation.',
  'Salesforce has no obligation to pursue or deliver future product capabilities, and delivery timing and content remain subject to change at Salesforce sole discretion.',
];

export default function ForwardLookingStatements() {
  return (
    <Layout>
      <div className="bg-card border-b border-border py-10 px-8 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,180,180,0.08)] to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-2">
            Forward Looking Statements
          </h1>
          <p className="text-xl text-primary font-medium">
            Legal and planning context for this strategic discussion
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 md:p-12 space-y-10">
        <section className="bg-[rgba(0,180,180,0.05)] border border-primary/30 rounded-xl p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-foreground mb-3">Important Notice</h2>
          <p className="text-muted-foreground leading-8 max-w-3xl">
            This content is intended for strategic planning discussions. It is not a contractual offer, warranty,
            or legal representation regarding future product delivery.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-5 text-foreground border-b border-border pb-2">
            Verbatim Forward Looking Statement
          </h2>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
            Legal wording shown in full; do not paraphrase.
          </p>
          <div className="space-y-4 max-w-3xl">
            {VERBATIM_FORWARD_LOOKING_STATEMENT.map((statement, index) => (
              <div key={statement} className="bg-card border border-border rounded-lg p-5">
                <div className="flex gap-3 items-start">
                  <span className="text-primary font-mono text-xs border border-primary/30 rounded px-1.5 py-0.5 mt-0.5">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-muted-foreground leading-8">{statement}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-card border border-border rounded-xl p-6 md:p-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">Reference Policy</h2>
          <p className="text-muted-foreground leading-8 max-w-3xl">
            Salesforce has no obligation to deliver future features or functionality and future roadmap items may change
            at Salesforce&apos;s sole discretion. This deck should be used with that understanding for all planning,
            investment, and sequencing decisions.
          </p>
        </section>
      </div>

      <PageFlowNav currentPath="/forward-looking-statements" />
    </Layout>
  );
}
