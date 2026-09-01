import { useState } from "react";
import { useSelector } from "react-redux";
import { audio } from "../utils/audio";
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Award,
  Sparkles,
  Building2,
  TrendingUp,
  ShieldCheck,
  Briefcase,
  CheckCircle2,
} from "lucide-react";

export default function InterviewMastery() {
  const pillars = useSelector((state) => state.portfolio.testingPillars);
  const [openPillar, setOpenPillar] = useState(0);
  const [activeTab, setActiveTab] = useState("pillars");

  const scenarios = [
    {
      question: "Tell me about yourself (General Manager Level)",
      summary: "Framed as a strategic finance and business operations leader rather than a transactional accountant.",
      answer: `"Thank you for the opportunity. I am a finance and business-oriented professional with 6+ years of experience across accounting, financial management, reporting, process improvement, and cross-functional coordination. My approach to finance goes beyond recording transactions—I focus on ensuring accurate books, strong internal controls, timely reporting, cash-flow visibility, and using financial data to support business decisions.

What particularly interests me in this leadership capacity is the scale and complexity of managing multi-location or multi-entity business operations, including sales, service, inventory, finance payouts, and commercial reconciliations.

I believe my combination of accounting knowledge, analytical thinking, advanced Excel/data capabilities, and management orientation can help strengthen financial controls, MIS, reconciliation, compliance, and strategic decision-making across the organization.

I am looking to take broader ownership of the finance function rather than limiting myself to transactional accounting, and that is why this Accounts General Manager role is particularly relevant to me."`,
    },
    {
      question: "Why should an enterprise hire you as Accounts General Manager?",
      summary: "Balancing core accounting discipline, P&L ownership, and technology/automation edge.",
      answer: `"I bring a rare combination of rigorous full-cycle accounting discipline, proven team leadership, and advanced quantitative capabilities. 

Having managed full-cycle finance operations at Teleperformance—where I improved operational efficiency by 57% and reduced errors by 87%—and directed 40+ concurrent projects at Persist Ventures, I understand both the high-level P&L stewardship and the operational details of working capital, 3-way reconciliation, statutory tax compliance, and automated MIS.

Coupled with my graduate studies in Financial Engineering and Computer Engineering, I don't just maintain ledgers—I build scalable financial systems that give leadership real-time clarity."`,
    },
    {
      question: "Suppose an operating unit has ₹5 Crore revenue but cash flow is under pressure. What would you investigate?",
      summary: "Separating profitability from liquidity and diagnosing the 5 working capital levers.",
      answer: `"I would first separate profitability from liquidity because a profitable business can still have poor cash flow.

Then I would investigate 5 critical areas:
1. Receivables: Customer outstanding, financier payout disbursement lags, and commercial claims ageing.
2. Inventory: Unsold stock holding period (>25 days), slow-moving consumables, and credit facility interest drag.
3. Payables: Supplier credit terms and alignment with cash realization cycles.
4. Cash Conversion Cycle: Inward Procurement → Sale → Collection vs Payment Schedules.
5. Operating Expenses: Overhead variations, unauthorized discounts, and resource billability.

I would prepare a working-capital dashboard and identify exactly where cash is getting blocked before recommending corrective action."`,
    },
    {
      question: "How do you control GST reconciliation between GSTR-1, GSTR-3B, and GSTR-2B?",
      summary: "Rigorous 3-way reconciliation and proactive vendor follow-up before return filing.",
      answer: `"I reconcile the Purchase Register with GSTR-2B every month to identify unmatched invoices, duplicate entries, credit-note differences, and blocked/ineligible ITC under Section 17(5). I establish an ageing-based follow-up process with defaulting vendors before the return-filing deadline so that zero input credit is lost and no tax liability is overpaid."`,
    },
    {
      question: "How would you prevent financial irregularities and fraud across operations?",
      summary: "Balancing preventive controls with detective audit controls without creating bureaucracy.",
      answer: `"I focus on preventive as well as detective controls:
• Preventive: Segregation of duties (billing staff cannot collect cash; cashiers cannot issue dispatch gate-passes), tiered discount approval matrices, and credit limits.
• Detective: Daily physical cash counts, surprise physical stock audits, daily BRS, vendor claim matching, and automated exception reporting.

The objective isn't to create bureaucracy. It is to ensure that every significant transaction has clear ownership, authorization, and an audit trail."`,
    },
    {
      question: "How would you consolidate sales and financial data from multiple branches using Excel & Power Query?",
      summary: "Automating ETL pipelines and building management KPIs in under 60 seconds.",
      answer: `"I standardize source data schemas first, validate master data, consolidate it using Power Query automated ETL pipelines, create Pivot-based summaries, and build management KPIs around revenue, gross margin, receivables ageing, expenses, and unit profitability with real-time variance alerting."`,
    },
  ];

  const seniorQuestions = [
    {
      q: "1. What are the three biggest financial challenges you would want the person in this role to solve during the first six months?",
      why: "Demonstrates immediate focus on high-impact executive problem solving and ROI.",
    },
    {
      q: "2. How is the accounts function currently structured across the different operating units and entities?",
      why: "Demonstrates management thinking around centralization vs regional autonomy.",
    },
    {
      q: "3. What are the key financial KPIs that the Managing Director or leadership team currently reviews every month?",
      why: "Positions you as a strategic business partner to executive leadership.",
    },
    {
      q: "4. Is the expectation for this role primarily to maintain existing financial processes, or is leadership looking for someone to redesign and standardize processes across locations?",
      why: "Highlights your capability and willingness to lead transformational process governance.",
    },
  ];

  return (
    <section
      id="interview-section"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#060b14] border-t border-slate-800 relative z-10"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs">
            <Award className="w-3.5 h-3.5" />
            <span>EXECUTIVE INTERVIEW PREPARATION & COMPETENCY MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Accounts General Manager Competency Framework
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Preparation across the 8 core evaluation pillars, practical business scenario solvers, financial models, and strategic questions for executive leadership.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => {
                audio.playClick();
                setActiveTab("pillars");
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "pillars"
                  ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              8 Leadership Pillars
            </button>
            <button
              onClick={() => {
                audio.playClick();
                setActiveTab("scenarios");
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "scenarios"
                  ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Scenario Q&A Bank
            </button>
            <button
              onClick={() => {
                audio.playClick();
                setActiveTab("questions-to-ask");
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "questions-to-ask"
                  ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Questions for Leadership
            </button>
          </div>
        </div>

        {/* Tab Content 1: 8 Testing Pillars Accordion */}
        {activeTab === "pillars" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pillars.map((pillar, idx) => (
              <div
                key={pillar.id}
                className={`p-6 rounded-3xl border transition-all ${
                  openPillar === idx
                    ? "bg-slate-900 border-emerald-500/50 shadow-xl"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div
                  onClick={() => {
                    audio.playClick();
                    setOpenPillar(openPillar === idx ? -1 : idx);
                  }}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <h3 className="font-bold text-white text-sm sm:text-base pr-2">
                    {pillar.title}
                  </h3>
                  {openPillar === idx ? (
                    <ChevronUp className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </div>

                <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                  {pillar.summary}
                </p>

                {openPillar === idx && (
                  <div className="mt-4 pt-4 border-t border-slate-800 space-y-3 animate-fadeIn">
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {pillar.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-300">
                      <strong>Amit's Track Record:</strong> {pillar.practicalApplication}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tab Content 2: GM Scenario Q&A */}
        {activeTab === "scenarios" && (
          <div className="space-y-6">
            {scenarios.map((item, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                      Scenario #{idx + 1}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                      {item.question}
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700 shrink-0">
                    GM LEVEL
                  </span>
                </div>

                <p className="text-xs text-slate-400 italic">
                  Rationale: {item.summary}
                </p>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line font-normal">
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content 3: Senior Questions to Ask MD */}
        {activeTab === "questions-to-ask" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {seniorQuestions.map((q, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-900/90 border border-amber-500/30 space-y-3 shadow-xl"
              >
                <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold">
                  <Briefcase className="w-4 h-4" />
                  <span>STRATEGIC QUESTION</span>
                </div>
                <h3 className="text-base font-bold text-white leading-snug">
                  {q.q}
                </h3>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                  <span className="text-amber-400 font-semibold">Strategic Intent:</span> {q.why}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
