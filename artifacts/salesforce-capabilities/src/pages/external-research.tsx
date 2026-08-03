import React from 'react';
import Layout from '@/components/layout';

export default function ExternalResearch() {
  return (
    <Layout>
      <div className="bg-card border-b border-border py-10 px-8 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,180,180,0.1)] to-transparent pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-2">
            Siemens Digital Industries Software
          </h1>
          <p className="text-xl text-primary font-medium">
            External Research Brief & Market Context
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 md:p-12 space-y-12">
        
        {/* Company Overview */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground border-b border-border pb-2">Company Overview</h2>
          <div className="prose prose-invert max-w-none text-muted-foreground">
            <p className="text-lg leading-relaxed mb-4">
              Siemens Digital Industries Software (DISW) is the software business unit of Siemens AG's Digital Industries division, focused on industrial software for product lifecycle management (PLM), electronic design automation (EDA), manufacturing operations, and industrial simulation. DISW serves customers across aerospace & defense, automotive, industrial machinery, electronics, and life sciences — primarily engineering-intensive enterprises seeking to digitalize their design, manufacturing, and operational workflows.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              The business is undergoing a fundamental transition from a historically perpetual-license model to a SaaS/subscription model under the Xcelerator portfolio brand, which is reshaping both its go-to-market and financial profile.
            </p>
            <div className="bg-card border border-border p-4 rounded-lg flex flex-wrap gap-x-8 gap-y-2 text-sm font-medium">
              <div><span className="text-muted-foreground mr-2">Website:</span> <span className="text-foreground">sw.siemens.com</span></div>
              <div><span className="text-muted-foreground mr-2">Industry:</span> <span className="text-foreground">Industrial Software / PLM / CAD / Simulation / EDA</span></div>
              <div><span className="text-muted-foreground mr-2">HQ:</span> <span className="text-foreground">Plano, Texas, USA</span></div>
              <div><span className="text-muted-foreground mr-2">Founded:</span> <span className="text-foreground">2017 (acquired by Siemens 2007)</span></div>
              <div><span className="text-muted-foreground mr-2">Employees:</span> <span className="text-foreground">~30,000 (DISW)</span></div>
            </div>
          </div>
        </section>

        {/* Core Products */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-foreground border-b border-border pb-2">Core Products & Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Xcelerator Portfolio", desc: "Overarching SaaS platform and marketplace brand; open, cloud-based industrial digital transformation platform." },
              { title: "Teamcenter", desc: "Industry-leading PLM platform for managing product data, processes, and collaboration." },
              { title: "NX", desc: "Flagship CAD/CAM/CAE software for product design and manufacturing engineering." },
              { title: "Simcenter", desc: "Multi-physics simulation and testing platform (structural, fluid, thermal, systems)." },
              { title: "Opcenter", desc: "Manufacturing operations management (MOM) / MES platform." },
              { title: "Capital", desc: "Electrical/electronic systems design for wiring and electrical architectures." },
              { title: "Polarion", desc: "Application lifecycle management (ALM) — requirements, test, and quality management." },
              { title: "Mendix", desc: "Low-code application development platform (jointly marketed in industrial contexts)." },
              { title: "EDA Portfolio", desc: "IC design, PCB design, and electronic systems design tools (Mentor Graphics)." },
              { title: "Altair (Acquisition)", desc: "Simulation, AI-driven engineering, HPC, data science. Acquired March 2025, ~$10B." },
              { title: "Dotmatics (Acquisition)", desc: "Scientific R&D informatics software. Acquired July 2025, $5.1B. Expands TAM by $11B into life sciences." },
              { title: "Digital Twin Composer", desc: "Builds Industrial Metaverse environments at scale; launched CES 2026." },
              { title: "Industrial Copilot", desc: "Award-winning AI assistant embedded across DISW products; part of 35+ AI-powered applications." }
            ].map((prod, i) => (
              <div key={i} className="bg-card border border-border p-5 rounded-lg shadow-sm hover:border-primary/50 transition-colors">
                <h3 className="font-bold text-foreground mb-2">{prod.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{prod.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Executives */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-foreground border-b border-border pb-2">Key Executives & Stakeholders</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {[
              { name: "Tony Hemmelgarn", role: "President & CEO, Siemens DISW", desc: "Championing the Xcelerator platform strategy, cloud transition, and industrial metaverse narrative. Positioning DISW as the AI-powered backbone of industrial digitalization." },
              { name: "Roland Busch", role: "President & CEO, Siemens AG (Parent)", desc: "Sets board-level expectations for AI transformation; directly quoted on both Altair and Dotmatics deals as part of the 'ONE Tech Company' growth program." },
              { name: "Vasi Philomin", role: "EVP & Head of Data & AI", desc: "Strategic hire from Amazon (former VP GenAI / AWS Bedrock); leading development of an industrial foundational AI model and scaling 35+ AI applications." },
              { name: "Andrew Allan", role: "CIO, Siemens DISW", desc: "Key Salesforce stakeholder; IT mandate focused on platform governance, AI transformation, and rationalizing a fragmented application landscape post-M&A." },
              { name: "Saurabh Kumar", role: "Primary SF Program Manager & Technical Lead", desc: "Main point of contact for Salesforce technical escalations, CPQ/OmniStudio licensing, and Agentforce implementation." },
              { name: "Jeffrey Nercesian", role: "Business Operations & Licensing", desc: "Engaged on CPQ, Advanced Approvals, Agentforce, and contract operations; key operator-level stakeholder in revenue tech." }
            ].map((exec, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-4 bg-card border border-border p-5 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary font-bold flex-shrink-0 border border-primary/20">
                  {exec.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{exec.name}</h3>
                  <div className="text-sm font-medium text-primary mb-2">{exec.role}</div>
                  <p className="text-sm text-muted-foreground">{exec.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Financial Performance & Sales Signals */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-foreground border-b border-border pb-2">Recent Financial Performance</h2>
            <ul className="space-y-4">
              <li className="bg-card border border-border p-4 rounded-lg">
                <strong className="text-foreground block mb-1">FY2025 AG Performance</strong>
                <span className="text-sm text-muted-foreground">Siemens AG total revenue €78.9B, net income €10.4B (record high, up 16% YoY), free cash flow €10.8B. Orders €88.4B for a strong book-to-bill of 1.12.</span>
              </li>
              <li className="bg-card border border-border p-4 rounded-lg">
                <strong className="text-foreground block mb-1">Digital Industries Growth</strong>
                <span className="text-sm text-muted-foreground">In H1 FY2026, Siemens' digital business grew 19% (above the 15% ambition). DI software business grew 14% to €1.6B in Q2 FY2026.</span>
              </li>
              <li className="bg-card border border-border p-4 rounded-lg">
                <strong className="text-foreground block mb-1">FY2026 Guidance</strong>
                <span className="text-sm text-muted-foreground">Comparable revenue growth of 5–10%; profit margin guided at 15–19%.</span>
              </li>
              <li className="bg-card border border-border p-4 rounded-lg">
                <strong className="text-foreground block mb-1">M&A Investments & Margin Pressure</strong>
                <span className="text-sm text-muted-foreground">Altair (~$10B) and Dotmatics ($5.1B) fully closed and integrating. Prior margin compression (FY2024) saw operating margins decline from ~18.9% to ~14.9% driven by SaaS transition costs.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 text-foreground border-b border-border pb-2">Digital Transformation & Sales Signals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "AI-Powered Engineering", desc: "Public commitment to 50% customer productivity gains via industrial AI agents embedded in Xcelerator." },
                { title: "Industrial Metaverse", desc: "Digital Twin Composer launched CES 2026 is the flagship play combining digital twins, AI, and physical data." },
                { title: "SaaS Transition Mandate", desc: "Shift from perpetual to subscription ARR is the defining operational challenge of the next 2-3 years." },
                { title: "M&A Integration Complexity", desc: "Altair and Dotmatics bring distinct CRM systems, generating a fragmented landscape that must be unified." },
                { title: "Life Sciences Entry", desc: "Dotmatics ($5.1B) opens an $11B incremental TAM. Digital thread from research to production." },
                { title: "CPQ+ Go-Live", desc: "Recently went live. Creates architectural inflection point for Revenue Cloud / Agentforce." },
                { title: "Support Strain", desc: "18 Support Cases Since Jan 2025 (incl. Sev1). Clear opportunity for Signature Success pitch." },
                { title: "Microsoft Ecosystem", desc: "Teams/SharePoint deeply embedded. Acknowledged competitive dynamic at 10% pushback risk." }
              ].map((signal, i) => (
                <div key={i} className="bg-[rgba(0,180,180,0.05)] border border-primary/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-primary mb-1 text-sm">{signal.title}</h4>
                  <p className="text-xs text-muted-foreground">{signal.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Competitors */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-foreground border-b border-border pb-2">Key Competitors</h2>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-card/80 border-b border-border">
                <tr>
                  <th scope="col" className="px-6 py-4 w-1/3">Competitor</th>
                  <th scope="col" className="px-6 py-4">Key Differentiator vs. Siemens DISW</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                <tr className="hover:bg-card/80">
                  <td className="px-6 py-4 font-bold text-foreground">Dassault Systèmes (3DEXPERIENCE)</td>
                  <td className="px-6 py-4 text-muted-foreground">Highly integrated experience platform; stronger life sciences/consumer goods positioning; cloud-native 3DEXPERIENCE often cited as more unified. Higher margin profile.</td>
                </tr>
                <tr className="hover:bg-card/80">
                  <td className="px-6 py-4 font-bold text-foreground">PTC (Windchill, Creo, Vuforia, ServiceMax)</td>
                  <td className="px-6 py-4 text-muted-foreground">More aggressive SaaS transition; strong IoT/AR/service lifecycle story; ServiceMax gives PTC a differentiated post-sales/field service angle. Windchill competes directly with Teamcenter.</td>
                </tr>
                <tr className="hover:bg-card/80">
                  <td className="px-6 py-4 font-bold text-foreground">Autodesk (Fusion 360, Vault, Inventor)</td>
                  <td className="px-6 py-4 text-muted-foreground">Stronger mid-market and SMB penetration; Fusion 360 cloud-native CAD challenges NX in mid-market accounts.</td>
                </tr>
                <tr className="hover:bg-card/80">
                  <td className="px-6 py-4 font-bold text-foreground">Cadence / Synopsys (EDA)</td>
                  <td className="px-6 py-4 text-muted-foreground">Dominant in semiconductor/IC EDA; stronger AI-driven silicon design at leading-edge nodes.</td>
                </tr>
                <tr className="hover:bg-card/80">
                  <td className="px-6 py-4 font-bold text-foreground">SAP (via S/4HANA)</td>
                  <td className="px-6 py-4 text-muted-foreground">Competing at manufacturing operations layer; SAP's MOM integration challenges Opcenter in accounts deeply embedded in SAP ERP.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </Layout>
  );
}
