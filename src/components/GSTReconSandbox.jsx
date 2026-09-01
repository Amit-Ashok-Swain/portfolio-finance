import { useState } from "react";
import { audio } from "../utils/audio";
import {
  Receipt,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Send,
  Zap,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function GSTReconSandbox() {
  const [filter, setFilter] = useState("all");
  const [isReconciling, setIsReconciling] = useState(false);
  const [reconciledProgress, setReconciledProgress] = useState(100);
  const [vendorNoticeSent, setVendorNoticeSent] = useState(false);

  const sampleInvoices = [
    {
      id: "INV-2026-081",
      vendor: "Premier Industrial Supply Corp",
      gstin: "27AAACP1234F1Z5",
      type: "Commercial Inventory Batch Dispatch",
      prTaxable: 4250000,
      prGst: 1190000,
      gstr2bTaxable: 4250000,
      gstr2bGst: 1190000,
      status: "MATCHED",
      badge: "100% Reclaimed",
      statusClass: "bg-emerald-950/60 text-emerald-400 border-emerald-500/30",
    },
    {
      id: "INV-2026-082",
      vendor: "Apex Electric Mobility Systems",
      gstin: "27AABCA9876K1Z2",
      type: "Electric Mobility Battery Component Consignment",
      prTaxable: 2100000,
      prGst: 105000,
      gstr2bTaxable: 2100000,
      gstr2bGst: 105000,
      status: "MATCHED",
      badge: "100% Reclaimed",
      statusClass: "bg-emerald-950/60 text-emerald-400 border-emerald-500/30",
    },
    {
      id: "INV-2026-083",
      vendor: "Castrol Lubricants India Ltd.",
      gstin: "27AAACC4321P1Z9",
      type: "Industrial Consumables & Workshop Lubricants",
      prTaxable: 380000,
      prGst: 68400,
      gstr2bTaxable: 380000,
      gstr2bGst: 68400,
      status: "MATCHED",
      badge: "100% Reclaimed",
      statusClass: "bg-emerald-950/60 text-emerald-400 border-emerald-500/30",
    },
    {
      id: "INV-2026-084",
      vendor: "National Media & Advertising Agency",
      gstin: "27BBBPG5678M1Z8",
      type: "Brand Campaign Hoardings & Collateral",
      prTaxable: 150000,
      prGst: 27000,
      gstr2bTaxable: 0,
      gstr2bGst: 0,
      status: "MISSING_IN_2B",
      badge: "Vendor GSTR-1 Pending",
      statusClass: "bg-rose-950/60 text-rose-400 border-rose-500/30",
    },
    {
      id: "INV-2026-085",
      vendor: "Western Regional Spares Distribution",
      gstin: "27AAACD1122J1Z3",
      type: "OEM Spare Components & Maintenance Hardware",
      prTaxable: 240000,
      prGst: 43200,
      gstr2bTaxable: 240000,
      gstr2bGst: 43200,
      status: "TIMING_DIFF",
      badge: "Filed in Next Cycle",
      statusClass: "bg-amber-950/60 text-amber-400 border-amber-500/30",
    },
    {
      id: "INV-2026-086",
      vendor: "Corporate Staff Canteen Services",
      gstin: "27AABCM9988L1Z1",
      type: "Staff Catering & Facility Hospitality",
      prTaxable: 65000,
      prGst: 3250,
      gstr2bTaxable: 65000,
      gstr2bGst: 3250,
      status: "BLOCKED_17_5",
      badge: "Sec 17(5) Ineligible",
      statusClass: "bg-purple-950/60 text-purple-400 border-purple-500/30",
    },
  ];

  const filteredInvoices = sampleInvoices.filter((inv) => {
    if (filter === "all") return true;
    if (filter === "matched") return inv.status === "MATCHED";
    if (filter === "missing") return inv.status === "MISSING_IN_2B";
    if (filter === "timing") return inv.status === "TIMING_DIFF";
    if (filter === "blocked") return inv.status === "BLOCKED_17_5";
    return true;
  });

  const handleRunRecon = () => {
    if (isReconciling) return;
    audio.playCommand();
    setIsReconciling(true);
    setReconciledProgress(20);

    setTimeout(() => {
      setReconciledProgress(70);
      audio.playHover();
    }, 400);

    setTimeout(() => {
      setReconciledProgress(100);
      setIsReconciling(false);
      audio.playSuccess();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#10b981", "#3b82f6"],
      });
    }, 900);
  };

  const handleSendVendorNotice = () => {
    audio.playMilestone();
    setVendorNoticeSent(true);
    setTimeout(() => setVendorNoticeSent(false), 5000);
  };

  return (
    <section
      id="gst-recon-section"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#070d19] border-t border-slate-800 relative z-10"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs">
            <Receipt className="w-3.5 h-3.5" />
            <span>STATUTORY TAXATION & ITC RECONCILIATION SUITE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Purchase Register vs GSTR-2B 3-Way Matching Engine
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Eliminating Input Tax Credit leakage and interest penalty exposures through automated 3-way reconciliation prior to filing GSTR-3B. Segregating eligible ITC, Section 17(5) blocked credits, and vendor notices.
          </p>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => {
                audio.playClick();
                setFilter("all");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                filter === "all" ? "bg-emerald-500 text-slate-950 font-bold" : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              All Invoices (6)
            </button>
            <button
              onClick={() => {
                audio.playClick();
                setFilter("matched");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                filter === "matched" ? "bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/40" : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              ✓ Matched ITC (3)
            </button>
            <button
              onClick={() => {
                audio.playClick();
                setFilter("missing");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                filter === "missing" ? "bg-rose-500/20 text-rose-400 font-bold border border-rose-500/40" : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              ⚠ Missing in 2B (1)
            </button>
            <button
              onClick={() => {
                audio.playClick();
                setFilter("timing");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                filter === "timing" ? "bg-amber-500/20 text-amber-400 font-bold border border-amber-500/40" : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              ⏳ Timing Diff (1)
            </button>
            <button
              onClick={() => {
                audio.playClick();
                setFilter("blocked");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                filter === "blocked" ? "bg-purple-500/20 text-purple-400 font-bold border border-purple-500/40" : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              ⊘ Sec 17(5) Blocked (1)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRunRecon}
              disabled={isReconciling}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-500 transition-all"
            >
              <Zap className="w-3.5 h-3.5 fill-slate-950" />
              <span>{isReconciling ? `Matching (${reconciledProgress}%)...` : "Execute 3-Way Match"}</span>
            </button>

            <button
              onClick={handleSendVendorNotice}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-all"
            >
              <Send className="w-3.5 h-3.5 text-amber-400" />
              <span>Dispatch Vendor Notice</span>
            </button>
          </div>
        </div>

        {/* Vendor Notice Alert Toast */}
        {vendorNoticeSent && (
          <div className="p-4 rounded-2xl bg-amber-950/80 border border-amber-500/50 text-amber-200 text-xs flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Automated Vendor Notice Dispatched:</strong> Formatted discrepancy notice dispatched to <em>National Media & Advertising Agency</em> (Invoice INV-2026-084) demanding GSTR-1 update prior to 11th of month.
              </span>
            </div>
            <span className="font-mono text-[10px] text-amber-400 font-bold">DISPATCHED ✓</span>
          </div>
        )}

        {/* Invoice Records Table */}
        <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900/90 shadow-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-mono border-b border-slate-800 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-4">Invoice / GSTIN</th>
                <th className="p-4">Vendor & Description</th>
                <th className="p-4 text-right">Purchase Reg GST</th>
                <th className="p-4 text-right">GSTR-2B GST</th>
                <th className="p-4 text-center">Status & Rule</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-white">{inv.id}</p>
                    <span className="text-[10px] text-slate-400">{inv.gstin}</span>
                  </td>
                  <td className="p-4 font-sans">
                    <p className="font-semibold text-slate-200">{inv.vendor}</p>
                    <span className="text-slate-400 text-[11px]">{inv.type}</span>
                  </td>
                  <td className="p-4 text-right font-bold text-slate-200">
                    ₹{inv.prGst.toLocaleString("en-IN")}
                  </td>
                  <td className="p-4 text-right font-bold text-emerald-400">
                    ₹{inv.gstr2bGst.toLocaleString("en-IN")}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${inv.statusClass}`}>
                      {inv.badge}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
