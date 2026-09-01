import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { audio } from "../utils/audio";
import { Sparkles, Send, Bot, X, RotateCcw } from "lucide-react";

const KNOWLEDGE_BASE = [
  {
    keywords: ["why hire", "hire amit", "strength", "value", "hire", "fit", "gm"],
    answer: `Why Hire Amit Ashok Swain:

1. Quad-Core Interdisciplinary DNA: Seamlessly connects Strategic Finance, Distributed Software Engineering, Quantitative Data Analytics (WorldQuant MSc Financial Engg Candidate), and 0→1 Agile Product Leadership.
2. Proven Quantifiable Impact: Managed full-cycle finance operations at Teleperformance (+57% efficiency, -87% error reduction) and directed 40+ concurrent technology projects at Persist Ventures.
3. Systems & Automation Edge: B.E. in Computer Engineering, 600+ solved algorithmic problems, Java/Spring Boot & Python FastAPI architecture, with automated Power Query ETL pipelines reducing MIS latency to under 60 seconds.
4. Statutory & Governance Rigor: Master of full-cycle P&L, 13-week cash flow forecasting, maker-checker anti-fraud controls, and automated GSTR-2B 3-way ITC reconciliations.`,
  },
  {
    keywords: ["finance", "accounting", "p&l", "working capital", "cash flow", "brs", "teleperformance"],
    answer: `Finance & Accounting Track Record:

• Full-Cycle Operations: Managed AP/AR, General Ledger hygiene, daily Bank Reconciliation Statements (BRS), and disciplined 5-day month-end closing calendars at Teleperformance.
• Working Capital Optimization: Engineered dynamic 13-week rolling cash flow models, compressing Cash Conversion Cycles (CCC) from 58 to 24 days and unlocking liquidity.
• Process Transformation: Introduced structured maker-checker controls, slashing systematic error rates by 87% and boosting operational throughput by 57%.`,
  },
  {
    keywords: ["tech", "engineering", "java", "spring boot", "python", "aws", "docker", "leetcode"],
    answer: `Software & Cloud Engineering Stack:

• Languages & Frameworks: Java, Spring Boot 3, Hibernate/JPA, Python, FastAPI, Node.js, MERN Stack.
• Cloud & DevOps: Docker containerization, AWS (EC2, S3), CI/CD GitHub Actions, WebSocket multiplexing, REST API gateways.
• Algorithmic Rigor: Solved 600+ Data Structures, Algorithms & SQL problems across LeetCode and HackerRank (HackerRank Software Engineer Certified).`,
  },
  {
    keywords: ["data", "financial engineering", "worldquant", "power query", "excel", "analytics"],
    answer: `Data & Financial Engineering Capabilities:

• Quantitative Graduate Rigor: MSc in Financial Engineering Candidate at WorldQuant University covering econometrics, quantitative risk, and derivatives modeling.
• Automated ETL Pipelines: Power Query automated multi-source consolidation transforming fragmented raw dumps into executive MIS dashboards in <60 seconds.
• Advanced Financial Modeling: Nested SUMIFS, XLOOKUP, Dynamic Arrays, and custom anomaly detection algorithms for automated reconciliations.`,
  },
  {
    keywords: ["product", "persist ventures", "gsk", "agile", "scrum", "leanpm", "management"],
    answer: `Product & Operations Leadership:

• Persist Ventures: Directed 40+ concurrent in-house, Web3, AI, and client workstreams from 0→1, overseeing budgeting, roadmap execution, and cross-functional teams.
• GSK (GlaxoSmithKline): Managed global digital campaigns for commercial brands (Nucala, Arexvy), achieving 100% on-time delivery and reducing approval turnaround by 35% via Veeva Vault PromoMats and JIRA.
• Certifications: IBM AI Product Management Professional & Lean Project Management (LeanPM®) Yellow Belt.`,
  },
  {
    keywords: ["gst", "itc", "gstr-1", "gstr-3b", "gstr-2b", "taxation"],
    answer: `Statutory GST & Tax Reconciliation:

• GSTR-1 & GSTR-3B: Timely outward supply reporting and accurate monthly tax liability discharge.
• 3-Way ITC Matching: Automated Purchase Register vs GSTR-2B reconciliation engine preventing input tax credit leakage.
• Section 17(5): Rigorous classification to segregate blocked/ineligible credits prior to monthly return filing.`,
  },
];

export default function AiAssistantModal({ isOpen, onClose }) {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const streamIntervalRef = useRef(null);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Greetings! I am the AMIT_OS Neural Agent v3.4. Ask me anything about Amit's engineering architecture, 0→1 product roadmaps, project metrics at Persist Ventures & GSK, or backend microservices.",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (overlayRef.current) {
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 });
      }
      if (modalRef.current) {
        gsap.fromTo(
          modalRef.current,
          { scale: 0.93, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.3)" }
        );
      }
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      document.body.style.overflow = "auto";
      if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDownCapture = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDownCapture, true);
    return () => window.removeEventListener("keydown", handleKeyDownCapture, true);
  }, [isOpen, onClose]);

  const handleSend = useCallback((textInput) => {
    const query = (typeof textInput === "string" ? textInput : input).trim();
    if (!query || isTyping) return;

    audio.playClick();
    setMessages((prev) => [...prev, { role: "user", text: query }]);
    setInput("");
    setIsTyping(true);

    const q = query.toLowerCase();
    let matchedAnswer = "";

    const match = KNOWLEDGE_BASE.find((entry) =>
      entry.keywords.some((kw) => q.includes(kw))
    );

    if (match) {
      matchedAnswer = match.answer;
    } else {
      matchedAnswer = `Regarding "${query}":\n\nAmit approaches this through data-driven KPIs, scalable distributed systems on AWS EC2 & Spring Boot 3, and disciplined agile execution. Having delivered 40+ products at Persist Ventures and driven major digital acceleration at GSK, he bridges complex technical execution with measurable business ROI.\n\nFeel free to inquire about his specific projects (DeepVid.ai, SongGPT, Sound Of Meme, NeighborGood), his Java/Spring stack, or email him at amitashokswain@gmail.com!`;
    }

    // Stream the response with a live typewriter effect
    setTimeout(() => {
      audio.playSuccess();
      setIsTyping(false);

      let currentLength = 0;
      const fullText = matchedAnswer;
      const streamId = fullText.slice(0, 15);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "", id: streamId },
      ]);

      if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);

      streamIntervalRef.current = setInterval(() => {
        currentLength += 8;
        if (currentLength >= fullText.length) {
          clearInterval(streamIntervalRef.current);
          setMessages((prev) => {
            const next = [...prev];
            next[next.length - 1] = { role: "assistant", text: fullText };
            return next;
          });
        } else {
          setMessages((prev) => {
            const next = [...prev];
            next[next.length - 1] = {
              role: "assistant",
              text: fullText.slice(0, currentLength),
            };
            return next;
          });
        }
      }, 15);
    }, 400);
  }, [input, isTyping]);

  const handleClear = () => {
    audio.playClick();
    if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
    setMessages([
      {
        role: "assistant",
        text: "Neural context refreshed. Ask me anything about Amit's background, system design, or engineering management experience.",
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      data-lenis-prevent="true"
      onClick={onClose}
      className="fixed inset-0 z-[100000] bg-slate-900/60 dark:bg-black/85 backdrop-blur-md flex items-start sm:items-center justify-center pt-6 sm:pt-0 p-2 sm:p-6 transition-colors duration-500 cursor-default select-text overscroll-contain"
      role="dialog"
      aria-modal="true"
      aria-label="AI Assistant"
    >
      <div
        ref={modalRef}
        data-lenis-prevent="true"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl h-[580px] max-h-[88vh] sm:max-h-[90vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-colors duration-500 ring-1 ring-black/5 dark:ring-white/10"
      >
        {/* Header */}
        <div className="bg-slate-50 dark:bg-slate-950/80 px-5 sm:px-6 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-sm text-slate-900 dark:text-white">
                  AMIT_OS Neural Agent
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                LLaMA-3 / Spring AI Agent Knowledge Base
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClear}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Clear Conversation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                audio.playClick();
                onClose();
              }}
              className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
              title="Close Modal (ESC)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Thread with native scroll */}
        <div
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          className="flex-1 p-5 sm:p-6 overflow-y-auto overscroll-contain space-y-4 text-xs sm:text-sm"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex gap-3 ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {m.role === "assistant" && (
                <div className="w-7 h-7 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}
              <div
                className={`max-w-[85%] p-4 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                  m.role === "user"
                    ? "bg-orange-500 text-white rounded-tr-none font-medium shadow-md"
                    : "bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/60 text-slate-800 dark:text-slate-200 rounded-tl-none font-sans"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 items-center text-slate-400 font-mono text-xs">
              <div className="w-7 h-7 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 shrink-0">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/70">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Question Pills */}
        <div className="px-5 py-2.5 bg-slate-50 dark:bg-slate-950/70 border-t border-slate-200 dark:border-slate-800 flex gap-2 overflow-x-auto scrollbar-hide">
          {[
            "Why hire Amit as Senior PM?",
            "Explain DeepVid.ai architecture",
            "What was his impact at GSK?",
            "What is his Java/Spring Boot stack?",
            "How does SongGPT work?",
            "How to contact Amit?",
          ].map((pill) => (
            <button
              key={pill}
              onClick={() => handleSend(pill)}
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-mono hover:border-orange-500 transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
            >
              {pill}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="p-3.5 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI anything about Amit's skills, systems, or projects..."
            className="flex-1 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-base sm:text-sm text-slate-900 dark:text-white outline-none focus:border-orange-500 transition-colors placeholder:text-slate-400 cursor-text"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="p-3 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white transition-all cursor-pointer shadow-md shrink-0"
            title="Send query"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
