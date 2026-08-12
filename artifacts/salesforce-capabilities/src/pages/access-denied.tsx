import React from 'react';
import { useClerk, useUser } from '@clerk/react';
import { ShieldX } from 'lucide-react';

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

export default function AccessDenied() {
  const { signOut } = useClerk();
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress ?? '';

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-sm text-center">
        <ShieldX className="w-14 h-14 text-destructive mx-auto mb-6 opacity-75" />
        <h1 className="text-2xl font-bold text-foreground mb-3">Access Restricted</h1>
        <p className="text-muted-foreground leading-relaxed mb-3">
          This site is only accessible to{' '}
          <span className="text-foreground font-medium">@salesforce.com</span> and{' '}
          <span className="text-foreground font-medium">@siemens.com</span> email addresses.
        </p>
        {email && (
          <p className="text-sm text-muted-foreground mb-8">
            Signed in as{' '}
            <span className="text-foreground font-medium">{email}</span>
          </p>
        )}
        <button
          type="button"
          onClick={() => signOut({ redirectUrl: basePath || '/' })}
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
