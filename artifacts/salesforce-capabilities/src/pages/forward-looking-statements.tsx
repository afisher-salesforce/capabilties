import React from 'react';
import Layout from '@/components/layout';
import PageFlowNav from '@/components/page-flow-nav';

const VERBATIM_FORWARD_LOOKING_STATEMENT = [
  'This presentation contains forward-looking statements about, among other things, trend analyses and statements regarding future events, anticipated growth and industry prospects, and our strategies, expectation or plans regarding product releases and enhancements.',
  'The achievement or success of the matters covered by such forward-looking statements involves risks, uncertainties and assumptions.',
  'If any such risks or uncertainties materialize or if any of the assumptions prove incorrect, results or outcomes could differ materially from those expressed or implied by these forward-looking statements.',
  'The risks and uncertainties referred to above include those factors discussed in Salesforce’s reports filed from time to time with the Securities and Exchange Commission, including, but not limited to our ability to meet the expectations of our customers; uncertainties regarding Al technologies and their integration into our product offerings; the effect of evolving domestic and foreign government regulations; regulatory developments and regulatory investigations involving us or affecting our industry; our ability to successfully introduce new services and product features, including related to AI and Agentforce; our ability to execute our business plans; the pace of change and innovation and our ability to compete in the markets in which we participate; and our ability to maintain and enhance our brands.',
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
            Forward Looking Statements
          </h2>
          <div className="max-w-3xl bg-card border border-border rounded-xl p-6 md:p-8 space-y-6">
            {VERBATIM_FORWARD_LOOKING_STATEMENT.map((statement, index) => (
              <p key={index} className="text-muted-foreground leading-8">
                {statement}
              </p>
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
