import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { audio } from "../utils/audio";

gsap.registerPlugin(ScrollTrigger);

function CounterNumber({ target, suffix = "", prefix = "" }) {
  const [count, setCount] = useState(target);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    setCount(0);
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => {
        audio.playMilestone();
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => {
            setCount(Math.round(obj.val));
          },
        });
      },
    });

    return () => st.kill();
  }, [target]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export default function BentoBox() {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".bento-item",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 85%",
            invalidateOnRefresh: true,
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <section
      id="metrics-section"
      ref={container}
      className="min-h-screen bg-slate-50 dark:bg-slate-950 py-28 px-6 sm:px-16 flex flex-col justify-center border-t border-slate-200 dark:border-slate-800 relative z-10 transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center md:text-left mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-600 dark:text-slate-400 mb-3">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>
            SYSTEM METRICS // EXECUTION VELOCITY
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white uppercase tracking-tight">
            Impact, Numbers & Milestones
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {/* Card 1: 6+ Years Experience */}
          <div className="bento-item bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 hover:border-orange-500 rounded-3xl p-6 flex flex-col justify-between group transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] cursor-pointer">
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs font-bold text-slate-500">
                01 // TRACK RECORD
              </span>
              <span className="text-orange-500 font-mono text-xs font-bold">
                EXPERIENCE
              </span>
            </div>
            <div>
              <div className="text-4xl font-mono font-extrabold text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors">
                <CounterNumber target={6} suffix="+" />
              </div>
              <p className="text-xs font-mono text-slate-600 dark:text-slate-400 mt-1">
                Years of Finance, Operations & Engineering Leadership
              </p>
            </div>
          </div>

          {/* Card 2: 40+ Projects Managed */}
          <div className="bento-item bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 rounded-3xl p-6 flex flex-col justify-between group transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] cursor-pointer">
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs font-bold text-slate-500">
                02 // SCALE & BANDWIDTH
              </span>
              <span className="text-emerald-500 font-mono text-xs font-bold">
                PERSIST VENTURES
              </span>
            </div>
            <div>
              <div className="text-4xl font-mono font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                <CounterNumber target={40} suffix="+" />
              </div>
              <p className="text-xs font-mono text-slate-600 dark:text-slate-400 mt-1">
                Concurrent AI, Web3 & Tech Projects Directed
              </p>
            </div>
          </div>

          {/* Card 3: 57% Efficiency Boost */}
          <div className="bento-item bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 rounded-3xl p-6 flex flex-col justify-between group transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] cursor-pointer">
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs font-bold text-slate-500">
                03 // LEAN PROCESS
              </span>
              <span className="text-blue-500 font-mono text-xs font-bold">
                TELEPERFORMANCE
              </span>
            </div>
            <div>
              <div className="text-4xl font-mono font-extrabold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                <CounterNumber target={57} prefix="+" suffix="%" />
              </div>
              <p className="text-xs font-mono text-slate-600 dark:text-slate-400 mt-1">
                Operational Velocity & SLA Enhancement
              </p>
            </div>
          </div>

          {/* Card 4: 87% Error Reduction */}
          <div className="bento-item bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 hover:border-purple-500 rounded-3xl p-6 flex flex-col justify-between group transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] cursor-pointer">
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs font-bold text-slate-500">
                04 // CONTROLS
              </span>
              <span className="text-purple-500 font-mono text-xs font-bold">
                GOVERNANCE
              </span>
            </div>
            <div>
              <div className="text-4xl font-mono font-extrabold text-slate-900 dark:text-white group-hover:text-purple-500 transition-colors">
                <CounterNumber target={87} prefix="-" suffix="%" />
              </div>
              <p className="text-xs font-mono text-slate-600 dark:text-slate-400 mt-1">
                Systematic Errors Slashing via Maker-Checker
              </p>
            </div>
          </div>

          {/* Large Card 5: MSc Financial Engineering & Code */}
          <div className="bento-item md:col-span-2 bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-900/80 dark:to-slate-950 border border-slate-200 dark:border-slate-800 hover:border-orange-500 rounded-3xl p-6 flex flex-col justify-between group transition-all duration-300 hover:shadow-[0_0_40px_rgba(249,115,22,0.2)]">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs font-bold text-slate-500">
                05 // QUANTITATIVE ACADEMICS
              </span>
              <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/30">
                WorldQuant University
              </span>
            </div>
            <div className="my-auto">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors">
                MSc in Financial Engineering Candidate
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Graduate curriculum in econometric modeling, quantitative risk analysis, automated data pipelines, and derivatives valuation.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="font-mono text-[10px] bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded text-slate-700 dark:text-slate-300">
                Corporate Finance
              </span>
              <span className="font-mono text-[10px] bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded text-slate-700 dark:text-slate-300">
                Quantitative Analytics
              </span>
              <span className="font-mono text-[10px] bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded text-slate-700 dark:text-slate-300">
                Financial Modeling
              </span>
            </div>
          </div>

          {/* Large Card 6: LeetCode & Full-Stack Tech */}
          <div className="bento-item md:col-span-2 bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-900/80 dark:to-slate-950 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 rounded-3xl p-6 flex flex-col justify-between group transition-all duration-300 hover:shadow-[0_0_40px_rgba(16,185,129,0.2)]">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs font-bold text-slate-500">
                06 // ENGINEERING RIGOR
              </span>
              <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                B.E. Computer Engineering
              </span>
            </div>
            <div className="my-auto">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                600+ Solved Algorithms & Full-Stack Architecture
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Proven problem solver across LeetCode and HackerRank. Architecture in Java/Spring Boot, Python, FastAPI, Docker, and AWS EC2.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="font-mono text-[10px] bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded text-slate-700 dark:text-slate-300">
                Spring Boot
              </span>
              <span className="font-mono text-[10px] bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded text-slate-700 dark:text-slate-300">
                Python FastAPI
              </span>
              <span className="font-mono text-[10px] bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded text-slate-700 dark:text-slate-300">
                State Chess Rank #1
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
