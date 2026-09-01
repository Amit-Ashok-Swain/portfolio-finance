import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { audio } from "../utils/audio";

const GREETINGS = [
  "HELLO",
  "नमस्ते",
  "BONJOUR",
  "HOLA",
  "こんにちは",
  "CIAO",
  "안녕하세요",
  "你好",
  "ПРИВЕТ",
  "مرحباً",
];

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const ringRef = useRef(null);
  const bgRingRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const centerRingRef = useRef(null);
  const glitchRef = useRef(null);
  const greetingRef = useRef(null);

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const holdTl = useRef(null);

  useEffect(() => {
    if (isHolding || isUnlocked) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (greetingRef.current) {
        gsap.to(greetingRef.current, {
          opacity: 0,
          duration: 0.15,
          onComplete: () => {
            currentIndex = (currentIndex + 1) % GREETINGS.length;
            if (greetingRef.current) {
              greetingRef.current.innerText = GREETINGS[currentIndex];
            }
            gsap.to(greetingRef.current, { opacity: 0.1, duration: 0.15 });
          },
        });
      }
    }, 800);

    return () => clearInterval(interval);
  }, [isHolding, isUnlocked]);

  const scrambleText = useCallback((targetText) => {
    if (!textRef.current) return;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>/";
    let iteration = 0;
    const interval = setInterval(() => {
      if (textRef.current) {
        textRef.current.innerText = textRef.current.innerText
          .split("")
          .map((letter, index) => {
            if (index < iteration) return targetText[index] || "";
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");
      }
      if (iteration >= targetText.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 20);
  }, []);

  const executeIgnition = useCallback((instant = false) => {
    audio.playMilestone();
    audio.playSuccess();
    scrambleText("ROOT ACCESS GRANTED.");
    setIsUnlocked(true);

    if (ringRef.current) {
      gsap.to(ringRef.current, { strokeDashoffset: 0, duration: instant ? 0.2 : 0.4 });
    }

    const masterTl = gsap.timeline({
      onComplete: () => {
        if (typeof onComplete === "function") {
          onComplete();
        }
      },
    });

    masterTl
      .to(glitchRef.current, {
        opacity: 1,
        duration: 0.05,
        yoyo: true,
        repeat: 2,
      })
      .to(
        centerRingRef.current,
        {
          scale: 1.3,
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        0
      )
      .to(
        containerRef.current,
        {
          scale: 2.5,
          opacity: 0,
          filter: "blur(20px)",
          duration: instant ? 0.55 : 0.75,
          ease: "power3.inOut",
        },
        "-=0.1"
      );
  }, [onComplete, scrambleText]);

  useGSAP(() => {
    scrambleText("AWAITING BIOMETRIC INPUT...");

    holdTl.current = gsap.timeline({
      paused: true,
      onUpdate: () => {
        if (holdTl.current) {
          const p = Math.round(holdTl.current.progress() * 100);
          setProgress(p);
        }
      },
      onComplete: () => {
        executeIgnition(false);
      },
    });

    holdTl.current.to(
      ringRef.current,
      { strokeDashoffset: 0, duration: 1.2, ease: "power1.inOut" },
      0,
    );

    holdTl.current.to(
      buttonRef.current,
      {
        x: () => gsap.utils.random(-3, 3),
        y: () => gsap.utils.random(-3, 3),
        duration: 0.05,
        repeat: 24,
        yoyo: true,
        ease: "none",
      },
      0,
    );

    holdTl.current.to(
      textRef.current,
      { scale: 1.05, color: "#f97316", duration: 1.2 },
      0,
    );
  }, [executeIgnition, scrambleText]);

  const handleDown = () => {
    if (isUnlocked) return;
    setIsHolding(true);
    if (greetingRef.current) {
      gsap.to(greetingRef.current, { opacity: 0, duration: 0.2 });
    }

    audio.init();
    audio.playClick();
    scrambleText("DECRYPTING NEURAL PATHWAYS...");
    if (holdTl.current) holdTl.current.play();
  };

  const handleUp = () => {
    if (isUnlocked) return;
    if (holdTl.current && holdTl.current.progress() < 1) {
      setIsHolding(false);
      holdTl.current.reverse();
      scrambleText("ACCESS DENIED. HOLD TO RETRY.");
      if (textRef.current) {
        gsap.to(textRef.current, { color: "#ef4444", duration: 0.3 });
      }
    }
  };

  const handleFastPass = (e) => {
    if (e) e.stopPropagation();
    if (isUnlocked) return;
    audio.init();
    audio.playCommand();
    executeIgnition(true);
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white overflow-hidden origin-center transition-colors duration-500 select-none cursor-default"
      style={{ willChange: "transform, opacity, filter" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.12)_0%,transparent_65%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="absolute top-[25%] sm:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4 text-center pointer-events-none z-0">
        <h1
          ref={greetingRef}
          className="text-[14vw] sm:text-[15vw] whitespace-nowrap font-black text-slate-900 dark:text-slate-100 tracking-tighter opacity-10 uppercase transition-opacity"
        >
          HELLO
        </h1>
      </div>

      <div
        ref={glitchRef}
        className="absolute inset-0 bg-white mix-blend-difference opacity-0 pointer-events-none z-50"
      ></div>

      <div className="relative z-10 flex flex-col items-center w-full px-4 mt-12 sm:mt-0">
        <div className="font-mono text-[11px] sm:text-sm tracking-[0.25em] flex items-center mb-10 sm:mb-12 h-8 text-slate-500 dark:text-slate-400">
          <span className="mr-2 sm:mr-4 animate-pulse text-orange-500 font-bold">&gt;</span>
          <span ref={textRef} className="w-max sm:w-[340px] text-center font-bold">
            INITIALIZING KERNEL...
          </span>
        </div>

        {/* Central Biometric Interactive Unit (Entire unit scales & vanishes cleanly) */}
        <div
          ref={centerRingRef}
          className={`relative w-36 h-36 flex items-center justify-center transition-all duration-300 ${
            isUnlocked ? "opacity-0 scale-110 pointer-events-none" : "opacity-100 scale-100"
          }`}
        >
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
            <circle
              ref={bgRingRef}
              cx="72"
              cy="72"
              r="66"
              fill="none"
              className="stroke-slate-300 dark:stroke-slate-800 transition-colors duration-500"
              strokeWidth="2"
            />
            <circle
              ref={ringRef}
              cx="72"
              cy="72"
              r="66"
              fill="none"
              stroke="#f97316"
              strokeWidth="4"
              strokeDasharray="415"
              strokeDashoffset="415"
              strokeLinecap="round"
            />
          </svg>

          <button
            ref={buttonRef}
            onPointerDown={handleDown}
            onPointerUp={handleUp}
            onPointerLeave={handleUp}
            onPointerCancel={handleUp}
            onTouchStart={handleDown}
            onTouchEnd={handleUp}
            onTouchCancel={handleUp}
            onClick={handleFastPass}
            onContextMenu={(e) => e.preventDefault()}
            className="w-28 h-28 rounded-full border border-orange-500/30 flex flex-col items-center justify-center bg-white/70 dark:bg-slate-900/70 backdrop-blur-md transition-all hover:border-orange-500/70 hover:bg-orange-500/15 cursor-pointer select-none outline-none group"
            style={{
              touchAction: "none",
              WebkitTouchCallout: "none",
              WebkitUserSelect: "none",
              userSelect: "none",
            }}
            aria-label="Hold or click to authenticate"
          >
            <div className="w-14 h-14 rounded-full border border-orange-500/50 flex flex-col items-center justify-center pointer-events-none relative group-hover:scale-105 transition-transform">
              <div className="w-2.5 h-2.5 rounded-full bg-orange-500 pointer-events-none shadow-[0_0_12px_rgba(249,115,22,1)] animate-pulse"></div>
              {isHolding && (
                <span className="font-mono text-[9px] font-bold text-orange-500 mt-1">
                  {progress}%
                </span>
              )}
            </div>
          </button>
        </div>

        {/* Action helper footer */}
        <div
          className={`mt-10 font-mono text-[10px] sm:text-xs tracking-widest text-slate-400 dark:text-slate-500 uppercase transition-all duration-300 text-center flex flex-col items-center gap-3 ${
            isUnlocked ? "opacity-0 translate-y-2 pointer-events-none" : "opacity-100 translate-y-0"
          }`}
        >
          <span>[ Click or Hold to Authenticate ]</span>
          <button
            type="button"
            onClick={handleFastPass}
            className="text-[11px] text-orange-600 dark:text-orange-400 hover:text-orange-500 tracking-wider font-mono transition-all cursor-pointer px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 hover:bg-orange-500/20 shadow-sm"
          >
            Instant Access →
          </button>
        </div>
      </div>
    </div>
  );
}
