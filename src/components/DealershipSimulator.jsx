import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { audio } from "../utils/audio";
import {
  Sliders,
  DollarSign,
  TrendingUp,
  RotateCcw,
  CheckCircle2,
  Boxes,
  Receipt,
  FileSpreadsheet,
  ShieldCheck,
  Zap,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function DealershipSimulator() {
  const model = useSelector((state) => state.portfolio.workingCapitalModel);

  // Dynamic Simulator State
  const [inventoryDays, setInventoryDays] = useState(48); // Baseline: 48 days
  const [receivablesLag, setReceivablesLag] = useState(18); // Baseline: 18 days
  const [claimsLag, setClaimsLag] = useState(45); // Baseline: 45 days
  const [consumablesTurnDays, setConsumablesTurnDays] = useState(75); // Baseline: 75 days
  const [resourceProductivity, setResourceProductivity] = useState(72); // Baseline: 72%
  const [creditFacilityRate, setCreditFacilityRate] = useState(11.5); // 11.5% p.a.

  // Calculated Metrics
  const calculated = useMemo(() => {
    const monthlyRevenue = 50000000; // ₹5.00 Cr scale
    const monthlyPrimary = 38500000;
    const monthlyService = 4500000;
    const monthlyConsumables = 4200000;

    const dailyPrimary = monthlyPrimary / 30;
    const dailyConsumables = monthlyConsumables / 30;

    const inventoryLocked = dailyPrimary * inventoryDays;
    const receivablesLocked = (dailyPrimary * 0.75) * (receivablesLag / 30) * 30;
    const claimsLocked = 1200000 * (claimsLag / 30);
    const consumablesLocked = dailyConsumables * consumablesTurnDays;

    const totalWorkingCapitalLocked =
      inventoryLocked + receivablesLocked + claimsLocked + consumablesLocked;

    const annualInterestRate = creditFacilityRate / 100;
    const monthlyInterestCost = (inventoryLocked * annualInterestRate) / 12;

    const baselineLocked = 42500000; // Baseline ~₹4.25 Cr
    const baselineMonthlyInterest = 380000; // Baseline ₹3.8L

    const cashReleased = Math.max(0, baselineLocked - totalWorkingCapitalLocked);
    const interestSavedMonthly = Math.max(0, baselineMonthlyInterest - monthlyInterestCost);

    const dso = Math.round(receivablesLag * 0.7 + claimsLag * 0.3);
    const dio = Math.round((inventoryDays * 0.75) + (consumablesTurnDays * 0.25));
    const dpo = 24;
    const cccDays = Math.max(10, dso + dio - dpo);

    return {
      totalWorkingCapitalLocked,
      cashReleased,
      monthlyInterestCost,
      interestSavedMonthly,
      cccDays,
    };
  }, [
    inventoryDays,
    receivablesLag,
    claimsLag,
    consumablesTurnDays,
    resourceProductivity,
    creditFacilityRate,
  ]);

  const handleApplyStrategy = () => {
    audio.playMilestone();
    setInventoryDays(22);
    setReceivablesLag(4);
    setClaimsLag(12);
    setConsumablesTurnDays(32);
    setResourceProductivity(88);
    setCreditFacilityRate(10.5);

    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#10b981", "#f59e0b", "#06b6d4"],
    });
  };

  const handleReset = () => {
    audio.playClick();
    setInventoryDays(48);
    setReceivablesLag(18);
    setClaimsLag(45);
    setConsumablesTurnDays(75);
    setResourceProductivity(72);
    setCreditFacilityRate(11.5);
  };

  return (
    <section
      id="simulator-section"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#070d19] border-t border-slate-800 relative z-10"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs">
            <Zap className="w-3.5 h-3.5 animate-pulse" />
            <span>INTERACTIVE FINANCIAL SCENARIO SIMULATOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Working Capital & Cash Flow Diagnostic Studio
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Experience how an Accounts General Manager diagnoses liquidity bottlenecks. Adjust operational levers to see how working capital, cash conversion cycle, and financing costs dynamically react.
          </p>
        </div>

        {/* Live Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-base sm:text-lg">
                  Operational & Working Capital Levers
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleApplyStrategy}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20"
                  title="Auto-apply the 5-point GM optimization model"
                >
                  <Zap className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Apply GM Strategy</span>
                </button>
                <button
                  onClick={handleReset}
                  className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700 text-xs"
                  title="Reset to Baseline Scenario"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Slider 1: Inventory Holding Days */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium flex items-center gap-1.5">
                  <Boxes className="w-3.5 h-3.5 text-amber-400" />
                  Inventory Holding Time (Days)
                </span>
                <span className="font-mono font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                  {inventoryDays} Days {inventoryDays <= 25 ? "✓ Optimal" : "⚠ Overholding"}
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="60"
                value={inventoryDays}
                onChange={(e) => {
                  audio.playHover();
                  setInventoryDays(Number(e.target.value));
                }}
                className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Industry benchmark: 20-25 days. Every extra holding day locks capital and incurs interest.
              </p>
            </div>

            {/* Slider 2: Receivables Lag */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  Receivables & Financier Settlement Lag (Days)
                </span>
                <span className="font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  {receivablesLag} Days {receivablesLag <= 5 ? "✓ Rapid DO" : "⚠ Cash Lag"}
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="30"
                value={receivablesLag}
                onChange={(e) => {
                  audio.playHover();
                  setReceivablesLag(Number(e.target.value));
                }}
                className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Liaison with financiers and corporate accounts to release funds within 48-96 hours.
              </p>
            </div>

            {/* Slider 3: Commercial & Scheme Claims Lag */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium flex items-center gap-1.5">
                  <Receipt className="w-3.5 h-3.5 text-cyan-400" />
                  Vendor & Commercial Rebate Claim Recovery
                </span>
                <span className="font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                  {claimsLag} Days {claimsLag <= 15 ? "✓ Prompt" : "⚠ Delayed"}
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="60"
                value={claimsLag}
                onChange={(e) => {
                  audio.playHover();
                  setClaimsLag(Number(e.target.value));
                }}
                className="w-full accent-cyan-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Structured claim submissions uploaded within 48 hours of service card completion.
              </p>
            </div>

            {/* Slider 4: Consumables & Spare Parts Turn */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium flex items-center gap-1.5">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-purple-400" />
                  Consumables & Spares Holding Period
                </span>
                <span className="font-mono font-bold text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
                  {consumablesTurnDays} Days {consumablesTurnDays <= 35 ? "✓ High Turn" : "⚠ Dead Stock Risk"}
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="120"
                value={consumablesTurnDays}
                onChange={(e) => {
                  audio.playHover();
                  setConsumablesTurnDays(Number(e.target.value));
                }}
                className="w-full accent-purple-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                ABC classification to eliminate slow-moving stock over 90 days.
              </p>
            </div>

            {/* Slider 5: Resource Productivity */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Operational Resource Billable Productivity
                </span>
                <span className="font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  {resourceProductivity}% {resourceProductivity >= 85 ? "✓ High Efficiency" : "⚠ Idle Capacity"}
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                value={resourceProductivity}
                onChange={(e) => {
                  audio.playHover();
                  setResourceProductivity(Number(e.target.value));
                }}
                className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Ratio of billed productive hours against total scheduled operating hours.
              </p>
            </div>
          </div>

          {/* Real-time Calculated Impact & KPIs */}
          <div className="lg:col-span-6 space-y-6">
            {/* Top Scorecard: Liquidity Unlocked */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/40 shadow-2xl relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                    Total Liquidity Unlocked
                  </span>
                  <div className="text-3xl sm:text-5xl font-extrabold text-emerald-400 mt-1 font-mono">
                    ₹{(calculated.cashReleased / 100000).toFixed(2)} Lakhs
                  </div>
                  <p className="text-xs text-slate-300 mt-2">
                    {calculated.cashReleased > 5000000
                      ? "🚀 Outstanding! Working capital optimized. Zero avoidable overdraft strain."
                      : "⚡ Move sliders to optimize working capital and unlock trapped enterprise cash."}
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40">
                  <TrendingUp className="w-8 h-8 text-emerald-400" />
                </div>
              </div>

              {/* Quick Metrics Comparison */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-800 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-400 font-mono">Cash Conversion Cycle</span>
                  <p className="text-base font-bold text-amber-400 font-mono mt-0.5">
                    {calculated.cccDays} Days
                  </p>
                  <span className="text-[10px] text-slate-400">Baseline: 58 Days</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-400 font-mono">Monthly Interest Saved</span>
                  <p className="text-base font-bold text-emerald-400 font-mono mt-0.5">
                    ₹{(calculated.interestSavedMonthly / 1000).toFixed(1)}k / mo
                  </p>
                  <span className="text-[10px] text-slate-400">Credit line reduction</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 col-span-2 sm:col-span-1">
                  <span className="text-slate-400 font-mono">Working Capital Required</span>
                  <p className="text-base font-bold text-cyan-400 font-mono mt-0.5">
                    ₹{(calculated.totalWorkingCapitalLocked / 10000000).toFixed(2)} Cr
                  </p>
                  <span className="text-[10px] text-slate-400">Down from ₹4.25 Cr</span>
                </div>
              </div>
            </div>

            {/* 4-Pillar Diagnostic Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {model.diagnosticBreakdown.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200">{item.area}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <p className="text-slate-400 text-[11px]">{item.findings}</p>
                  <div className="pt-2 border-t border-slate-800 flex items-start gap-1 text-[11px] text-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item.action}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
