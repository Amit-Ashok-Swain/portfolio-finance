import { useState } from "react";
import { useSelector } from "react-redux";
import { audio } from "../utils/audio";
import {
  Calendar,
  CheckCircle2,
  Target,
  ArrowRight,
  ShieldCheck,
  FileSpreadsheet,
  TrendingUp,
  Award,
} from "lucide-react";

export default function Roadmap90Days() {
  const plan = useSelector((state) => state.portfolio.transitionPlan90Days);
  const [activePhase, setActivePhase] = useState(0);

  return (
    <section
      id="roadmap-section"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#060b14] border-t border-slate-800 relative z-10"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs">
            <Calendar className="w-3.5 h-3.5" />
            <span>EXECUTIVE ONBOARDING & EXECUTION BLUEPRINT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Accounts GM First 90-Day Transition Roadmap
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            A structured management roadmap designed to establish immediate financial control, eliminate reconciliation backlogs, and institutionalize automated executive reporting.
          </p>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plan.map((phase, idx) => (
            <button
              key={idx}
              onClick={() => {
                audio.playClick();
                setActivePhase(idx);
              }}
              className={`p-5 rounded-2xl text-left border transition-all relative overflow-hidden ${
                activePhase === idx
                  ? "bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-900 border-emerald-500/60 shadow-xl shadow-emerald-950/40"
                  : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {phase.phase}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                  {phase.badge}
                </span>
              </div>
              <h3 className="font-bold text-white text-base mb-1">{phase.theme}</h3>
              <p className="text-slate-400 text-xs line-clamp-2">
                {phase.deliverable}
              </p>
            </button>
          ))}
        </div>

        {/* Active Phase Deep Dive Card */}
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-emerald-500/40 shadow-2xl backdrop-blur-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono text-emerald-400">
                {plan[activePhase].phase} // EXECUTION ACTION PLAN
              </span>
              <h3 className="text-2xl font-bold text-white mt-0.5">
                {plan[activePhase].theme}
              </h3>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-mono">
              STATUS: DAY 1 READY
            </div>
          </div>

          {/* Action Item Checklists */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Key Strategic Deliverables & Workstreams:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {plan[activePhase].objectives.map((obj, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3 text-xs text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tangible Phase Output */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-teal-950/60 border border-emerald-500/30 flex items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="text-slate-400 font-mono">Primary Milestone Deliverable:</span>
                <p className="font-bold text-emerald-300 text-sm">
                  {plan[activePhase].deliverable}
                </p>
              </div>
            </div>
            <span className="hidden sm:inline-block font-mono text-emerald-400 font-semibold">
              100% Governance
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
