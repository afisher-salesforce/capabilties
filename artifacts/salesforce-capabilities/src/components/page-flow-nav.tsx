import { Link } from 'wouter';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { guidedPageOrder } from '@/config/site-navigation';

type PageFlowNavProps = {
  currentPath: string;
};

export default function PageFlowNav({ currentPath }: PageFlowNavProps) {
  const currentIndex = guidedPageOrder.findIndex((entry) => entry.href === currentPath);
  if (currentIndex < 0) {
    return null;
  }

  const previous = currentIndex > 0 ? guidedPageOrder[currentIndex - 1] : null;
  const next = currentIndex < guidedPageOrder.length - 1 ? guidedPageOrder[currentIndex + 1] : null;

  if (!previous && !next) {
    return null;
  }

  return (
    <nav className="max-w-5xl mx-auto px-6 md:px-12 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {previous ? (
          <Link href={previous.href} className="block">
            <div className="h-full bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Previous Page</p>
              <p className="text-sm text-foreground font-medium flex items-center gap-2">
                <ArrowLeft size={16} />
                {previous.title}
              </p>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link href={next.href} className="block">
            <div className="h-full bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2 text-left md:text-right">Next Page</p>
              <p className="text-sm text-foreground font-medium flex items-center justify-start md:justify-end gap-2">
                {next.title}
                <ArrowRight size={16} />
              </p>
            </div>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
}
