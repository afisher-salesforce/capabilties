import React from 'react';
import { Link } from 'wouter';
import { BookOpen, Shield, Users } from 'lucide-react';

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <img
          src={`${basePath}/logo.svg`}
          alt="Salesforce"
          className="h-14 w-auto mx-auto mb-8 opacity-90"
        />

        <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-3">
          Siemens DISW
        </h1>
        <p className="text-xl text-primary font-medium mb-4">
          Salesforce Capabilities Discussion
        </p>
        <p className="text-muted-foreground max-w-md mx-auto leading-relaxed mb-10">
          An internal briefing resource covering the full Salesforce platform
          landscape and Enterprise License Agreement for the Siemens DISW account team.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <Link
            href="/sign-in"
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-border text-foreground font-semibold text-sm hover:border-primary/50 transition-colors"
          >
            Request Access
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-3">
          {['@salesforce.com', '@siemens.com'].map((domain) => (
            <span
              key={domain}
              className="text-xs bg-[rgba(0,180,180,0.1)] text-primary border border-primary/20 rounded-full px-3 py-1 font-medium"
            >
              {domain}
            </span>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Access restricted to Salesforce and Siemens email domains
        </p>
      </div>

      {/* Stats row */}
      <div className="border-t border-border bg-card/30 px-6 py-10">
        <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {[
            { icon: BookOpen, title: '97 Capabilities', desc: '14 domains across the full platform' },
            { icon: Shield, title: '82 Licensed', desc: 'Covered through Siemens agreements' },
            { icon: Users, title: 'Team Ready', desc: 'Roles, Dreamforce, and research included' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title}>
              <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="font-semibold text-foreground text-sm mb-0.5">{title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
