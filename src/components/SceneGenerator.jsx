import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { audio } from "../utils/audio";
import {
  Play,
  Database,
  Cloud,
  Code2,
  Zap,
  Activity,
  FileSpreadsheet,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function SceneGenerator() {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  // Step 1 State: Financial & Power Query Model
  const [financialLogs, setFinancialLogs] = useState([
    { type: "sys", text: "Power Query ETL Engine Initialized [v2.4]" },
    { type: "sys", text: "Multi-Entity Transaction Ledger: 4,250 rows validated (Debit = Credit)" },
    { type: "info", text: "Awaiting formula calculation or consolidation request..." },
  ]);
  const [formulaInput, setFormulaInput] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [reconciliationProgress, setReconciliationProgress] = useState(100);

  // Step 2 State: Distributed GPU Microservices
  const [activeTechTab, setActiveTechTab] = useState("query");
  const [gpuLoad, setGpuLoad] = useState(74.2);
  const [queryStatus, setQueryStatus] = useState("IDLE");

  // Step 3 State: Maker-Checker Governance
  const [processStep, setProcessStep] = useState(4);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const executeFinancialModel = (formulaText) => {
    if (isCalculating) return;
    const text = formulaText.trim() || "=SUMIFS(Ledger!$E:$E, Ledger!$B:$B, '>=2025-01-01', Ledger!$B:$B, '<=2025-12-31')";
    audio.playCommand();
    setIsCalculating(true);
    setReconciliationProgress(0);

    setFinancialLogs((prev) => [
      ...prev,
      { type: "user", text: `> Formula: ${text}` },
      { type: "info", text: "[1/3] Ingesting multi-source CSV dumps & parsing ledger range..." },
    ]);

    setTimeout(() => {
      setReconciliationProgress(60);
      audio.playHover();
      setFinancialLogs((prev) => [
        ...prev,
        { type: "info", text: "[2/3] Eliminating inter-company transfers & reconciling GST tax sub-ledgers..." },
      ]);
    }, 500);

    setTimeout(() => {
      setReconciliationProgress(100);
      setIsCalculating(false);
      audio.playSuccess();
      setFinancialLogs((prev) => [
        ...prev,
        { type: "success", text: "[3/3] Consolidated Trial Balance & EBITDA Bridge generated. Zero variance across 4,200 rows." },
      ]);
    }, 1100);
  };

  const handleTestMicroservices = () => {
    audio.playCommand();
    setQueryStatus("STREAMING_INFERENCE");
    setGpuLoad(92.4);
    setTimeout(() => {
      audio.playSuccess();
      setQueryStatus("200_OK_COMPLETED");
      setGpuLoad(68.5);
    }, 1000);
  };

  const handleMakerCheckerAuth = () => {
    if (isOptimizing) return;
    audio.playCommand();
    setIsOptimizing(true);
    setProcessStep(1);

    setTimeout(() => {
      audio.playHover();
      setProcessStep(2);
    }, 300);

    setTimeout(() => {
      audio.playHover();
      setProcessStep(3);
    }, 600);

    setTimeout(() => {
      audio.playSuccess();
      setProcessStep(4);
      setIsOptimizing(false);
    }, 900);
  };

  return (
    <section
      id="spatial-section"
      ref={containerRef}
      className="min-h-screen bg-slate-50 dark:bg-slate-950 py-24 px-6 sm:px-16 flex flex-col justify-center border-t border-slate-200 dark:border-slate-800 relative z-10 transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center md:text-left mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-600 dark:text-slate-400 mb-3">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>
            LIVE EXECUTION // SANDBOX PIPELINE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white uppercase tracking-tight">
            Interactive Financial & Systems Engine
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mt-2">
            Test the live sandbox: calculate financial models, inspect GPU microservices streaming, and simulate maker-checker release authorization.
          </p>
        </div>

        {/* 3 Step Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Step 1: Financial & Excel Sandbox */}
          <div className="bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-3">
                <span className="font-mono text-xs font-bold text-emerald-500 flex items-center gap-1.5">
                  <FileSpreadsheet className="w-4 h-4" />
                  01 // FINANCIAL MODELING
                </span>
                <span className="font-mono text-[10px] text-slate-400">Power Query</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                Execute automated multi-source ledger balancing and EBITDA consolidation.
              </p>

              {/* Console logs */}
              <div className="p-3 rounded-xl bg-slate-950 font-mono text-[11px] space-y-1 min-h-[120px] max-h-[140px] overflow-y-auto">
                {financialLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className={`${
                      log.type === "user"
                        ? "text-amber-400"
                        : log.type === "success"
                        ? "text-emerald-400 font-bold"
                        : log.type === "sys"
                        ? "text-slate-500"
                        : "text-cyan-300"
                    }`}
                  >
                    {log.text}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => executeFinancialModel(formulaInput)}
              disabled={isCalculating}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-500/20"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{isCalculating ? "Calculating..." : "Run Financial Model"}</span>
            </button>
          </div>

          {/* Step 2: Distributed GPU Microservices */}
          <div className="bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-3">
                <span className="font-mono text-xs font-bold text-cyan-500 flex items-center gap-1.5">
                  <Cloud className="w-4 h-4" />
                  02 // CLOUD MICROSERVICES
                </span>
                <span className="font-mono text-[10px] text-slate-400">AWS EC2 / FastAPI</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                Real-time GPU cluster streaming, Celery Redis task queues, and low-latency API routing.
              </p>

              <div className="p-3 rounded-xl bg-slate-950 font-mono text-[11px] space-y-2">
                <div className="flex justify-between text-slate-400">
                  <span>GPU VRAM Pool:</span>
                  <span className="text-cyan-400 font-bold">{gpuLoad}% Allocated</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${gpuLoad}%` }} />
                </div>
                <div className="flex justify-between text-slate-400 pt-1">
                  <span>Inference Status:</span>
                  <span className="text-emerald-400">{queryStatus}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleTestMicroservices}
              className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-cyan-500/20"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Simulate GPU Stream</span>
            </button>
          </div>

          {/* Step 3: Maker-Checker Governance */}
          <div className="bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-3">
                <span className="font-mono text-xs font-bold text-orange-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  03 // MAKER-CHECKER CONTROLS
                </span>
                <span className="font-mono text-[10px] text-slate-400">Anti-Fraud</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                Dual-key authorization preventing unapproved releases and reducing billing errors by 87%.
              </p>

              <div className="p-3 rounded-xl bg-slate-950 font-mono text-[11px] space-y-1.5 text-slate-300">
                <div className={processStep >= 1 ? "text-emerald-400" : "text-slate-600"}>
                  ✓ 1. Cash Receipt Validated
                </div>
                <div className={processStep >= 2 ? "text-emerald-400" : "text-slate-600"}>
                  ✓ 2. Bank DO #DO-99120 Verified
                </div>
                <div className={processStep >= 3 ? "text-emerald-400" : "text-slate-600"}>
                  ✓ 3. Accounts Maker Token Emitted
                </div>
                <div className={processStep >= 4 ? "text-emerald-400 font-bold" : "text-slate-600"}>
                  ✓ 4. GM Approval: Gate-Pass Issued
                </div>
              </div>
            </div>

            <button
              onClick={handleMakerCheckerAuth}
              disabled={isOptimizing}
              className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-orange-500/20"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Simulate Dual-Auth</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
