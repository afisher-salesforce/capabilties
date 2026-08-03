export interface Capability {
  code: string;
  name: string;
  inSela: boolean;
  source: string;
  description: string;
}

export interface Domain {
  id: string;
  name: string;
  description: string;
  capabilities: Capability[];
}

export const domainsData: Domain[] = [
  {
    id: 'analytics-reporting',
    name: 'Analytics & Reporting',
    description: 'Embedded analytics and AI-driven insights surfaced directly within CRM workflows — from in-context dashboards to proactive metric monitoring and AI-powered revenue intelligence.',
    capabilities: [
      { code: 'ABI', name: 'Embedded BI & Dashboards', inSela: true, source: 'Expert Addition', description: 'Embedded analytics within CRM workflows and portals (CRM Analytics / Tableau Embedded) for in-context decision support without leaving the app — surfacing insights where work happens.' },
      { code: 'AEX', name: 'Einstein Conversation Insights (ECI)', inSela: false, source: 'Expert Addition', description: 'AI analysis of sales and service call transcripts to surface coaching signals, competitive mentions, deal risk flags, and rep performance patterns — actionable intelligence from every customer conversation.' },
      { code: 'APC', name: 'Tableau Pulse / Proactive Insights', inSela: false, source: 'Expert Addition', description: 'AI-driven, push-based metric monitoring that surfaces anomalies and signals to business users without requiring them to build or run reports — Salesforce\'s answer to proactive analytics.' },
      { code: 'ARI', name: 'Revenue Intelligence', inSela: true, source: 'Expert Addition', description: 'AI-driven pipeline health scoring, deal risk signals, and forecast accuracy analysis layered on top of CRM data — purpose-built for sales leadership decision-making.' }
    ]
  },
  {
    id: 'billing',
    name: 'Billing',
    description: 'End-to-end billing lifecycle management — from rating and invoicing through revenue recognition and collections, supporting complex B2B billing scenarios.',
    capabilities: [
      { code: 'BCC', name: 'Credit & Collections', inSela: false, source: 'V1.3', description: 'Receipt of payments and management of disputes and overdue accounts including dunning, notification, charge off, refunds.' },
      { code: 'BIM', name: 'Invoice Management', inSela: false, source: 'V1.3', description: 'Generation and distribution of amount due, due date and bill detail to customer over channel of choice.' },
      { code: 'BLL', name: 'Billing Management', inSela: false, source: 'V1.3', description: 'Rating or calculating the amount to charge customers for products and services provided, across all required billing scenarios.' },
      { code: 'BRR', name: 'Revenue Recognition', inSela: false, source: 'V1.3', description: 'Manage and apply revenue recognition rules to create revenue transactions to be entered into a general ledger.' }
    ]
  },
  {
    id: 'collaboration',
    name: 'Collaboration',
    description: 'Slack-powered team collaboration — from AI agents embedded in channels to secure cross-company workspaces with partners and customers.',
    capabilities: [
      { code: 'CAF', name: 'Agentforce in Slack', inSela: false, source: 'Expert Addition', description: 'Deployment of AI agents natively within Slack channels and DMs — enabling employees to invoke agents, receive AI summaries, and execute CRM actions entirely within their collaboration flow.' },
      { code: 'CSC', name: 'Slack Connect / External Collaboration', inSela: false, source: 'Expert Addition', description: 'Secure cross-company channel collaboration with customers, partners, and vendors — enables digital account rooms, shared deal workspaces, and partner onboarding experiences beyond the firewall.' },
      { code: 'CTC', name: 'Asynchronous Team Collaboration', inSela: false, source: 'Expert Addition', description: 'Persistent channel-based messaging, huddles, and workflow execution connecting people, tools, and partners securely.' }
    ]
  },
  {
    id: 'cpq',
    name: 'CPQ',
    description: 'Configure, Price, Quote — guided configuration, flexible pricing, proposal management, and subscription lifecycle management for complex B2B product portfolios.',
    capabilities: [
      { code: 'CCM', name: 'Product Catalog Management', inSela: false, source: 'V1.3', description: 'Maintain a product and service catalog, supporting solution bundles and multiple catalog versions with ability to manage products and associated data.' },
      { code: 'CPL', name: 'Proposal Management', inSela: false, source: 'V1.3', description: 'Manage the proposal creation and delivery process using standard Templates & Terms with electronic signature capabilities.' },
      { code: 'CPM', name: 'Pricing Management', inSela: false, source: 'V1.3', description: 'Flexibly manage pricing of product & service offerings via pricing rules supporting all pricing strategies.' },
      { code: 'CQM', name: 'Quote Management', inSela: false, source: 'V1.3', description: 'Manage creation and delivery of product & service quotes; supports product bundles, multiple quote versions, and customer review.' },
      { code: 'CSC', name: 'Guided Solution Configuration', inSela: false, source: 'V1.3', description: 'Rules and policies to guide sales reps, partners, and customers through selecting the correct product & service for their requirements.' },
      { code: 'CSM', name: 'Subscription Management', inSela: false, source: 'V1.3', description: 'Manage one-time, usage, and recurring services of varying term lengths with all transaction types in the lifecycle of a contract.' }
    ]
  },
  {
    id: 'data-ai',
    name: 'Data & AI',
    description: 'The Salesforce AI platform core — Agentforce autonomous agents, Data Cloud unified profiles, Einstein Trust Layer governance, generative AI orchestration, and predictive scoring. All 9 capabilities are licensed in the Siemens SELA.',
    capabilities: [
      { code: 'DAG', name: 'Agentic AI / Autonomous Agents', inSela: true, source: 'Expert Addition', description: 'Deployment and governance of autonomous AI agents that can reason, plan multi-step actions, invoke external tools and APIs, and hand off to humans — the Agentforce core motion. Distinct from copilot/assist patterns.' },
      { code: 'DDH', name: 'Data Harmonization', inSela: true, source: 'Expert Addition', description: 'Processing and mapping of structured and unstructured data from external systems into a standardized data model (e.g., Data Cloud) for analytics and activation.' },
      { code: 'DEL', name: 'Einstein Trust Layer', inSela: true, source: 'Expert Addition', description: 'Governance layer for all AI interactions: zero data retention, PII masking, prompt/response audit logging, toxicity detection, and data grounding — the enterprise trust wrapper required for regulated and global deployments.' },
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
      { code: 'FDR', name: 'RMA / Depot Repair', inSela: false, source: 'V1.3', description: 'Management of diagnosis, remediation workflow, repair depot assignment, shipping, swap-out / loaner replacement, repair, and post-repair financial and inventory reconciliation.' },
      { code: 'FIR', name: 'Field Inventory & Replenishment Management', inSela: false, source: 'V1.3', description: 'Manage inventory levels across locations, track availability of parts, request for parts, and record parts used to complete work orders.' },
      { code: 'FMO', name: 'Field Worker Mobility', inSela: false, source: 'V1.3', description: 'Ability for field employee to complete key work functions while remote in the field.' },
      { code: 'FPM', name: 'Install Base & Preventative Maintenance', inSela: true, source: 'V1.3', description: 'Manage installed assets for each customer location. Establish proactive scheduled plan to service install base.' },
      { code: 'FRM', name: 'Resource Management', inSela: true, source: 'V1.3', description: 'Development and management of field work individuals, including skills, capacity and availability of resources.' },
      { code: 'FSM', name: 'Operational Schedule Management', inSela: true, source: 'V1.3', description: 'Allocation of resources to work in the most efficient way possible by accounting for field employee skill level, travel time, location, and other factors.' },
      { code: 'FWO', name: 'Work Order Management', inSela: true, source: 'V1.3', description: 'Work orders define discrete pieces of work needed to complete a job. Defined by status and service related entitlements.' }
    ]
  },
  {
    id: 'industry-solutions',
    name: 'Industry Solutions',
    description: 'Industry-specific platform capabilities including rules engines, digital self-service portals, and manufacturing asset lifecycle management — particularly relevant for DISW\'s complex software subscription and install base management needs.',
    capabilities: [
      { code: 'ICR', name: 'Industry Rules Engine', inSela: false, source: 'Expert Addition', description: 'Management of complex, industry-specific business rules, digital processes, and document generation (e.g., OmniStudio) natively mapped to Salesforce objects.' },
      { code: 'IDI', name: 'Digital Engagement & Self-Service (Industry)', inSela: false, source: 'Expert Addition', description: 'Industry-specific customer portal and self-service for technical support, licensing entitlement, and renewal management — especially relevant to DISW\'s support and renewal motion for software subscription customers.' },
      { code: 'IMP', name: 'Manufacturing & Asset Lifecycle Management', inSela: true, source: 'Expert Addition', description: 'Management of product lifecycle, installed base, and asset genealogy tied to customer accounts — core to B2B industrial software companies managing complex customer install bases like DISW\'s Xcelerator portfolio.' }
    ]
  },
  {
    id: 'integration',
    name: 'Integration',
    description: 'Enterprise integration, API management, and pre-built connectors — enabling composable architecture and bidirectional data sync across SAP, ServiceNow, Microsoft, and the broader enterprise ecosystem. Note: MuleSoft requires a separate license (not in SELA).',
    capabilities: [
      { code: 'IAF', name: 'Agent-to-Agent (A2A) Orchestration', inSela: false, source: 'Expert Addition', description: 'Coordination of multiple specialized AI agents via a supervisor/orchestrator pattern — enabling cross-domain agentic workflows (e.g., Sales Agent + ERP Agent + Service Agent). MuleSoft Agentfabric is the underlying platform layer.' },
      { code: 'IAM', name: 'API Management', inSela: false, source: 'Expert Addition', description: 'Lifecycle management, securing, and governance of application programming interfaces across the enterprise ecosystem.' },
      { code: 'IEI', name: 'Enterprise Integration', inSela: false, source: 'Expert Addition', description: 'Orchestration of data and processes across disparate enterprise systems, enabling composable architecture and flow automation.' },
      { code: 'IEP', name: 'Enterprise Platform Connectors', inSela: false, source: 'Expert Addition', description: 'Pre-built connectors to key enterprise systems (SAP, Oracle, ServiceNow, Workday) for bidirectional data sync and action execution — MuleSoft\'s Anypoint Exchange connector library as a managed capability.' },
      { code: 'IMS', name: 'Microsoft Ecosystem Integration', inSela: false, source: 'Expert Addition', description: 'Native bidirectional integration with Microsoft 365 (Teams, Outlook, SharePoint, Copilot) — critical for enterprises with MS-centric internal tooling and for embedding Salesforce actions in Teams workflows.' }
    ]
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Audience segmentation, journey orchestration, content management, lead generation, and marketing analytics — supporting both inbound and outbound demand generation programs. Note: Marketing Cloud Engagement and Account Engagement (Pardot) are NOT confirmed in the SELA.',
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
    description: 'Order capture, commerce self-service, fulfillment, inventory management, and shipping & payment — covering the full order lifecycle from purchase to delivery.',
    capabilities: [
      { code: 'OAS', name: 'Assisted Sales & Service', inSela: false, source: 'V1.3', description: 'Provide customer sales or service agent with same experience and actions as the customer, plus additional capabilities.' },
      { code: 'OCP', name: 'Order Capture', inSela: false, source: 'V1.3', description: 'Collect all details related to customer order including product, quantity, pricing and applying business rules.' },
      { code: 'OCS', name: 'Commerce Self Service', inSela: false, source: 'V1.3', description: 'Ecommerce channel supporting order capture / checkout that optimizes the purchase path and experience.' },
      { code: 'OIM', name: 'Inventory Management', inSela: false, source: 'V1.3', description: 'Manage and track product supply levels and status across channels and locations.' },
      { code: 'OPM', name: 'Promotion Management', inSela: false, source: 'V1.3', description: 'Management of purchase incentives in concert with campaigns targeting specific customer segments.' },
      { code: 'ORE', name: 'Recommendations & Experience', inSela: false, source: 'V1.3', description: 'Management of a customer\'s personalized experience including branding, theming, and product/content recommendations in context to user, experience and device.' },
      { code: 'ORM', name: 'Order Management', inSela: false, source: 'V1.3', description: 'Management of filling orders from distribution center, sourcing inventory, shipping orders to customer with notification and visibility of order status.' },
      { code: 'OSM', name: 'Search / Merchandising', inSela: false, source: 'V1.3', description: 'Tools to control and optimize how customers search and engage with products and content.' },
      { code: 'OSP', name: 'Shipping & Payment Methods', inSela: false, source: 'V1.3', description: 'Define and manage order processing requirements including shipping methods, shipping costs, payment types, and taxes.' }
    ]
  },
  {
    id: 'partner',
    name: 'Partner',
    description: 'Partner lifecycle management — from recruitment and onboarding through joint marketing, co-selling, order fulfillment, and post-sale service management.',
    capabilities: [
      { code: 'PDG', name: 'Partner Development & Growth', inSela: false, source: 'V1.3', description: 'Manage partner learning, training, certifications and programs across domains.' },
      { code: 'PJM', name: 'Joint Partner Marketing', inSela: false, source: 'V1.3', description: 'Partnership to market products — planning funds, co-branded materials, joint campaigns, events, and lead collaboration.' },
      { code: 'POM', name: 'Partner Order Management', inSela: false, source: 'V1.3', description: 'Partnership to fulfill orders. If a distributor is involved, managing point of sales data.' },
      { code: 'PRO', name: 'Partner Recruitment & Onboarding', inSela: false, source: 'V1.3', description: 'Enablement of fast and effective partner onboarding, partnership contracts, and managing partner contacts and attributes.' },
      { code: 'PSM', name: 'Partner Sales Management', inSela: false, source: 'V1.3', description: 'Partnership to sell products — sharing sales lifecycle with partners, planning with partner account managers, collaborating on opportunities.' },
      { code: 'PVM', name: 'Partner Service Management', inSela: false, source: 'V1.3', description: 'Partnership for post-sale activities including rebates, satisfaction surveys, feedback, case resolution, and performance management.' }
    ]
  },
  {
    id: 'platform-governance',
    name: 'Platform & Governance',
    description: 'Enterprise-scale platform governance — data access controls, multi-org architecture for the Siemens SELA structure, and sustainability reporting. Note: Salesforce Shield and security add-ons are excluded from the SELA.',
    capabilities: [
      { code: 'PGV', name: 'Data Governance & Privacy', inSela: false, source: 'Expert Addition', description: 'Management of data access controls, consent, GDPR/CCPA/global compliance, field-level security, and data residency policies — foundational for global enterprise deployments like Siemens.' },
      { code: 'PMD', name: 'Multi-Org / Subsidiary Architecture', inSela: false, source: 'Expert Addition', description: 'Patterns and tooling for managing multiple Salesforce orgs (Home Org, Companion Orgs, subsidiaries) — directly relevant to DISW\'s structure under the Siemens SELA and Enterprise License Agreement.' },
      { code: 'PNZ', name: 'Net Zero / Sustainability Management', inSela: false, source: 'Expert Addition', description: 'Carbon accounting, emissions tracking, supplier sustainability data management, and ESG reporting — increasingly required for Siemens\' global sustainability obligations and reporting frameworks.' }
    ]
  },
  {
    id: 'sales',
    name: 'Sales',
    description: 'The full B2B sales lifecycle — account and contact management, opportunity pipeline, forecasting, territory and quota management, guided selling, compensation, and deal support.',
    capabilities: [
      { code: 'SAM', name: 'Account Management', inSela: true, source: 'V1.3', description: 'Tools & strategies to build relationships with customers, consumers or partners. Manage details & related information regarding accounts once identified.' },
      { code: 'SCL', name: 'Contract Lifecycle Management', inSela: false, source: 'V1.3', description: 'Create, manage, track & automate sales agreements defining terms of business. Track through approval, renewal, and document management.' },
      { code: 'SCM', name: 'Contact Management', inSela: false, source: 'V1.3', description: 'Acquire, store, manage, search, communicate and track engagement with individuals associated with accounts.' },
      { code: 'SCP', name: 'Compensation Management', inSela: false, source: 'V1.3', description: 'Management and maximization of sales team performance through incentive compensation.' },
      { code: 'SCU', name: 'Cross / Up-Sell Management (Sales)', inSela: false, source: 'V1.3', description: 'Manage product up sell and cross sell during sales process. Identify new revenue generating opportunities.' },
      { code: 'SDS', name: 'Deal Support Requests', inSela: false, source: 'V1.3', description: 'Mechanisms to manage flow of incoming enablement requests to facilitate, route, assign and escalate needs that support a sales opportunity.' },
      { code: 'SEM', name: 'Sales Enablement', inSela: false, source: 'V1.3', description: 'Manages information, content, plays and recommendations around competitors and supports SME collaboration for enablement.' },
      { code: 'SGS', name: 'Guided Solution Selling', inSela: false, source: 'V1.3', description: 'Prescriptive approach to selling to determine best-fit products, suggest engagement actions, and identify alignment to organizational best practices.' },
      { code: 'SIS', name: 'Inside Sales Management', inSela: false, source: 'V1.3', description: 'Management of sales providing internal reps with rapid access to customer identifying information for inbound/outbound engagement.' },
      { code: 'SLM', name: 'Lead Management', inSela: true, source: 'V1.3', description: 'Set of methodologies, systems, and practices designed to generate, score, prioritize, and qualify new potential business.' },
      { code: 'SOP', name: 'Opportunity Management', inSela: true, source: 'V1.3', description: 'Manage the potential sale of products and/or services to a customer or partner to generate revenue against a forecasted quota.' },
      { code: 'SPR', name: 'Product Management (Basic)', inSela: false, source: 'V1.3', description: 'Management of the setup and application of products used in the sales process when creating opportunities or executing CPQ operations.' },
      { code: 'SSA', name: 'Sales Analytics', inSela: true, source: 'V1.3', description: 'Management of insights and data analytics associated with the sales process.' },
      { code: 'SSP', name: 'Sales Performance Management', inSela: true, source: 'V1.3', description: 'Manage and monitor enterprise sales projections aligning to monthly or quarterly quotas. Collaborative forecasts for sales teams.' },
      { code: 'STM', name: 'Territory Management', inSela: false, source: 'V1.3', description: 'Management of Sales Territories including criteria-based sharing, membership, and sales structure.' }
    ]
  },
  {
    id: 'service',
    name: 'Service',
    description: 'Customer service and support — case management, omni-channel contact center, knowledge management, self-service, predictive AI, and field-to-service integration. Core service capabilities are included in the Siemens SELA.',
    capabilities: [
      { code: 'VAI', name: 'Predictive Service', inSela: true, source: 'V1.3', description: 'Automation of support processes for customers, agents and supervisors using artificial intelligence.' },
      { code: 'VAX', name: 'Unified Agent Experience', inSela: false, source: 'V1.3', description: 'Workspace for interaction with multiple contextual channels and records on a single screen to minimize clicking and allow quick action.' },
      { code: 'VCH', name: 'Omni-Channel Contact Center', inSela: true, source: 'V1.3', description: 'Ability to manage interactions between service requester and provider from a variety of customer service channels.' },
      { code: 'VCM', name: 'Case Management', inSela: true, source: 'V1.3', description: 'Management of the lifecycle of a service request through to resolution, including ownership, traceability, and related interactions.' },
      { code: 'VEN', name: 'Service Contract Management & Entitlement', inSela: false, source: 'V1.3', description: 'Management of a customer\'s entitlement to service, including service type, time period or units, and SLA.' },
      { code: 'VKB', name: 'Knowledge Management', inSela: true, source: 'V1.3', description: 'Ability to manage knowledge articles and FAQs providing detailed instructions to assist with issue resolution.' },
      { code: 'VLN', name: 'Training & Onboarding', inSela: false, source: 'V1.3', description: 'Learning program to train and assess competence of agents plus guided service capabilities resulting in decreased ramp time and enhanced onboarding.' },
      { code: 'VPR', name: 'Remote Monitoring & Proactive Service', inSela: false, source: 'V1.3', description: 'Monitoring of install base and proactive management of service for known issues, tracking all interactions.' },
      { code: 'VQL', name: 'Service Quality & Supervision Analytics', inSela: false, source: 'V1.3', description: 'Supervisor visibility, actionability and analysis of support contact center quality policy, benchmarks, assessment and analysis.' },
      { code: 'VSS', name: 'Self Service', inSela: true, source: 'V1.3', description: 'Publishing of formal knowledge, moderating and nurturing crowd sourced knowledge from the community to empower customers, resolve issues, and deflect cost of service.' },
      { code: 'VSV', name: 'Feedback / Surveys / VOC', inSela: false, source: 'V1.3', description: 'Request, collection and management of customer satisfaction, net promoter and other survey results after key interactions.' },
      { code: 'VTM', name: 'Case Teaming', inSela: false, source: 'V1.3', description: 'Unstructured collaboration between customers, partners, agents, experts and business entities on case and knowledge.' },
      { code: 'VWA', name: 'Warranty Management', inSela: false, source: 'V1.3', description: 'Management of warranty entitlements, customer warranty registration, customer policies, warranty claims and adjudication.' }
    ]
  }
];
