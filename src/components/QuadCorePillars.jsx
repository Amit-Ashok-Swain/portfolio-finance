import { useState } from "react";
import { useSelector } from "react-redux";
import { audio } from "../utils/audio";
import {
  Landmark,
  Cpu,
  BarChart3,
  Rocket,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Zap,
  Code2,
  Calculator,
  Workflow,
  Sparkles,
} from "lucide-react";

export default function QuadCorePillars() {
  const quad = useSelector((state) => state.portfolio.quadPillars);
  const [activeTab, setActiveTab] = useState("finance");

  const icons = {
    finance: Landmark,
    tech: Cpu,
    data: BarChart3,
    product: Rocket,
  };

  const activePillar = quad.find((p) => p.id === activeTab) || quad[0];
  const IconComp = icons[activePillar.id] || Landmark;

  return (
    <section
      id="quad-section"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#070d19] border-t border-slate-800 relative z-10"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>THE MULTI-DISCIPLINARY QUAD-CORE ADVANTAGE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Finance × Technology × Data × Product
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Where strategic financial stewardship meets distributed software engineering, quantitative financial data modeling, and 0→1 product execution.
          </p>
        </div>

        {/* 4 Hub Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
          {quad.map((pillar) => {
            const PIcon = icons[pillar.id] || Landmark;
            const isSelected = activeTab === pillar.id;

            return (
              <button
                key={pillar.id}
                onClick={() => {
                  audio.playClick();
                  setActiveTab(pillar.id);
                }}
                className={`p-4 sm:p-5 rounded-2xl border transition-all text-left flex items-start gap-3.5 relative overflow-hidden ${
                  isSelected
                    ? "bg-slate-900 border-emerald-500/60 shadow-xl shadow-emerald-950/40"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl ${
                    isSelected
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                      : "bg-slate-800 text-slate-400"
                  }`}
                >
                  <PIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-semibold text-emerald-400 block">
                    {pillar.badge}
                  </span>
                  <h3 className="text-sm font-bold text-white leading-tight mt-0.5">
                    {pillar.title.split(" ")[0]} {pillar.title.split(" ")[1]}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Hub Deep Dive Showcase */}
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-emerald-500/40 shadow-2xl backdrop-blur-xl space-y-8 max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <IconComp className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                  {activePillar.badge} // CORE DOMAIN
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {activePillar.title}
                </h3>
                <p className="text-xs text-slate-400">{activePillar.subtitle}</p>
              </div>
            </div>

            <span className="px-3 py-1.5 rounded-xl bg-slate-950 text-emerald-400 border border-emerald-500/30 text-xs font-mono">
              VERIFIED TRACK RECORD
            </span>
          </div>

          {/* Mastered Capabilities Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Core Technical & Strategic Capabilities:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activePillar.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="font-medium leading-relaxed">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Business & Technical ROI Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-950 to-teal-950/60 border border-emerald-500/30 flex items-start gap-3.5 text-xs">
            <TrendingUp className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-400 font-mono font-bold">Quantified Leadership Impact:</span>
              <p className="text-emerald-300 text-sm font-semibold mt-0.5 leading-relaxed">
                {activePillar.impact}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
