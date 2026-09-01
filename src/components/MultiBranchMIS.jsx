import { useState } from "react";
import { useSelector } from "react-redux";
import { audio } from "../utils/audio";
import {
  Building2,
  TrendingUp,
  FileSpreadsheet,
  PieChart,
  RefreshCw,
} from "lucide-react";

export default function MultiBranchMIS() {
  const branches = useSelector((state) => state.portfolio.branchesData);
  const [selectedEntityId, setSelectedEntityId] = useState("all");
  const [isSyncing, setIsSyncing] = useState(false);

  const selectedData = selectedEntityId === "all"
    ? {
        name: "Consolidated Corporate Group (All Operating Units)",
        segment: "Multi-Entity Consolidated Operations",
        monthlyRevenue: 125000000, // ₹12.50 Cr
        primarySales: 96200000,
        serviceLabour: 11500000,
        sparesConsumables: 10400000,
        valueAddedServices: 6900000,
        grossProfit: 15880000,
        operatingExpenses: 10800000,
        ebitda: 5080000,
        ebitdaMargin: "4.1%",
        workingCapitalLocked: 90800000,
        receivablesDwellDays: 20,
        inventoryDays: 32,
        status: "GROUP HARMONIZED",
      }
    : branches.find((b) => b.id === selectedEntityId);

  const handleSyncTelemetry = () => {
    if (isSyncing) return;
    audio.playCommand();
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      audio.playSuccess();
    }, 900);
  };

  return (
    <section
      id="branch-mis-section"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#060b14] border-t border-slate-800 relative z-10"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs">
            <Building2 className="w-3.5 h-3.5" />
            <span>MULTI-ENTITY FINANCIAL MIS & CONSOLIDATION STUDIO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Group P&L, Segment Margins & EBITDA Scorecard
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Multi-unit financial oversight with automated Power Query ETL data consolidation, department gross margin telemetry, and unified trial balance balancing.
          </p>
        </div>

        {/* Entity Selector Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/90 p-2.5 rounded-2xl border border-slate-800 backdrop-blur-xl">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => {
                audio.playClick();
                setSelectedEntityId("all");
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedEntityId === "all"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-md shadow-emerald-500/20 font-bold"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              🏢 Consolidated Group (All)
            </button>

            {branches.map((b) => (
              <button
                key={b.id}
                onClick={() => {
                  audio.playClick();
                  setSelectedEntityId(b.id);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedEntityId === b.id
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20 font-bold"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                {b.name}
              </button>
            ))}
          </div>

          <button
            onClick={handleSyncTelemetry}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isSyncing ? "animate-spin" : ""}`} />
            <span>{isSyncing ? "Consolidating Power Query..." : "Sync Power Query ETL"}</span>
          </button>
        </div>

        {/* Selected Unit Financial Statement Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Top 4 KPI Tiles */}
          <div className="lg:col-span-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-xs font-mono">Monthly Revenue</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                ₹{(selectedData.monthlyRevenue / 10000000).toFixed(2)} Cr
              </p>
              <span className="text-[11px] text-emerald-400 font-medium">100% Normalized</span>
            </div>

            <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-xs font-mono">Gross Operating Profit</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
                ₹{(selectedData.grossProfit / 100000).toFixed(1)} L
              </p>
              <span className="text-[11px] text-slate-400">
                {((selectedData.grossProfit / selectedData.monthlyRevenue) * 100).toFixed(1)}% Gross Margin
              </span>
            </div>

            <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-xs font-mono">Operating EBITDA</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">
                ₹{(selectedData.ebitda / 100000).toFixed(1)} L
              </p>
              <span className="text-[11px] text-amber-400 font-medium">{selectedData.ebitdaMargin} Margin</span>
            </div>

            <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-xs font-mono">Working Capital Required</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">
                ₹{(selectedData.workingCapitalLocked / 10000000).toFixed(2)} Cr
              </p>
              <span className="text-[11px] text-slate-400">
                Stock: {selectedData.inventoryDays}d • Rec: {selectedData.receivablesDwellDays}d
              </span>
            </div>
          </div>

          {/* Revenue Breakdown by Department */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <PieChart className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-base">Department Revenue Streams</h3>
              </div>
              <span className="text-xs font-mono text-slate-400">{selectedData.name}</span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <div className="flex justify-between font-medium">
                  <span className="text-slate-300">1. Core Product & Commercial Sales</span>
                  <span className="font-mono text-white font-bold">
                    ₹{(selectedData.primarySales / 100000).toFixed(1)} L ({((selectedData.primarySales / selectedData.monthlyRevenue) * 100).toFixed(1)}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${(selectedData.primarySales / selectedData.monthlyRevenue) * 100}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between font-medium">
                  <span className="text-slate-300">2. Service & Workshop Operations</span>
                  <span className="font-mono text-cyan-400 font-bold">
                    ₹{(selectedData.serviceLabour / 100000).toFixed(1)} L ({((selectedData.serviceLabour / selectedData.monthlyRevenue) * 100).toFixed(1)}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-cyan-500 rounded-full"
                    style={{ width: `${(selectedData.serviceLabour / selectedData.monthlyRevenue) * 100}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between font-medium">
                  <span className="text-slate-300">3. Spare Parts & Consumables</span>
                  <span className="font-mono text-purple-400 font-bold">
                    ₹{(selectedData.sparesConsumables / 100000).toFixed(1)} L ({((selectedData.sparesConsumables / selectedData.monthlyRevenue) * 100).toFixed(1)}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-purple-500 rounded-full"
                    style={{ width: `${(selectedData.sparesConsumables / selectedData.monthlyRevenue) * 100}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between font-medium">
                  <span className="text-slate-300">4. Value-Added & Financing Commissions</span>
                  <span className="font-mono text-amber-400 font-bold">
                    ₹{(selectedData.valueAddedServices / 100000).toFixed(1)} L ({((selectedData.valueAddedServices / selectedData.monthlyRevenue) * 100).toFixed(1)}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${(selectedData.valueAddedServices / selectedData.monthlyRevenue) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Cost Structure & EBITDA Bridge */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-base">Cost & EBITDA Structure</h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                {selectedData.status}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Total Monthly Revenue</span>
                <span className="font-mono font-bold text-white">
                  ₹{(selectedData.monthlyRevenue / 100000).toFixed(1)} L
                </span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Cost of Goods Sold (COGS)</span>
                <span className="font-mono font-medium text-rose-400">
                  - ₹{((selectedData.monthlyRevenue - selectedData.grossProfit) / 100000).toFixed(1)} L
                </span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-slate-800 font-semibold">
                <span className="text-emerald-400">Gross Operating Profit</span>
                <span className="font-mono text-emerald-400">
                  ₹{(selectedData.grossProfit / 100000).toFixed(1)} L
                </span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Operating Overheads & Salaries</span>
                <span className="font-mono font-medium text-rose-400">
                  - ₹{(selectedData.operatingExpenses / 100000).toFixed(1)} L
                </span>
              </div>

              <div className="flex justify-between py-2 bg-emerald-950/40 px-3 rounded-xl border border-emerald-500/30 font-bold">
                <span className="text-emerald-300">Net Operating EBITDA</span>
                <span className="font-mono text-emerald-400">
                  ₹{(selectedData.ebitda / 100000).toFixed(1)} L ({selectedData.ebitdaMargin})
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
