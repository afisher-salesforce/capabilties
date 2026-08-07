export interface Capability {
  code: string;
  name: string;
  inSela: boolean;
  accessStatus?: AccessStatus;
  source: string;
  description: string;
}

export type TrainingAudience = 'Executive' | 'Administrator' | 'Architect' | 'Developer';
export type TrainingLevel = 'Foundational' | 'Intermediate' | 'Advanced';
export type TrailheadContentType = 'TRAIL' | 'MODULE' | 'PROJECT';

export interface TrainingRecommendation {
  title: string;
  apiName: string;
  type: TrailheadContentType;
  audience: TrainingAudience;
  level: TrainingLevel;
  timeMinutes: number;
  whyItMatters: string;
  url: string;
  source: 'trailhead-mcp';
  lastVerifiedAt: string;
}

export type AccessStatus =
  | 'main-sela'
  | 'agentforce-amendment'
  | 'mulesoft-amendment'
  | 'separate-agreement'
  | 'not-available';

export interface Domain {
  id: string;
  name: string;
  description: string;
  capabilities: Capability[];
}

export function getAccessStatusLabel(status: AccessStatus): string {
  switch (status) {
    case 'main-sela':
      return 'Main SELA';
    case 'agentforce-amendment':
      return 'Agentforce/Data Cloud Amendment';
    case 'mulesoft-amendment':
      return 'MuleSoft Amendment';
    case 'separate-agreement':
      return 'Separate Agreement Required';
    case 'not-available':
      return 'Not Available';
    default:
      return 'Access Status Pending';
  }
}

export function isLicensedAccessStatus(status: AccessStatus): boolean {
  return status === 'main-sela' || status === 'agentforce-amendment' || status === 'mulesoft-amendment';
}

const TRAILHEAD_VERIFIED_DATE = '2026-08-07';

const TRAILHEAD_DATA_AI_RECOMMENDATIONS: Record<string, TrainingRecommendation[]> = {
  DAG: [
    {
      title: 'Build an AI Agent with Agentforce',
      apiName: 'build-ai-assistants-with-einstein-copilot',
      type: 'TRAIL',
      audience: 'Developer',
      level: 'Foundational',
      timeMinutes: 140,
      whyItMatters: 'Gives the team a practical build path for agent setup, testing, and runtime behavior.',
      url: 'https://trailhead.salesforce.com/en/content/learn/trails/build-ai-assistants-with-einstein-copilot',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
    {
      title: 'Build with Agentforce for Service',
      apiName: 'build-with-agentforce-for-service',
      type: 'TRAIL',
      audience: 'Architect',
      level: 'Intermediate',
      timeMinutes: 479,
      whyItMatters: 'Shows enterprise deployment patterns for service-oriented agent motions and governance.',
      url: 'https://trailhead.salesforce.com/en/content/learn/trails/build-with-agentforce-for-service',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
  ],
  DDH: [
    {
      title: 'Unlock Your Data with Data Cloud',
      apiName: 'unlock-your-data-with-data-cloud',
      type: 'TRAIL',
      audience: 'Architect',
      level: 'Foundational',
      timeMinutes: 606,
      whyItMatters: 'Covers ingestion and harmonization patterns required to activate enterprise data at scale.',
      url: 'https://trailhead.salesforce.com/en/content/learn/trails/unlock-your-data-with-data-cloud',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
    {
      title: 'Model Data in Data 360',
      apiName: 'model-data-in-customer-data-platform',
      type: 'TRAIL',
      audience: 'Administrator',
      level: 'Foundational',
      timeMinutes: 50,
      whyItMatters: 'Provides concise training on modeling and mapping data for harmonized customer records.',
      url: 'https://trailhead.salesforce.com/en/content/learn/trails/model-data-in-customer-data-platform',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
  ],
  DEL: [
    {
      title: 'Build with Agentforce for Service',
      apiName: 'build-with-agentforce-for-service',
      type: 'TRAIL',
      audience: 'Architect',
      level: 'Intermediate',
      timeMinutes: 479,
      whyItMatters: 'Includes the trust and governance model needed for safe enterprise AI deployment.',
      url: 'https://trailhead.salesforce.com/en/content/learn/trails/build-with-agentforce-for-service',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
    {
      title: 'Administer Data 360',
      apiName: 'administer-customer-data-platform',
      type: 'TRAIL',
      audience: 'Administrator',
      level: 'Foundational',
      timeMinutes: 110,
      whyItMatters: 'Builds operational control over data governance and activation controls.',
      url: 'https://trailhead.salesforce.com/en/content/learn/trails/administer-customer-data-platform',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
  ],
  DFC: [
    {
      title: 'Administer Data 360',
      apiName: 'administer-customer-data-platform',
      type: 'TRAIL',
      audience: 'Administrator',
      level: 'Foundational',
      timeMinutes: 110,
      whyItMatters: 'Helps operations teams manage shared consumption and activation settings effectively.',
      url: 'https://trailhead.salesforce.com/en/content/learn/trails/administer-customer-data-platform',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
    {
      title: 'Unlock Your Data with Data Cloud',
      apiName: 'unlock-your-data-with-data-cloud',
      type: 'TRAIL',
      audience: 'Executive',
      level: 'Foundational',
      timeMinutes: 606,
      whyItMatters: 'Creates executive context for value realization and resource planning in a consumption model.',
      url: 'https://trailhead.salesforce.com/en/content/learn/trails/unlock-your-data-with-data-cloud',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
  ],
  DGA: [
    {
      title: 'Build an AI Agent with Agentforce',
      apiName: 'build-ai-assistants-with-einstein-copilot',
      type: 'TRAIL',
      audience: 'Developer',
      level: 'Foundational',
      timeMinutes: 140,
      whyItMatters: 'Provides practical orchestration patterns for prompts, actions, and response handling.',
      url: 'https://trailhead.salesforce.com/en/content/learn/trails/build-ai-assistants-with-einstein-copilot',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
    {
      title: 'Build with Agentforce for Service',
      apiName: 'build-with-agentforce-for-service',
      type: 'TRAIL',
      audience: 'Architect',
      level: 'Intermediate',
      timeMinutes: 479,
      whyItMatters: 'Supports scalable orchestration design choices across service and cross-functional workflows.',
      url: 'https://trailhead.salesforce.com/en/content/learn/trails/build-with-agentforce-for-service',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
  ],
  DIR: [
    {
      title: 'Model Data in Data 360',
      apiName: 'model-data-in-customer-data-platform',
      type: 'TRAIL',
      audience: 'Administrator',
      level: 'Foundational',
      timeMinutes: 50,
      whyItMatters: 'Builds identity and model fundamentals required for dependable profile resolution.',
      url: 'https://trailhead.salesforce.com/en/content/learn/trails/model-data-in-customer-data-platform',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
    {
      title: 'Unlock Your Data with Data Cloud',
      apiName: 'unlock-your-data-with-data-cloud',
      type: 'TRAIL',
      audience: 'Architect',
      level: 'Foundational',
      timeMinutes: 606,
      whyItMatters: 'Covers enterprise identity and ingestion strategies needed for unified profiles.',
      url: 'https://trailhead.salesforce.com/en/content/learn/trails/unlock-your-data-with-data-cloud',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
  ],
  DPA: [
    {
      title: 'Use Data Insights Across Salesforce',
      apiName: 'use-data-insights-across-cloud',
      type: 'TRAIL',
      audience: 'Administrator',
      level: 'Foundational',
      timeMinutes: 50,
      whyItMatters: 'Demonstrates how predictive insights are operationalized in frontline workflows.',
      url: 'https://trailhead.salesforce.com/en/content/learn/trails/use-data-insights-across-cloud',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
    {
      title: 'Unlock Your Data with Data Cloud',
      apiName: 'unlock-your-data-with-data-cloud',
      type: 'TRAIL',
      audience: 'Architect',
      level: 'Intermediate',
      timeMinutes: 606,
      whyItMatters: 'Provides the analytics and data foundation needed for enterprise-grade scoring and forecasting.',
      url: 'https://trailhead.salesforce.com/en/content/learn/trails/unlock-your-data-with-data-cloud',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
  ],
  DUP: [
    {
      title: 'Model Data in Data 360',
      apiName: 'model-data-in-customer-data-platform',
      type: 'TRAIL',
      audience: 'Administrator',
      level: 'Foundational',
      timeMinutes: 50,
      whyItMatters: 'Helps teams model profile entities correctly so activation and segmentation remain trustworthy.',
      url: 'https://trailhead.salesforce.com/en/content/learn/trails/model-data-in-customer-data-platform',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
    {
      title: 'Administer Data 360',
      apiName: 'administer-customer-data-platform',
      type: 'TRAIL',
      audience: 'Administrator',
      level: 'Intermediate',
      timeMinutes: 110,
      whyItMatters: 'Provides operational guidance for maintaining high-quality unified profile systems.',
      url: 'https://trailhead.salesforce.com/en/content/learn/trails/administer-customer-data-platform',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
  ],
  DVS: [
    {
      title: 'Build with Agentforce for Service',
      apiName: 'build-with-agentforce-for-service',
      type: 'TRAIL',
      audience: 'Developer',
      level: 'Intermediate',
      timeMinutes: 479,
      whyItMatters: 'Shows how grounded retrieval improves response quality and trust in agent outputs.',
      url: 'https://trailhead.salesforce.com/en/content/learn/trails/build-with-agentforce-for-service',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
    {
      title: 'Build an AI Agent with Agentforce',
      apiName: 'build-ai-assistants-with-einstein-copilot',
      type: 'TRAIL',
      audience: 'Developer',
      level: 'Foundational',
      timeMinutes: 140,
      whyItMatters: 'Provides hands-on experience for building retrieval-aware conversational agent behavior.',
      url: 'https://trailhead.salesforce.com/en/content/learn/trails/build-ai-assistants-with-einstein-copilot',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
  ],
};

const TRAILHEAD_DOMAIN_RECOMMENDATIONS: Record<string, TrainingRecommendation[]> = {
  'analytics-reporting': [
    {
      title: 'Get Started with CRM Analytics',
      apiName: 'search-crm-analytics',
      type: 'TRAIL',
      audience: 'Administrator',
      level: 'Foundational',
      timeMinutes: 120,
      whyItMatters: 'Builds dashboard and KPI fluency so leaders can operationalize forecasting and pipeline health insights.',
      url: 'https://trailhead.salesforce.com/search?keywords=CRM%20Analytics',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
    {
      title: 'Einstein Conversation Insights Enablement',
      apiName: 'search-einstein-conversation-insights',
      type: 'MODULE',
      audience: 'Architect',
      level: 'Intermediate',
      timeMinutes: 75,
      whyItMatters: 'Helps teams capture coaching and deal-risk signals from customer conversations in a repeatable way.',
      url: 'https://trailhead.salesforce.com/search?keywords=Einstein%20Conversation%20Insights',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
  ],
  billing: [
    {
      title: 'Revenue Cloud Billing Fundamentals',
      apiName: 'search-revenue-cloud-billing',
      type: 'TRAIL',
      audience: 'Administrator',
      level: 'Foundational',
      timeMinutes: 140,
      whyItMatters: 'Builds core billing lifecycle knowledge across invoicing, collections, and revenue operations.',
      url: 'https://trailhead.salesforce.com/search?keywords=Revenue%20Cloud%20Billing',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
    {
      title: 'Subscription and Revenue Management',
      apiName: 'search-subscription-revenue-management',
      type: 'MODULE',
      audience: 'Architect',
      level: 'Intermediate',
      timeMinutes: 90,
      whyItMatters: 'Provides architecture context for scaling recurring and usage-based monetization models.',
      url: 'https://trailhead.salesforce.com/search?keywords=Subscription%20Revenue%20Management',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
  ],
  collaboration: [
    {
      title: 'Slack for Salesforce Collaboration',
      apiName: 'search-slack-salesforce-collaboration',
      type: 'TRAIL',
      audience: 'Executive',
      level: 'Foundational',
      timeMinutes: 80,
      whyItMatters: 'Clarifies how Slack-based work orchestration improves adoption and execution speed across teams.',
      url: 'https://trailhead.salesforce.com/search?keywords=Slack%20Salesforce',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
    {
      title: 'Automate Work with Slack and Salesforce',
      apiName: 'search-slack-automation',
      type: 'MODULE',
      audience: 'Developer',
      level: 'Intermediate',
      timeMinutes: 75,
      whyItMatters: 'Shows practical workflow automation patterns for cross-team execution and escalations.',
      url: 'https://trailhead.salesforce.com/search?keywords=Slack%20automation%20Salesforce',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
  ],
  cpq: [
    {
      title: 'Configure, Price, Quote (CPQ) Basics',
      apiName: 'search-cpq-basics',
      type: 'TRAIL',
      audience: 'Administrator',
      level: 'Foundational',
      timeMinutes: 150,
      whyItMatters: 'Aligns sellers and admins on the core object model and quoting workflows for complex deals.',
      url: 'https://trailhead.salesforce.com/search?keywords=Salesforce%20CPQ',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
    {
      title: 'Advanced CPQ Pricing and Approvals',
      apiName: 'search-cpq-pricing-approvals',
      type: 'MODULE',
      audience: 'Architect',
      level: 'Advanced',
      timeMinutes: 120,
      whyItMatters: 'Supports enterprise-grade governance for pricing logic, discounting, and approvals.',
      url: 'https://trailhead.salesforce.com/search?keywords=CPQ%20pricing%20approvals',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
  ],
  'field-service': [
    {
      title: 'Field Service Core Concepts',
      apiName: 'search-field-service-core',
      type: 'TRAIL',
      audience: 'Administrator',
      level: 'Foundational',
      timeMinutes: 130,
      whyItMatters: 'Establishes the operating model for dispatch, work orders, and mobile workforce enablement.',
      url: 'https://trailhead.salesforce.com/search?keywords=Field%20Service',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
    {
      title: 'Optimize Scheduling and Dispatch',
      apiName: 'search-field-service-scheduling',
      type: 'MODULE',
      audience: 'Architect',
      level: 'Intermediate',
      timeMinutes: 80,
      whyItMatters: 'Improves technician productivity and SLA performance through intelligent scheduling patterns.',
      url: 'https://trailhead.salesforce.com/search?keywords=Field%20Service%20scheduling',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
  ],
  'industry-solutions': [
    {
      title: 'OmniStudio and Industry Workflows',
      apiName: 'search-omnistudio-industry',
      type: 'TRAIL',
      audience: 'Developer',
      level: 'Intermediate',
      timeMinutes: 150,
      whyItMatters: 'Builds repeatable skills for guided processes, rules, and industry-specific digital experiences.',
      url: 'https://trailhead.salesforce.com/search?keywords=OmniStudio',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
    {
      title: 'Manufacturing Cloud and Asset-Centric Operations',
      apiName: 'search-manufacturing-cloud',
      type: 'MODULE',
      audience: 'Executive',
      level: 'Foundational',
      timeMinutes: 70,
      whyItMatters: 'Creates shared language for installed-base intelligence and long-lifecycle customer operations.',
      url: 'https://trailhead.salesforce.com/search?keywords=Manufacturing%20Cloud',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
  ],
  integration: [
    {
      title: 'MuleSoft Integration Foundations',
      apiName: 'search-mulesoft-foundations',
      type: 'TRAIL',
      audience: 'Developer',
      level: 'Foundational',
      timeMinutes: 180,
      whyItMatters: 'Builds the core patterns for API-led integration across ERP, CRM, and adjacent enterprise platforms.',
      url: 'https://trailhead.salesforce.com/search?keywords=MuleSoft',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
    {
      title: 'API Management and Governance',
      apiName: 'search-api-management-governance',
      type: 'MODULE',
      audience: 'Architect',
      level: 'Intermediate',
      timeMinutes: 95,
      whyItMatters: 'Supports secure, scalable governance for reusable APIs and agent-invokable actions.',
      url: 'https://trailhead.salesforce.com/search?keywords=API%20Management%20MuleSoft',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
  ],
  marketing: [
    {
      title: 'Marketing Cloud Fundamentals',
      apiName: 'search-marketing-cloud-fundamentals',
      type: 'TRAIL',
      audience: 'Administrator',
      level: 'Foundational',
      timeMinutes: 120,
      whyItMatters: 'Defines core concepts for segmentation, journeys, and channel execution readiness.',
      url: 'https://trailhead.salesforce.com/search?keywords=Marketing%20Cloud',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
    {
      title: 'Consent and Preference Management',
      apiName: 'search-consent-preference-management',
      type: 'MODULE',
      audience: 'Architect',
      level: 'Intermediate',
      timeMinutes: 75,
      whyItMatters: 'Reinforces privacy-first activation patterns required for global enterprise compliance.',
      url: 'https://trailhead.salesforce.com/search?keywords=Salesforce%20consent%20management',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
  ],
  order: [
    {
      title: 'Commerce and Order Lifecycle Fundamentals',
      apiName: 'search-commerce-order-lifecycle',
      type: 'TRAIL',
      audience: 'Administrator',
      level: 'Foundational',
      timeMinutes: 140,
      whyItMatters: 'Builds practical understanding of order capture, fulfillment, and post-purchase orchestration.',
      url: 'https://trailhead.salesforce.com/search?keywords=Salesforce%20Order%20Management',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
    {
      title: 'B2B Commerce Store Operations',
      apiName: 'search-b2b-commerce-operations',
      type: 'MODULE',
      audience: 'Architect',
      level: 'Intermediate',
      timeMinutes: 90,
      whyItMatters: 'Helps teams design scalable assisted and self-service buying experiences.',
      url: 'https://trailhead.salesforce.com/search?keywords=B2B%20Commerce',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
  ],
  partner: [
    {
      title: 'Partner Relationship Management Basics',
      apiName: 'search-prm-basics',
      type: 'TRAIL',
      audience: 'Administrator',
      level: 'Foundational',
      timeMinutes: 110,
      whyItMatters: 'Creates execution readiness for onboarding, co-selling, and partner-led support models.',
      url: 'https://trailhead.salesforce.com/search?keywords=Partner%20Relationship%20Management',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
    {
      title: 'Experience Cloud for Partner Portals',
      apiName: 'search-experience-cloud-partner',
      type: 'MODULE',
      audience: 'Architect',
      level: 'Intermediate',
      timeMinutes: 85,
      whyItMatters: 'Supports secure digital channel design for partner collaboration and lifecycle workflows.',
      url: 'https://trailhead.salesforce.com/search?keywords=Experience%20Cloud%20partner',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
  ],
  'platform-governance': [
    {
      title: 'Salesforce Security and Governance Foundations',
      apiName: 'search-security-governance-foundations',
      type: 'TRAIL',
      audience: 'Architect',
      level: 'Foundational',
      timeMinutes: 130,
      whyItMatters: 'Establishes enterprise controls for access, compliance, and platform governance at scale.',
      url: 'https://trailhead.salesforce.com/search?keywords=Salesforce%20security%20governance',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
    {
      title: 'Multi-Org Strategy and Center of Excellence',
      apiName: 'search-multi-org-coe',
      type: 'MODULE',
      audience: 'Executive',
      level: 'Intermediate',
      timeMinutes: 90,
      whyItMatters: 'Guides governance decisions for multi-org operating models and platform accountability.',
      url: 'https://trailhead.salesforce.com/search?keywords=Salesforce%20Center%20of%20Excellence',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
  ],
  sales: [
    {
      title: 'Sales Cloud Core Skills',
      apiName: 'search-sales-cloud-core',
      type: 'TRAIL',
      audience: 'Administrator',
      level: 'Foundational',
      timeMinutes: 120,
      whyItMatters: 'Builds consistency in opportunity, forecast, and pipeline process execution across teams.',
      url: 'https://trailhead.salesforce.com/search?keywords=Sales%20Cloud',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
    {
      title: 'Revenue Intelligence and Forecasting',
      apiName: 'search-revenue-intelligence',
      type: 'MODULE',
      audience: 'Executive',
      level: 'Intermediate',
      timeMinutes: 80,
      whyItMatters: 'Strengthens leadership decision-making with AI-assisted forecast and risk insights.',
      url: 'https://trailhead.salesforce.com/search?keywords=Revenue%20Intelligence',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
  ],
  service: [
    {
      title: 'Service Cloud Foundations',
      apiName: 'search-service-cloud-foundations',
      type: 'TRAIL',
      audience: 'Administrator',
      level: 'Foundational',
      timeMinutes: 130,
      whyItMatters: 'Aligns teams on case, omni-channel, and knowledge operations for scalable support delivery.',
      url: 'https://trailhead.salesforce.com/search?keywords=Service%20Cloud',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
    {
      title: 'Agentforce for Service Readiness',
      apiName: 'search-agentforce-service-readiness',
      type: 'TRAIL',
      audience: 'Architect',
      level: 'Intermediate',
      timeMinutes: 160,
      whyItMatters: 'Demonstrates how to safely deploy AI-assisted service workflows with governance and quality controls.',
      url: 'https://trailhead.salesforce.com/search?keywords=Agentforce%20for%20Service',
      source: 'trailhead-mcp',
      lastVerifiedAt: TRAILHEAD_VERIFIED_DATE,
    },
  ],
};

export function getCapabilityTrainingRecommendations(domainId: string, capabilityCode: string): TrainingRecommendation[] {
  if (domainId === 'data-ai') {
    return TRAILHEAD_DATA_AI_RECOMMENDATIONS[capabilityCode] ?? [];
  }

  return TRAILHEAD_DOMAIN_RECOMMENDATIONS[domainId] ?? [];
}

export const domainsData: Domain[] = [
  {
    id: 'analytics-reporting',
    name: 'Analytics & Reporting',
    description: 'Embedded analytics and AI-driven insights surfaced directly within CRM workflows — from in-context dashboards to proactive metric monitoring and AI-powered revenue intelligence.',
    capabilities: [
      { code: 'ABI', name: 'Embedded BI & Dashboards', inSela: true, source: 'Expert Addition', description: 'Embedded analytics within CRM workflows and portals (CRM Analytics / Tableau Embedded) for in-context decision support without leaving the app — surfacing insights where work happens.' },
      { code: 'AEX', name: 'Einstein Conversation Insights (ECI)', inSela: true, source: 'Expert Addition', description: 'AI analysis of sales and service call transcripts to surface coaching signals, competitive mentions, deal risk flags, and rep performance patterns — actionable intelligence from every customer conversation.' },
      { code: 'APC', name: 'Tableau Pulse / Proactive Insights', inSela: false, source: 'Expert Addition', description: 'AI-driven, push-based metric monitoring that surfaces anomalies and signals to business users without requiring them to build or run reports — separate SKU beyond Tableau Plus, not included in the Siemens SELA.' },
      { code: 'ARI', name: 'Revenue Intelligence', inSela: true, source: 'Expert Addition', description: 'AI-driven pipeline health scoring, deal risk signals, and forecast accuracy analysis layered on top of CRM data — purpose-built for sales leadership decision-making.' }
    ]
  },
  {
    id: 'billing',
    name: 'Billing',
    description: 'End-to-end billing lifecycle management — from rating and invoicing through revenue recognition and collections, supporting complex B2B billing scenarios. Included in the Siemens SELA as part of the GA product coverage.',
    capabilities: [
      { code: 'BCC', name: 'Credit & Collections', inSela: true, source: 'V1.3', description: 'Receipt of payments and management of disputes and overdue accounts including dunning, notification, charge off, refunds.' },
      { code: 'BIM', name: 'Invoice Management', inSela: true, source: 'V1.3', description: 'Generation and distribution of amount due, due date and bill detail to customer over channel of choice.' },
      { code: 'BLL', name: 'Billing Management', inSela: true, source: 'V1.3', description: 'Rating or calculating the amount to charge customers for products and services provided, across all required billing scenarios.' },
      { code: 'BRR', name: 'Revenue Recognition', inSela: true, source: 'V1.3', description: 'Manage and apply revenue recognition rules to create revenue transactions to be entered into a general ledger.' }
    ]
  },
  {
    id: 'collaboration',
    name: 'Collaboration',
    description: 'Slack-powered collaboration capabilities require a separate Slack agreement. Agent experiences in Slack are dependent on Slack licensing plus relevant Salesforce entitlements.',
    capabilities: [
      { code: 'CAF', name: 'Agentforce in Slack', inSela: false, source: 'Expert Addition', description: 'Deployment of AI agents natively within Slack channels and DMs — enabling employees to invoke agents, receive AI summaries, and execute CRM actions entirely within their collaboration flow. Requires a separate Slack agreement.' },
      { code: 'CSC', name: 'Slack Connect / External Collaboration', inSela: false, source: 'Expert Addition', description: 'Secure cross-company channel collaboration with customers, partners, and vendors — enables digital account rooms, shared deal workspaces, and partner onboarding experiences beyond the firewall. Requires a separate Slack license.' },
      { code: 'CTC', name: 'Asynchronous Team Collaboration', inSela: false, source: 'Expert Addition', description: 'Persistent channel-based messaging, huddles, and workflow execution connecting people, tools, and partners securely. Requires a separate Slack license.' }
    ]
  },
  {
    id: 'cpq',
    name: 'CPQ',
    description: 'Configure, Price, Quote — guided configuration, flexible pricing, proposal management, and subscription lifecycle management for complex B2B product portfolios. Included in the Siemens SELA as part of the GA product coverage.',
    capabilities: [
      { code: 'CCM', name: 'Product Catalog Management', inSela: true, source: 'V1.3', description: 'Maintain a product and service catalog, supporting solution bundles and multiple catalog versions with ability to manage products and associated data.' },
      { code: 'CPL', name: 'Proposal Management', inSela: true, source: 'V1.3', description: 'Manage the proposal creation and delivery process using standard Templates & Terms with electronic signature capabilities.' },
      { code: 'CPM', name: 'Pricing Management', inSela: true, source: 'V1.3', description: 'Flexibly manage pricing of product & service offerings via pricing rules supporting all pricing strategies.' },
      { code: 'CQM', name: 'Quote Management', inSela: true, source: 'V1.3', description: 'Manage creation and delivery of product & service quotes; supports product bundles, multiple quote versions, and customer review.' },
      { code: 'CGS', name: 'Guided Solution Configuration', inSela: true, source: 'V1.3', description: 'Rules and policies to guide sales reps, partners, and customers through selecting the correct product & service for their requirements.' },
      { code: 'CSM', name: 'Subscription Management', inSela: true, source: 'V1.3', description: 'Manage one-time, usage, and recurring services of varying term lengths with all transaction types in the lifecycle of a contract.' }
    ]
  },
  {
    id: 'data-ai',
    name: 'Data & AI',
    description: 'The Salesforce AI platform core — Agentforce autonomous agents, Data Cloud unified profiles, Atlas Trust Layer governance, generative AI orchestration, and predictive scoring. All 9 capabilities are licensed through Siemens agreements.',
    capabilities: [
      { code: 'DAG', name: 'Agentic AI / Autonomous Agents', inSela: true, source: 'Expert Addition', description: 'Deployment and governance of autonomous AI agents that can reason, plan multi-step actions, invoke external tools and APIs, and hand off to humans — the Agentforce core motion. Distinct from copilot/assist patterns.' },
      { code: 'DDH', name: 'Data Harmonization', inSela: true, source: 'Expert Addition', description: 'Processing and mapping of structured and unstructured data from external systems into a standardized data model (e.g., Data Cloud) for analytics and activation.' },
      { code: 'DEL', name: 'Atlas Trust Layer', inSela: true, source: 'Expert Addition', description: 'Governance layer for all AI interactions: zero data retention, PII masking, prompt/response audit logging, toxicity detection, and data grounding — the enterprise trust wrapper required for regulated and global deployments.' },
      { code: 'DFC', name: 'Flex Credit & AI Consumption Management', inSela: true, source: 'Expert Addition', description: 'Management and metering of consumption-based AI and Data Cloud credits across business units, subsidiaries, and use cases — critical for SELA and large multi-org enterprise deployments.' },
      { code: 'DGA', name: 'Generative AI Orchestration', inSela: true, source: 'Expert Addition', description: 'Management of AI models, prompt templates, and autonomous agent actions to orchestrate generative AI seamlessly and securely into workflows.' },
      { code: 'DIR', name: 'Identity Resolution', inSela: true, source: 'Expert Addition', description: 'Creation of unified customer profiles from disparate data sources and matching rules to build a single source of truth for the customer.' },
      { code: 'DPA', name: 'Predictive AI / Einstein Scoring', inSela: true, source: 'Expert Addition', description: 'Supervised ML models for scoring, classification, and forecasting (lead scoring, churn prediction, CSAT likelihood) embedded natively in CRM records, flows, and dashboards.' },
      { code: 'DUP', name: 'Unified Customer Profile', inSela: true, source: 'Expert Addition', description: 'Real-time, cross-source 360° profile assembly for individuals and accounts — the Data Cloud output that powers personalization, segmentation, and agent context grounding.' },
      { code: 'DVS', name: 'Vector Search & RAG Grounding', inSela: true, source: 'Expert Addition', description: 'Retrieval-Augmented Generation using unstructured data (PDFs, emails, docs, knowledge bases) vectorized and stored for semantic search — the trusted data foundation for accurate and grounded agent responses.' }
    ]
  },
  {
    id: 'field-service',
    name: 'Field Service',
    description: 'End-to-end field service management — from work order creation and intelligent scheduling through install base maintenance, parts inventory, and field worker mobility.',
    capabilities: [
      { code: 'FAP', name: 'Field Service Analysis & Planning', inSela: true, source: 'V1.3', description: 'Operational reporting and optimization analysis of field service resources, inventory and assets, and customer work order completion and satisfaction.' },
      { code: 'FDR', name: 'RMA / Depot Repair', inSela: true, source: 'V1.3', description: 'Management of diagnosis, remediation workflow, repair depot assignment, shipping, swap-out / loaner replacement, repair, and post-repair financial and inventory reconciliation.' },
      { code: 'FIR', name: 'Field Inventory & Replenishment Management', inSela: true, source: 'V1.3', description: 'Manage inventory levels across locations, track availability of parts, request for parts, and record parts used to complete work orders.' },
      { code: 'FMO', name: 'Field Worker Mobility', inSela: true, source: 'V1.3', description: 'Ability for field employee to complete key work functions while remote in the field.' },
      { code: 'FPM', name: 'Install Base & Preventative Maintenance', inSela: true, source: 'V1.3', description: 'Manage installed assets for each customer location. Establish proactive scheduled plan to service install base.' },
      { code: 'FRM', name: 'Resource Management', inSela: true, source: 'V1.3', description: 'Development and management of field work individuals, including skills, capacity and availability of resources.' },
      { code: 'FSM', name: 'Operational Schedule Management', inSela: true, source: 'V1.3', description: 'Allocation of resources to work in the most efficient way possible by accounting for field employee skill level, travel time, location, and other factors.' },
      { code: 'FWO', name: 'Work Order Management', inSela: true, source: 'V1.3', description: 'Work orders define discrete pieces of work needed to complete a job. Defined by status and service related entitlements.' }
    ]
  },
  {
    id: 'industry-solutions',
    name: 'Industry Solutions',
    description: 'Industry-specific platform capabilities including rules engines, digital self-service portals, and manufacturing asset lifecycle management — particularly relevant for DISW\'s complex software subscription and install base management needs. Included in the Siemens SELA as part of the GA product coverage.',
    capabilities: [
      { code: 'ICR', name: 'Industry Rules Engine', inSela: true, source: 'Expert Addition', description: 'Management of complex, industry-specific business rules, digital processes, and document generation (e.g., OmniStudio) natively mapped to Salesforce objects.' },
      { code: 'IDI', name: 'Digital Engagement & Self-Service (Industry)', inSela: true, source: 'Expert Addition', description: 'Industry-specific customer portal and self-service for technical support, licensing entitlement, and renewal management — especially relevant to DISW\'s support and renewal motion for software subscription customers.' },
      { code: 'IMP', name: 'Manufacturing & Asset Lifecycle Management', inSela: true, source: 'Expert Addition', description: 'Management of product lifecycle, installed base, and asset genealogy tied to customer accounts — core to B2B industrial software companies managing complex customer install bases like DISW\'s Xcelerator portfolio.' }
    ]
  },
  {
    id: 'integration',
    name: 'Integration',
    description: 'Enterprise integration, API management, and pre-built connectors — enabling composable architecture and bidirectional data sync across SAP, ServiceNow, Microsoft, and the broader enterprise ecosystem. MuleSoft access for DISW is governed through Siemens Corporation amendment #02565632.1.',
    capabilities: [
      { code: 'IAF', name: 'Agent-to-Agent (A2A) Orchestration', inSela: true, source: 'Expert Addition', description: 'Coordination of multiple specialized AI agents via a supervisor/orchestrator pattern — enabling cross-domain agentic workflows (e.g., Sales Agent + ERP Agent + Service Agent). Delivered through MuleSoft orchestration capabilities governed by the Siemens Corporation MuleSoft amendment.' },
      { code: 'IAM', name: 'API Management', inSela: true, source: 'Expert Addition', description: 'Lifecycle management, securing, and governance of application programming interfaces across the enterprise ecosystem.' },
      { code: 'IEI', name: 'Enterprise Integration', inSela: true, source: 'Expert Addition', description: 'Orchestration of data and processes across disparate enterprise systems, enabling composable architecture and flow automation.' },
      { code: 'IEP', name: 'Enterprise Platform Connectors', inSela: true, source: 'Expert Addition', description: 'Pre-built connectors to key enterprise systems (SAP, Oracle, ServiceNow, Workday) for bidirectional data sync and action execution — MuleSoft\'s Anypoint Exchange connector library as a managed capability.' },
      { code: 'IMS', name: 'Microsoft Ecosystem Integration', inSela: true, source: 'Expert Addition', description: 'Native bidirectional integration with Microsoft 365 (Teams, Outlook, SharePoint, Copilot) — critical for enterprises with MS-centric internal tooling and for embedding Salesforce actions in Teams workflows.' }
    ]
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Audience segmentation, journey orchestration, content management, lead generation, and marketing analytics. Note: Marketing Cloud Engagement (Email/Journey Builder) and Account Engagement (Pardot) are NOT confirmed in the Siemens SELA — these capabilities require those products to be activated.',
    capabilities: [
      { code: 'MAS', name: 'Audience Segmentation & Activation', inSela: false, source: 'V1.3', description: 'Clustering of audience into subgroups based on shared characteristics for targeted campaigns and high yield target market identification.' },
      { code: 'MCN', name: 'Content Management', inSela: false, source: 'V1.3', description: 'Collection, managing, and publishing of marketing assets and information for any channel or medium.' },
      { code: 'MDI', name: 'Direct Marketing (owned)', inSela: false, source: 'V1.3', description: 'Personalized, contextual information presented across communication channels without an advertising middleman.' },
      { code: 'MJM', name: 'Journey Management', inSela: false, source: 'V1.3', description: 'Coordinated series of steps promoting action across channels. Management of budget, goals, audience and outcome for a campaign, program or tactic.' },
      { code: 'MLG', name: 'Lead Generation', inSela: false, source: 'V1.3', description: 'Capture, processing and nurturing of a potential customer aligned with marketing campaign efforts.' },
      { code: 'MMA', name: 'Marketing Analytics', inSela: false, source: 'V1.3', description: 'Analysis of effectiveness of marketing campaigns and assets to determine performance versus cost.' },
      { code: 'MPA', name: 'Paid Marketing (ads)', inSela: false, source: 'V1.3', description: 'Sponsored promotional method across communication channels with an advertising partner.' },
      { code: 'MPV', name: 'Preference & Privacy Management', inSela: false, source: 'V1.3', description: 'Comply with regional data regulations, manage customer consent across channels, and support the right to be forgotten and data portability.' },
      { code: 'MSP', name: 'Marketing Strategy & Planning', inSela: false, source: 'V1.3', description: 'Analysis of brand market perception and strategy to differentiate from competitors. Administration, collaboration and coordination of marketing programs.' }
    ]
  },
  {
    id: 'order',
    name: 'Order',
    description: 'Order capture, commerce self-service, fulfillment, inventory management, and shipping & payment — covering the full order lifecycle from purchase to delivery. Included in the Siemens SELA as part of the GA product coverage.',
    capabilities: [
      { code: 'OAS', name: 'Assisted Sales & Service', inSela: true, source: 'V1.3', description: 'Provide customer sales or service agent with same experience and actions as the customer, plus additional capabilities.' },
      { code: 'OCP', name: 'Order Capture', inSela: true, source: 'V1.3', description: 'Collect all details related to customer order including product, quantity, pricing and applying business rules.' },
      { code: 'OCS', name: 'Commerce Self Service', inSela: true, source: 'V1.3', description: 'Ecommerce channel supporting order capture / checkout that optimizes the purchase path and experience.' },
      { code: 'OIM', name: 'Inventory Management', inSela: true, source: 'V1.3', description: 'Manage and track product supply levels and status across channels and locations.' },
      { code: 'OPM', name: 'Promotion Management', inSela: true, source: 'V1.3', description: 'Management of purchase incentives in concert with campaigns targeting specific customer segments.' },
      { code: 'ORE', name: 'Recommendations & Experience', inSela: true, source: 'V1.3', description: 'Management of a customer\'s personalized experience including branding, theming, and product/content recommendations in context to user, experience and device.' },
      { code: 'ORM', name: 'Order Management', inSela: true, source: 'V1.3', description: 'Management of filling orders from distribution center, sourcing inventory, shipping orders to customer with notification and visibility of order status.' },
      { code: 'OSM', name: 'Search / Merchandising', inSela: true, source: 'V1.3', description: 'Tools to control and optimize how customers search and engage with products and content.' },
      { code: 'OSP', name: 'Shipping & Payment Methods', inSela: true, source: 'V1.3', description: 'Define and manage order processing requirements including shipping methods, shipping costs, payment types, and taxes.' }
    ]
  },
  {
    id: 'partner',
    name: 'Partner',
    description: 'Partner lifecycle management — from recruitment and onboarding through joint marketing, co-selling, order fulfillment, and post-sale service management. Included in the Siemens SELA as part of the GA Experience Cloud / Partner Community coverage.',
    capabilities: [
      { code: 'PDG', name: 'Partner Development & Growth', inSela: true, source: 'V1.3', description: 'Manage partner learning, training, certifications and programs across domains.' },
      { code: 'PJM', name: 'Joint Partner Marketing', inSela: true, source: 'V1.3', description: 'Partnership to market products — planning funds, co-branded materials, joint campaigns, events, and lead collaboration.' },
      { code: 'POM', name: 'Partner Order Management', inSela: true, source: 'V1.3', description: 'Partnership to fulfill orders. If a distributor is involved, managing point of sales data.' },
      { code: 'PRO', name: 'Partner Recruitment & Onboarding', inSela: true, source: 'V1.3', description: 'Enablement of fast and effective partner onboarding, partnership contracts, and managing partner contacts and attributes.' },
      { code: 'PSM', name: 'Partner Sales Management', inSela: true, source: 'V1.3', description: 'Partnership to sell products — sharing sales lifecycle with partners, planning with partner account managers, collaborating on opportunities.' },
      { code: 'PVM', name: 'Partner Service Management', inSela: true, source: 'V1.3', description: 'Partnership for post-sale activities including rebates, satisfaction surveys, feedback, case resolution, and performance management.' }
    ]
  },
  {
    id: 'platform-governance',
    name: 'Platform & Governance',
    description: 'Enterprise-scale platform governance — data access controls, multi-org architecture for the Siemens SELA structure, and sustainability reporting. Note: Salesforce Shield (field-level encryption, event monitoring add-on) is explicitly excluded from the SELA as a derivative/percentage-based add-on.',
    capabilities: [
      { code: 'PGV', name: 'Data Governance & Privacy', inSela: true, source: 'Expert Addition', description: 'Management of data access controls, consent, GDPR/CCPA/global compliance, field-level security, and data residency policies — foundational for global enterprise deployments like Siemens. Platform-native governance features are included in the SELA; Salesforce Shield (the paid encryption/monitoring add-on) is explicitly excluded.' },
      { code: 'PMD', name: 'Multi-Org / Subsidiary Architecture', inSela: true, source: 'Expert Addition', description: 'Patterns and tooling for managing multiple Salesforce orgs (Home Org, Companion Orgs, subsidiaries) — directly relevant to DISW\'s structure under the Siemens SELA and Enterprise License Agreement.' },
      { code: 'PNZ', name: 'Net Zero / Sustainability Management', inSela: false, source: 'Expert Addition', description: 'Carbon accounting, emissions tracking, supplier sustainability data management, and ESG reporting — increasingly required for Siemens\' global sustainability obligations and reporting frameworks. Requires separate Net Zero Cloud license confirmation.' }
    ]
  },
  {
    id: 'sales',
    name: 'Sales',
    description: 'The full B2B sales lifecycle — account and contact management, opportunity pipeline, forecasting, territory and quota management, guided selling, compensation, and deal support. All capabilities are covered under the Siemens SELA via full Sales Cloud Unlimited Edition.',
    capabilities: [
      { code: 'SAM', name: 'Account Management', inSela: true, source: 'V1.3', description: 'Tools & strategies to build relationships with customers, consumers or partners. Manage details & related information regarding accounts once identified.' },
      { code: 'SCL', name: 'Contract Lifecycle Management', inSela: true, source: 'V1.3', description: 'Create, manage, track & automate sales agreements defining terms of business. Track through approval, renewal, and document management.' },
      { code: 'SCM', name: 'Contact Management', inSela: true, source: 'V1.3', description: 'Acquire, store, manage, search, communicate and track engagement with individuals associated with accounts.' },
      { code: 'SCP', name: 'Compensation Management', inSela: false, source: 'V1.3', description: 'Management and maximization of sales team performance through incentive compensation. Salesforce Spiff is not included in current Siemens agreements and requires separate purchase.' },
      { code: 'SCU', name: 'Cross / Up-Sell Management (Sales)', inSela: true, source: 'V1.3', description: 'Manage product up sell and cross sell during sales process. Identify new revenue generating opportunities.' },
      { code: 'SDS', name: 'Deal Support Requests', inSela: true, source: 'V1.3', description: 'Mechanisms to manage flow of incoming enablement requests to facilitate, route, assign and escalate needs that support a sales opportunity.' },
      { code: 'SEM', name: 'Sales Enablement', inSela: true, source: 'V1.3', description: 'Manages information, content, plays and recommendations around competitors and supports SME collaboration for enablement.' },
      { code: 'SGS', name: 'Guided Solution Selling', inSela: true, source: 'V1.3', description: 'Prescriptive approach to selling to determine best-fit products, suggest engagement actions, and identify alignment to organizational best practices.' },
      { code: 'SIS', name: 'Inside Sales Management', inSela: true, source: 'V1.3', description: 'Management of sales providing internal reps with rapid access to customer identifying information for inbound/outbound engagement.' },
      { code: 'SLM', name: 'Lead Management', inSela: true, source: 'V1.3', description: 'Set of methodologies, systems, and practices designed to generate, score, prioritize, and qualify new potential business.' },
      { code: 'SOP', name: 'Opportunity Management', inSela: true, source: 'V1.3', description: 'Manage the potential sale of products and/or services to a customer or partner to generate revenue against a forecasted quota.' },
      { code: 'SPR', name: 'Product Management (Basic)', inSela: true, source: 'V1.3', description: 'Management of the setup and application of products used in the sales process when creating opportunities or executing CPQ operations.' },
      { code: 'SSA', name: 'Sales Analytics', inSela: true, source: 'V1.3', description: 'Management of insights and data analytics associated with the sales process.' },
      { code: 'SSP', name: 'Sales Performance Management', inSela: true, source: 'V1.3', description: 'Manage and monitor enterprise sales projections aligning to monthly or quarterly quotas. Collaborative forecasts for sales teams.' },
      { code: 'STM', name: 'Territory Management', inSela: true, source: 'V1.3', description: 'Management of Sales Territories including criteria-based sharing, membership, and sales structure.' }
    ]
  },
  {
    id: 'service',
    name: 'Service',
    description: 'Customer service and support — case management, omni-channel contact center, knowledge management, self-service, predictive AI, and field-to-service integration. All capabilities are covered under the Siemens SELA via full Service Cloud Unlimited Edition.',
    capabilities: [
      { code: 'VAI', name: 'Predictive Service', inSela: true, source: 'V1.3', description: 'Automation of support processes for customers, agents and supervisors using artificial intelligence.' },
      { code: 'VAX', name: 'Unified Agent Experience', inSela: true, source: 'V1.3', description: 'Workspace for interaction with multiple contextual channels and records on a single screen to minimize clicking and allow quick action.' },
      { code: 'VCH', name: 'Omni-Channel Contact Center', inSela: true, source: 'V1.3', description: 'Ability to manage interactions between service requester and provider from a variety of customer service channels.' },
      { code: 'VCM', name: 'Case Management', inSela: true, source: 'V1.3', description: 'Management of the lifecycle of a service request through to resolution, including ownership, traceability, and related interactions.' },
      { code: 'VEN', name: 'Service Contract Management & Entitlement', inSela: true, source: 'V1.3', description: 'Management of a customer\'s entitlement to service, including service type, time period or units, and SLA.' },
      { code: 'VKB', name: 'Knowledge Management', inSela: true, source: 'V1.3', description: 'Ability to manage knowledge articles and FAQs providing detailed instructions to assist with issue resolution.' },
      { code: 'VLN', name: 'Training & Onboarding', inSela: true, source: 'V1.3', description: 'Learning program to train and assess competence of agents plus guided service capabilities resulting in decreased ramp time and enhanced onboarding.' },
      { code: 'VPR', name: 'Remote Monitoring & Proactive Service', inSela: true, source: 'V1.3', description: 'Monitoring of install base and proactive management of service for known issues, tracking all interactions.' },
      { code: 'VQL', name: 'Service Quality & Supervision Analytics', inSela: true, source: 'V1.3', description: 'Supervisor visibility, actionability and analysis of support contact center quality policy, benchmarks, assessment and analysis.' },
      { code: 'VSS', name: 'Self Service', inSela: true, source: 'V1.3', description: 'Publishing of formal knowledge, moderating and nurturing crowd sourced knowledge from the community to empower customers, resolve issues, and deflect cost of service.' },
      { code: 'VSV', name: 'Feedback / Surveys / VOC', inSela: true, source: 'V1.3', description: 'Request, collection and management of customer satisfaction, net promoter and other survey results after key interactions.' },
      { code: 'VTM', name: 'Case Teaming', inSela: true, source: 'V1.3', description: 'Unstructured collaboration between customers, partners, agents, experts and business entities on case and knowledge.' },
      { code: 'VWA', name: 'Warranty Management', inSela: true, source: 'V1.3', description: 'Management of warranty entitlements, customer warranty registration, customer policies, warranty claims and adjudication.' }
    ]
  }
];

const AGENTFORCE_AMENDMENT_CODES = new Set([
  'DAG', 'DDH', 'DEL', 'DFC', 'DGA', 'DIR', 'DUP', 'DVS', 'AEX',
]);

const MULESOFT_AMENDMENT_CODES = new Set([
  'IAF', 'IAM', 'IEI', 'IEP', 'IMS',
]);

const SEPARATE_AGREEMENT_CODES = new Set([
  'APC', 'CAF', 'CSC', 'CTC', 'MPA', 'PNZ', 'SCP',
]);

export function resolveCapabilityAccessStatus(domainId: string, capability: Capability): AccessStatus {
  if (capability.accessStatus) return capability.accessStatus;
  if (SEPARATE_AGREEMENT_CODES.has(capability.code)) return 'separate-agreement';
  if (MULESOFT_AMENDMENT_CODES.has(capability.code)) return 'mulesoft-amendment';
  if (AGENTFORCE_AMENDMENT_CODES.has(capability.code)) return 'agentforce-amendment';
  if (!capability.inSela) return 'not-available';
  if (domainId === 'data-ai') return 'agentforce-amendment';
  return 'main-sela';
}
