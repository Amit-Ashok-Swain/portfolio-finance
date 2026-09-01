import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { audio } from "../utils/audio";

export default function TerminalOS() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { type: "system", text: "AMIT_OS Kernel v3.4 [Neural Interface Initialized]" },
    {
      type: "system",
      text: 'Type "help" or "ai <question>" to query the autonomous knowledge kernel.',
    },
  ]);

  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const overlayRef = useRef(null);
  const terminalBoxRef = useRef(null);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const commands = {
    help: `Available commands:
• about       - Profile & multi-disciplinary overview
• experience  - Career track record across Finance & Product
• projects    - 5 Featured enterprise platforms (OmniLedger, DeepVid, PulseMetrics, OptiFlow, FinTrack)
• skills      - Quad-core technical & financial competency matrix
• metrics     - Key impact numbers (6+ Yrs, 40+ Projects, +57% Speed, -87% Errors)
• neofetch    - System architecture specifications
• contact     - Reach out directly via phone, email, or LinkedIn
• resume      - Download official resume PDF
• ai <query>  - Ask the Executive AI Advisor any question
• clear       - Clear terminal screen
• exit        - Close terminal interface`,
    about:
      "Amit Ashok Swain: Multi-disciplinary leader operating at the convergence of Strategic Finance, Software Engineering, Quantitative Financial Engineering (WorldQuant MSc Candidate), and 0→1 Agile Product Leadership.",
    experience:
      "• Sr. Engineering PM @ Persist Ventures (Nov 2024 - Present): Managing 40+ Web3, AI & client projects with full lifecycle budgeting and delivery.\n• Digital PM @ GSK (Feb 2023 - Dec 2024): 100% improvement in project delivery timelines; 35% reduction in approval turnaround via Veeva Vault & JIRA.\n• Finance Operations Manager @ Teleperformance (Aug 2021 - Jan 2023): Full-cycle P&L, AP/AR, BRS, GST/TDS, +57% efficiency gain, -87% error reduction.",
    projects:
      "1. OmniLedger AI - Enterprise Financial Consolidation & Multi-Entity Reconciliation Engine\n2. DeepVid.ai - 0→1 Scalable AI Video & Real-Time Distributed GPU Microservices Platform\n3. PulseMetrics Finance - Executive Financial KPI Cockpit & 13-Week Cash Forecasting Engine\n4. OptiFlow Controls - Internal Governance, Maker-Checker & Anti-Fraud Process Architecture\n5. FinTrack Gateway - Corporate AP/AR Gateway & Automated GST / ITC 3-Way Reconciliation Portal",
    skills:
      "Quad-Core Competencies:\n- Finance: Full-Cycle Accounting, P&L, 13-Week Cash Flow, Working Capital, GST/ITC 3-Way Match, Maker-Checker\n- Tech: Java, Spring Boot, Python, FastAPI, Docker, AWS EC2/S3, WebSockets, REST APIs, 600+ LeetCode\n- Data: WorldQuant MSc Financial Engg Candidate, Power Query ETL, Advanced Excel (SUMIFS/XLOOKUP), SQL\n- Product: 40+ Projects Led, Agile/Scrum/Kanban, IBM AI PM, LeanPM® Yellow Belt, Veeva Vault",
    metrics:
      "Impact Highlights:\n✔ 6+ Years Multi-Disciplinary Experience\n✔ 40+ Global Projects Managed\n✔ +57% Operational Speed Gain\n✔ -87% Systematic Error Reduction\n✔ MSc Financial Engineering Candidate (WorldQuant)\n✔ 600+ Solved Algorithms (LeetCode / HackerRank)",
    neofetch:
      "-------------------------------------------\nOS: AMIT-FINANCE-OS v3.4 [Quad-Core Kernel]\nHost: Navi Mumbai / Remote Global\nUptime: 99.999%\nKernel: Finance-Tech-Data-Product-Engine\nShell: bash 5.2-quadcore\nCPU: High-Velocity Strategic Leadership & Execution\nMemory: 600+ DSA algorithms & 100% Balanced Ledgers\n-------------------------------------------",
    contact:
      "Email: amitashokswain@gmail.com\nPhone: +91-8369083160\nLinkedIn: https://www.linkedin.com/in/amit-ashok-s-a510b9b9/\nGitHub: https://github.com/Amit-Ashok-Swain",
    resume:
      "Triggering download for Amit_Ashok_Swain_Final_CV_Accounts.pdf...",
    sudo:
      "Nice try! You already have root access to AMIT_FINANCE_OS.",
  };

  const handleOpen = () => {
    audio.playCommand();
    setIsOpen(true);
  };

  const handleClose = useCallback(() => {
    if (!isOpen || isAnimatingOut) return;
    setIsAnimatingOut(true);
    audio.playClick();

    if (terminalBoxRef.current) {
      gsap.to(terminalBoxRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      });
    }

    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.25,
        onComplete: () => {
          setIsOpen(false);
          setIsAnimatingOut(false);
        },
      });
    } else {
      setIsOpen(false);
      setIsAnimatingOut(false);
    }
  }, [isOpen, isAnimatingOut]);

  useEffect(() => {
    const handleOpenCustomEvent = () => {
      handleOpen();
    };
    window.addEventListener("open-terminal", handleOpenCustomEvent);
    return () => window.removeEventListener("open-terminal", handleOpenCustomEvent);
  }, []);

  useEffect(() => {
    if (isOpen && !isAnimatingOut) {
      if (overlayRef.current) {
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 });
      }
      if (terminalBoxRef.current) {
        gsap.fromTo(
          terminalBoxRef.current,
          { scale: 0.94, opacity: 0, y: 15 },
          { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.3)" }
        );
      }
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isAnimatingOut]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen) handleClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [handleClose, isOpen]);

  useEffect(() => {
    if (isOpen && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex =
        historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      if (historyIndex < commandHistory.length - 1) {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex] || "");
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const currentInput = input.trim().toLowerCase();
      if (!currentInput) return;
      const availableKeys = Object.keys(commands);
      const match = availableKeys.find((k) => k.startsWith(currentInput));
      if (match) {
        setInput(match);
        audio.playHover();
      }
    }
  };

  const handleAiQuery = (query) => {
    const q = query.toLowerCase();
    if (q.includes("why hire") || q.includes("hire amit")) {
      return "AI Agent Response:\nAmit combines deep technical engineering fluency (Java, Spring Boot, DSA 600+) with proven 0→1 Product Management. He has managed 40+ scale projects at Persist Ventures and accelerated delivery by 100% at GSK. He bridges business ROI and engineering execution seamlessly.";
    }
    if (q.includes("deepvid") || q.includes("video")) {
      return "AI Agent Response:\nDeepVid.ai is a viral generative video platform built by Amit's team. It features bi-directional WebSockets, GPU VRAM pooling, and automated video generation pipelines handling over 2.4M video scene renders.";
    }
    if (q.includes("songgpt") || q.includes("music") || q.includes("audio")) {
      return "AI Agent Response:\nSongGPT bridges ChatGPT's conversational UX with Spotify streaming audio. It converts user prompts and images into custom 320kbps lossless audio tracks with Web3 wallet integration.";
    }
    if (q.includes("leadership") || q.includes("management") || q.includes("agile")) {
      return "AI Agent Response:\nAmit's leadership methodology combines Agile Scrum sprints with ruthless QA governance. At GSK, his process improvements doubled digital campaign delivery speed and reduced approval times by 35%.";
    }
    return `AI Agent Response:\nRegarding "${query}": Amit approaches this with data-driven KPIs, scalable distributed cloud systems on AWS EC2, and disciplined agile execution. Feel free to explore his case studies or connect via amitashokswain@gmail.com.`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    audio.playClick();
    const newHistory = [...history, { type: "user", text: trimmed }];
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const lower = trimmed.toLowerCase();

    if (lower === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    if (lower === "exit") {
      handleClose();
      setInput("");
      return;
    }

    if (lower.startsWith("ai ") || lower.startsWith("ask ")) {
      const query = trimmed.replace(/^(ai|ask)\s+/i, "");
      const answer = handleAiQuery(query);
      newHistory.push({ type: "success", text: answer });
    } else if (commands[lower]) {
      newHistory.push({ type: "output", text: commands[lower] });
      if (lower === "resume") {
        const link = document.createElement("a");
        link.href = "/resume.pdf";
        link.download = "Amit_Ashok_Swain_Final_CV_Accounts.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } else {
      newHistory.push({
        type: "error",
        text: `Command not recognized: "${trimmed}". Type "help" or "ai <question>" for supported protocols.`,
      });
    }

    setHistory(newHistory);
    setInput("");
  };

  return (
    <>
      {/* Floating CLI launcher pill */}
      <button
        onClick={handleOpen}
        onMouseEnter={() => audio.playHover()}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 bg-slate-900/90 dark:bg-black/90 text-emerald-400 font-mono text-xs font-bold rounded-2xl border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:border-emerald-400 hover:scale-105 transition-all duration-300 backdrop-blur-xl cursor-pointer pointer-events-auto"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>AMIT_CLI</span>
        <span className="text-slate-500 text-[10px] hidden sm:inline">&gt;_</span>
      </button>

      {/* Terminal Modal Window */}
      {isOpen && (
        <div
          ref={overlayRef}
          onClick={handleClose}
          onKeyDown={(e) => e.stopPropagation()}
          className="fixed inset-0 z-[100000] bg-slate-950/70 backdrop-blur-md flex items-start sm:items-center justify-center pt-8 sm:pt-0 p-3 sm:p-6 cursor-default overscroll-contain"
          role="dialog"
          aria-modal="true"
          aria-label="Interactive Terminal OS"
        >
          <div
            ref={terminalBoxRef}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl h-[520px] max-h-[82vh] bg-[#0c1017] border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden font-mono text-xs selection:bg-emerald-500 selection:text-black ring-1 ring-emerald-500/20"
          >
            {/* Window Bar */}
            <div className="bg-slate-900/90 px-5 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClose}
                  className="w-3 h-3 rounded-full bg-red-500 hover:opacity-80 transition-opacity cursor-pointer"
                  title="Close Terminal"
                ></button>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-3 text-slate-400 text-[11px] font-bold">
                  AMIT_OS v3.4 // bash (pty/1)
                </span>
              </div>
              <div className="text-slate-500 text-[10px] flex items-center gap-2">
                <span>Tab: Autocomplete</span>
                <span>•</span>
                <span>ESC: Exit</span>
              </div>
            </div>

            {/* Output stream */}
            <div className="flex-1 p-5 overflow-y-auto space-y-2 text-slate-300 leading-relaxed scrollbar-hide">
              {history.map((line, idx) => (
                <div key={idx} className="whitespace-pre-wrap">
                  {line.type === "user" ? (
                    <div className="text-emerald-400 font-bold flex items-center gap-2">
                      <span className="text-orange-500">guest@amit-os:~$</span>
                      <span>{line.text}</span>
                    </div>
                  ) : line.type === "error" ? (
                    <div className="text-red-400">{line.text}</div>
                  ) : line.type === "success" ? (
                    <div className="text-emerald-300">{line.text}</div>
                  ) : (
                    <div className="text-slate-400">{line.text}</div>
                  )}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Terminal Input Line */}
            <form
              onSubmit={handleSubmit}
              className="bg-slate-950/90 p-3.5 border-t border-slate-800/80 flex items-center gap-2"
            >
              <span className="text-orange-500 font-bold">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type 'help' or 'ai <question>'..."
                className="flex-1 bg-transparent text-emerald-400 outline-none text-base sm:text-xs font-mono placeholder:text-slate-600"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}
