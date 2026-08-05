import {
  BarChart3,
  BookOpenText,
  Database,
  FileText,
  Layers,
  Scale,
  Star,
  Users,
  type LucideIcon,
} from 'lucide-react';

export type NavItem = {
  name: string;
  href: string;
  icon: LucideIcon;
};

export const primaryNavItems: NavItem[] = [
  { name: 'Executive Summary', href: '/', icon: FileText },
  { name: 'Platform Framework', href: '/framework', icon: Layers },
  { name: "Dreamforce '26", href: '/dreamforce', icon: Star },
  { name: 'Team Design', href: '/team-design', icon: Users },
  { name: 'Salesforce Capabilities', href: '/capabilities', icon: Database },
  { name: 'External Research', href: '/research', icon: BarChart3 },
  { name: 'Forward Looking Statements', href: '/forward-looking-statements', icon: Scale },
];

export const guidedPageOrder: Array<{ title: string; href: string }> = [
  { title: 'Executive Summary', href: '/' },
  { title: 'Platform Framework', href: '/framework' },
  { title: "Dreamforce '26", href: '/dreamforce' },
  { title: 'Team Design', href: '/team-design' },
  { title: 'Salesforce Capabilities', href: '/capabilities' },
  { title: 'External Research', href: '/research' },
  { title: 'Forward Looking Statements', href: '/forward-looking-statements' },
];

export const capabilitiesGroupMeta = {
  title: 'Salesforce Capabilities',
  icon: BookOpenText,
};
