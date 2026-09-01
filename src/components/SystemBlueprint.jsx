import { useRef, useState } from "react";
import { audio } from "../utils/audio";

export default function SystemBlueprint() {
  const container = useRef(null);
  const [activeKey, setActiveKey] = useState("finance");

  const nodes = [
    {
      key: "finance",
      id: "01 // FINANCE CORE",
      title: "Strategic Finance & P&L Stewardship",
      badge: "P&L & Reconciliations",
      desc: "Full-cycle accounting operations, AP/AR governance, daily BRS balancing, 13-week rolling cash flow forecasting, and 5-day standardized month-end closes.",
      specs: ["P&L & BS: 100% Balanced", "Close Velocity: 5-Day SOP", "GST Recon: 3-Way Auto Match", "Working Capital: CCC 24 Days"],
    },
    {
      key: "tech",
      id: "02 // TECH CORE",
      title: "Software & Cloud Systems Architecture",
      badge: "Microservices & Cloud",
      desc: "Layered Spring Boot and Python FastAPI microservices, Docker containerization, AWS EC2 deployments, WebSocket multiplexing, and robust REST APIs.",
      specs: ["Backend: Java / Spring Boot / Python", "Cloud: AWS EC2 / Docker", "Protocols: WebSockets & REST", "Algorithms: 600+ Solved"],
    },
    {
      key: "data",
      id: "03 // DATA CORE",
      title: "Financial Engineering & Power Query ETL",
      badge: "Quantitative Analytics",
      desc: "WorldQuant MSc Financial Engineering econometric models, automated Power Query multi-source ETL pipelines, and discrepancy anomaly detection.",
      specs: ["Degree: MSc Financial Engg (Candidate)", "ETL: Power Query Automated", "Formulas: Nested SUMIFS/XLOOKUP", "Output: Executive MIS <60s"],
    },
    {
      key: "product",
      id: "04 // PRODUCT CORE",
      title: "0→1 Product & Operations Leadership",
      badge: "Agile & Lean Governance",
      desc: "Directing 40+ concurrent projects across Persist Ventures and GSK, PRD formulation, sprint planning, and LeanPM® process re-engineering (+57% speed, -87% errors).",
      specs: ["Projects: 40+ Concurrent Led", "Framework: Agile / Scrum / JIRA", "Cert: LeanPM® Yellow Belt", "Velocity: +57% Efficiency"],
    },
  ];

  const currentNode = nodes.find((n) => n.key === activeKey);

  return (
    <section
      id="system-section"
      ref={container}
      className="min-h-screen bg-slate-50 dark:bg-slate-950 py-24 px-6 sm:px-16 flex flex-col justify-center border-t border-slate-200 dark:border-slate-800 relative z-10 transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center md:text-left mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-600 dark:text-slate-400 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            SYSTEM ARCHITECTURE // INTERSECTION BLUEPRINT
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white uppercase tracking-tight">
            The Multi-Disciplinary Architecture
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mt-2">
            Click nodes to inspect the convergence of Strategic Finance, Software Engineering, Financial Engineering, and Product Leadership.
          </p>
        </div>

        {/* Blueprint Interactive Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl transition-colors duration-500">
          {/* Node Selector List */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {nodes.map((node) => (
              <button
                key={node.key}
                onClick={() => {
                  audio.playClick();
                  setActiveKey(node.key);
                }}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex items-center justify-between ${
                  activeKey === node.key
                    ? "bg-slate-100 dark:bg-slate-800 border-orange-500 dark:border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.15)] translate-x-2"
                    : "bg-slate-50/50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700"
                }`}
              >
                <div>
                  <div className="font-mono text-[10px] text-slate-400 dark:text-slate-500">
                    {node.id}
                  </div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">
                    {node.title}
                  </div>
                </div>
                <span
                  className={`font-mono text-[10px] uppercase px-2 py-0.5 rounded ${
                    activeKey === node.key
                      ? "bg-orange-500 text-white"
                      : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {node.badge}
                </span>
              </button>
            ))}
          </div>

          {/* Node Spec Panel */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between min-h-[300px] transition-colors duration-500">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-4">
                <span className="font-mono text-xs text-orange-500 font-bold">
                  SPECIFICATION // {currentNode.id}
                </span>
                <span className="font-mono text-xs text-emerald-500 font-bold">
                  ● PRODUCTION ACTIVE
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {currentNode.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {currentNode.desc}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-6 border-t border-slate-200 dark:border-slate-800 mt-6">
              {currentNode.specs.map((spec, i) => (
                <div
                  key={i}
                  className="font-mono text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2.5 rounded-lg text-slate-700 dark:text-slate-300"
                >
                  {spec}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
