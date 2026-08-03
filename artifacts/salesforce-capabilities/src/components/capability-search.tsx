import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation } from 'wouter';
import { Search, X } from 'lucide-react';
import { domainsData } from '@/data/capabilities';

interface Result {
  code: string;
  name: string;
  description: string;
  inSela: boolean;
  domainId: string;
  domainName: string;
}

// Pre-build a flat searchable list once at module load time
const allCapabilities: Result[] = domainsData.flatMap((domain) =>
  domain.capabilities.map((cap) => ({
    code: cap.code,
    name: cap.name,
    description: cap.description,
    inSela: cap.inSela,
    domainId: domain.id,
    domainName: domain.name,
  }))
);

function highlight(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-primary/30 text-primary rounded-sm font-semibold not-italic">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function CapabilitySearch({ onNavigate }: { onNavigate?: () => void }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(0);
  const [, navigate] = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const results: Result[] = query.trim().length < 1
    ? []
    : allCapabilities.filter((cap) => {
        const q = query.toLowerCase();
        return (
          cap.code.toLowerCase().includes(q) ||
          cap.name.toLowerCase().includes(q) ||
          cap.description.toLowerCase().includes(q) ||
          cap.domainName.toLowerCase().includes(q)
        );
      }).slice(0, 12);

  const clearSearch = useCallback(() => {
    setQuery('');
    setOpen(false);
    setFocused(0);
  }, []);

  const handleSelect = useCallback(
    (result: Result) => {
      navigate(`/capabilities/${result.domainId}#${result.code}`);
      clearSearch();
      onNavigate?.();
    },
    [navigate, clearSearch, onNavigate]
  );

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      const target = e.target as Node;
      if (
        inputRef.current && !inputRef.current.closest('[data-search-container]')?.contains(target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Keyboard navigation
  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open || results.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocused((f) => Math.min(f + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocused((f) => Math.max(f - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[focused]) handleSelect(results[focused]);
    } else if (e.key === 'Escape') {
      clearSearch();
    }
  }

  // Scroll focused item into view
  useEffect(() => {
    if (listRef.current) {
      const item = listRef.current.children[focused] as HTMLElement | undefined;
      item?.scrollIntoView({ block: 'nearest' });
    }
  }, [focused]);

  return (
    <div data-search-container className="relative px-3 pb-3 pt-2">
      {/* Input */}
      <div className="relative flex items-center">
        <Search
          size={14}
          className="absolute left-3 text-muted-foreground pointer-events-none flex-shrink-0"
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          placeholder="Search capabilities…"
          className="w-full bg-background border border-border rounded-md pl-8 pr-7 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setFocused(0);
          }}
          onFocus={() => { if (query) setOpen(true); }}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          spellCheck={false}
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-2.5 text-muted-foreground hover:text-foreground transition-colors"
            tabIndex={-1}
            aria-label="Clear search"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {open && query.trim().length >= 1 && (
        <div className="absolute left-3 right-3 top-full z-50 mt-1 bg-card border border-border rounded-lg shadow-xl overflow-hidden">
          {results.length === 0 ? (
            <div className="px-4 py-3 text-sm text-muted-foreground">
              No capabilities match <span className="text-foreground font-medium">"{query}"</span>
            </div>
          ) : (
            <>
              <div className="px-3 py-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider border-b border-border bg-background/50">
                {results.length} result{results.length !== 1 ? 's' : ''}
              </div>
              <ul
                ref={listRef}
                className="max-h-80 overflow-y-auto overscroll-contain divide-y divide-border"
                role="listbox"
              >
                {results.map((result, i) => (
                  <li
                    key={`${result.domainId}-${result.code}`}
                    role="option"
                    aria-selected={i === focused}
                    onMouseEnter={() => setFocused(i)}
                    onClick={() => handleSelect(result)}
                    className={`px-3 py-2.5 cursor-pointer transition-colors ${
                      i === focused ? 'bg-primary/10' : 'hover:bg-secondary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-primary font-mono font-bold text-[11px] bg-primary/10 px-1.5 py-0.5 rounded flex-shrink-0">
                          {result.code}
                        </span>
                        <span className="text-sm font-semibold text-foreground truncate">
                          {highlight(result.name, query)}
                        </span>
                      </div>
                      {result.inSela && (
                        <span className="flex-shrink-0 text-[10px] font-bold text-[#40e0d0] border border-primary/40 rounded-full px-1.5 py-0.5 bg-[rgba(0,180,180,0.1)]">
                          SELA
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[11px] text-muted-foreground/70">{result.domainName}</span>
                    </div>
                    {result.description.toLowerCase().includes(query.toLowerCase()) &&
                      !result.name.toLowerCase().includes(query.toLowerCase()) &&
                      !result.code.toLowerCase().includes(query.toLowerCase()) && (
                        <p className="text-[11px] text-muted-foreground mt-1 line-clamp-1">
                          {highlight(result.description, query)}
                        </p>
                      )}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
