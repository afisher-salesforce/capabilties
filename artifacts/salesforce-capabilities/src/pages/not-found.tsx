import { FileIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground">
      <div className="max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-card p-4 rounded-full border border-border text-muted-foreground">
            <FileIcon size={48} />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-3 tracking-tight">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The requested page could not be found in the Salesforce Capabilities guide.
        </p>
        <button 
          onClick={() => window.location.href = '/'}
          className="bg-primary text-primary-foreground px-6 py-2.5 rounded-md font-medium hover:opacity-90 transition-opacity"
        >
          Return to Executive Summary
        </button>
      </div>
    </div>
  );
}
